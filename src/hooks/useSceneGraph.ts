import { useEffect, useRef } from "react";
import { SceneGraph } from "@/lib/SceneGraph";

export function useSceneGraph(
  containerRef: React.RefObject<HTMLElement | null>,
  dirtyRef: React.MutableRefObject<boolean>,
) {
  const sceneRef = useRef<SceneGraph | null>(null);

  if (!sceneRef.current) {
    sceneRef.current = new SceneGraph();
  }

  useEffect(() => {
    const el = containerRef.current;
    const scene = sceneRef.current;
    if (!el || !scene) return;

    const getPos = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onMove = (e: MouseEvent) => {
      const { x, y } = getPos(e);
      if (scene.handleMouseMove(x, y)) {
        dirtyRef.current = true;
      }
    };

    const onDown = (e: MouseEvent) => {
      const { x, y } = getPos(e);
      if (scene.handleMouseDown(x, y)) {
        dirtyRef.current = true;
      }
    };

    const onUp = (e: MouseEvent) => {
      const { x, y } = getPos(e);
      if (scene.handleMouseUp(x, y)) {
        dirtyRef.current = true;
      }
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mousedown", onDown);
    el.addEventListener("mouseup", onUp);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mouseup", onUp);
    };
  }, [containerRef, dirtyRef]);

  useEffect(() => {
    return () => {
      sceneRef.current?.destroy();
    };
  }, []);

  return sceneRef.current;
}
