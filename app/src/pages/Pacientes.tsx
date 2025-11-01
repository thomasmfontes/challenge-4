import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pacienteService from "../services/pacienteService";
import type { IPaciente } from "../types/paciente";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import FormPaciente from "../components/FormPaciente";

export default function Pacientes() {
  const [pacientes, setPacientes] = useState<IPaciente[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await pacienteService.listar();
      setPacientes(data || []);
    } catch (err: any) {
      console.error(err);
      setError("Não foi possível carregar pacientes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(payload: Partial<IPaciente>) {
    try {
      const novo = await pacienteService.criar(payload as any);
      setPacientes((s) => [novo, ...s]);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      setError("Erro ao criar paciente");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Pacientes</h1>
        <div className="flex gap-2">
          <button onClick={() => setShowForm((s) => !s)} className="rounded bg-blue-600 text-white px-4 py-2">{showForm ? "Fechar" : "Novo"}</button>
        </div>
      </div>

      <div className="mt-4">
        {showForm && (
          <div className="mb-4 rounded border bg-white p-4">
            <FormPaciente onSave={handleCreate} onCancel={() => setShowForm(false)} />
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
                  <th className="px-3 py-2 text-left text-sm font-medium">Nome</th>
                  <th className="px-3 py-2 text-left text-sm font-medium">Telefone</th>
                  <th className="px-3 py-2 text-left text-sm font-medium">Canal</th>
                  <th className="px-3 py-2 text-right text-sm font-medium">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {pacientes.map((p) => (
                  <tr key={p.id}>
                    <td className="px-3 py-2 text-sm">{p.id}</td>
                    <td className="px-3 py-2 text-sm">{p.nome}</td>
                    <td className="px-3 py-2 text-sm">{p.telefone || "-"}</td>
                    <td className="px-3 py-2 text-sm">{p.canalPreferido || "-"}</td>
                    <td className="px-3 py-2 text-sm text-right">
                      <button onClick={() => navigate(`/pacientes/${p.id}`)} className="rounded border px-3 py-1">Editar</button>
                    </td>
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
