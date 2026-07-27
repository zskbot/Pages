const sidebarStyle = { width: "22vw", height: "100vh", borderRight: "1px solid rgba(255,255,255,0.05)", padding: "5vh 3vw", display: "flex", flexDirection: "column" as const };
const rootStyle = { width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#1A1B26", fontFamily: "'Inter', sans-serif", display: "flex", color: "#C0CAF5", position: "relative" as const };

function Sidebar({ active }: { active: string }) {
  const navItem = (label: string) => (
    <div key={label} style={{ fontSize: "1vw", color: label === active ? "#7AA2F7" : "#C0CAF5", opacity: label === active ? 1 : 0.6, marginBottom: "1.2vh", fontWeight: label === active ? 500 : 400, display: "flex", alignItems: "center", gap: "0.6vw" }}>
      {label === active && <span style={{ width: "3px", height: "1.1em", backgroundColor: "#7AA2F7", borderRadius: "2px", marginLeft: "-3vw", flexShrink: 0 }} />}
      {label}
    </div>
  );
  return (
    <div style={sidebarStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: "1vw", marginBottom: "6vh" }}>
        <div style={{ width: "1.5vw", height: "1.5vw", backgroundColor: "#7AA2F7", borderRadius: "0.3vw" }} />
        <div style={{ fontSize: "1.2vw", fontWeight: 600, color: "#FFFFFF" }}>AuRen</div>
      </div>
      <div style={{ marginBottom: "3.5vh" }}>
        <div style={{ fontSize: "0.85vw", fontWeight: 600, color: "#565F89", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: "1.5vh" }}>Overview</div>
        {navItem("Introduction")}
        {navItem("Platform Landscape")}
        {navItem("Key Metrics")}
      </div>
      <div style={{ marginBottom: "3.5vh" }}>
        <div style={{ fontSize: "0.85vw", fontWeight: 600, color: "#565F89", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: "1.5vh" }}>Platforms</div>
        {navItem("Devin AI")}
        {navItem("Copilot Workspace")}
        {navItem("Replit Agent")}
        {navItem("Cursor")}
        {navItem("Bolt.new")}
        {navItem("v0.dev")}
        {navItem("OpenClaw")}
      </div>
      <div style={{ marginBottom: "3.5vh" }}>
        <div style={{ fontSize: "0.85vw", fontWeight: 600, color: "#565F89", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: "1.5vh" }}>Analysis</div>
        {navItem("Pipeline")}
        {navItem("Self-Healing")}
        {navItem("Feature Matrix")}
        {navItem("Comparison")}
        {navItem("Trends")}
      </div>
      <div style={{ marginTop: "auto", fontSize: "0.8vw", color: "#565F89" }}>v1.0.0 • 2026</div>
    </div>
  );
}

