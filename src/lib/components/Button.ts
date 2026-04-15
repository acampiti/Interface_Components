import type { DrawLists } from "@/types";
import { Theme } from "@/types/theme";
import { BaseComponent } from "../BaseComponent";
import { pushRect, pushText } from "../DrawListPool";

export class Button extends BaseComponent {
  label: string;
  hovered = false;
  pressed = false;
  onClick?: () => void;

  constructor(
    id: string,
    x: number, y: number, width: number, height: number,
    label: string,
    onClick?: () => void,
  ) {
    super(id, { x, y, width, height });
    this.label = label;
    this.onClick = onClick;
  }

  protected renderSelf(lists: DrawLists, absX: number, absY: number): void {
    const { width: w, height: h } = this.bounds;
    const bg = this.pressed
      ? Theme.accentPressed
      : this.hovered
        ? Theme.accentHover
        : Theme.accent;

    pushRect(lists, absX, absY, w, h, bg[0], bg[1], bg[2], bg[3]);

    pushText(lists, this.label,
      absX + w / 2, absY + h / 2,
      Theme.textPrimary, "13px monospace", "center", "middle");
  }

  onMouseEnter(): void {
    this.hovered = true;
  }

  onMouseLeave(): void {
    this.hovered = false;
    this.pressed = false;
  }

  onMouseDown(): void {
    this.pressed = true;
  }

  onMouseUp(): void {
    if (this.pressed && this.hovered) {
      this.onClick?.();
    }
    this.pressed = false;
  }
}
