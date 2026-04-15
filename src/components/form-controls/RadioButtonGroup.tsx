import "./RadioButtonGroup.css";

export interface RadioOption {
  label: string;
  value: string;
  info?: boolean;
}

interface RadioButtonGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
}

export function RadioButtonGroup({ options, value, onChange }: RadioButtonGroupProps) {
  return (
    <div className="radio-group">
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <label key={opt.value} className={`radio-item${selected ? " radio-item--selected" : ""}`}>
            <span className="radio-indicator">
              <span className="radio-outer" />
              {selected && <span className="radio-inner" />}
            </span>
            <span className="radio-label">{opt.label}</span>
            {opt.info && (
              <span className="radio-info" title={`More info about ${opt.label}`}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <text x="8" y="12" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="600">i</text>
                </svg>
              </span>
            )}
            <input
              type="radio"
              name="radio-group"
              value={opt.value}
              checked={selected}
              onChange={() => onChange(opt.value)}
              className="radio-hidden"
            />
          </label>
        );
      })}
    </div>
  );
}
