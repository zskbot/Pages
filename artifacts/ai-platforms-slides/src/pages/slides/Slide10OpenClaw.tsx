import DocsSidebar from "../../components/DocsSidebar";

const root: React.CSSProperties = { width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#1A1B26", fontFamily: "'Inter', sans-serif", display: "flex", color: "#C0CAF5", position: "relative" };
const main: React.CSSProperties = { flex: 1, padding: "7vh 5.5vw", display: "flex", flexDirection: "column", overflow: "hidden" };
const code: React.CSSProperties = { backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2.5vh 2vw", border: "1px solid rgba(255,255,255,0.05)", fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", lineHeight: 1.7 };

export default function Slide10OpenClaw() {
  return (
    <div style={root}>
      <DocsSidebar active="OpenClaw" />
      <div style={main}>
        <div style={{ fontSize: "0.95vw", color: "#9ECE6A", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: "1.2vh" }}>Platforms</div>
        <div style={{ display: "flex", alignItems: "center", gap: "2vw", marginBottom: "1.5vh" }}>
          <h1 style={{ fontSize: "3.8vw", fontWeight: 700, color: "#FFFFFF", margin: 0, letterSpacing: "-0.02em" }}>OpenClaw</h1>
          <div style={{ fontSize: "0.85vw", color: "#9ECE6A", backgroundColor: "rgba(158,206,106,0.1)", padding: "0.4vh 1vw", borderRadius: "2vw", fontFamily: "'DM Mono', monospace", border: "1px solid rgba(158,206,106,0.2)" }}>Self-Hosted Agent</div>
          <div style={{ fontSize: "0.85vw", color: "#BB9AF7", backgroundColor: "rgba(187,154,247,0.1)", padding: "0.4vh 1vw", borderRadius: "2vw", fontFamily: "'DM Mono', monospace", border: "1px solid rgba(187,154,247,0.2)" }}>Open Source</div>
        </div>
        <div style={{ fontSize: "1.05vw", color: "#565F89", marginBottom: "3vh" }}>Open Source Community · Self-Hosted · MIT License</div>

        <div style={{ display: "flex", gap: "3.5vw", flex: 1 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2.5vh" }}>
            <div>
              <div style={{ fontSize: "1.05vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "1.5vh", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1vh" }}>Platform Profile</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2vh" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Automation Level</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
                    <div style={{ width: "10vw", height: "0.5vh", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{ width: "55%", height: "100%", backgroundColor: "#9ECE6A", borderRadius: "4px" }} />
                    </div>
                    <span style={{ fontSize: "0.9vw", color: "#9ECE6A", fontFamily: "'DM Mono', monospace" }}>55/100</span>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Open Source</span>
                  <span style={{ fontSize: "0.9vw", color: "#9ECE6A", fontFamily: "'DM Mono', monospace" }}>true (MIT)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Self-Hosted</span>
                  <span style={{ fontSize: "0.9vw", color: "#9ECE6A", fontFamily: "'DM Mono', monospace" }}>true</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Multi-Model</span>
                  <span style={{ fontSize: "0.9vw", color: "#9ECE6A", fontFamily: "'DM Mono', monospace" }}>true</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Multi-Agent</span>
                  <span style={{ fontSize: "0.9vw", color: "#9ECE6A", fontFamily: "'DM Mono', monospace" }}>true</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Data leaves your infra</span>
                  <span style={{ fontSize: "0.9vw", color: "#9ECE6A", fontFamily: "'DM Mono', monospace" }}>never</span>
                </div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: "1.05vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "1.5vh", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1vh" }}>Key Differentiator</div>
              <p style={{ fontSize: "1.05vw", color: "#9AA5CE", lineHeight: 1.6, margin: 0 }}>
                The only fully self-hosted option in this study — code and data never leave your infrastructure. Supports any compatible LLM backend including local Ollama models.
              </p>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "1.05vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "1.5vh", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1vh" }}>Self-Host Configuration</div>
            <div style={code}>
              <div style={{ color: "#565F89", marginBottom: "0.5vh" }}>{"# docker-compose.yml"}</div>
              <div><span style={{ color: "#BB9AF7" }}>services</span>:</div>
              <div style={{ paddingLeft: "2vw" }}><span style={{ color: "#7AA2F7" }}>openclaw</span>:</div>
              <div style={{ paddingLeft: "4vw" }}><span style={{ color: "#9ECE6A" }}>image</span>: <span style={{ color: "#E0AF68" }}>openclaw/agent:latest</span></div>
              <div style={{ paddingLeft: "4vw" }}><span style={{ color: "#9ECE6A" }}>environment</span>:</div>
              <div style={{ paddingLeft: "6vw" }}>- <span style={{ color: "#7DCFFF" }}>LLM_BACKEND</span>=ollama</div>
              <div style={{ paddingLeft: "6vw" }}>- <span style={{ color: "#7DCFFF" }}>MODEL</span>=codellama:34b</div>
              <div style={{ paddingLeft: "6vw" }}>- <span style={{ color: "#7DCFFF" }}>MULTI_AGENT</span>=true</div>
            </div>
            <div style={{ marginTop: "2.5vh", backgroundColor: "rgba(158,206,106,0.06)", borderRadius: "0.5vw", padding: "2vh 2vw", border: "1px solid rgba(158,206,106,0.15)" }}>
              <div style={{ fontSize: "0.95vw", color: "#9ECE6A", fontWeight: 600, marginBottom: "1vh" }}>Best for</div>
              <div style={{ fontSize: "1vw", color: "#9AA5CE", lineHeight: 1.5 }}>Regulated industries, air-gapped environments, and teams with strict data residency requirements.</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2vh" }}>
          <div style={{ fontSize: "0.9vw", color: "#565F89" }}>10</div>
          <div style={{ fontSize: "0.85vw", color: "#565F89" }}>AuRen Research, 2026</div>
        </div>
      </div>
    </div>
  );
}
