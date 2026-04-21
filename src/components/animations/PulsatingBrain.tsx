import './PulsatingBrain.css';

export function PulsatingBrain() {
  return (
    <div className="pulsating-brain">
      {/* Outer glow ring */}
      <div className="pulsating-brain__glow" />

      {/* Brain SVG */}
      <svg
        className="pulsating-brain__svg"
        viewBox="0 0 160 140"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* ── Left hemisphere ── */}
        <path
          className="pulsating-brain__hemisphere"
          d="
            M 80 20
            C 62 18, 44 22, 34 34
            C 22 48, 20 60, 24 72
            C 28 84, 32 90, 36 96
            C 40 102, 46 108, 54 112
            C 62 116, 72 116, 78 114
            L 78 26
            Z
          "
        />
        {/* Left sulci (squiggly folds) */}
        <path
          className="pulsating-brain__sulcus"
          d="M 42 50 Q 38 56, 44 62 Q 50 68, 44 74"
        />
        <path
          className="pulsating-brain__sulcus"
          d="M 54 38 Q 48 46, 56 52 Q 62 56, 56 64"
        />
        <path
          className="pulsating-brain__sulcus"
          d="M 36 80 Q 44 76, 48 82 Q 52 90, 44 94"
        />

        {/* ── Right hemisphere ── */}
        <path
          className="pulsating-brain__hemisphere"
          d="
            M 80 20
            C 98 18, 116 22, 126 34
            C 138 48, 140 60, 136 72
            C 132 84, 128 90, 124 96
            C 120 102, 114 108, 106 112
            C 98 116, 88 116, 82 114
            L 82 26
            Z
          "
        />
        {/* Right sulci */}
        <path
          className="pulsating-brain__sulcus"
          d="M 118 50 Q 122 56, 116 62 Q 110 68, 116 74"
        />
        <path
          className="pulsating-brain__sulcus"
          d="M 106 38 Q 112 46, 104 52 Q 98 56, 104 64"
        />
        <path
          className="pulsating-brain__sulcus"
          d="M 124 80 Q 116 76, 112 82 Q 108 90, 116 94"
        />

        {/* ── Centre divide (corpus callosum line) ── */}
        <line
          className="pulsating-brain__divide"
          x1="80" y1="22"
          x2="80" y2="114"
        />

        {/* ── Neural spark travel paths (invisible guides, sparks follow them) ── */}
        {/* These <animateMotion> sparks are pure SVG+CSS; no JS */}

        {/* Spark 1 — left lobe loop */}
        <circle className="pulsating-brain__spark pulsating-brain__spark--1" r="3">
          <animateMotion
            dur="3.2s"
            repeatCount="indefinite"
            begin="0s"
            path="M 50 48 Q 34 62, 40 78 Q 46 94, 60 104 Q 70 110, 76 108"
          />
        </circle>

        {/* Spark 2 — right lobe loop */}
        <circle className="pulsating-brain__spark pulsating-brain__spark--2" r="3">
          <animateMotion
            dur="2.8s"
            repeatCount="indefinite"
            begin="0.6s"
            path="M 110 48 Q 126 62, 120 78 Q 114 94, 100 104 Q 90 110, 84 108"
          />
        </circle>

        {/* Spark 3 — top arc left→right */}
        <circle className="pulsating-brain__spark pulsating-brain__spark--3" r="2.5">
          <animateMotion
            dur="2.4s"
            repeatCount="indefinite"
            begin="1.0s"
            path="M 44 40 Q 60 28, 80 26 Q 100 28, 116 40"
          />
        </circle>

        {/* Spark 4 — bottom arc right→left */}
        <circle className="pulsating-brain__spark pulsating-brain__spark--4" r="2.5">
          <animateMotion
            dur="2.6s"
            repeatCount="indefinite"
            begin="1.6s"
            path="M 116 90 Q 100 108, 80 112 Q 60 108, 44 90"
          />
        </circle>

        {/* Spark 5 — left inner loop */}
        <circle className="pulsating-brain__spark pulsating-brain__spark--5" r="2">
          <animateMotion
            dur="3.6s"
            repeatCount="indefinite"
            begin="0.3s"
            path="M 56 56 Q 42 68, 50 84 Q 58 96, 68 100"
          />
        </circle>

        {/* Spark 6 — right inner loop */}
        <circle className="pulsating-brain__spark pulsating-brain__spark--6" r="2">
          <animateMotion
            dur="3.0s"
            repeatCount="indefinite"
            begin="1.3s"
            path="M 104 56 Q 118 68, 110 84 Q 102 96, 92 100"
          />
        </circle>
      </svg>
    </div>
  );
}
