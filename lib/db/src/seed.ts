import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema/index.js";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

async function seed() {
  console.log("Seeding platforms...");
  await db.insert(schema.platformsTable).values([
    { id: "devin", name: "Devin", company: "Cognition AI", type: "Cloud AI Agent", description: "Fully autonomous agentic cloud IDE driven by LLM with built-in shell, editor, and browser.", keyDifferentiator: "Fully autonomous; minimal human input; handles large codebases; production-grade deployment", openSource: false, selfHosted: false, automationLevel: 10, deploymentType: "Cloud SaaS" },
    { id: "copilot-workspace", name: "GitHub Copilot Workspace", company: "GitHub / Microsoft", type: "Cloud AI IDE", description: "LLM-powered collaborative workspace with deep GitHub integration and planning-first workflow.", keyDifferentiator: "Planning-first; tight GitHub workflow; agent cannot merge own PRs; multi-model support", openSource: false, selfHosted: false, automationLevel: 7, deploymentType: "Cloud SaaS" },
    { id: "replit-agent", name: "Replit Agent", company: "Replit", type: "Browser-based AI IDE", description: "Browser-based agentic IDE with LLM orchestrator running on NixOS runtime.", keyDifferentiator: "No-code for non-devs; agent builds/patches live; persistent agent workflows", openSource: false, selfHosted: false, automationLevel: 9, deploymentType: "Cloud SaaS" },
    { id: "cursor", name: "Cursor", company: "Anysphere", type: "AI-native IDE", description: "AI-native IDE based on VS Code with multi-agent, multi-model support and deep codebase context.", keyDifferentiator: "Deep codebase context; agent mode for autonomous edits; automations for event-driven workflows", openSource: false, selfHosted: false, automationLevel: 8, deploymentType: "Desktop + Cloud" },
    { id: "bolt-new", name: "Bolt.new", company: "StackBlitz", type: "Browser-based Builder", description: "Browser-based all-in-one agentic builder with multi-agent switchboard.", keyDifferentiator: "All-in-one infra; visual interface; no manual setup; multi-agent orchestration; rapid prototyping", openSource: false, selfHosted: false, automationLevel: 9, deploymentType: "Cloud SaaS" },
    { id: "v0-dev", name: "v0.dev", company: "Vercel", type: "UI Code Generator", description: "LLM-powered UI/code generator with Vercel infra and MCP protocol support.", keyDifferentiator: "UI-first; image-to-code; marketplace integrations; best for frontend-heavy apps", openSource: false, selfHosted: false, automationLevel: 6, deploymentType: "Cloud SaaS" },
    { id: "openclaw", name: "OpenClaw (AuRen)", company: "AuRen / Open Source", type: "Self-hosted AI Gateway", description: "Self-hosted gateway with agentic pipeline, model-agnostic, Node.js based.", keyDifferentiator: "Privacy-first, self-hosted; full pipeline automation; multi-channel; open-source", openSource: true, selfHosted: true, automationLevel: 9, deploymentType: "Self-hosted" },
    { id: "claude-code", name: "Claude Code", company: "Anthropic", type: "Cloud AI Agent", description: "Anthropic's agentic coding assistant — autonomous terminal-native agent with deep reasoning and long-context codebase understanding.", keyDifferentiator: "Best-in-class reasoning; constitutional AI safety; 200K token context; terminal-first workflow", openSource: false, selfHosted: false, automationLevel: 9, deploymentType: "Cloud SaaS" },
    { id: "codex-cli", name: "OpenAI Codex CLI", company: "OpenAI", type: "CLI AI Agent", description: "OpenAI's open-source CLI agent that runs locally in your terminal, reads and edits files, runs commands, and iterates autonomously.", keyDifferentiator: "Open-source; local shell execution; sandboxed; full-repo context; GPT-4o powered", openSource: true, selfHosted: true, automationLevel: 8, deploymentType: "Local / Self-hosted" },
    { id: "gemini-code-assist", name: "Gemini Code Assist", company: "Google", type: "Cloud AI IDE", description: "Google's enterprise AI coding assistant with 1M-token context, deep Google Cloud integration, and multi-IDE support.", keyDifferentiator: "1M token context window; GCP-native deployment; enterprise security; Workspace integration", openSource: false, selfHosted: false, automationLevel: 7, deploymentType: "Cloud SaaS" },
  ]).onConflictDoNothing();

  console.log("Seeding platform comparisons...");
  await db.insert(schema.platformComparisonsTable).values([
    { platform: "Devin", autonomy: 10, codeQuality: 9, infrastructure: 9, selfHealing: 10, deploymentEase: 9, collaboration: 6 },
    { platform: "Copilot Workspace", autonomy: 7, codeQuality: 9, infrastructure: 7, selfHealing: 7, deploymentEase: 7, collaboration: 10 },
    { platform: "Replit Agent", autonomy: 9, codeQuality: 8, infrastructure: 10, selfHealing: 9, deploymentEase: 10, collaboration: 7 },
    { platform: "Cursor", autonomy: 8, codeQuality: 9, infrastructure: 6, selfHealing: 8, deploymentEase: 7, collaboration: 8 },
    { platform: "Bolt.new", autonomy: 9, codeQuality: 8, infrastructure: 10, selfHealing: 9, deploymentEase: 10, collaboration: 7 },
    { platform: "v0.dev", autonomy: 6, codeQuality: 8, infrastructure: 8, selfHealing: 5, deploymentEase: 9, collaboration: 6 },
    { platform: "OpenClaw", autonomy: 9, codeQuality: 8, infrastructure: 9, selfHealing: 9, deploymentEase: 8, collaboration: 6 },
    { platform: "Claude Code", autonomy: 9, codeQuality: 10, infrastructure: 7, selfHealing: 9, deploymentEase: 7, collaboration: 7 },
    { platform: "OpenAI Codex CLI", autonomy: 8, codeQuality: 9, infrastructure: 6, selfHealing: 8, deploymentEase: 6, collaboration: 6 },
    { platform: "Gemini Code Assist", autonomy: 7, codeQuality: 8, infrastructure: 9, selfHealing: 7, deploymentEase: 8, collaboration: 9 },
  ]).onConflictDoNothing();

  console.log("Seeding platform features...");
  await db.insert(schema.platformFeaturesTable).values([
    { platform: "Devin", autoTesting: true, selfHealing: true, ciCdIntegration: true, multiAgent: false, infraProvisioning: true, oneClickDeploy: true, noCodeInterface: false, openSource: false, multiModel: false },
    { platform: "Copilot Workspace", autoTesting: true, selfHealing: true, ciCdIntegration: true, multiAgent: true, infraProvisioning: true, oneClickDeploy: true, noCodeInterface: false, openSource: false, multiModel: true },
    { platform: "Replit Agent", autoTesting: true, selfHealing: true, ciCdIntegration: false, multiAgent: false, infraProvisioning: true, oneClickDeploy: true, noCodeInterface: true, openSource: false, multiModel: false },
    { platform: "Cursor", autoTesting: true, selfHealing: true, ciCdIntegration: true, multiAgent: true, infraProvisioning: false, oneClickDeploy: false, noCodeInterface: false, openSource: false, multiModel: true },
    { platform: "Bolt.new", autoTesting: true, selfHealing: true, ciCdIntegration: true, multiAgent: true, infraProvisioning: true, oneClickDeploy: true, noCodeInterface: true, openSource: false, multiModel: true },
    { platform: "v0.dev", autoTesting: false, selfHealing: false, ciCdIntegration: true, multiAgent: false, infraProvisioning: true, oneClickDeploy: true, noCodeInterface: true, openSource: false, multiModel: false },
    { platform: "OpenClaw", autoTesting: true, selfHealing: true, ciCdIntegration: true, multiAgent: true, infraProvisioning: true, oneClickDeploy: true, noCodeInterface: false, openSource: true, multiModel: true },
    { platform: "Claude Code", autoTesting: true, selfHealing: true, ciCdIntegration: true, multiAgent: true, infraProvisioning: false, oneClickDeploy: false, noCodeInterface: false, openSource: false, multiModel: false },
    { platform: "OpenAI Codex CLI", autoTesting: true, selfHealing: true, ciCdIntegration: false, multiAgent: false, infraProvisioning: false, oneClickDeploy: false, noCodeInterface: false, openSource: true, multiModel: false },
    { platform: "Gemini Code Assist", autoTesting: true, selfHealing: false, ciCdIntegration: true, multiAgent: false, infraProvisioning: true, oneClickDeploy: true, noCodeInterface: false, openSource: false, multiModel: true },
  ]).onConflictDoNothing();

  console.log("Seeding platform trending...");
  await db.insert(schema.platformTrendingTable).values([
    { platform: "Claude Code", growthScore: 97, trend: "rising", note: "Fastest adoption in enterprise 2025; constitutional AI + 200K context" },
    { platform: "OpenAI Codex CLI", growthScore: 91, trend: "rising", note: "Open-source CLI explosion; 60K GitHub stars in first month" },
    { platform: "Bolt.new", growthScore: 88, trend: "rising", note: "Multi-agent switchboard; WebContainers hit 10M monthly users" },
    { platform: "Replit Agent", growthScore: 85, trend: "stable", note: "Steady growth; no-code + agent workflow gaining enterprise traction" },
    { platform: "Cursor", growthScore: 82, trend: "stable", note: "900K MAU; Composer + multi-model agents dominant in dev teams" },
    { platform: "Devin", growthScore: 74, trend: "stable", note: "Enterprise contracts; expanding to team-level autonomous coding" },
    { platform: "Gemini Code Assist", growthScore: 70, trend: "rising", note: "1M token context; GCP enterprise bundle driving B2B growth" },
    { platform: "Copilot Workspace", growthScore: 65, trend: "stable", note: "Deep GitHub/Azure integration; 1.8M enterprise subscribers" },
    { platform: "OpenClaw", growthScore: 58, trend: "rising", note: "Self-hosted privacy-first; growing in regulated industries" },
    { platform: "v0.dev", growthScore: 55, trend: "stable", note: "Vercel ecosystem lock-in; frontend-focused niche" },
  ]).onConflictDoNothing();

  console.log("Seeding self-healing data...");
  await db.insert(schema.selfHealingTable).values([
    { platform: "Devin", loopStructure: "Generate → Run → Detect → Patch → Rerun", errorDetection: "Log analysis, stack traces, test failures", patchingMethod: "LLM-based autonomous patching with context", stoppingCondition: "All tests pass or iteration limit reached", iterationsTypical: 5, hasWatchdog: true },
    { platform: "GitHub Copilot Workspace", loopStructure: "Generate → Run → Detect → Patch → PR", errorDetection: "CI/CD feedback, security scans, test output", patchingMethod: "LLM via multi-model with human review gate", stoppingCondition: "Human review required before merge", iterationsTypical: 3, hasWatchdog: false },
    { platform: "Replit Agent", loopStructure: "Build → Test in Browser → Detect → Fix → Rollback", errorDetection: "Browser auto-testing, runtime error detection", patchingMethod: "LLM-based, safe rollback checkpoints", stoppingCondition: "App passes tests or user intervention", iterationsTypical: 4, hasWatchdog: true },
    { platform: "Cursor", loopStructure: "Generate → CI Feedback → Detect → Patch → Rerun", errorDetection: "CI integration, LSP diagnostics, test output", patchingMethod: "Multi-model LLM via Agent Mode, auto-diff", stoppingCondition: "All tests pass or iteration limit", iterationsTypical: 4, hasWatchdog: false },
    { platform: "Bolt.new", loopStructure: "Generate → Run → Detect → Patch → Rerun", errorDetection: "Self-monitoring, log streaming, runtime errors", patchingMethod: "Multi-agent orchestration, auto-refactor", stoppingCondition: "All tests pass, 98% fewer error loops", iterationsTypical: 3, hasWatchdog: true },
    { platform: "v0.dev", loopStructure: "Generate → Manual Test → Iterate", errorDetection: "User-driven, limited automated detection", patchingMethod: "LLM regeneration from user feedback", stoppingCondition: "User approval", iterationsTypical: 2, hasWatchdog: false },
    { platform: "OpenClaw", loopStructure: "Generate → Run → Detect → Patch → Rerun", errorDetection: "Log streaming, crash detection, watchdog recovery", patchingMethod: "Multi-model LLM routing, auto-patch pipeline", stoppingCondition: "All tests pass or watchdog escalation", iterationsTypical: 5, hasWatchdog: true },
    { platform: "Claude Code", loopStructure: "Plan → Generate → Run → Detect → Reason → Patch → Verify", errorDetection: "Deep reasoning trace, stack analysis, assertion failures", patchingMethod: "Constitutional chain-of-thought patching with safety checks", stoppingCondition: "All assertions pass; constitutional guardrails clear", iterationsTypical: 4, hasWatchdog: true },
    { platform: "OpenAI Codex CLI", loopStructure: "Generate → Shell Execute → Detect → Patch → Re-execute", errorDetection: "Terminal stdout/stderr capture, exit code analysis", patchingMethod: "GPT-4o diff-based patching with sandboxed shell execution", stoppingCondition: "Zero-exit shell commands; test suite green", iterationsTypical: 3, hasWatchdog: false },
    { platform: "Gemini Code Assist", loopStructure: "Generate → CI Trigger → Detect → Patch → Review", errorDetection: "GCP Cloud Build logs, test runner output", patchingMethod: "Gemini 1.5 Pro large-context patch with GCP integration", stoppingCondition: "CI pipeline green; human review gate optional", iterationsTypical: 3, hasWatchdog: false },
  ]).onConflictDoNothing();

  console.log("Seeding automation pipeline...");
  await db.insert(schema.automationPipelineTable).values([
    { stage: "Human Intent", description: "User provides a natural language prompt or specification describing the desired software.", platformCount: 10, platforms: JSON.stringify(["Devin", "Copilot Workspace", "Replit Agent", "Cursor", "Bolt.new", "v0.dev", "OpenClaw", "Claude Code", "OpenAI Codex CLI", "Gemini Code Assist"]) },
    { stage: "LLM Planner", description: "AI analyzes intent, creates a structured plan, selects architecture and tech stack.", platformCount: 10, platforms: JSON.stringify(["Devin", "Copilot Workspace", "Replit Agent", "Cursor", "Bolt.new", "v0.dev", "OpenClaw", "Claude Code", "OpenAI Codex CLI", "Gemini Code Assist"]) },
    { stage: "Code Generation", description: "Multi-file, context-aware code generation across frontend, backend, database, and auth.", platformCount: 10, platforms: JSON.stringify(["Devin", "Copilot Workspace", "Replit Agent", "Cursor", "Bolt.new", "v0.dev", "OpenClaw", "Claude Code", "OpenAI Codex CLI", "Gemini Code Assist"]) },
    { stage: "Automated Testing", description: "AI generates and runs tests, parses output, and detects failures automatically.", platformCount: 9, platforms: JSON.stringify(["Devin", "Copilot Workspace", "Replit Agent", "Cursor", "Bolt.new", "OpenClaw", "Claude Code", "OpenAI Codex CLI", "Gemini Code Assist"]) },
    { stage: "Self-Healing Loop", description: "Detect error → generate patch → rerun until all tests pass or limit reached.", platformCount: 8, platforms: JSON.stringify(["Devin", "Copilot Workspace", "Replit Agent", "Cursor", "Bolt.new", "OpenClaw", "Claude Code", "OpenAI Codex CLI"]) },
    { stage: "Infra Provisioning", description: "Auto-provision containers, databases, secrets, networking, and domain routing.", platformCount: 7, platforms: JSON.stringify(["Devin", "Copilot Workspace", "Replit Agent", "Bolt.new", "v0.dev", "OpenClaw", "Gemini Code Assist"]) },
    { stage: "Deployment", description: "One-click deploy with HTTPS, domain mapping, autoscaling, and live URL.", platformCount: 7, platforms: JSON.stringify(["Devin", "Copilot Workspace", "Replit Agent", "Bolt.new", "v0.dev", "OpenClaw", "Gemini Code Assist"]) },
  ]).onConflictDoNothing();

  console.log("Seeding news items...");
  await db.insert(schema.newsItemsTable).values([
    { id: "news-001", date: "2025-04", platform: "Claude Code", headline: "Anthropic launches Claude Code — terminal-native autonomous agent", summary: "Claude Code ships as a CLI agent with full shell access, 200K context window, and constitutional AI safety guardrails. Fastest enterprise adoption in Anthropic history.", tag: "launch", impact: "high" },
    { id: "news-002", date: "2025-05", platform: "OpenAI Codex CLI", headline: "OpenAI open-sources Codex CLI — 60K GitHub stars in 30 days", summary: "OpenAI releases Codex CLI as MIT-licensed open source. The sandboxed local agent runs GPT-4o, executes shell commands, and iterates autonomously. Developer community response: overwhelming.", tag: "open-source", impact: "high" },
    { id: "news-003", date: "2025-02", platform: "Gemini Code Assist", headline: "Google Gemini Code Assist enters enterprise with 1M token context", summary: "Google's Code Assist integrates with VS Code, JetBrains, and Cloud Shell. 1M token context window enables full monorepo understanding. GCP enterprise bundle drives B2B adoption.", tag: "enterprise", impact: "medium" },
    { id: "news-004", date: "2025-01", platform: "Cursor", headline: "Cursor hits 900K MAU; raises $105M Series B", summary: "Cursor Composer with multi-agent support sees massive adoption. Background agents run autonomously in the cloud while developers continue working locally.", tag: "growth", impact: "high" },
    { id: "news-005", date: "2024-12", platform: "Bolt.new", headline: "Bolt.new multi-agent switchboard ships — 10M monthly users", summary: "StackBlitz ships multi-agent orchestration in Bolt.new. WebContainers full-stack runtime now handles 10 million monthly active users with zero local setup.", tag: "milestone", impact: "medium" },
    { id: "news-006", date: "2025-03", platform: "Devin", headline: "Devin 2.0 ships — team-level autonomous coding arrives", summary: "Cognition releases Devin 2.0 with multi-agent team coordination, PR review automation, and 3x faster iteration loops. Enterprise pilot programs expand to Fortune 500.", tag: "update", impact: "high" },
  ]).onConflictDoNothing();

  console.log("Seed complete.");
  await pool.end();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
