const rootStyle = { width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#1A1B26", fontFamily: "'Inter', sans-serif", display: "flex", color: "#C0CAF5", position: "relative" as const };

function Sidebar({ active }: { active: string }) {
  const items = ["Introduction", "Platform Landscape", "Key Metrics", "Devin AI", "Copilot Workspace", "Replit Agent", "Cursor", "Bolt.new", "v0.dev", "OpenClaw", "Pipeline", "Self-Healing", "Feature Matrix", "Comparison", "Trends"];
  const sections: Record<string, string[]> = {
    "Overview": ["Introduction", "Platform Landscape", "Key Metrics"],
    "Platforms": ["Devin AI", "Copilot Workspace", "Replit Agent", "Cursor", "Bolt.new", "v0.dev", "OpenClaw"],
    "Analysis": ["Pipeline", "Self-Healing", "Feature Matrix", "Comparison", "Trends"]
  };
  return (
    <div style={{ width: "22vw", height: "100vh", borderRight: "1px solid rgba(255,255,255,0.05)", padding: "5vh 3vw", display: "flex", flexDirection: "column" as const }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1vw", marginBottom: "6vh" }}>
        <div style={{ width: "1.5vw", height: "1.5vw", backgroundColor: "#7AA2F7", borderRadius: "0.3vw" }} />
        <div style={{ fontSize: "1.2vw", fontWeight: 600, color: "#FFFFFF" }}>AuRen</div>
      </div>
      {Object.entries(sections).map(([sec, navItems]) => (
        <div key={sec} style={{ marginBottom: "3.5vh" }}>
          <div style={{ fontSize: "0.85vw", fontWeight: 600, color: "#565F89", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: "1.5vh" }}>{sec}</div>
          {navItems.map(label => (
            <div key={label} style={{ fontSize: "1vw", color: label === active ? "#7AA2F7" : "#C0CAF5", opacity: label === active ? 1 : 0.6, marginBottom: "1.2vh", fontWeight: label === active ? 500 : 400, display: "flex", alignItems: "center", gap: "0.6vw" }}>
              {label === active && <span style={{ width: "3px", height: "1.1em", backgroundColor: "#7AA2F7", borderRadius: "2px", marginLeft: "-3vw", flexShrink: 0 }} />}
              {label}
            </div>
          ))}
        </div>
      ))}
      <div style={{ marginTop: "auto", fontSize: "0.8vw", color: "#565F89" }}>v1.0.0 • 2026</div>
    </div>
  );
}

export default function Slide03Metrics() {
  return (
    <div style={rootStyle}>
      <Sidebar active="Key Metrics" />
      <div style={{ flex: 1, padding: "8vh 6vw", display: "flex", flexDirection: "column" as const }}>
        <div style={{ fontSize: "1vw", color: "#7AA2F7", textTransform: "uppercase" as const, letterSpacing: "0.05em", fontWeight: 600, marginBottom: "1.5vh" }}>Overview</div>
        <h1 style={{ fontSize: "4vw", fontWeight: 700, color: "#FFFFFF", margin: "0 0 1.5vh 0", letterSpacing: "-0.02em" }}>Key Metrics</h1>
        <p style={{ fontSize: "1.3vw", color: "#9AA5CE", margin: "0 0 4vh 0", lineHeight: 1.5, maxWidth: "45vw" }}>Aggregate statistics across 7 platforms as of Q1 2026.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2vw", marginBottom: "3vh" }}>
          <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "3.5vh 2.5vw", border: "1px solid rgba(122,162,247,0.2)", display: "flex", flexDirection: "column" as const }}>
            <div style={{ fontSize: "0.9vw", color: "#7AA2F7", textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: "1.5vh", fontFamily: "'DM Mono', monospace" }}>Total Platforms</div>
            <div style={{ fontSize: "5vw", fontWeight: 700, color: "#FFFFFF", lineHeight: 1, marginBottom: "1vh" }}>7</div>
            <div style={{ fontSize: "1vw", color: "#565F89" }}>tracked in this report</div>
          </div>
          <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "3.5vh 2.5vw", border: "1px solid rgba(158,206,106,0.2)", display: "flex", flexDirection: "column" as const }}>
            <div style={{ fontSize: "0.9vw", color: "#9ECE6A", textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: "1.5vh", fontFamily: "'DM Mono', monospace" }}>Self-Healing</div>
            <div style={{ fontSize: "5vw", fontWeight: 700, color: "#FFFFFF", lineHeight: 1, marginBottom: "1vh" }}>5</div>
            <div style={{ fontSize: "1vw", color: "#565F89" }}>platforms with debug loops</div>
          </div>
          <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "3.5vh 2.5vw", border: "1px solid rgba(224,175,104,0.2)", display: "flex", flexDirection: "column" as const }}>
            <div style={{ fontSize: "0.9vw", color: "#E0AF68", textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: "1.5vh", fontFamily: "'DM Mono', monospace" }}>Open Source</div>
            <div style={{ fontSize: "5vw", fontWeight: 700, color: "#FFFFFF", lineHeight: 1, marginBottom: "1vh" }}>2</div>
            <div style={{ fontSize: "1vw", color: "#565F89" }}>fully open codebases</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2vw" }}>
          <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "3.5vh 2.5vw", border: "1px solid rgba(187,154,247,0.2)" }}>
            <div style={{ fontSize: "0.9vw", color: "#BB9AF7", textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: "1.5vh", fontFamily: "'DM Mono', monospace" }}>Self-Hosted</div>
            <div style={{ fontSize: "5vw", fontWeight: 700, color: "#FFFFFF", lineHeight: 1, marginBottom: "1vh" }}>1</div>
            <div style={{ fontSize: "1vw", color: "#565F89" }}>on-premise option (OpenClaw)</div>
          </div>
          <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "3.5vh 2.5vw", border: "1px solid rgba(125,207,255,0.2)" }}>
            <div style={{ fontSize: "0.9vw", color: "#7DCFFF", textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: "1.5vh", fontFamily: "'DM Mono', monospace" }}>Avg Automation</div>
            <div style={{ fontSize: "5vw", fontWeight: 700, color: "#FFFFFF", lineHeight: 1, marginBottom: "1vh" }}>74<span style={{ fontSize: "2.5vw" }}>/100</span></div>
            <div style={{ fontSize: "1vw", color: "#565F89" }}>across all platforms</div>
          </div>
          <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "3.5vh 2.5vw", border: "1px solid rgba(247,118,142,0.2)" }}>
            <div style={{ fontSize: "0.9vw", color: "#F7768E", textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: "1.5vh", fontFamily: "'DM Mono', monospace" }}>Multi-Agent</div>
            <div style={{ fontSize: "5vw", fontWeight: 700, color: "#FFFFFF", lineHeight: 1, marginBottom: "1vh" }}>3</div>
            <div style={{ fontSize: "1vw", color: "#565F89" }}>platforms support multi-agent</div>
          </div>
        </div>

        <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: "0.9vw", color: "#565F89" }}>03</div>
          <div style={{ fontSize: "0.85vw", color: "#565F89" }}>AuRen Research, 2026</div>
        </div>
      </div>
    </div>
  );
}
