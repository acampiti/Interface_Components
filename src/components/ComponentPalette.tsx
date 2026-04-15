const COMPONENT_TYPES = [
  { id: "panel", label: "Panel", desc: "Container with border + title" },
  { id: "button", label: "Button", desc: "Clickable with hover/press" },
  { id: "label", label: "Label", desc: "Text label" },
  { id: "grid", label: "Grid Lines", desc: "Background grid overlay" },
];

interface ComponentPaletteProps {
  onSelect?: (typeId: string) => void;
}

export function ComponentPalette({ onSelect }: ComponentPaletteProps) {
  return (
    <div className="component-palette">
      <h3>Components</h3>
      {COMPONENT_TYPES.map((t) => (
        <button
          key={t.id}
          className="palette-item"
          onClick={() => onSelect?.(t.id)}
        >
          <span className="palette-item-label">{t.label}</span>
          <span className="palette-item-desc">{t.desc}</span>
        </button>
      ))}
    </div>
  );
}
