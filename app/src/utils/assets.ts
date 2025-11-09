const avatarMap = import.meta.glob("../assets/img/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const FALLBACK = "/vite.svg";

export function resolveAvatar(input?: string): string {
  if (!input) return FALLBACK;

  const filename = input.split("/").pop() || input;
  const key = `../assets/img/${filename}`;

  return avatarMap[key] ?? FALLBACK;
}
