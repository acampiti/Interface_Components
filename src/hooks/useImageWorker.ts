import { useEffect, useRef, useCallback, useState } from "react";
import type { ImageRequest, ImageResponse } from "@/types";

export function useImageWorker() {
  const workerRef = useRef<Worker | null>(null);
  const [result, setResult] = useState<ImageResponse | null>(null);

  useEffect(() => {
    const worker = new Worker(
      new URL("../workers/imageWorker.ts", import.meta.url),
      { type: "module" },
    );
    workerRef.current = worker;

    worker.onmessage = (e: MessageEvent<ImageResponse>) => {
      setResult(e.data);
    };

    return () => {
      worker.terminate();
      workerRef.current = null;
    };
  }, []);

  const decodeImage = useCallback((imageData: ArrayBuffer) => {
    const msg: ImageRequest = { cmd: "DECODE_IMAGE", imageData };
    workerRef.current?.postMessage(msg, [imageData]);
  }, []);

  const extractPalette = useCallback((imageData: ArrayBuffer, paletteSize = 8) => {
    const msg: ImageRequest = { cmd: "EXTRACT_PALETTE", imageData, paletteSize };
    workerRef.current?.postMessage(msg, [imageData]);
  }, []);

  return { result, decodeImage, extractPalette };
}
