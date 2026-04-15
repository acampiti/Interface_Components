interface CreateCardProps {
  onClick: () => void;
  label?: string;
}

export function CreateCard({ onClick, label = "Add New Site" }: CreateCardProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        width: 280,
        minHeight: 180,
        padding: 16,
        background: "transparent",
        border: "2px dashed var(--color-border)",
        borderRadius: "var(--radius-md)",
        color: "var(--color-text-muted)",
        cursor: "pointer",
        transition: "background 0.15s, border-color 0.15s, color 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--color-bg-hover)";
        e.currentTarget.style.borderColor = "var(--color-border-hover)";
        e.currentTarget.style.color = "var(--color-text-secondary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.borderColor = "var(--color-border)";
        e.currentTarget.style.color = "var(--color-text-muted)";
      }}
    >
      <span style={{ fontSize: 28, lineHeight: 1 }}>+</span>
      <span style={{ fontSize: 13 }}>{label}</span>
    </button>
  );
}
