import { useRef, useEffect, useCallback, useState } from "react";
import "./DOMTable.css";

// ── Types ────────────────────────────────────────────────

export interface DOMColumnDef {
  key: string;
  label: string;
  width?: number;          // initial width in px (default 120)
  minWidth?: number;       // minimum resize width (default 40)
  fontSize?: number;       // per-column font size in px
  fontColor?: string;      // per-column text color (CSS value)
  bgColor?: string;        // per-column background color
  align?: "left" | "center" | "right";
}

export interface DOMTableProps {
  columns: DOMColumnDef[];
  data: Record<string, string | number>[];
  rowHeight?: number;      // initial row height in px (default 30)
  minRowHeight?: number;   // minimum row resize height (default 20)
  gridColor?: string;      // grid line color override
  maxHeight?: number;      // scrollable max height
  onCellRef?: (rowIdx: number, colKey: string, el: HTMLTableCellElement) => void;
}

// ── Imperative handle for ultra-fast cell updates ────────

export interface DOMTableHandle {
  updateCell: (rowIdx: number, colKey: string, value: string) => void;
  updateCellStyle: (rowIdx: number, colKey: string, style: Partial<CSSStyleDeclaration>) => void;
  updateColumn: (colKey: string, values: string[]) => void;
}

// ── Component ────────────────────────────────────────────

