import type { DrawLists, Bounds, GLComponent, HitTestResult } from "@/types";

export abstract class BaseComponent implements GLComponent {
  id: string;
  bounds: Bounds;
  visible = true;
  children: GLComponent[] = [];

  constructor(id: string, bounds: Bounds) {
    this.id = id;
    this.bounds = bounds;
  }

  render(lists: DrawLists, parentX: number, parentY: number): void {
    if (!this.visible) return;
    const absX = parentX + this.bounds.x;
    const absY = parentY + this.bounds.y;
    this.renderSelf(lists, absX, absY);
    for (const child of this.children) {
      if (child.visible) child.render(lists, absX, absY);
    }
  }

  protected abstract renderSelf(lists: DrawLists, absX: number, absY: number): void;

  hitTest(x: number, y: number, parentX: number, parentY: number): HitTestResult | null {
    if (!this.visible) return null;
    const absX = parentX + this.bounds.x;
    const absY = parentY + this.bounds.y;
    const localX = x - absX;
    const localY = y - absY;

    if (localX < 0 || localY < 0 || localX > this.bounds.width || localY > this.bounds.height) {
      return null;
    }

    // Check children deepest-first (last rendered = top = check first)
    for (let i = this.children.length - 1; i >= 0; i--) {
      const hit = this.children[i].hitTest(x, y, absX, absY);
      if (hit) return hit;
    }

    return { componentId: this.id, localX, localY };
  }

  addChild(child: GLComponent): void {
    this.children.push(child);
  }

  removeChild(id: string): void {
    const idx = this.children.findIndex((c) => c.id === id);
    if (idx >= 0) {
      this.children[idx].destroy();
      this.children.splice(idx, 1);
    }
  }

  destroy(): void {
    for (const child of this.children) child.destroy();
    this.children.length = 0;
  }
}
