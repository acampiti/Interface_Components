// ── Theme — dark trading interface palette ─────────────────
// RGBA float arrays (0..1) for direct GL upload.
// Hex strings for Canvas2D text rendering.

export const Theme = {
  // Backgrounds
  bg:            [0.039, 0.039, 0.059, 1.0] as const,  // #0a0a0f
  panel:         [0.055, 0.055, 0.082, 1.0] as const,  // #0e0e15
  panelHover:    [0.070, 0.070, 0.105, 1.0] as const,  // #121221
  panelBorder:   [0.102, 0.102, 0.180, 0.6] as const,  // #1a1a2e @ 60%

  // Accent
  accent:        [0.035, 0.290, 0.580, 1.0] as const,  // #094a94
  accentHover:   [0.055, 0.370, 0.680, 1.0] as const,  // #0e5ead
  accentPressed: [0.025, 0.220, 0.460, 1.0] as const,  // #063875

  // Semantic
  positive:      [0.133, 0.600, 0.300, 1.0] as const,
  negative:      [0.700, 0.150, 0.220, 1.0] as const,

  // Grid / structure
  grid:          [0.102, 0.102, 0.180, 0.4] as const,
  scrollbar:     [0.200, 0.200, 0.300, 0.5] as const,

  // Text (Canvas2D hex strings)
  textPrimary:   "#e0e0e0",
  textSecondary: "#7777a0",
  textMuted:     "#555570",
} as const;
