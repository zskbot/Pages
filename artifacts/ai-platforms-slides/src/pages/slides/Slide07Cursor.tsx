import DocsSidebar from "../../components/DocsSidebar";

const root: React.CSSProperties = { width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#1A1B26", fontFamily: "'Inter', sans-serif", display: "flex", color: "#C0CAF5", position: "relative" };
const main: React.CSSProperties = { flex: 1, padding: "7vh 5.5vw", display: "flex", flexDirection: "column", overflow: "hidden" };
const code: React.CSSProperties = { backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2.5vh 2vw", border: "1px solid rgba(255,255,255,0.05)", fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", lineHeight: 1.7 };

export default function Slide07Cursor() {
  return (
    <div style={root}>
      <DocsSidebar active="Cursor" />
      <div style={main}>
        <div style={{ fontSize: "0.95vw", color: "#BB9AF7", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: "1.2vh" }}>Platforms</div>
        <div style={{ display: "flex", alignItems: "center", gap: "2vw", marginBottom: "1.5vh" }}>
          <h1 style={{ fontSize: "3.8vw", fontWeight: 700, color: "#FFFFFF", margin: 0, letterSpacing: "-0.02em" }}>Cursor</h1>
          <div style={{ fontSize: "0.85vw", color: "#BB9AF7", backgroundColor: "rgba(187,154,247,0.1)", padding: "0.4vh 1vw", borderRadius: "2vw", fontFamily: "'DM Mono', monospace", border: "1px solid rgba(187,154,247,0.2)" }}>AI-Powered IDE</div>
        </div>
        <div style={{ fontSize: "1.05vw", color: "#565F89", marginBottom: "3vh" }}>Anysphere · Local + Cloud · Closed Source</div>

        <div style={{ display: "flex", gap: "3.5vw", flex: 1 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2.5vh" }}>
            <div>
              <div style={{ fontSize: "1.05vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "1.5vh", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1vh" }}>Platform Profile</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2vh" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Automation Level</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
                    <div style={{ width: "10vw", height: "0.5vh", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{ width: "70%", height: "100%", backgroundColor: "#BB9AF7", borderRadius: "4px" }} />
                    </div>
                    <span style={{ fontSize: "0.9vw", color: "#BB9AF7", fontFamily: "'DM Mono', monospace" }}>70/100</span>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Deployment Type</span>
                  <span style={{ fontSize: "0.9vw", color: "#C0CAF5", fontFamily: "'DM Mono', monospace" }}>local + cloud</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Multi-Model</span>
                  <span style={{ fontSize: "0.9vw", color: "#9ECE6A", fontFamily: "'DM Mono', monospace" }}>true</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Auto Testing</span>
                  <span style={{ fontSize: "0.9vw", color: "#9ECE6A", fontFamily: "'DM Mono', monospace" }}>true</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Self-Healing</span>
                  <span style={{ fontSize: "0.9vw", color: "#9ECE6A", fontFamily: "'DM Mono', monospace" }}>true</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>One-Click Deploy</span>
                  <span style={{ fontSize: "0.9vw", color: "#F7768E", fontFamily: "'DM Mono', monospace" }}>false</span>
                </div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: "1.05vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "1.5vh", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1vh" }}>Key Differentiator</div>
              <p style={{ fontSize: "1.05vw", color: "#9AA5CE", lineHeight: 1.6, margin: 0 }}>
                VS Code fork with deep AI integration at every layer. Local-first ensures privacy; supports GPT-4, Claude, Gemini — developers choose the model per task.
              </p>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "1.05vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "1.5vh", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1vh" }}>Comparison Scores</div>
            <div style={code}>
              <div style={{ color: "#C0CAF5" }}>{`{`}</div>
              <div style={{ paddingLeft: "2vw" }}><span style={{ color: "#7AA2F7" }}>"platform"</span>: <span style={{ color: "#9ECE6A" }}>"Cursor"</span>,</div>
              <div style={{ paddingLeft: "2vw" }}><span style={{ color: "#7AA2F7" }}>"autonomy"</span>: <span style={{ color: "#FF9E64" }}>6</span>,</div>
              <div style={{ paddingLeft: "2vw" }}><span style={{ color: "#7AA2F7" }}>"codeQuality"</span>: <span style={{ color: "#FF9E64" }}>9</span>,</div>
              <div style={{ paddingLeft: "2vw" }}><span style={{ color: "#7AA2F7" }}>"infrastructure"</span>: <span style={{ color: "#FF9E64" }}>4</span>,</div>
              <div style={{ paddingLeft: "2vw" }}><span style={{ color: "#7AA2F7" }}>"selfHealing"</span>: <span style={{ color: "#FF9E64" }}>7</span>,</div>
              <div style={{ paddingLeft: "2vw" }}><span style={{ color: "#7AA2F7" }}>"deploymentEase"</span>: <span style={{ color: "#FF9E64" }}>4</span>,</div>
              <div style={{ paddingLeft: "2vw" }}><span style={{ color: "#7AA2F7" }}>"collaboration"</span>: <span style={{ color: "#FF9E64" }}>6</span></div>
              <div style={{ color: "#C0CAF5" }}>{`}`}</div>
            </div>
            <div style={{ marginTop: "2.5vh", backgroundColor: "rgba(187,154,247,0.06)", borderRadius: "0.5vw", padding: "2vh 2vw", border: "1px solid rgba(187,154,247,0.15)" }}>
              <div style={{ fontSize: "0.95vw", color: "#BB9AF7", fontWeight: 600, marginBottom: "1vh" }}>Best for</div>
              <div style={{ fontSize: "1vw", color: "#9AA5CE", lineHeight: 1.5 }}>Professional developers who want AI assistance without giving up IDE control or model choice.</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2vh" }}>
          <div style={{ fontSize: "0.9vw", color: "#565F89" }}>07</div>
          <div style={{ fontSize: "0.85vw", color: "#565F89" }}>AuRen Research, 2026</div>
        </div>
      </div>
    </div>
  );
}
