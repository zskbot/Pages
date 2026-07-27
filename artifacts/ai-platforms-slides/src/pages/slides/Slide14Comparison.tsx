import DocsSidebar from "../../components/DocsSidebar";

const root: React.CSSProperties = { width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#1A1B26", fontFamily: "'Inter', sans-serif", display: "flex", color: "#C0CAF5", position: "relative" };
const main: React.CSSProperties = { flex: 1, padding: "7vh 5.5vw", display: "flex", flexDirection: "column", overflow: "hidden" };

const data = [
  { platform: "Devin AI", scores: [9, 7, 8, 9, 7, 6], color: "#7AA2F7" },
  { platform: "Copilot WS", scores: [7, 8, 6, 7, 8, 7], color: "#9ECE6A" },
  { platform: "Replit Agent", scores: [8, 7, 9, 8, 9, 6], color: "#E0AF68" },
  { platform: "Cursor", scores: [6, 9, 4, 7, 4, 6], color: "#BB9AF7" },
  { platform: "Bolt.new", scores: [7, 7, 6, 6, 7, 5], color: "#F7768E" },
  { platform: "v0.dev", scores: [5, 8, 4, 3, 8, 4], color: "#7DCFFF" },
  { platform: "OpenClaw", scores: [5, 6, 5, 6, 4, 7], color: "#9ECE6A" },
];
const dims = ["Autonomy", "Code Quality", "Infrastructure", "Self-Healing", "Deploy Ease", "Collaboration"];

function ScoreBar({ val, color }: { val: number; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
      <div style={{ flex: 1, height: "0.5vh", backgroundColor: "rgba(255,255,255,0.07)", borderRadius: "4px", overflow: "hidden" }}>
        <div style={{ width: `${val * 10}%`, height: "100%", backgroundColor: color, borderRadius: "4px" }} />
      </div>
      <span style={{ fontSize: "0.85vw", color, fontFamily: "'DM Mono', monospace", width: "1.5vw", textAlign: "right" }}>{val}</span>
    </div>
  );
}

export default function Slide14Comparison() {
  return (
    <div style={root}>
      <DocsSidebar active="Comparison Scores" />
      <div style={main}>
        <div style={{ fontSize: "0.95vw", color: "#7DCFFF", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: "1.2vh" }}>Analysis</div>
        <h1 style={{ fontSize: "3.5vw", fontWeight: 700, color: "#FFFFFF", margin: "0 0 1vh 0", letterSpacing: "-0.02em" }}>Comparison Scores</h1>
        <p style={{ fontSize: "1.1vw", color: "#9AA5CE", margin: "0 0 2.5vh 0" }}>Six dimensions scored 1–10 per platform. Higher is better.</p>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.2vh" }}>
          <div style={{ display: "grid", gridTemplateColumns: "12vw repeat(6, 1fr)", gap: "0.8vw", marginBottom: "0.5vh" }}>
            <div />
            {dims.map(d => (
              <div key={d} style={{ fontSize: "0.78vw", color: "#565F89", textAlign: "center", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{d}</div>
            ))}
          </div>
          {data.map((row) => (
            <div key={row.platform} style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "1.5vh 2vw", border: "1px solid rgba(255,255,255,0.04)", display: "grid", gridTemplateColumns: "12vw repeat(6, 1fr)", gap: "0.8vw", alignItems: "center" }}>
              <div style={{ fontSize: "0.95vw", fontWeight: 600, color: row.color }}>{row.platform}</div>
              {row.scores.map((s, si) => (
                <ScoreBar key={si} val={s} color={row.color} />
              ))}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2vh" }}>
          <div style={{ fontSize: "0.9vw", color: "#565F89" }}>14</div>
          <div style={{ fontSize: "0.85vw", color: "#565F89" }}>AuRen Research, 2026</div>
        </div>
      </div>
    </div>
  );
}
