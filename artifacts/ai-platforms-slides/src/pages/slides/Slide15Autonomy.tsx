import DocsSidebar from "../../components/DocsSidebar";

const root: React.CSSProperties = { width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#1A1B26", fontFamily: "'Inter', sans-serif", display: "flex", color: "#C0CAF5", position: "relative" };
const main: React.CSSProperties = { flex: 1, padding: "7vh 5.5vw", display: "flex", flexDirection: "column", overflow: "hidden" };

export default function Slide15Autonomy() {
  return (
    <div style={root}>
      <DocsSidebar active="Autonomy Spectrum" />
      <div style={main}>
        <div style={{ fontSize: "0.95vw", color: "#BB9AF7", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: "1.2vh" }}>Analysis</div>
        <h1 style={{ fontSize: "3.5vw", fontWeight: 700, color: "#FFFFFF", margin: "0 0 1vh 0", letterSpacing: "-0.02em" }}>Autonomy Spectrum</h1>
        <p style={{ fontSize: "1.1vw", color: "#9AA5CE", margin: "0 0 3.5vh 0", lineHeight: 1.5 }}>From inline code suggestions to fully autonomous software engineers — where each platform sits.</p>

        <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5vh" }}>
            <span style={{ fontSize: "0.9vw", color: "#565F89", fontFamily: "'DM Mono', monospace" }}>Code Completion</span>
            <span style={{ fontSize: "0.9vw", color: "#565F89", fontFamily: "'DM Mono', monospace" }}>Copilot Assist</span>
            <span style={{ fontSize: "0.9vw", color: "#565F89", fontFamily: "'DM Mono', monospace" }}>Agent Assist</span>
            <span style={{ fontSize: "0.9vw", color: "#565F89", fontFamily: "'DM Mono', monospace" }}>Full Autonomy</span>
          </div>

          <div style={{ position: "relative", height: "1.2vh", backgroundColor: "rgba(255,255,255,0.06)", borderRadius: "4px", marginBottom: "4vh" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", background: "linear-gradient(to right, rgba(122,162,247,0.15), rgba(122,162,247,0.6))", borderRadius: "4px" }} />
            <div style={{ position: "absolute", left: "0%", top: "50%", transform: "translateY(-50%)", width: "0.8vw", height: "0.8vw", backgroundColor: "#565F89", borderRadius: "50%", border: "2px solid #1A1B26" }} />
            <div style={{ position: "absolute", left: "33%", top: "50%", transform: "translateY(-50%)", width: "0.8vw", height: "0.8vw", backgroundColor: "#565F89", borderRadius: "50%", border: "2px solid #1A1B26" }} />
            <div style={{ position: "absolute", left: "66%", top: "50%", transform: "translateY(-50%)", width: "0.8vw", height: "0.8vw", backgroundColor: "#565F89", borderRadius: "50%", border: "2px solid #1A1B26" }} />
            <div style={{ position: "absolute", left: "100%", top: "50%", transform: "translateY(-50%)", width: "0.8vw", height: "0.8vw", backgroundColor: "#7AA2F7", borderRadius: "50%", border: "2px solid #1A1B26" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "2vw" }}>
            <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2.5vh 2vw", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ fontSize: "0.8vw", color: "#565F89", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.5vh", fontFamily: "'DM Mono', monospace" }}>Level 1: Complete</div>
              <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "1vh" }}>Code Completion</div>
              <div style={{ fontSize: "0.95vw", color: "#9AA5CE", lineHeight: 1.5, marginBottom: "1.5vh" }}>Suggests next token/line inline. Human drives the wheel.</div>
              <div style={{ fontSize: "0.85vw", color: "#565F89", fontFamily: "'DM Mono', monospace" }}>— No platforms here</div>
            </div>
            <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2.5vh 2vw", border: "1px solid rgba(158,206,106,0.15)" }}>
              <div style={{ fontSize: "0.8vw", color: "#9ECE6A", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.5vh", fontFamily: "'DM Mono', monospace" }}>Level 2: Copilot</div>
              <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "1vh" }}>Copilot Assist</div>
              <div style={{ fontSize: "0.95vw", color: "#9AA5CE", lineHeight: 1.5, marginBottom: "1.5vh" }}>Contextual suggestions; human approves each change.</div>
              <div style={{ fontSize: "0.85vw", color: "#9ECE6A", fontFamily: "'DM Mono', monospace" }}>Cursor · v0.dev</div>
            </div>
            <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2.5vh 2vw", border: "1px solid rgba(224,175,104,0.15)" }}>
              <div style={{ fontSize: "0.8vw", color: "#E0AF68", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.5vh", fontFamily: "'DM Mono', monospace" }}>Level 3: Agent</div>
              <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "1vh" }}>Agent Assist</div>
              <div style={{ fontSize: "0.95vw", color: "#9AA5CE", lineHeight: 1.5, marginBottom: "1.5vh" }}>Executes multi-step tasks; human reviews PR/output.</div>
              <div style={{ fontSize: "0.85vw", color: "#E0AF68", fontFamily: "'DM Mono', monospace" }}>Copilot WS · Bolt · Replit</div>
            </div>
            <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2.5vh 2vw", border: "1px solid rgba(122,162,247,0.25)" }}>
              <div style={{ fontSize: "0.8vw", color: "#7AA2F7", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.5vh", fontFamily: "'DM Mono', monospace" }}>Level 4: Autonomous</div>
              <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "1vh" }}>Full Autonomy</div>
              <div style={{ fontSize: "0.95vw", color: "#9AA5CE", lineHeight: 1.5, marginBottom: "1.5vh" }}>Plans, codes, debugs, and deploys end-to-end autonomously.</div>
              <div style={{ fontSize: "0.85vw", color: "#7AA2F7", fontFamily: "'DM Mono', monospace" }}>Devin AI · OpenClaw</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2.5vh" }}>
          <div style={{ fontSize: "0.9vw", color: "#565F89" }}>15</div>
          <div style={{ fontSize: "0.85vw", color: "#565F89" }}>AuRen Research, 2026</div>
        </div>
      </div>
    </div>
  );
}