export default function Slide02Landscape() {
  return (
    <div style={rootStyle}>
      <Sidebar active="Platform Landscape" />
      <div style={{ flex: 1, padding: "7vh 5vw", display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: "1vw", color: "#7AA2F7", textTransform: "uppercase" as const, letterSpacing: "0.05em", fontWeight: 600, marginBottom: "1.5vh" }}>Overview</div>
        <h1 style={{ fontSize: "3.5vw", fontWeight: 700, color: "#FFFFFF", margin: "0 0 1.5vh 0", letterSpacing: "-0.02em" }}>Platform Landscape</h1>
        <p style={{ fontSize: "1.2vw", color: "#9AA5CE", margin: "0 0 3.5vh 0", lineHeight: 1.5 }}>Seven platforms spanning autonomous agents, copilot integrations, and self-hosted solutions.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5vh 2vw", flex: 1 }}>
          <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2.2vh 2vw", border: "1px solid rgba(122,162,247,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1vh" }}>
              <div style={{ fontSize: "1.3vw", fontWeight: 600, color: "#FFFFFF" }}>Devin AI</div>
              <div style={{ fontSize: "0.8vw", color: "#7AA2F7", backgroundColor: "rgba(122,162,247,0.1)", padding: "0.3vh 0.8vw", borderRadius: "2vw", fontFamily: "'DM Mono', monospace" }}>Autonomous Agent</div>
            </div>
            <div style={{ fontSize: "0.95vw", color: "#565F89", marginBottom: "0.8vh" }}>Cognition</div>
            <div style={{ fontSize: "1vw", color: "#9AA5CE", lineHeight: 1.4 }}>First "AI Software Engineer" — fully autonomous, end-to-end coding agent</div>
          </div>

          <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2.2vh 2vw", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1vh" }}>
              <div style={{ fontSize: "1.3vw", fontWeight: 600, color: "#FFFFFF" }}>Copilot Workspace</div>
              <div style={{ fontSize: "0.8vw", color: "#9ECE6A", backgroundColor: "rgba(158,206,106,0.1)", padding: "0.3vh 0.8vw", borderRadius: "2vw", fontFamily: "'DM Mono', monospace" }}>Copilot Agent</div>
            </div>
            <div style={{ fontSize: "0.95vw", color: "#565F89", marginBottom: "0.8vh" }}>Microsoft / GitHub</div>
            <div style={{ fontSize: "1vw", color: "#9AA5CE", lineHeight: 1.4 }}>Deep GitHub integration, issue-to-PR pipeline, VS Code native</div>
          </div>

          <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2.2vh 2vw", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1vh" }}>
              <div style={{ fontSize: "1.3vw", fontWeight: 600, color: "#FFFFFF" }}>Replit Agent</div>
              <div style={{ fontSize: "0.8vw", color: "#E0AF68", backgroundColor: "rgba(224,175,104,0.1)", padding: "0.3vh 0.8vw", borderRadius: "2vw", fontFamily: "'DM Mono', monospace" }}>Cloud IDE Agent</div>
            </div>
            <div style={{ fontSize: "0.95vw", color: "#565F89", marginBottom: "0.8vh" }}>Replit</div>
            <div style={{ fontSize: "1vw", color: "#9AA5CE", lineHeight: 1.4 }}>Full-stack generation with one-click cloud deployment, no config required</div>
          </div>

          <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2.2vh 2vw", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1vh" }}>
              <div style={{ fontSize: "1.3vw", fontWeight: 600, color: "#FFFFFF" }}>Cursor</div>
              <div style={{ fontSize: "0.8vw", color: "#BB9AF7", backgroundColor: "rgba(187,154,247,0.1)", padding: "0.3vh 0.8vw", borderRadius: "2vw", fontFamily: "'DM Mono', monospace" }}>AI-Powered IDE</div>
            </div>
            <div style={{ fontSize: "0.95vw", color: "#565F89", marginBottom: "0.8vh" }}>Anysphere</div>
            <div style={{ fontSize: "1vw", color: "#9AA5CE", lineHeight: 1.4 }}>VS Code fork with deep AI integration, local-first, multi-model support</div>
          </div>

          <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2.2vh 2vw", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1vh" }}>
              <div style={{ fontSize: "1.3vw", fontWeight: 600, color: "#FFFFFF" }}>Bolt.new</div>
              <div style={{ fontSize: "0.8vw", color: "#E0AF68", backgroundColor: "rgba(224,175,104,0.1)", padding: "0.3vh 0.8vw", borderRadius: "2vw", fontFamily: "'DM Mono', monospace" }}>Cloud IDE Agent</div>
            </div>
            <div style={{ fontSize: "0.95vw", color: "#565F89", marginBottom: "0.8vh" }}>StackBlitz</div>
            <div style={{ fontSize: "1vw", color: "#9AA5CE", lineHeight: 1.4 }}>Full-stack in-browser via WebContainers, instant npm environment</div>
          </div>

          <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2.2vh 2vw", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1vh" }}>
              <div style={{ fontSize: "1.3vw", fontWeight: 600, color: "#FFFFFF" }}>v0.dev</div>
              <div style={{ fontSize: "0.8vw", color: "#7DCFFF", backgroundColor: "rgba(125,207,255,0.1)", padding: "0.3vh 0.8vw", borderRadius: "2vw", fontFamily: "'DM Mono', monospace" }}>Frontend Generator</div>
            </div>
            <div style={{ fontSize: "0.95vw", color: "#565F89", marginBottom: "0.8vh" }}>Vercel</div>
            <div style={{ fontSize: "1vw", color: "#9AA5CE", lineHeight: 1.4 }}>React/Next.js specialist with shadcn/ui, Vercel-native deployment</div>
          </div>

          <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2.2vh 2vw", border: "1px solid rgba(158,206,106,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1vh" }}>
              <div style={{ fontSize: "1.3vw", fontWeight: 600, color: "#FFFFFF" }}>OpenClaw</div>
              <div style={{ fontSize: "0.8vw", color: "#9ECE6A", backgroundColor: "rgba(158,206,106,0.1)", padding: "0.3vh 0.8vw", borderRadius: "2vw", fontFamily: "'DM Mono', monospace" }}>Self-Hosted Agent</div>
            </div>
            <div style={{ fontSize: "0.95vw", color: "#565F89", marginBottom: "0.8vh" }}>Open Source Community</div>
            <div style={{ fontSize: "1vw", color: "#9AA5CE", lineHeight: 1.4 }}>Privacy-first, self-hosted, multi-model, full pipeline orchestration</div>
          </div>

          <div style={{ backgroundColor: "rgba(122,162,247,0.04)", borderRadius: "0.5vw", padding: "2.2vh 2vw", border: "1px dashed rgba(122,162,247,0.15)", display: "flex", flexDirection: "column" as const, justifyContent: "center", alignItems: "center" }}>
            <div style={{ fontSize: "2.5vw", fontWeight: 700, color: "#7AA2F7", marginBottom: "0.5vh" }}>7</div>
            <div style={{ fontSize: "1vw", color: "#565F89", textAlign: "center" as const, lineHeight: 1.4 }}>platforms tracked<br />across 9 feature dimensions</div>
          </div>
        </div>

        <div style={{ marginTop: "2vh", display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: "0.9vw", color: "#565F89" }}>02</div>
          <div style={{ fontSize: "0.85vw", color: "#565F89" }}>AuRen Research, 2026</div>
        </div>
      </div>
    </div>
  );
}
