import { request } from "./api";
import type { IPaciente, PacienteCreate } from "../types/paciente";

const PREFIX = "/api/pacientes";

export async function listar(): Promise<IPaciente[]> {
  return request<IPaciente[]>(`${PREFIX}`);
}

export async function buscarPorId(id: number): Promise<IPaciente> {
  return request<IPaciente>(`${PREFIX}/${id}`);
}

export async function criar(payload: PacienteCreate): Promise<IPaciente> {
  return request<IPaciente>(`${PREFIX}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function atualizar(id: number, payload: Partial<PacienteCreate>): Promise<IPaciente> {
  return request<IPaciente>(`${PREFIX}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function excluir(id: number): Promise<void> {
  return request<void>(`${PREFIX}/${id}`, { method: "DELETE" });
}

export default { listar, buscarPorId, criar, atualizar, excluir };
