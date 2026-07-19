# FCOS Flow — Agent Guide

**Project:** FCOS Flow — AI-assisted operating system for fulfillment centres  
**Tagline:** Run every shift with confidence.  
**Product owner:** Hameed Bello  
**Status:** Phase 1 (Warehouse Wiki first build)

---

## Project overview

FCOS Flow provides one structured environment for frontline leaders to prepare, run, monitor, hand over, and improve warehouse shifts. Phase 1 establishes the enterprise-grade foundation and the first production module: the Warehouse Wiki (versioned SOPs, processes, FAQs, templates, training guides, policies, checklists, troubleshooting).

## Tech stack

- **Monorepo:** Turborepo (npm workspaces)
- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form + Zod
- **Backend:** Next.js Route Handlers / API routes (`/api/v1/*`)
- **Database:** PostgreSQL, Prisma ORM
- **Auth:** Auth.js / NextAuth v5 (OIDC-compatible, RBAC)
- **Cache/queue:** Redis (caching, rate limits, distributed locks, job coordination)
- **Search (MVP):** PostgreSQL full-text search (`tsvector` + trigram)
- **Testing:** Vitest
- **Infrastructure:** Vercel or container platform, managed PostgreSQL, managed Redis, private object storage
- **AI (Phase 2+):** Provider-abstracted (OpenAI/Anthropic/Gemini), permission-aware RAG, prompt registry

## Architecture

- **Style:** Modular monolith — modules extracted to services only when independent scaling or ownership justifies it
- **Layers:** Presentation (Next.js) → Application (use cases, authz, orchestration) → Domain (entities, policies, state machines) → Infrastructure (Prisma, cache, queue, storage)
- **Multi-tenancy:** Shared database, shared schema, `organization_id` + `site_id` on every tenant-owned record
- **Auth:** OIDC-compatible identity provider, MFA for privileged roles, short-lived access tokens, refresh-token rotation
- **Authz:** RBAC with scope/policy checks (org, site, team, process area, role, record state, action, governance level)
- **Offline:** Service worker + IndexedDB for draft articles, checklists, frame counts, cold-chain scans; background sync with conflict detection
- **Events:** Transactional outbox pattern; consumers must be idempotent
- **API:** REST JSON under `/api/v1`, OpenAPI, shared Zod schemas, idempotency keys, cursor pagination, stable error envelope, rate limiting

## Repository structure

```
fc-os-flow/
├── apps/
│   ├── web/              # Next.js app
│   └── worker/           # Background jobs
├── packages/
│   ├── domain/           # Entities, value objects, policies
│   ├── application/      # Use cases, authorization, orchestration
│   ├── database/         # Prisma schema, migrations, client
│   ├── auth/             # Auth.js config, RBAC helpers
│   ├── ui/               # Shared React components
│   ├── contracts/        # Zod schemas, TypeScript types
│   ├── observability/    # Logging, metrics, tracing
│   ├── config/           # Environment, feature flags
│   └── test-support/     # Test utilities, factories, mocks
├── .agent/
│   ├── rules/
│   │   ├── architecture.md
│   │   ├── DESIGN_SYSTEM.md
│   │   └── security.md
│   └── skills/
├── package.json          # Root workspace config
├── turbo.json
└── PRD.md
```

## Design system (Flowline)

- **Tokens:** Brand teal (`#0F766E`), semantic colours (success/warning/danger/info), neutral scale
- **Typography:** Inter font, scale from `display.lg` (40px) to `mono.sm` (13px)
- **Spacing:** 4px base unit, mobile 16px gutters, tablet 24px, desktop 32px
- **Accessibility:** WCAG 2.2 AA, 44px minimum touch targets, no colour-only status, keyboard + screen-reader support, 200% zoom
- **Components:** Button (5 variants), Input, Search field, Status badge, Approval badge, Article metadata strip, Article card, Process card, Metric card, Action card, Timeline, Data table, Checklist, Alert banner (6 variants), Modal/Drawer, Toast, Scanner surface, Rich text editor, Version comparison, AI draft panel
- **Navigation:** Mobile bottom nav (5 tabs), Desktop side nav (Operate/Learn/Improve/Develop/Admin)
- **Responsive:** Mobile (single column, sticky search), Tablet (split view), Desktop (dense tables, multi-panel), Wallboard (large type, no personal data)
- **Localization:** English + German, IANA time zones, localized dates/numbers/decimals

See `.agent/rules/DESIGN_SYSTEM.md` for full spec.

## Code conventions

- Strict TypeScript — no `any`, no `strictNullChecks` disabled
- Named exports only (no default exports)
- Server components by default; `"use client"` only when needed
- Zod validation at every external boundary (API, forms, webhooks, env vars)
- `@/` import aliases — `import { Button } from '@/components/ui/Button'`
- Structured error envelope: `{ ok: true, data }` / `{ ok: false, error: { code, message } }`
- `async`/`await` over `.then()` chains
- Try/catch around all DB, network, and JSON operations — never swallow errors
- Tailwind only — no inline styles, CSS modules, or styled-components
- Omit unnecessary comments — explain *why*, not *what*
- One component per file; ≤200 lines before extracting

## Security rules (key items)

1. Published Wiki versions are immutable.
2. Local users cannot overwrite network-locked content.
3. Server-side authorization — deny by default.
4. Tenant isolation via `organization_id` on all queries.
5. No secrets in source control.
6. All file uploads scanned for malware.
7. AI-generated content is draft until human-approved.
8. Audit: role changes, exports, approvals, article publication, acknowledgements, AI actions.
9. Evidence is append-only — never overwrite.

See `.agent/rules/security.md` for full spec.

## Definition of done

A feature is done when:
- requirements are met
- permissions are server-enforced
- audit impact is implemented
- loading, empty, error, stale, offline, and denied states exist
- tests pass
- accessibility is verified
- analytics events are correct
- documentation is updated
- security review is complete
- product owner accepts the workflow

## Skills

Agent skills live in `.agent/skills/`. Load the relevant skill before starting work:
- `component-builder` — React component patterns (when added)
- `api-route-scaffolder` — API route handler patterns (when added)
- `db-migration-runner` — Prisma migration workflow (when added)

## Pre-work checklist

Before starting any task:
1. Read the relevant `.agent/rules/*` file (architecture, design system, or security)
2. Check if an existing skill covers the work
3. Search the codebase for existing patterns before creating new ones
4. Run `npm run lint` and `npm run typecheck` after changes
5. Confirm tests pass with `npm run test`
