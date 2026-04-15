import { useState, useRef, useEffect, useMemo } from "react";
import { useTheme } from "@/themes/themeContext";
import { THEMES } from "@/themes/themeDefinitions";
import "./ThemeSelector.css";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = THEMES.find((t) => t.id === theme) || THEMES[0];

  const grouped = useMemo(() => {
    const map = new Map<string, typeof THEMES>();
    for (const t of THEMES) {
      const list = map.get(t.category) || [];
      list.push(t);
      map.set(t.category, list);
    }
    return map;
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div className="theme-selector" ref={ref}>
      <button className="theme-selector-btn" onClick={() => setOpen(!open)}>
        <span
          className="theme-dot"
          style={{ background: current.previewColor }}
        />
        <span>{current.label}</span>
        <span className="theme-chevron">{open ? "\u25B4" : "\u25BE"}</span>
      </button>
      {open && (
        <div className="theme-dropdown">
          {[...grouped.entries()].map(([category, themes]) => (
            <div key={category}>
              <div className="theme-category-label">{category}</div>
              {themes.map((t) => (
                <button
                  key={t.id}
                  className={`theme-option ${t.id === theme ? "active" : ""}`}
                  onClick={() => {
                    setTheme(t.id);
                    setOpen(false);
                  }}
                >
                  <span
                    className="theme-dot"
                    style={{ background: t.previewColor }}
                  />
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
