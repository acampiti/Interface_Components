import './StackingBlocks.css';

export function StackingBlocks() {
  const colors = ['accent', 'info', 'positive', 'warning', 'negative'] as const;

  return (
    <div className="stacking-blocks">
      {colors.map((color, i) => (
        <div
          key={i}
          className={`stacking-blocks__block stacking-blocks__block--${i}`}
          style={{
            backgroundColor: `var(--color-${color})`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
}
