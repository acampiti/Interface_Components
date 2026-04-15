interface DeviceIconBadgeProps {
  icon: string;
  label: string;
  status?: "online" | "offline";
  size?: number;
}

export function DeviceIconBadge({ icon, label, status = "online", size = 48 }: DeviceIconBadgeProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: "var(--color-bg-tertiary)",
          border: `2px solid ${status === "online" ? "var(--color-positive)" : "var(--color-border)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.45,
        }}
      >
        {icon}
      </div>
      <span style={{ fontSize: 11, color: "var(--color-text-secondary)", textAlign: "center" }}>
        {label}
      </span>
    </div>
  );
}
