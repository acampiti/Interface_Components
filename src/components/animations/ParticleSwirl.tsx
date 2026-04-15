import './ParticleSwirl.css';

const DOTS = Array.from({ length: 8 }, (_, i) => i);

export function ParticleSwirl() {
  return (
    <div className="particle-swirl">
      {DOTS.map((i) => (
        <div
          key={i}
          className={`particle-swirl__orbit particle-swirl__orbit--${i}`}
        >
          <div
            className={`particle-swirl__dot particle-swirl__dot--${i}`}
          />
        </div>
      ))}
    </div>
  );
}
