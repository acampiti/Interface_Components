import "./Avatar.css";

interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  status?: "online" | "offline" | "away";
  src?: string;
}

const SIZES: Record<string, number> = { sm: 28, md: 36, lg: 48 };
const DOT_SIZES: Record<string, number> = { sm: 6, md: 8, lg: 8 };

const BG_COLORS = [
  "var(--color-accent)",
  "var(--color-positive)",
  "var(--color-warning)",
  "var(--color-info)",
  "var(--color-accent-secondary, #6366f1)",
  "var(--color-positive-muted, #0d9488)",
  "var(--color-info-muted, #2563eb)",
  "var(--color-warning-muted, #9333ea)",
];

const STATUS_COLORS: Record<string, string> = {
  online: "var(--color-positive)",
  offline: "var(--color-text-muted)",
  away: "var(--color-warning)",
};

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return (words[0]?.[0] ?? "").toUpperCase();
}

export function Avatar({ name, size = "md", status, src }: AvatarProps) {
  const px = SIZES[size];
  const dotPx = DOT_SIZES[size];
  const fontSize = px / 2.5;
  const bg = BG_COLORS[hashName(name) % BG_COLORS.length];

  return (
    <div
      className="avatar-root"
      style={{ width: px, height: px }}
    >
      {src ? (
        <img
          className="avatar-img"
          src={src}
          alt={name}
          width={px}
          height={px}
        />
      ) : (
        <div
          className="avatar-initials"
          style={{ backgroundColor: bg, fontSize }}
        >
          {getInitials(name)}
        </div>
      )}

      {status && (
        <span
          className="avatar-status"
          style={{
            width: dotPx,
            height: dotPx,
            backgroundColor: STATUS_COLORS[status],
          }}
        />
      )}
    </div>
  );
}
