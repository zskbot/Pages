import { useState, useEffect, useRef } from "react";
import { AuRenMascot } from "@/components/AuRenMascot";

/* ─── static data ─── */
const TERMINAL_COMMANDS = [
  'auren create "saas dashboard with postgres and stripe auth"',
  'auren create "realtime chat app with websockets and auth"',
  'auren create "e-commerce api with inventory and payments"',
  'auren create "ai pipeline with self-healing debug loop"',
];
const TERMINAL_STEPS = [
  { delay: 0,    text: "→ Analyzing intent...",                    color: "#7AA2F7" },
  { delay: 500,  text: "→ Planning: fullstack + DB + auth",        color: "#9AA5CE" },
  { delay: 1100, text: "→ Generating 24 files...",                 color: "#9AA5CE" },
  { delay: 1700, text: "→ Tests: 0/18 passing",                    color: "#F7768E" },
  { delay: 2300, text: "→ Self-heal loop: iteration 1/3...",       color: "#E0AF68" },
  { delay: 2900, text: "→ Patch: auth middleware + JWT verify",    color: "#E0AF68" },
  { delay: 3500, text: "→ Tests: 18/18 passing ✓",                 color: "#9ECE6A" },
  { delay: 4000, text: "✓ Deployed → https://app.auren.dev/live", color: "#9ECE6A" },
];
const STATS = [
  { value: "10",   label: "Platforms" },
  { value: "8/10", label: "Self-Healing" },
  { value: "8.3",  label: "Avg Automation" },
  { value: "2026", label: "Research Ed." },
];
const ALL_PLATFORMS = [
  { name: "Devin",                  company: "Cognition Labs", type: "Cloud AI Agent",          level: 10, features: ["Full autonomy","Multi-task","Self-healing"], open: false, self: false, color: "#7AA2F7" },
  { name: "GitHub Copilot Workspace",company:"Microsoft",      type: "Cloud AI IDE",             level: 8,  features: ["PR integration","Multi-file edit","CI/CD"],  open: false, self: false, color: "#9AA5CE" },
  { name: "Replit Agent",           company: "Replit",         type: "Cloud AI IDE",             level: 9,  features: ["Full-stack","No-code UI","1-click deploy"],   open: false, self: false, color: "#9ECE6A" },
  { name: "Cursor",                 company: "Cursor Inc.",    type: "AI-native IDE",            level: 8,  features: ["Composer","Multi-agent","Codebase index"],    open: false, self: false, color: "#BB9AF7" },
  { name: "Bolt.new",               company: "StackBlitz",     type: "Browser-based AI IDE",     level: 9,  features: ["WebContainers","Multi-agent","Full-stack"],    open: false, self: false, color: "#E0AF68" },
  { name: "v0.dev",                 company: "Vercel",         type: "UI Code Generator",        level: 6,  features: ["React UI gen","Vercel deploy","Shadcn/ui"],    open: false, self: false, color: "#F7768E" },
  { name: "OpenClaw (AuRen)",       company: "AuRen",          type: "Self-hosted AI Gateway",   level: 9,  features: ["Self-hosted","Multi-model","Full pipeline"],   open: true,  self: true,  color: "#7AA2F7" },
  { name: "Claude Code",            company: "Anthropic",      type: "CLI AI Agent",             level: 9,  features: ["Terminal-native","200K context","Safety"],     open: false, self: false, color: "#E0AF68" },
  { name: "OpenAI Codex CLI",       company: "OpenAI",         type: "CLI AI Agent",             level: 8,  features: ["MIT license","Sandboxed shell","GPT-4o"],     open: true,  self: false, color: "#9ECE6A" },
  { name: "Gemini Code Assist",     company: "Google",         type: "Cloud AI IDE",             level: 7,  features: ["1M token ctx","GCP native","Enterprise VPC"],  open: false, self: false, color: "#BB9AF7" },
];
const ENDPOINTS = [
  { method: "GET", path: "/api/platforms",                   desc: "List all tracked platforms with metadata" },
  { method: "GET", path: "/api/platforms/:id",               desc: "Get detailed info for a specific platform" },
  { method: "GET", path: "/api/platforms/comparison",        desc: "Multi-dimension scores (autonomy, codeQuality…)" },
  { method: "GET", path: "/api/platforms/features",          desc: "Feature matrix — 9 boolean capabilities per platform" },
  { method: "GET", path: "/api/platforms/summary",           desc: "Aggregate KPI summary (counts, averages)" },
  { method: "GET", path: "/api/platforms/trending",          desc: "Growth score, trend direction & notes" },
  { method: "GET", path: "/api/research/self-healing",       desc: "Self-healing loop structure per platform" },
  { method: "GET", path: "/api/research/automation-pipeline",desc: "Pipeline stage breakdown with durations" },
  { method: "GET", path: "/api/research/news",               desc: "Curated news feed 2024–2026 with impact labels" },
];
const SCORING_DIMS = [
  { dim: "Autonomy",         range: "0–10", desc: "Degree of task execution without human input or guidance" },
  { dim: "Code Quality",     range: "0–10", desc: "Correctness, maintainability, type safety, test coverage" },
  { dim: "Self-Healing",     range: "0–10", desc: "Ability to detect runtime errors and auto-patch them" },
  { dim: "Infrastructure",   range: "0–10", desc: "DB provisioning, secrets management, domain, CDN" },
  { dim: "Deployment Ease",  range: "0–10", desc: "Time and effort from code-done to publicly accessible URL" },
  { dim: "Collaboration",    range: "0–10", desc: "Team features, PR review, handoff, multi-user support" },
];
const DOC_SECTIONS = [
  { id: "overview",     label: "Overview",          sub: ["Introduction", "Key Stats", "Quick Start"] },
  { id: "how-it-works", label: "How It Works",      sub: ["Research Loop", "Scoring System", "Outputs"] },
  { id: "platforms",    label: "Platform Coverage", sub: ["All 10 Platforms", "Categories", "Timeline"] },
  { id: "api",          label: "API Reference",     sub: ["Endpoints", "Authentication", "Response Schema"] },
  { id: "wave",         label: "2025 Wave",         sub: ["Claude Code", "Codex CLI", "Gemini Code Assist"] },
  { id: "methodology",  label: "Methodology",       sub: ["Scoring Dims", "Data Sources", "Cadence"] },
];

