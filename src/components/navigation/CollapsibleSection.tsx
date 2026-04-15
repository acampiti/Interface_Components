import { useState, type ReactNode } from "react";
import "./CollapsibleSection.css";

interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function CollapsibleSection({ title, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="collapsible-section">
      <button className="collapsible-section__header" onClick={() => setOpen(!open)}>
        <span>{title}</span>
        <span className={`collapsible-section__chevron${open ? " collapsible-section__chevron--open" : ""}`}>
          &#9654;
        </span>
      </button>
      <div className={`collapsible-section__body${open ? " collapsible-section__body--open" : ""}`}>
        <div className="collapsible-section__content">{children}</div>
      </div>
    </div>
  );
}
