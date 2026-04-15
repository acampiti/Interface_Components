import { useEffect, useRef, useState } from "react";
import type { IGLRenderer } from "@/types";
import { createGLRenderer } from "@/lib/createGLRenderer";

export function useGLRenderer(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  onLog?: (msg: string) => void,
) {
  const [renderer, setRenderer] = useState<IGLRenderer | null>(null);
  const [backend, setBackend] = useState("");
  const dirtyRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const info = createGLRenderer(canvas, onLog);
    setRenderer(info.renderer);
    setBackend(info.backend);

    // ResizeObserver on the parent container
    const parent = canvas.parentElement;
    if (!parent) return;

    const observer = new ResizeObserver(() => {
      info.renderer.resize();
      dirtyRef.current = true;
    });
    observer.observe(parent);

    return () => {
      observer.disconnect();
      info.renderer.destroy();
      setRenderer(null);
    };
  }, [canvasRef, onLog]);

  return { renderer, backend, dirtyRef };
}
