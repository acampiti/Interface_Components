interface ActionLink {
  label: string;
  onClick?: () => void;
}

interface ActionLinksProps {
  links: ActionLink[];
}

export function ActionLinks({ links }: ActionLinksProps) {
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {links.map((link) => (
        <button
          key={link.label}
          onClick={link.onClick}
          style={{
            background: "none",
            border: "none",
            color: "var(--color-accent-text)",
            fontSize: 13,
            cursor: "pointer",
            padding: 0,
            textDecoration: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          {link.label}
        </button>
      ))}
    </div>
  );
}
