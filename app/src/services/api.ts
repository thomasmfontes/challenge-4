// API genérica pronta para integração com backend Java
export const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || "http://localhost:8080";

export async function request<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  try {
    const res = await fetch(url, opts);
    const text = await res.text();
    let body: any = null;
    try { body = text ? JSON.parse(text) : null; } catch { body = text; }
    if (!res.ok) {
      const message = (body && body.message) || body || res.statusText;
      throw new Error(`${res.status} ${res.statusText} - ${message}`);
    }
    return body as T;
  } catch (err) {
    // rethrow para o consumer tratar
    throw err;
  }
}

// --- Compatibilidade com API de 'integrantes' que já existia no template ---
const INTEGRANTES_PREFIX = "/integrantes";

export async function listIntegrantes<T = any[]>(): Promise<T> {
  return request<T>(`${INTEGRANTES_PREFIX}`);
}

export async function getIntegrante<T = any>(rm: string): Promise<T> {
  return request<T>(`${INTEGRANTES_PREFIX}/${encodeURIComponent(rm)}`);
}

export async function createIntegrante<T = any>(payload: any): Promise<T> {
  return request<T>(`${INTEGRANTES_PREFIX}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function updateIntegrante<T = any>(rm: string, payload: any): Promise<T> {
  return request<T>(`${INTEGRANTES_PREFIX}/${encodeURIComponent(rm)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function deleteIntegrante(rm: string): Promise<void> {
  return request<void>(`${INTEGRANTES_PREFIX}/${encodeURIComponent(rm)}`, { method: "DELETE" });
}

export default { API_BASE_URL, request, listIntegrantes, getIntegrante, createIntegrante, updateIntegrante, deleteIntegrante };
