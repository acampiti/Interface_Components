import { useEffect, useRef } from "react";
import { ShowcasePage, ShowcaseGroup } from "../ShowcasePage";
import { DOMTable, type DOMColumnDef, useDOMTableRef } from "@/components/trade/DOMTable";

// ── Test data: simulated DOM (Depth of Market) ──────────

const DOM_COLUMNS: DOMColumnDef[] = [
  { key: "bid_vol",  label: "Bid Vol",  width: 90,  align: "right", fontColor: "#22994d", fontSize: 13 },
  { key: "bid",      label: "Bid",      width: 90,  align: "right", fontColor: "#22994d", fontSize: 14 },
  { key: "price",    label: "Price",    width: 100, align: "center", fontSize: 14 },
  { key: "ask",      label: "Ask",      width: 90,  align: "left",  fontColor: "#b3263a", fontSize: 14 },
  { key: "ask_vol",  label: "Ask Vol",  width: 90,  align: "left",  fontColor: "#b3263a", fontSize: 13 },
  { key: "delta",    label: "Delta",    width: 80,  align: "right", fontSize: 12 },
  { key: "volume",   label: "Volume",   width: 80,  align: "right", fontSize: 12 },
];

function generateDOMData(levels: number, midPrice: number) {
  const rows: Record<string, string | number>[] = [];
  for (let i = 0; i < levels; i++) {
    const price = midPrice + (Math.floor(levels / 2) - i) * 0.25;
    const isBid = price < midPrice;
    const isAsk = price > midPrice;
    const isMid = price === midPrice;
    const bidVol = isBid || isMid ? Math.floor(Math.random() * 500) + 10 : "";
    const bid = isBid || isMid ? price.toFixed(2) : "";
    const ask = isAsk || isMid ? price.toFixed(2) : "";
    const askVol = isAsk || isMid ? Math.floor(Math.random() * 500) + 10 : "";
    const delta = Math.floor(Math.random() * 200) - 100;
    const volume = Math.floor(Math.random() * 2000) + 50;
    rows.push({
      bid_vol: bidVol,
      bid,
      price: price.toFixed(2),
      ask,
      ask_vol: askVol,
      delta,
      volume,
    });
  }
  return rows;
}

const DOM_DATA = generateDOMData(20, 5250.00);

// ── Order flow columns with colored backgrounds ─────────

const FLOW_COLUMNS: DOMColumnDef[] = [
  { key: "time",     label: "Time",      width: 100, align: "left",   fontSize: 12 },
  { key: "side",     label: "Side",      width: 70,  align: "center", fontSize: 13 },
  { key: "price",    label: "Price",     width: 90,  align: "right",  fontSize: 13 },
  { key: "size",     label: "Size",      width: 70,  align: "right",  fontSize: 13 },
  { key: "aggr",     label: "Aggressor", width: 90,  align: "center", fontSize: 12 },
  { key: "exchange", label: "Exchange",  width: 90,  align: "center", fontSize: 11 },
];

const FLOW_DATA: Record<string, string | number>[] = [
  { time: "09:30:01.234", side: "BUY",  price: 5250.25, size: 12,  aggr: "Market", exchange: "CME" },
  { time: "09:30:01.456", side: "SELL", price: 5250.00, size: 8,   aggr: "Market", exchange: "CME" },
  { time: "09:30:02.012", side: "BUY",  price: 5250.25, size: 45,  aggr: "Market", exchange: "CME" },
  { time: "09:30:02.789", side: "SELL", price: 5249.75, size: 23,  aggr: "Limit",  exchange: "CME" },
  { time: "09:30:03.100", side: "BUY",  price: 5250.50, size: 67,  aggr: "Market", exchange: "CME" },
  { time: "09:30:03.345", side: "SELL", price: 5250.25, size: 15,  aggr: "Limit",  exchange: "CME" },
  { time: "09:30:04.567", side: "BUY",  price: 5250.50, size: 120, aggr: "Market", exchange: "CME" },
  { time: "09:30:04.890", side: "SELL", price: 5250.00, size: 34,  aggr: "Market", exchange: "CME" },
  { time: "09:30:05.123", side: "BUY",  price: 5250.75, size: 89,  aggr: "Market", exchange: "CME" },
  { time: "09:30:05.456", side: "SELL", price: 5250.50, size: 56,  aggr: "Limit",  exchange: "CME" },
];

