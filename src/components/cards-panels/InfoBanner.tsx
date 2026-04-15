interface InfoBannerProps {
  message: string;
  variant?: "info" | "warning" | "error";
}

const VARIANT_STYLES: Record<string, { bg: string; border: string; icon: string }> = {
  info:    { bg: "rgba(45,125,210,0.08)", border: "var(--color-info)",     icon: "\u2139" },
  warning: { bg: "rgba(201,138,26,0.08)", border: "var(--color-warning)",  icon: "\u26A0" },
  error:   { bg: "rgba(179,38,58,0.08)",  border: "var(--color-negative)", icon: "\u2716" },
};

export function InfoBanner({ message, variant = "info" }: InfoBannerProps) {
  const s = VARIANT_STYLES[variant];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 14px",
        backgroundColor: s.bg,
        borderLeft: `3px solid ${s.border}`,
        borderRadius: "var(--radius-sm)",
        fontSize: 13,
        color: "var(--color-text-primary)",
      }}
    >
      <span style={{ fontSize: 16, flexShrink: 0 }}>{s.icon}</span>
      <span>{message}</span>
    </div>
  );
}
