import type { MetricPair } from "@/data/testData";

interface StatsMetricLabelsProps {
  metrics: MetricPair[];
  columns?: number;
}

export function StatsMetricLabels({ metrics, columns = 4 }: StatsMetricLabelsProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 16,
      }}
    >
      {metrics.map((m) => (
        <div key={m.label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontSize: 11, color: "var(--color-text-muted)", textTransform: "uppercase" }}>
            {m.label}
          </span>
          <span style={{ fontSize: 18, fontWeight: 600, color: "var(--color-text-primary)" }}>
            {m.value}
            {m.unit && (
              <span style={{ fontSize: 12, fontWeight: 400, color: "var(--color-text-secondary)", marginLeft: 4 }}>
                {m.unit}
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
