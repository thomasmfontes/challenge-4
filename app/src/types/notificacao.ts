export type CanalNotificacao = "WHATSAPP" | "VOZ";
export type NotificacaoStatus = "ENVIADA" | "FALHOU";

export interface INotificacao {
  id: number;
  consultaId: number;
  canal: CanalNotificacao;
  dataEnvio: string;
  status: NotificacaoStatus;
}
