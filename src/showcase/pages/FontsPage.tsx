import { useEffect, useState } from "react";
import { ShowcasePage, ShowcaseGroup } from "../ShowcasePage";
import "./FontsPage.css";

// ── High-readability Windows default fonts ──────────────
// All ship with Windows 10/11 by default. Filtered to those
// known for screen legibility (humanist sans, screen-tuned
// serifs, and cleartype-tuned monospace).

interface FontDef {
  name: string;
  family: string;       // CSS font-family string
  category: "Sans"  | "Serif" | "Mono";
  notes: string;
}

const FONTS: FontDef[] = [
  // ── Sans-serif (humanist, screen-tuned) ──
  { name: "Segoe UI",        family: '"Segoe UI", system-ui, sans-serif',     category: "Sans",  notes: "Windows default UI font. Cleartype-tuned, large x-height, peak readability." },
  { name: "Segoe UI Variable", family: '"Segoe UI Variable", "Segoe UI", sans-serif', category: "Sans", notes: "Windows 11 default. Variable-weight successor to Segoe UI." },
  { name: "Calibri",         family: 'Calibri, sans-serif',                   category: "Sans",  notes: "Office default. Soft humanist letterforms, optimized for screens." },
  { name: "Verdana",         family: 'Verdana, Geneva, sans-serif',           category: "Sans",  notes: "Designed by Matthew Carter for screens. Wide spacing, exceptional small-size legibility." },
  { name: "Tahoma",          family: 'Tahoma, Geneva, sans-serif',            category: "Sans",  notes: "Compact sister of Verdana. UI workhorse for legacy Windows apps." },
  { name: "Trebuchet MS",    family: '"Trebuchet MS", sans-serif',            category: "Sans",  notes: "Web-designed font with distinctive humanist details." },
  { name: "Arial",           family: 'Arial, Helvetica, sans-serif',          category: "Sans",  notes: "Universal sans. Reliable but less tuned than Segoe/Calibri." },

  // ── Serif (screen-readable) ──
  { name: "Georgia",         family: 'Georgia, serif',                        category: "Serif", notes: "Screen-tuned serif by Matthew Carter. Sturdy, highly readable at all sizes." },
  { name: "Cambria",         family: 'Cambria, Georgia, serif',               category: "Serif", notes: "Microsoft Cleartype serif. Even color, broad proportions for body text." },
  { name: "Constantia",      family: 'Constantia, Georgia, serif',            category: "Serif", notes: "Cleartype serif with humanist warmth, designed for continuous reading." },

  // ── Monospace ──
  { name: "Cascadia Code",   family: '"Cascadia Code", "Cascadia Mono", Consolas, monospace', category: "Mono", notes: "Modern Windows Terminal font. Programming ligatures, excellent legibility." },
  { name: "Cascadia Mono",   family: '"Cascadia Mono", Consolas, monospace',  category: "Mono",  notes: "Cascadia without ligatures. Clean, balanced." },
  { name: "Consolas",        family: 'Consolas, "Cascadia Mono", monospace',  category: "Mono",  notes: "Cleartype monospace. Default in Visual Studio. Battle-tested." },
  { name: "Lucida Console",  family: '"Lucida Console", monospace',           category: "Mono",  notes: "Classic Windows monospace. Wide and tall — great for terminals." },
];

const PARAGRAPH = "The five boxing wizards jump quickly. Pack my box with five dozen liquor jugs. Sphinx of black quartz, judge my vow. How vexingly quick daft zebras jump!";
const SENTENCE = "The quick brown fox jumps over the lazy dog · 0123456789";
const NUMBERS = "0123456789  •  $5,250.25  •  +0.24%  •  vol 48,392";
const CODE = `const profit = exit - entry;
if (profit > 0) console.log("WIN");`;
const SHORT = "AaBbCc 1234";

const SIZES = [10, 12, 14, 16, 20, 28, 40];

const COLORS = [
  { name: "Default",   value: "var(--color-text-primary)" },
  { name: "Cyan",      value: "#00FFFF" },
  { name: "Lime",      value: "#CCFF00" },
  { name: "Amber",     value: "#FFB000" },
  { name: "Hot Pink",  value: "#FF1493" },
  { name: "Spring",    value: "#00FF7F" },
];

// ── Helpers ─────────────────────────────────────────────

interface FontAvailability {
  family: string;
  available: boolean;
}

// Detect installed fonts using canvas measurement
function detectFont(family: string): boolean {
  const testStr = "abcdefghijklmnopqrstuvwxyz0123456789";
  const testSize = "72px";
  const baseline = "monospace";

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return true;

  ctx.font = `${testSize} ${baseline}`;
  const baselineWidth = ctx.measureText(testStr).width;

  ctx.font = `${testSize} ${family}, ${baseline}`;
  const testWidth = ctx.measureText(testStr).width;

  return testWidth !== baselineWidth;
}

// ── Page sub-components ─────────────────────────────────

function FontHeader({ font, available }: { font: FontDef; available: boolean }) {
  return (
    <div className="fonts-header">
      <div className="fonts-header__title" style={{ fontFamily: font.family }}>
        {font.name}
      </div>
      <div className="fonts-header__meta">
        <span className={`fonts-badge fonts-badge--${font.category.toLowerCase()}`}>
          {font.category}
        </span>
        <span className={`fonts-badge fonts-badge--${available ? "ok" : "missing"}`}>
          {available ? "✓ installed" : "✗ fallback"}
        </span>
        <span className="fonts-header__notes">{font.notes}</span>
      </div>
    </div>
  );
}

