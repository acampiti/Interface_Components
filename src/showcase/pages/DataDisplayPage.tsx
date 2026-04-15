import { ShowcasePage, ShowcaseGroup } from "../ShowcasePage";
import { StatusDot } from "@/components/data-display/StatusDots";
import { MetricBadge } from "@/components/data-display/MetricBadge";
import { ColorLegend } from "@/components/data-display/ColorLegend";
import { DragHandle } from "@/components/data-display/DragHandle";
import { DataTable, type Column } from "@/components/data-display/DataTable";
import { PortDiagram } from "@/components/data-display/PortDiagram";
import { Avatar } from "@/components/data-display/Avatar";
import { Timeline } from "@/components/data-display/Timeline";
import { KbdShortcut } from "@/components/data-display/KbdShortcut";
import { TABLE_DATA, PORT_DATA, PORT_LEGEND, type TableRow } from "@/data/testData";

const TABLE_COLUMNS: Column<TableRow>[] = [
  { key: "name", label: "Name", width: "180px" },
  { key: "ipAddress", label: "IP Address", width: "140px" },
  { key: "macAddress", label: "MAC Address", width: "170px" },
  {
    key: "status",
    label: "Status",
    width: "100px",
    render: (row) => <StatusDot status={row.status} label />,
  },
  {
    key: "speed",
    label: "Speed",
    width: "100px",
    render: (row) => <MetricBadge value={row.speed} variant={row.speedVariant} />,
  },
  { key: "uptime", label: "Uptime", width: "100px" },
  { key: "type", label: "Type", width: "90px" },
];

export function DataDisplayPage() {
  return (
    <ShowcasePage
      title="Data Display"
      description="Tables, port diagrams, status indicators, and data visualization components."
    >
      <ShowcaseGroup title="Status Dots" componentName="StatusDot" description="Colored indicators for online/offline/pending states.">
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <StatusDot status="online" label />
          <StatusDot status="offline" label />
          <StatusDot status="pending" label />
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="Metric Badges" componentName="MetricBadge" description="Colored inline text badges for speed, status, and other values.">
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <MetricBadge value="10 GbE" variant="blue" />
          <MetricBadge value="2.5 GbE" variant="green" />
          <MetricBadge value="GbE" variant="default" />
          <MetricBadge value="Critical" variant="red" />
          <MetricBadge value="Warning" variant="orange" />
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="Color Legend" componentName="ColorLegend" description="Row of colored squares with labels.">
        <ColorLegend items={PORT_LEGEND} />
      </ShowcaseGroup>

      <ShowcaseGroup title="Drag Handle" componentName="DragHandle" description="Draggable grip indicator for reorderable items.">
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <DragHandle />
          <span style={{ color: "var(--color-text-secondary)", fontSize: 13 }}>Drag to reorder</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: 12,
          }}
        >
          {["Item Alpha", "Item Beta", "Item Gamma"].map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 12px",
                backgroundColor: "var(--color-bg-secondary)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--color-border)",
              }}
            >
              <DragHandle />
              <span style={{ fontSize: 13 }}>{item}</span>
            </div>
          ))}
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="Data Table" componentName="DataTable" description="Sortable table with custom cell renderers. Click column headers to sort.">
        <DataTable columns={TABLE_COLUMNS} data={TABLE_DATA} sortable />
      </ShowcaseGroup>

      <ShowcaseGroup title="Port Diagram" componentName="PortDiagram" description="CSS Grid port layout with color-coded status. Hover ports for details.">
        <PortDiagram ports={PORT_DATA} />
      </ShowcaseGroup>

      <ShowcaseGroup title="Avatar" componentName="Avatar" description="User avatar circles with initials fallback and optional status dot.">
        <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
          <Avatar name="Anthony C" size="lg" status="online" />
          <Avatar name="Jane Smith" size="md" status="away" />
          <Avatar name="Bob Lee" size="md" status="offline" />
          <Avatar name="Maria Garcia" size="sm" />
          <Avatar name="DevOps Bot" size="lg" />
          <Avatar name="Alex K" size="md" status="online" />
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="Timeline" componentName="Timeline" description="Vertical event list with colored dots and timestamp connectors.">
        <Timeline
          events={[
            { id: "1", title: "Firmware updated", description: "UDM Pro Max upgraded to v4.0.6", time: "2 min ago", variant: "success" },
            { id: "2", title: "Client connected", description: "iPhone 15 joined Default (LAN)", time: "8 min ago", variant: "info" },
            { id: "3", title: "High CPU warning", description: "USW Pro 24 PoE CPU at 92%", time: "23 min ago", variant: "warning" },
            { id: "4", title: "WAN failover triggered", description: "Primary WAN down, switched to Starlink", time: "1 hour ago", variant: "error" },
            { id: "5", title: "DPI database updated", description: "Deep Packet Inspection signatures refreshed", time: "3 hours ago", variant: "info" },
          ]}
        />
      </ShowcaseGroup>

      <ShowcaseGroup title="Keyboard Shortcuts" componentName="KbdShortcut" description="Styled keyboard shortcut key cap displays.">
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--color-text-secondary)" }}>
            Save: <KbdShortcut keys={["Ctrl", "S"]} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--color-text-secondary)" }}>
            Search: <KbdShortcut keys={["Ctrl", "Shift", "P"]} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--color-text-secondary)" }}>
            Undo: <KbdShortcut keys={["Ctrl", "Z"]} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--color-text-secondary)" }}>
            Fullscreen: <KbdShortcut keys={["F11"]} />
          </div>
        </div>
      </ShowcaseGroup>
    </ShowcasePage>
  );
}
