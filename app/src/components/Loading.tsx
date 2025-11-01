export default function Loading({ size = 6 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center py-6">
      <div
        className="animate-spin rounded-full border-4 border-t-transparent"
        style={{ width: `${size}rem`, height: `${size}rem`, borderColor: "#cbd5e1" }}
      />
    </div>
  );
}
