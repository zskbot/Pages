import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Platform, SelfHealingEntry, PipelineStage, PlatformComparison } from "@workspace/api-client-react";
import { GitCompare, Gauge } from "lucide-react";
import AppNav from "@/components/AppNav";

interface DebugSimulatorProps {
  platforms: Platform[];
  selfHealingData: SelfHealingEntry[];
  pipelineData: PipelineStage[];
  comparisonData: PlatformComparison[];
}

const STEPS = [
  { id: "WRITE",   label: "WRITE",   desc: "Agent writes code" },
  { id: "RUN",     label: "RUN",     desc: "Code executes, error thrown" },
  { id: "DETECT",  label: "DETECT",  desc: "Error captured and classified" },
  { id: "ANALYZE", label: "ANALYZE", desc: "Root cause determined" },
  { id: "PATCH",   label: "PATCH",   desc: "Fix generated and applied" },
  { id: "TEST",    label: "TEST",    desc: "Patched code re-run" },
];

const CODE_SNIPPETS: Record<string, Record<string, { code: string; color: string }>> = {
  WRITE: {
    default: { color: "#7AA2F7", code: `// Agent generating code...\nasync function createUser(data) {\n  const user = await db.users.create({\n    email: data.email,\n    hash: hashPassword(data.pwd)\n  });\n  return user;\n}` },
  },
  RUN: {
    default: { color: "#F7768E", code: `$ node app.js\n\nTypeError: hashPassword is not defined\n  at createUser (app.js:4:14)\n  at POST /users (routes.js:12:5)\n  Exit code: 1` },
  },
  DETECT: {
    default: { color: "#E0AF68", code: `// Error classifier\n{\n  "type": "ReferenceError",\n  "fn": "hashPassword",\n  "file": "app.js:4",\n  "severity": "critical",\n  "autofix": true\n}` },
  },
  ANALYZE: {
    default: { color: "#BB9AF7", code: `// Root cause analysis\n// Missing import: bcrypt\n// hashPassword → bcrypt.hash()\n// Fix: add import + wrap fn\n// Confidence: 97.3%` },
  },
  PATCH: {
    default: { color: "#9ECE6A", code: `+ import bcrypt from 'bcrypt';\n\n  async function createUser(data) {\n    const user = await db.users.create({\n      email: data.email,\n-     hash: hashPassword(data.pwd)\n+     hash: await bcrypt.hash(data.pwd, 10)\n    });\n    return user;\n  }` },
  },
  TEST: {
    default: { color: "#9ECE6A", code: `$ npm test\n\n  ✓ POST /users creates user\n  ✓ passwords are hashed\n  ✓ duplicate email rejected\n\n  3 passing (142ms)\n  All checks green ✓` },
  },
};

const SPEED_OPTIONS = [
  { label: "Slow",   ms: 2500 },
  { label: "Normal", ms: 1500 },
  { label: "Fast",   ms: 700  },
];

function MiniLoop({ currentStepIndex, iteration, maxIterations, accentClass }: {
  currentStepIndex: number; iteration: number; maxIterations: number; accentClass: string;
}) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-3 relative py-4">
      {STEPS.map((step, idx) => {
        const isActive = currentStepIndex === idx;
        const isPast = currentStepIndex > idx;
        return (
          <div key={step.id} className="relative flex items-center w-full max-w-[180px]">
            <div className="flex-1 text-right pr-3">
              <div className={`text-[9px] font-bold uppercase tracking-widest transition-colors ${isActive ? accentClass : isPast ? "text-muted-foreground" : "text-border"}`}>
                {step.label}
              </div>
            </div>
            <div className="relative flex flex-col items-center justify-center z-10">
              <div className={`w-6 h-6 rounded border-2 flex items-center justify-center bg-card text-[9px] font-bold transition-all ${isActive ? `border-current ${accentClass} shadow-[0_0_10px_rgba(0,255,255,0.3)]` : isPast ? "border-muted-foreground text-muted-foreground" : "border-border text-border"}`}>
                {idx + 1}
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`w-0.5 h-3.5 absolute top-6 ${isPast || isActive ? "bg-primary/50" : "bg-border"}`} />
              )}
            </div>
            <div className="flex-1 pl-3">
              <div className={`text-[9px] transition-colors ${isActive ? "text-foreground" : isPast ? "text-muted-foreground" : "text-border"}`}>
                {step.desc}
              </div>
            </div>
          </div>
        );
      })}
      <div className="text-[10px] text-muted-foreground mt-1">
        Iter: <span className={`font-bold ${accentClass}`}>{Math.max(1, currentStepIndex >= 0 ? iteration : 0)}</span>/{maxIterations}
      </div>
    </div>
  );
}

