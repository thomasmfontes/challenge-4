export interface IMedico {
  id: number;
  nome: string;
  especialidade?: string;
}

export type MedicoCreate = Omit<IMedico, "id">;
