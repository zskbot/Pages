import DocsSidebar from "../../components/DocsSidebar";

const root: React.CSSProperties = { width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#1A1B26", fontFamily: "'Inter', sans-serif", display: "flex", color: "#C0CAF5", position: "relative" };
const main: React.CSSProperties = { flex: 1, padding: "7vh 5.5vw", display: "flex", flexDirection: "column", overflow: "hidden" };

const platforms = ["Devin", "Copilot", "Replit", "Cursor", "Bolt", "v0.dev", "OpenClaw"];
const features = [
  { label: "Auto Testing", key: "autoTest", vals: [true, true, true, true, false, false, false] },
  { label: "Self-Healing", key: "selfHeal", vals: [true, true, true, true, true, false, true] },
  { label: "CI/CD", key: "cicd", vals: [true, true, false, false, false, false, true] },
  { label: "Multi-Agent", key: "multi", vals: [true, false, false, false, false, false, true] },
  { label: "Infra Provision", key: "infra", vals: [true, false, true, false, false, false, false] },
  { label: "One-Click Deploy", key: "deploy", vals: [false, false, true, false, false, true, false] },
  { label: "No-Code UI", key: "nocode", vals: [false, false, true, false, true, true, false] },
  { label: "Open Source", key: "oss", vals: [false, false, false, false, false, false, true] },
  { label: "Multi-Model", key: "models", vals: [false, false, false, true, false, false, true] },
];

function Check({ val }: { val: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: "1.1vw", height: "1.1vw", borderRadius: "0.25vw", backgroundColor: val ? "rgba(158,206,106,0.15)" : "rgba(255,255,255,0.03)", border: `1px solid ${val ? "rgba(158,206,106,0.4)" : "rgba(255,255,255,0.06)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {val && <div style={{ fontSize: "0.8vw", color: "#9ECE6A", fontWeight: 700, lineHeight: 1 }}>✓</div>}
      </div>
    </div>
  );
}

export default function Slide13Features() {
  return (
    <div style={root}>
      <DocsSidebar active="Feature Matrix" />
      <div style={main}>
        <div style={{ fontSize: "0.95vw", color: "#9ECE6A", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: "1.2vh" }}>Analysis</div>
        <h1 style={{ fontSize: "3.5vw", fontWeight: 700, color: "#FFFFFF", margin: "0 0 1vh 0", letterSpacing: "-0.02em" }}>Feature Matrix</h1>
        <p style={{ fontSize: "1.1vw", color: "#9AA5CE", margin: "0 0 2.5vh 0", lineHeight: 1.5 }}>9 capability dimensions across all 7 platforms.</p>

        <div style={{ flex: 1, backgroundColor: "#16161E", borderRadius: "0.5vw", border: "1px solid rgba(255,255,255,0.05)", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "14vw repeat(7, 1fr)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "1.5vh 2vw" }}>
            <div style={{ fontSize: "0.85vw", color: "#565F89", fontWeight: 600 }}>Feature</div>
            {platforms.map(p => (
              <div key={p} style={{ fontSize: "0.85vw", color: "#7AA2F7", fontWeight: 600, textAlign: "center", fontFamily: "'DM Mono', monospace" }}>{p}</div>
            ))}
          </div>
          {features.map((feat, fi) => (
            <div key={feat.key} style={{ display: "grid", gridTemplateColumns: "14vw repeat(7, 1fr)", padding: "1.4vh 2vw", backgroundColor: fi % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent", borderBottom: fi < features.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
              <div style={{ fontSize: "0.95vw", color: "#C0CAF5", display: "flex", alignItems: "center" }}>{feat.label}</div>
              {feat.vals.map((v, vi) => (
                <Check key={vi} val={v} />
              ))}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2vh" }}>
          <div style={{ fontSize: "0.9vw", color: "#565F89" }}>13</div>
          <div style={{ fontSize: "0.85vw", color: "#565F89" }}>AuRen Research, 2026</div>
        </div>
      </div>
    </div>
  );
}
