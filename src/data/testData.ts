// ── Table Data ──────────────────────────────────────────

export interface TableRow {
  id: number;
  name: string;
  ipAddress: string;
  macAddress: string;
  status: "online" | "offline" | "pending";
  speed: string;
  speedVariant: "green" | "blue" | "orange" | "red";
  uptime: string;
  type: string;
}

export const TABLE_DATA: TableRow[] = [
  { id: 1,  name: "USW Pro 24 PoE",    ipAddress: "192.168.1.2",   macAddress: "fc:ec:da:11:22:01", status: "online",  speed: "10 GbE",  speedVariant: "blue",   uptime: "45d 12h",  type: "Switch" },
  { id: 2,  name: "UAP U6 Pro",        ipAddress: "192.168.1.10",  macAddress: "fc:ec:da:11:22:02", status: "online",  speed: "2.5 GbE", speedVariant: "green",  uptime: "45d 12h",  type: "AP" },
  { id: 3,  name: "UAP U6 Enterprise", ipAddress: "192.168.1.11",  macAddress: "fc:ec:da:11:22:03", status: "online",  speed: "2.5 GbE", speedVariant: "green",  uptime: "32d 8h",   type: "AP" },
  { id: 4,  name: "USW Flex Mini",     ipAddress: "192.168.1.20",  macAddress: "fc:ec:da:11:22:04", status: "online",  speed: "GbE",     speedVariant: "green",  uptime: "45d 12h",  type: "Switch" },
  { id: 5,  name: "UCG Ultra",         ipAddress: "192.168.1.1",   macAddress: "fc:ec:da:11:22:05", status: "online",  speed: "2.5 GbE", speedVariant: "green",  uptime: "12d 4h",   type: "Gateway" },
  { id: 6,  name: "USW Lite 8 PoE",    ipAddress: "192.168.1.21",  macAddress: "fc:ec:da:11:22:06", status: "offline", speed: "GbE",     speedVariant: "green",  uptime: "-",        type: "Switch" },
  { id: 7,  name: "UAP AC Lite",       ipAddress: "192.168.1.12",  macAddress: "fc:ec:da:11:22:07", status: "pending", speed: "GbE",     speedVariant: "green",  uptime: "2d 1h",    type: "AP" },
  { id: 8,  name: "UDM Pro Max",       ipAddress: "192.168.1.1",   macAddress: "fc:ec:da:11:22:08", status: "online",  speed: "10 GbE",  speedVariant: "blue",   uptime: "99d 22h",  type: "Gateway" },
  { id: 9,  name: "USW Enterprise 24", ipAddress: "192.168.1.3",   macAddress: "fc:ec:da:11:22:09", status: "online",  speed: "10 GbE",  speedVariant: "blue",   uptime: "45d 12h",  type: "Switch" },
  { id: 10, name: "UAP U7 Pro",        ipAddress: "192.168.1.13",  macAddress: "fc:ec:da:11:22:10", status: "online",  speed: "2.5 GbE", speedVariant: "green",  uptime: "8d 16h",   type: "AP" },
];

// ── Port Data ───────────────────────────────────────────

export interface PortData {
  port: number;
  name: string;
  status: "gbe" | "2.5gbe" | "10gbe" | "disconnected" | "sfp";
  poe: boolean;
  connected: boolean;
  device?: string;
}

export const PORT_DATA: PortData[] = [
  { port: 1,  name: "Port 1",  status: "gbe",          poe: true,  connected: true,  device: "UAP U6 Pro" },
  { port: 2,  name: "Port 2",  status: "gbe",          poe: true,  connected: true,  device: "UAP AC Lite" },
  { port: 3,  name: "Port 3",  status: "disconnected",  poe: true,  connected: false },
  { port: 4,  name: "Port 4",  status: "disconnected",  poe: true,  connected: false },
  { port: 5,  name: "Port 5",  status: "gbe",          poe: true,  connected: true,  device: "USW Flex Mini" },
  { port: 6,  name: "Port 6",  status: "disconnected",  poe: true,  connected: false },
  { port: 7,  name: "Port 7",  status: "disconnected",  poe: false, connected: false },
  { port: 8,  name: "Port 8",  status: "gbe",          poe: false, connected: true,  device: "Starlink" },
  { port: 9,  name: "Port 9",  status: "2.5gbe",       poe: false, connected: true,  device: "Cox WAN" },
  { port: 10, name: "SFP+ 1",  status: "sfp",          poe: false, connected: false },
  { port: 11, name: "SFP+ 2",  status: "10gbe",        poe: false, connected: true,  device: "USW Pro XG 24" },
  { port: 12, name: "Port 12", status: "disconnected",  poe: true,  connected: false },
];

// ── Legend Items ─────────────────────────────────────────

