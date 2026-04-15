import { useState } from "react";

interface ViewToggleProps {
  initialView?: "grid" | "list";
  onToggle?: (view: "grid" | "list") => void;
}

export function ViewToggle({ initialView = "grid", onToggle }: ViewToggleProps) {
  const [view, setView] = useState(initialView);

  const handleClick = (v: "grid" | "list") => {
    setView(v);
    onToggle?.(v);
  };

  const btnStyle = (active: boolean): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 28,
    border: "none",
    background: active ? "var(--color-accent)" : "transparent",
    color: active ? "var(--color-text-primary)" : "var(--color-text-muted)",
    cursor: "pointer",
    borderRadius: "var(--radius-sm)",
    fontSize: 14,
  });

  return (
    <div
      style={{
        display: "inline-flex",
        gap: 2,
        padding: 2,
        backgroundColor: "var(--color-bg-tertiary)",
        borderRadius: "var(--radius-sm)",
      }}
    >
      <button style={btnStyle(view === "grid")} onClick={() => handleClick("grid")} aria-label="Grid view">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
          <rect x="0" y="0" width="6" height="6" rx="1" />
          <rect x="8" y="0" width="6" height="6" rx="1" />
          <rect x="0" y="8" width="6" height="6" rx="1" />
          <rect x="8" y="8" width="6" height="6" rx="1" />
        </svg>
      </button>
      <button style={btnStyle(view === "list")} onClick={() => handleClick("list")} aria-label="List view">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
          <rect x="0" y="1" width="14" height="2.5" rx="1" />
          <rect x="0" y="5.75" width="14" height="2.5" rx="1" />
          <rect x="0" y="10.5" width="14" height="2.5" rx="1" />
        </svg>
      </button>
    </div>
  );
}
