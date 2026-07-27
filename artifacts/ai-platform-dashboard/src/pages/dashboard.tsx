import { useState, useEffect, useRef, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetPlatforms,
  useGetPlatformsComparison,
  useGetPlatformFeatures,
  useGetPlatformsSummary,
  useGetSelfHealingData,
  useGetAutomationPipeline,
  useGetPlatformsTrending,
  useGetResearchNews,
} from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  RefreshCw,
  Sun,
  Moon,
  Printer,
  ChevronDown,
  Check,
  Download,
  ArrowUpIcon,
  ArrowDownIcon,
  Filter,
  X,
  TrendingUp,
  Newspaper,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import { CSVLink } from "react-csv";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AppNav from "@/components/AppNav";
import { Link } from "wouter";

const CHART_COLORS = {
  blue: "#00cfab",
  purple: "#795EFF",
  green: "#009118",
  red: "#A60808",
  pink: "#ec4899",
};

const CHART_COLOR_LIST = [
  CHART_COLORS.blue,
  CHART_COLORS.purple,
  CHART_COLORS.green,
  CHART_COLORS.red,
  CHART_COLORS.pink,
  "#f97316",
  "#06b6d4",
  "#e0af68",
  "#bb9af7",
  "#9ece6a",
];

const DATA_SOURCES: string[] = ["App DB"];

const PLATFORM_LAUNCH_DATA = [
  { id: "cursor",             name: "Cursor",              year: 2023, quarter: 1 },
  { id: "replit-agent",       name: "Replit Agent",        year: 2023, quarter: 3 },
  { id: "v0-dev",             name: "v0.dev",              year: 2023, quarter: 3 },
  { id: "devin",              name: "Devin",               year: 2024, quarter: 1 },
  { id: "copilot-workspace",  name: "Copilot Workspace",   year: 2024, quarter: 2 },
  { id: "bolt-new",           name: "Bolt.new",            year: 2024, quarter: 4 },
  { id: "openclaw",           name: "OpenClaw",            year: 2024, quarter: 4 },
  { id: "gemini-code-assist", name: "Gemini Code Assist",  year: 2025, quarter: 1 },
  { id: "claude-code",        name: "Claude Code",         year: 2025, quarter: 2 },
  { id: "codex-cli",          name: "Codex CLI",           year: 2025, quarter: 2 },
];

const TIMELINE_COLS = [
  { label: "2023 Q1", year: 2023, quarter: 1 },
  { label: "2023 Q2", year: 2023, quarter: 2 },
  { label: "2023 Q3", year: 2023, quarter: 3 },
  { label: "2023 Q4", year: 2023, quarter: 4 },
  { label: "2024 Q1", year: 2024, quarter: 1 },
  { label: "2024 Q2", year: 2024, quarter: 2 },
  { label: "2024 Q3", year: 2024, quarter: 3 },
  { label: "2024 Q4", year: 2024, quarter: 4 },
  { label: "2025 Q1", year: 2025, quarter: 1 },
  { label: "2025 Q2", year: 2025, quarter: 2 },
];

const PLATFORM_COLORS = ["#0079F2", "#795EFF", "#009118", "#A60808", "#ec4899", "#f97316", "#06b6d4", "#e0af68", "#bb9af7", "#9ece6a"];

