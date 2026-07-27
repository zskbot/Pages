import DocsSidebar from "../../components/DocsSidebar";

const root: React.CSSProperties = { width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#1A1B26", fontFamily: "'Inter', sans-serif", display: "flex", color: "#C0CAF5", position: "relative" };
const main: React.CSSProperties = { flex: 1, padding: "7vh 5.5vw", display: "flex", flexDirection: "column", overflow: "hidden" };
const code: React.CSSProperties = { backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2.5vh 2vw", border: "1px solid rgba(255,255,255,0.05)", fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", lineHeight: 1.7 };

export default function Slide21CodexCLI() {
  return (
    <div style={root}>
      <DocsSidebar active="Codex CLI" />
      <div style={main}>
        <div style={{ fontSize: "0.95vw", color: "#9ECE6A", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: "1.2vh", display: "flex", alignItems: "center", gap: "0.8vw" }}>
          <span style={{ backgroundColor: "#9ECE6A", color: "#1A1B26", fontSize: "0.7vw", fontWeight: 700, padding: "0.2vh 0.5vw", borderRadius: "0.2vw" }}>OPEN SOURCE</span>
          Platforms
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "2vw", marginBottom: "1.5vh" }}>
          <h1 style={{ fontSize: "3.8vw", fontWeight: 700, color: "#FFFFFF", margin: 0, letterSpacing: "-0.02em" }}>OpenAI Codex CLI</h1>
          <div style={{ fontSize: "0.85vw", color: "#9ECE6A", backgroundColor: "rgba(158,206,106,0.1)", padding: "0.4vh 1vw", borderRadius: "2vw", fontFamily: "'DM Mono', monospace", border: "1px solid rgba(158,206,106,0.2)" }}>CLI AI Agent</div>
        </div>
        <div style={{ fontSize: "1.05vw", color: "#565F89", marginBottom: "3vh" }}>OpenAI · Local / Self-hosted · MIT License · Launched May 2025 · 60K+ GitHub Stars</div>

        <div style={{ display: "flex", gap: "3.5vw", flex: 1 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2.5vh" }}>
            <div>
              <div style={{ fontSize: "1.05vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "1.5vh", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1vh" }}>Platform Profile</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2vh" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Automation Level</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
                    <div style={{ width: "10vw", height: "0.5vh", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{ width: "80%", height: "100%", backgroundColor: "#9ECE6A", borderRadius: "4px" }} />
                    </div>
                    <span style={{ fontSize: "0.9vw", color: "#9ECE6A", fontFamily: "'DM Mono', monospace" }}>80/100</span>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Execution</span>
                  <span style={{ fontSize: "0.9vw", color: "#C0CAF5", fontFamily: "'DM Mono', monospace" }}>Sandboxed shell</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Model</span>
                  <span style={{ fontSize: "0.9vw", color: "#C0CAF5", fontFamily: "'DM Mono', monospace" }}>GPT-4o</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Open Source</span>
                  <span style={{ fontSize: "0.9vw", color: "#9ECE6A", fontFamily: "'DM Mono', monospace" }}>true (MIT)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Self-Hosted</span>
                  <span style={{ fontSize: "0.9vw", color: "#9ECE6A", fontFamily: "'DM Mono', monospace" }}>true</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Self-Healing</span>
                  <span style={{ fontSize: "0.9vw", color: "#9ECE6A", fontFamily: "'DM Mono', monospace" }}>true</span>
                </div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: "1.05vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "1.5vh", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1vh" }}>Key Differentiator</div>
              <p style={{ fontSize: "1.05vw", color: "#9AA5CE", lineHeight: 1.6, margin: 0 }}>
                Open-source, local-first agent that runs in your terminal. Reads the full repo, executes shell commands in a sandbox, iterates autonomously, and opens PRs. Zero infrastructure overhead.
              </p>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "1.05vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "1.5vh", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1vh" }}>Usage Pattern</div>
            <div style={code}>
              <div style={{ color: "#565F89", marginBottom: "0.5vh", fontSize: "0.75vw" }}># Terminal-native execution loop</div>
              <div><span style={{ color: "#9ECE6A" }}>$</span> <span style={{ color: "#7AA2F7" }}>codex</span> <span style={{ color: "#E0AF68" }}>"add auth middleware to Express app"</span></div>
              <div style={{ color: "#565F89", paddingLeft: "1vw", marginTop: "0.5vh" }}>Reading repo context... <span style={{ color: "#9ECE6A" }}>12 files</span></div>
              <div style={{ color: "#565F89", paddingLeft: "1vw" }}>Generating patch... <span style={{ color: "#C0CAF5" }}>auth.ts, app.ts</span></div>
              <div style={{ color: "#565F89", paddingLeft: "1vw" }}>Sandbox execute: <span style={{ color: "#C0CAF5" }}>npm test</span></div>
              <div style={{ color: "#F7768E", paddingLeft: "2vw" }}>✗ 2 tests failed (JWT verify)</div>
              <div style={{ color: "#565F89", paddingLeft: "1vw" }}>Diff analysis → re-patch...</div>
              <div style={{ color: "#565F89", paddingLeft: "1vw" }}>Sandbox execute: <span style={{ color: "#C0CAF5" }}>npm test</span></div>
              <div style={{ color: "#9ECE6A", paddingLeft: "2vw" }}>✓ 34 tests passed</div>
              <div style={{ color: "#9ECE6A", marginTop: "1vh" }}>PR opened: <span style={{ color: "#7AA2F7" }}>feat/auth-middleware</span></div>
            </div>

            <div style={{ marginTop: "2vh", backgroundColor: "rgba(158,206,106,0.05)", border: "1px solid rgba(158,206,106,0.15)", borderRadius: "0.4vw", padding: "1.5vh 1.5vw" }}>
              <div style={{ fontSize: "0.85vw", color: "#9ECE6A", fontWeight: 600, marginBottom: "0.8vh" }}>Community Traction</div>
              <div style={{ display: "flex", gap: "2vw" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.6vw", fontWeight: 700, color: "#FFFFFF", fontFamily: "'DM Mono', monospace" }}>60K+</div>
                  <div style={{ fontSize: "0.7vw", color: "#565F89" }}>GitHub Stars</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.6vw", fontWeight: 700, color: "#FFFFFF", fontFamily: "'DM Mono', monospace" }}>30d</div>
                  <div style={{ fontSize: "0.7vw", color: "#565F89" }}>Time to 60K</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.6vw", fontWeight: 700, color: "#FFFFFF", fontFamily: "'DM Mono', monospace" }}>MIT</div>
                  <div style={{ fontSize: "0.7vw", color: "#565F89" }}>License</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2vh" }}>
          <div style={{ fontSize: "0.9vw", color: "#565F89" }}>21</div>
          <div style={{ fontSize: "0.85vw", color: "#565F89" }}>AuRen Research, 2026</div>
        </div>
      </div>
    </div>
  );
}
