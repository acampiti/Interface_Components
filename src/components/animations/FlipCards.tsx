import './FlipCards.css';

export function FlipCards() {
  return (
    <div className="flip-cards">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className="flip-cards__card"
          style={{ animationDelay: `${i * 0.25}s` }}
        >
          <div className="flip-cards__face flip-cards__face--front" />
          <div className="flip-cards__face flip-cards__face--back" />
        </div>
      ))}
    </div>
  );
}
