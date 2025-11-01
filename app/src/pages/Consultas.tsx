import { useEffect, useState } from "react";
import consultaService from "../services/consultaService";
import type { IConsultaComPaciente } from "../types/consulta";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import FormConsulta from "../components/FormConsulta";
import { formatDateTime } from "../utils/formatters";

export default function Consultas() {
  const [consultas, setConsultas] = useState<IConsultaComPaciente[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const hoje = new Date().toISOString().slice(0, 10);
      const data = await consultaService.listar({ data: hoje });
      setConsultas(data || []);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar consultas");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(payload: any) {
    try {
      const novo = await consultaService.criar(payload);
      setConsultas((s) => [novo as IConsultaComPaciente, ...s]);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      setError("Erro ao agendar consulta");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Consultas</h1>
        <div className="flex gap-2">
          <button onClick={() => setShowForm((s) => !s)} className="rounded bg-blue-600 text-white px-4 py-2">{showForm ? "Fechar" : "Agendar"}</button>
        </div>
      </div>

      <div className="mt-4">
        {showForm && (
          <div className="mb-4 rounded border bg-white p-4">
            <FormConsulta onSave={handleCreate} onCancel={() => setShowForm(false)} />
          </div>
        )}

        {loading && <Loading />}
        {error && <Alert tipo="error" mensagem={error} />}

        {!loading && !error && (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-3 py-2 text-left text-sm font-medium">ID</th>
                  <th className="px-3 py-2 text-left text-sm font-medium">Paciente</th>
                  <th className="px-3 py-2 text-left text-sm font-medium">Data/Hora</th>
                  <th className="px-3 py-2 text-left text-sm font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {consultas.map((c) => (
                  <tr key={c.id}>
                    <td className="px-3 py-2 text-sm">{c.id}</td>
                    <td className="px-3 py-2 text-sm">{c.paciente?.nome ?? c.pacienteId}</td>
                    <td className="px-3 py-2 text-sm">{formatDateTime(c.dataHora)}</td>
                    <td className="px-3 py-2 text-sm">{c.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
