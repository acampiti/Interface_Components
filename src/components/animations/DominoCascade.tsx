import './DominoCascade.css';

const DOMINOES = Array.from({ length: 7 }, (_, i) => i);

export function DominoCascade() {
  return (
    <div className="domino-cascade">
      {DOMINOES.map((i) => (
        <div
          key={i}
          className={`domino-cascade__piece domino-cascade__piece--${i}`}
        />
      ))}
    </div>
  );
}
