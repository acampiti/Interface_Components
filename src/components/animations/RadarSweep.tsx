import './RadarSweep.css';

// Blip positions expressed as (angleDeg, radiusPct) pairs.
// angleDeg: 0 = top, clockwise. radiusPct: fraction of the radar radius (0–1).
// animationDelay is set so the blip lights up precisely when the sweep arm
// passes over it.  The sweep completes one full rotation in 3s, so a blip at
// angleDeg X should fire at delay = (X / 360) * 3s seconds after t=0.
const BLIPS: { angleDeg: number; radiusPct: number }[] = [
  { angleDeg: 35,  radiusPct: 0.55 },
  { angleDeg: 80,  radiusPct: 0.75 },
  { angleDeg: 130, radiusPct: 0.40 },
  { angleDeg: 175, radiusPct: 0.65 },
  { angleDeg: 220, radiusPct: 0.50 },
  { angleDeg: 260, radiusPct: 0.80 },
  { angleDeg: 310, radiusPct: 0.35 },
  { angleDeg: 355, radiusPct: 0.60 },
];

const SWEEP_DURATION = 3; // seconds — must match CSS --radar-sweep-duration

export function RadarSweep() {
  return (
    <div className="radar-sweep">
      {/* Concentric range rings */}
      <div className="radar-sweep__ring radar-sweep__ring--1" />
      <div className="radar-sweep__ring radar-sweep__ring--2" />
      <div className="radar-sweep__ring radar-sweep__ring--3" />

      {/* Crosshair lines */}
      <div className="radar-sweep__crosshair radar-sweep__crosshair--h" />
      <div className="radar-sweep__crosshair radar-sweep__crosshair--v" />

      {/* Rotating sweep arm (conic-gradient disc) */}
      <div className="radar-sweep__arm" />

      {/* Blips */}
      {BLIPS.map(({ angleDeg, radiusPct }, i) => {
        // Convert polar → cartesian.
        // CSS origin is top-left; radar center is at 50% 50%.
        // angle 0° = top → subtract 90° to convert to standard math angle.
        const rad = ((angleDeg - 90) * Math.PI) / 180;
        // Radar radius in px = 80 (half of 160px diameter).
        const r = radiusPct * 80;
        const x = 80 + r * Math.cos(rad); // px from left edge
        const y = 80 + r * Math.sin(rad); // px from top edge
        const delay = ((angleDeg / 360) * SWEEP_DURATION).toFixed(3);

        return (
          <div
            key={i}
            className="radar-sweep__blip"
            style={{
              left: `${x}px`,
              top:  `${y}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${SWEEP_DURATION}s`,
            }}
          />
        );
      })}

      {/* Center dot */}
      <div className="radar-sweep__center" />
    </div>
  );
}
