export const API_BASE_URL =
  ((import.meta.env as any).VITE_API_BASE_URL as string) ||
  ((import.meta.env as any).VITE_API_URL as string) ||
  "https://consultas-medicas-api-423158965119.southamerica-east1.run.app";

export class HttpError extends Error {
  status: number;
  statusText: string;
  body: any;
  url: string;
  constructor(message: string, init: { status: number; statusText: string; body: any; url: string }) {
    super(message);
    this.name = "HttpError";
    this.status = init.status;
    this.statusText = init.statusText;
    this.body = init.body;
    this.url = init.url;
  }
}

function extractMessage(body: any): string | undefined {
  if (!body) return undefined;
  if (typeof body === "string") return body;
  const keys = [
    "mensagem",
    "message",
    "erro",
    "error",
    "detail",
    "details",
    "title",
  ];
  for (const k of keys) {
    if (body?.[k]) return String(body[k]);
  }
  if (Array.isArray(body?.errors)) {
    return body.errors.map((e: any) => e?.message || e?.mensagem || JSON.stringify(e)).join("; ");
  }
  return undefined;
}

export async function request<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  try {
    const res = await fetch(url, opts);
    const text = await res.text();
    let body: any = null;
    try { body = text ? JSON.parse(text) : null; } catch { body = text; }
    if (!res.ok) {
      const msg = extractMessage(body) ?? (typeof body === "string" ? body : undefined) ?? res.statusText;
      const pretty = typeof msg === "string" ? msg : JSON.stringify(msg);
      throw new HttpError(`${res.status} ${res.statusText} - ${pretty}`, {
        status: res.status,
        statusText: res.statusText,
        body,
        url,
      });
    }
    return body as T;
  } catch (err) {
    throw err;
  }
}

export async function listarConsultas() {
  return request<import("../types/consulta").ConsultaApi[]>("/api/consultas");
}

export async function listarConsultasAltoRisco() {
  return request<import("../types/consulta").ConsultaApi[]>("/api/consultas/alto-risco");
}

export async function confirmarConsulta(id: number) {
  return request<import("../types/consulta").ConsultaApi>(`/api/consultas/${id}/confirmar`, { method: "POST" });
}

export async function enviarNotificacao(payload: {
  consultaId: number;
  canal: "WHATSAPP" | "SMS" | "EMAIL" | "VOZ" | "LIGACAO";
  paraCuidador?: boolean;
}) {

  const body: Record<string, unknown> = {
    consultaId: payload.consultaId,
    canal: payload.canal,
    paraCuidador: payload.paraCuidador ?? false,

    idConsulta: payload.consultaId,
    dsCanal: payload.canal,

    id_consulta: payload.consultaId,
    ds_canal: payload.canal,
  };

  return request<{ ok: true }>(`/api/notificacoes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function enviarDeviceCheck(payload: {
  consultaId: number;
  cameraOk: boolean;
  microfoneOk: boolean;
  redeOk: boolean;
}) {
  
  const yesNo = (v: boolean) => (v ? "S" : "N");
  const body = {
    idConsulta: payload.consultaId,
    stCameraOk: yesNo(payload.cameraOk),
    stMicrofoneOk: yesNo(payload.microfoneOk),
    stConexaoOk: yesNo(payload.redeOk),
    dtTeste: new Date().toISOString(),
  };

  return request<{ ok: true; novoRisco?: number }>(`/api/device-check`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export function mapConsulta(c: any): import("../types/consulta").IConsultaComPaciente {
  const norm: Record<string, any> = {};
  Object.keys(c || {}).forEach((k) => (norm[k.replace(/_/g, "").toLowerCase()] = (c as any)[k]));

  const id = norm["id"] ?? norm["idconsulta"] ?? c?.id ?? c?.idConsulta;
  const pacienteId = norm["pacienteid"] ?? norm["idpaciente"] ?? c?.pacienteId ?? c?.idPaciente;
  const medicoId = norm["medicoid"] ?? norm["idmedico"] ?? c?.medicoId ?? c?.idMedico;
  const dataHora = norm["datahora"] ?? norm["dtconsulta"] ?? c?.dataHora ?? c?.dtConsulta;
  const status = norm["status"] ?? norm["stconsulta"] ?? c?.status ?? c?.stConsulta;
  const risco = norm["riscoabsenteismo"] ?? norm["vlriscoabs"] ?? (c as any)?.risco_absenteismo ?? c?.riscoAbsenteismo ?? 0;
  const paciente = c?.paciente; 

  return {
    id,
    pacienteId,
    medicoId,
    dataHora,
    status,
    riscoAbsenteismo: typeof risco === "number" ? risco : Number(risco) || 0,
    paciente,
  } as import("../types/consulta").IConsultaComPaciente;
}

export default { API_BASE_URL, request };