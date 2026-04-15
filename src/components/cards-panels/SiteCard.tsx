import type { SiteCardData } from "@/data/testData";
import "./SiteCard.css";

interface SiteCardProps {
  data: SiteCardData;
}

export function SiteCard({ data }: SiteCardProps) {
  const uptimePct = Math.round(data.uptime * 100);

  return (
    <div className="site-card">
      <div className="site-card__header">
        <span className="site-card__title">{data.title}</span>
        <span className="site-card__status">
          <span className={`site-card__status-dot site-card__status-dot--${data.status}`} />
          <span style={{ color: data.status === "online" ? "var(--color-positive)" : "var(--color-negative)" }}>
            {data.status}
          </span>
        </span>
      </div>

      <div className="site-card__meta">
        <span className="site-card__meta-row">{data.device}</span>
        <span className="site-card__meta-row">{data.isp}</span>
      </div>

      <div>
        <div className="site-card__uptime-bar">
          <div
            className={`site-card__uptime-fill${uptimePct < 50 ? " site-card__uptime-fill--low" : ""}`}
            style={{ width: `${uptimePct}%` }}
          />
        </div>
        <span className="site-card__uptime-label">Uptime {uptimePct}%</span>
      </div>

      <div className="site-card__stats">
        <div className="site-card__stat">
          <span className="site-card__stat-value">{data.devices}</span>
          <span className="site-card__stat-label">Devices</span>
        </div>
        <div className="site-card__stat">
          <span className="site-card__stat-value">{data.clients}</span>
          <span className="site-card__stat-label">Clients</span>
        </div>
      </div>
    </div>
  );
}
