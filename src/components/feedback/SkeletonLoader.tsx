import "./SkeletonLoader.css";

interface SkeletonLoaderProps {
  variant?: "text" | "circle" | "rect";
  width?: string | number;
  height?: string | number;
  lines?: number;
}

function toPx(value: string | number | undefined, fallback: string): string {
  if (value === undefined) return fallback;
  return typeof value === "number" ? `${value}px` : value;
}

export function SkeletonLoader({
  variant = "text",
  width,
  height,
  lines = 3,
}: SkeletonLoaderProps) {
  if (variant === "circle") {
    const d = toPx(width ?? height, "40px");
    return (
      <div
        className="skeleton skeleton-circle"
        style={{ width: d, height: d }}
      />
    );
  }

  if (variant === "rect") {
    return (
      <div
        className="skeleton skeleton-rect"
        style={{
          width: toPx(width, "100%"),
          height: toPx(height, "100px"),
        }}
      />
    );
  }

  // text variant
  const arr = Array.from({ length: lines }, (_, i) => i);
  return (
    <div className="skeleton-text-group">
      {arr.map((i) => (
        <div
          key={i}
          className="skeleton skeleton-text"
          style={{
            width: i === lines - 1 ? "60%" : "100%",
            height: toPx(height, "12px"),
          }}
        />
      ))}
    </div>
  );
}
