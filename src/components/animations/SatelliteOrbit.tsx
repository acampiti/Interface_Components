import './SatelliteOrbit.css';

const STARS = [
  { cx: 12,  cy: 18,  r: 0.8 },
  { cx: 34,  cy: 8,   r: 1.0 },
  { cx: 58,  cy: 22,  r: 0.7 },
  { cx: 80,  cy: 6,   r: 0.9 },
  { cx: 102, cy: 15,  r: 0.6 },
  { cx: 125, cy: 9,   r: 1.1 },
  { cx: 148, cy: 20,  r: 0.7 },
  { cx: 167, cy: 12,  r: 0.9 },
  { cx: 6,   cy: 55,  r: 0.8 },
  { cx: 22,  cy: 72,  r: 1.0 },
  { cx: 9,   cy: 130, r: 0.7 },
  { cx: 18,  cy: 155, r: 0.9 },
  { cx: 30,  cy: 168, r: 0.6 },
  { cx: 55,  cy: 172, r: 1.0 },
  { cx: 75,  cy: 165, r: 0.8 },
  { cx: 100, cy: 175, r: 0.7 },
  { cx: 125, cy: 170, r: 1.1 },
  { cx: 150, cy: 162, r: 0.9 },
  { cx: 170, cy: 155, r: 0.7 },
  { cx: 174, cy: 55,  r: 0.8 },
  { cx: 169, cy: 80,  r: 1.0 },
  { cx: 176, cy: 110, r: 0.6 },
  { cx: 162, cy: 135, r: 0.9 },
  { cx: 42,  cy: 40,  r: 0.7 },
  { cx: 138, cy: 38,  r: 0.8 },
  { cx: 45,  cy: 142, r: 0.9 },
  { cx: 135, cy: 145, r: 0.7 },
];

export function SatelliteOrbit() {
  return (
    <div className="satellite-orbit" aria-label="Satellite orbiting Earth">
      {/* Background SVG: stars + orbit ring */}
      <svg
        className="satellite-orbit__bg"
        viewBox="0 0 180 180"
        xmlns="http://www.w3.org/2000/svg"
      >
        {STARS.map((s, i) => (
          <circle
            key={i}
            className={`satellite-orbit__star satellite-orbit__star--${(i % 3) + 1}`}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
          />
        ))}

        {/* Orbit ellipse — tilted perspective via rx/ry ratio */}
        <ellipse
          className="satellite-orbit__ring"
          cx="90"
          cy="90"
          rx="68"
          ry="26"
        />
      </svg>

      {/* Earth */}
      <div className="satellite-orbit__earth-wrap">
        <div className="satellite-orbit__earth" />
        {/* Atmosphere glow ring */}
        <div className="satellite-orbit__atmosphere" />
      </div>

      {/*
        Satellite orbit uses a zero-size pivot div at the center.
        The pivot rotates; the satellite arm is a translateX offset.
        A second keyframe step fades/dims the satellite when it is
        "behind" the Earth (back half of rotation: 180 → 360 deg).
      */}
      <div className="satellite-orbit__pivot">
        <div className="satellite-orbit__arm">
          {/* Satellite body + solar panels */}
          <div className="satellite-orbit__satellite">
            <div className="satellite-orbit__panel satellite-orbit__panel--left" />
            <div className="satellite-orbit__body" />
            <div className="satellite-orbit__panel satellite-orbit__panel--right" />
          </div>
        </div>
      </div>
    </div>
  );
}
