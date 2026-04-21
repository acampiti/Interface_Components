import { ShowcasePage, ShowcaseGroup } from "../ShowcasePage";
import "./HiVisColorsPage.css";

// ── High-visibility colors ──────────────────────────────
// Selected for maximum legibility on dark backgrounds.
// Drawn from safety, signage, accessibility, and HUD design conventions.

interface CompanionColor {
  name: string;
  hex: string;
}

interface HighVisColor {
  name: string;
  hex: string;
  notes: string;
  // Eye-friendly, highly readable text colors that complement the hi-vis color.
  // Chosen for low eye strain when used alongside (body text, labels, secondary info).
  companions: CompanionColor[];
}

const HIGH_VIS: HighVisColor[] = [
  { name: "Safety Yellow",   hex: "#FFFF00", notes: "Highest luminance — used on hi-vis vests, road signs",
    companions: [
      { name: "Warm Gray",   hex: "#BFB89A" },
      { name: "Soft Cream",  hex: "#E8E2C4" },
      { name: "Muted Olive", hex: "#9AA07A" },
    ]},
  { name: "Hi-Vis Lime",     hex: "#CCFF00", notes: "ANSI 107 fluorescent yellow-green",
    companions: [
      { name: "Sage Gray",   hex: "#B8C4A8" },
      { name: "Pale Mint",   hex: "#D4E6C8" },
      { name: "Moss",        hex: "#8FA682" },
    ]},
  { name: "Neon Green",      hex: "#39FF14", notes: "Phosphor green — classic CRT terminal",
    companions: [
      { name: "Terminal Gray", hex: "#A8C8A0" },
      { name: "Cool Slate",  hex: "#8FA89A" },
      { name: "Off-White",   hex: "#D8E6D4" },
    ]},
  { name: "Cyan",            hex: "#00FFFF", notes: "Pure cyan — peak readability on black",
    companions: [
      { name: "Cool Gray",   hex: "#B0C4CC" },
      { name: "Ice Blue",    hex: "#C8DCE0" },
      { name: "Steel",       hex: "#8FA4AA" },
    ]},
  { name: "Sky Blue",        hex: "#00BFFF", notes: "Calmer than cyan, still highly legible",
    companions: [
      { name: "Cloud Gray",  hex: "#BCC8D0" },
      { name: "Mist",        hex: "#D4DCE4" },
      { name: "Slate",       hex: "#8A9BA8" },
    ]},
  { name: "Hi-Vis Orange",   hex: "#FF6600", notes: "Safety orange — construction, hunting",
    companions: [
      { name: "Warm Taupe",  hex: "#C8B8A8" },
      { name: "Sand",        hex: "#E4D8C4" },
      { name: "Burnt Beige", hex: "#A89A88" },
    ]},
  { name: "Amber",           hex: "#FFB000", notes: "Aviation HUD amber — low eye strain",
    companions: [
      { name: "Warm Gray",   hex: "#C4B8A4" },
      { name: "Pale Wheat",  hex: "#E4D8BC" },
      { name: "Bronze",      hex: "#A8947A" },
    ]},
  { name: "Hot Pink",        hex: "#FF1493", notes: "Maximum chromatic contrast vs. green",
    companions: [
      { name: "Dusty Rose",  hex: "#D4A8B8" },
      { name: "Pale Pink",   hex: "#E8D0DC" },
      { name: "Mauve",       hex: "#A88494" },
    ]},
  { name: "Magenta",         hex: "#FF00FF", notes: "Pure magenta — chromatic key in CMYK",
    companions: [
      { name: "Lavender",    hex: "#C8B4D4" },
      { name: "Pale Lilac",  hex: "#DCC8E0" },
      { name: "Plum Gray",   hex: "#9C84A8" },
    ]},
  { name: "Crimson Red",     hex: "#FF073A", notes: "Pure red boosted with slight magenta lift",
    companions: [
      { name: "Rose Gray",   hex: "#C8A8AC" },
      { name: "Blush",       hex: "#E0C4C8" },
      { name: "Muted Clay",  hex: "#A88084" },
    ]},
  { name: "Tomato",          hex: "#FF6347", notes: "Softer alarm red — error states",
    companions: [
      { name: "Warm Stone",  hex: "#C8B0A8" },
      { name: "Pale Coral",  hex: "#E8CCC4" },
      { name: "Terracotta",  hex: "#A8887C" },
    ]},
  { name: "Gold",            hex: "#FFD700", notes: "Warm yellow — premium / highlight accents",
    companions: [
      { name: "Champagne",   hex: "#D8C8A8" },
      { name: "Ivory",       hex: "#E8DCC0" },
      { name: "Warm Brown",  hex: "#A89478" },
    ]},
  { name: "Chartreuse",      hex: "#DFFF00", notes: "Yellow-green — peak photopic visibility",
    companions: [
      { name: "Sage",        hex: "#BCC8A0" },
      { name: "Pale Linen",  hex: "#DCE0C4" },
      { name: "Olive Gray",  hex: "#949C7C" },
    ]},
  { name: "Spring Green",    hex: "#00FF7F", notes: "Cool green with high luminance",
    companions: [
      { name: "Mint Gray",   hex: "#B0CCBC" },
      { name: "Seafoam",     hex: "#CCE0D4" },
      { name: "Jade Gray",   hex: "#84A894" },
    ]},
  { name: "Turquoise",       hex: "#40E0D0", notes: "Cyan-green hybrid — easy on eyes",
    companions: [
      { name: "Cool Stone",  hex: "#B4C8C4" },
      { name: "Pale Aqua",   hex: "#CCDCDA" },
      { name: "Teal Gray",   hex: "#849C9A" },
    ]},
  { name: "Electric Blue",   hex: "#7DF9FF", notes: "Pale cyan — UI accent for active states",
    companions: [
      { name: "Ice Gray",    hex: "#BCCCD0" },
      { name: "Pale Frost",  hex: "#D4DCE0" },
      { name: "Steel Blue",  hex: "#8894A0" },
    ]},
  { name: "Hi-Vis White",    hex: "#FFFFFF", notes: "Pure white — maximum contrast on dark",
    companions: [
      { name: "Silver",      hex: "#C4C8CC" },
      { name: "Pearl",       hex: "#DCDCDC" },
      { name: "Gunmetal",    hex: "#8C8F92" },
    ]},
  { name: "Bone White",      hex: "#FAFAD2", notes: "Off-white — reduces glare vs. pure white",
    companions: [
      { name: "Parchment",   hex: "#D4D0B4" },
      { name: "Ecru",        hex: "#E0DCC0" },
      { name: "Warm Taupe",  hex: "#9C9880" },
    ]},
];

