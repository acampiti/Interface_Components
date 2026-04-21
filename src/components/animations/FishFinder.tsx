import './FishFinder.css';

export function FishFinder() {
  return (
    <div className="fish-finder">
      {/* Depth lines */}
      <div className="fish-finder__depth-line fish-finder__depth-line--1" />
      <div className="fish-finder__depth-line fish-finder__depth-line--2" />
      <div className="fish-finder__depth-line fish-finder__depth-line--3" />

      {/* Depth labels */}
      <span className="fish-finder__depth-label fish-finder__depth-label--1">10m</span>
      <span className="fish-finder__depth-label fish-finder__depth-label--2">20m</span>
      <span className="fish-finder__depth-label fish-finder__depth-label--3">30m</span>

      {/* Water ripple row at top */}
      <div className="fish-finder__ripples">
        <div className="fish-finder__ripple fish-finder__ripple--1" />
        <div className="fish-finder__ripple fish-finder__ripple--2" />
        <div className="fish-finder__ripple fish-finder__ripple--3" />
      </div>

      {/* Fish blips — 5 at staggered positions and depths */}
      <div className="fish-finder__fish fish-finder__fish--1" />
      <div className="fish-finder__fish fish-finder__fish--2" />
      <div className="fish-finder__fish fish-finder__fish--3" />
      <div className="fish-finder__fish fish-finder__fish--4" />
      <div className="fish-finder__fish fish-finder__fish--5" />

      {/* Bottom terrain */}
      <div className="fish-finder__terrain" />

      {/* Scanning line */}
      <div className="fish-finder__scan-line" />
    </div>
  );
}
