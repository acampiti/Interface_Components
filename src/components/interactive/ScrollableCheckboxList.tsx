import { useState, useMemo } from "react";
import "./ScrollableCheckboxList.css";

interface ScrollableCheckboxListProps {
  items: string[];
  initialSelected?: string[];
}

export function ScrollableCheckboxList({ items, initialSelected = [] }: ScrollableCheckboxListProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set(initialSelected));
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return items;
    const q = search.toLowerCase();
    return items.filter((item) => item.toLowerCase().includes(q));
  }, [items, search]);

  const allSelected = filtered.length > 0 && filtered.every((item) => selected.has(item));

  const toggle = (item: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  };

  const selectAll = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      for (const item of filtered) next.add(item);
      return next;
    });
  };

  const clearAll = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      for (const item of filtered) next.delete(item);
      return next;
    });
  };

  return (
    <div className="scl-container">
      <div className="scl-header">
        <div className="scl-search-wrapper">
          <svg className="scl-search-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <line x1="9" y1="9" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            className="scl-search"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="scl-search-clear" onClick={() => setSearch("")} aria-label="Clear search">
              &times;
            </button>
          )}
        </div>
        <div className="scl-actions">
          <button className="scl-action" onClick={selectAll} disabled={allSelected}>
            Select All
          </button>
          <button className="scl-action" onClick={clearAll} disabled={selected.size === 0}>
            Clear
          </button>
          <span className="scl-count">{selected.size} selected</span>
        </div>
      </div>
      <div className="scl-list">
        {filtered.length === 0 && (
          <div className="scl-empty">No items match &ldquo;{search}&rdquo;</div>
        )}
        {filtered.map((item) => (
          <label key={item} className="scl-item" onClick={() => toggle(item)}>
            <span className={`scl-checkbox ${selected.has(item) ? "scl-checkbox--checked" : ""}`}>
              {selected.has(item) && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 3.5L3.5 6L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <span className="scl-label">{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
