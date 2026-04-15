import type { ReactNode } from "react";
import "./ShowcasePage.css";

interface ShowcaseGroupProps {
  title: string;
  description?: string;
  componentName?: string;
  children: ReactNode;
}

export function ShowcaseGroup({ title, description, componentName, children }: ShowcaseGroupProps) {
  return (
    <div className="showcase-group">
      <div className="showcase-group-header">
        <div className="showcase-group-header-row">
          <h3>{title}</h3>
          {componentName && (
            <span className="showcase-help-icon" data-tooltip={componentName}>
              ?
            </span>
          )}
        </div>
        {description && <p>{description}</p>}
      </div>
      <div className="showcase-group-content">{children}</div>
    </div>
  );
}

interface ShowcasePageProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function ShowcasePage({ title, description, children }: ShowcasePageProps) {
  return (
    <div className="showcase-page">
      <div className="showcase-page-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="showcase-page-content">{children}</div>
    </div>
  );
}
