import "./Breadcrumb.css";

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="breadcrumb__entry">
            {i > 0 && <span className="breadcrumb__separator" aria-hidden="true">›</span>}
            {isLast ? (
              <span className="breadcrumb__item breadcrumb__item--current">{item.label}</span>
            ) : (
              <button
                className="breadcrumb__item breadcrumb__item--link"
                onClick={item.onClick}
                type="button"
              >
                {item.label}
              </button>
            )}
          </span>
        );
      })}
    </nav>
  );
}
