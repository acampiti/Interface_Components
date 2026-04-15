import './OrbitDots.css';

export function OrbitDots() {
  return (
    <div className="orbit-dots">
      <div className="orbit-dots__track orbit-dots__track--1">
        <div className="orbit-dots__dot orbit-dots__dot--1" />
      </div>
      <div className="orbit-dots__track orbit-dots__track--2">
        <div className="orbit-dots__dot orbit-dots__dot--2" />
      </div>
      <div className="orbit-dots__track orbit-dots__track--3">
        <div className="orbit-dots__dot orbit-dots__dot--3" />
      </div>
    </div>
  );
}
