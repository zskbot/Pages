const base = import.meta.env.BASE_URL;

const S = {
  root: { width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#1A1B26", fontFamily: "'Inter', sans-serif", display: "flex", color: "#C0CAF5", position: "relative" } as React.CSSProperties,
  sidebar: { width: "22vw", height: "100vh", borderRight: "1px solid rgba(255,255,255,0.05)", padding: "5vh 3vw", display: "flex", flexDirection: "column" as const },
  logo: { display: "flex", alignItems: "center", gap: "1vw", marginBottom: "6vh" },
  logoBox: { width: "1.5vw", height: "1.5vw", backgroundColor: "#7AA2F7", borderRadius: "0.3vw" },
  logoText: { fontSize: "1.2vw", fontWeight: 600, color: "#FFFFFF" },
  section: { fontSize: "0.85vw", fontWeight: 600, color: "#565F89", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: "1.5vh" },
  navItem: { fontSize: "1vw", color: "#C0CAF5", opacity: 0.6, marginBottom: "1.2vh" },
  navActive: { fontSize: "1vw", color: "#7AA2F7", fontWeight: 500, marginBottom: "1.2vh", display: "flex", alignItems: "center", gap: "0.6vw" },
  activeBorder: { width: "3px", height: "1.1em", backgroundColor: "#7AA2F7", borderRadius: "2px", marginLeft: "-3vw", flexShrink: 0 as unknown as "0" },
  sectionGap: { marginBottom: "3.5vh" },
  versionLabel: { marginTop: "auto", fontSize: "0.8vw", color: "#565F89" },
  main: { flex: 1, padding: "8vh 6vw", display: "flex", flexDirection: "column" as const, position: "relative" as const },
  eyebrow: { fontSize: "1vw", color: "#7AA2F7", textTransform: "uppercase" as const, letterSpacing: "0.05em", fontWeight: 600, marginBottom: "2vh" },
  h1: { fontSize: "4.2vw", fontWeight: 700, color: "#FFFFFF", margin: "0 0 2vh 0", letterSpacing: "-0.02em", lineHeight: 1.1 },
  subtitle: { fontSize: "1.4vw", color: "#9AA5CE", lineHeight: 1.6, maxWidth: "42vw", margin: "0 0 5vh 0", fontWeight: 400 },
  endpointBox: { display: "flex", alignItems: "center", padding: "1.8vh 2vw", backgroundColor: "rgba(122,162,247,0.1)", border: "1px solid rgba(122,162,247,0.25)", borderRadius: "0.5vw", marginBottom: "4vh", width: "fit-content" },
  getMethod: { fontSize: "1vw", fontWeight: 700, color: "#7AA2F7", marginRight: "1.5vw", fontFamily: "'DM Mono', monospace" },
  endpointPath: { fontSize: "1.1vw", color: "#FFFFFF", fontFamily: "'DM Mono', monospace" },
  colGrid: { display: "flex", gap: "4vw" },
  codeBlock: { backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2.5vh 2vw", border: "1px solid rgba(255,255,255,0.05)", fontFamily: "'DM Mono', monospace", fontSize: "0.95vw", lineHeight: 1.7 },
  colHeader: { fontSize: "1.1vw", fontWeight: 600, color: "#FFFFFF", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "1vh", marginBottom: "2vh" },
  colHeaderRow: { display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "1vh", marginBottom: "2vh" },
  statusOk: { display: "flex", alignItems: "center", gap: "0.5vw" },
  statusDot: { width: "0.6vw", height: "0.6vw", backgroundColor: "#9ECE6A", borderRadius: "50%" },
  statusText: { fontSize: "0.85vw", fontFamily: "'DM Mono', monospace", color: "#9ECE6A" },
  footer: { marginTop: "auto", display: "flex", justifyContent: "flex-end", width: "100%" },
  footerText: { fontSize: "0.85vw", color: "#565F89" },
};

export default function Slide01Title() {
  return (
    <div style={S.root}>
      <div style={S.sidebar}>
        <div style={S.logo}>
          <div style={S.logoBox} />
          <div style={S.logoText}>AuRen</div>
        </div>

        <div style={S.sectionGap}>
          <div style={S.section}>Overview</div>
          <div style={S.navActive}><span style={S.activeBorder} />Introduction</div>
          <div style={S.navItem}>Platform Landscape</div>
          <div style={S.navItem}>Key Metrics</div>
        </div>

        <div style={S.sectionGap}>
          <div style={S.section}>Platforms</div>
          <div style={S.navItem}>Devin AI</div>
          <div style={S.navItem}>Copilot Workspace</div>
          <div style={S.navItem}>Replit Agent</div>
          <div style={S.navItem}>Cursor</div>
          <div style={S.navItem}>Bolt.new</div>
          <div style={S.navItem}>v0.dev</div>
          <div style={S.navItem}>OpenClaw</div>
        </div>

        <div style={S.sectionGap}>
          <div style={{ ...S.section, color: "#E0AF68" }}>2025 New</div>
          <div style={S.navItem}>Claude Code</div>
          <div style={S.navItem}>Codex CLI</div>
          <div style={S.navItem}>Gemini Code Assist</div>
        </div>

        <div style={S.sectionGap}>
          <div style={S.section}>Analysis</div>
          <div style={S.navItem}>Pipeline</div>
          <div style={S.navItem}>Self-Healing</div>
          <div style={S.navItem}>Feature Matrix</div>
          <div style={S.navItem}>Comparison</div>
          <div style={S.navItem}>Trends</div>
        </div>

        <div style={S.versionLabel}>v2.0.0 • 2026</div>
      </div>

      <div style={S.main}>
        <div style={S.eyebrow}>Research Report</div>

        <h1 style={S.h1}>AuRen<br />2024–2026</h1>

        <p style={S.subtitle}>
          Comparing 10 platforms — Devin, Copilot Workspace, Replit Agent, Cursor, Bolt.new, v0.dev, OpenClaw, Claude Code, Codex CLI, and Gemini Code Assist — across autonomy, self-healing loops, and full-stack deployment.
        </p>

        <div style={S.endpointBox}>
          <div style={S.getMethod}>GET</div>
          <div style={S.endpointPath}>/api/v2/platforms</div>
        </div>

        <div style={S.colGrid}>
          <div style={{ flex: 1 }}>
            <div style={S.colHeader}>Request</div>
            <div style={S.codeBlock}>
              <div style={{ color: "#7AA2F7" }}>curl<span style={{ color: "#C0CAF5" }}> -X GET</span> \</div>
              <div style={{ color: "#E0AF68", paddingLeft: "2vw" }}>"https://api.aiplatforms.dev/v2/platforms" \</div>
              <div style={{ color: "#C0CAF5", paddingLeft: "2vw" }}>-H <span style={{ color: "#9ECE6A" }}>"Authorization: Bearer $TOKEN"</span></div>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={S.colHeaderRow}>
              <div style={S.colHeader}>Response</div>
              <div style={S.statusOk}>
                <div style={S.statusDot} />
                <div style={S.statusText}>200 OK</div>
              </div>
            </div>
            <div style={S.codeBlock}>
              <div style={{ color: "#C0CAF5" }}>{`{`}</div>
              <div style={{ paddingLeft: "2vw", color: "#C0CAF5" }}><span style={{ color: "#7AA2F7" }}>"total"</span>: <span style={{ color: "#FF9E64" }}>10</span>,</div>
              <div style={{ paddingLeft: "2vw", color: "#C0CAF5" }}><span style={{ color: "#7AA2F7" }}>"year_range"</span>: <span style={{ color: "#9ECE6A" }}>"2024–2026"</span>,</div>
              <div style={{ paddingLeft: "2vw", color: "#C0CAF5" }}><span style={{ color: "#7AA2F7" }}>"self_healing"</span>: <span style={{ color: "#FF9E64" }}>8</span>,</div>
              <div style={{ paddingLeft: "2vw", color: "#C0CAF5" }}><span style={{ color: "#7AA2F7" }}>"open_source"</span>: <span style={{ color: "#FF9E64" }}>3</span></div>
              <div style={{ color: "#C0CAF5" }}>{`}`}</div>
            </div>
          </div>
        </div>

        <div style={S.footer}><div style={S.footerText}>AuRen Research, 2026</div></div>
      </div>
    </div>
  );
}