export interface LegendItem {
  color: string;
  label: string;
}

export const PORT_LEGEND: LegendItem[] = [
  { color: "var(--color-positive)", label: "GbE" },
  { color: "var(--color-text-muted)", label: "2.5 GbE" },
  { color: "var(--color-info)", label: "10 GbE" },
  { color: "transparent", label: "Disconnected" },
];

// ── Sidebar Items ───────────────────────────────────────

export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  children?: SidebarItem[];
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: "overview",   label: "Overview",   icon: "\u2302" },
  { id: "wifi",       label: "WiFi",       icon: "\u2630" },
  { id: "networks",   label: "Networks",   icon: "\u26C1" },
  { id: "internet",   label: "Internet",   icon: "\u2295" },
  { id: "vpn",        label: "VPN",        icon: "\u26BF" },
  { id: "security",   label: "CyberSecure", icon: "\u26E8" },
  { id: "ha",         label: "High Availability", icon: "\u2B50" },
  {
    id: "system", label: "System", icon: "\u2699",
    children: [
      { id: "control-plane", label: "Control Plane", icon: "\u25CB" },
      { id: "identity",      label: "Identity",      icon: "\u25CB" },
    ],
  },
];

// ── Site Cards ──────────────────────────────────────────

export interface SiteCardData {
  id: string;
  title: string;
  device: string;
  isp: string;
  status: "online" | "offline";
  uptime: number; // 0-1
  devices: number;
  clients: number;
}

export const SITE_CARDS: SiteCardData[] = [
  { id: "s1", title: "Anthony - UDM Pro Max",  device: "UDM Pro Max",      isp: "Cox Communications", status: "online",  uptime: 0.99, devices: 12, clients: 34 },
  { id: "s2", title: "Office - Dream Router",  device: "Dream Router",     isp: "AT&T Fiber",         status: "online",  uptime: 0.95, devices: 6,  clients: 18 },
  { id: "s3", title: "Remote - Cloud Gateway",  device: "Cloud Gateway",   isp: "Starlink",           status: "offline", uptime: 0.0,  devices: 3,  clients: 0 },
];

// ── Chart Data ──────────────────────────────────────────

export interface ChartPoint {
  x: number;
  y: number;
}

export interface ChartSeries {
  label: string;
  color: string;
  points: ChartPoint[];
}

function generateSeries(label: string, color: string, base: number, variance: number, count: number): ChartSeries {
  const points: ChartPoint[] = [];
  let val = base;
  for (let i = 0; i < count; i++) {
    val += (Math.random() - 0.48) * variance;
    val = Math.max(0, val);
    points.push({ x: i, y: val });
  }
  return { label, color, points };
}

export const CHART_SERIES: ChartSeries[] = [
  generateSeries("Internet Activity", "#4a9eff", 50, 20, 60),
  generateSeries("Avg. Latency",      "#aadd00", 15, 5,  60),
  generateSeries("Packet Loss",       "#ff4466", 0.5, 1,  60),
];

// ── Bar Segments ────────────────────────────────────────

export interface BarSegment {
  value: number;
  color: string;
  label: string;
}

export const BAR_SEGMENTS: BarSegment[] = [
  { value: 70, color: "var(--color-positive)", label: "Healthy" },
  { value: 20, color: "var(--color-warning)",  label: "Warning" },
  { value: 10, color: "var(--color-negative)", label: "Critical" },
];

// ── Checkbox Items ──────────────────────────────────────

export const CHECKBOX_ITEMS = [
  "Amazon Devices", "Android TV Remote", "Apple AirDrop", "Apple AirPlay",
  "Apple File Sharing", "Apple iChat", "Apple iTunes", "Aqara",
  "DLNA", "Google Cast", "HomeKit", "HTTP",
  "HTTPS", "mDNS", "NTP", "Plex Media Server",
  "Roku", "SMB", "Sonos", "Spotify Connect",
  "SSH", "UPnP", "VLAN Trunk", "WireGuard",
];

// ── Metric Pairs ────────────────────────────────────────

export interface MetricPair {
  label: string;
  value: string;
  unit?: string;
}

export const METRIC_PAIRS: MetricPair[] = [
  { label: "Gateway IP",     value: "192.168.1.1" },
  { label: "System Uptime",  value: "99d 22h 13m" },
  { label: "Memory",         value: "4.62 GB", unit: "/ 8 GB" },
  { label: "CPU",            value: "12%",     unit: "avg" },
  { label: "Throughput",     value: "187 Mbps", unit: "/ 310 Mbps" },
  { label: "Active Clients", value: "34" },
  { label: "WAN Download",   value: "2.4 Gbps" },
  { label: "WAN Upload",     value: "940 Mbps" },
];
