import DocsSidebar from "../../components/DocsSidebar";

const root: React.CSSProperties = { width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#1A1B26", fontFamily: "'Inter', sans-serif", display: "flex", color: "#C0CAF5", position: "relative" };
const main: React.CSSProperties = { flex: 1, padding: "7vh 5.5vw", display: "flex", flexDirection: "column", overflow: "hidden" };
const code: React.CSSProperties = { backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2.2vh 2vw", border: "1px solid rgba(255,255,255,0.05)", fontFamily: "'DM Mono', monospace", fontSize: "0.88vw", lineHeight: 1.7 };

export default function Slide17MultiAgent() {
  return (
    <div style={root}>
      <DocsSidebar active="Multi-Agent Arch" />
      <div style={main}>
        <div style={{ fontSize: "0.95vw", color: "#F7768E", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: "1.2vh" }}>Analysis</div>
        <h1 style={{ fontSize: "3.5vw", fontWeight: 700, color: "#FFFFFF", margin: "0 0 1vh 0", letterSpacing: "-0.02em" }}>Multi-Agent Architecture</h1>
        <p style={{ fontSize: "1.1vw", color: "#9AA5CE", margin: "0 0 2.5vh 0" }}>How platforms orchestrate specialist agents — supported by Devin AI, Replit Agent, and OpenClaw.</p>

        <div style={{ display: "flex", gap: "3vw", flex: 1 }}>
          <div style={{ flex: 1.1 }}>
            <div style={{ fontSize: "1.05vw", fontWeight: 600, color: "#FFFFFF", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1vh", marginBottom: "2vh" }}>Orchestration Pattern</div>
            <div style={code}>
              <div style={{ color: "#565F89" }}>{"// Orchestrator dispatches to specialists"}</div>
              <div><span style={{ color: "#BB9AF7" }}>const</span> <span style={{ color: "#7AA2F7" }}>orchestrator</span> = {`{`}</div>
              <div style={{ paddingLeft: "2vw" }}><span style={{ color: "#9ECE6A" }}>agents</span>: [</div>
              <div style={{ paddingLeft: "4vw" }}>{`{ `}<span style={{ color: "#7AA2F7" }}>role</span>: <span style={{ color: "#E0AF68" }}>"planner"</span>, <span style={{ color: "#7AA2F7" }}>model</span>: <span style={{ color: "#E0AF68" }}>"claude-3-opus"</span> {`}`},</div>
              <div style={{ paddingLeft: "4vw" }}>{`{ `}<span style={{ color: "#7AA2F7" }}>role</span>: <span style={{ color: "#E0AF68" }}>"coder"</span>, <span style={{ color: "#7AA2F7" }}>model</span>: <span style={{ color: "#E0AF68" }}>"gpt-4o"</span> {`}`},</div>
              <div style={{ paddingLeft: "4vw" }}>{`{ `}<span style={{ color: "#7AA2F7" }}>role</span>: <span style={{ color: "#E0AF68" }}>"tester"</span>, <span style={{ color: "#7AA2F7" }}>model</span>: <span style={{ color: "#E0AF68" }}>"gemini-1.5"</span> {`}`},</div>
              <div style={{ paddingLeft: "4vw" }}>{`{ `}<span style={{ color: "#7AA2F7" }}>role</span>: <span style={{ color: "#E0AF68" }}>"reviewer"</span>, <span style={{ color: "#7AA2F7" }}>model</span>: <span style={{ color: "#E0AF68" }}>"claude-3-5"</span> {`}`}</div>
              <div style={{ paddingLeft: "2vw" }}>],</div>
              <div style={{ paddingLeft: "2vw" }}><span style={{ color: "#9ECE6A" }}>strategy</span>: <span style={{ color: "#E0AF68" }}>"parallel"</span></div>
              <div>{`}`};</div>
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.8vh" }}>
            <div style={{ fontSize: "1.05vw", fontWeight: 600, color: "#FFFFFF", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1vh" }}>Agent Roles</div>
            <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2vh 2vw", border: "1px solid rgba(122,162,247,0.15)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6vh" }}>
                <span style={{ fontSize: "1vw", fontWeight: 600, color: "#FFFFFF" }}>Planner</span>
                <span style={{ fontSize: "0.8vw", color: "#7AA2F7", fontFamily: "'DM Mono', monospace" }}>orchestrator</span>
              </div>
              <div style={{ fontSize: "0.9vw", color: "#9AA5CE", lineHeight: 1.4 }}>Breaks task into sub-tasks, assigns agents, tracks progress.</div>
            </div>
            <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2vh 2vw", border: "1px solid rgba(158,206,106,0.15)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6vh" }}>
                <span style={{ fontSize: "1vw", fontWeight: 600, color: "#FFFFFF" }}>Coder</span>
                <span style={{ fontSize: "0.8vw", color: "#9ECE6A", fontFamily: "'DM Mono', monospace" }}>specialist</span>
              </div>
              <div style={{ fontSize: "0.9vw", color: "#9AA5CE", lineHeight: 1.4 }}>Writes implementation code, handles file I/O, runs commands.</div>
            </div>
            <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2vh 2vw", border: "1px solid rgba(224,175,104,0.15)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6vh" }}>
                <span style={{ fontSize: "1vw", fontWeight: 600, color: "#FFFFFF" }}>Tester</span>
                <span style={{ fontSize: "0.8vw", color: "#E0AF68", fontFamily: "'DM Mono', monospace" }}>specialist</span>
              </div>
              <div style={{ fontSize: "0.9vw", color: "#9AA5CE", lineHeight: 1.4 }}>Generates test cases, runs suite, reports failures to planner.</div>
            </div>
            <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2vh 2vw", border: "1px solid rgba(187,154,247,0.15)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6vh" }}>
                <span style={{ fontSize: "1vw", fontWeight: 600, color: "#FFFFFF" }}>Reviewer</span>
                <span style={{ fontSize: "0.8vw", color: "#BB9AF7", fontFamily: "'DM Mono', monospace" }}>specialist</span>
              </div>
              <div style={{ fontSize: "0.9vw", color: "#9AA5CE", lineHeight: 1.4 }}>Code review, security scan, style compliance — gates merge.</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2vh" }}>
          <div style={{ fontSize: "0.9vw", color: "#565F89" }}>17</div>
          <div style={{ fontSize: "0.85vw", color: "#565F89" }}>AuRen Research, 2026</div>
        </div>
      </div>
    </div>
  );
}
