import type { SidebarItem } from "@/data/testData";
import "./TextIconSidebar.css";

interface TextIconSidebarProps {
  items: SidebarItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function TextIconSidebar({ items, activeId, onSelect }: TextIconSidebarProps) {
  return (
    <nav className="text-icon-sidebar">
      {items.map((item) => (
        <div key={item.id}>
          <button
            className={`text-icon-sidebar__item${activeId === item.id ? " text-icon-sidebar__item--active" : ""}`}
            onClick={() => onSelect(item.id)}
          >
            <span className="text-icon-sidebar__icon">{item.icon}</span>
            <span className="text-icon-sidebar__label">{item.label}</span>
          </button>
          {item.children && item.children.length > 0 && (
            <div className="text-icon-sidebar__children">
              {item.children.map((child) => (
                <button
                  key={child.id}
                  className={`text-icon-sidebar__child${activeId === child.id ? " text-icon-sidebar__child--active" : ""}`}
                  onClick={() => onSelect(child.id)}
                >
                  <span className="text-icon-sidebar__child-icon">{child.icon}</span>
                  <span className="text-icon-sidebar__label">{child.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
