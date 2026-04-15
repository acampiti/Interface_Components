import { useEffect, useRef, useCallback, useState } from "react";
import type { LayoutRequest, LayoutResponse } from "@/types";

export function useLayoutWorker() {
  const workerRef = useRef<Worker | null>(null);
  const [result, setResult] = useState<LayoutResponse | null>(null);

  useEffect(() => {
    const worker = new Worker(
      new URL("../workers/layoutWorker.ts", import.meta.url),
      { type: "module" },
    );
    workerRef.current = worker;

    worker.onmessage = (e: MessageEvent<LayoutResponse>) => {
      setResult(e.data);
    };

    return () => {
      worker.terminate();
      workerRef.current = null;
    };
  }, []);

  const computeLayout = useCallback((request: LayoutRequest) => {
    workerRef.current?.postMessage(request);
  }, []);

  return { result, computeLayout };
}
