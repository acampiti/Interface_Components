// ── GL Theme Bridge ─────────────────────────────────────
// Resolves CSS custom properties to usable color values for
// Canvas2D / WebGL rendering at draw time.

/**
 * Read a CSS custom property value from :root / document.documentElement.
 * Returns the trimmed computed value (e.g. "#0a0a0f" or "rgb(10,10,15)").
 */
export function getCSSColor(varName: string): string {
  // Accept both "--color-foo" and "var(--color-foo)" forms
  const prop = varName.startsWith("var(")
    ? varName.slice(4, -1).trim()
    : varName;
  return getComputedStyle(document.documentElement).getPropertyValue(prop).trim();
}

/**
 * Parse a CSS color string (hex 3/4/6/8, rgb(), rgba()) into a GL-style
 * float tuple [r, g, b, a] where each component is 0..1.
 */
export function cssColorToGL(cssColor: string): [number, number, number, number] {
  // Handle rgb()/rgba()
  const rgbMatch = cssColor.match(
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/,
  );
  if (rgbMatch) {
    return [
      parseInt(rgbMatch[1], 10) / 255,
      parseInt(rgbMatch[2], 10) / 255,
      parseInt(rgbMatch[3], 10) / 255,
      rgbMatch[4] !== undefined ? parseFloat(rgbMatch[4]) : 1,
    ];
  }

  // Handle hex
  let hex = cssColor.replace("#", "");
  if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  if (hex.length === 4)
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];

  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1;
  return [r, g, b, a];
}

/**
 * Convenience: resolve a CSS var name straight to a GL float tuple.
 */
export function getThemeGLColor(varName: string): [number, number, number, number] {
  return cssColorToGL(getCSSColor(varName));
}
