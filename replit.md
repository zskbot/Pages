# AuRen OS

AuRen OS is a pnpm monorepo housing an AI agent platform with a community marketplace, analytics dashboard, slide deck, debug simulator, and a contract-first REST API.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

```
artifacts/
  auren-workspace/      React + Vite AI agent workspace IDE (path: /workspace/)
    src/pages/          landing, workspace, tools, library, extensions, projects, settings
    src/components/     Sidebar, MobileNav, AuRenMascot
    src/hooks/useAuth.ts  localStorage-based auth gate (UI only, not server-enforced)
  aurenhub/             React + Vite skills & plugins marketplace (path: /aurenhub/)
    src/pages/          home, skills, plugins, publishers, portal
    src/data/catalog.ts Skills & plugins data (source of truth for marketplace content)
    src/hooks/useAuth.ts  GitHub OAuth UI state
  ai-platform-dashboard/ React + Vite + Recharts analytics dashboard (path: /)
  ai-platforms-slides/  Slide deck artifact (path: /ai-platforms-slides/)
  debug-simulator/      Self-healing debug loop visualizer (path: /simulator/)
  api-server/           Express 5 REST API (path: /api/)
    src/app.ts          Express app setup, middleware, route registration
    src/routes/         platforms.ts, research.ts, health.ts
  mockup-sandbox/       Dev-only component preview server (path: /__mockup)
lib/
  api-spec/openapi.yaml OpenAPI 3.1 contract — SSOT for all API shapes
  api-client-react/     Generated React Query hooks (via Orval)
  api-zod/              Generated Zod schemas (via Orval)
  db/                   Drizzle ORM schema + PostgreSQL connector
scripts/                Utility scripts (shared workspace package)
tsconfig.base.json      Shared strict TypeScript defaults
pnpm-workspace.yaml     Workspace catalog & dependency overrides
```

## Architecture decisions

- **Contract-first API** — The OpenAPI spec at `lib/api-spec/openapi.yaml` is the single source of truth; React Query hooks and Zod schemas are generated from it via Orval. Never handwrite client types or server response shapes — regenerate with `codegen` after spec changes.
- **No global JSX namespace** — With React 19 and `@types/react` ≥18, `JSX.Element` is no longer a global type. Use `React.JSX.Element` or import `ReactElement` from `react` directly.
- **Client-side auth is UI-only** — `useAuth.ts` in both `auren-workspace` and `aurenhub` stores login state in `localStorage`. This is a presentation gate, not a security boundary. Future server-protected routes must enforce auth server-side.
- **Path-based monorepo routing** — A shared reverse proxy routes traffic by path prefix per artifact (`/api`, `/workspace/`, `/aurenhub/`, etc.). Services must handle their full base path; do not add Vite proxy configs or hardcode ports. Always use `localhost:80/<path>` for ad hoc requests, never the raw service port.
- **esbuild for the API, Vite for frontends** — The API server bundles to a CJS output via esbuild; all frontend artifacts use Vite 6. `pnpm run build` runs typecheck first and then builds all packages in dependency order.

## Product

AuRen OS provides a suite of interconnected tools for AI agent development:

- **AuRen Workspace** (`/workspace/`) — A browser-based IDE with AI agent chat, a self-healing debug loop, a VSCode-style extensions marketplace, a 50+-tool library, and full project management with ZIP export.
- **AuRenHub** (`/aurenhub/`) — A community marketplace listing 16 skills and 12 plugins, with publisher profiles, real-time search/filter, and a unified portal launcher for all AuRen apps.
- **AI Platform Dashboard** (`/`) — An analytics dashboard comparing AI development platforms (2024–2026) with interactive Recharts visualizations.
- **AI Platforms Slides** (`/ai-platforms-slides/`) — A professional slide deck artifact covering the AI landscape.
- **Debug Loop Simulator** (`/simulator/`) — A visual demonstration of the detect → patch → verify self-healing debug loop.
- **API Server** (`/api/`) — An Express 5 REST API serving public, read-only research and platform comparison data backed by an OpenAPI 3.1 contract.

## User preferences

- Use `catalog:` entries in `pnpm-workspace.yaml` for any dependency that already has a catalog pin — do not hardcode versions in individual `package.json` files when a catalog entry exists.
- Never use `console.log` in server code — use `req.log` in route handlers and the `logger` singleton elsewhere (Pino).
- Keep the OpenAPI spec as the single source of truth; run `codegen` after every spec change before touching generated files.

## Gotchas

- **Never run `pnpm dev` at the workspace root** — there is no root `dev` script. Artifacts are started via Replit workflows which inject `PORT` and `BASE_PATH`. Use `restart_workflow` or the preview pane instead.
- **Typecheck with `pnpm run typecheck`, not `build`** — `build` requires `PORT` and `BASE_PATH` from the workflow environment and will fail from a bare shell.
- **`mockup-sandbox` is dev-only** — it must never be reachable in production. Treat it as a scratch surface for component exploration only.
- **`minimumReleaseAge: 1440`** — `pnpm-workspace.yaml` enforces a 1-day minimum package age as a supply-chain defense. Do not disable it. Add urgent exceptions to `minimumReleaseAgeExclude` only for trusted publishers and remove them once the window passes.
- **DB package is wired but dormant** — `lib/db` exists and `DATABASE_URL` must be set, but no live API routes currently import it. Enabling DB-backed routes requires server-side auth enforcement first.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
