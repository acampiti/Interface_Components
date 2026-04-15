import "./ToggleSwitch.css";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function ToggleSwitch({ checked, onChange, label, disabled = false }: ToggleSwitchProps) {
  return (
    <label className={`toggle-switch${disabled ? " toggle-switch--disabled" : ""}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={`toggle-track${checked ? " toggle-track--on" : ""}`}
        onClick={() => onChange(!checked)}
        disabled={disabled}
      >
        <span className="toggle-thumb" />
      </button>
      {label && <span className="toggle-label">{label}</span>}
    </label>
  );
}
