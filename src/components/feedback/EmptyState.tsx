import "./EmptyState.css";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ title, description, icon = "\u{1F4ED}", action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">{icon}</div>
      <div className="empty-state__title">{title}</div>
      {description && <div className="empty-state__description">{description}</div>}
      {action && (
        <button className="empty-state__action" onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  );
}
