import type { DrawLists, GLComponent, HitTestResult } from "@/types";
import { createDrawLists, clearDrawLists } from "./DrawListPool";

export class SceneGraph {
  private root: GLComponent[] = [];
  private drawLists: DrawLists;
  private hoveredId: string | null = null;
  private pressedId: string | null = null;

  // Flat lookup for event dispatch
  private componentMap = new Map<string, GLComponent>();

  constructor() {
    this.drawLists = createDrawLists();
  }

  addComponent(component: GLComponent): void {
    this.root.push(component);
    this.indexComponent(component);
  }

  removeComponent(id: string): void {
    const idx = this.root.findIndex((c) => c.id === id);
    if (idx >= 0) {
      this.unindexComponent(this.root[idx]);
      this.root[idx].destroy();
      this.root.splice(idx, 1);
    }
  }

  getComponent(id: string): GLComponent | undefined {
    return this.componentMap.get(id);
  }

  buildFrame(): DrawLists {
    clearDrawLists(this.drawLists);
    for (const comp of this.root) {
      if (comp.visible) comp.render(this.drawLists, 0, 0);
    }
    return this.drawLists;
  }

  handleMouseMove(x: number, y: number): boolean {
    const hit = this.hitTestAll(x, y);
    const hitId = hit?.componentId ?? null;
    let changed = false;

    if (hitId !== this.hoveredId) {
      if (this.hoveredId) {
        this.componentMap.get(this.hoveredId)?.onMouseLeave?.();
      }
      if (hitId) {
        this.componentMap.get(hitId)?.onMouseEnter?.();
      }
      this.hoveredId = hitId;
      changed = true;
    }

    if (hit) {
      this.componentMap.get(hit.componentId)?.onMouseMove?.(hit.localX, hit.localY);
      changed = true;
    }

    return changed;
  }

  handleMouseDown(x: number, y: number): boolean {
    const hit = this.hitTestAll(x, y);
    if (hit) {
      this.pressedId = hit.componentId;
      this.componentMap.get(hit.componentId)?.onMouseDown?.(hit.localX, hit.localY);
      return true;
    }
    return false;
  }

  handleMouseUp(x: number, y: number): boolean {
    const hit = this.hitTestAll(x, y);
    if (this.pressedId) {
      this.componentMap.get(this.pressedId)?.onMouseUp?.(
        hit?.localX ?? 0, hit?.localY ?? 0,
      );
      this.pressedId = null;
      return true;
    }
    return false;
  }

  destroy(): void {
    for (const comp of this.root) comp.destroy();
    this.root.length = 0;
    this.componentMap.clear();
  }

  // ── Internal ─────────────────────────────────────────────

  private hitTestAll(x: number, y: number): HitTestResult | null {
    for (let i = this.root.length - 1; i >= 0; i--) {
      const hit = this.root[i].hitTest(x, y, 0, 0);
      if (hit) return hit;
    }
    return null;
  }

  private indexComponent(comp: GLComponent): void {
    this.componentMap.set(comp.id, comp);
    for (const child of comp.children) this.indexComponent(child);
  }

  private unindexComponent(comp: GLComponent): void {
    this.componentMap.delete(comp.id);
    for (const child of comp.children) this.unindexComponent(child);
  }
}
