import "./ContextMenu.css";

interface ContextMenuItem {
  label: string;
  icon?: string;
  shortcut?: string;
  divider?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

interface ContextMenuProps {
  items: ContextMenuItem[];
  open: boolean;
  onClose: () => void;
  position?: { x: number; y: number };
}

export function ContextMenu({ items, open, onClose, position }: ContextMenuProps) {
  if (!open) return null;

  return (
    <div
      className="ctx-menu-root"
      style={position ? { left: position.x, top: position.y } : undefined}
    >
      {items.map((item, i) => {
        if (item.divider) {
          return <div key={i} className="ctx-menu-divider" />;
        }

        return (
          <div
            key={i}
            className={`ctx-menu-item${item.disabled ? " ctx-menu-disabled" : ""}`}
            onClick={() => {
              if (!item.disabled) {
                item.onClick?.();
                onClose();
              }
            }}
          >
            {item.icon && <span className="ctx-menu-icon">{item.icon}</span>}
            <span className="ctx-menu-label">{item.label}</span>
            {item.shortcut && (
              <span className="ctx-menu-shortcut">{item.shortcut}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
