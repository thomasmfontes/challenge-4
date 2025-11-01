type AlertProps = {
  tipo?: "error" | "success" | "info";
  mensagem: string;
};

export default function Alert({ tipo = "info", mensagem }: AlertProps) {
  const base = "rounded-md p-3 text-sm";
  const classes =
    tipo === "error"
      ? `${base} bg-red-50 text-red-800 border border-red-200`
      : tipo === "success"
      ? `${base} bg-green-50 text-green-800 border border-green-200`
      : `${base} bg-blue-50 text-blue-800 border border-blue-200`;

  return <div role="alert" className={classes}>{mensagem}</div>;
}
