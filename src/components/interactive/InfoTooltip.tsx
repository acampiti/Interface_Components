import { useState, useRef, useEffect } from "react";
import "./InfoTooltip.css";

interface InfoTooltipProps {
  text: string;
}

export function InfoTooltip({ text }: InfoTooltipProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="info-tooltip-wrapper" ref={ref}>
      <button
        className="info-tooltip-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-label="More info"
      >
        &#x2139;
      </button>
      {open && <div className="info-tooltip-popup">{text}</div>}
    </div>
  );
}
