import DocsSidebar from "../../components/DocsSidebar";

const root: React.CSSProperties = { width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#1A1B26", fontFamily: "'Inter', sans-serif", display: "flex", color: "#C0CAF5", position: "relative" };
const main: React.CSSProperties = { flex: 1, padding: "7vh 5.5vw", display: "flex", flexDirection: "column", overflow: "hidden" };

export default function Slide16Deployment() {
  return (
    <div style={root}>
      <DocsSidebar active="Deployment Models" />
      <div style={main}>
        <div style={{ fontSize: "0.95vw", color: "#9ECE6A", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: "1.2vh" }}>Analysis</div>
        <h1 style={{ fontSize: "3.5vw", fontWeight: 700, color: "#FFFFFF", margin: "0 0 1vh 0", letterSpacing: "-0.02em" }}>Deployment Models</h1>
        <p style={{ fontSize: "1.1vw", color: "#9AA5CE", margin: "0 0 3vh 0", lineHeight: 1.5 }}>Three distinct infrastructure approaches with different tradeoffs for teams.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2.5vw", flex: 1 }}>
          <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "3.5vh 2.5vw", border: "1px solid rgba(122,162,247,0.2)", display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "0.8vw", color: "#7AA2F7", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "2vh", fontFamily: "'DM Mono', monospace" }}>Model A</div>
            <div style={{ fontSize: "1.8vw", fontWeight: 700, color: "#FFFFFF", marginBottom: "1vh" }}>Cloud SaaS</div>
            <div style={{ fontSize: "1vw", color: "#9AA5CE", lineHeight: 1.6, marginBottom: "3vh" }}>Managed infrastructure, instant onboarding, usage-based billing. Data processed on provider servers.</div>
            <div style={{ fontSize: "0.85vw", color: "#565F89", marginBottom: "1vh", fontFamily: "'DM Mono', monospace" }}>Platforms</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8vh" }}>
              <div style={{ fontSize: "0.9vw", color: "#7AA2F7", fontFamily: "'DM Mono', monospace" }}>→ Devin AI</div>
              <div style={{ fontSize: "0.9vw", color: "#7AA2F7", fontFamily: "'DM Mono', monospace" }}>→ GitHub Copilot Workspace</div>
              <div style={{ fontSize: "0.9vw", color: "#7AA2F7", fontFamily: "'DM Mono', monospace" }}>→ Replit Agent</div>
              <div style={{ fontSize: "0.9vw", color: "#7AA2F7", fontFamily: "'DM Mono', monospace" }}>→ Bolt.new</div>
              <div style={{ fontSize: "0.9vw", color: "#7AA2F7", fontFamily: "'DM Mono', monospace" }}>→ v0.dev</div>
            </div>
            <div style={{ marginTop: "auto", paddingTop: "2vh", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize: "0.85vw", color: "#9AA5CE", lineHeight: 1.5 }}>Tradeoff: fastest to start, least control over data residency.</div>
            </div>
          </div>

          <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "3.5vh 2.5vw", border: "1px solid rgba(187,154,247,0.2)", display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "0.8vw", color: "#BB9AF7", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "2vh", fontFamily: "'DM Mono', monospace" }}>Model B</div>
            <div style={{ fontSize: "1.8vw", fontWeight: 700, color: "#FFFFFF", marginBottom: "1vh" }}>Embedded IDE</div>
            <div style={{ fontSize: "1vw", color: "#9AA5CE", lineHeight: 1.6, marginBottom: "3vh" }}>Ships as a plugin or fork of an existing IDE. Code stays local, AI calls are cloud-proxied.</div>
            <div style={{ fontSize: "0.85vw", color: "#565F89", marginBottom: "1vh", fontFamily: "'DM Mono', monospace" }}>Platforms</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8vh" }}>
              <div style={{ fontSize: "0.9vw", color: "#BB9AF7", fontFamily: "'DM Mono', monospace" }}>→ Cursor (VS Code fork)</div>
            </div>
            <div style={{ marginTop: "auto", paddingTop: "2vh", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize: "0.85vw", color: "#9AA5CE", lineHeight: 1.5 }}>Tradeoff: familiar tooling, files stay local, but LLM calls leave the machine.</div>
            </div>
          </div>

          <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "3.5vh 2.5vw", border: "1px solid rgba(158,206,106,0.3)", display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "0.8vw", color: "#9ECE6A", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "2vh", fontFamily: "'DM Mono', monospace" }}>Model C</div>
            <div style={{ fontSize: "1.8vw", fontWeight: 700, color: "#FFFFFF", marginBottom: "1vh" }}>Self-Hosted</div>
            <div style={{ fontSize: "1vw", color: "#9AA5CE", lineHeight: 1.6, marginBottom: "3vh" }}>Agent and LLM run entirely on your own infrastructure. Air-gapped deployments supported.</div>
            <div style={{ fontSize: "0.85vw", color: "#565F89", marginBottom: "1vh", fontFamily: "'DM Mono', monospace" }}>Platforms</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8vh" }}>
              <div style={{ fontSize: "0.9vw", color: "#9ECE6A", fontFamily: "'DM Mono', monospace" }}>→ OpenClaw (MIT License)</div>
            </div>
            <div style={{ marginTop: "auto", paddingTop: "2vh", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize: "0.85vw", color: "#9AA5CE", lineHeight: 1.5 }}>Tradeoff: full data sovereignty, higher ops overhead to run and maintain.</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2vh" }}>
          <div style={{ fontSize: "0.9vw", color: "#565F89" }}>16</div>
          <div style={{ fontSize: "0.85vw", color: "#565F89" }}>AuRen Research, 2026</div>
        </div>
      </div>
    </div>
  );
}
