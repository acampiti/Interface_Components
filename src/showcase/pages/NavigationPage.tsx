import { useState } from "react";
import { ShowcasePage, ShowcaseGroup } from "../ShowcasePage";
import { ViewToggle } from "@/components/navigation/ViewToggle";
import { TextIconSidebar } from "@/components/navigation/TextIconSidebar";
import { IconOnlySidebar } from "@/components/navigation/IconOnlySidebar";
import { TabBarSegment } from "@/components/navigation/TabBarSegment";
import { CollapsibleSection } from "@/components/navigation/CollapsibleSection";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { Pagination } from "@/components/navigation/Pagination";
import { SIDEBAR_ITEMS } from "@/data/testData";

const TAB_SEGMENTS = [
  { label: "Devices", value: "devices" },
  { label: "Clients", value: "clients" },
  { label: "Statistics", value: "statistics" },
  { label: "Settings", value: "settings" },
];

export function NavigationPage() {
  const [sidebarActiveId, setSidebarActiveId] = useState("overview");
  const [iconActiveId, setIconActiveId] = useState("overview");
  const [tabValue, setTabValue] = useState("devices");
  const [currentPage, setCurrentPage] = useState(3);

  return (
    <ShowcasePage
      title="Navigation"
      description="Sidebars, tab bars, collapsible sections, and view toggles."
    >
      <ShowcaseGroup title="View Toggle" componentName="ViewToggle" description="Grid/List view mode switcher.">
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <ViewToggle initialView="grid" />
          <span style={{ color: "var(--color-text-muted)", fontSize: 12 }}>Switch between grid and list views</span>
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="Text+Icon Sidebar" componentName="TextIconSidebar" description="Tree navigation with icons and active state.">
        <TextIconSidebar
          items={SIDEBAR_ITEMS}
          activeId={sidebarActiveId}
          onSelect={setSidebarActiveId}
        />
      </ShowcaseGroup>

      <ShowcaseGroup title="Icon-Only Sidebar" componentName="IconOnlySidebar" description="Compact icon navigation with tooltips.">
        <IconOnlySidebar
          items={SIDEBAR_ITEMS}
          activeId={iconActiveId}
          onSelect={setIconActiveId}
        />
      </ShowcaseGroup>

      <ShowcaseGroup title="Tab Bar / Segment" componentName="TabBarSegment" description="Inline segmented control for sub-page navigation.">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <TabBarSegment segments={TAB_SEGMENTS} value={tabValue} onChange={setTabValue} />
          <span style={{ color: "var(--color-text-muted)", fontSize: 12 }}>
            Selected: <strong style={{ color: "var(--color-text-primary)" }}>{tabValue}</strong>
          </span>
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="Collapsible Section" componentName="CollapsibleSection" description="Expandable sections with chevron toggle.">
        <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 400 }}>
          <CollapsibleSection title="Network Settings" defaultOpen>
            <p style={{ margin: 0 }}>VLAN configuration, DHCP settings, and DNS overrides live here.</p>
          </CollapsibleSection>
          <CollapsibleSection title="Advanced Options">
            <p style={{ margin: 0 }}>STP, IGMP snooping, jumbo frames, and other advanced network settings.</p>
          </CollapsibleSection>
          <CollapsibleSection title="Security Policies">
            <p style={{ margin: 0 }}>Firewall rules, threat management, and intrusion detection settings.</p>
          </CollapsibleSection>
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="Breadcrumb" componentName="Breadcrumb" description="Path navigation trail showing current location in hierarchy.">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Breadcrumb items={[
            { label: "Home", onClick: () => {} },
            { label: "Networks", onClick: () => {} },
            { label: "Default (LAN)", onClick: () => {} },
            { label: "VLAN 10 — IoT Devices" },
          ]} />
          <Breadcrumb items={[
            { label: "Sites", onClick: () => {} },
            { label: "Anthony - UDM Pro Max" },
          ]} />
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="Pagination" componentName="Pagination" description="Page navigation with smart ellipsis for large page counts.">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Pagination currentPage={currentPage} totalPages={12} onPageChange={setCurrentPage} />
          <span style={{ color: "var(--color-text-muted)", fontSize: 12 }}>
            Page <strong style={{ color: "var(--color-text-primary)" }}>{currentPage}</strong> of 12
          </span>
        </div>
      </ShowcaseGroup>
    </ShowcasePage>
  );
}
