interface CheckboxSelectionProps {
  items: string[];
  selected: Set<string>;
  onChange: (selected: Set<string>) => void;
}

export function CheckboxSelection({ items, selected, onChange }: CheckboxSelectionProps) {
  const toggle = (item: string) => {
    const next = new Set(selected);
    if (next.has(item)) {
      next.delete(item);
    } else {
      next.add(item);
    }
    onChange(next);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 1,
        background: "var(--color-border)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        border: "1px solid var(--color-border)",
      }}
    >
      {items.map((item) => {
        const checked = selected.has(item);
        return (
          <label
            key={item}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 12px",
              cursor: "pointer",
              fontSize: 13,
              background: "var(--color-bg-secondary)",
              color: checked ? "var(--color-text-primary)" : "var(--color-text-secondary)",
              userSelect: "none",
              transition: "background 0.12s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--color-bg-hover)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--color-bg-secondary)";
            }}
          >
            <span
              style={{
                width: 16,
                height: 16,
                borderRadius: 3,
                border: checked ? "none" : "2px solid var(--color-border)",
                background: checked ? "var(--color-accent)" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.12s",
              }}
            >
              {checked && (
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6L5 8.5L9.5 3.5" stroke="var(--color-accent-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <span>{item}</span>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => toggle(item)}
              style={{ position: "absolute", opacity: 0, width: 0, height: 0, pointerEvents: "none" }}
            />
          </label>
        );
      })}
    </div>
  );
}
