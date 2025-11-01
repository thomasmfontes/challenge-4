import { useEffect, useState } from "react";
import type { IConsulta } from "../types/consulta";

type Props = {
  initial?: Partial<IConsulta>;
  onCancel?: () => void;
  onSave: (payload: Partial<IConsulta>) => Promise<void> | void;
};

export default function FormConsulta({ initial = {}, onCancel, onSave }: Props) {
  const [pacienteId, setPacienteId] = useState<number | "">(initial.pacienteId ?? "");
  const [medicoId, setMedicoId] = useState<number | "">(initial.medicoId ?? "");
  const [dataHora, setDataHora] = useState(initial.dataHora || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initial.pacienteId) setPacienteId(initial.pacienteId);
    if (initial.medicoId) setMedicoId(initial.medicoId);
    if (initial.dataHora) setDataHora(initial.dataHora);
  }, [initial]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave({ pacienteId: Number(pacienteId), medicoId: Number(medicoId), dataHora });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Paciente ID</label>
        <input value={String(pacienteId)} onChange={(e) => setPacienteId(e.target.value === "" ? "" : Number(e.target.value))} className="mt-1 block w-full rounded border px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Médico ID</label>
        <input value={String(medicoId)} onChange={(e) => setMedicoId(e.target.value === "" ? "" : Number(e.target.value))} className="mt-1 block w-full rounded border px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Data e hora</label>
        <input type="datetime-local" value={dataHora} onChange={(e) => setDataHora(e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" />
      </div>
      <div className="flex gap-2">
        <button type="submit" disabled={saving} className="rounded bg-blue-600 text-white px-4 py-2">{saving ? "Salvando..." : "Salvar"}</button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="rounded border px-4 py-2">Cancelar</button>
        )}
      </div>
    </form>
  );
}
