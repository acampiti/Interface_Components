import { useMemo } from 'react';
import './AtomNucleus.css';

/*
 * Atom with nucleus + 3 electrons on elliptical orbits.
 * - Min speed: 1.4s per revolution. Max speed: 0.7s (double).
 * - Each electron gets a random duration between min/max on mount.
 * - Orbits are spaced 120° apart (0°, 120°, 240°)
 * - Rotation is baked into the path coordinates (not a transform)
 *   because <animateMotion> ignores transforms on the <path> element
 */

const CX = 80;
const CY = 80;
const RX = 68;
const RY = 24;
const DUR_MIN = 1.4; // slowest (seconds)
const DUR_MAX = 0.7; // fastest (seconds) — half of min = double speed
const STEPS = 72;

// Generate a rotated ellipse as a smooth <path> d-string.
// startOffset (0–1) shifts where on the ellipse the path begins,
// so electrons on different orbits start at different positions.
function rotatedEllipsePath(
  cx: number, cy: number, rx: number, ry: number,
  angleDeg: number, startOffset: number
): string {
  const rad = (angleDeg * Math.PI) / 180;
  const cosA = Math.cos(rad);
  const sinA = Math.sin(rad);
  const points: string[] = [];

  for (let i = 0; i <= STEPS; i++) {
    // Shift the parametric start by startOffset
    const t = ((i / STEPS) + startOffset) * 2 * Math.PI;
    const ex = rx * Math.cos(t);
    const ey = ry * Math.sin(t);
    const px = cx + ex * cosA - ey * sinA;
    const py = cy + ex * sinA + ey * cosA;

    if (i === 0) {
      points.push(`M ${px.toFixed(2)},${py.toFixed(2)}`);
    } else {
      points.push(`L ${px.toFixed(2)},${py.toFixed(2)}`);
    }
  }
  points.push('Z');
  return points.join(' ');
}

const ORBITS = [
  { id: 'atomOrbit1', tilt: 0,   startOffset: 0 },
  { id: 'atomOrbit2', tilt: 120, startOffset: 0.33 },
  { id: 'atomOrbit3', tilt: 240, startOffset: 0.7 },
];

// Pre-compute path data with rotation + offset baked in
const ORBIT_PATHS = ORBITS.map(({ id, tilt, startOffset }) => ({
  id,
  d: rotatedEllipsePath(CX, CY, RX, RY, tilt, startOffset),
}));

export function AtomNucleus() {
  // Random duration per electron, stable across re-renders
  const durations = useMemo(
    () => ORBIT_PATHS.map(() => {
      const d = DUR_MAX + Math.random() * (DUR_MIN - DUR_MAX);
      return `${d.toFixed(3)}s`;
    }),
    []
  );

  return (
    <div className="atom-nucleus">
      <svg
        className="atom-nucleus__svg"
        viewBox="0 0 160 160"
        width="160"
        height="160"
      >
        {/* Motion paths in <defs> — rotation baked into coordinates */}
        <defs>
          {ORBIT_PATHS.map(({ id, d }) => (
            <path key={id} id={id} d={d} />
          ))}
        </defs>

        {/* Orbit rings + electrons */}
        {ORBIT_PATHS.map(({ id }, i) => (
          <g key={id}>
            <use href={`#${id}`} className="atom-nucleus__orbit-ring" />
            <circle r="4" className="atom-nucleus__electron">
              <animateMotion dur={durations[i]} repeatCount="indefinite">
                <mpath href={`#${id}`} />
              </animateMotion>
            </circle>
          </g>
        ))}

        {/* Nucleus core — ~2/3 of 160px = ~53px diameter cluster */}
        <g className="atom-nucleus__core-group">
          {/* Protons — r=11 */}
          <circle cx="71" cy="68" r="11" className="atom-nucleus__proton" />
          <circle cx="91" cy="72" r="11" className="atom-nucleus__proton" />
          <circle cx="80" cy="90" r="11" className="atom-nucleus__proton" />
          {/* Neutrons — r=10 */}
          <circle cx="82" cy="67" r="10" className="atom-nucleus__neutron" />
          <circle cx="69" cy="82" r="10" className="atom-nucleus__neutron" />
          <circle cx="90" cy="85" r="10" className="atom-nucleus__neutron" />
          <circle cx="78" cy="78" r="10" className="atom-nucleus__neutron" />
        </g>
      </svg>
    </div>
  );
}
