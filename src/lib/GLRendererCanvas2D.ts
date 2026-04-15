// ──────────────────────────────────────────────────────────────
// GLRendererCanvas2D — Canvas2D fallback for IGLRenderer
//
// Used when WebGL2 is unavailable. Same interface as GLRenderer,
// draws the same primitives using Canvas2D APIs. Double-buffered
// (offscreen canvas → visible canvas blit).
// ──────────────────────────────────────────────────────────────

import type { DrawLists, IGLRenderer } from "@/types";
import { Theme } from "@/types/theme";

export class GLRendererCanvas2D implements IGLRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private offscreen: HTMLCanvasElement;
  private offCtx: CanvasRenderingContext2D;
  private dpr: number;

  width = 0;
  height = 0;
  cursorX = NaN;
  cursorY = NaN;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: false })!;
    this.dpr = window.devicePixelRatio || 1;

    this.offscreen = document.createElement("canvas");
    this.offCtx = this.offscreen.getContext("2d", { alpha: false })!;

    this.resize();
  }

  resize(): void {
    const rect = this.canvas.parentElement?.getBoundingClientRect();
    if (!rect) return;
    const w = rect.width;
    const h = rect.height;

    this.canvas.style.width = w + "px";
    this.canvas.style.height = h + "px";
    this.canvas.width = w * this.dpr;
    this.canvas.height = h * this.dpr;

    this.offscreen.width = w * this.dpr;
    this.offscreen.height = h * this.dpr;
    this.offCtx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    this.width = w;
    this.height = h;
  }

  renderFrame(lists: DrawLists): void {
    const ctx = this.offCtx;
    const w = this.width;
    const h = this.height;

    // Clear
    const bg = Theme.bg;
    ctx.fillStyle = `rgba(${bg[0] * 255 | 0},${bg[1] * 255 | 0},${bg[2] * 255 | 0},${bg[3]})`;
    ctx.fillRect(0, 0, w, h);

    // Lines
    for (let i = 0; i < lists.lineVertCount; i++) {
      const line = lists.lines[i];
      ctx.strokeStyle = `rgba(${line.r * 255 | 0},${line.g * 255 | 0},${line.b * 255 | 0},${line.a})`;
      ctx.lineWidth = 1;
      if (line.dash > 0) {
        ctx.setLineDash([line.dash, line.dash * 0.75]);
      } else {
        ctx.setLineDash([]);
      }
      ctx.beginPath();
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(line.x2, line.y2);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Rects
    for (let i = 0; i < lists.rectCount; i++) {
      const r = lists.rects[i];
      ctx.fillStyle = `rgba(${r.r * 255 | 0},${r.g * 255 | 0},${r.b * 255 | 0},${r.a})`;
      ctx.fillRect(r.x, r.y, r.w, r.h);
    }

    // Text
    for (let i = 0; i < lists.textCount; i++) {
      const t = lists.texts[i];
      ctx.font = t.font;
      ctx.fillStyle = t.color;
      ctx.textAlign = t.align;
      ctx.textBaseline = t.baseline;
      ctx.fillText(t.text, t.x, t.y);
    }

    // Blit
    this.ctx.drawImage(this.offscreen, 0, 0);
  }

  destroy(): void {
    // Nothing to clean up beyond GC
  }
}
