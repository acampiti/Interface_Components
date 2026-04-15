import { useRef, useState, useCallback, useEffect } from "react";
import "./RichTextEditor.css";

interface RichTextEditorProps {
  placeholder?: string;
  initialHTML?: string;
  onChange?: (html: string) => void;
}

// ── Toolbar button helper ──────────────────────────────

function ToolBtn({
  cmd,
  arg,
  label,
  icon,
  activeCmd,
}: {
  cmd: string;
  arg?: string;
  label: string;
  icon?: React.ReactNode;
  activeCmd?: string;
}) {
  const [active, setActive] = useState(false);

  // Poll active state via queryCommandState
  useEffect(() => {
    const check = () => {
      try {
        setActive(document.queryCommandState(activeCmd ?? cmd));
      } catch {
        /* unsupported command — ignore */
      }
    };
    document.addEventListener("selectionchange", check);
    return () => document.removeEventListener("selectionchange", check);
  }, [cmd, activeCmd]);

  const run = () => {
    document.execCommand(cmd, false, arg);
  };

  return (
    <button
      type="button"
      className={`rte-btn${active ? " active" : ""}`}
      title={label}
      onMouseDown={(e) => e.preventDefault()}
      onClick={run}
    >
      {icon ?? label}
    </button>
  );
}

// ── SVG icons (inline, no deps) ─────────────────────────

const BoldIcon = (
  <svg viewBox="0 0 16 16">
    <path d="M4 2h5a3 3 0 0 1 2.1 5.2A3.5 3.5 0 0 1 9.5 14H4V2zm2 5h3a1 1 0 0 0 0-2H6v2zm0 2v3h3.5a1.5 1.5 0 0 0 0-3H6z" />
  </svg>
);

const ItalicIcon = (
  <svg viewBox="0 0 16 16">
    <path d="M6 2h6v2h-2.2l-2.6 8H9v2H3v-2h2.2l2.6-8H6V2z" />
  </svg>
);

const UnderlineIcon = (
  <svg viewBox="0 0 16 16">
    <path d="M4 2v6a4 4 0 0 0 8 0V2h-2v6a2 2 0 0 1-4 0V2H4zM3 13h10v1.5H3V13z" />
  </svg>
);

const StrikeIcon = (
  <svg viewBox="0 0 16 16">
    <path d="M2 8h12v1H2V8zM5.5 6C5.5 4.9 6.6 4 8 4s2.5.9 2.5 2h-2c0-.3-.2-.5-.5-.5s-.5.2-.5.5h-2zm5 3c0 1.1-1.1 2-2.5 2S5.5 10.1 5.5 9h2c0 .3.2.5.5.5s.5-.2.5-.5h2z" />
  </svg>
);

const AlignLeftIcon = (
  <svg viewBox="0 0 16 16">
    <path d="M2 3h12v1.5H2V3zm0 3h8v1.5H2V6zm0 3h10v1.5H2V9zm0 3h6v1.5H2V12z" />
  </svg>
);

const AlignCenterIcon = (
  <svg viewBox="0 0 16 16">
    <path d="M2 3h12v1.5H2V3zm2 3h8v1.5H4V6zm1 3h6v1.5H5V9zm2 3h2v1.5H7V12z" />
  </svg>
);

const AlignRightIcon = (
  <svg viewBox="0 0 16 16">
    <path d="M2 3h12v1.5H2V3zm4 3h8v1.5H6V6zm2 3h6v1.5H8V9zm4 3h2v1.5h-2V12z" />
  </svg>
);

const ULIcon = (
  <svg viewBox="0 0 16 16">
    <circle cx="3" cy="4" r="1.2" />
    <circle cx="3" cy="8" r="1.2" />
    <circle cx="3" cy="12" r="1.2" />
    <path d="M6 3.2h8v1.5H6V3.2zm0 4h8v1.5H6V7.2zm0 4h8v1.5H6v-1.5z" />
  </svg>
);

