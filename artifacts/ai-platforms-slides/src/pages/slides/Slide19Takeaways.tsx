import DocsSidebar from "../../components/DocsSidebar";

const root: React.CSSProperties = { width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#1A1B26", fontFamily: "'Inter', sans-serif", display: "flex", color: "#C0CAF5", position: "relative" };

export default function Slide19Takeaways() {
  return (
    <div style={root}>
      <DocsSidebar active="Key Takeaways" />
      <div style={{ flex: 1, padding: "0", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 65% 40%, rgba(122,162,247,0.08) 0%, transparent 60%)" }} />

        <div style={{ flex: 1, padding: "8vh 6vw", display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "0.95vw", color: "#7AA2F7", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: "1.2vh" }}>Analysis</div>
          <h1 style={{ fontSize: "3.8vw", fontWeight: 700, color: "#FFFFFF", margin: "0 0 4vh 0", letterSpacing: "-0.02em" }}>Key Takeaways</h1>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.2vh", flex: 1 }}>
            <div style={{ backgroundColor: "rgba(122,162,247,0.06)", borderRadius: "0.5vw", padding: "3vh 3vw", border: "1px solid rgba(122,162,247,0.2)", display: "flex", gap: "2.5vw", alignItems: "center" }}>
              <div style={{ fontSize: "3.5vw", fontWeight: 700, color: "#7AA2F7", flexShrink: 0, fontFamily: "'DM Mono', monospace" }}>01</div>
              <div>
                <div style={{ fontSize: "1.3vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "0.8vh" }}>Autonomy is now table stakes, not a differentiator</div>
                <div style={{ fontSize: "1.05vw", color: "#9AA5CE", lineHeight: 1.55 }}>All 7 platforms offer some level of agent-driven code generation. The competitive frontier has moved to self-healing loops, infra provisioning, and multi-agent orchestration.</div>
              </div>
            </div>

            <div style={{ backgroundColor: "rgba(158,206,106,0.06)", borderRadius: "0.5vw", padding: "3vh 3vw", border: "1px solid rgba(158,206,106,0.2)", display: "flex", gap: "2.5vw", alignItems: "center" }}>
              <div style={{ fontSize: "3.5vw", fontWeight: 700, color: "#9ECE6A", flexShrink: 0, fontFamily: "'DM Mono', monospace" }}>02</div>
              <div>
                <div style={{ fontSize: "1.3vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "0.8vh" }}>Data residency is the deciding factor for enterprise</div>
                <div style={{ fontSize: "1.05vw", color: "#9AA5CE", lineHeight: 1.55 }}>OpenClaw is the only platform supporting true air-gapped deployment. For regulated industries, this makes it the only viable option regardless of feature gaps.</div>
              </div>
            </div>

            <div style={{ backgroundColor: "rgba(224,175,104,0.06)", borderRadius: "0.5vw", padding: "3vh 3vw", border: "1px solid rgba(224,175,104,0.2)", display: "flex", gap: "2.5vw", alignItems: "center" }}>
              <div style={{ fontSize: "3.5vw", fontWeight: 700, color: "#E0AF68", flexShrink: 0, fontFamily: "'DM Mono', monospace" }}>03</div>
              <div>
                <div style={{ fontSize: "1.3vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "0.8vh" }}>Specialization outperforms generalism for frontend</div>
                <div style={{ fontSize: "1.05vw", color: "#9AA5CE", lineHeight: 1.55 }}>v0.dev and Bolt.new demonstrate that narrow focus on React/Next.js yields superior UI quality compared to general-purpose agents trying to cover the full stack.</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "3vh", paddingTop: "3vh", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: "0.9vw", color: "#565F89" }}>19</div>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5vw" }}>
              <div style={{ width: "1.5vw", height: "1.5vw", backgroundColor: "#7AA2F7", borderRadius: "0.3vw" }} />
              <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#FFFFFF" }}>AuRen Research, 2026</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
