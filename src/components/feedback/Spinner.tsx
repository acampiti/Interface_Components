import "./Spinner.css";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
}

const SIZE_PX: Record<string, number> = {
  sm: 16,
  md: 24,
  lg: 36,
};

export function Spinner({ size = "md", label }: SpinnerProps) {
  const px = SIZE_PX[size];

  return (
    <div className="spinner-container">
      <div
        className="spinner-ring"
        style={{ width: px, height: px }}
      />
      {label && <span className="spinner-label">{label}</span>}
    </div>
  );
}
