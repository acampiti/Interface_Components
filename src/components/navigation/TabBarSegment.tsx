import "./TabBarSegment.css";

interface Segment {
  label: string;
  value: string;
}

interface TabBarSegmentProps {
  segments: Segment[];
  value: string;
  onChange: (value: string) => void;
}

export function TabBarSegment({ segments, value, onChange }: TabBarSegmentProps) {
  return (
    <div className="tab-bar-segment" role="tablist">
      {segments.map((seg) => (
        <button
          key={seg.value}
          role="tab"
          aria-selected={value === seg.value}
          className={`tab-bar-segment__btn${value === seg.value ? " tab-bar-segment__btn--active" : ""}`}
          onClick={() => onChange(seg.value)}
        >
          {seg.label}
        </button>
      ))}
    </div>
  );
}
