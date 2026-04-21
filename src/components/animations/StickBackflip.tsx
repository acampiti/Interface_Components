import './StickBackflip.css';

export function StickBackflip() {
  return (
    <div className="sbf">
      {/* Ground */}
      <div className="sbf-ground" />
      <div className="sbf-shadow" />

      {/* Whole figure: vertical jump arc */}
      <div className="sbf-jump">
        {/* Body pivot: rotates for the backflip */}
        <div className="sbf-body">

          {/* Torso line */}
          <div className="sbf-torso" />

          {/* Head at top of torso */}
          <div className="sbf-head" />

          {/* Left arm: shoulder → upper → elbow → forearm */}
          <div className="sbf-shoulder sbf-shoulder--l">
            <div className="sbf-upper-arm sbf-upper-arm--l">
              <div className="sbf-forearm sbf-forearm--l" />
            </div>
          </div>

          {/* Right arm */}
          <div className="sbf-shoulder sbf-shoulder--r">
            <div className="sbf-upper-arm sbf-upper-arm--r">
              <div className="sbf-forearm sbf-forearm--r" />
            </div>
          </div>

          {/* Left leg: hip → thigh → knee → shin */}
          <div className="sbf-hip sbf-hip--l">
            <div className="sbf-thigh sbf-thigh--l">
              <div className="sbf-shin sbf-shin--l" />
            </div>
          </div>

          {/* Right leg */}
          <div className="sbf-hip sbf-hip--r">
            <div className="sbf-thigh sbf-thigh--r">
              <div className="sbf-shin sbf-shin--r" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
