import { useState, useMemo, type ReactNode } from "react";
import "./DataTable.css";

export interface Column<T> {
  key: string;
  label: string;
  width?: string;
  render?: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  sortable?: boolean;
}

type SortDir = "asc" | "desc" | null;

function getField(obj: object, key: string): unknown {
  return (obj as Record<string, unknown>)[key];
}

export function DataTable<T extends object>({
  columns,
  data,
  sortable = true,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);

  function handleSort(key: string) {
    if (!sortable) return;
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else if (sortDir === "asc") {
      setSortDir("desc");
    } else if (sortDir === "desc") {
      setSortKey(null);
      setSortDir(null);
    }
  }

  const sortedData = useMemo(() => {
    if (!sortKey || !sortDir) return data;
    return [...data].sort((a, b) => {
      const av = (a as Record<string, unknown>)[sortKey];
      const bv = (b as Record<string, unknown>)[sortKey];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      const cmp =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  function renderArrow(key: string) {
    if (!sortable) return null;
    const isActive = sortKey === key;
    if (!isActive) {
      return <span className="data-table-sort-arrow">▲</span>;
    }
    return (
      <span className="data-table-sort-arrow active">
        {sortDir === "asc" ? "▲" : "▼"}
      </span>
    );
  }

  return (
    <div className="data-table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={sortable ? "sortable" : undefined}
                style={col.width ? { width: col.width } : undefined}
                onClick={() => handleSort(col.key)}
              >
                {col.label}
                {renderArrow(col.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, i) => (
            <tr key={getField(row, "id") != null ? String(getField(row, "id")) : i}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render
                    ? col.render(row)
                    : String(getField(row, col.key) ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