export function DOMTable({
  columns: initialColumns,
  data,
  rowHeight: initRowHeight = 30,
  minRowHeight = 20,
  gridColor,
  maxHeight,
  onCellRef,
}: DOMTableProps) {
  const tableRef = useRef<HTMLTableElement>(null);
  const cellRefs = useRef<Map<string, HTMLTableCellElement>>(new Map());
  const [colWidths, setColWidths] = useState<number[]>(
    initialColumns.map((c) => c.width ?? 120)
  );
  const [rowHeights, setRowHeights] = useState<number[]>(
    data.map(() => initRowHeight)
  );

  // Stable ref for resize drag state
  const dragState = useRef<{
    type: "col" | "row";
    index: number;
    startPos: number;
    startSize: number;
  } | null>(null);

  // ── Cell ref registration ────────────────────────────

  const setCellRef = useCallback(
    (rowIdx: number, colKey: string, el: HTMLTableCellElement | null) => {
      const key = `${rowIdx}:${colKey}`;
      if (el) {
        cellRefs.current.set(key, el);
        onCellRef?.(rowIdx, colKey, el);
      } else {
        cellRefs.current.delete(key);
      }
    },
    [onCellRef]
  );

  // ── Column resize ────────────────────────────────────

  const handleColResizeDown = useCallback(
    (colIdx: number, e: React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      (e.target as HTMLElement).classList.add("dragging");
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      dragState.current = {
        type: "col",
        index: colIdx,
        startPos: e.clientX,
        startSize: colWidths[colIdx],
      };
    },
    [colWidths]
  );

  const handleColResizeMove = useCallback(
    (colIdx: number, e: React.PointerEvent) => {
      const ds = dragState.current;
      if (!ds || ds.type !== "col" || ds.index !== colIdx) return;
      const delta = e.clientX - ds.startPos;
      const minW = initialColumns[colIdx].minWidth ?? 40;
      const newWidth = Math.max(minW, ds.startSize + delta);
      setColWidths((prev) => {
        const next = [...prev];
        next[colIdx] = newWidth;
        return next;
      });
    },
    [initialColumns]
  );

  const handleColResizeUp = useCallback(
    (_colIdx: number, e: React.PointerEvent) => {
      (e.target as HTMLElement).classList.remove("dragging");
      dragState.current = null;
    },
    []
  );

  // ── Row resize ───────────────────────────────────────

  const handleRowResizeDown = useCallback(
    (rowIdx: number, e: React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      dragState.current = {
        type: "row",
        index: rowIdx,
        startPos: e.clientY,
        startSize: rowHeights[rowIdx],
      };
    },
    [rowHeights]
  );

  const handleRowResizeMove = useCallback(
    (rowIdx: number, e: React.PointerEvent) => {
      const ds = dragState.current;
      if (!ds || ds.type !== "row" || ds.index !== rowIdx) return;
      const delta = e.clientY - ds.startPos;
      const newHeight = Math.max(minRowHeight, ds.startSize + delta);
      setRowHeights((prev) => {
        const next = [...prev];
        next[rowIdx] = newHeight;
        return next;
      });
    },
    [minRowHeight]
  );

  const handleRowResizeUp = useCallback(
    (_rowIdx: number, _e: React.PointerEvent) => {
      dragState.current = null;
    },
    []
  );

  // ── Sync row heights when data length changes ────────

  useEffect(() => {
    setRowHeights((prev) => {
      if (prev.length === data.length) return prev;
      const next = data.map((_, i) => prev[i] ?? initRowHeight);
      return next;
    });
  }, [data.length, initRowHeight]);

  // ── Render ───────────────────────────────────────────

  const wrapStyle: React.CSSProperties = {
    maxHeight: maxHeight ? `${maxHeight}px` : undefined,
  };
  if (gridColor) {
    (wrapStyle as Record<string, string>)["--dom-grid-color"] = gridColor;
  }

  return (
    <div className="dom-table-wrap" style={wrapStyle}>
      <table className="dom-table" ref={tableRef}>
        <colgroup>
          {colWidths.map((w, i) => (
            <col key={initialColumns[i].key} style={{ width: `${w}px` }} />
          ))}
        </colgroup>

        <thead>
          <tr>
            {initialColumns.map((col, colIdx) => (
              <th key={col.key}>
                <div className="dom-th-content" style={{ justifyContent: col.align === "right" ? "flex-end" : col.align === "center" ? "center" : "flex-start" }}>
                  {col.label}
                </div>
                <div
                  className="dom-col-resize"
                  onPointerDown={(e) => handleColResizeDown(colIdx, e)}
                  onPointerMove={(e) => handleColResizeMove(colIdx, e)}
                  onPointerUp={(e) => handleColResizeUp(colIdx, e)}
                />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} style={{ height: `${rowHeights[rowIdx] ?? initRowHeight}px` }}>
              {initialColumns.map((col) => (
                <td
                  key={col.key}
                  ref={(el) => setCellRef(rowIdx, col.key, el)}
                  style={{
                    fontSize: col.fontSize ? `${col.fontSize}px` : undefined,
                    color: col.fontColor || undefined,
                    backgroundColor: col.bgColor || undefined,
                    textAlign: col.align || "left",
                    height: `${rowHeights[rowIdx] ?? initRowHeight}px`,
                    padding: `${Math.max(2, ((rowHeights[rowIdx] ?? initRowHeight) - (col.fontSize ?? 13)) / 2 - 2)}px 10px`,
                  }}
                >
                  {String(row[col.key] ?? "")}
                  {/* Row resize handle on first column only */}
                  {col.key === initialColumns[0].key && (
                    <div
                      className="dom-row-resize"
                      onPointerDown={(e) => handleRowResizeDown(rowIdx, e)}
                      onPointerMove={(e) => handleRowResizeMove(rowIdx, e)}
                      onPointerUp={(e) => handleRowResizeUp(rowIdx, e)}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Hook for imperative fast updates ─────────────────────

export function useDOMTableRef(): {
  cellRefs: React.MutableRefObject<Map<string, HTMLTableCellElement>>;
  updateCell: (rowIdx: number, colKey: string, value: string) => void;
  updateCellStyle: (rowIdx: number, colKey: string, styles: Partial<CSSStyleDeclaration>) => void;
  updateColumn: (colKey: string, rowCount: number, values: string[]) => void;
  onCellRef: (rowIdx: number, colKey: string, el: HTMLTableCellElement) => void;
} {
  const cellRefs = useRef<Map<string, HTMLTableCellElement>>(new Map());

  const onCellRef = useCallback(
    (rowIdx: number, colKey: string, el: HTMLTableCellElement) => {
      cellRefs.current.set(`${rowIdx}:${colKey}`, el);
    },
    []
  );

  const updateCell = useCallback(
    (rowIdx: number, colKey: string, value: string) => {
      const el = cellRefs.current.get(`${rowIdx}:${colKey}`);
      if (el) el.textContent = value;
    },
    []
  );

  const updateCellStyle = useCallback(
    (rowIdx: number, colKey: string, styles: Partial<CSSStyleDeclaration>) => {
      const el = cellRefs.current.get(`${rowIdx}:${colKey}`);
      if (el) Object.assign(el.style, styles);
    },
    []
  );

  const updateColumn = useCallback(
    (colKey: string, rowCount: number, values: string[]) => {
      for (let i = 0; i < rowCount && i < values.length; i++) {
        const el = cellRefs.current.get(`${i}:${colKey}`);
        if (el) el.textContent = values[i];
      }
    },
    []
  );

  return { cellRefs, updateCell, updateCellStyle, updateColumn, onCellRef };
}
