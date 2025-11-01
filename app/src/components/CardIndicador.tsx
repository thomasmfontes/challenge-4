type Props = {
  title: string;
  value: string | number;
  className?: string;
};

export default function CardIndicador({ title, value, className = "" }: Props) {
  return (
    <div className={`rounded-lg border p-4 shadow-sm bg-white ${className}`}>
      <div className="text-sm text-slate-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
    </div>
  );
}
