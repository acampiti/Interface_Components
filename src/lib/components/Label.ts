import type { DrawLists } from "@/types";
import { Theme } from "@/types/theme";
import { BaseComponent } from "../BaseComponent";
import { pushText } from "../DrawListPool";

export class Label extends BaseComponent {
  text: string;
  color: string;
  font: string;
  align: CanvasTextAlign;
  baseline: CanvasTextBaseline;

  constructor(
    id: string,
    x: number, y: number, width: number, height: number,
    text: string,
    color: string = Theme.textPrimary,
    font = "12px monospace",
  ) {
    super(id, { x, y, width, height });
    this.text = text;
    this.color = color;
    this.font = font;
    this.align = "left";
    this.baseline = "top";
  }

  protected renderSelf(lists: DrawLists, absX: number, absY: number): void {
    pushText(lists, this.text, absX, absY + 2,
      this.color, this.font, this.align, this.baseline);
  }
}