// ── Live-updating demo ──────────────────────────────────

function LiveUpdateDemo() {
  const { cellRefs, updateCell, updateCellStyle, onCellRef } = useDOMTableRef();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const LIVE_COLUMNS: DOMColumnDef[] = [
    { key: "symbol",  label: "Symbol",  width: 90,  align: "left",   fontSize: 14 },
    { key: "last",    label: "Last",    width: 90,  align: "right",  fontSize: 14 },
    { key: "change",  label: "Change",  width: 80,  align: "right",  fontSize: 13 },
    { key: "pct",     label: "%",       width: 70,  align: "right",  fontSize: 13 },
    { key: "bid",     label: "Bid",     width: 90,  align: "right",  fontSize: 13 },
    { key: "ask",     label: "Ask",     width: 90,  align: "right",  fontSize: 13 },
    { key: "vol",     label: "Volume",  width: 100, align: "right",  fontSize: 12 },
  ];

  const symbols = ["ES", "NQ", "YM", "RTY", "CL", "GC", "ZB", "6E"];
  const basePrices = [5250, 18500, 39800, 2100, 62.50, 2350, 118.25, 1.0850];

  const LIVE_DATA = symbols.map((sym, i) => ({
    symbol: sym,
    last: basePrices[i].toFixed(2),
    change: "0.00",
    pct: "0.00%",
    bid: basePrices[i].toFixed(2),
    ask: (basePrices[i] + 0.25).toFixed(2),
    vol: String(Math.floor(Math.random() * 50000)),
  }));

  useEffect(() => {
    // Suppress unused warning — cellRefs is needed to keep the ref map alive
    void cellRefs;

    intervalRef.current = setInterval(() => {
      const row = Math.floor(Math.random() * symbols.length);
      const base = basePrices[row];
      const tick = (Math.random() - 0.48) * base * 0.001;
      const newPrice = base + tick;
      const change = tick;
      const pct = (tick / base) * 100;
      const isUp = change >= 0;

      updateCell(row, "last", newPrice.toFixed(2));
      updateCell(row, "change", (isUp ? "+" : "") + change.toFixed(2));
      updateCell(row, "pct", (isUp ? "+" : "") + pct.toFixed(2) + "%");
      updateCell(row, "bid", (newPrice - 0.25).toFixed(2));
      updateCell(row, "ask", newPrice.toFixed(2));
      updateCell(row, "vol", String(Math.floor(Math.random() * 100000)));

      const color = isUp ? "#22994d" : "#b3263a";
      updateCellStyle(row, "last", { color });
      updateCellStyle(row, "change", { color });
      updateCellStyle(row, "pct", { color });
    }, 150);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <DOMTable
      columns={LIVE_COLUMNS}
      data={LIVE_DATA}
      rowHeight={28}
      onCellRef={onCellRef}
      maxHeight={300}
    />
  );
}

// ── Page ─────────────────────────────────────────────────

export function TradeAppPage() {
  return (
    <ShowcasePage
      title="Trade App Elements"
      description="High-performance components for real-time trading interfaces. DOMTable supports imperative cell updates bypassing React reconciliation for maximum speed."
    >
      <ShowcaseGroup
        title="Live Market Data (Imperative Updates)"
        description="Prices update ~7x/sec via direct DOM manipulation — no React re-renders. Drag column edges to resize."
        componentName="DOMTable + useDOMTableRef"
      >
        <LiveUpdateDemo />
      </ShowcaseGroup>

      <ShowcaseGroup
        title="Depth of Market (DOM)"
        description="20-level price ladder with bid/ask volumes, delta, and cumulative volume. Resizable columns and rows."
        componentName="DOMTable"
      >
        <DOMTable
          columns={DOM_COLUMNS}
          data={DOM_DATA}
          rowHeight={26}
          maxHeight={400}
        />
      </ShowcaseGroup>

      <ShowcaseGroup
        title="Time & Sales / Order Flow"
        description="Trade-by-trade feed with side, aggressor type, and exchange."
        componentName="DOMTable"
      >
        <DOMTable
          columns={FLOW_COLUMNS}
          data={FLOW_DATA}
          rowHeight={24}
          gridColor="#1a1a3a"
        />
      </ShowcaseGroup>
    </ShowcasePage>
  );
}
