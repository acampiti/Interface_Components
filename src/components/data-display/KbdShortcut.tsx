import "./KbdShortcut.css";

interface KbdShortcutProps {
  keys: string[];
}

export function KbdShortcut({ keys }: KbdShortcutProps) {
  return (
    <span className="kbd-root">
      {keys.map((key, i) => (
        <span key={i} className="kbd-group">
          {i > 0 && <span className="kbd-sep">+</span>}
          <kbd className="kbd-key">{key}</kbd>
        </span>
      ))}
    </span>
  );
}
