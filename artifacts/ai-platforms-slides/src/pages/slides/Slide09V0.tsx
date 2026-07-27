import DocsSidebar from "../../components/DocsSidebar";

const root: React.CSSProperties = { width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#1A1B26", fontFamily: "'Inter', sans-serif", display: "flex", color: "#C0CAF5", position: "relative" };
const main: React.CSSProperties = { flex: 1, padding: "7vh 5.5vw", display: "flex", flexDirection: "column", overflow: "hidden" };
const code: React.CSSProperties = { backgroundColor: "#16161E", borderRadius: "0.5vw", padding: "2.5vh 2vw", border: "1px solid rgba(255,255,255,0.05)", fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", lineHeight: 1.7 };

export default function Slide09V0() {
  return (
    <div style={root}>
      <DocsSidebar active="v0.dev" />
      <div style={main}>
        <div style={{ fontSize: "0.95vw", color: "#7DCFFF", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: "1.2vh" }}>Platforms</div>
        <div style={{ display: "flex", alignItems: "center", gap: "2vw", marginBottom: "1.5vh" }}>
          <h1 style={{ fontSize: "3.8vw", fontWeight: 700, color: "#FFFFFF", margin: 0, letterSpacing: "-0.02em" }}>v0.dev</h1>
          <div style={{ fontSize: "0.85vw", color: "#7DCFFF", backgroundColor: "rgba(125,207,255,0.1)", padding: "0.4vh 1vw", borderRadius: "2vw", fontFamily: "'DM Mono', monospace", border: "1px solid rgba(125,207,255,0.2)" }}>Frontend Generator</div>
        </div>
        <div style={{ fontSize: "1.05vw", color: "#565F89", marginBottom: "3vh" }}>Vercel · Cloud SaaS · Closed Source</div>

        <div style={{ display: "flex", gap: "3.5vw", flex: 1 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2.5vh" }}>
            <div>
              <div style={{ fontSize: "1.05vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "1.5vh", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1vh" }}>Platform Profile</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2vh" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Automation Level</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
                    <div style={{ width: "10vw", height: "0.5vh", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{ width: "65%", height: "100%", backgroundColor: "#7DCFFF", borderRadius: "4px" }} />
                    </div>
                    <span style={{ fontSize: "0.9vw", color: "#7DCFFF", fontFamily: "'DM Mono', monospace" }}>65/100</span>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Specialization</span>
                  <span style={{ fontSize: "0.9vw", color: "#C0CAF5", fontFamily: "'DM Mono', monospace" }}>React / Next.js</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>UI Framework</span>
                  <span style={{ fontSize: "0.9vw", color: "#C0CAF5", fontFamily: "'DM Mono', monospace" }}>shadcn/ui + Tailwind</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>One-Click Deploy</span>
                  <span style={{ fontSize: "0.9vw", color: "#9ECE6A", fontFamily: "'DM Mono', monospace" }}>true (Vercel)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Self-Healing</span>
                  <span style={{ fontSize: "0.9vw", color: "#F7768E", fontFamily: "'DM Mono', monospace" }}>false</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "1vw", color: "#9AA5CE" }}>Multi-Agent</span>
                  <span style={{ fontSize: "0.9vw", color: "#F7768E", fontFamily: "'DM Mono', monospace" }}>false</span>
                </div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: "1.05vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "1.5vh", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1vh" }}>Key Differentiator</div>
              <p style={{ fontSize: "1.05vw", color: "#9AA5CE", lineHeight: 1.6, margin: 0 }}>
                Tightly integrated with the Vercel ecosystem — generated React/Next.js components deploy to Vercel with one click. Exceptional UI quality via shadcn/ui patterns.
              </p>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "1.05vw", fontWeight: 600, color: "#FFFFFF", marginBottom: "1.5vh", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1vh" }}>Generated Component</div>
            <div style={code}>
              <div style={{ color: "#565F89", marginBottom: "0.5vh" }}>{"// Output: React + Tailwind"}</div>
              <div><span style={{ color: "#BB9AF7" }}>export default function</span> <span style={{ color: "#7AA2F7" }}>HeroSection</span>() {"{"}</div>
              <div style={{ paddingLeft: "2vw" }}><span style={{ color: "#BB9AF7" }}>return</span> (</div>
              <div style={{ paddingLeft: "4vw" }}><span style={{ color: "#9ECE6A" }}>&lt;div</span> <span style={{ color: "#7DCFFF" }}>className</span>=<span style={{ color: "#E0AF68" }}>"flex flex-col</span></div>
              <div style={{ paddingLeft: "6vw" }}><span style={{ color: "#E0AF68" }}>items-center gap-8"</span><span style={{ color: "#9ECE6A" }}>&gt;</span></div>
              <div style={{ paddingLeft: "6vw" }}><span style={{ color: "#9ECE6A" }}>&lt;Button</span> <span style={{ color: "#7DCFFF" }}>variant</span>=<span style={{ color: "#E0AF68" }}>"default"</span><span style={{ color: "#9ECE6A" }}>&gt;</span></div>
              <div style={{ paddingLeft: "8vw" }}>Get Started</div>
              <div style={{ paddingLeft: "6vw" }}><span style={{ color: "#9ECE6A" }}>&lt;/Button&gt;</span></div>
              <div style={{ paddingLeft: "4vw" }}><span style={{ color: "#9ECE6A" }}>&lt;/div&gt;</span></div>
              <div style={{ paddingLeft: "2vw" }}>)</div>
              <div>{"}"}</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2vh" }}>
          <div style={{ fontSize: "0.9vw", color: "#565F89" }}>09</div>
          <div style={{ fontSize: "0.85vw", color: "#565F89" }}>AuRen Research, 2026</div>
        </div>
      </div>
    </div>
  );
}
