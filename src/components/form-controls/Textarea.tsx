import "./Textarea.css";

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
}

export function Textarea({
  value,
  onChange,
  placeholder,
  maxLength,
  rows = 4,
}: TextareaProps) {
  return (
    <div className="textarea-wrapper">
      <textarea
        className="textarea-field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
      />
      {maxLength != null && (
        <span className="textarea-counter">
          {value.length} / {maxLength}
        </span>
      )}
    </div>
  );
}
