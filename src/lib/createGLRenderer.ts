// ──────────────────────────────────────────────────────────────
// createGLRenderer — factory with WebGL2 → Canvas2D fallback
// ──────────────────────────────────────────────────────────────

import type { IGLRenderer } from "@/types";
import { GLRenderer } from "./GLRenderer";
import { GLRendererCanvas2D } from "./GLRendererCanvas2D";

export interface GLRendererInfo {
  renderer: IGLRenderer;
  backend: "WebGL2" | "Canvas2D";
  gpu: string | null;
  glVersion: string | null;
  glslVersion: string | null;
  maxTextureSize: number | null;
}

function queryGpuInfo(gl: WebGL2RenderingContext) {
  let gpu: string | null = null;
  const ext = gl.getExtension("WEBGL_debug_renderer_info");
  if (ext) {
    gpu = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
  }
  const glVersion = gl.getParameter(gl.VERSION) as string;
  const glslVersion = gl.getParameter(gl.SHADING_LANGUAGE_VERSION) as string;
  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
  return { gpu, glVersion, glslVersion, maxTextureSize };
}

export function createGLRenderer(
  canvas: HTMLCanvasElement,
  onLog?: (msg: string) => void,
): GLRendererInfo {
  const log = onLog ?? (() => {});

  try {
    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      powerPreference: "high-performance",
    });

    if (gl) {
      const info = queryGpuInfo(gl);
      log(`WebGL2 ✓ | GPU: ${info.gpu} | GL: ${info.glVersion}`);
      const renderer = new GLRenderer(canvas, gl);
      return {
        renderer,
        backend: "WebGL2",
        gpu: info.gpu,
        glVersion: info.glVersion,
        glslVersion: info.glslVersion,
        maxTextureSize: info.maxTextureSize,
      };
    }
  } catch (e) {
    log(`WebGL2 failed: ${e}`);
  }

  log("Falling back to Canvas2D renderer");
  return {
    renderer: new GLRendererCanvas2D(canvas),
    backend: "Canvas2D",
    gpu: null,
    glVersion: null,
    glslVersion: null,
    maxTextureSize: null,
  };
}
