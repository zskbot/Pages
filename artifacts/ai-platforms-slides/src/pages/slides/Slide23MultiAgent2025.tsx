import DocsSidebar from "../../components/DocsSidebar";

const root: React.CSSProperties = { width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#1A1B26", fontFamily: "'Inter', sans-serif", display: "flex", color: "#C0CAF5", position: "relative" };
const main: React.CSSProperties = { flex: 1, padding: "7vh 5.5vw", display: "flex", flexDirection: "column", overflow: "hidden" };

export default function Slide23MultiAgent2025() {
  const developments = [
    {
      title: "Agent Specialization",
      color: "#7AA2F7",
      year: "2025 Q1",
      desc: "Claude Code, Codex CLI, and Gemini ship as terminal-native specialists. Each agent excels in a specific domain: reasoning (Claude), open-source (Codex), enterprise context (Gemini).",
      metric: "3 new agents",
    },
    {
      title: "Open-Source Agent Explosion",
      color: "#9ECE6A",
      year: "2025 Q2",
      desc: "OpenAI Codex CLI reaches 60K GitHub stars in 30 days. MIT licensing accelerates community forks, customizations, and self-hosted enterprise deployments worldwide.",
      metric: "60K stars / 30d",
    },
    {
      title: "1M Token Context Wars",
      color: "#BB9AF7",
      year: "2025 Q2–Q3",
      desc: "Google ships 1M token context for Gemini Code Assist. Anthropic responds with extended context Claude Code. Full monorepo understanding becomes the new baseline expectation.",
      metric: "1M token standard",
    },
    {
      title: "Constitutional AI in Dev Tools",
      color: "#E0AF68",
      year: "2025 Q3",
      desc: "Anthropic's constitutional AI framework ships in Claude Code for production use. Safety guardrails prevent agents from writing insecure code, leaking secrets, or making destructive changes.",
      metric: "Safety-first agents",
    },
  ];

  return (
    <div style={root}>
      <DocsSidebar active="Multi-Agent 2025" />
      <div style={main}>
        <div style={{ fontSize: "0.95vw", color: "#E0AF68", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: "1.2vh", display: "flex", alignItems: "center", gap: "0.8vw" }}>
          <span style={{ backgroundColor: "#E0AF68", color: "#1A1B26", fontSize: "0.7vw", fontWeight: 700, padding: "0.2vh 0.5vw", borderRadius: "0.2vw" }}>2025 UPDATE</span>
          Analysis
        </div>
        <h1 style={{ fontSize: "3.4vw", fontWeight: 700, color: "#FFFFFF", margin: "0 0 0.8vh 0", letterSpacing: "-0.02em" }}>The 2025 Agent Wave</h1>
        <p style={{ fontSize: "1.1vw", color: "#9AA5CE", margin: "0 0 3vh 0", maxWidth: "55vw" }}>
          Three major platforms launched in 2025, reshaping the competitive landscape with open-source agents, constitutional AI safety, and 1M-token context windows.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2vh 3vw", flex: 1 }}>
          {developments.map(({ title, color, year, desc, metric }) => (
            <div key={title} style={{ backgroundColor: "rgba(255,255,255,0.02)", border: `1px solid ${color}22`, borderLeft: `3px solid ${color}`, borderRadius: "0.5vw", padding: "2.5vh 2vw", display: "flex", flexDirection: "column", gap: "1vh" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#FFFFFF" }}>{title}</div>
                <div style={{ fontSize: "0.75vw", color, backgroundColor: `${color}15`, padding: "0.2vh 0.6vw", borderRadius: "0.2vw", fontFamily: "'DM Mono', monospace" }}>{year}</div>
              </div>
              <p style={{ fontSize: "0.9vw", color: "#9AA5CE", lineHeight: 1.6, margin: 0, flex: 1 }}>{desc}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5vw", paddingTop: "0.5vh", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ width: "0.5vw", height: "0.5vw", borderRadius: "50%", backgroundColor: color, display: "inline-block" }} />
                <span style={{ fontSize: "0.85vw", color, fontFamily: "'DM Mono', monospace", fontWeight: 600 }}>{metric}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2vh" }}>
          <div style={{ fontSize: "0.9vw", color: "#565F89" }}>23</div>
          <div style={{ fontSize: "0.85vw", color: "#565F89" }}>AuRen Research, 2026</div>
        </div>
      </div>
    </div>
  );
}