const TREND_COLORS: Record<string, string> = { rising: "#009118", stable: "#0079F2", falling: "#A60808" };
const IMPACT_COLORS: Record<string, string> = { high: "#A60808", medium: "#f97316", low: "#009118" };

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div style={{ backgroundColor: "#fff", borderRadius: "6px", padding: "10px 14px", border: "1px solid #e0e0e0", color: "#1a1a1a", fontSize: "13px" }}>
      <div style={{ marginBottom: "6px", fontWeight: 500, display: "flex", alignItems: "center", gap: "6px" }}>
        {payload.length === 1 && payload[0].color && payload[0].color !== "#ffffff" && (
          <span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "2px", backgroundColor: payload[0].color, flexShrink: 0 }} />
        )}
        {label}
      </div>
      {payload.map((entry: any, index: number) => (
        <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "3px" }}>
          {payload.length > 1 && entry.color && entry.color !== "#ffffff" && (
            <span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "2px", backgroundColor: entry.color, flexShrink: 0 }} />
          )}
          <span style={{ color: "#444" }}>{entry.name}</span>
          <span style={{ marginLeft: "auto", fontWeight: 600 }}>
            {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function ScatterTooltip({ active, payload }: any) {
  if (!active || !payload || payload.length === 0) return null;
  const d = payload[0]?.payload;
  return (
    <div style={{ backgroundColor: "#fff", borderRadius: "6px", padding: "10px 14px", border: "1px solid #e0e0e0", color: "#1a1a1a", fontSize: "13px" }}>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{d?.platform}</div>
      <div>Autonomy: <strong>{d?.autonomy}</strong></div>
      <div>Code Quality: <strong>{d?.codeQuality}</strong></div>
    </div>
  );
}

function CustomLegend({ payload }: any) {
  if (!payload || payload.length === 0) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 16px", fontSize: "13px" }}>
      {payload.map((entry: any, index: number) => (
        <div key={index} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "2px", backgroundColor: entry.color, flexShrink: 0 }} />
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const queryClient = useQueryClient();
  const [isDark, setIsDark] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [selectedIntervalMs, setSelectedIntervalMs] = useState(5 * 60 * 1000);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const platformsQuery = useGetPlatforms();
  const comparisonQuery = useGetPlatformsComparison();
  const featuresQuery = useGetPlatformFeatures();
  const summaryQuery = useGetPlatformsSummary();
  const selfHealingQuery = useGetSelfHealingData();
  const pipelineQuery = useGetAutomationPipeline();
  const trendingQuery = useGetPlatformsTrending();
  const newsQuery = useGetResearchNews();

  const loading =
    platformsQuery.isLoading || comparisonQuery.isLoading || featuresQuery.isLoading ||
    summaryQuery.isLoading || selfHealingQuery.isLoading || pipelineQuery.isLoading ||
    platformsQuery.isFetching || comparisonQuery.isFetching || featuresQuery.isFetching ||
    summaryQuery.isFetching || selfHealingQuery.isFetching || pipelineQuery.isFetching;

  useEffect(() => { document.documentElement.classList.toggle("dark", isDark); }, [isDark]);

  useEffect(() => {
    if (loading) { setIsSpinning(true); return; }
    const t = setTimeout(() => setIsSpinning(false), 600);
    return () => clearTimeout(t);
  }, [loading]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;
    const timer = setInterval(() => { queryClient.invalidateQueries(); }, selectedIntervalMs);
    return () => clearInterval(timer);
  }, [autoRefresh, selectedIntervalMs, queryClient]);

  const handleRefresh = () => { queryClient.invalidateQueries(); };

  const lastRefreshed = platformsQuery.dataUpdatedAt
    ? (() => {
        const d = new Date(platformsQuery.dataUpdatedAt);
        const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).toLowerCase();
        const date = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        return `${time} on ${date}`;
      })()
    : null;

  const platforms = platformsQuery.data || [];
  const comparisonData = comparisonQuery.data || [];
  const featuresData = featuresQuery.data || [];
  const summary = summaryQuery.data;
  const selfHealingData = selfHealingQuery.data || [];
  const trendingData = trendingQuery.data || [];
  const newsData = newsQuery.data || [];

  const pieData = useMemo(() => {
    const counts = platforms.reduce((acc, p) => { acc[p.type] = (acc[p.type] || 0) + 1; return acc; }, {} as Record<string, number>);
    return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [platforms]);

  const featuresCoverageData = useMemo(() => {
    return featuresData.map(f => {
      const keys = ["autoTesting", "selfHealing", "ciCdIntegration", "multiAgent", "infraProvisioning", "oneClickDeploy", "noCodeInterface", "openSource", "multiModel"] as const;
      const count = keys.filter(k => f[k]).length;
      return { platform: f.platform, features: count };
    }).sort((a, b) => b.features - a.features);
  }, [featuresData]);

  const scatterData = useMemo(() => {
    return comparisonData.map((c) => ({ platform: c.platform, autonomy: c.autonomy, codeQuality: c.codeQuality, z: 100 }));
  }, [comparisonData]);

  const gridColor = isDark ? "rgba(255,255,255,0.08)" : "#e5e5e5";
  const tickColor = isDark ? "#98999C" : "#71717a";

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [filterOpenSource, setFilterOpenSource] = useState(false);
  const [filterSelfHosted, setFilterSelfHosted] = useState(false);
  const [filterFullPipeline, setFilterFullPipeline] = useState(false);
  const [minAutomation, setMinAutomation] = useState(0);

  const filteredFeaturesData = useMemo(() => {
    return featuresData.filter((f) => {
      const p = platforms.find((pl) => pl.name === f.platform);
      if (filterOpenSource && !f.openSource) return false;
      if (filterSelfHosted && !p?.selfHosted) return false;
      if (filterFullPipeline && !(f.autoTesting && f.selfHealing && f.infraProvisioning && f.oneClickDeploy)) return false;
      if (minAutomation > 0 && (p?.automationLevel || 0) < minAutomation) return false;
      return true;
    });
  }, [featuresData, platforms, filterOpenSource, filterSelfHosted, filterFullPipeline, minAutomation]);

  const hasActiveFilters = filterOpenSource || filterSelfHosted || filterFullPipeline || minAutomation > 0;

  const featureColumns: ColumnDef<any>[] = [
    {
      accessorKey: "platform",
      header: "Platform",
      cell: ({ row }) => {
        const platformObj = platforms.find((p) => p.name === row.original.platform);
        return platformObj ? (
          <Link href={`/platform/${platformObj.id}`} className="font-medium text-primary hover:underline hover:text-primary/80 transition-colors">
            {row.original.platform}
          </Link>
        ) : row.original.platform;
      },
    },
    { accessorKey: "autoTesting",       header: "Auto Testing",   cell: ({ row }) => (row.original.autoTesting ? "✅" : "❌") },
    { accessorKey: "selfHealing",       header: "Self Healing",   cell: ({ row }) => (row.original.selfHealing ? "✅" : "❌") },
    { accessorKey: "ciCdIntegration",   header: "CI/CD",          cell: ({ row }) => (row.original.ciCdIntegration ? "✅" : "❌") },
    { accessorKey: "multiAgent",        header: "Multi Agent",    cell: ({ row }) => (row.original.multiAgent ? "✅" : "❌") },
    { accessorKey: "infraProvisioning", header: "Infra Prov",     cell: ({ row }) => (row.original.infraProvisioning ? "✅" : "❌") },
    { accessorKey: "oneClickDeploy",    header: "1-Click Deploy", cell: ({ row }) => (row.original.oneClickDeploy ? "✅" : "❌") },
    { accessorKey: "noCodeInterface",   header: "No-Code",        cell: ({ row }) => (row.original.noCodeInterface ? "✅" : "❌") },
    { accessorKey: "openSource",        header: "Open Source",    cell: ({ row }) => (row.original.openSource ? "✅" : "❌") },
    { accessorKey: "multiModel",        header: "Multi Model",    cell: ({ row }) => (row.original.multiModel ? "✅" : "❌") },
  ];

  const table = useReactTable({
    data: filteredFeaturesData,
    columns: featureColumns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  const SECTION_NAV = [
    { label: "Overview",      href: "#overview" },
    { label: "Charts",        href: "#comparison" },
    { label: "Automation",    href: "#automation" },
    { label: "Feature Matrix",href: "#feature-matrix" },
    { label: "Self-Healing",  href: "#self-healing" },
    { label: "News",          href: "#news" },
    { label: "Timeline",      href: "#timeline" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AppNav isDark={isDark} />

      {/* ── Section Quick Nav ── */}
      <div className="print:hidden sticky top-0 z-40 overflow-x-auto border-b"
        style={{ backgroundColor: isDark ? "rgba(10,11,20,0.95)" : "rgba(255,255,255,0.97)", borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-[1400px] mx-auto flex items-center gap-0 px-3 sm:px-6 min-w-max">
          {SECTION_NAV.map(({ label, href }) => (
            <a key={href} href={href}
              className="group flex items-center px-3 py-2.5 text-[12px] whitespace-nowrap border-b-2 border-transparent transition-all"
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = isDark ? "#e4e4e7" : "#18181b"; (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "#0079F2"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = ""; (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "transparent"; }}
              style={{ color: isDark ? "#71717a" : "#9AA5CE", textDecoration: "none", borderBottomColor: "transparent" }}>
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="px-3 py-4 sm:px-6 sm:pb-[32px]">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-4 flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
          <div className="pt-2">
            <h1 className="font-bold text-[22px] sm:text-[32px]">AuRen 2024–2026</h1>
            <p className="text-muted-foreground mt-1.5 text-[13px] sm:text-[14px]">Comparative analysis of 10 AI-autonomous software development platforms</p>
            {DATA_SOURCES.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                <span className="text-[12px] text-muted-foreground shrink-0">Data Sources:</span>
                {DATA_SOURCES.map((source) => (
                  <span key={source} className="text-[12px] font-bold rounded px-2 py-0.5 truncate print:!bg-[rgb(229,231,235)] print:!text-[rgb(75,85,99)]" title={source}
                    style={{ maxWidth: "20ch", backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgb(229, 231, 235)", color: isDark ? "#c8c9cc" : "rgb(75, 85, 99)" }}>
                    {source}
                  </span>
                ))}
              </div>
            )}
            {lastRefreshed && <p className="text-[12px] text-muted-foreground mt-3">Last refresh: {lastRefreshed}</p>}
          </div>
          <div className="flex items-center gap-2 sm:gap-3 pt-2 print:hidden flex-shrink-0">
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center rounded-[6px] overflow-hidden h-[26px] text-[12px]"
                style={{ backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "#F0F1F2", color: isDark ? "#c8c9cc" : "#4b5563" }}>
                <button onClick={handleRefresh} disabled={loading} className="flex items-center gap-1 px-2 h-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors disabled:opacity-50">
                  <RefreshCw className={`w-3.5 h-3.5 ${isSpinning ? "animate-spin" : ""}`} />
                  Refresh
                </button>
                <div className="w-px h-4 shrink-0" style={{ backgroundColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)" }} />
                <button onClick={() => setDropdownOpen((o) => !o)} className="flex items-center justify-center px-1.5 h-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-48 rounded-md border bg-popover text-popover-foreground shadow-md z-50 overflow-hidden">
                  <div className="p-2 border-b">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={autoRefresh} onChange={(e) => setAutoRefresh(e.target.checked)} className="rounded" />
                      Auto-refresh
                    </label>
                  </div>
                  <div className="py-1">
                    {[
                      { label: "Every 5 min", ms: 5 * 60 * 1000 },
                      { label: "Every 15 min", ms: 15 * 60 * 1000 },
                      { label: "Every 1 hour", ms: 60 * 60 * 1000 },
                    ].map((opt) => (
                      <button key={opt.label} onClick={() => setSelectedIntervalMs(opt.ms)}
                        className="w-full text-left px-3 py-1.5 text-sm hover:bg-muted flex items-center justify-between">
                        {opt.label}
                        {selectedIntervalMs === opt.ms && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => window.print()} disabled={loading}
              className="flex items-center justify-center w-[26px] h-[26px] rounded-[6px] transition-colors disabled:opacity-50"
              style={{ backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "#F0F1F2", color: isDark ? "#c8c9cc" : "#4b5563" }}
              aria-label="Export as PDF">
              <Printer className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setIsDark((d) => !d)}
              className="flex items-center justify-center w-[26px] h-[26px] rounded-[6px] transition-colors"
              style={{ backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "#F0F1F2", color: isDark ? "#c8c9cc" : "#4b5563" }}
              aria-label="Toggle dark mode">
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div id="overview" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          {[
            { label: "Total Platforms",          value: summary?.totalPlatforms ?? platforms.length },
            { label: "Open Source",              value: summary?.openSourceCount ?? "--" },
            { label: "Self Hosted",              value: summary?.selfHostedCount ?? "--" },
            { label: "Avg Automation Level",     value: summary?.avgAutomationLevel?.toFixed(1) ?? "--" },
            { label: "Full Pipeline Automation", value: summary?.fullPipelineCount ?? "--" },
          ].map(({ label, value }) => (
            <Card key={label}>
              <CardContent className="p-6">
                {loading ? (<><Skeleton className="h-4 w-24 mb-2" /><Skeleton className="h-8 w-16" /></>) : (
                  <>
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="text-2xl font-bold mt-1" style={{ color: CHART_COLORS.blue }}>{value}</p>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Insights Strip ── */}
        <div className="mb-4 p-3 rounded-lg border flex flex-wrap items-start gap-3 print:hidden"
          style={{ backgroundColor: isDark ? "rgba(122,162,247,0.06)" : "rgba(0,121,242,0.04)", borderColor: isDark ? "rgba(122,162,247,0.2)" : "rgba(0,121,242,0.14)" }}>
          <span className="text-[10px] font-bold uppercase tracking-widest shrink-0 mt-0.5" style={{ color: CHART_COLORS.blue }}>Key Insights</span>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {[
              "Claude Code leads code quality (10/10)",
              "Devin leads autonomy (9.8/10)",
              "8 of 10 platforms have self-healing loops",
              "Codex CLI: 60K GitHub stars in 30 days",
              "2025 wave added 3 new CLI/enterprise agents",
            ].map(insight => (
              <span key={insight} className="flex items-center gap-1.5 text-[12px]" style={{ color: isDark ? "#9AA5CE" : "#4b5563" }}>
                <span style={{ color: CHART_COLORS.blue }}>→</span> {insight}
              </span>
            ))}
          </div>
        </div>

        {/* Charts row 1 */}
        <div id="comparison" className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <Card>
            <CardHeader className="px-4 pt-4 pb-2 flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base">Platform Comparison (Avg Scores)</CardTitle>
              {!loading && comparisonData.length > 0 && (
                <CSVLink data={comparisonData} filename="platform-comparison.csv" className="print:hidden flex items-center justify-center w-[26px] h-[26px] rounded-[6px] transition-colors hover:opacity-80"
                  style={{ backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "#F0F1F2", color: isDark ? "#c8c9cc" : "#4b5563" }} aria-label="Export CSV">
                  <Download className="w-3.5 h-3.5" />
                </CSVLink>
              )}
            </CardHeader>
            <CardContent>
              {loading ? <Skeleton className="w-full h-[300px]" /> : (
                <ResponsiveContainer width="100%" height={300} debounce={0}>
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={comparisonData}>
                    <PolarGrid stroke={gridColor} />
                    <PolarAngleAxis dataKey="platform" tick={{ fill: tickColor, fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 10]} stroke={tickColor} tick={{ fill: tickColor, fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} isAnimationActive={false} />
                    <Legend content={<CustomLegend />} />
                    <Radar name="Autonomy" dataKey="autonomy" stroke={CHART_COLORS.blue} fill={CHART_COLORS.blue} fillOpacity={0.4} isAnimationActive={false} />
                    <Radar name="Code Quality" dataKey="codeQuality" stroke={CHART_COLORS.purple} fill={CHART_COLORS.purple} fillOpacity={0.4} isAnimationActive={false} />
                  </RadarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="px-4 pt-4 pb-2 flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base">Automation Level by Platform</CardTitle>
              {!loading && platforms.length > 0 && (
                <CSVLink data={platforms} filename="automation-levels.csv" className="print:hidden flex items-center justify-center w-[26px] h-[26px] rounded-[6px] transition-colors hover:opacity-80"
                  style={{ backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "#F0F1F2", color: isDark ? "#c8c9cc" : "#4b5563" }} aria-label="Export CSV">
                  <Download className="w-3.5 h-3.5" />
                </CSVLink>
              )}
            </CardHeader>
            <CardContent>
              {loading ? <Skeleton className="w-full h-[300px]" /> : (
                <ResponsiveContainer width="100%" height={300} debounce={0}>
                  <BarChart data={platforms} layout="vertical" margin={{ left: 80 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
                    <XAxis type="number" domain={[0, 10]} tick={{ fontSize: 12, fill: tickColor }} stroke={tickColor} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: tickColor }} stroke={tickColor} width={75} />
                    <Tooltip content={<CustomTooltip />} cursor={false} isAnimationActive={false} />
                    <Bar dataKey="automationLevel" name="Automation Level" fill={CHART_COLORS.blue} fillOpacity={0.8} activeBar={{ fillOpacity: 1 }} isAnimationActive={false} radius={[0, 2, 2, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="px-4 pt-4 pb-2 flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base">Feature Coverage</CardTitle>
              {!loading && featuresCoverageData.length > 0 && (
                <CSVLink data={featuresCoverageData} filename="feature-coverage.csv" className="print:hidden flex items-center justify-center w-[26px] h-[26px] rounded-[6px] transition-colors hover:opacity-80"
                  style={{ backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "#F0F1F2", color: isDark ? "#c8c9cc" : "#4b5563" }} aria-label="Export CSV">
                  <Download className="w-3.5 h-3.5" />
                </CSVLink>
              )}
            </CardHeader>
            <CardContent>
              {loading ? <Skeleton className="w-full h-[300px]" /> : (
                <ResponsiveContainer width="100%" height={300} debounce={0}>
                  <BarChart data={featuresCoverageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                    <XAxis dataKey="platform" tick={{ fontSize: 10, fill: tickColor }} stroke={tickColor} />
                    <YAxis tick={{ fontSize: 12, fill: tickColor }} stroke={tickColor} />
                    <Tooltip content={<CustomTooltip />} cursor={false} isAnimationActive={false} />
                    <Bar dataKey="features" name="Supported Features" fill={CHART_COLORS.purple} fillOpacity={0.8} activeBar={{ fillOpacity: 1 }} isAnimationActive={false} radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="px-4 pt-4 pb-2 flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base">Platform Types</CardTitle>
              {!loading && pieData.length > 0 && (
                <CSVLink data={pieData} filename="platform-types.csv" className="print:hidden flex items-center justify-center w-[26px] h-[26px] rounded-[6px] transition-colors hover:opacity-80"
                  style={{ backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "#F0F1F2", color: isDark ? "#c8c9cc" : "#4b5563" }} aria-label="Export CSV">
                  <Download className="w-3.5 h-3.5" />
                </CSVLink>
              )}
            </CardHeader>
            <CardContent className="pb-6">
              {loading ? <Skeleton className="w-full h-[300px]" /> : (
                <ResponsiveContainer width="100%" height={300} debounce={0}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} cornerRadius={2} paddingAngle={2} isAnimationActive={false} stroke="none">
                      {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={CHART_COLOR_LIST[index % CHART_COLOR_LIST.length]} />)}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} isAnimationActive={false} />
                    <Legend content={<CustomLegend />} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Scatter Chart + Trending */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <Card>
            <CardHeader className="px-4 pt-4 pb-2 flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base">Autonomy vs. Code Quality</CardTitle>
                <p className="text-[12px] text-muted-foreground mt-0.5">Each dot = one platform (hover for name)</p>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? <Skeleton className="w-full h-[300px]" /> : (
                <ResponsiveContainer width="100%" height={300} debounce={0}>
                  <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis type="number" dataKey="autonomy" name="Autonomy" domain={[0, 10]} label={{ value: "Autonomy →", position: "insideBottom", offset: -4, fill: tickColor, fontSize: 11 }} tick={{ fill: tickColor, fontSize: 11 }} stroke={tickColor} />
                    <YAxis type="number" dataKey="codeQuality" name="Code Quality" domain={[0, 10]} label={{ value: "Code Quality →", angle: -90, position: "insideLeft", fill: tickColor, fontSize: 11 }} tick={{ fill: tickColor, fontSize: 11 }} stroke={tickColor} />
                    <ZAxis dataKey="z" range={[80, 80]} />
                    <Tooltip content={<ScatterTooltip />} isAnimationActive={false} cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter data={scatterData} isAnimationActive={false}>
                      {scatterData.map((entry, index) => (
                        <Cell key={entry.platform} fill={CHART_COLOR_LIST[index % CHART_COLOR_LIST.length]} fillOpacity={0.85} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="px-4 pt-4 pb-2 flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <CardTitle className="text-base">Trending Platforms 2025–2026</CardTitle>
              </div>
              {!loading && trendingData.length > 0 && (
                <CSVLink data={trendingData} filename="trending-platforms.csv" className="print:hidden flex items-center justify-center w-[26px] h-[26px] rounded-[6px] transition-colors hover:opacity-80"
                  style={{ backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "#F0F1F2", color: isDark ? "#c8c9cc" : "#4b5563" }} aria-label="Export CSV">
                  <Download className="w-3.5 h-3.5" />
                </CSVLink>
              )}
            </CardHeader>
            <CardContent>
              {trendingQuery.isLoading ? <Skeleton className="w-full h-[300px]" /> : (
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  {trendingData.map((item, idx) => (
                    <div key={item.platform} className="flex items-center gap-3 p-2.5 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                      <span className="text-[11px] font-mono text-muted-foreground w-5 text-right shrink-0">#{idx + 1}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-semibold text-[13px] truncate">{item.platform}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0" style={{ backgroundColor: `${TREND_COLORS[item.trend] || CHART_COLORS.blue}18`, color: TREND_COLORS[item.trend] || CHART_COLORS.blue }}>
                            {item.trend === "rising" ? "↑ rising" : item.trend === "stable" ? "→ stable" : "↓ falling"}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate">{item.note}</p>
                      </div>
                      <div className="flex flex-col items-end shrink-0">
                        <span className="text-[13px] font-bold" style={{ color: CHART_COLORS.blue }}>{item.growthScore}</span>
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden mt-1">
                          <div className="h-full rounded-full" style={{ width: `${item.growthScore}%`, backgroundColor: TREND_COLORS[item.trend] || CHART_COLORS.blue }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Feature Matrix */}
        <Card id="feature-matrix" className="mb-4">
          <CardHeader className="px-4 pt-4 pb-3 space-y-2.5">
            <div className="flex flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CardTitle className="text-base">Feature Matrix</CardTitle>
                {hasActiveFilters && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">
                    {filteredFeaturesData.length}/{featuresData.length}
                  </span>
                )}
              </div>
              <Input placeholder="Search platforms..." value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} className="max-w-xs h-8 text-sm print:hidden" />
            </div>
            <div className="flex flex-wrap gap-1.5 print:hidden">
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground mr-1"><Filter className="w-3 h-3" /> Filter:</span>
              {[
                { label: "Open Source",   active: filterOpenSource,   toggle: () => setFilterOpenSource((v) => !v) },
                { label: "Self-Hosted",   active: filterSelfHosted,   toggle: () => setFilterSelfHosted((v) => !v) },
                { label: "Full Pipeline", active: filterFullPipeline, toggle: () => setFilterFullPipeline((v) => !v) },
              ].map(({ label, active, toggle }) => (
                <button key={label} onClick={toggle}
                  className={`flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full border transition-colors ${active ? "bg-primary/10 border-primary text-primary font-medium" : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"}`}>
                  {active && <Check className="w-3 h-3" />}
                  {label}
                </button>
              ))}
              {[3, 5, 7, 9].map((level) => (
                <button key={level} onClick={() => setMinAutomation(minAutomation === level ? 0 : level)}
                  className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${minAutomation === level ? "bg-primary/10 border-primary text-primary font-medium" : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"}`}>
                  Auto ≥ {level}
                </button>
              ))}
              {hasActiveFilters && (
                <button onClick={() => { setFilterOpenSource(false); setFilterSelfHosted(false); setFilterFullPipeline(false); setMinAutomation(0); }}
                  className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:text-destructive hover:border-destructive transition-colors">
                  <X className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2"><Skeleton className="h-10 w-full" />{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}</div>
            ) : (
              <div className="rounded-md border overflow-x-auto">
                <Table className="min-w-[700px]">
                  <TableHeader className="bg-muted/50">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id} onClick={header.column.getToggleSortingHandler()} className="cursor-pointer select-none text-xs h-10 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {{ asc: " 🔼", desc: " 🔽" }[header.column.getIsSorted() as string] ?? null}
                            </div>
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows.length > 0 ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="text-sm py-2">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={featureColumns.length} className="h-24 text-center">No results found.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Self-Healing */}
        <Card className="mb-4">
          <CardHeader className="px-4 pt-4 pb-2">
            <CardTitle className="text-base">Self-Healing Mechanisms</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-32 w-full" />)}
              </div>
            ) : selfHealingData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selfHealingData.map((item) => (
                  <div key={item.platform} className="p-4 rounded-lg border bg-card flex flex-col h-full hover:bg-muted/20 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-[15px]">{item.platform}</h3>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${item.hasWatchdog ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-muted text-muted-foreground"}`}>
                        {item.hasWatchdog ? "WATCHDOG ✓" : "NO WATCHDOG"}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5 mt-auto text-sm text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <span className="font-medium text-foreground w-20 shrink-0">Loop:</span>
                        <span>{item.loopStructure}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-medium text-foreground w-20 shrink-0">Detect:</span>
                        <span>{item.errorDetection}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-medium text-foreground w-20 shrink-0">Patch:</span>
                        <span>{item.patchingMethod}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-medium text-foreground w-20 shrink-0">Typical:</span>
                        <span className="font-medium text-foreground">{item.iterationsTypical} iter.</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">No self-healing data available.</div>
            )}
          </CardContent>
        </Card>

        {/* News Feed */}
        <Card id="news" className="mb-4">
          <CardHeader className="px-4 pt-4 pb-2 flex-row items-center gap-2">
            <Newspaper className="w-4 h-4 text-muted-foreground" />
            <CardTitle className="text-base">Platform News Feed 2024–2026</CardTitle>
          </CardHeader>
          <CardContent>
            {newsQuery.isLoading ? (
              <div className="space-y-3">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}</div>
            ) : newsData.length > 0 ? (
              <div className="space-y-3">
                {newsData.map((item) => (
                  <div key={item.id} className="p-4 rounded-lg border bg-card hover:bg-muted/20 transition-colors">
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-mono text-muted-foreground">{item.date}</span>
                        <span className="font-semibold text-[13px] text-foreground">{item.platform}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "#f0f1f2", color: isDark ? "#c8c9cc" : "#4b5563" }}>
                          #{item.tag}
                        </span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-bold shrink-0" style={{ backgroundColor: `${IMPACT_COLORS[item.impact] || CHART_COLORS.blue}15`, color: IMPACT_COLORS[item.impact] || CHART_COLORS.blue }}>
                        {item.impact.toUpperCase()}
                      </span>
                    </div>
                    <p className="font-semibold text-[14px] text-foreground mb-1">{item.headline}</p>
                    <p className="text-[12px] text-muted-foreground leading-relaxed">{item.summary}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">No news data available.</div>
            )}
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card id="timeline">
          <CardHeader className="px-4 pt-4 pb-2">
            <CardTitle className="text-base">Platform Launch Timeline 2023–2025</CardTitle>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                <div className="grid gap-1 mb-3" style={{ gridTemplateColumns: `repeat(${TIMELINE_COLS.length}, 1fr)` }}>
                  {TIMELINE_COLS.map((col) => (
                    <div key={col.label} className="text-center">
                      <span className="text-[10px] text-muted-foreground font-medium">{col.label}</span>
                    </div>
                  ))}
                </div>
                <div className="relative mb-2">
                  <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
                  <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${TIMELINE_COLS.length}, 1fr)` }}>
                    {TIMELINE_COLS.map((col) => (
                      <div key={col.label} className="flex justify-center"><div className="w-px h-3 bg-border" /></div>
                    ))}
                  </div>
                </div>
                <div className="relative grid gap-1" style={{ gridTemplateColumns: `repeat(${TIMELINE_COLS.length}, 1fr)`, minHeight: 160 }}>
                  {TIMELINE_COLS.map((col) => {
                    const items = PLATFORM_LAUNCH_DATA.filter((p) => p.year === col.year && p.quarter === col.quarter);
                    return (
                      <div key={col.label} className="flex flex-col items-center gap-2 pt-1">
                        {items.map((platform) => {
                          const colorIdx = PLATFORM_LAUNCH_DATA.indexOf(platform);
                          return (
                            <Link key={platform.id} href={`/platform/${platform.id}`} className="group flex flex-col items-center gap-1.5 no-underline">
                              <div className="w-3 h-3 rounded-full border-2 border-white dark:border-background shadow-sm group-hover:scale-125 transition-transform"
                                style={{ backgroundColor: PLATFORM_COLORS[colorIdx % PLATFORM_COLORS.length] }} />
                              <span className="text-[9px] font-medium text-center leading-tight group-hover:underline"
                                style={{ color: PLATFORM_COLORS[colorIdx % PLATFORM_COLORS.length] }}>
                                {platform.name}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
                <div className="grid gap-1 mt-4 border-t border-border pt-3" style={{ gridTemplateColumns: `repeat(${TIMELINE_COLS.length}, 1fr)` }}>
                  <div className="col-span-4 text-center text-xs font-semibold text-muted-foreground">2023</div>
                  <div className="col-span-4 text-center text-xs font-semibold text-muted-foreground">2024</div>
                  <div className="col-span-2 text-center text-xs font-semibold text-muted-foreground">2025</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
      </div>
    </div>
  );
}