export default function DebugSimulator({ platforms, selfHealingData, pipelineData: _pipelineData, comparisonData }: DebugSimulatorProps) {
  const [selectedPlatformId, setSelectedPlatformId] = useState<string>(platforms[0]?.id || "");
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [iteration, setIteration] = useState(1);
  const [speedMs, setSpeedMs] = useState(1500);

  const [compareMode, setCompareMode] = useState(false);
  const [selectedPlatformIdB, setSelectedPlatformIdB] = useState<string>(platforms[1]?.id || "");
  const [currentStepIndexB, setCurrentStepIndexB] = useState(-1);
  const [iterationB, setIterationB] = useState(1);

  // ── Live metrics ──
  const [uptimeSecs, setUptimeSecs] = useState(0);
  const [totalLoops, setTotalLoops] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [activityLog, setActivityLog] = useState<{ time: string; msg: string; color: string }[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  const selectedPlatform = platforms.find((p) => p.id === selectedPlatformId);
  const selfHealing = selfHealingData.find((s) => s.platform === selectedPlatform?.name);
  const comparison = comparisonData.find((c) => c.platform === selectedPlatform?.name);

  const selectedPlatformB = platforms.find((p) => p.id === selectedPlatformIdB);
  const selfHealingB = selfHealingData.find((s) => s.platform === selectedPlatformB?.name);
  const comparisonB = comparisonData.find((c) => c.platform === selectedPlatformB?.name);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const timerRefB = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setTimeout(() => {
        if (currentStepIndex < STEPS.length - 1) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          const maxIterations = selfHealing?.iterationsTypical || 1;
          if (iteration < maxIterations) {
            setIteration((prev) => prev + 1);
            setCurrentStepIndex(1);
          } else {
            setIsPlaying(false);
          }
        }
      }, speedMs);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [isPlaying, currentStepIndex, iteration, selfHealing, speedMs]);

  useEffect(() => {
    if (isPlaying && compareMode) {
      timerRefB.current = setTimeout(() => {
        if (currentStepIndexB < STEPS.length - 1) {
          setCurrentStepIndexB((prev) => prev + 1);
        } else {
          const maxB = selfHealingB?.iterationsTypical || 1;
          if (iterationB < maxB) {
            setIterationB((prev) => prev + 1);
            setCurrentStepIndexB(1);
          }
        }
      }, speedMs);
    }
    return () => { if (timerRefB.current) clearTimeout(timerRefB.current); };
  }, [isPlaying, compareMode, currentStepIndexB, iterationB, selfHealingB, speedMs]);

  // ── Uptime ticker (always runs) ──
  useEffect(() => {
    const iv = setInterval(() => setUptimeSecs((s) => s + 1), 1000);
    return () => clearInterval(iv);
  }, []);

  // ── Activity log push when step changes ──
  useEffect(() => {
    if (!isPlaying || currentStepIndex < 0) return;
    const step = STEPS[currentStepIndex];
    const t = new Date().toLocaleTimeString("en-US", { hour12: false });
    const name = selectedPlatform?.name ?? "?";
    const msgs: Record<string, { msg: string; color: string }> = {
      WRITE:   { msg: `[${name}] WRITE — code generated (iter ${iteration}/${selfHealing?.iterationsTypical ?? 1})`, color: "#7AA2F7" },
      RUN:     { msg: `[${name}] RUN → TypeError thrown at runtime`,                                                  color: "#F7768E" },
      DETECT:  { msg: `[${name}] DETECT — ReferenceError classified (severity: critical)`,                            color: "#E0AF68" },
      ANALYZE: { msg: `[${name}] ANALYZE — root cause: missing import (97.3% confidence)`,                           color: "#BB9AF7" },
      PATCH:   { msg: `[${name}] PATCH applied — bcrypt.hash() inserted`,                                             color: "#9ECE6A" },
      TEST:    { msg: `[${name}] TEST — 3/3 passing ✓  cycle complete`,                                               color: "#9ECE6A" },
    };
    const entry = msgs[step.id] ?? { msg: `[${name}] ${step.label}`, color: "#9AA5CE" };
    setActivityLog((prev) => [...prev.slice(-59), { time: t, ...entry }]);
    if (step.id === "TEST") { setTotalLoops((n) => n + 1); setSuccessCount((n) => n + 1); }
  }, [currentStepIndex, isPlaying]);

  // ── Auto-scroll log ──
  useEffect(() => {
    if (logEndRef.current) logEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [activityLog]);

  const formatUptime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const isDoneA = currentStepIndex === STEPS.length - 1 && iteration >= (selfHealing?.iterationsTypical || 1);

  const togglePlay = () => {
    if (isDoneA) {
      setCurrentStepIndex(0); setIteration(1);
      if (compareMode) { setCurrentStepIndexB(0); setIterationB(1); }
      setIsPlaying(true);
    } else {
      if (!isPlaying && currentStepIndex === -1) {
        setCurrentStepIndex(0);
        if (compareMode) setCurrentStepIndexB(0);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePlatformChange = (id: string) => { setSelectedPlatformId(id); setIsPlaying(false); setCurrentStepIndex(-1); setIteration(1); };
  const handlePlatformChangeB = (id: string) => { setSelectedPlatformIdB(id); setIsPlaying(false); setCurrentStepIndexB(-1); setIterationB(1); };

  const toggleCompareMode = () => {
    setCompareMode((m) => !m); setIsPlaying(false);
    setCurrentStepIndex(-1); setCurrentStepIndexB(-1); setIteration(1); setIterationB(1);
  };

  const activeStep = currentStepIndex >= 0 ? STEPS[currentStepIndex] : null;
  const codeSnippet = activeStep ? (CODE_SNIPPETS[activeStep.id]?.default) : null;

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col overflow-hidden font-mono">
      <AppNav />
      <div className="flex flex-col md:flex-row p-4 gap-4 flex-1 overflow-hidden">

        {/* LEFT: Platform Selector */}
        <div className="w-full md:w-1/4 flex flex-col gap-4">
          <div className="p-4 border border-border bg-card rounded flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h2 className="text-primary text-sm uppercase tracking-widest font-bold">
                {compareMode ? "Select Platforms" : "AuRen OS // Select Platform"}
              </h2>
              <button
                onClick={toggleCompareMode}
                title="Compare 2 platforms"
                className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded border transition-all ${compareMode ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"}`}
              >
                <GitCompare className="w-3 h-3" />
                {compareMode ? "ON" : "Compare"}
              </button>
            </div>

            {compareMode ? (
              <div className="flex flex-col gap-4 mt-2">
                <div>
                  <div className="text-[10px] text-primary uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <span className="w-4 h-4 rounded bg-primary/20 text-primary flex items-center justify-center text-[9px] font-bold">A</span>
                    Platform A
                  </div>
                  <div className="flex flex-col gap-1">
                    {platforms.map((p) => (
                      <button key={p.id} onClick={() => handlePlatformChange(p.id)}
                        className={`text-left px-3 py-2 rounded transition-all flex items-center justify-between border text-[11px] ${selectedPlatformId === p.id ? "bg-primary/10 border-primary text-primary" : "bg-transparent border-transparent hover:bg-muted text-muted-foreground"}`}>
                        <span className="font-bold truncate">{p.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider mb-1.5 flex items-center gap-1 text-purple-400">
                    <span className="w-4 h-4 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center text-[9px] font-bold">B</span>
                    Platform B
                  </div>
                  <div className="flex flex-col gap-1">
                    {platforms.map((p) => (
                      <button key={p.id} onClick={() => handlePlatformChangeB(p.id)}
                        className={`text-left px-3 py-2 rounded transition-all flex items-center justify-between border text-[11px] ${selectedPlatformIdB === p.id ? "bg-purple-500/10 border-purple-500 text-purple-400" : "bg-transparent border-transparent hover:bg-muted text-muted-foreground"}`}>
                        <span className="font-bold truncate">{p.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-4">
                {platforms.map((p) => (
                  <button key={p.id} data-testid={`button-platform-${p.id}`} onClick={() => handlePlatformChange(p.id)}
                    className={`text-left px-4 py-3 rounded transition-all flex items-center justify-between border ${selectedPlatformId === p.id ? "bg-primary/10 border-primary text-primary" : "bg-transparent border-transparent hover:bg-muted text-muted-foreground"}`}>
                    <span className="font-bold truncate text-[12px]">{p.name}</span>
                    {p.openSource && <span className="text-[10px] bg-accent/20 text-accent px-2 py-1 rounded shrink-0">OS</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Speed Control */}
          <div className="p-4 border border-border bg-card rounded flex flex-col gap-2">
            <h3 className="flex items-center gap-1.5 text-xs text-muted-foreground uppercase tracking-wider mb-2">
              <Gauge className="w-3.5 h-3.5" /> Speed Control
            </h3>
            <div className="flex gap-1.5">
              {SPEED_OPTIONS.map(({ label, ms }) => (
                <button key={label} onClick={() => setSpeedMs(ms)}
                  className={`flex-1 text-[11px] py-1.5 rounded border transition-all font-bold uppercase tracking-widest ${speedMs === ms ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:border-primary/40"}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Watchdog Status */}
          <div className="p-4 border border-border bg-card rounded flex flex-col gap-2">
            <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">System Status</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm">Watchdog Process</span>
              <span className={`text-xs px-2 py-1 rounded font-bold ${selfHealing?.hasWatchdog ? "bg-primary/20 text-primary" : "bg-destructive/20 text-destructive"}`}>
                {selfHealing?.hasWatchdog ? "ACTIVE" : "OFFLINE"}
              </span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm">Automation Level</span>
              <span className="text-xs px-2 py-1 bg-muted rounded font-bold text-foreground">
                Lvl {selectedPlatform?.automationLevel}
              </span>
            </div>
          </div>

          {/* Activity Log */}
          <div className="p-3 border border-border bg-card rounded flex flex-col gap-1 flex-1 min-h-0">
            <div className="flex items-center justify-between mb-1 shrink-0">
              <h3 className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Activity Log</h3>
              <span className="text-[9px] font-mono text-muted-foreground/60">{activityLog.length} events</span>
            </div>
            <div className="flex flex-col gap-0 overflow-y-auto flex-1 font-mono min-h-[100px] max-h-[220px]">
              {activityLog.length === 0 ? (
                <span className="text-[9px] text-muted-foreground/40 mt-2">Waiting for loop to start...</span>
              ) : activityLog.map((e, i) => (
                <div key={i} className="flex gap-1.5 leading-5 text-[9px]">
                  <span className="text-muted-foreground/60 shrink-0 tabular-nums">{e.time}</span>
                  <span style={{ color: e.color }}>{e.msg}</span>
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>
        </div>

        {/* CENTER: Visualizer */}
        <div className="w-full md:w-2/4 flex flex-col gap-4 relative">
          <div className="p-4 border border-border bg-card rounded flex-1 flex flex-col relative overflow-hidden">
            {/* ── Live Metrics Bar ── */}
            <div className="flex items-center gap-3 mb-3 px-3 py-2 rounded border border-border/60 bg-muted/20 font-mono text-[10px] flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-primary animate-pulse" : "bg-muted-foreground/40"}`} />
                <span className="text-muted-foreground">STATUS</span>
                <span className={`font-bold ${isPlaying ? "text-primary" : "text-muted-foreground"}`}>{isPlaying ? "RUNNING" : isDoneA ? "DONE" : "IDLE"}</span>
              </div>
              <span className="text-border">|</span>
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground">UPTIME</span>
                <span className="text-foreground font-bold tabular-nums">{formatUptime(uptimeSecs)}</span>
              </div>
              <span className="text-border">|</span>
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground">LOOPS</span>
                <span className="text-foreground font-bold">{totalLoops}</span>
              </div>
              <span className="text-border">|</span>
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground">SUCCESS</span>
                <span className="font-bold" style={{ color: "#9ECE6A" }}>
                  {totalLoops > 0 ? Math.round((successCount / totalLoops) * 100) : 100}%
                </span>
              </div>
              <span className="text-border">|</span>
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground">SPEED</span>
                <span className="text-foreground font-bold">{SPEED_OPTIONS.find((s) => s.ms === speedMs)?.label}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4 border-b border-border pb-4">
              <h2 className="text-primary text-sm uppercase tracking-widest font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Live Debug Loop Visualizer
              </h2>
              <div className="flex items-center gap-4">
                <div className="text-xs text-muted-foreground">
                  {compareMode ? (
                    <span>
                      <span className="text-primary font-bold">{selectedPlatform?.name}</span>
                      {" vs "}
                      <span className="text-purple-400 font-bold">{selectedPlatformB?.name}</span>
                    </span>
                  ) : (
                    <>Iteration: <span className="text-foreground font-bold">{iteration}</span> / {selfHealing?.iterationsTypical || 1}</>
                  )}
                </div>
                <button data-testid="button-play-pause" onClick={togglePlay}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded text-xs font-bold uppercase tracking-wider hover:bg-primary/80 transition-colors">
                  {isPlaying ? "PAUSE" : isDoneA ? "RESTART" : "PLAY"}
                </button>
              </div>
            </div>

            {compareMode ? (
              <div className="flex flex-1 gap-2">
                <div className="flex-1 flex flex-col border-r border-border/50 pr-4">
                  <div className="text-[10px] text-primary uppercase tracking-widest font-bold mb-2 flex items-center gap-1">
                    <span className="w-3.5 h-3.5 rounded bg-primary/20 flex items-center justify-center text-[8px]">A</span>
                    {selectedPlatform?.name}
                  </div>
                  <MiniLoop currentStepIndex={currentStepIndex} iteration={iteration} maxIterations={selfHealing?.iterationsTypical || 1} accentClass="text-primary" />
                </div>
                <div className="flex-1 flex flex-col pl-2">
                  <div className="text-[10px] text-purple-400 uppercase tracking-widest font-bold mb-2 flex items-center gap-1">
                    <span className="w-3.5 h-3.5 rounded bg-purple-500/20 flex items-center justify-center text-[8px] text-purple-400">B</span>
                    {selectedPlatformB?.name}
                  </div>
                  <MiniLoop currentStepIndex={currentStepIndexB} iteration={iterationB} maxIterations={selfHealingB?.iterationsTypical || 1} accentClass="text-purple-400" />
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-center items-center gap-6 relative py-4">
                {STEPS.map((step, idx) => {
                  const isActive = currentStepIndex === idx;
                  const isPast = currentStepIndex > idx;
                  return (
                    <div key={step.id} className="relative flex items-center w-full max-w-md">
                      <div className="flex-1 text-right pr-6">
                        <div className={`text-xs font-bold uppercase tracking-widest transition-colors ${isActive ? "text-primary" : isPast ? "text-muted-foreground" : "text-border"}`}>
                          {step.label}
                        </div>
                      </div>
                      <div className="relative flex flex-col items-center justify-center z-10">
                        <motion.div
                          className={`w-8 h-8 rounded border-2 flex items-center justify-center bg-card ${isActive ? "border-primary text-primary shadow-[0_0_15px_rgba(0,255,255,0.5)]" : isPast ? "border-muted-foreground text-muted-foreground" : "border-border text-border"}`}
                          animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          {idx + 1}
                        </motion.div>
                        {idx < STEPS.length - 1 && (
                          <div className={`w-0.5 h-6 absolute top-8 ${isPast || isActive ? "bg-primary/50" : "bg-border"}`} />
                        )}
                      </div>
                      <div className="flex-1 pl-6">
                        <div className={`text-xs transition-colors ${isActive ? "text-foreground" : isPast ? "text-muted-foreground" : "text-border"}`}>
                          {step.desc}
                        </div>
                      </div>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="absolute left-[calc(50%+120px)] w-48 text-[10px] text-accent p-2 border border-accent/20 bg-accent/5 rounded"
                          >
                            {idx === 0 && `Structure: ${selfHealing?.loopStructure}`}
                            {idx === 2 && `Detection: ${selfHealing?.errorDetection}`}
                            {idx === 4 && `Patching: ${selfHealing?.patchingMethod}`}
                            {idx === 5 && `Condition: ${selfHealing?.stoppingCondition}`}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
                {currentStepIndex > 1 && iteration < (selfHealing?.iterationsTypical || 1) && (
                  <svg className="absolute left-8 top-16 w-16 h-full stroke-primary/30 fill-none z-0" style={{ pointerEvents: "none" }}>
                    <path d="M 16 0 C -20 0, -20 200, 16 200" strokeWidth="2" strokeDasharray="4 4" />
                  </svg>
                )}

                {/* Code Snippet Panel */}
                <AnimatePresence mode="wait">
                  {codeSnippet && currentStepIndex >= 0 && (
                    <motion.div
                      key={currentStepIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="w-full max-w-md mt-2"
                    >
                      <div className="rounded border border-border bg-card/80 overflow-hidden">
                        <div className="flex items-center gap-2 px-3 py-1.5 border-b border-border/50 bg-muted/30">
                          <div className="flex gap-1">
                            <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                          </div>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-widest ml-1">{STEPS[currentStepIndex]?.label} — {selectedPlatform?.name}</span>
                        </div>
                        <pre className="text-[10px] leading-relaxed p-3 overflow-x-auto" style={{ color: codeSnippet.color, fontFamily: "'DM Mono', 'Fira Mono', monospace" }}>
                          {codeSnippet.code}
                        </pre>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Detail / Comparison Panel */}
        <div className="w-full md:w-1/4 flex flex-col gap-4">
          <div className="p-4 border border-border bg-card rounded flex flex-col gap-4 flex-1">
            {compareMode ? (
              <>
                <div>
                  <h2 className="text-primary text-sm uppercase tracking-widest font-bold mb-1">Comparison</h2>
                  <p className="text-xs text-muted-foreground">{selectedPlatform?.name} vs {selectedPlatformB?.name}</p>
                </div>
                <div className="flex flex-col gap-3.5">
                  {[
                    { label: "Autonomy",       a: comparison?.autonomy,       b: comparisonB?.autonomy },
                    { label: "Code Quality",   a: comparison?.codeQuality,    b: comparisonB?.codeQuality },
                    { label: "Self-Healing",   a: comparison?.selfHealing,    b: comparisonB?.selfHealing },
                    { label: "Infrastructure", a: comparison?.infrastructure, b: comparisonB?.infrastructure },
                    { label: "Deploy Ease",    a: comparison?.deploymentEase, b: comparisonB?.deploymentEase },
                    { label: "Collaboration",  a: comparison?.collaboration,  b: comparisonB?.collaboration },
                  ].map((stat) => (
                    <div key={stat.label} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{stat.label}</div>
                        <div className="flex gap-2 text-[10px] font-bold">
                          <span className="text-primary">{stat.a ?? "-"}</span>
                          <span className="text-muted-foreground">/</span>
                          <span className="text-purple-400">{stat.b ?? "-"}</span>
                        </div>
                      </div>
                      <div className="relative h-1.5 bg-muted rounded overflow-hidden">
                        <div className="absolute h-full bg-primary/60 rounded" style={{ width: `${(stat.a || 0) * 10}%` }} />
                      </div>
                      <div className="relative h-1.5 bg-muted rounded overflow-hidden">
                        <div className="absolute h-full bg-purple-500/60 rounded" style={{ width: `${(stat.b || 0) * 10}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-auto flex gap-4 text-[10px] text-muted-foreground border-t border-border pt-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-1.5 rounded bg-primary/60 inline-block" />
                    {selectedPlatform?.name}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-1.5 rounded bg-purple-500/60 inline-block" />
                    {selectedPlatformB?.name}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2 className="text-primary text-sm uppercase tracking-widest font-bold mb-1">{selectedPlatform?.name} // telemetry</h2>
                  <p className="text-xs text-muted-foreground">{selectedPlatform?.description}</p>
                </div>

                <div className="mt-2 flex flex-col gap-3">
                  <div>
                    <h3 className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 border-b border-border pb-1">Loop Structure</h3>
                    <p className="text-xs">{selfHealing?.loopStructure || "N/A"}</p>
                  </div>
                  <div>
                    <h3 className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 border-b border-border pb-1">Error Detection</h3>
                    <p className="text-xs">{selfHealing?.errorDetection || "N/A"}</p>
                  </div>
                  <div>
                    <h3 className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 border-b border-border pb-1">Patching Method</h3>
                    <p className="text-xs text-accent">{selfHealing?.patchingMethod || "N/A"}</p>
                  </div>
                  <div>
                    <h3 className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 border-b border-border pb-1">Stopping Condition</h3>
                    <p className="text-xs">{selfHealing?.stoppingCondition || "N/A"}</p>
                  </div>
                </div>

                <div className="mt-auto">
                  <h3 className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 border-b border-border pb-1">Capabilities</h3>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: "Autonomy",      value: comparison?.autonomy },
                      { label: "Code Quality",  value: comparison?.codeQuality },
                      { label: "Self-Healing",  value: comparison?.selfHealing },
                      { label: "Infrastructure",value: comparison?.infrastructure },
                    ].map((stat) => (
                      <div key={stat.label} className="flex items-center gap-2">
                        <div className="w-24 text-[10px] uppercase tracking-wider text-muted-foreground">{stat.label}</div>
                        <div className="flex-1 h-1.5 bg-muted rounded overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${(stat.value || 0) * 10}%` }} />
                        </div>
                        <div className="w-6 text-right text-[10px] font-bold">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
