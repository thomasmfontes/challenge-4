import type { IPaciente } from "./paciente";

export type ConsultaStatus = "AGENDADA" | "CONFIRMADA" | "FALTOU";

export interface IConsulta {
  id: number;
  pacienteId: number;
  medicoId: number;
  dataHora: string; // ISO string
  status: ConsultaStatus;
  riscoAbsenteismo?: number; // 0-100
}

export type IConsultaComPaciente = IConsulta & { paciente?: IPaciente };