/* ─── SVG components ─── */
function SearchIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>;
}
function ChevronRightIcon({ size = 10 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"><path d="M9 18l6-6-6-6"/></svg>;
}

/* ─── Terminal ─── */
function TerminalBlock() {
  const [cmdIdx, setCmdIdx] = useState(0);
  const [typedCmd, setTypedCmd] = useState("");
  const [steps, setSteps] = useState<{ text: string; color: string }[]>([]);
  const [phase, setPhase] = useState<"typing" | "running" | "done">("typing");
  const refs = useRef<NodeJS.Timeout[]>([]);
  const clearAll = () => refs.current.forEach(clearTimeout);
  const run = (idx: number) => {
    clearAll(); refs.current = [];
    const cmd = TERMINAL_COMMANDS[idx % TERMINAL_COMMANDS.length];
    setTypedCmd(""); setSteps([]); setPhase("typing");
    let c = 0;
    const iv = setInterval(() => { c++; setTypedCmd(cmd.slice(0, c)); if (c >= cmd.length) { clearInterval(iv); setPhase("running"); TERMINAL_STEPS.forEach(s => { const t = setTimeout(() => { setSteps(p => [...p, { text: s.text, color: s.color }]); if (s === TERMINAL_STEPS[TERMINAL_STEPS.length - 1]) { setPhase("done"); const r = setTimeout(() => setCmdIdx(i => i + 1), 2500); refs.current.push(r); } }, s.delay); refs.current.push(t); }); } }, 36);
    return () => clearInterval(iv);
  };
  useEffect(() => { run(cmdIdx); return clearAll; }, [cmdIdx]);
  return (
    <div style={{ backgroundColor: "#0D0E17", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden", fontFamily: "'DM Mono','Fira Mono',monospace", width: "100%", maxWidth: 600 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", backgroundColor: "#111220" }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#F7768E","#E0AF68","#9ECE6A"].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: c }} />)}
        </div>
        <span style={{ fontSize: 10, color: "#565F89", marginLeft: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>AUREN TERMINAL</span>
      </div>
      <div style={{ padding: "14px 18px", minHeight: 190 }}>
        <div style={{ marginBottom: 6 }}>
          <span style={{ color: "#7AA2F7" }}>❯</span>
          <span style={{ color: "#C0CAF5", marginLeft: 8, fontSize: 12 }}>{typedCmd}</span>
          {phase === "typing" && <span style={{ color: "#7AA2F7", animation: "blink 1s step-end infinite" }}>█</span>}
        </div>
        {steps.map((s, i) => <div key={i} style={{ color: s.color, fontSize: 11, lineHeight: "1.75", paddingLeft: 16 }}>{s.text}</div>)}
        {phase === "done" && <div style={{ marginTop: 8, paddingLeft: 16 }}><span style={{ color: "#7AA2F7" }}>❯</span><span style={{ color: "#565F89", marginLeft: 8 }}>_</span></div>}
      </div>
    </div>
  );
}

/* ─── Sidebar ─── */
function DocSidebar({ active }: { active: string }) {
  return (
    <aside className="doc-sidebar" style={{ width: 232, flexShrink: 0, position: "sticky", top: 50, height: "calc(100vh - 50px)", overflowY: "auto", borderRight: "1px solid rgba(255,255,255,0.06)", backgroundColor: "#07080f", padding: "20px 0" }}>
      {/* Logo */}
      <div style={{ padding: "0 16px 18px", display: "flex", alignItems: "center", gap: 8 }}>
        <AuRenMascot size={22} />
        <span style={{ fontSize: 13, fontWeight: 700, color: "#00cfab", letterSpacing: "-0.02em" }}>AuRen</span>
        <span style={{ marginLeft: "auto", fontSize: 9, color: "#9ECE6A", border: "1px solid rgba(158,206,106,0.3)", padding: "1px 5px", borderRadius: 2, fontFamily: "'DM Mono',monospace" }}>v2.0</span>
      </div>

      {/* Search */}
      <div style={{ padding: "0 12px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 10px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.03)", color: "#565F89", cursor: "text" }}>
          <SearchIcon />
          <span style={{ fontSize: 11 }}>Search docs...</span>
          <span style={{ marginLeft: "auto", fontSize: 9, border: "1px solid rgba(255,255,255,0.12)", padding: "1px 4px", borderRadius: 2 }}>⌘K</span>
        </div>
      </div>

      {/* Nav sections */}
      {DOC_SECTIONS.map(sec => (
        <div key={sec.id} style={{ marginBottom: 2 }}>
          <a href={`#${sec.id}`} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 16px", fontSize: 11, fontWeight: 600, color: active === sec.id ? "#7AA2F7" : "#9AA5CE", textDecoration: "none", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            {active === sec.id && <span style={{ width: 2, height: 12, backgroundColor: "#7AA2F7", borderRadius: 1, flexShrink: 0 }} />}
            {sec.label}
          </a>
          {sec.sub.map(s => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 16px 3px 28px", fontSize: 11, color: "#565F89" }}>
              <ChevronRightIcon />
              {s}
            </div>
          ))}
        </div>
      ))}

      {/* Bottom links */}
      <div style={{ marginTop: 24, padding: "16px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        {[{ label: "Dashboard →", href: "/" }, { label: "Simulator →", href: "/simulator/" }, { label: "Slides →", href: "/ai-platforms-slides/" }].map(({ label, href }) => (
          <a key={href} href={href} style={{ display: "block", fontSize: 11, color: "#565F89", textDecoration: "none", marginBottom: 6 }}
            onMouseEnter={e => (e.currentTarget.style.color = "#7AA2F7")}
            onMouseLeave={e => (e.currentTarget.style.color = "#565F89")}>
            {label}
          </a>
        ))}
      </div>
    </aside>
  );
}

/* ─── Callout box ─── */
function Callout({ type, children }: { type: "info" | "tip" | "warning"; children: React.ReactNode }) {
  const colors: Record<string, { border: string; bg: string; label: string; lc: string }> = {
    info:    { border: "#7AA2F7", bg: "rgba(122,162,247,0.06)", label: "INFO",    lc: "#7AA2F7" },
    tip:     { border: "#9ECE6A", bg: "rgba(158,206,106,0.06)", label: "TIP",     lc: "#9ECE6A" },
    warning: { border: "#E0AF68", bg: "rgba(224,175,104,0.06)", label: "NOTE",    lc: "#E0AF68" },
  };
  const c = colors[type];
  return (
    <div style={{ borderLeft: `3px solid ${c.border}`, backgroundColor: c.bg, borderRadius: "0 4px 4px 0", padding: "12px 16px", marginTop: 20 }}>
      <span style={{ fontSize: 9, fontWeight: 700, color: c.lc, letterSpacing: "0.1em", fontFamily: "'DM Mono',monospace", marginRight: 8 }}>{c.label}</span>
      <span style={{ fontSize: 12, color: "#9AA5CE", lineHeight: 1.65 }}>{children}</span>
    </div>
  );
}

/* ─── Main export ─── */
export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      const ids = DOC_SECTIONS.map(s => s.id);
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 120) { setActiveSection(ids[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const px = "min(6vw, 64px)";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0b14", color: "#C0CAF5", fontFamily: "'Inter', system-ui, sans-serif", overflowX: "hidden" }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .hn:hover{color:#FFFFFF!important}
        .tool-card:hover{border-color:rgba(122,162,247,0.32)!important;background:rgba(122,162,247,0.04)!important}
        .plat-card:hover{border-color:rgba(255,255,255,0.14)!important;transform:translateY(-1px)}
        .ep-row:hover{background:rgba(255,255,255,0.03)!important}
        .cta-p:hover{opacity:.88;transform:translateY(-1px)}
        .cta-s:hover{border-color:rgba(255,255,255,0.28)!important;color:#FFFFFF!important}
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px}
        @media(max-width:767px){
          .doc-sidebar{display:none!important}
          .mob-hide{display:none!important}
          .mob-nav-links{gap:0!important}
          .mob-nav-links a{padding:4px 7px!important;font-size:10px!important}
          .mob-stats{grid-template-columns:repeat(2,1fr)!important;max-width:100%!important}
          .mob-code-grid{grid-template-columns:1fr!important}
          .mob-timeline-grid{grid-template-columns:1fr!important}
          .mob-ep-scroll{overflow-x:auto!important;-webkit-overflow-scrolling:touch}
          .mob-ep-table{min-width:520px}
        }
      `}</style>

      {/* ── TOP NAV ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: `0 ${px}`, height: 50, backgroundColor: scrollY > 10 ? "rgba(10,11,20,0.95)" : "transparent", borderBottom: scrollY > 10 ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent", backdropFilter: scrollY > 10 ? "blur(14px)" : "none", transition: "all 0.2s ease" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <AuRenMascot size={26} />
          <span style={{ fontSize: 14, fontWeight: 700, color: "#00cfab", letterSpacing: "-0.02em" }}>AuRen</span>
          <span style={{ fontSize: 10, color: "#565F89", marginLeft: 4 }}>Docs</span>
        </div>
        <div className="mob-nav-links" style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {[{ label: "/dashboard", href: "/" }, { label: "/simulator", href: "/simulator/" }, { label: "/slides", href: "/ai-platforms-slides/" }].map(({ label, href }) => (
            <a key={href} href={href} className="hn" style={{ fontSize: 11, color: "#9AA5CE", textDecoration: "none", padding: "4px 10px", borderRadius: 3, fontFamily: "'DM Mono',monospace", transition: "color 0.15s" }}>{label}</a>
          ))}
        </div>
        <div className="mob-hide" style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 3, border: "1px solid rgba(158,206,106,0.28)", backgroundColor: "rgba(158,206,106,0.05)" }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#9ECE6A", animation: "pulse 2s ease infinite" }} />
          <span style={{ fontSize: 10, color: "#9ECE6A", fontFamily: "'DM Mono',monospace", letterSpacing: "0.06em" }}>AUREN v2.0 ONLINE</span>
        </div>
      </nav>

      {/* ── BODY: sidebar + main ── */}
      <div style={{ display: "flex", minHeight: "calc(100vh - 50px)" }}>
        {/* Left sidebar — hidden on mobile via CSS would need media query; show always for now */}
        <div className="doc-sidebar" style={{ display: "none" }} id="sidebar-placeholder" />
        <div style={{ display: "flex", width: "100%", maxWidth: 1440, margin: "0 auto" }}>
          <DocSidebar active={activeSection} />

          {/* ── MAIN ── */}
          <main style={{ flex: 1, minWidth: 0 }}>

            {/* ══ OVERVIEW ══ */}
            <section id="overview" style={{ padding: `56px ${px} 48px` }}>
              {/* badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 12px", borderRadius: 3, border: "1px solid rgba(122,162,247,0.22)", backgroundColor: "rgba(122,162,247,0.06)", marginBottom: 28, animation: "fadeUp 0.6s ease forwards" }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#7AA2F7", animation: "pulse 2s ease infinite" }} />
                <span style={{ fontSize: 10, color: "#7AA2F7", fontFamily: "'DM Mono',monospace", letterSpacing: "0.08em" }}>10 PLATFORMS · 2024–2026 RESEARCH</span>
              </div>

              <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.06, margin: "0 0 8px 0", letterSpacing: "-0.03em" }}>Intent to Production.</h1>
              <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 800, lineHeight: 1.06, margin: "0 0 22px 0", letterSpacing: "-0.03em", background: "linear-gradient(135deg,#7AA2F7 0%,#BB9AF7 50%,#9ECE6A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Zero Friction.</h1>

              <p style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)", color: "#9AA5CE", maxWidth: 540, margin: "0 0 28px", lineHeight: 1.7 }}>
                AuRen tracks 10 AI-autonomous development platforms — from Devin to Claude Code — across autonomy, self-healing loops, and full-stack deployment capability.
              </p>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 40 }}>
                <a href="/" className="cta-p" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 4, backgroundColor: "#7AA2F7", color: "#0a0b14", fontWeight: 700, fontSize: 13, textDecoration: "none", transition: "all 0.15s ease" }}>
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor"><path d="M3 2L10 6L3 10V2Z"/></svg>
                  Open Dashboard
                </a>
                <a href="/simulator/" className="cta-s" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.14)", color: "#C0CAF5", fontWeight: 500, fontSize: 13, textDecoration: "none", transition: "all 0.15s ease" }}>
                  Debug Simulator
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 6H10M7 3L10 6L7 9"/></svg>
                </a>
                <a href="/ai-platforms-slides/" className="cta-s" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.1)", color: "#9AA5CE", fontWeight: 500, fontSize: 13, textDecoration: "none", transition: "all 0.15s ease" }}>
                  Research Slides
                </a>
              </div>

              {/* Terminal */}
              <TerminalBlock />

              {/* Stats */}
              <div className="mob-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, maxWidth: 600, marginTop: 40, paddingTop: 36, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {STATS.map(({ value, label }) => (
                  <div key={label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "clamp(1.5rem,2.5vw,2rem)", fontWeight: 800, color: "#FFFFFF", fontFamily: "'DM Mono',monospace", letterSpacing: "-0.02em" }}>{value}</div>
                    <div style={{ fontSize: 10, color: "#565F89", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* ══ HOW IT WORKS ══ */}
            <section id="how-it-works" style={{ padding: `0 ${px} 56px`, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ paddingTop: 52 }}>
                <div style={{ fontSize: 10, color: "#7AA2F7", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'DM Mono',monospace", marginBottom: 6 }}>How It Works</div>
                <h2 style={{ fontSize: "clamp(1.3rem,2.5vw,1.75rem)", fontWeight: 700, color: "#FFFFFF", margin: "0 0 36px", letterSpacing: "-0.02em" }}>From intent to deployed code in minutes</h2>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
                  {[
                    { step: "01", title: "Research & Collect", color: "#7AA2F7", desc: "We continuously monitor platform releases, changelogs, GitHub activity, and community feedback across all 10 platforms.", icon: "📡" },
                    { step: "02", title: "Score & Benchmark", color: "#BB9AF7", desc: "Every platform is rated across 6 dimensions (autonomy, code quality, self-healing, infra, deploy, collaboration) on a 0–10 scale.", icon: "📊" },
                    { step: "03", title: "Visualize & Export", color: "#9ECE6A", desc: "Results are published as an interactive dashboard, live debug simulator, and 23-slide research deck — all exportable as PDF/CSV.", icon: "🚀" },
                  ].map(({ step, title, color, desc, icon }) => (
                    <div key={step} style={{ padding: 20, borderRadius: 4, border: "1px solid rgba(255,255,255,0.07)", backgroundColor: "rgba(255,255,255,0.01)", position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", top: 12, right: 14, fontSize: "2.8rem", fontWeight: 900, color: "rgba(255,255,255,0.04)", fontFamily: "'DM Mono',monospace", lineHeight: 1 }}>{step}</div>
                      <div style={{ fontSize: 22, marginBottom: 12 }}>{icon}</div>
                      <div style={{ width: 28, height: 2, backgroundColor: color, borderRadius: 1, marginBottom: 12 }} />
                      <h3 style={{ fontSize: 14, fontWeight: 700, color: "#FFFFFF", margin: "0 0 10px" }}>{title}</h3>
                      <p style={{ fontSize: 12, color: "#9AA5CE", lineHeight: 1.7, margin: 0 }}>{desc}</p>
                    </div>
                  ))}
                </div>

                <Callout type="info">
                  All platform data is updated quarterly. The self-healing loop simulator uses live data from the API server running at <code style={{ fontFamily: "'DM Mono',monospace", backgroundColor: "rgba(122,162,247,0.1)", padding: "1px 5px", borderRadius: 2 }}>/api/research/self-healing</code>.
                </Callout>

                {/* Research Tools */}
                <div style={{ marginTop: 32 }}>
                  <div style={{ fontSize: 10, color: "#565F89", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'DM Mono',monospace", marginBottom: 12 }}>Research Tools</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
                    {[
                      { label: "/dashboard", desc: "10 platforms · Radar + Scatter · Feature matrix · Launch timeline", href: "/", accent: "#7AA2F7" },
                      { label: "/simulator", desc: "Live self-healing animation · A vs B compare · Speed control · Code snippets", href: "/simulator/", accent: "#9ECE6A" },
                      { label: "/slides",    desc: "23 slides · 2025 additions · Speaker notes · PDF export", href: "/ai-platforms-slides/", accent: "#BB9AF7" },
                    ].map(({ label, desc, href, accent }) => (
                      <a key={label} href={href} className="tool-card" style={{ display: "block", padding: "16px 18px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.07)", backgroundColor: "rgba(255,255,255,0.02)", textDecoration: "none", transition: "all 0.18s ease" }}>
                        <div style={{ fontSize: 12, color: accent, fontFamily: "'DM Mono',monospace", marginBottom: 5 }}>{label}</div>
                        <div style={{ fontSize: 11, color: "#565F89", lineHeight: 1.6 }}>{desc}</div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ══ ALL PLATFORMS ══ */}
            <section id="platforms" style={{ padding: `0 ${px} 56px`, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ paddingTop: 52 }}>
                <div style={{ fontSize: 10, color: "#7AA2F7", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'DM Mono',monospace", marginBottom: 6 }}>Platform Coverage</div>
                <h2 style={{ fontSize: "clamp(1.3rem,2.5vw,1.75rem)", fontWeight: 700, color: "#FFFFFF", margin: "0 0 8px", letterSpacing: "-0.02em" }}>All 10 platforms tracked</h2>
                <p style={{ fontSize: 12, color: "#565F89", margin: "0 0 28px" }}>Spanning CLI agents, cloud IDEs, browser-based tools, and self-hosted gateways — 2023 through 2026.</p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 10 }}>
                  {ALL_PLATFORMS.map((p) => (
                    <div key={p.name} className="plat-card" style={{ padding: "16px 18px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.07)", backgroundColor: "rgba(255,255,255,0.01)", transition: "all 0.18s ease", cursor: "default" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 2 }}>
                            <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: p.color }} />
                            <span style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF" }}>{p.name}</span>
                          </div>
                          <div style={{ fontSize: 10, color: "#565F89" }}>{p.company}</div>
                        </div>
                        <span style={{ fontSize: 9, color: p.color, backgroundColor: `${p.color}12`, border: `1px solid ${p.color}25`, padding: "2px 7px", borderRadius: 2, fontFamily: "'DM Mono',monospace", whiteSpace: "nowrap", marginLeft: 8 }}>
                          {p.type.split(" ").slice(-2).join(" ")}
                        </span>
                      </div>

                      {/* Automation level */}
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                        <span style={{ fontSize: 9, color: "#565F89", textTransform: "uppercase", letterSpacing: "0.05em", width: 58, flexShrink: 0 }}>Auto Lvl</span>
                        <div style={{ flex: 1, height: 3, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${p.level * 10}%`, backgroundColor: p.color, borderRadius: 2 }} />
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 700, color: p.color, fontFamily: "'DM Mono',monospace", width: 16, textAlign: "right" }}>{p.level}</span>
                      </div>

                      {/* Feature tags */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {p.features.map(f => (
                          <span key={f} style={{ fontSize: 9, color: "#9AA5CE", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", padding: "2px 6px", borderRadius: 2 }}>{f}</span>
                        ))}
                        {p.open && <span style={{ fontSize: 9, color: "#9ECE6A", backgroundColor: "rgba(158,206,106,0.08)", border: "1px solid rgba(158,206,106,0.2)", padding: "2px 6px", borderRadius: 2 }}>Open Source</span>}
                        {p.self && <span style={{ fontSize: 9, color: "#BB9AF7", backgroundColor: "rgba(187,154,247,0.08)", border: "1px solid rgba(187,154,247,0.2)", padding: "2px 6px", borderRadius: 2 }}>Self-hosted</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ══ API REFERENCE ══ */}
            <section id="api" style={{ padding: `0 ${px} 56px`, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ paddingTop: 52 }}>
                <div style={{ fontSize: 10, color: "#7AA2F7", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'DM Mono',monospace", marginBottom: 6 }}>API Reference</div>
                <h2 style={{ fontSize: "clamp(1.3rem,2.5vw,1.75rem)", fontWeight: 700, color: "#FFFFFF", margin: "0 0 8px", letterSpacing: "-0.02em" }}>REST API — 9 endpoints</h2>
                <p style={{ fontSize: 12, color: "#565F89", margin: "0 0 24px" }}>Base URL: <code style={{ fontFamily: "'DM Mono',monospace", color: "#7AA2F7" }}>/api</code> &nbsp;·&nbsp; All endpoints return JSON &nbsp;·&nbsp; No authentication required (research edition)</p>

                {/* Endpoint table */}
                <div className="mob-ep-scroll" style={{ borderRadius: 4, border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden", marginBottom: 24 }}>
                  <div className="mob-ep-table">
                  <div style={{ display: "grid", gridTemplateColumns: "52px 1fr 1fr", gap: 0, padding: "7px 14px", backgroundColor: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {["Method", "Path", "Description"].map(h => <span key={h} style={{ fontSize: 9, fontWeight: 600, color: "#565F89", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>)}
                  </div>
                  {ENDPOINTS.map((ep, i) => (
                    <div key={ep.path} className="ep-row" style={{ display: "grid", gridTemplateColumns: "52px 1fr 1fr", gap: 0, padding: "9px 14px", borderBottom: i < ENDPOINTS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", transition: "background 0.12s" }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "#9ECE6A", fontFamily: "'DM Mono',monospace" }}>{ep.method}</span>
                      <span style={{ fontSize: 11, color: "#7AA2F7", fontFamily: "'DM Mono',monospace" }}>{ep.path}</span>
                      <span style={{ fontSize: 11, color: "#9AA5CE" }}>{ep.desc}</span>
                    </div>
                  ))}
                  </div>
                </div>

                {/* Code example */}
                <div className="mob-code-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <div style={{ fontSize: 10, color: "#565F89", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Request</div>
                    <div style={{ backgroundColor: "#0D0E17", borderRadius: 4, border: "1px solid rgba(255,255,255,0.07)", padding: "14px 16px", fontFamily: "'DM Mono',monospace", fontSize: 11, lineHeight: 1.8 }}>
                      <div style={{ color: "#7AA2F7" }}>curl -X GET \</div>
                      <div style={{ color: "#E0AF68", paddingLeft: 16 }}>"https://api.auren.dev/api/platforms/trending" \</div>
                      <div style={{ color: "#9AA5CE", paddingLeft: 16 }}>-H <span style={{ color: "#9ECE6A" }}>"Accept: application/json"</span></div>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: 10, color: "#565F89", textTransform: "uppercase", letterSpacing: "0.08em" }}>Response</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#9ECE6A", display: "inline-block" }} />
                        <span style={{ fontSize: 9, color: "#9ECE6A", fontFamily: "'DM Mono',monospace" }}>200 OK</span>
                      </span>
                    </div>
                    <div style={{ backgroundColor: "#0D0E17", borderRadius: 4, border: "1px solid rgba(255,255,255,0.07)", padding: "14px 16px", fontFamily: "'DM Mono',monospace", fontSize: 11, lineHeight: 1.8 }}>
                      <div style={{ color: "#C0CAF5" }}>[{"{"}</div>
                      <div style={{ paddingLeft: 16, color: "#C0CAF5" }}><span style={{ color: "#7AA2F7" }}>"platform"</span>: <span style={{ color: "#9ECE6A" }}>"Claude Code"</span>,</div>
                      <div style={{ paddingLeft: 16, color: "#C0CAF5" }}><span style={{ color: "#7AA2F7" }}>"growthScore"</span>: <span style={{ color: "#FF9E64" }}>97</span>,</div>
                      <div style={{ paddingLeft: 16, color: "#C0CAF5" }}><span style={{ color: "#7AA2F7" }}>"trend"</span>: <span style={{ color: "#9ECE6A" }}>"rising"</span>,</div>
                      <div style={{ paddingLeft: 16, color: "#C0CAF5" }}><span style={{ color: "#7AA2F7" }}>"note"</span>: <span style={{ color: "#9ECE6A" }}>"Fastest adoption..."</span></div>
                      <div style={{ color: "#C0CAF5" }}>{"}]"}</div>
                    </div>
                  </div>
                </div>

                <Callout type="tip">
                  All endpoints support CORS and return <code style={{ fontFamily: "'DM Mono',monospace", backgroundColor: "rgba(158,206,106,0.1)", padding: "1px 5px", borderRadius: 2 }}>Content-Type: application/json</code>. The research edition requires no API key.
                </Callout>
              </div>
            </section>

            {/* ══ 2025 WAVE ══ */}
            <section id="wave" style={{ padding: `0 ${px} 56px`, borderTop: "1px solid rgba(255,255,255,0.04)", backgroundColor: "rgba(122,162,247,0.015)" }}>
              <div style={{ paddingTop: 52 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, backgroundColor: "#E0AF68", color: "#0a0b14", padding: "2px 6px", borderRadius: 2, letterSpacing: "0.06em" }}>NEW</span>
                  <span style={{ fontSize: 10, color: "#E0AF68", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'DM Mono',monospace" }}>2025 Platform Wave</span>
                </div>
                <h2 style={{ fontSize: "clamp(1.3rem,2.5vw,1.75rem)", fontWeight: 700, color: "#FFFFFF", margin: "0 0 28px", letterSpacing: "-0.02em" }}>Three platforms that changed everything</h2>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12 }}>
                  {[
                    { iconColor: "#E0AF68", name: "Claude Code", company: "Anthropic", tag: "Apr 2025", color: "#E0AF68", desc: "Terminal-native agent with constitutional AI safety and 200K token context. Fastest enterprise adoption in Anthropic history.", metric: "Best Code Quality: 10/10", features: ["Terminal CLI","200K context","Constitutional AI","Zero-shot debugging"] },
                    { iconColor: "#9ECE6A", name: "OpenAI Codex CLI", company: "OpenAI", tag: "MIT · May 2025", color: "#9ECE6A", desc: "Open-source CLI agent with sandboxed shell execution. 60K GitHub stars in 30 days — the community signal of 2025.", metric: "60K GitHub stars / 30 days", features: ["MIT license","Sandboxed shell","GPT-4o native","Agentic loops"] },
                    { iconColor: "#BB9AF7", name: "Gemini Code Assist", company: "Google", tag: "Enterprise 2025", color: "#BB9AF7", desc: "1M token context window. Entire monorepos in a single pass. GCP-native enterprise deployment with VPC-SC.", metric: "1M token context", features: ["1M token ctx","GCP VPC-SC","Multi-IDE","Enterprise SSO"] },
                  ].map(({ iconColor, name, company, tag, color, desc, metric, features }) => (
                    <div key={name} style={{ padding: 20, borderRadius: 4, border: `1px solid ${color}1e`, borderLeft: `2px solid ${color}`, backgroundColor: `${color}04` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: iconColor }} />
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: "#FFFFFF" }}>{name}</div>
                            <div style={{ fontSize: 10, color: "#565F89", marginTop: 1 }}>{company}</div>
                          </div>
                        </div>
                        <div style={{ fontSize: 9, color, backgroundColor: `${color}12`, padding: "2px 7px", borderRadius: 2, fontFamily: "'DM Mono',monospace", whiteSpace: "nowrap", marginLeft: 8 }}>{tag}</div>
                      </div>
                      <p style={{ fontSize: 12, color: "#9AA5CE", lineHeight: 1.65, margin: "0 0 12px" }}>{desc}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
                        {features.map(f => <span key={f} style={{ fontSize: 9, color: "#9AA5CE", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", padding: "2px 6px", borderRadius: 2 }}>{f}</span>)}
                      </div>
                      <div style={{ fontSize: 10, color, fontFamily: "'DM Mono',monospace" }}>→ {metric}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ══ METHODOLOGY ══ */}
            <section id="methodology" style={{ padding: `0 ${px} 64px`, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ paddingTop: 52 }}>
                <div style={{ fontSize: 10, color: "#7AA2F7", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'DM Mono',monospace", marginBottom: 6 }}>Methodology</div>
                <h2 style={{ fontSize: "clamp(1.3rem,2.5vw,1.75rem)", fontWeight: 700, color: "#FFFFFF", margin: "0 0 8px", letterSpacing: "-0.02em" }}>How we score platforms</h2>
                <p style={{ fontSize: 12, color: "#565F89", margin: "0 0 28px" }}>Each platform is evaluated across 6 independent dimensions by our research team, using a combination of hands-on testing, documentation review, and community analysis.</p>

                {/* Scoring dimensions */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 10, marginBottom: 32 }}>
                  {SCORING_DIMS.map(({ dim, range, desc }) => (
                    <div key={dim} style={{ padding: "14px 16px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.01)" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "#FFFFFF" }}>{dim}</span>
                        <span style={{ fontSize: 9, color: "#7AA2F7", fontFamily: "'DM Mono',monospace", border: "1px solid rgba(122,162,247,0.2)", padding: "1px 6px", borderRadius: 2 }}>{range}</span>
                      </div>
                      <p style={{ fontSize: 11, color: "#9AA5CE", lineHeight: 1.6, margin: 0 }}>{desc}</p>
                    </div>
                  ))}
                </div>

                {/* Data sources */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#FFFFFF", marginBottom: 12 }}>Data Sources</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["Official documentation", "GitHub repositories", "Community benchmarks", "Enterprise case studies", "Quarterly release notes", "Developer surveys", "Benchmark suites"].map(s => (
                      <span key={s} style={{ fontSize: 11, color: "#9AA5CE", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", padding: "4px 10px", borderRadius: 3 }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className="mob-timeline-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
                  {[
                    { label: "Research Period", value: "2023 Q1 → 2026 Q2" },
                    { label: "Update Cadence",  value: "Quarterly" },
                    { label: "Platforms Tracked",value: "10 active" },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ padding: "12px 16px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.01)" }}>
                      <div style={{ fontSize: 10, color: "#565F89", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{label}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#FFFFFF", fontFamily: "'DM Mono',monospace" }}>{value}</div>
                    </div>
                  ))}
                </div>

                <Callout type="warning">
                  Scores reflect platform capabilities as of the most recent quarterly review. Rapidly evolving platforms like Claude Code and Codex CLI may have improved since publication.
                </Callout>
              </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ padding: `24px ${px}`, borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <AuRenMascot size={20} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "#00cfab" }}>AuRen</span>
                <span style={{ fontSize: 10, color: "#565F89", marginLeft: 6 }}>Research Edition 2026</span>
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                {[{ label: "Dashboard", href: "/" }, { label: "Simulator", href: "/simulator/" }, { label: "Slides", href: "/ai-platforms-slides/" }].map(({ label, href }) => (
                  <a key={href} href={href} style={{ fontSize: 11, color: "#565F89", textDecoration: "none" }} className="hn">{label}</a>
                ))}
              </div>
            </footer>

          </main>
        </div>
      </div>
    </div>
  );
}
