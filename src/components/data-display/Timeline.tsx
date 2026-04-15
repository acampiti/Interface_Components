import "./Timeline.css";

interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  time: string;
  variant?: "info" | "success" | "warning" | "error";
}

interface TimelineProps {
  events: TimelineEvent[];
}

const VARIANT_COLORS: Record<string, string> = {
  info: "var(--color-info)",
  success: "var(--color-positive)",
  warning: "var(--color-warning)",
  error: "var(--color-negative)",
};

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="timeline-root">
      {events.map((event, i) => {
        const color = VARIANT_COLORS[event.variant ?? "info"];
        const isLast = i === events.length - 1;

        return (
          <div className="timeline-event" key={event.id}>
            <div className="timeline-track">
              <span
                className="timeline-dot"
                style={{ backgroundColor: color }}
              />
              {!isLast && <span className="timeline-line" />}
            </div>

            <div className="timeline-content">
              <div className="timeline-title">{event.title}</div>
              {event.description && (
                <div className="timeline-desc">{event.description}</div>
              )}
              <div className="timeline-time">{event.time}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
