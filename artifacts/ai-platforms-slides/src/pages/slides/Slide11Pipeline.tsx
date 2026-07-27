import DocsSidebar from "../../components/DocsSidebar";

const root: React.CSSProperties = { width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#1A1B26", fontFamily: "'Inter', sans-serif", display: "flex", color: "#C0CAF5", position: "relative" };
const main: React.CSSProperties = { flex: 1, padding: "7vh 5.5vw", display: "flex", flexDirection: "column", overflow: "hidden" };

export default function Slide11Pipeline() {
  const steps = [
    { id: "01", label: "Generate", desc: "Agent writes code from spec or prompt", color: "#7AA2F7", method: "POST", path: "/pipeline/generate" },
    { id: "02", label: "Run", desc: "Execute in isolated sandbox environment", color: "#9ECE6A", method: "POST", path: "/pipeline/run" },
    { id: "03", label: "Detect", desc: "Parse stderr, exit codes, test failures", color: "#E0AF68", method: "GET", path: "/pipeline/errors" },
    { id: "04", label: "Patch", desc: "Re-prompt with error context, apply fix", color: "#BB9AF7", method: "POST", path: "/pipeline/patch" },
    { id: "05", label: "Rerun", desc: "Verify fix passes, loop up to N times", color: "#F7768E", method: "POST", path: "/pipeline/rerun" },
  ];

  return (
    <div style={root}>
      <DocsSidebar active="Pipeline" />
      <div style={main}>
        <div style={{ fontSize: "0.95vw", color: "#7AA2F7", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: "1.2vh" }}>Analysis</div>
        <h1 style={{ fontSize: "3.8vw", fontWeight: 700, color: "#FFFFFF", margin: "0 0 1vh 0", letterSpacing: "-0.02em" }}>Automation Pipeline</h1>
        <p style={{ fontSize: "1.15vw", color: "#9AA5CE", margin: "0 0 3.5vh 0", lineHeight: 1.5 }}>The 5-stage loop that powers autonomous code generation, execution, and self-correction.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.4vh", flex: 1 }}>
          {steps.map((step, i) => (
            <div key={step.id} style={{ display: "flex", alignItems: "stretch", gap: "2vw" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "2.5vw" }}>
                <div style={{ width: "2.5vw", height: "2.5vw", borderRadius: "50%", backgroundColor: `${step.color}18`, border: `1px solid ${step.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85vw", fontWeight: 700, color: step.color, fontFamily: "'DM Mono', monospace", flexShrink: 0 }}>{step.id}</div>
                {i < steps.length - 1 && <div style={{ width: "1px", flex: 1, backgroundColor: "rgba(255,255,255,0.07)", marginTop: "0.4vh" }} />}
              </div>
              <div style={{ flex: 1, backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2vh 2.5vw", border: `1px solid ${step.color}22`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "1.25vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "0.4vh" }}>{step.label}</div>
                  <div style={{ fontSize: "1vw", color: "#9AA5CE" }}>{step.desc}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1vw", flexShrink: 0 }}>
                  <div style={{ fontSize: "0.8vw", fontWeight: 700, color: step.color, backgroundColor: `${step.color}15`, padding: "0.4vh 0.8vw", borderRadius: "0.3vw", fontFamily: "'DM Mono', monospace" }}>{step.method}</div>
                  <div style={{ fontSize: "0.85vw", color: "#565F89", fontFamily: "'DM Mono', monospace" }}>{step.path}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2.5vh" }}>
          <div style={{ fontSize: "0.9vw", color: "#565F89" }}>11</div>
          <div style={{ fontSize: "0.85vw", color: "#565F89" }}>AuRen Research, 2026</div>
        </div>
      </div>
    </div>
  );
}
