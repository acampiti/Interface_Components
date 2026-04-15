import { useRef, useEffect, useCallback } from "react";
import { useGLRenderer } from "@/hooks/useGLRenderer";
import { useSceneGraph } from "@/hooks/useSceneGraph";
import { useAnimationFrameDirty } from "@/hooks/useAnimationFrameDirty";
import { Panel } from "@/lib/components/Panel";
import { Button } from "@/lib/components/Button";
import { Label } from "@/lib/components/Label";
import { GridLines } from "@/lib/components/GridLines";

interface GLCanvasProps {
  onLog?: (msg: string) => void;
}

export function GLCanvas({ onLog }: GLCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const logRef = useRef(onLog);
  logRef.current = onLog;
  const stableLog = useCallback((msg: string) => logRef.current?.(msg), []);

  const { renderer, backend, dirtyRef } = useGLRenderer(canvasRef, stableLog);
  const scene = useSceneGraph(containerRef, dirtyRef);

  // Build demo scene once renderer + scene are ready
  const initializedRef = useRef(false);
  useEffect(() => {
    if (!renderer || !scene || initializedRef.current) return;
    initializedRef.current = true;

    // Background grid (full canvas)
    const grid = new GridLines("grid", 0, 0, renderer.width, renderer.height);
    scene.addComponent(grid);

    // Demo panel
    const panel = new Panel("demo-panel", 40, 40, 360, 260, "Demo Panel");

    const label = new Label("demo-label", 12, 36, 340, 20,
      "GL-rendered UI components");

    const btn = new Button("demo-btn", 12, 70, 140, 36, "Click Me", () => {
      stableLog("Button clicked!");
      dirtyRef.current = true;
    });

    const btn2 = new Button("demo-btn-2", 164, 70, 140, 36, "Button 2", () => {
      stableLog("Button 2 clicked!");
      dirtyRef.current = true;
    });

    const infoLabel = new Label("info-label", 12, 120, 340, 20,
      `Backend: ${backend}`, "#7777a0", "11px monospace");

    const sizeLabel = new Label("size-label", 12, 142, 340, 20,
      `Canvas: ${renderer.width}x${renderer.height}`, "#7777a0", "11px monospace");

    panel.addChild(label);
    panel.addChild(btn);
    panel.addChild(btn2);
    panel.addChild(infoLabel);
    panel.addChild(sizeLabel);
    scene.addComponent(panel);

    // Second panel
    const panel2 = new Panel("panel-2", 40, 320, 360, 160, "Component Palette");
    const paletteLabel = new Label("palette-info", 12, 36, 340, 20,
      "Upload images to prototype interfaces", "#7777a0");
    panel2.addChild(paletteLabel);
    scene.addComponent(panel2);

    dirtyRef.current = true;
  }, [renderer, scene, backend, dirtyRef, stableLog]);

  // Update grid on resize
  useEffect(() => {
    if (!renderer || !scene) return;
    const grid = scene.getComponent("grid");
    if (grid) {
      grid.bounds.width = renderer.width;
      grid.bounds.height = renderer.height;
      dirtyRef.current = true;
    }
  }, [renderer?.width, renderer?.height, renderer, scene, dirtyRef]);

  // Render loop
  useAnimationFrameDirty(() => {
    if (!renderer || !scene) return;
    const lists = scene.buildFrame();
    renderer.renderFrame(lists);
  }, dirtyRef);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
