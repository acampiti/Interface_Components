import { useRef, useCallback } from "react";
import "./RangeSlider.css";

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  labels?: string[];
}

export function RangeSlider({ min, max, step, value, onChange, labels }: RangeSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const stepCount = Math.round((max - min) / step);
  const fraction = (value - min) / (max - min);

  const snap = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const raw = min + pct * (max - min);
      const snapped = Math.round(raw / step) * step;
      const clamped = Math.max(min, Math.min(max, snapped));
      onChange(clamped);
    },
    [min, max, step, onChange]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    snap(e.clientX);

    const move = (ev: PointerEvent) => snap(ev.clientX);
    const up = () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
  };

  // Build stop positions
  const stops: number[] = [];
  for (let i = 0; i <= stepCount; i++) {
    stops.push(i / stepCount);
  }

  return (
    <div className="range-slider">
      <div className="range-track-area" ref={trackRef} onPointerDown={handlePointerDown}>
        {/* Background track */}
        <div className="range-track" />

        {/* Filled track */}
        <div className="range-track-fill" style={{ width: `${fraction * 100}%` }} />

        {/* Stop dots */}
        {stops.map((pct, i) => (
          <div
            key={i}
            className={`range-stop${pct <= fraction ? " range-stop--active" : ""}`}
            style={{ left: `${pct * 100}%` }}
          />
        ))}

        {/* Thumb */}
        <div className="range-thumb" style={{ left: `${fraction * 100}%` }} />
      </div>

      {/* Labels */}
      {labels && labels.length > 0 && (
        <div className="range-labels">
          {labels.map((label, i) => {
            const pct = i / (labels.length - 1);
            return (
              <span
                key={i}
                className={`range-label${Math.abs(pct - fraction) < 0.001 ? " range-label--active" : ""}`}
                style={{ left: `${pct * 100}%` }}
              >
                {label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
