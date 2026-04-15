import './PulseGrid.css';

export function PulseGrid() {
  return (
    <div className="pulse-grid">
      {Array.from({ length: 9 }, (_, i) => (
        <div
          key={i}
          className="pulse-grid__cell"
          style={{ animationDelay: `${(Math.floor(i / 3) + (i % 3)) * 0.15}s` }}
        />
      ))}
    </div>
  );
}
