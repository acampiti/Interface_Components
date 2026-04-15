import type { TableRow } from "@/data/testData";

interface StatusDotsProps {
  status: TableRow["status"];
  label?: boolean;
}

const STATUS_COLORS: Record<TableRow["status"], string> = {
  online: "var(--color-positive)",
  offline: "var(--color-negative)",
  pending: "var(--color-warning)",
};

export function StatusDot({ status, label = false }: StatusDotsProps) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: STATUS_COLORS[status],
          flexShrink: 0,
        }}
      />
      {label && (
        <span style={{ textTransform: "capitalize", fontSize: 12 }}>
          {status}
        </span>
      )}
    </span>
  );
}
