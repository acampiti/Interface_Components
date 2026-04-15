// ──────────────────────────────────────────────────────────────
// GLRenderer — WebGL2 general-purpose UI renderer
//
// Instanced rectangle rendering for all rect primitives.
// GL_LINES for borders, grid, connectors (with optional dash).
// Transparent Canvas2D overlay for crisp text labels.
//
// Adapted from Hello World's CandleRendererGL, stripped of all
// domain-specific candle logic. Takes DrawLists, draws pixels.
// ──────────────────────────────────────────────────────────────

import type { DrawLists, IGLRenderer } from "@/types";
import { Theme } from "@/types/theme";

// ── Buffer limits ──────────────────────────────────────────────
const MAX_INSTANCES = 4096;
const MAX_LINE_VERTS = 8192;
const INST_FLOATS = 8;  // x, y, w, h, r, g, b, a
const LINE_FLOATS = 6;  // x, y, r, g, b, a

// ── Shader sources ─────────────────────────────────────────────

const RECT_VS = `#version 300 es
precision highp float;
layout(location=0) in vec2 a_quad;
layout(location=1) in vec4 a_rect;
layout(location=2) in vec4 a_color;
uniform vec2 u_res;
out vec4 v_color;
void main(){
  vec2 px = a_rect.xy + a_quad * a_rect.zw;
  gl_Position = vec4(px.x/u_res.x*2.0-1.0, 1.0-px.y/u_res.y*2.0, 0.0, 1.0);
  v_color = a_color;
}`;

const RECT_FS = `#version 300 es
precision highp float;
in vec4 v_color;
out vec4 o;
void main(){ o = v_color; }`;

const LINE_VS = `#version 300 es
precision highp float;
layout(location=0) in vec2 a_pos;
layout(location=1) in vec4 a_color;
uniform vec2 u_res;
out vec4 v_color;
out float v_x;
void main(){
  gl_Position = vec4(a_pos.x/u_res.x*2.0-1.0, 1.0-a_pos.y/u_res.y*2.0, 0.0, 1.0);
  v_color = a_color;
  v_x = a_pos.x;
}`;

const LINE_FS = `#version 300 es
precision highp float;
in vec4 v_color;
in float v_x;
uniform float u_dash;
out vec4 o;
void main(){
  if(u_dash > 0.0 && mod(v_x, u_dash*1.75) > u_dash) discard;
  o = v_color;
}`;

// ── Helpers ────────────────────────────────────────────────────

function compileShader(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(s);
    gl.deleteShader(s);
    throw new Error("Shader compile: " + log);
  }
  return s;
}

function linkProgram(gl: WebGL2RenderingContext, vs: WebGLShader, fs: WebGLShader): WebGLProgram {
  const p = gl.createProgram()!;
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(p);
    gl.deleteProgram(p);
    throw new Error("Program link: " + log);
  }
  return p;
}

// ── Renderer ───────────────────────────────────────────────────

export class GLRenderer implements IGLRenderer {
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;

  // Text overlay (Canvas2D for labels)
  private textCanvas: HTMLCanvasElement;
  private textCtx: CanvasRenderingContext2D;

  // Programs
  private rectProg!: WebGLProgram;
  private lineProg!: WebGLProgram;

  // Uniform locations
  private rectURes!: WebGLUniformLocation;
  private lineURes!: WebGLUniformLocation;
  private lineUDash!: WebGLUniformLocation;

  // Buffers + VAOs
  private rectVAO!: WebGLVertexArrayObject;
  private rectInstBuf!: WebGLBuffer;
  private lineVAO!: WebGLVertexArrayObject;
  private lineBuf!: WebGLBuffer;

  // Pre-allocated typed arrays
  private rectData = new Float32Array(MAX_INSTANCES * INST_FLOATS);
  private lineData = new Float32Array(MAX_LINE_VERTS * LINE_FLOATS);

  // Display
  private dpr: number;
  width = 0;
  height = 0;
  private contextLost = false;

  // Cursor
  cursorX = NaN;
  cursorY = NaN;

