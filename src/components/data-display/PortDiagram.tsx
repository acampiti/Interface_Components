import type { PortData } from "@/data/testData";
import "./PortDiagram.css";

interface PortDiagramProps {
  ports: PortData[];
}

const STATUS_COLORS: Record<PortData["status"], string> = {
  gbe: "var(--color-positive)",
  "2.5gbe": "var(--color-text-muted)",
  "10gbe": "var(--color-info)",
  disconnected: "transparent",
  sfp: "var(--color-warning)",
};

const STATUS_LABELS: Record<PortData["status"], string> = {
  gbe: "GbE",
  "2.5gbe": "2.5 GbE",
  "10gbe": "10 GbE",
  disconnected: "Disconnected",
  sfp: "SFP+",
};

export function PortDiagram({ ports }: PortDiagramProps) {
  const half = Math.ceil(ports.length / 2);
  const topRow = ports.slice(0, half);
  const bottomRow = ports.slice(half);

  return (
    <div className="port-diagram">
      <div className="port-diagram-grid">
        {topRow.map((p) => (
          <PortCell key={p.port} port={p} />
        ))}
      </div>
      <div className="port-diagram-grid">
        {bottomRow.map((p) => (
          <PortCell key={p.port} port={p} />
        ))}
      </div>
    </div>
  );
}

function PortCell({ port }: { port: PortData }) {
  const isDisconnected = port.status === "disconnected";

  return (
    <div className="port-cell">
      <div
        className={`port-square${isDisconnected ? " disconnected" : ""}`}
        style={
          isDisconnected
            ? undefined
            : { backgroundColor: STATUS_COLORS[port.status] }
        }
      >
        {port.poe && <span className="port-poe">&#9889;</span>}
      </div>
      <span className="port-label">{port.name}</span>

      <div className="port-tooltip">
        <div className="port-tooltip-row">
          <span className="port-tooltip-label">Port:</span>
          <span>{port.name}</span>
        </div>
        <div className="port-tooltip-row">
          <span className="port-tooltip-label">Status:</span>
          <span>{STATUS_LABELS[port.status]}</span>
        </div>
        {port.connected && port.device && (
          <div className="port-tooltip-row">
            <span className="port-tooltip-label">Device:</span>
            <span>{port.device}</span>
          </div>
        )}
        <div className="port-tooltip-row">
          <span className="port-tooltip-label">PoE:</span>
          <span>{port.poe ? "Yes" : "No"}</span>
        </div>
      </div>
    </div>
  );
}
