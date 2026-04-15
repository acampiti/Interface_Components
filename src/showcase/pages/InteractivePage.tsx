import { useState } from "react";
import { ShowcasePage, ShowcaseGroup } from "../ShowcasePage";
import { ActionLinks } from "@/components/interactive/ActionLinks";
import { InfoTooltip } from "@/components/interactive/InfoTooltip";
import { ScrollableCheckboxList } from "@/components/interactive/ScrollableCheckboxList";
import { TreeList, type TreeNode } from "@/components/interactive/TreeList";
import { ContextMenu } from "@/components/interactive/ContextMenu";
import { CHECKBOX_ITEMS } from "@/data/testData";

const NETWORK_TREE: TreeNode[] = [
  {
    id: "networks",
    label: "Networks",
    selectable: false,
    children: [
      {
        id: "lan",
        label: "Default (LAN)",
        children: [
          { id: "lan-vlan1", label: "VLAN 1 — Management" },
          { id: "lan-vlan10", label: "VLAN 10 — IoT Devices" },
          { id: "lan-vlan20", label: "VLAN 20 — Guest Network" },
          { id: "lan-vlan30", label: "VLAN 30 — Cameras" },
        ],
      },
      {
        id: "wan",
        label: "WAN",
        children: [
          { id: "wan-cox", label: "Cox Communications" },
          { id: "wan-starlink", label: "Starlink Backup" },
        ],
      },
      { id: "vpn", label: "VPN — WireGuard" },
    ],
  },
  {
    id: "devices",
    label: "Devices",
    selectable: false,
    children: [
      {
        id: "switches",
        label: "Switches",
        children: [
          { id: "sw-pro24", label: "USW Pro 24 PoE" },
          { id: "sw-flex", label: "USW Flex Mini" },
          { id: "sw-lite8", label: "USW Lite 8 PoE" },
          { id: "sw-ent24", label: "USW Enterprise 24" },
        ],
      },
      {
        id: "aps",
        label: "Access Points",
        children: [
          { id: "ap-u6pro", label: "UAP U6 Pro" },
          { id: "ap-u6ent", label: "UAP U6 Enterprise" },
          { id: "ap-aclite", label: "UAP AC Lite" },
          { id: "ap-u7pro", label: "UAP U7 Pro" },
        ],
      },
      {
        id: "gateways",
        label: "Gateways",
        children: [
          { id: "gw-udm", label: "UDM Pro Max" },
          { id: "gw-ucg", label: "UCG Ultra" },
        ],
      },
    ],
  },
  {
    id: "services",
    label: "Services",
    selectable: false,
    children: [
      { id: "svc-mdns", label: "mDNS Reflector" },
      { id: "svc-dhcp", label: "DHCP Server" },
      { id: "svc-dns", label: "DNS Filtering" },
      { id: "svc-ids", label: "Intrusion Detection" },
      { id: "svc-dpi", label: "Deep Packet Inspection" },
    ],
  },
];

export function InteractivePage() {
  const [treeSelected, setTreeSelected] = useState<Set<string>>(
    new Set(["lan-vlan1", "svc-mdns", "svc-dhcp", "sw-pro24", "gw-udm"]),
  );
  const [contextOpen, setContextOpen] = useState(true);

  return (
    <ShowcasePage
      title="Interactive"
      description="Tree lists, scrollable checkbox lists, action links, and info tooltips."
    >
      <ShowcaseGroup
        title="Tree List"
        componentName="TreeList"
        description="Expandable groups with nested items and optional checkboxes. Click arrows or group labels to expand/collapse."
      >
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
          <TreeList
            nodes={NETWORK_TREE}
            selected={treeSelected}
            onSelectionChange={setTreeSelected}
            defaultExpanded={new Set(["networks", "devices"])}
          />
          <div style={{ fontSize: 12, color: "var(--color-text-secondary)", maxWidth: 200 }}>
            <strong style={{ color: "var(--color-text-primary)" }}>Selected ({treeSelected.size}):</strong>
            <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 2 }}>
              {[...treeSelected].map((id) => (
                <span key={id} style={{ color: "var(--color-accent-text)" }}>{id}</span>
              ))}
            </div>
          </div>
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="Action Links" componentName="ActionLinks" description="Styled text buttons for inline actions.">
        <ActionLinks
          links={[
            { label: "View Details", onClick: () => alert("View Details clicked") },
            { label: "Edit Settings", onClick: () => alert("Edit Settings clicked") },
            { label: "Download Config", onClick: () => alert("Download clicked") },
            { label: "Restart Device", onClick: () => alert("Restart clicked") },
          ]}
        />
      </ShowcaseGroup>

      <ShowcaseGroup title="Info Tooltip" componentName="InfoTooltip" description="Click-to-reveal informational tooltips.">
        <div style={{ display: "flex", gap: 24, alignItems: "center", paddingTop: 32 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
            VLAN ID <InfoTooltip text="Virtual LAN identifier (1–4094). Used to segment network traffic." />
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
            mDNS <InfoTooltip text="Multicast DNS enables zero-conf device discovery on local networks." />
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
            PoE Budget <InfoTooltip text="Maximum power (watts) available for Power over Ethernet devices." />
          </span>
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="Scrollable Checkbox List" componentName="ScrollableCheckboxList" description="Search-filterable scrollable list with select all / clear.">
        <ScrollableCheckboxList items={CHECKBOX_ITEMS} initialSelected={["mDNS", "HTTP", "HTTPS"]} />
      </ShowcaseGroup>

      <ShowcaseGroup title="Context Menu" componentName="ContextMenu" description="Right-click style popup menu with icons, shortcuts, and dividers.">
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
          <ContextMenu
            open={contextOpen}
            onClose={() => setContextOpen(false)}
            items={[
              { label: "Copy", icon: "📋", shortcut: "Ctrl+C", onClick: () => {} },
              { label: "Paste", icon: "📄", shortcut: "Ctrl+V", onClick: () => {} },
              { label: "Delete", icon: "🗑", shortcut: "Del", onClick: () => {} },
              { divider: true, label: "" },
              { label: "Select All", shortcut: "Ctrl+A", onClick: () => {} },
              { divider: true, label: "" },
              { label: "Properties", icon: "⚙", onClick: () => {} },
              { label: "Disabled Action", disabled: true, onClick: () => {} },
            ]}
          />
          <button
            onClick={() => setContextOpen(!contextOpen)}
            style={{
              padding: "6px 16px",
              fontSize: 12,
              background: "var(--color-bg-tertiary)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              color: "var(--color-text-primary)",
              cursor: "pointer",
            }}
          >
            {contextOpen ? "Hide" : "Show"} Menu
          </button>
        </div>
      </ShowcaseGroup>
    </ShowcasePage>
  );
}
