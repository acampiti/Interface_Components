// ──────────────────────────────────────────────────────────────
// layoutWorker — off-thread flex-like layout computation
// ──────────────────────────────────────────────────────────────

interface LayoutComponentDef {
  id: string;
  bounds: { x: number; y: number; width: number; height: number };
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  flexGrow?: number;
  padding?: number;
}

interface LayoutRequest {
  cmd: "COMPUTE_LAYOUT";
  components: LayoutComponentDef[];
  containerWidth: number;
  containerHeight: number;
  direction?: "row" | "column";
  gap?: number;
}

interface LayoutPosition {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface LayoutResponse {
  positions: LayoutPosition[];
}

function computeFlexLayout(
  components: LayoutComponentDef[],
  containerWidth: number,
  containerHeight: number,
  direction: "row" | "column" = "column",
  gap: number = 4,
): LayoutPosition[] {
  const isRow = direction === "row";
  const mainSize = isRow ? containerWidth : containerHeight;
  const crossSize = isRow ? containerHeight : containerWidth;

  // Sum fixed sizes and total flex grow
  let fixedTotal = gap * Math.max(0, components.length - 1);
  let flexTotal = 0;

  for (const comp of components) {
    const grow = comp.flexGrow ?? 0;
    if (grow > 0) {
      flexTotal += grow;
    } else {
      const size = isRow ? comp.bounds.width : comp.bounds.height;
      fixedTotal += size;
    }
  }

  const flexSpace = Math.max(0, mainSize - fixedTotal);
  const positions: LayoutPosition[] = [];
  let cursor = 0;

  for (const comp of components) {
    const grow = comp.flexGrow ?? 0;
    const padding = comp.padding ?? 0;

    let mainDim: number;
    if (grow > 0) {
      mainDim = (flexSpace * grow) / flexTotal;
    } else {
      mainDim = isRow ? comp.bounds.width : comp.bounds.height;
    }

    // Clamp
    const minMain = isRow ? (comp.minWidth ?? 0) : (comp.minHeight ?? 0);
    const maxMain = isRow ? (comp.maxWidth ?? Infinity) : (comp.maxHeight ?? Infinity);
    mainDim = Math.max(minMain, Math.min(maxMain, mainDim));

    const crossDim = crossSize - padding * 2;
    const x = isRow ? cursor + padding : padding;
    const y = isRow ? padding : cursor + padding;
    const w = isRow ? mainDim - padding * 2 : crossDim;
    const h = isRow ? crossDim : mainDim - padding * 2;

    positions.push({
      id: comp.id,
      x: Math.round(x),
      y: Math.round(y),
      width: Math.round(Math.max(0, w)),
      height: Math.round(Math.max(0, h)),
    });

    cursor += mainDim + gap;
  }

  return positions;
}

self.onmessage = (e: MessageEvent<LayoutRequest>) => {
  const msg = e.data;
  if (msg.cmd === "COMPUTE_LAYOUT") {
    const positions = computeFlexLayout(
      msg.components,
      msg.containerWidth,
      msg.containerHeight,
      msg.direction,
      msg.gap,
    );
    const response: LayoutResponse = { positions };
    (self as unknown as Worker).postMessage(response);
  }
};
