# Threat Model

## Project Overview

AuRen OS is a pnpm monorepo that deploys several React/Vite frontend artifacts plus one Express 5 API server. In the current production code, the API serves public, read-only research and comparison data from hardcoded in-memory datasets; the shared database package exists but active database-backed application flows are not implemented yet. The `auren-workspace`, `aurenhub`, `ai-platform-dashboard`, `ai-platforms-slides`, and `debug-simulator` artifacts are presently presentation/demo surfaces; they do not expose server-backed per-user state or mutating actions. Authentication-like behavior in the `auren-workspace` and `aurenhub` frontends is currently client-side UI state stored in `localStorage`, not a server-enforced trust boundary.

Production assumption for this scan: `NODE_ENV=production`; TLS is handled by the platform; `mockup-sandbox` is never deployed to production and should be treated as dev-only unless production reachability is later demonstrated.

## Assets

- **Deployment integrity of the API server** — the Express server is the only active backend trust anchor. Compromise would let an attacker alter or replace data served to all clients.
- **Future database credentials and application secrets** — `DATABASE_URL` is required by the shared DB package even though live data paths are not wired into the current API routes. Secret leakage would matter immediately once DB-backed features are enabled.
- **Frontend origin integrity** — the deployed frontends control navigation across the product surface. Client-side code execution or origin confusion could mislead users or pivot into future authenticated features.
- **Build and generation pipeline integrity** — OpenAPI, generated Zod schemas, and shared client libraries define request/response contracts across artifacts. Tampering here can silently weaken validation everywhere.

## Trust Boundaries

- **Browser to API (`artifacts/api-server/src/app.ts`, `/api/*`)** — all client requests cross into untrusted server input. Today the routes are public and read-only, but they still must resist abusive input, excessive exposure, and future auth drift.
- **API to shared libraries (`lib/api-zod`, `lib/db`)** — the API trusts generated schemas and the DB connector. Validation regressions or unsafe DB usage would land here first. At present, the DB package is dormant because live API routes do not import it.
- **Browser local state to UI authorization (`artifacts/auren-workspace/src/hooks/useAuth.ts`, `artifacts/aurenhub/src/hooks/useAuth.ts`)** — this is a UX gate only, not a trustworthy security control. Future features must not rely on it for protecting server-side data or actions.
- **Embedded frame messaging in slides (`artifacts/ai-platforms-slides/src/App.tsx`)** — slide navigation crosses an iframe/postMessage boundary. Messages should remain constrained to benign navigation semantics and must not grow to carry secrets or privileged commands.
- **Public frontend to shared API client (`lib/api-client-react/src/custom-fetch.ts`)** — React artifacts can consume the generated client, but today they target only public read-only API routes. Any future token-bearing or cross-origin usage here would become a higher-risk boundary.
- **Internal/dev-only boundary** — `artifacts/mockup-sandbox`, slide validation scripts, and build tooling are out of production scope unless explicitly exposed through a deployed route.

## Scan Anchors

- Production backend entry point: `artifacts/api-server/src/index.ts` → `src/app.ts` → `src/routes/*`
- Public API surface: `lib/api-spec/openapi.yaml`, `artifacts/api-server/src/routes/platforms.ts`, `artifacts/api-server/src/routes/research.ts`, `artifacts/api-server/src/routes/health.ts`
- Client-side auth/UI gates: `artifacts/auren-workspace/src/App.tsx`, `artifacts/auren-workspace/src/hooks/useAuth.ts`, `artifacts/aurenhub/src/hooks/useAuth.ts`
- Public presentation artifacts with no server-backed user state today: `artifacts/ai-platform-dashboard/src/**`, `artifacts/debug-simulator/src/**`
- Embedded messaging boundary: `artifacts/ai-platforms-slides/src/App.tsx`
- Shared transport boundary: `lib/api-client-react/src/custom-fetch.ts`
- Usually ignore as dev-only: `artifacts/mockup-sandbox/**`, `artifacts/ai-platforms-slides/scripts/**`

## Threat Categories

### Spoofing

The current production API has no authenticated endpoints, so classic account spoofing is not yet the primary risk on the server. The main spoofing concern is future confusion between client-side `localStorage` login state and real authentication: server-side access control must never rely on those frontend checks alone.

Required guarantees:
- Any future endpoint that accesses user-specific or privileged data MUST enforce authentication and authorization on the server.
- Frontend `localStorage` auth state MUST be treated as presentation state only unless backed by server-validated credentials.

### Tampering

The main tampering risk is unsafe expansion from hardcoded datasets to database-backed or externally fetched data. The API currently validates outputs with generated Zod schemas, which should remain the choke point for response shape and future request validation.

Required guarantees:
- New API inputs MUST be validated at the server boundary before use.
- Database queries MUST use safe ORM/parameterized patterns.
- Shared generated contracts MUST remain the source of truth for API shapes.

### Information Disclosure

The current app mostly serves public content, so the highest disclosure risks are accidental leakage of future secrets, tokens, cookies, or internal error details. Logging is partially hardened through Pino redaction, which should remain in place as authenticated features are added.

Required guarantees:
- Secrets, bearer tokens, cookies, and database credentials MUST NOT appear in client bundles, logs, or API responses.
- Production error responses MUST avoid stack traces and internal implementation details.
- Cross-origin messaging and navigation features MUST not expose sensitive data to untrusted origins.

### Denial of Service

Because the API is fully public, unauthenticated clients can hit every route. The route handlers are lightweight today, but future DB/external API integrations would increase DoS risk if input size, concurrency, or timeouts are left unbounded.

Required guarantees:
- Public endpoints MUST keep bounded request parsing and avoid unbounded expensive work.
- New external network calls MUST use timeouts and failure handling.
- If the API starts serving costly or personalized operations, rate limiting should be added at the route or edge layer.

### Elevation of Privilege

There is little true privilege separation in the current production implementation because the backend exposes only public read-only data. The key future risk is mistaking frontend-only route guards for real authorization once mutating or user-specific features are introduced.

Required guarantees:
- Authorization decisions MUST happen server-side.
- Dev-only artifacts such as `mockup-sandbox` MUST remain unreachable in production.
- Any future file, command, or URL-driven features MUST validate untrusted input before reaching sensitive sinks.
