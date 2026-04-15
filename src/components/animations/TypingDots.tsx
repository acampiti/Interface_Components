import './TypingDots.css';

export function TypingDots() {
  return (
    <div className="typing-dots">
      <div className="typing-dots__dot" style={{ animationDelay: '0s' }} />
      <div className="typing-dots__dot" style={{ animationDelay: '0.15s' }} />
      <div className="typing-dots__dot" style={{ animationDelay: '0.3s' }} />
    </div>
  );
}
