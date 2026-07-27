import DocsSidebar from "../../components/DocsSidebar";

const root: React.CSSProperties = { width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#1A1B26", fontFamily: "'Inter', sans-serif", display: "flex", color: "#C0CAF5", position: "relative" };
const main: React.CSSProperties = { flex: 1, padding: "7vh 5.5vw", display: "flex", flexDirection: "column", overflow: "hidden" };
const code: React.CSSProperties = { backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2.2vh 2vw", border: "1px solid rgba(255,255,255,0.05)", fontFamily: "'DM Mono', monospace", fontSize: "0.88vw", lineHeight: 1.65 };

export default function Slide12SelfHealing() {
  return (
    <div style={root}>
      <DocsSidebar active="Self-Healing Loop" />
      <div style={main}>
        <div style={{ fontSize: "0.95vw", color: "#F7768E", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: "1.2vh" }}>Analysis</div>
        <h1 style={{ fontSize: "3.5vw", fontWeight: 700, color: "#FFFFFF", margin: "0 0 1vh 0", letterSpacing: "-0.02em" }}>Self-Healing Debug Loop</h1>
        <p style={{ fontSize: "1.1vw", color: "#9AA5CE", margin: "0 0 3vh 0", lineHeight: 1.5 }}>How autonomous agents detect, diagnose, and fix failures without human intervention.</p>

        <div style={{ display: "flex", gap: "3vw", flex: 1 }}>
          <div style={{ flex: 1.2, display: "flex", flexDirection: "column", gap: "2vh" }}>
            <div style={{ fontSize: "1.05vw", fontWeight: 600, color: "#FFFFFF", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1vh" }}>Loop Mechanics</div>
            <div style={code}>
              <div style={{ color: "#565F89" }}>{"// self-healing loop pseudocode"}</div>
              <div style={{ color: "#BB9AF7" }}>async function<span style={{ color: "#7AA2F7" }}> selfHealingLoop</span>(code) {"{"}</div>
              <div style={{ paddingLeft: "2vw", color: "#C0CAF5" }}>let iteration = <span style={{ color: "#FF9E64" }}>0</span>;</div>
              <div style={{ paddingLeft: "2vw", color: "#BB9AF7" }}>while (iteration &lt; <span style={{ color: "#FF9E64" }}>10</span>) {"{"}</div>
              <div style={{ paddingLeft: "4vw" }}><span style={{ color: "#7AA2F7" }}>const</span> result = <span style={{ color: "#9ECE6A" }}>await run</span>(code);</div>
              <div style={{ paddingLeft: "4vw" }}><span style={{ color: "#BB9AF7" }}>if</span> (result.success) <span style={{ color: "#BB9AF7" }}>return</span> result;</div>
              <div style={{ paddingLeft: "4vw" }}><span style={{ color: "#7AA2F7" }}>const</span> fix = <span style={{ color: "#9ECE6A" }}>await llm.patch</span>(</div>
              <div style={{ paddingLeft: "6vw" }}>code, result.errors</div>
              <div style={{ paddingLeft: "4vw" }}>);</div>
              <div style={{ paddingLeft: "4vw" }}>code = fix; iteration++;</div>
              <div style={{ paddingLeft: "2vw" }}>{"}"}</div>
              <div style={{ paddingLeft: "2vw" }}><span style={{ color: "#BB9AF7" }}>throw</span> <span style={{ color: "#F7768E" }}>new Error</span>(<span style={{ color: "#9ECE6A" }}>"max retries"</span>);</div>
              <div>{"}"}</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5vw" }}>
              <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "1.8vh 1.8vw", border: "1px solid rgba(158,206,106,0.2)" }}>
                <div style={{ fontSize: "0.85vw", color: "#9ECE6A", marginBottom: "0.5vh", fontFamily: "'DM Mono', monospace" }}>Max Iterations</div>
                <div style={{ fontSize: "2.5vw", fontWeight: 700, color: "#FFFFFF" }}>10</div>
              </div>
              <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "1.8vh 1.8vw", border: "1px solid rgba(122,162,247,0.2)" }}>
                <div style={{ fontSize: "0.85vw", color: "#7AA2F7", marginBottom: "0.5vh", fontFamily: "'DM Mono', monospace" }}>Platforms w/ Loop</div>
                <div style={{ fontSize: "2.5vw", fontWeight: 700, color: "#FFFFFF" }}>5 <span style={{ fontSize: "1.2vw", color: "#565F89" }}>/ 7</span></div>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2vh" }}>
            <div style={{ fontSize: "1.05vw", fontWeight: 600, color: "#FFFFFF", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1vh" }}>Mechanism Details</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5vh" }}>
              <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2vh 2vw", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.8vh" }}>
                  <span style={{ fontSize: "1vw", fontWeight: 600, color: "#FFFFFF" }}>Error Detection</span>
                  <span style={{ fontSize: "0.85vw", fontFamily: "'DM Mono', monospace", color: "#9ECE6A" }}>stderr + exit</span>
                </div>
                <div style={{ fontSize: "0.95vw", color: "#9AA5CE", lineHeight: 1.5 }}>Parses stdout/stderr, test runner output, and process exit codes to classify error types.</div>
              </div>
              <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2vh 2vw", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.8vh" }}>
                  <span style={{ fontSize: "1vw", fontWeight: 600, color: "#FFFFFF" }}>Context Injection</span>
                  <span style={{ fontSize: "0.85vw", fontFamily: "'DM Mono', monospace", color: "#E0AF68" }}>re-prompt</span>
                </div>
                <div style={{ fontSize: "0.95vw", color: "#9AA5CE", lineHeight: 1.5 }}>Full error trace + original code injected into the LLM context window for precise patch generation.</div>
              </div>
              <div style={{ backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2vh 2vw", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.8vh" }}>
                  <span style={{ fontSize: "1vw", fontWeight: 600, color: "#FFFFFF" }}>Verification</span>
                  <span style={{ fontSize: "0.85vw", fontFamily: "'DM Mono', monospace", color: "#BB9AF7" }}>re-run + diff</span>
                </div>
                <div style={{ fontSize: "0.95vw", color: "#9AA5CE", lineHeight: 1.5 }}>Each patch is immediately re-executed. A regression check ensures the fix didn't break passing tests.</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2vh" }}>
          <div style={{ fontSize: "0.9vw", color: "#565F89" }}>12</div>
          <div style={{ fontSize: "0.85vw", color: "#565F89" }}>AuRen Research, 2026</div>
        </div>
      </div>
    </div>
  );
}
