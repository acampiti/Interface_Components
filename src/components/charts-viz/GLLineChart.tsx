import { useRef, useEffect } from "react";
import type { ChartSeries } from "@/data/testData";
import { getCSSColor } from "@/themes/glThemeBridge";

interface GLLineChartProps {
  series: ChartSeries[];
  width?: number;
  height?: number;
}

/** Resolve a color string — if it starts with "var(" read the CSS var, otherwise pass through. */
function resolveColor(color: string): string {
  if (color.startsWith("var(")) return getCSSColor(color);
  return color;
}

export function GLLineChart({ series, width = 700, height = 320 }: GLLineChartProps) {
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
    const borderColor = getCSSColor("--color-border");
    const textPrimary = getCSSColor("--color-text-primary");
    const textSecondary = getCSSColor("--color-text-secondary");
    const textMuted = getCSSColor("--color-text-muted");

    // ── Layout ──
    const pad = { top: 20, right: 24, bottom: 52, left: 58 };
    const plotW = width - pad.left - pad.right;
    const plotH = height - pad.top - pad.bottom;

    // ── Background ──
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // ── Compute data bounds ──
    let xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity;
    for (const s of series) {
      for (const p of s.points) {
        if (p.x < xMin) xMin = p.x;
        if (p.x > xMax) xMax = p.x;
        if (p.y < yMin) yMin = p.y;
        if (p.y > yMax) yMax = p.y;
      }
    }
    // Add padding to y range
    const yRange = yMax - yMin || 1;
    yMin = Math.max(0, yMin - yRange * 0.08);
    yMax = yMax + yRange * 0.08;

    const toX = (v: number) => pad.left + ((v - xMin) / (xMax - xMin || 1)) * plotW;
    const toY = (v: number) => pad.top + plotH - ((v - yMin) / (yMax - yMin || 1)) * plotH;

    // ── Grid lines ──
    const gridLines = 5;
    ctx.lineWidth = 1;
    ctx.strokeStyle = borderColor;
    ctx.fillStyle = textMuted;
    ctx.font = "11px 'Inter', system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";

    for (let i = 0; i <= gridLines; i++) {
      const yVal = yMin + ((yMax - yMin) * i) / gridLines;
      const py = toY(yVal);
      ctx.beginPath();
      ctx.setLineDash([3, 3]);
      ctx.moveTo(pad.left, py);
      ctx.lineTo(pad.left + plotW, py);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillText(yVal.toFixed(1), pad.left - 8, py);
    }

    // ── X-axis labels ──
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = textMuted;
    const xTicks = 6;
    for (let i = 0; i <= xTicks; i++) {
      const xVal = xMin + ((xMax - xMin) * i) / xTicks;
      const px = toX(xVal);
      ctx.fillText(Math.round(xVal).toString(), px, pad.top + plotH + 8);
    }

    // ── Axes ──
    ctx.strokeStyle = textSecondary;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad.left, pad.top);
    ctx.lineTo(pad.left, pad.top + plotH);
    ctx.lineTo(pad.left + plotW, pad.top + plotH);
    ctx.stroke();

    // ── Plot lines ──
    for (const s of series) {
      const color = resolveColor(s.color);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.beginPath();
      for (let i = 0; i < s.points.length; i++) {
        const px = toX(s.points[i].x);
        const py = toY(s.points[i].y);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Subtle fill under the line
      ctx.globalAlpha = 0.06;
      ctx.fillStyle = color;
      ctx.lineTo(toX(s.points[s.points.length - 1].x), pad.top + plotH);
      ctx.lineTo(toX(s.points[0].x), pad.top + plotH);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // ── Legend ──
    const legendY = height - 18;
    ctx.font = "11px 'Inter', system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    let legendX = pad.left;
    for (const s of series) {
      const color = resolveColor(s.color);
      // Swatch
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(legendX + 5, legendY, 4, 0, Math.PI * 2);
      ctx.fill();
      // Label
      ctx.fillStyle = textPrimary;
      ctx.fillText(s.label, legendX + 14, legendY);
      legendX += ctx.measureText(s.label).width + 30;
    }
  }, [series, width, height]);

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
