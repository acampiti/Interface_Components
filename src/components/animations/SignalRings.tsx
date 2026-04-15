import './SignalRings.css';

export function SignalRings() {
  return (
    <div className="signal-rings">
      <div className="signal-rings__ring signal-rings__ring--0" />
      <div className="signal-rings__ring signal-rings__ring--1" />
      <div className="signal-rings__ring signal-rings__ring--2" />
      <div className="signal-rings__dot" />
    </div>
  );
}
