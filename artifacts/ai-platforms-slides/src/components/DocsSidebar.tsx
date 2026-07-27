const SECTIONS = [
  { heading: "Overview", items: ["Introduction", "Platform Landscape", "Key Metrics"] },
  { heading: "Platforms", items: ["Devin AI", "Copilot Workspace", "Replit Agent", "Cursor", "Bolt.new", "v0.dev", "OpenClaw"] },
  { heading: "2025 New", items: ["Claude Code", "Codex CLI", "Gemini Code Assist", "Multi-Agent 2025"] },
  { heading: "Analysis", items: ["Pipeline", "Self-Healing Loop", "Feature Matrix", "Comparison Scores", "Autonomy Spectrum", "Deployment Models", "Multi-Agent Arch", "Trends 2024–2026", "Key Takeaways"] },
];

interface DocsSidebarProps {
  active: string;
}

export default function DocsSidebar({ active }: DocsSidebarProps) {
  return (
    <div style={{ width: "22vw", height: "100vh", borderRight: "1px solid rgba(255,255,255,0.05)", padding: "4vh 3vw", display: "flex", flexDirection: "column", flexShrink: 0, overflowY: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1vw", marginBottom: "4vh" }}>
        <div style={{ width: "1.5vw", height: "1.5vw", backgroundColor: "#7AA2F7", borderRadius: "0.3vw" }} />
        <div style={{ fontSize: "1.2vw", fontWeight: 600, color: "#FFFFFF" }}>AuRen</div>
      </div>

      {SECTIONS.map(({ heading, items }) => (
        <div key={heading} style={{ marginBottom: "2.5vh" }}>
          <div style={{ fontSize: "0.8vw", fontWeight: 600, color: heading === "2025 New" ? "#E0AF68" : "#565F89", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "1.2vh", display: "flex", alignItems: "center", gap: "0.4vw" }}>
            {heading === "2025 New" && <span style={{ fontSize: "0.65vw", backgroundColor: "#E0AF68", color: "#1A1B26", borderRadius: "0.2vw", padding: "0.1vh 0.4vw", fontWeight: 700 }}>NEW</span>}
            {heading}
          </div>
          {items.map((label) => (
            <div
              key={label}
              style={{
                fontSize: "0.9vw",
                color: label === active ? "#7AA2F7" : "#C0CAF5",
                opacity: label === active ? 1 : 0.55,
                marginBottom: "0.9vh",
                fontWeight: label === active ? 500 : 400,
                display: "flex",
                alignItems: "center",
                gap: "0.6vw",
              }}
            >
              {label === active && (
                <span style={{ width: "3px", height: "1.1em", backgroundColor: "#7AA2F7", borderRadius: "2px", marginLeft: "-3vw", flexShrink: 0 }} />
              )}
              {label}
            </div>
          ))}
        </div>
      ))}

      <div style={{ marginTop: "auto" }}>
        <div style={{ fontSize: "0.7vw", fontWeight: 600, color: "#565F89", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.8vh" }}>Tools</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5vh", marginBottom: "2vh" }}>
          {[
            { label: "Dashboard", href: "/" },
            { label: "Simulator", href: "/simulator/" },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={{
                fontSize: "0.85vw",
                color: "#7AA2F7",
                opacity: 0.7,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.4vw",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.7"; }}
            >
              <span style={{ fontSize: "0.7vw" }}>↗</span>
              {label}
            </a>
          ))}
        </div>
        <div style={{ fontSize: "0.75vw", color: "#565F89" }}>AuRen Research, 2026</div>
      </div>
    </div>
  );
}
