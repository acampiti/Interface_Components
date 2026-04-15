import "./Toast.css";

interface ToastProps {
  message: string;
  variant?: "info" | "success" | "warning" | "error";
  onClose?: () => void;
  visible: boolean;
}

const VARIANT_COLOR: Record<string, string> = {
  info: "var(--color-info)",
  success: "var(--color-positive)",
  warning: "var(--color-warning)",
  error: "var(--color-negative)",
};

export function Toast({
  message,
  variant = "info",
  onClose,
  visible,
}: ToastProps) {
  if (!visible) return null;

  return (
    <div
      className="toast"
      style={{ borderLeftColor: VARIANT_COLOR[variant] }}
    >
      <span
        className="toast-dot"
        style={{ backgroundColor: VARIANT_COLOR[variant] }}
      />
      <span className="toast-message">{message}</span>
      {onClose && (
        <button
          className="toast-close"
          onClick={onClose}
          aria-label="Close"
        >
          &#x2715;
        </button>
      )}
    </div>
  );
}
