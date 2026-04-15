import { useEffect, useRef } from "react";

/**
 * Dirty-flag requestAnimationFrame hook.
 *
 * Runs the RAF loop at native refresh rate but only calls `callback`
 * when `dirtyRef.current` is true. After each paint the flag is
 * cleared automatically. Avoids redundant redraws while keeping
 * interaction-driven repaints instant.
 */
export function useAnimationFrameDirty(
  callback: (dt: number) => void,
  dirtyRef: React.MutableRefObject<boolean>,
  active: boolean = true,
): void {
  const cbRef = useRef(callback);
  cbRef.current = callback;

  useEffect(() => {
    if (!active) return;

    let rafId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;

      if (dirtyRef.current) {
        dirtyRef.current = false;
        cbRef.current(dt);
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(rafId);
  }, [active, dirtyRef]);
}
