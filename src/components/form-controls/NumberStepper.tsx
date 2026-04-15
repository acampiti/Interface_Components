import "./NumberStepper.css";

interface NumberStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
}

export function NumberStepper({
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  label,
}: NumberStepperProps) {
  const atMin = value <= min;
  const atMax = value >= max;

  const decrement = () => {
    const next = value - step;
    onChange(Math.max(min, next));
  };

  const increment = () => {
    const next = value + step;
    onChange(Math.min(max, next));
  };

  return (
    <div className="number-stepper">
      {label && <span className="number-stepper-label">{label}</span>}
      <div className="number-stepper-row">
        <button
          type="button"
          className="number-stepper-btn"
          onClick={decrement}
          disabled={atMin}
        >
          &minus;
        </button>
        <span className="number-stepper-value">{value}</span>
        <button
          type="button"
          className="number-stepper-btn"
          onClick={increment}
          disabled={atMax}
        >
          +
        </button>
      </div>
    </div>
  );
}
