import DocsSidebar from "../../components/DocsSidebar";

const root: React.CSSProperties = { width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#1A1B26", fontFamily: "'Inter', sans-serif", display: "flex", color: "#C0CAF5", position: "relative" };
const main: React.CSSProperties = { flex: 1, padding: "7vh 5.5vw", display: "flex", flexDirection: "column", overflow: "hidden" };
const code: React.CSSProperties = { backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2.5vh 2vw", border: "1px solid rgba(255,255,255,0.05)", fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", lineHeight: 1.7 };

export default function Slide05Copilot() {
  return (
    <div style={root}>
      <DocsSidebar active="Copilot Workspace" />
      <div style={main}>
        <div style={{ fontSize: "0.95vw", color: "#9ECE6A", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: "1.2vh" }}>Platforms</div>
        <div style={{ display: "flex", alignItems: "center", gap: "2vw", marginBottom: "1.5vh" }}>
          <h1 style={{ fontSize: "3.2vw", fontWeight: 700, color: "#FFFFFF", margin: 0, letterSpacing: "-0.02em" }}>Copilot Workspace</h1>
          <div style={{ fontSize: "0.85vw", color: "#9ECE6A", backgroundColor: "rgba(158,206,106,0.1)", padding: "0.4vh 1vw", borderRadius: "2vw", fontFamily: "'DM Mono', monospace", border: "1px solid rgba(158,206,106,0.2)" }}>Copilot Agent</div>
        </div>
        <div style={{ fontSize: "1.05vw", color: "#565F89", marginBottom: "3vh" }}>Microsoft / GitHub · Cloud SaaS · Closed Source</div>

        <div style={{ display: "flex", gap: "3.5vw", flex: 1 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2.5vh" }}>
            <div>
              <div style={{ fontSize: "1.05vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "1.5vh", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1vh" }}>Platform Profile</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2vh" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Automation Level</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
                    <div style={{ width: "10vw", height: "0.5vh", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{ width: "75%", height: "100%", backgroundColor: "#9ECE6A", borderRadius: "4px" }} />
                    </div>
                    <span style={{ fontSize: "0.9vw", color: "#9ECE6A", fontFamily: "'DM Mono', monospace" }}>75/100</span>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Deployment Type</span>
                  <span style={{ fontSize: "0.9vw", color: "#C0CAF5", fontFamily: "'DM Mono', monospace" }}>cloud</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Open Source</span>
                  <span style={{ fontSize: "0.9vw", color: "#F7768E", fontFamily: "'DM Mono', monospace" }}>false</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>CI/CD Integration</span>
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
              </div>
            </div>

            <div>
              <div style={{ fontSize: "1.05vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "1.5vh", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1vh" }}>Key Differentiator</div>
              <p style={{ fontSize: "1.05vw", color: "#9AA5CE", lineHeight: 1.6, margin: 0 }}>
                Native GitHub integration enables a seamless issue-to-PR pipeline. Works directly within VS Code and the GitHub web interface — no context switching required.
              </p>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "1.05vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "1.5vh", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1vh" }}>API Response</div>
            <div style={code}>
              <div style={{ color: "#C0CAF5" }}>{`{`}</div>
              <div style={{ paddingLeft: "2vw" }}><span style={{ color: "#7AA2F7" }}>"id"</span>: <span style={{ color: "#9ECE6A" }}>"copilot-workspace"</span>,</div>
              <div style={{ paddingLeft: "2vw" }}><span style={{ color: "#7AA2F7" }}>"name"</span>: <span style={{ color: "#9ECE6A" }}>"GitHub Copilot Workspace"</span>,</div>
              <div style={{ paddingLeft: "2vw" }}><span style={{ color: "#7AA2F7" }}>"company"</span>: <span style={{ color: "#9ECE6A" }}>"Microsoft / GitHub"</span>,</div>
              <div style={{ paddingLeft: "2vw" }}><span style={{ color: "#7AA2F7" }}>"type"</span>: <span style={{ color: "#9ECE6A" }}>"copilot_agent"</span>,</div>
              <div style={{ paddingLeft: "2vw" }}><span style={{ color: "#7AA2F7" }}>"automationLevel"</span>: <span style={{ color: "#FF9E64" }}>75</span>,</div>
              <div style={{ paddingLeft: "2vw" }}><span style={{ color: "#7AA2F7" }}>"ciCdIntegration"</span>: <span style={{ color: "#9ECE6A" }}>true</span>,</div>
              <div style={{ paddingLeft: "2vw" }}><span style={{ color: "#7AA2F7" }}>"autoTesting"</span>: <span style={{ color: "#9ECE6A" }}>true</span>,</div>
              <div style={{ paddingLeft: "2vw" }}><span style={{ color: "#7AA2F7" }}>"oneClickDeploy"</span>: <span style={{ color: "#F7768E" }}>false</span>,</div>
              <div style={{ paddingLeft: "2vw" }}><span style={{ color: "#7AA2F7" }}>"multiAgent"</span>: <span style={{ color: "#F7768E" }}>false</span></div>
              <div style={{ color: "#C0CAF5" }}>{`}`}</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2vh" }}>
          <div style={{ fontSize: "0.9vw", color: "#565F89" }}>05</div>
          <div style={{ fontSize: "0.85vw", color: "#565F89" }}>AuRen Research, 2026</div>
        </div>
      </div>
    </div>
  );
}
