// ──────────────────────────────────────────────────────────────
// imageWorker — off-thread image decode + color palette extraction
// ──────────────────────────────────────────────────────────────

interface ImageDecodeRequest {
  cmd: "DECODE_IMAGE";
  imageData: ArrayBuffer;
}

interface ImagePaletteRequest {
  cmd: "EXTRACT_PALETTE";
  imageData: ArrayBuffer;
  paletteSize: number;
}

type ImageRequest = ImageDecodeRequest | ImagePaletteRequest;

function extractPalette(
  pixels: Uint8ClampedArray,
  _width: number,
  _height: number,
  paletteSize: number,
): Array<[number, number, number]> {
  // Simple median-cut approximation: sample every Nth pixel,
  // bucket by dominant channel, take top N colors by frequency.
  const colorCounts = new Map<string, { r: number; g: number; b: number; count: number }>();
  const step = Math.max(1, Math.floor(pixels.length / (4 * 2000))); // sample ~2000 pixels

  for (let i = 0; i < pixels.length; i += 4 * step) {
    // Quantize to 5-bit per channel to cluster similar colors
    const r = (pixels[i] >> 3) << 3;
    const g = (pixels[i + 1] >> 3) << 3;
    const b = (pixels[i + 2] >> 3) << 3;
    const key = `${r},${g},${b}`;

    const existing = colorCounts.get(key);
    if (existing) {
      existing.count++;
    } else {
      colorCounts.set(key, { r, g, b, count: 1 });
    }
  }

  // Sort by frequency, take top N
  const sorted = [...colorCounts.values()].sort((a, b) => b.count - a.count);
  return sorted.slice(0, paletteSize).map((c) => [c.r, c.g, c.b]);
}

self.onmessage = async (e: MessageEvent<ImageRequest>) => {
  const msg = e.data;

  switch (msg.cmd) {
    case "DECODE_IMAGE": {
      const blob = new Blob([msg.imageData]);
      const bitmap = await createImageBitmap(blob);
      (self as unknown as Worker).postMessage(
        { cmd: "DECODE_IMAGE", pixels: bitmap, width: bitmap.width, height: bitmap.height },
        [bitmap] as unknown as Transferable[],
      );
      break;
    }

    case "EXTRACT_PALETTE": {
      const blob = new Blob([msg.imageData]);
      const bitmap = await createImageBitmap(blob);

      // Draw to offscreen canvas to get pixel data
      const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(bitmap, 0, 0);
      const imageData = ctx.getImageData(0, 0, bitmap.width, bitmap.height);
      bitmap.close();

      const palette = extractPalette(
        imageData.data, bitmap.width, bitmap.height, msg.paletteSize,
      );

      (self as unknown as Worker).postMessage({ cmd: "EXTRACT_PALETTE", palette });
      break;
    }
  }
};
