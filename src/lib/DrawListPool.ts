import type { DrawLists, Rect, Line, TextEntry } from "@/types";

export function createDrawLists(): DrawLists {
  return {
    rects: [],
    lines: [],
    texts: [],
    rectCount: 0,
    lineVertCount: 0,
    textCount: 0,
  };
}

export function clearDrawLists(lists: DrawLists): void {
  lists.rectCount = 0;
  lists.lineVertCount = 0;
  lists.textCount = 0;
}

export function pushRect(
  lists: DrawLists,
  x: number, y: number, w: number, h: number,
  r: number, g: number, b: number, a: number,
): void {
  const i = lists.rectCount;
  if (i >= lists.rects.length) {
    lists.rects.push({ x, y, w, h, r, g, b, a });
  } else {
    const rect = lists.rects[i] as Rect;
    rect.x = x; rect.y = y; rect.w = w; rect.h = h;
    rect.r = r; rect.g = g; rect.b = b; rect.a = a;
  }
  lists.rectCount++;
}

export function pushLine(
  lists: DrawLists,
  x1: number, y1: number, x2: number, y2: number,
  r: number, g: number, b: number, a: number,
  dash = 0,
): void {
  const i = lists.lineVertCount;
  if (i >= lists.lines.length) {
    lists.lines.push({ x1, y1, x2, y2, r, g, b, a, dash });
  } else {
    const line = lists.lines[i] as Line;
    line.x1 = x1; line.y1 = y1; line.x2 = x2; line.y2 = y2;
    line.r = r; line.g = g; line.b = b; line.a = a; line.dash = dash;
  }
  lists.lineVertCount++;
}

export function pushText(
  lists: DrawLists,
  text: string, x: number, y: number,
  color: string,
  font = "12px monospace",
  align: CanvasTextAlign = "left",
  baseline: CanvasTextBaseline = "top",
): void {
  const i = lists.textCount;
  if (i >= lists.texts.length) {
    lists.texts.push({ text, x, y, color, font, align, baseline });
  } else {
    const entry = lists.texts[i] as TextEntry;
    entry.text = text; entry.x = x; entry.y = y;
    entry.color = color; entry.font = font;
    entry.align = align; entry.baseline = baseline;
  }
  lists.textCount++;
}
