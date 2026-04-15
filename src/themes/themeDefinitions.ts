export interface ThemeDef {
  id: string;
  label: string;
  previewColor: string; // accent swatch for selector
  category: string;
}

export const THEMES: ThemeDef[] = [
  // ── Dark (22) ──────────────────────────────────────────
  { id: "obsidian-night",  label: "Obsidian Night",  previewColor: "#6C9EF8", category: "Dark" },
  { id: "charcoal-fog",   label: "Charcoal Fog",    previewColor: "#A0A4F0", category: "Dark" },
  { id: "deep-ocean",     label: "Deep Ocean",      previewColor: "#38BDF8", category: "Dark" },
  { id: "arctic-slate",   label: "Arctic Slate",    previewColor: "#88C8E8", category: "Dark" },
  { id: "midnight-plum",  label: "Midnight Plum",   previewColor: "#C084FC", category: "Dark" },
  { id: "forest-canopy",  label: "Forest Canopy",   previewColor: "#4ADE80", category: "Dark" },
  { id: "volcanic",       label: "Volcanic",        previewColor: "#F47068", category: "Dark" },
  { id: "carbon",         label: "Carbon",          previewColor: "#A0A0A0", category: "Dark" },
  { id: "cobalt",         label: "Cobalt",          previewColor: "#58A6FF", category: "Dark" },
  { id: "graphite",       label: "Graphite",        previewColor: "#569CD6", category: "Dark" },
  { id: "twilight",       label: "Twilight",        previewColor: "#A78BFA", category: "Dark" },
  { id: "moss",           label: "Moss",            previewColor: "#A8D870", category: "Dark" },
  { id: "void",           label: "Void",            previewColor: "#7C8CFF", category: "Dark" },
  { id: "horizon",        label: "Horizon",         previewColor: "#E8789C", category: "Dark" },
  { id: "steel",          label: "Steel",           previewColor: "#8CA0B8", category: "Dark" },
  { id: "onyx",           label: "Onyx",            previewColor: "#C8B898", category: "Dark" },
  { id: "nebula",         label: "Nebula",          previewColor: "#D868E8", category: "Dark" },
  { id: "ink",            label: "Ink",             previewColor: "#50B0F0", category: "Dark" },
  { id: "raven",          label: "Raven",           previewColor: "#90C8F8", category: "Dark" },
  { id: "shadow",         label: "Shadow",          previewColor: "#B090D0", category: "Dark" },
  { id: "abyss",          label: "Abyss",           previewColor: "#48D8C0", category: "Dark" },
  { id: "slate-blue",     label: "Slate Blue",      previewColor: "#6888C0", category: "Dark" },
  // ── Warm (5) ───────────────────────────────────────────
  { id: "ember-glow",     label: "Ember Glow",      previewColor: "#F0A060", category: "Warm" },
  { id: "sandstone",      label: "Sandstone",       previewColor: "#D4A76A", category: "Warm" },
  { id: "copper",         label: "Copper",          previewColor: "#E08850", category: "Warm" },
  { id: "campfire",       label: "Campfire",        previewColor: "#F0C060", category: "Warm" },
  { id: "terracotta",     label: "Terracotta",      previewColor: "#D87850", category: "Warm" },
  // ── Light (4) ──────────────────────────────────────────
  { id: "snowfield",      label: "Snowfield",       previewColor: "#2563EB", category: "Light" },
  { id: "paper",          label: "Paper",           previewColor: "#B45309", category: "Light" },
  { id: "daylight",       label: "Daylight",        previewColor: "#3B82F6", category: "Light" },
  { id: "chalk",          label: "Chalk",           previewColor: "#6D28D9", category: "Light" },
  // ── High Contrast (2) ─────────────────────────────────
  { id: "phosphor",       label: "Phosphor",        previewColor: "#00FF88", category: "A11y" },
  { id: "blueprint",      label: "Blueprint",       previewColor: "#FFD700", category: "A11y" },
  // ── Holidays (8) ──────────────────────────────────────
  { id: "christmas",      label: "Christmas",       previewColor: "#D42A2A", category: "Holiday" },
  { id: "easter",         label: "Easter",          previewColor: "#C890E0", category: "Holiday" },
  { id: "halloween",      label: "Halloween",       previewColor: "#F08020", category: "Holiday" },
  { id: "july-4th",       label: "July 4th",        previewColor: "#E83030", category: "Holiday" },
  { id: "valentines",     label: "Valentine's",     previewColor: "#F06088", category: "Holiday" },
  { id: "st-patricks",    label: "St. Patrick's",   previewColor: "#28C050", category: "Holiday" },
  { id: "thanksgiving",   label: "Thanksgiving",    previewColor: "#D08830", category: "Holiday" },
  { id: "new-years",      label: "New Year's",      previewColor: "#F0D040", category: "Holiday" },
  // ── Seasons (4) ───────────────────────────────────────
  { id: "spring",         label: "Spring",          previewColor: "#68C870", category: "Season" },
  { id: "summer",         label: "Summer",          previewColor: "#F0A030", category: "Season" },
  { id: "fall",           label: "Fall",            previewColor: "#D87830", category: "Season" },
  { id: "winter",         label: "Winter",          previewColor: "#90C8F0", category: "Season" },
  // ── Celestial (7) ─────────────────────────────────────
  { id: "night",          label: "Night",           previewColor: "#4060C0", category: "Celestial" },
  { id: "day",            label: "Day",             previewColor: "#F0C848", category: "Celestial" },
  { id: "moon",           label: "Moon",            previewColor: "#C8C8D8", category: "Celestial" },
  { id: "sun",            label: "Sun",             previewColor: "#F8C830", category: "Celestial" },
  { id: "pluto",          label: "Pluto",           previewColor: "#B098C0", category: "Celestial" },
  { id: "saturn",         label: "Saturn",          previewColor: "#E0C888", category: "Celestial" },
  { id: "leo",            label: "Leo",             previewColor: "#F0A838", category: "Celestial" },
  // ── High Vis (8) — proven high-visibility / readability themes ───
  { id: "solarized-dark",  label: "Solarized Dark",   previewColor: "#268BD2", category: "High Vis" },
  { id: "dracula",         label: "Dracula",          previewColor: "#BD93F9", category: "High Vis" },
  { id: "gruvbox",         label: "Gruvbox Dark",     previewColor: "#83A598", category: "High Vis" },
  { id: "one-dark-pro",    label: "One Dark Pro",     previewColor: "#4AA5F0", category: "High Vis" },
  { id: "monokai",         label: "Monokai",          previewColor: "#66D9EF", category: "High Vis" },
  { id: "github-dimmed",   label: "GitHub Dimmed",    previewColor: "#539BF5", category: "High Vis" },
  { id: "catppuccin",      label: "Catppuccin Mocha", previewColor: "#89B4FA", category: "High Vis" },
  { id: "everforest",      label: "Everforest",       previewColor: "#A7C080", category: "High Vis" },
  // ── 5 Star (10) — community-loved aesthetic themes ────
  { id: "nord",            label: "Nord",             previewColor: "#88C0D0", category: "5 Star" },
  { id: "tokyo-night",     label: "Tokyo Night",      previewColor: "#7AA2F7", category: "5 Star" },
  { id: "palenight",       label: "Material Palenight",previewColor: "#AB47BC", category: "5 Star" },
  { id: "rose-pine",       label: "Rosé Pine",        previewColor: "#C4A7E7", category: "5 Star" },
  { id: "kanagawa",        label: "Kanagawa",         previewColor: "#7E9CD8", category: "5 Star" },
  { id: "ayu-dark",        label: "Ayu Dark",         previewColor: "#E6B450", category: "5 Star" },
  { id: "synthwave",       label: "Synthwave '84",    previewColor: "#FF7EDB", category: "5 Star" },
  { id: "vesper",          label: "Vesper",           previewColor: "#FFC799", category: "5 Star" },
  { id: "poimandres",      label: "Poimandres",       previewColor: "#ADD7FF", category: "5 Star" },
  { id: "vitesse",         label: "Vitesse Dark",     previewColor: "#4D9375", category: "5 Star" },
];

export const DEFAULT_THEME = "obsidian-night";
