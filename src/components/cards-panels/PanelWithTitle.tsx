import type { ReactNode } from "react";

interface PanelWithTitleProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function PanelWithTitle({ title, children, actions }: PanelWithTitleProps) {
  return (
    <div
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 13, color: "var(--color-text-primary)" }}>
          {title}
        </span>
        {actions && <div style={{ display: "flex", gap: 8 }}>{actions}</div>}
      </div>
      <div style={{ padding: 16 }}>{children}</div>
    </div>
  );
}
