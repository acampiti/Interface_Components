import type { DrawLists } from "@/types";
import { Theme } from "@/types/theme";
import { BaseComponent } from "../BaseComponent";
import { pushRect, pushLine, pushText } from "../DrawListPool";

export class Panel extends BaseComponent {
  title: string;
  padding: number;
  bgColor: readonly [number, number, number, number];
  borderColor: readonly [number, number, number, number];

  constructor(
    id: string,
    x: number, y: number, width: number, height: number,
    title = "",
    padding = 8,
  ) {
    super(id, { x, y, width, height });
    this.title = title;
    this.padding = padding;
    this.bgColor = Theme.panel;
    this.borderColor = Theme.panelBorder;
  }

  protected renderSelf(lists: DrawLists, absX: number, absY: number): void {
    const { width: w, height: h } = this.bounds;
    const bg = this.bgColor;
    const border = this.borderColor;

    // Background
    pushRect(lists, absX, absY, w, h, bg[0], bg[1], bg[2], bg[3]);

    // Border (4 edges)
    pushLine(lists, absX, absY, absX + w, absY,
      border[0], border[1], border[2], border[3]);
    pushLine(lists, absX + w, absY, absX + w, absY + h,
      border[0], border[1], border[2], border[3]);
    pushLine(lists, absX, absY + h, absX + w, absY + h,
      border[0], border[1], border[2], border[3]);
    pushLine(lists, absX, absY, absX, absY + h,
      border[0], border[1], border[2], border[3]);

    // Title
    if (this.title) {
      pushText(lists, this.title, absX + this.padding, absY + this.padding,
        Theme.textPrimary, "bold 13px monospace", "left", "top");
    }
  }
}
