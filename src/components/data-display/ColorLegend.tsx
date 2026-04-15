import type { LegendItem } from "@/data/testData";

interface ColorLegendProps {
  items: LegendItem[];
}

export function ColorLegend({ items }: ColorLegendProps) {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
      {items.map((item) => (
        <span
          key={item.label}
          style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12 }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: 2,
              backgroundColor: item.color,
              border: item.color === "transparent" ? "1px solid var(--color-border)" : "none",
              flexShrink: 0,
            }}
          />
          <span style={{ color: "var(--color-text-secondary)" }}>{item.label}</span>
        </span>
      ))}
    </div>
  );
}
