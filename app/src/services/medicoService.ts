import { request } from "./api";
import type { IMedico, MedicoCreate } from "../types/medico";

const PREFIX = "/api/medicos";

export async function listar(): Promise<IMedico[]> {
  return request<IMedico[]>(`${PREFIX}`);
}

export async function buscarPorId(id: number): Promise<IMedico> {
  return request<IMedico>(`${PREFIX}/${id}`);
}

export async function criar(payload: MedicoCreate): Promise<IMedico> {
  return request<IMedico>(`${PREFIX}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function atualizar(id: number, payload: Partial<MedicoCreate>): Promise<IMedico> {
  return request<IMedico>(`${PREFIX}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function excluir(id: number): Promise<void> {
  return request<void>(`${PREFIX}/${id}`, { method: "DELETE" });
}

export default { listar, buscarPorId, criar, atualizar, excluir };
