interface MetricBadgeProps {
  value: string;
  variant?: "green" | "blue" | "orange" | "red" | "default";
}

const VARIANT_COLORS: Record<string, { bg: string; text: string }> = {
  green:   { bg: "rgba(34,153,77,0.15)",  text: "var(--color-positive)" },
  blue:    { bg: "rgba(74,158,255,0.15)",  text: "var(--color-info)" },
  orange:  { bg: "rgba(201,138,26,0.15)",  text: "var(--color-warning)" },
  red:     { bg: "rgba(179,38,58,0.15)",   text: "var(--color-negative)" },
  default: { bg: "var(--color-bg-tertiary)", text: "var(--color-text-secondary)" },
};

export function MetricBadge({ value, variant = "default" }: MetricBadgeProps) {
  const colors = VARIANT_COLORS[variant] ?? VARIANT_COLORS.default;
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: "var(--radius-sm)",
        backgroundColor: colors.bg,
        color: colors.text,
        fontSize: 11,
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {value}
    </span>
  );
}