const OLIcon = (
  <svg viewBox="0 0 16 16">
    <text x="1.5" y="5" fontSize="4" fill="currentColor" fontWeight="700">1.</text>
    <text x="1.5" y="9" fontSize="4" fill="currentColor" fontWeight="700">2.</text>
    <text x="1.5" y="13" fontSize="4" fill="currentColor" fontWeight="700">3.</text>
    <path d="M6 3.2h8v1.5H6V3.2zm0 4h8v1.5H6V7.2zm0 4h8v1.5H6v-1.5z" />
  </svg>
);

const IndentIcon = (
  <svg viewBox="0 0 16 16">
    <path d="M2 3h12v1.5H2V3zm4 3h8v1.5H6V6zm0 3h8v1.5H6V9zm-4 3h12v1.5H2V12zM2 6.5l2.5 2L2 10.5v-4z" />
  </svg>
);

const OutdentIcon = (
  <svg viewBox="0 0 16 16">
    <path d="M2 3h12v1.5H2V3zm4 3h8v1.5H6V6zm0 3h8v1.5H6V9zm-4 3h12v1.5H2V12zM4.5 6.5L2 8.5l2.5 2v-4z" />
  </svg>
);

const LinkIcon = (
  <svg viewBox="0 0 16 16">
    <path d="M7.8 9.6l-1.4 1.4a2 2 0 0 1-2.8-2.8l2-2a2 2 0 0 1 2.8 0l.7-.7a3 3 0 0 0-4.2 0l-2 2a3 3 0 0 0 4.2 4.2l1.4-1.4-.7-.7zm.4-3.2l1.4-1.4a2 2 0 0 1 2.8 2.8l-2 2a2 2 0 0 1-2.8 0l-.7.7a3 3 0 0 0 4.2 0l2-2a3 3 0 0 0-4.2-4.2L7.5 5.7l.7.7z" />
  </svg>
);

const ClearIcon = (
  <svg viewBox="0 0 16 16">
    <path d="M2 4h12l-1.5 10H3.5L2 4zm4-2h4v1.5H6V2zM5 6.5l1 7m4-7l-1 7M8 6.5v7" stroke="currentColor" strokeWidth="1" fill="none" />
  </svg>
);

// ── Font sizes ──────────────────────────────────────────

const FONT_SIZES = [
  { label: "Small", value: "2" },
  { label: "Normal", value: "3" },
  { label: "Medium", value: "4" },
  { label: "Large", value: "5" },
  { label: "X-Large", value: "6" },
  { label: "Huge", value: "7" },
];

const FONT_FAMILIES = [
  "Sans-serif",
  "Serif",
  "Monospace",
  "Arial",
  "Georgia",
  "Verdana",
  "Courier New",
  "Trebuchet MS",
];

const HEADING_OPTIONS = [
  { label: "Normal", tag: "p" },
  { label: "Heading 1", tag: "h1" },
  { label: "Heading 2", tag: "h2" },
  { label: "Heading 3", tag: "h3" },
  { label: "Heading 4", tag: "h4" },
];

// ── Component ───────────────────────────────────────────

