import type { SidebarItem } from "@/data/testData";
import "./IconOnlySidebar.css";

interface IconOnlySidebarProps {
  items: SidebarItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function IconOnlySidebar({ items, activeId, onSelect }: IconOnlySidebarProps) {
  return (
    <nav className="icon-only-sidebar">
      {items.map((item) => (
        <button
          key={item.id}
          className={`icon-only-sidebar__item${activeId === item.id ? " icon-only-sidebar__item--active" : ""}`}
          onClick={() => onSelect(item.id)}
        >
          {item.icon}
          <span className="icon-only-sidebar__tooltip">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
