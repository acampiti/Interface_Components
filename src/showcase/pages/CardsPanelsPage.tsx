import { ShowcasePage, ShowcaseGroup } from "../ShowcasePage";
import { InfoBanner } from "@/components/cards-panels/InfoBanner";
import { DeviceIconBadge } from "@/components/cards-panels/DeviceIconBadge";
import { PanelWithTitle } from "@/components/cards-panels/PanelWithTitle";
import { SiteCard } from "@/components/cards-panels/SiteCard";
import { CreateCard } from "@/components/cards-panels/CreateCard";
import { SITE_CARDS } from "@/data/testData";

export function CardsPanelsPage() {
  return (
    <ShowcasePage
      title="Cards & Panels"
      description="Site cards, info banners, panels, and device badges."
    >
      <ShowcaseGroup title="Info Banner" componentName="InfoBanner" description="Contextual banners for info, warnings, and errors.">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <InfoBanner message="mDNS is enabled. Devices will be automatically discovered on this network." variant="info" />
          <InfoBanner message="Firmware update available for 3 devices." variant="warning" />
          <InfoBanner message="Gateway connection lost. Check WAN cable." variant="error" />
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="Device Icon Badge" componentName="DeviceIconBadge" description="Circular icon containers with status rings.">
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <DeviceIconBadge icon="⬡" label="UDM Pro Max" status="online" />
          <DeviceIconBadge icon="◈" label="USW Pro 24" status="online" />
          <DeviceIconBadge icon="◉" label="UAP U6 Pro" status="online" />
          <DeviceIconBadge icon="⬡" label="Cloud Gateway" status="offline" />
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="Panel with Title" componentName="PanelWithTitle" description="Dark bordered panel with header and content area.">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <PanelWithTitle
            title="System Information"
            actions={<span style={{ fontSize: 12, color: "var(--color-accent-text)", cursor: "pointer" }}>Refresh</span>}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 13 }}>
              <span style={{ color: "var(--color-text-muted)" }}>Model</span>
              <span>UDM Pro Max</span>
              <span style={{ color: "var(--color-text-muted)" }}>Firmware</span>
              <span>4.0.6</span>
              <span style={{ color: "var(--color-text-muted)" }}>Uptime</span>
              <span>99d 22h 13m</span>
            </div>
          </PanelWithTitle>

          <PanelWithTitle title="Empty Panel">
            <p style={{ color: "var(--color-text-muted)", fontSize: 13, margin: 0 }}>
              No data available.
            </p>
          </PanelWithTitle>
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="Site Card" componentName="SiteCard" description="Card with status bar, ISP info, and device/client stats.">
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {SITE_CARDS.map((card) => (
            <SiteCard key={card.id} data={card} />
          ))}
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup title="Create Card" componentName="CreateCard" description="Dashed border card with + icon for adding new items.">
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <CreateCard onClick={() => alert("Create new site clicked!")} label="Add New Site" />
          <CreateCard onClick={() => alert("Create new network clicked!")} label="Add Network" />
        </div>
      </ShowcaseGroup>
    </ShowcasePage>
  );
}
