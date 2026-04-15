import './DNAHelix.css';

export function DNAHelix() {
  return (
    <div className="dna-helix">
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          className="dna-helix__column"
          style={{ animationDelay: `${i * 0.2}s` } as React.CSSProperties}
        >
          <div
            className="dna-helix__dot dna-helix__dot--a"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
          <div
            className="dna-helix__dot dna-helix__dot--b"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        </div>
      ))}
    </div>
  );
}
