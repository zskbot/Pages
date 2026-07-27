import DocsSidebar from "../../components/DocsSidebar";

const root: React.CSSProperties = { width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#1A1B26", fontFamily: "'Inter', sans-serif", display: "flex", color: "#C0CAF5", position: "relative" };
const main: React.CSSProperties = { flex: 1, padding: "7vh 5.5vw", display: "flex", flexDirection: "column", overflow: "hidden" };
const code: React.CSSProperties = { backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2.5vh 2vw", border: "1px solid rgba(255,255,255,0.05)", fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", lineHeight: 1.7 };

export default function Slide20ClaudeCode() {
  return (
    <div style={root}>
      <DocsSidebar active="Claude Code" />
      <div style={main}>
        <div style={{ fontSize: "0.95vw", color: "#E0AF68", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: "1.2vh", display: "flex", alignItems: "center", gap: "0.8vw" }}>
          <span style={{ backgroundColor: "#E0AF68", color: "#1A1B26", fontSize: "0.7vw", fontWeight: 700, padding: "0.2vh 0.5vw", borderRadius: "0.2vw" }}>NEW 2025</span>
          Platforms
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "2vw", marginBottom: "1.5vh" }}>
          <h1 style={{ fontSize: "3.8vw", fontWeight: 700, color: "#FFFFFF", margin: 0, letterSpacing: "-0.02em" }}>Claude Code</h1>
          <div style={{ fontSize: "0.85vw", color: "#E0AF68", backgroundColor: "rgba(224,175,104,0.1)", padding: "0.4vh 1vw", borderRadius: "2vw", fontFamily: "'DM Mono', monospace", border: "1px solid rgba(224,175,104,0.2)" }}>Terminal AI Agent</div>
        </div>
        <div style={{ fontSize: "1.05vw", color: "#565F89", marginBottom: "3vh" }}>Anthropic · Cloud SaaS · Closed Source · Launched April 2025</div>

        <div style={{ display: "flex", gap: "3.5vw", flex: 1 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2.5vh" }}>
            <div>
              <div style={{ fontSize: "1.05vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "1.5vh", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1vh" }}>Platform Profile</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2vh" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Automation Level</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
                    <div style={{ width: "10vw", height: "0.5vh", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{ width: "90%", height: "100%", backgroundColor: "#E0AF68", borderRadius: "4px" }} />
                    </div>
                    <span style={{ fontSize: "0.9vw", color: "#E0AF68", fontFamily: "'DM Mono', monospace" }}>90/100</span>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Context Window</span>
                  <span style={{ fontSize: "0.9vw", color: "#9ECE6A", fontFamily: "'DM Mono', monospace" }}>200K tokens</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Interface</span>
                  <span style={{ fontSize: "0.9vw", color: "#C0CAF5", fontFamily: "'DM Mono', monospace" }}>Terminal / CLI</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Open Source</span>
                  <span style={{ fontSize: "0.9vw", color: "#F7768E", fontFamily: "'DM Mono', monospace" }}>false</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Self-Healing</span>
                  <span style={{ fontSize: "0.9vw", color: "#9ECE6A", fontFamily: "'DM Mono', monospace" }}>true</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Constitutional AI</span>
                  <span style={{ fontSize: "0.9vw", color: "#9ECE6A", fontFamily: "'DM Mono', monospace" }}>true</span>
                </div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: "1.05vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "1.5vh", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1vh" }}>Key Differentiator</div>
              <p style={{ fontSize: "1.05vw", color: "#9AA5CE", lineHeight: 1.6, margin: 0 }}>
                Best-in-class reasoning with constitutional AI safety. 200K token context enables full codebase understanding in a single pass. Terminal-native workflow integrates seamlessly into existing dev pipelines.
              </p>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "1.05vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "1.5vh", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1vh" }}>Self-Healing Loop</div>
            <div style={code}>
              <div style={{ color: "#565F89", marginBottom: "0.5vh", fontSize: "0.75vw" }}># Claude Code debug loop</div>
              <div style={{ color: "#7AA2F7" }}>claude <span style={{ color: "#9ECE6A" }}>"fix all failing tests"</span></div>
              <div style={{ color: "#565F89", paddingLeft: "1vw" }}>→ Plan: <span style={{ color: "#C0CAF5" }}>Reasoning chain (14 steps)</span></div>
              <div style={{ color: "#565F89", paddingLeft: "1vw" }}>→ Generate: <span style={{ color: "#C0CAF5" }}>Multi-file patch</span></div>
              <div style={{ color: "#565F89", paddingLeft: "1vw" }}>→ Execute: <span style={{ color: "#C0CAF5" }}>pytest -v</span></div>
              <div style={{ color: "#565F89", paddingLeft: "1vw" }}>→ Detect: <span style={{ color: "#F7768E" }}>3 assertions failed</span></div>
              <div style={{ color: "#565F89", paddingLeft: "1vw" }}>→ Reason: <span style={{ color: "#E0AF68" }}>Root cause analysis</span></div>
              <div style={{ color: "#565F89", paddingLeft: "1vw" }}>→ Patch: <span style={{ color: "#9ECE6A" }}>Constitutional check ✓</span></div>
              <div style={{ color: "#565F89", paddingLeft: "1vw" }}>→ Verify: <span style={{ color: "#9ECE6A" }}>All 47 tests pass ✓</span></div>
              <div style={{ color: "#9ECE6A", marginTop: "1vh" }}>✓ <span style={{ color: "#C0CAF5" }}>Completed in 4 iterations</span></div>
            </div>

            <div style={{ marginTop: "2vh", display: "flex", gap: "1.5vw" }}>
              {[
                { label: "Code Quality", score: 10, color: "#9ECE6A" },
                { label: "Self-Healing", score: 9, color: "#E0AF68" },
                { label: "Autonomy", score: 9, color: "#7AA2F7" },
              ].map(({ label, score, color }) => (
                <div key={label} style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "0.4vw", padding: "1.5vh 1vw", textAlign: "center" }}>
                  <div style={{ fontSize: "1.8vw", fontWeight: 700, color, fontFamily: "'DM Mono', monospace" }}>{score}</div>
                  <div style={{ fontSize: "0.75vw", color: "#565F89", marginTop: "0.3vh" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2vh" }}>
          <div style={{ fontSize: "0.9vw", color: "#565F89" }}>20</div>
          <div style={{ fontSize: "0.85vw", color: "#565F89" }}>AuRen Research, 2026</div>
        </div>
      </div>
    </div>
  );
}