const sampleText = "The quick brown fox jumps over the lazy dog · 0123456789";
const codeSample = "const profit = entry - exit;  // ES @ 5250.25";

function ColorRow({ color }: { color: HighVisColor }) {
  return (
    <div className="fonts-row">
      <div className="fonts-row__swatch" style={{ background: color.hex }} />
      <div className="fonts-row__meta">
        <div className="fonts-row__name" style={{ color: color.hex }}>{color.name}</div>
        <div className="fonts-row__hex">{color.hex}</div>
        <div className="fonts-row__notes">{color.notes}</div>
      </div>
      <div className="fonts-row__samples">
        <div className="fonts-row__sample fonts-row__sample--lg" style={{ color: color.hex }}>
          AaBbCc 1234
        </div>
        <div className="fonts-row__sample fonts-row__sample--md" style={{ color: color.hex }}>
          {sampleText}
        </div>
        <div className="fonts-row__sample fonts-row__sample--mono" style={{ color: color.hex }}>
          {codeSample}
        </div>
      </div>
      <div className="fonts-row__companions">
        <div className="fonts-row__companions-label">Eye-friendly companions</div>
        {color.companions.map((comp) => (
          <div key={comp.hex} className="fonts-companion">
            <div className="fonts-companion__swatch" style={{ background: comp.hex }} />
            <div className="fonts-companion__info">
              <div className="fonts-companion__name" style={{ color: comp.hex }}>{comp.name}</div>
              <div className="fonts-companion__hex">{comp.hex}</div>
            </div>
            <div className="fonts-companion__sample" style={{ color: comp.hex }}>
              {sampleText}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PairingPreview({ color }: { color: HighVisColor }) {
  return (
    <div className="fonts-pairing">
      <div className="fonts-pairing__header" style={{ color: color.hex }}>
        {color.name} — {color.hex}
      </div>
      {color.companions.map((comp) => (
        <div key={comp.hex} className="fonts-pairing__row">
          <div className="fonts-pairing__title" style={{ color: color.hex }}>
            Price Alert: ES +12.50
          </div>
          <div className="fonts-pairing__body" style={{ color: comp.hex }}>
            Broke above 5250 resistance at 09:42 ET. Volume 48,392 on the breakout candle.
            {" "}<span style={{ color: comp.hex, opacity: 0.7 }}>
              {comp.name} · {comp.hex}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function HiVisColorsPage() {
  return (
    <ShowcasePage
      title="High-Visibility Colors"
      description="High-luminance colors optimized for legibility on dark backgrounds. Pulled from safety signage (ANSI 107), HUD design, and CRT phosphor traditions."
    >
      <ShowcaseGroup
        title="High-Visibility Color Palette"
        description="Each color shown as a swatch, label, and three text sample sizes against the current theme background."
      >
        <div className="fonts-table">
          {HIGH_VIS.map((c) => <ColorRow key={c.hex} color={c} />)}
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup
        title="Side-by-Side Readability"
        description="All colors stacked on the same dark background for direct comparison."
      >
        <div className="fonts-stack">
          {HIGH_VIS.map((c) => (
            <div key={c.hex} className="fonts-stack__line" style={{ color: c.hex }}>
              <span className="fonts-stack__hex">{c.hex}</span>
              <span className="fonts-stack__name">{c.name}</span>
              <span className="fonts-stack__text">{sampleText}</span>
            </div>
          ))}
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup
        title="On Bright Background"
        description="Same palette over white to show which colors lose visibility on light surfaces."
      >
        <div className="fonts-stack fonts-stack--light">
          {HIGH_VIS.map((c) => (
            <div key={c.hex} className="fonts-stack__line" style={{ color: c.hex }}>
              <span className="fonts-stack__hex">{c.hex}</span>
              <span className="fonts-stack__name">{c.name}</span>
              <span className="fonts-stack__text">{sampleText}</span>
            </div>
          ))}
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup
        title="Pairing Preview — Hi-Vis Headline + Eye-Friendly Body"
        description="Each hi-vis color as a headline/accent, paired with its complementary low-strain body text colors. This is how they'd actually be used together in a UI."
      >
        <div className="fonts-pairings">
          {HIGH_VIS.map((c) => <PairingPreview key={c.hex} color={c} />)}
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup
        title="Trading-Style Number Readability"
        description="Tabular numerals — the format that matters for live price ladders."
      >
        <div className="fonts-numbers">
          {HIGH_VIS.map((c) => (
            <div key={c.hex} className="fonts-numbers__row" style={{ color: c.hex }}>
              <span className="fonts-numbers__label">{c.name}</span>
              <span className="fonts-numbers__big">5250.25</span>
              <span className="fonts-numbers__delta">+12.50</span>
              <span className="fonts-numbers__pct">+0.24%</span>
              <span className="fonts-numbers__vol">vol 48,392</span>
            </div>
          ))}
        </div>
      </ShowcaseGroup>
    </ShowcasePage>
  );
}
