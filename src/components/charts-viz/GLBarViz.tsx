import { useRef, useEffect } from "react";
import type { BarSegment } from "@/data/testData";
import { getCSSColor } from "@/themes/glThemeBridge";

interface GLBarVizProps {
  segments: BarSegment[];
  width?: number;
  height?: number;
}

function resolveColor(color: string): string {
  if (color.startsWith("var(")) return getCSSColor(color);
  return color;
}

export function GLBarViz({ segments, width = 700, height = 100 }: GLBarVizProps) {
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
    const textPrimary = getCSSColor("--color-text-primary");
    // ── Layout ──
    const pad = { top: 12, right: 16, bottom: 36, left: 16 };
    const barH = 28;
    const barY = pad.top;
    const barW = width - pad.left - pad.right;

    // ── Background ──
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // ── Compute total ──
    const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;

    // ── Draw segments ──
    let x = pad.left;
    const segmentRects: { x: number; w: number; color: string; label: string; pct: number }[] = [];

    for (const seg of segments) {
      const pct = seg.value / total;
      const w = pct * barW;
      const color = resolveColor(seg.color);

      // Rounded ends for first and last segment
      const radius = 4;
      const isFirst = seg === segments[0];
      const isLast = seg === segments[segments.length - 1];

      ctx.fillStyle = color;
      ctx.beginPath();
      if (isFirst && isLast) {
        ctx.roundRect(x, barY, w, barH, radius);
      } else if (isFirst) {
        ctx.roundRect(x, barY, w, barH, [radius, 0, 0, radius]);
      } else if (isLast) {
        ctx.roundRect(x, barY, w, barH, [0, radius, radius, 0]);
      } else {
        ctx.rect(x, barY, w, barH);
      }
      ctx.fill();

      // Label inside segment if wide enough
      ctx.font = "bold 12px 'Inter', system-ui, sans-serif";
      const pctText = `${Math.round(pct * 100)}%`;
      const textW = ctx.measureText(pctText).width;
      if (w > textW + 12) {
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(pctText, x + w / 2, barY + barH / 2);
      }

      segmentRects.push({ x, w, color, label: seg.label, pct });
      x += w;
    }

    // ── Legend row below bar ──
    ctx.font = "11px 'Inter', system-ui, sans-serif";
    ctx.textBaseline = "top";
    const legendY = barY + barH + 12;
    let lx = pad.left;

    for (const sr of segmentRects) {
      // Swatch
      ctx.fillStyle = sr.color;
      ctx.beginPath();
      ctx.roundRect(lx, legendY, 10, 10, 2);
      ctx.fill();

      // Text
      ctx.fillStyle = textPrimary;
      ctx.textAlign = "left";
      const labelText = `${sr.label} (${Math.round(sr.pct * 100)}%)`;
      ctx.fillText(labelText, lx + 14, legendY);
      lx += ctx.measureText(labelText).width + 28;
    }
  }, [segments, width, height]);

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
