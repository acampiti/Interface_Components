import { useRef, useEffect } from "react";
import { getCSSColor } from "@/themes/glThemeBridge";

interface GLProgressBarProps {
  value: number; // 0..1
  label: string;
  width?: number;
  height?: number;
}

export function GLProgressBar({ value, label, width = 700, height = 44 }: GLProgressBarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    // ── Theme colors ──
    const bgColor = getCSSColor("--color-bg-secondary");
    const trackColor = getCSSColor("--color-bg-tertiary");
    const fillColor = getCSSColor("--color-accent");
    const textPrimary = getCSSColor("--color-text-primary");
    const textMuted = getCSSColor("--color-text-muted");

    // ── Layout ──
    const pad = { left: 16, right: 16 };
    const labelH = 18;
    const barH = 8;
    const barY = labelH + 6;
    const barW = width - pad.left - pad.right;
    const clamped = Math.max(0, Math.min(1, value));

    // ── Background ──
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // ── Label (left) ──
    ctx.font = "12px 'Inter', system-ui, sans-serif";
    ctx.fillStyle = textPrimary;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(label, pad.left, 4);

    // ── Percentage (right) ──
    ctx.fillStyle = textMuted;
    ctx.textAlign = "right";
    ctx.fillText(`${Math.round(clamped * 100)}%`, width - pad.right, 4);

    // ── Track ──
    const radius = barH / 2;
    ctx.fillStyle = trackColor;
    ctx.beginPath();
    ctx.roundRect(pad.left, barY, barW, barH, radius);
    ctx.fill();

    // ── Fill ──
    const fillW = clamped * barW;
    if (fillW > 0) {
      ctx.fillStyle = fillColor;
      ctx.beginPath();
      ctx.roundRect(pad.left, barY, Math.max(fillW, barH), barH, radius);
      ctx.fill();
    }
  }, [value, label, width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--color-border)",
      }}
    />
  );
}
