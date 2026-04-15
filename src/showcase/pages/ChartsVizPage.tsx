import { ShowcasePage, ShowcaseGroup } from "../ShowcasePage";
import { StatsMetricLabels } from "@/components/charts-viz/StatsMetricLabels";
import { GLLineChart } from "@/components/charts-viz/GLLineChart";
import { GLBarViz } from "@/components/charts-viz/GLBarViz";
import { GLProgressBar } from "@/components/charts-viz/GLProgressBar";
import { METRIC_PAIRS, CHART_SERIES, BAR_SEGMENTS } from "@/data/testData";

export function ChartsVizPage() {
  return (
    <ShowcasePage
      title="Charts & Visualization"
      description="Canvas2D-rendered line charts, bar visualizations, progress bars, and metric labels — all theme-aware via CSS custom properties."
    >
      <ShowcaseGroup title="Stats / Metric Labels" componentName="StatsMetricLabels" description="Key-value pairs in a responsive grid layout.">
        <StatsMetricLabels metrics={METRIC_PAIRS} columns={4} />
      </ShowcaseGroup>

      <ShowcaseGroup title="GL Line Chart" componentName="GLLineChart" description="Multi-series line chart with grid, axes, legend, and area fill.">
        <GLLineChart series={CHART_SERIES} width={700} height={320} />
      </ShowcaseGroup>

      <ShowcaseGroup title="GL Bar Visualization" componentName="GLBarViz" description="Stacked horizontal bar with proportional colored segments.">
        <GLBarViz segments={BAR_SEGMENTS} width={700} height={100} />
      </ShowcaseGroup>

      <ShowcaseGroup title="GL Progress Bars" componentName="GLProgressBar" description="Thin progress indicators with label and percentage.">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <GLProgressBar value={0.72} label="Memory Usage" width={700} height={44} />
          <GLProgressBar value={0.45} label="CPU Utilization" width={700} height={44} />
          <GLProgressBar value={0.91} label="Disk I/O" width={700} height={44} />
        </div>
      </ShowcaseGroup>
    </ShowcasePage>
  );
}
