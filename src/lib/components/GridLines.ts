import type { DrawLists } from "@/types";
import { Theme } from "@/types/theme";
import { BaseComponent } from "../BaseComponent";
import { pushLine } from "../DrawListPool";

export class GridLines extends BaseComponent {
  spacingX: number;
  spacingY: number;

  constructor(
    id: string,
    x: number, y: number, width: number, height: number,
    spacingX = 80,
    spacingY = 60,
  ) {
    super(id, { x, y, width, height });
    this.spacingX = spacingX;
    this.spacingY = spacingY;
  }

  protected renderSelf(lists: DrawLists, absX: number, absY: number): void {
    const { width: w, height: h } = this.bounds;
    const g = Theme.grid;

    // Vertical grid lines
    for (let gx = this.spacingX; gx < w; gx += this.spacingX) {
      pushLine(lists,
        absX + gx, absY,
        absX + gx, absY + h,
        g[0], g[1], g[2], g[3]);
    }

    // Horizontal grid lines
    for (let gy = this.spacingY; gy < h; gy += this.spacingY) {
      pushLine(lists,
        absX, absY + gy,
        absX + w, absY + gy,
        g[0], g[1], g[2], g[3]);
    }
  }
}