function SizeRow({ font }: { font: FontDef }) {
  return (
    <div className="fonts-block">
      <div className="fonts-block__label">Sizes</div>
      <div className="fonts-block__content" style={{ fontFamily: font.family }}>
        {SIZES.map((sz) => (
          <div key={sz} className="fonts-size-row">
            <span className="fonts-size-row__tag">{sz}px</span>
            <span style={{ fontSize: `${sz}px` }}>{SHORT}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StyleRow({ font }: { font: FontDef }) {
  return (
    <div className="fonts-block">
      <div className="fonts-block__label">Styles</div>
      <div className="fonts-block__content" style={{ fontFamily: font.family, fontSize: 16 }}>
        <div className="fonts-style-row"><span className="fonts-style-row__tag">Regular</span><span>{SENTENCE}</span></div>
        <div className="fonts-style-row"><span className="fonts-style-row__tag">Bold</span><span style={{ fontWeight: 700 }}>{SENTENCE}</span></div>
        <div className="fonts-style-row"><span className="fonts-style-row__tag">Italic</span><span style={{ fontStyle: "italic" }}>{SENTENCE}</span></div>
        <div className="fonts-style-row"><span className="fonts-style-row__tag">Bold Italic</span><span style={{ fontWeight: 700, fontStyle: "italic" }}>{SENTENCE}</span></div>
        <div className="fonts-style-row"><span className="fonts-style-row__tag">Light</span><span style={{ fontWeight: 300 }}>{SENTENCE}</span></div>
      </div>
    </div>
  );
}

function ColorRow({ font }: { font: FontDef }) {
  return (
    <div className="fonts-block">
      <div className="fonts-block__label">Colors (16px / Bold)</div>
      <div className="fonts-block__content fonts-color-grid" style={{ fontFamily: font.family }}>
        {COLORS.map((c) => (
          <div
            key={c.name}
            className="fonts-color-cell"
            style={{ color: c.value, fontSize: 16, fontWeight: 700 }}
          >
            <span className="fonts-color-cell__tag">{c.name}</span>
            <span>{SHORT}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NumbersBlock({ font }: { font: FontDef }) {
  return (
    <div className="fonts-block">
      <div className="fonts-block__label">Trading numbers (tabular)</div>
      <div
        className="fonts-block__content"
        style={{ fontFamily: font.family, fontVariantNumeric: "tabular-nums" }}
      >
        <div style={{ fontSize: 22, fontWeight: 700 }}>{NUMBERS}</div>
        <div style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>{NUMBERS}</div>
      </div>
    </div>
  );
}

function ParagraphBlock({ font }: { font: FontDef }) {
  return (
    <div className="fonts-block">
      <div className="fonts-block__label">Paragraph (14px)</div>
      <div
        className="fonts-block__content"
        style={{ fontFamily: font.family, fontSize: 14, lineHeight: 1.6 }}
      >
        {PARAGRAPH}
      </div>
    </div>
  );
}

function CodeBlock({ font }: { font: FontDef }) {
  if (font.category !== "Mono") return null;
  return (
    <div className="fonts-block">
      <div className="fonts-block__label">Code sample</div>
      <pre
        className="fonts-block__content fonts-code"
        style={{ fontFamily: font.family, fontSize: 13 }}
      >
        {CODE}
      </pre>
    </div>
  );
}

function FontCard({ font, available }: { font: FontDef; available: boolean }) {
  return (
    <div className="fonts-card">
      <FontHeader font={font} available={available} />
      <div className="fonts-card__grid">
        <SizeRow font={font} />
        <StyleRow font={font} />
        <ColorRow font={font} />
        <NumbersBlock font={font} />
        <ParagraphBlock font={font} />
        <CodeBlock font={font} />
      </div>
    </div>
  );
}

// ── Main page ───────────────────────────────────────────

export function FontsPage() {
  const [availability, setAvailability] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const checks: FontAvailability[] = FONTS.map((f) => {
      // Extract the first font name from the family string for detection
      const primary = f.family.split(",")[0].replace(/['"]/g, "").trim();
      return { family: primary, available: detectFont(primary) };
    });
    const map: Record<string, boolean> = {};
    FONTS.forEach((f, i) => { map[f.name] = checks[i].available; });
    setAvailability(map);
  }, []);

  const sansFonts = FONTS.filter((f) => f.category === "Sans");
  const serifFonts = FONTS.filter((f) => f.category === "Serif");
  const monoFonts = FONTS.filter((f) => f.category === "Mono");

  return (
    <ShowcasePage
      title="Fonts"
      description="High-readability Windows default fonts. Each shown in multiple sizes, styles, colors, and use cases. Availability detected via canvas font-fallback measurement."
    >
      <ShowcaseGroup
        title="Sans-Serif"
        description="Humanist and screen-tuned sans fonts. Best for UI, body text, and dense interfaces."
      >
        {sansFonts.map((f) => (
          <FontCard key={f.name} font={f} available={availability[f.name] ?? true} />
        ))}
      </ShowcaseGroup>

      <ShowcaseGroup
        title="Serif"
        description="Screen-readable serifs. Best for long-form reading and editorial."
      >
        {serifFonts.map((f) => (
          <FontCard key={f.name} font={f} available={availability[f.name] ?? true} />
        ))}
      </ShowcaseGroup>

      <ShowcaseGroup
        title="Monospace"
        description="Fixed-width fonts for code, terminals, and tabular numeric data."
      >
        {monoFonts.map((f) => (
          <FontCard key={f.name} font={f} available={availability[f.name] ?? true} />
        ))}
      </ShowcaseGroup>
    </ShowcasePage>
  );
}