export function RichTextEditor({ placeholder, initialHTML, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [fgColor, setFgColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#ffff00");

  const updateCounts = useCallback(() => {
    const el = editorRef.current;
    if (!el) return;
    const text = el.innerText || "";
    const trimmed = text.trim();
    setCharCount(trimmed.length);
    setWordCount(trimmed.length === 0 ? 0 : trimmed.split(/\s+/).length);
    onChange?.(el.innerHTML);
  }, [onChange]);

  const handleFontSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    document.execCommand("fontSize", false, e.target.value);
  };

  const handleFontFamily = (e: React.ChangeEvent<HTMLSelectElement>) => {
    document.execCommand("fontName", false, e.target.value);
  };

  const handleHeading = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tag = e.target.value;
    if (tag === "p") {
      document.execCommand("formatBlock", false, "p");
    } else {
      document.execCommand("formatBlock", false, tag);
    }
  };

  const handleFgColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFgColor(e.target.value);
    document.execCommand("foreColor", false, e.target.value);
  };

  const handleBgColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBgColor(e.target.value);
    document.execCommand("hiliteColor", false, e.target.value);
  };

  const handleLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      document.execCommand("createLink", false, url);
    }
  };

  const handleClearFormatting = () => {
    document.execCommand("removeFormat", false);
  };

  // Set initial content
  useEffect(() => {
    if (editorRef.current && initialHTML) {
      editorRef.current.innerHTML = initialHTML;
      updateCounts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="rte">
      {/* ── Toolbar ────────────────────────────── */}
      <div className="rte-toolbar">
        {/* Block format */}
        <div className="rte-toolbar-group">
          <select className="rte-select" onChange={handleHeading} defaultValue="p" title="Block format">
            {HEADING_OPTIONS.map((h) => (
              <option key={h.tag} value={h.tag}>{h.label}</option>
            ))}
          </select>
        </div>

        {/* Font family + size */}
        <div className="rte-toolbar-group">
          <select className="rte-select" onChange={handleFontFamily} defaultValue="Sans-serif" title="Font family">
            {FONT_FAMILIES.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
          <select className="rte-select" onChange={handleFontSize} defaultValue="3" title="Font size">
            {FONT_SIZES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* Bold / Italic / Underline / Strike */}
        <div className="rte-toolbar-group">
          <ToolBtn cmd="bold" label="Bold (Ctrl+B)" icon={BoldIcon} />
          <ToolBtn cmd="italic" label="Italic (Ctrl+I)" icon={ItalicIcon} />
          <ToolBtn cmd="underline" label="Underline (Ctrl+U)" icon={UnderlineIcon} />
          <ToolBtn cmd="strikeThrough" label="Strikethrough" icon={StrikeIcon} />
        </div>

        {/* Text color / Highlight */}
        <div className="rte-toolbar-group">
          <div className="rte-color-btn" title="Text color">
            <div className="rte-color-swatch" style={{ background: fgColor }} />
            <input type="color" value={fgColor} onChange={handleFgColor} />
          </div>
          <div className="rte-color-btn" title="Highlight color">
            <div className="rte-color-swatch" style={{ background: bgColor }} />
            <input type="color" value={bgColor} onChange={handleBgColor} />
          </div>
        </div>

        {/* Alignment */}
        <div className="rte-toolbar-group">
          <ToolBtn cmd="justifyLeft" label="Align left" icon={AlignLeftIcon} />
          <ToolBtn cmd="justifyCenter" label="Align center" icon={AlignCenterIcon} />
          <ToolBtn cmd="justifyRight" label="Align right" icon={AlignRightIcon} />
        </div>

        {/* Lists + indent */}
        <div className="rte-toolbar-group">
          <ToolBtn cmd="insertUnorderedList" label="Bullet list" icon={ULIcon} />
          <ToolBtn cmd="insertOrderedList" label="Numbered list" icon={OLIcon} />
          <ToolBtn cmd="indent" label="Indent" icon={IndentIcon} />
          <ToolBtn cmd="outdent" label="Outdent" icon={OutdentIcon} />
        </div>

        {/* Link + Clear */}
        <div className="rte-toolbar-group">
          <button
            type="button"
            className="rte-btn"
            title="Insert link"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleLink}
          >
            {LinkIcon}
          </button>
          <button
            type="button"
            className="rte-btn"
            title="Clear formatting"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleClearFormatting}
          >
            {ClearIcon}
          </button>
        </div>
      </div>

      {/* ── Editable area ─────────────────────── */}
      <div
        ref={editorRef}
        className="rte-body"
        contentEditable
        data-placeholder={placeholder || "Start typing..."}
        onInput={updateCounts}
        suppressContentEditableWarning
      />

      {/* ── Footer ────────────────────────────── */}
      <div className="rte-footer">
        <span>{wordCount} words</span>
        <span>{charCount} chars</span>
      </div>
    </div>
  );
}
