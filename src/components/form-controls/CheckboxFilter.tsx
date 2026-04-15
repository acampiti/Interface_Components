export interface CheckboxFilterItem {
  label: string;
  count: number;
}

interface CheckboxFilterProps {
  items: CheckboxFilterItem[];
  selected: Set<string>;
  onChange: (selected: Set<string>) => void;
}

export function CheckboxFilter({ items, selected, onChange }: CheckboxFilterProps) {
  const toggle = (label: string) => {
    const next = new Set(selected);
    if (next.has(label)) {
      next.delete(label);
    } else {
      next.add(label);
    }
    onChange(next);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {items.map((item) => {
        const checked = selected.has(item.label);
        return (
          <label
            key={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "7px 10px",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
              fontSize: 13,
              color: "var(--color-text-secondary)",
              transition: "background 0.12s",
              background: "transparent",
              userSelect: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--color-bg-hover)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            <span
              style={{
                width: 16,
                height: 16,
                borderRadius: "var(--radius-sm)",
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
            <span style={{ flex: 1, color: checked ? "var(--color-text-primary)" : undefined }}>
              {item.label}
            </span>
            <span
              style={{
                fontSize: 11,
                padding: "1px 7px",
                borderRadius: 10,
                background: "var(--color-bg-tertiary)",
                color: "var(--color-text-muted)",
                minWidth: 20,
                textAlign: "center",
              }}
            >
              {item.count}
            </span>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => toggle(item.label)}
              style={{ position: "absolute", opacity: 0, width: 0, height: 0, pointerEvents: "none" }}
            />
          </label>
        );
      })}
    </div>
  );
}
