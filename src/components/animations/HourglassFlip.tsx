import './HourglassFlip.css';

export function HourglassFlip() {
  return (
    <div className="hourglass-flip">
      <div className="hourglass-flip__body">
        <svg
          className="hourglass-flip__svg"
          width="40"
          height="60"
          viewBox="0 0 40 60"
        >
          {/* Hourglass outline: two triangles meeting at neck */}
          <path
            d="M4,4 L36,4 L22,28 L36,56 L4,56 L18,28 Z"
            fill="none"
            stroke="var(--color-accent-text)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Sand in top half — shrinks via clip animation */}
          <rect
            className="hourglass-flip__sand-top"
            x="4"
            y="4"
            width="32"
            height="24"
            fill="var(--color-warning)"
            clipPath="url(#topClip)"
          />
          {/* Sand in bottom half — grows via clip animation */}
          <rect
            className="hourglass-flip__sand-bottom"
            x="4"
            y="32"
            width="32"
            height="24"
            fill="var(--color-warning)"
            clipPath="url(#bottomClip)"
          />
          <defs>
            {/* Top triangle clip */}
            <clipPath id="topClip">
              <polygon points="6,6 34,6 21,27 19,27" />
            </clipPath>
            {/* Bottom triangle clip */}
            <clipPath id="bottomClip">
              <polygon points="19,33 21,33 36,54 4,54" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}
