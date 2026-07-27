import DocsSidebar from "../../components/DocsSidebar";

const root: React.CSSProperties = { width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#1A1B26", fontFamily: "'Inter', sans-serif", display: "flex", color: "#C0CAF5", position: "relative" };
const main: React.CSSProperties = { flex: 1, padding: "7vh 5.5vw", display: "flex", flexDirection: "column", overflow: "hidden" };

export default function Slide22GeminiCode() {
  const features = [
    { label: "Context Window",    value: "1M tokens",        color: "#7AA2F7" },
    { label: "IDE Support",       value: "VS Code + JetBrains", color: "#BB9AF7" },
    { label: "GCP Integration",   value: "Native",            color: "#9ECE6A" },
    { label: "Enterprise Auth",   value: "SSO + VPC-SC",      color: "#E0AF68" },
    { label: "Code Review",       value: "AI-assisted PRs",  color: "#F7768E" },
    { label: "Multi-language",    value: "55+ languages",    color: "#7AA2F7" },
  ];

  return (
    <div style={root}>
      <DocsSidebar active="Gemini Code Assist" />
      <div style={main}>
        <div style={{ fontSize: "0.95vw", color: "#BB9AF7", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: "1.2vh", display: "flex", alignItems: "center", gap: "0.8vw" }}>
          <span style={{ backgroundColor: "#BB9AF7", color: "#1A1B26", fontSize: "0.7vw", fontWeight: 700, padding: "0.2vh 0.5vw", borderRadius: "0.2vw" }}>NEW 2025</span>
          Platforms
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "2vw", marginBottom: "1.5vh" }}>
          <h1 style={{ fontSize: "3.8vw", fontWeight: 700, color: "#FFFFFF", margin: 0, letterSpacing: "-0.02em" }}>Gemini Code Assist</h1>
          <div style={{ fontSize: "0.85vw", color: "#BB9AF7", backgroundColor: "rgba(187,154,247,0.1)", padding: "0.4vh 1vw", borderRadius: "2vw", fontFamily: "'DM Mono', monospace", border: "1px solid rgba(187,154,247,0.2)" }}>Enterprise AI IDE</div>
        </div>
        <div style={{ fontSize: "1.05vw", color: "#565F89", marginBottom: "3vh" }}>Google · Cloud SaaS · Closed Source · Enterprise-grade · 2025</div>

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
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Context</span>
                  <span style={{ fontSize: "0.9vw", color: "#9ECE6A", fontFamily: "'DM Mono', monospace" }}>1,000,000 tokens</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Deployment</span>
                  <span style={{ fontSize: "0.9vw", color: "#C0CAF5", fontFamily: "'DM Mono', monospace" }}>Cloud SaaS</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>GCP Integration</span>
                  <span style={{ fontSize: "0.9vw", color: "#9ECE6A", fontFamily: "'DM Mono', monospace" }}>true</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Multi-IDE</span>
                  <span style={{ fontSize: "0.9vw", color: "#9ECE6A", fontFamily: "'DM Mono', monospace" }}>true</span>
                </div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: "1.05vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "1.5vh", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1vh" }}>Key Differentiator</div>
              <p style={{ fontSize: "1.05vw", color: "#9AA5CE", lineHeight: 1.6, margin: 0 }}>
                World's largest context window at 1M tokens — entire monorepos fit in a single pass. Enterprise-grade with VPC-SC, SSO, and native GCP deployment. Unique Workspace integration for non-developers.
              </p>
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2vh" }}>
            <div>
              <div style={{ fontSize: "1.05vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "1.5vh", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1vh" }}>Feature Set</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1vh" }}>
                {features.map(({ label, value, color }) => (
                  <div key={label} style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "0.4vw", padding: "1.2vh 1vw" }}>
                    <div style={{ fontSize: "0.75vw", color: "#565F89", marginBottom: "0.3vh", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</div>
                    <div style={{ fontSize: "0.9vw", color, fontFamily: "'DM Mono', monospace", fontWeight: 500 }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: "rgba(187,154,247,0.05)", border: "1px solid rgba(187,154,247,0.15)", borderRadius: "0.4vw", padding: "1.5vh 1.5vw" }}>
              <div style={{ fontSize: "0.85vw", color: "#BB9AF7", fontWeight: 600, marginBottom: "1vh" }}>1M Token Context — What It Enables</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6vh" }}>
                {[
                  "Full monorepo understanding in one shot",
                  "Cross-file refactoring without chunking",
                  "Legacy codebase migration at scale",
                  "End-to-end test generation for large systems",
                ].map((item) => (
                  <div key={item} style={{ fontSize: "0.85vw", color: "#9AA5CE", display: "flex", alignItems: "flex-start", gap: "0.5vw" }}>
                    <span style={{ color: "#BB9AF7", flexShrink: 0 }}>→</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2vh" }}>
          <div style={{ fontSize: "0.9vw", color: "#565F89" }}>22</div>
          <div style={{ fontSize: "0.85vw", color: "#565F89" }}>AuRen Research, 2026</div>
        </div>
      </div>
    </div>
  );
}
