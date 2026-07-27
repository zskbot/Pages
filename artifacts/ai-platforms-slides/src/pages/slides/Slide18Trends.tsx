import DocsSidebar from "../../components/DocsSidebar";

const root: React.CSSProperties = { width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#1A1B26", fontFamily: "'Inter', sans-serif", display: "flex", color: "#C0CAF5", position: "relative" };
const main: React.CSSProperties = { flex: 1, padding: "7vh 5.5vw", display: "flex", flexDirection: "column", overflow: "hidden" };

export default function Slide18Trends() {
  const trends = [
    {
      year: "2024",
      color: "#7AA2F7",
      title: "Agent Emergence",
      desc: "Devin AI demonstrates fully autonomous development for the first time. The shift from copilot to agent begins. Teams start experimenting with prompt-to-deploy workflows.",
      tag: "foundation"
    },
    {
      year: "2024–25",
      color: "#9ECE6A",
      title: "Self-Healing Becomes Standard",
      desc: "5 of 7 major platforms ship self-healing debug loops. Error→Patch→Rerun cycles reduce human debugging time by removing manual intervention from failure paths.",
      tag: "capability"
    },
    {
      year: "2025",
      color: "#E0AF68",
      title: "Multi-Model and Local LLMs",
      desc: "Cursor pioneers multi-model switching. OpenClaw enables Ollama-backed local inference. Teams gain cost control and model flexibility without vendor lock-in.",
      tag: "flexibility"
    },
    {
      year: "2025–26",
      color: "#BB9AF7",
      title: "Infra Provisioning as a Feature",
      desc: "Replit Agent and Devin expand beyond code into infrastructure — databases, environment secrets, deployment pipelines. The \"prompt to production\" promise materializes.",
      tag: "expansion"
    },
  ];

  return (
    <div style={root}>
      <DocsSidebar active="Trends 2024–2026" />
      <div style={main}>
        <div style={{ fontSize: "0.95vw", color: "#E0AF68", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: "1.2vh" }}>Analysis</div>
        <h1 style={{ fontSize: "3.5vw", fontWeight: 700, color: "#FFFFFF", margin: "0 0 1vh 0", letterSpacing: "-0.02em" }}>Trends 2024–2026</h1>
        <p style={{ fontSize: "1.1vw", color: "#9AA5CE", margin: "0 0 3vh 0" }}>Four shifts that defined the AI-autonomous development era.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.6vh", flex: 1 }}>
          {trends.map((t) => (
            <div key={t.title} style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2vh 2.5vw", border: `1px solid ${t.color}25`, display: "flex", gap: "3vw", alignItems: "center" }}>
              <div style={{ flexShrink: 0, width: "7vw" }}>
                <div style={{ fontSize: "0.8vw", color: "#565F89", fontFamily: "'DM Mono', monospace", marginBottom: "0.4vh" }}>{t.year}</div>
                <div style={{ fontSize: "0.75vw", color: t.color, backgroundColor: `${t.color}15`, padding: "0.3vh 0.7vw", borderRadius: "2vw", fontFamily: "'DM Mono', monospace", display: "inline-block" }}>{t.tag}</div>
              </div>
              <div style={{ width: "1px", height: "5vh", backgroundColor: `${t.color}40`, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: "1.2vw", fontWeight: 600, color: t.color, marginBottom: "0.6vh" }}>{t.title}</div>
                <div style={{ fontSize: "1vw", color: "#9AA5CE", lineHeight: 1.55 }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2.5vh" }}>
          <div style={{ fontSize: "0.9vw", color: "#565F89" }}>18</div>
          <div style={{ fontSize: "0.85vw", color: "#565F89" }}>AuRen Research, 2026</div>
        </div>
      </div>
    </div>
  );
}
