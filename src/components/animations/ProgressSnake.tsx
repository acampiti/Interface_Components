import './ProgressSnake.css';

export function ProgressSnake() {
  return (
    <div className="progress-snake">
      <svg
        className="progress-snake__svg"
        viewBox="0 0 120 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          className="progress-snake__track"
          x="2"
          y="2"
          width="116"
          height="56"
          rx="8"
          ry="8"
        />
        <rect
          className="progress-snake__segment"
          x="2"
          y="2"
          width="116"
          height="56"
          rx="8"
          ry="8"
        />
      </svg>
    </div>
  );
}
