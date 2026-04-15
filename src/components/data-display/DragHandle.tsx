export function DragHandle() {
  return (
    <svg
      width="10"
      height="16"
      viewBox="0 0 10 16"
      style={{ cursor: "grab", opacity: 0.4, flexShrink: 0 }}
    >
      {[2, 7].map((cx) =>
        [2, 6, 10, 14].map((cy) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="1.5"
            fill="var(--color-text-muted)"
          />
        ))
      )}
    </svg>
  );
}
