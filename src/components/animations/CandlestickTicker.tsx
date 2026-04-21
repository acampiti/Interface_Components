import './CandlestickTicker.css';

export function CandlestickTicker() {
  // Each candle: [bullish?, bodyBottomPct, bodyHeightPct, wickTopPct, wickBottomPct]
  // Values are % of the chart height from the bottom baseline (0–100)
  const candles: Array<{
    bullish: boolean;
    bodyBottom: number;
    bodyHeight: number;
    wickTop: number;
    wickBottom: number;
  }> = [
    { bullish: true,  bodyBottom: 20, bodyHeight: 28, wickTop: 56, wickBottom: 14 },
    { bullish: false, bodyBottom: 36, bodyHeight: 22, wickTop: 66, wickBottom: 28 },
    { bullish: true,  bodyBottom: 30, bodyHeight: 32, wickTop: 70, wickBottom: 22 },
    { bullish: false, bodyBottom: 42, bodyHeight: 18, wickTop: 68, wickBottom: 34 },
    { bullish: true,  bodyBottom: 38, bodyHeight: 26, wickTop: 72, wickBottom: 30 },
    { bullish: true,  bodyBottom: 44, bodyHeight: 30, wickTop: 82, wickBottom: 36 },
    { bullish: false, bodyBottom: 54, bodyHeight: 20, wickTop: 80, wickBottom: 46 },
    { bullish: true,  bodyBottom: 50, bodyHeight: 34, wickTop: 90, wickBottom: 42 },
    { bullish: false, bodyBottom: 62, bodyHeight: 16, wickTop: 84, wickBottom: 54 },
  ];

  return (
    <div className="candlestick-ticker">
      {/* Background grid lines */}
      <div className="candlestick-ticker__grid">
        <div className="candlestick-ticker__grid-line candlestick-ticker__grid-line--1" />
        <div className="candlestick-ticker__grid-line candlestick-ticker__grid-line--2" />
        <div className="candlestick-ticker__grid-line candlestick-ticker__grid-line--3" />
        <div className="candlestick-ticker__grid-line candlestick-ticker__grid-line--4" />
      </div>

      {/* Price line — tracks last candle's close level */}
      <div className="candlestick-ticker__price-line" />

      {/* Candles */}
      <div className="candlestick-ticker__candles">
        {candles.map((c, i) => (
          <div
            key={i}
            className={`candlestick-ticker__candle candlestick-ticker__candle--${i}`}
            style={{ '--candle-delay': `${i * 0.28}s` } as React.CSSProperties}
          >
            {/* Full wick column — top wick above body, bottom wick below */}
            <div
              className="candlestick-ticker__wick"
              style={{
                '--wick-bottom': `${c.wickBottom}%`,
                '--wick-height': `${c.wickTop - c.wickBottom}%`,
              } as React.CSSProperties}
            />
            {/* Candle body */}
            <div
              className={`candlestick-ticker__body candlestick-ticker__body--${c.bullish ? 'bull' : 'bear'}`}
              style={{
                '--body-bottom': `${c.bodyBottom}%`,
                '--body-height': `${c.bodyHeight}%`,
              } as React.CSSProperties}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
