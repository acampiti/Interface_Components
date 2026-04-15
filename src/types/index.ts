// ── Geometry primitives ────────────────────────────────────

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  r: number;
  g: number;
  b: number;
  a: number;
  dash: number; // 0 = solid
}

export interface TextEntry {
  text: string;
  x: number;
  y: number;
  color: string;
  font: string;
  align: CanvasTextAlign;
  baseline: CanvasTextBaseline;
}

// ── Draw lists ─────────────────────────────────────────────

export interface DrawLists {
  rects: Rect[];
  lines: Line[];
  texts: TextEntry[];
  rectCount: number;
  lineVertCount: number;
  textCount: number;
}

// ── Component system ───────────────────────────────────────

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface HitTestResult {
  componentId: string;
  localX: number;
  localY: number;
}

export interface GLComponent {
  id: string;
  bounds: Bounds;
  visible: boolean;
  children: GLComponent[];

  render(lists: DrawLists, parentX: number, parentY: number): void;
  hitTest(x: number, y: number, parentX: number, parentY: number): HitTestResult | null;

  onMouseEnter?(): void;
  onMouseLeave?(): void;
  onMouseDown?(localX: number, localY: number): void;
  onMouseMove?(localX: number, localY: number): void;
  onMouseUp?(localX: number, localY: number): void;
  onResize?(width: number, height: number): void;

  destroy(): void;
}

// ── Renderer interface ─────────────────────────────────────

export interface IGLRenderer {
  width: number;
  height: number;
  cursorX: number;
  cursorY: number;

  resize(): void;
  renderFrame(lists: DrawLists): void;
  destroy(): void;
}

// ── Worker protocols ───────────────────────────────────────

// Layout worker
export interface LayoutComponentDef {
  id: string;
  bounds: Bounds;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  flexGrow?: number;
  padding?: number;
}

export interface LayoutRequest {
  cmd: "COMPUTE_LAYOUT";
  components: LayoutComponentDef[];
  containerWidth: number;
  containerHeight: number;
}

export interface LayoutPosition {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LayoutResponse {
  positions: LayoutPosition[];
}

// Image worker
export interface ImageDecodeRequest {
  cmd: "DECODE_IMAGE";
  imageData: ArrayBuffer;
}

export interface ImagePaletteRequest {
  cmd: "EXTRACT_PALETTE";
  imageData: ArrayBuffer;
  paletteSize: number;
}

export type ImageRequest = ImageDecodeRequest | ImagePaletteRequest;

export interface ImageDecodeResponse {
  cmd: "DECODE_IMAGE";
  pixels: ImageBitmap;
  width: number;
  height: number;
}

export interface ImagePaletteResponse {
  cmd: "EXTRACT_PALETTE";
  palette: Array<[number, number, number]>;
}

export type ImageResponse = ImageDecodeResponse | ImagePaletteResponse;
