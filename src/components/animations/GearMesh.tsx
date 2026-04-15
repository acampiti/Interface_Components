import './GearMesh.css';

/* 8-tooth gear path: alternating inner/outer radius polygon */
function gearPath(cx: number, cy: number, outerR: number, innerR: number, teeth: number): string {
  const points: string[] = [];
  const total = teeth * 2;
  for (let i = 0; i < total; i++) {
    const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
  }
  return `M${points.join('L')}Z`;
}

const GEAR1_PATH = gearPath(25, 25, 25, 18, 8);
const GEAR2_PATH = gearPath(19, 19, 19, 13, 6);

export function GearMesh() {
  return (
    <div className="gear-mesh">
      <svg
        className="gear-mesh__gear gear-mesh__gear--1"
        width="50"
        height="50"
        viewBox="0 0 50 50"
      >
        <path
          d={GEAR1_PATH}
          fill="none"
          stroke="var(--color-accent-text)"
          strokeWidth="2"
        />
        <circle cx="25" cy="25" r="3" fill="var(--color-accent)" />
      </svg>
      <svg
        className="gear-mesh__gear gear-mesh__gear--2"
        width="38"
        height="38"
        viewBox="0 0 38 38"
      >
        <path
          d={GEAR2_PATH}
          fill="none"
          stroke="var(--color-accent-text)"
          strokeWidth="2"
        />
        <circle cx="19" cy="19" r="3" fill="var(--color-accent)" />
      </svg>
    </div>
  );
}
