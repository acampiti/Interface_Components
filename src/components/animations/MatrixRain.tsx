import './MatrixRain.css';

const CHARS = [
  'ア', '0', 'カ', '1', 'サ', 'タ', '0', 'ナ',
  '1', 'ハ', 'マ', '0', 'ヤ', '1', 'ラ', 'ワ',
  '0', '1', 'キ', 'シ', 'チ', 'ニ', 'ヒ', 'ミ',
  'ア', '1', 'サ', '0', 'ナ', 'タ', '1', 'カ',
  'マ', '0', 'ヤ', 'ラ', '1', 'ワ', 'キ', '0',
  'シ', 'チ', '0', 'ニ', 'ヒ', 'ミ', '1', 'ア',
];

const COLS = 8;
const ROWS = 6;

export function MatrixRain() {
  return (
    <div className="matrix-rain">
      {Array.from({ length: COLS }, (_, col) => (
        <div
          key={col}
          className="matrix-rain__column"
          style={{ animationDelay: `${col * 0.3}s` }}
        >
          {Array.from({ length: ROWS }, (_, row) => (
            <span
              key={row}
              className="matrix-rain__char"
              style={{ animationDelay: `${col * 0.3 + row * 0.1}s` }}
            >
              {CHARS[col * ROWS + row]}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