  constructor(canvas: HTMLCanvasElement, gl: WebGL2RenderingContext) {
    this.canvas = canvas;
    this.gl = gl;
    this.dpr = window.devicePixelRatio || 1;

    // Text overlay
    this.textCanvas = document.createElement("canvas");
    this.textCanvas.style.cssText =
      "position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;";
    canvas.parentElement!.appendChild(this.textCanvas);
    this.textCtx = this.textCanvas.getContext("2d", { alpha: true })!;

    // Context loss handlers
    canvas.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      this.contextLost = true;
    });
    canvas.addEventListener("webglcontextrestored", () => {
      this.contextLost = false;
      this.initGL();
    });

    this.initGL();
    this.resize();
  }

  private initGL(): void {
    const gl = this.gl;

    // Compile & link rect program
    const rectVS = compileShader(gl, gl.VERTEX_SHADER, RECT_VS);
    const rectFS = compileShader(gl, gl.FRAGMENT_SHADER, RECT_FS);
    this.rectProg = linkProgram(gl, rectVS, rectFS);
    gl.deleteShader(rectVS);
    gl.deleteShader(rectFS);

    // Compile & link line program
    const lineVS = compileShader(gl, gl.VERTEX_SHADER, LINE_VS);
    const lineFS = compileShader(gl, gl.FRAGMENT_SHADER, LINE_FS);
    this.lineProg = linkProgram(gl, lineVS, lineFS);
    gl.deleteShader(lineVS);
    gl.deleteShader(lineFS);

    this.rectURes = gl.getUniformLocation(this.rectProg, "u_res")!;
    this.lineURes = gl.getUniformLocation(this.lineProg, "u_res")!;
    this.lineUDash = gl.getUniformLocation(this.lineProg, "u_dash")!;

    // ── Rect VAO (instanced unit quad) ─────────────────────
    this.rectVAO = gl.createVertexArray()!;
    gl.bindVertexArray(this.rectVAO);

    const quadBuf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const idxBuf = gl.createBuffer()!;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);

    this.rectInstBuf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.rectInstBuf);
    gl.bufferData(gl.ARRAY_BUFFER, MAX_INSTANCES * INST_FLOATS * 4, gl.DYNAMIC_DRAW);

    // a_rect (location 1) — vec4
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 4, gl.FLOAT, false, INST_FLOATS * 4, 0);
    gl.vertexAttribDivisor(1, 1);

    // a_color (location 2) — vec4
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 4, gl.FLOAT, false, INST_FLOATS * 4, 16);
    gl.vertexAttribDivisor(2, 1);

    gl.bindVertexArray(null);

    // ── Line VAO ───────────────────────────────────────────
    this.lineVAO = gl.createVertexArray()!;
    gl.bindVertexArray(this.lineVAO);

    this.lineBuf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.lineBuf);
    gl.bufferData(gl.ARRAY_BUFFER, MAX_LINE_VERTS * LINE_FLOATS * 4, gl.DYNAMIC_DRAW);

    // a_pos (location 0) — vec2
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, LINE_FLOATS * 4, 0);

    // a_color (location 1) — vec4
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 4, gl.FLOAT, false, LINE_FLOATS * 4, 8);

    gl.bindVertexArray(null);

    // GL state
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  }

  resize(): void {
    const rect = this.canvas.parentElement?.getBoundingClientRect();
    if (!rect) return;
    const w = rect.width;
    const h = rect.height;

    this.canvas.style.width = w + "px";
    this.canvas.style.height = h + "px";
    this.canvas.width = w * this.dpr;
    this.canvas.height = h * this.dpr;

    this.textCanvas.width = w * this.dpr;
    this.textCanvas.height = h * this.dpr;
    this.textCanvas.style.width = w + "px";
    this.textCanvas.style.height = h + "px";
    this.textCtx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    this.width = w;
    this.height = h;

    if (!this.contextLost) {
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  renderFrame(lists: DrawLists): void {
    if (this.contextLost) return;

    const gl = this.gl;
    const w = this.width;
    const h = this.height;

    // ── Clear ──────────────────────────────────────────────
    gl.clearColor(Theme.bg[0], Theme.bg[1], Theme.bg[2], Theme.bg[3]);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // ── Draw lines ─────────────────────────────────────────
    if (lists.lineVertCount > 0) {
      gl.useProgram(this.lineProg);
      gl.uniform2f(this.lineURes, w, h);
      gl.bindVertexArray(this.lineVAO);

      // Separate solid and dashed lines
      let solidVerts = 0;
      let dashVerts = 0;
      const ld = this.lineData;

      // First pass: solid lines (dash === 0)
      for (let i = 0; i < lists.lineVertCount; i++) {
        const line = lists.lines[i];
        if (line.dash > 0) continue;
        const off = solidVerts * LINE_FLOATS;
        if (solidVerts + 2 > MAX_LINE_VERTS) break;
        ld[off]     = line.x1; ld[off + 1] = line.y1;
        ld[off + 2] = line.r;  ld[off + 3] = line.g;
        ld[off + 4] = line.b;  ld[off + 5] = line.a;
        ld[off + 6] = line.x2; ld[off + 7] = line.y2;
        ld[off + 8] = line.r;  ld[off + 9] = line.g;
        ld[off + 10] = line.b; ld[off + 11] = line.a;
        solidVerts += 2;
      }

      if (solidVerts > 0) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.lineBuf);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, ld.subarray(0, solidVerts * LINE_FLOATS));
        gl.uniform1f(this.lineUDash, 0);
        gl.drawArrays(gl.LINES, 0, solidVerts);
      }

      // Second pass: dashed lines
      dashVerts = 0;
      let dashValue = 0;
      for (let i = 0; i < lists.lineVertCount; i++) {
        const line = lists.lines[i];
        if (line.dash <= 0) continue;
        const off = dashVerts * LINE_FLOATS;
        if (dashVerts + 2 > MAX_LINE_VERTS) break;
        ld[off]     = line.x1; ld[off + 1] = line.y1;
        ld[off + 2] = line.r;  ld[off + 3] = line.g;
        ld[off + 4] = line.b;  ld[off + 5] = line.a;
        ld[off + 6] = line.x2; ld[off + 7] = line.y2;
        ld[off + 8] = line.r;  ld[off + 9] = line.g;
        ld[off + 10] = line.b; ld[off + 11] = line.a;
        dashVerts += 2;
        dashValue = line.dash;
      }

      if (dashVerts > 0) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.lineBuf);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, ld.subarray(0, dashVerts * LINE_FLOATS));
        gl.uniform1f(this.lineUDash, dashValue);
        gl.drawArrays(gl.LINES, 0, dashVerts);
      }

      gl.bindVertexArray(null);
    }

    // ── Draw rects (single instanced call) ─────────────────
    const ri = Math.min(lists.rectCount, MAX_INSTANCES);
    if (ri > 0) {
      const rd = this.rectData;
      for (let i = 0; i < ri; i++) {
        const rect = lists.rects[i];
        const off = i * INST_FLOATS;
        rd[off]     = rect.x;
        rd[off + 1] = rect.y;
        rd[off + 2] = rect.w;
        rd[off + 3] = rect.h;
        rd[off + 4] = rect.r;
        rd[off + 5] = rect.g;
        rd[off + 6] = rect.b;
        rd[off + 7] = rect.a;
      }

      gl.useProgram(this.rectProg);
      gl.uniform2f(this.rectURes, w, h);
      gl.bindVertexArray(this.rectVAO);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.rectInstBuf);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, rd.subarray(0, ri * INST_FLOATS));
      gl.drawElementsInstanced(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0, ri);
      gl.bindVertexArray(null);
    }

    // ── Draw text (Canvas2D overlay) ───────────────────────
    const ctx = this.textCtx;
    ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < lists.textCount; i++) {
      const t = lists.texts[i];
      ctx.font = t.font;
      ctx.fillStyle = t.color;
      ctx.textAlign = t.align;
      ctx.textBaseline = t.baseline;
      ctx.fillText(t.text, t.x, t.y);
    }
  }

  destroy(): void {
    this.textCanvas.remove();

    const gl = this.gl;
    gl.deleteProgram(this.rectProg);
    gl.deleteProgram(this.lineProg);
    gl.deleteVertexArray(this.rectVAO);
    gl.deleteVertexArray(this.lineVAO);
    gl.deleteBuffer(this.rectInstBuf);
    gl.deleteBuffer(this.lineBuf);
  }
}
