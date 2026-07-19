# FCOS Flow — Implementation Plan

**Version:** 1.0  
**Based on:** PRD v1.0, Architecture v1.0, Flowline Design System v1.0  

---

## Tech stack

| Layer | Choice |
|---|---|
| Monorepo | Turborepo (npm workspaces) |
| Framework | Next.js 15 |
| API | Next.js Route Handlers (`/api/v1/*`) |
| Frontend | React 19, TypeScript, Tailwind, shadcn/ui, TanStack Query, React Hook Form + Zod |
| Auth | Auth.js / NextAuth v5 (OIDC + RBAC) |
| Database | PostgreSQL + Prisma ORM |
| Search (MVP) | PostgreSQL `tsvector` + trigram |
| Cache | Redis |
| Testing | Vitest |
| Deployment | Vercel or container platform |

## Repository structure

```
fc-os-flow/
├── apps/
│   ├── web/
│   └── worker/
├── packages/
│   ├── domain/
│   ├── application/
│   ├── database/
│   ├── auth/
│   ├── ui/
│   ├── contracts/
│   ├── observability/
│   ├── config/
│   └── test-support/
├── .agent/rules/
├── turbo.json
└── package.json
```

---

## Stage 0 — Foundation (Sprints 1-2)

**Goal:** Bootable monorepo with database, auth, multi-tenancy, and CI/CD.

### Sprint 1 — Project scaffold
- [ ] Init Turborepo with npm workspaces
- [ ] Create `apps/web` (Next.js 15) and `apps/worker`
- [ ] Create `packages/database` with Prisma schema
- [ ] Prisma schema: `Organization`, `Site`, `User`, `Role`, `Permission`, `Team`, `Shift`
- [ ] Multi-tenant fields: `organization_id`, `site_id` on all tenant-owned tables
- [ ] `packages/config` with env validation (Zod)
- [ ] `packages/observability` with structured logger
- [ ] `turbo.json` pipeline config
- [ ] ESLint + Prettier config
- [ ] `packages/contracts` with shared Zod schemas
- [ ] Base Next.js app with layout, navigation skeleton

### Sprint 2 — Auth and CI/CD
- [ ] `packages/auth` with Auth.js / NextAuth v5
- [ ] OIDC provider integration
- [ ] RBAC — roles, permission checks, middleware
- [ ] Multi-tenant middleware — resolve org/site from session
- [ ] API route handler template with auth + validation
- [ ] Error envelope (`{ ok: true, data }` / `{ ok: false, error: { code, message } }`)
- [ ] Deployment pipeline (Vercel or container)
- [ ] CI: lint, typecheck, test
- [ ] `packages/test-support` with factories and test utilities
- [ ] Vitest config

**Stage 0 deliverables:**
- Running Next.js app with auth (sign-in, sign-out, session)
- Multi-tenant middleware enforcing org/site scope
- Prisma migrations for identity and organization models
- CI pipeline passing
- API route handler pattern established with one health-check route

---

## Stage 1 — Warehouse Wiki: Core (Sprints 3-5)

**Goal:** Article CRUD, versioning, review/approval workflow, permission-aware search.

### Sprint 3 — Article data model and CRUD
- [ ] Prisma schema: `Article`, `ArticleVersion`, `ArticleType` enum, `ProcessArea` enum
- [ ] Article types: SOP, PROCESS, FAQ, TEMPLATE, TRAINING_GUIDE, POLICY, CHECKLIST, TROUBLESHOOTING, QUICK_REFERENCE
- [ ] Process areas: RECEIPT, PICKING, STOCKFLOW, TRUNKING, INFLOW
- [ ] Draft creation API (`POST /api/v1/wiki/articles`)
- [ ] Draft update API (`PATCH /api/v1/wiki/articles/:id`)
- [ ] Article read API (`GET /api/v1/wiki/articles/:id`) — returns current published version or specific version
- [ ] `packages/domain` — `Article` entity with state machine (DRAFT → IN_REVIEW → PUBLISHED → SUPERSEDED → ARCHIVED)
- [ ] `packages/application` — Wiki use cases (create, update, submit, review, publish)
- [ ] Server-side permission checks for each action

### Sprint 4 — Review and approval workflow
- [ ] Submit for review API (`POST /api/v1/wiki/articles/:id/submit`)
- [ ] Version diff/comparison API
- [ ] Review decision API: approve, request changes, reject (`POST /api/v1/wiki/articles/:id/review`)
- [ ] Immutable published versions — published version is read-only
- [ ] Supersede previous version on publish
- [ ] Article owner + review date tracking
- [ ] Version history endpoint (`GET /api/v1/wiki/articles/:id/versions`)
- [ ] Approval badge: Local Draft → Site Approved → Network Approved → Superseded → Archived
- [ ] Admin UI for article management

### Sprint 5 — Search and article UI
- [ ] PostgreSQL full-text search — `tsvector` on title, summary, body with weighted ranking
- [ ] Trigram index for fuzzy matching
- [ ] Permission-aware search API (`GET /api/v1/wiki/search?q=`)
- [ ] Search ranking: exact title → exact tag → title prefix → summary → body → role/site relevance
- [ ] Drafts never outrank published content for normal readers
- [ ] Zero-result search logging
- [ ] Search analytics events
- [ ] Article page: metadata strip (owner, version, effective date, review date, scope, language)
- [ ] Article card component
- [ ] Search field component (large primary search, keyboard shortcut, recent searches, suggestions)
- [ ] Rich text editor component (heading, paragraph, lists, table, image, attachment, callouts, checklist)

**Stage 1 deliverables:**
- Create, edit, submit, review, approve, publish article workflow
- Immutable published versions with supersede/archive
- Version history and comparison
- Permission-aware full-text search
- Article page UI with metadata strip
- Rich text editor

---

## Stage 2 — Warehouse Wiki: Content and i18n (Sprints 6-7)

**Goal:** Complete process libraries, i18n, acknowledgements, attachments, QR links.

### Sprint 6 — Process libraries and i18n
- [ ] Process library pages for each of 5 areas: Receipt, Picking, Stockflow, Trunking, Inflow
- [ ] Per-process content: overview, RACI matrix, start-of-shift checklist, incident guide, handover template, FAQ, training guide, operational template, glossary
- [ ] Article categorization by process area
- [ ] English content — seed data for Stockflow + Trunking (pilot)
- [ ] German language support — `language` field on articles
- [ ] English-German article linking
- [ ] IANA time zone support
- [ ] Localized dates, numbers, decimals, units
- [ ] Language switcher UI

### Sprint 7 — Acknowledgements, attachments, QR
- [ ] Mandatory acknowledgement model
- [ ] Acknowledgement API: assign, complete, track
- [ ] Acknowledge UI: required reading list, progress tracking
- [ ] File upload — signed URLs, malware scanning, allow-listed types, size limits
- [ ] Attachment support on articles and versions
- [ ] Image transcoding
- [ ] QR link generation per article
- [ ] QR link resolution — open article on scan (permissions enforced)
- [ ] Suggestion flow (suggest correction without uncontrolled editing)
- [ ] Controlled-document review compliance tracking

**Stage 2 deliverables:**
- 5 process library pages with all required content sections
- English + German content linked
- Mandatory acknowledgement flow
- File attachments with security controls
- QR links
- Content suggestion mechanism

---

## Stage 3 — Shift Operations (Sprints 8-10)

**Goal:** Command Center dashboard, Captain Companion, Shift Handover.

### Sprint 8 — Command Center
- [ ] Command Center data model: readiness, incidents, overdue actions, quality, frames, cold chain, knowledge alerts
- [ ] Dashboard API aggregating all module states
- [ ] Tile components: readiness, incidents, quality, frames, cold chain, handover, knowledge
- [ ] Stale data indicator on tiles
- [ ] Link each tile to source records
- [ ] Wallboard mode (privacy-safe, large typography, auto-refresh)
- [ ] Metric card component (name, value, target, trend, status, period, source)

### Sprint 9 — Captain Companion
- [ ] Shift workspace view: current shift, tasks, alerts, actions, required reading, handover obligations
- [ ] Start-of-shift workflow: confirm site/shift/scope, review previous handover, complete required checks, escalate risks
- [ ] Quick completion and escalation UI
- [ ] Action card component (title, status, owner, due time, source, priority)
- [ ] Offline draft support for checklist completion
- [ ] Mobile bottom navigation: Today, Tasks, Incidents, Wiki, More
- [ ] Desktop side navigation: Operate, Learn, Improve, Develop, Admin

### Sprint 10 — Shift Handover
- [ ] Handover data model: outgoing/incoming Captains, metrics snapshot, incidents, risks, notes
- [ ] Pre-populate handover from live modules (Command Center, Incidents, Quality, etc.)
- [ ] Require unresolved risks and next-shift priorities
- [ ] Submit and lock — handover becomes immutable
- [ ] Incoming Captain acknowledgement
- [ ] Append-only amendments
- [ ] Desktop side-by-side view, mobile inline view

**Stage 3 deliverables:**
- Command Center with live tile dashboard
- Captain Companion with shift workspace and start-of-shift workflow
- Shift Handover with pre-population, acknowledgement, append-only amendments

---

## Stage 4 — Quality and Incidents (Sprints 11-12)

**Goal:** Quality Intelligence module and Incident Center.

### Sprint 11 — Quality Intelligence
- [ ] Quality observation model: SKU, location, issue type, severity, quantity, photo
- [ ] Observation recording API
- [ ] Photo attachment with metadata stripping
- [ ] Metrics, targets, trends — top-offending SKUs
- [ ] Observation linking to incidents, SOPs, corrective actions
- [ ] Reslotting request tracking
- [ ] Quality dashboard: freshness, damages, complaint evidence, patterns
- [ ] Horizontal bar chart for top offenders, stacked bar for issue mix, line for trends

### Sprint 12 — Incident Center
- [ ] Incident model: severity (P1-P4), owner, due time, status (Open → Contained → Investigating → Monitoring → Resolved → Closed)
- [ ] Incident creation API with timeline
- [ ] Assignment and escalation
- [ ] Immediate containment action
- [ ] SOP linking
- [ ] Duplicate detection
- [ ] Closure criteria enforcement
- [ ] Timeline component
- [ ] Incident list with filters and search
- [ ] Promote recurring incidents to Improvement Hub

**Stage 4 deliverables:**
- Quality Intelligence — observation recording, trends, top offenders
- Incident Center — P1-P4 lifecycle, timeline, SOP linking, duplicate detection

---

## Stage 5 — Frames and Cold Chain (Sprints 13-14)

**Goal:** Frame Management and Cold Chain Manager modules.

### Sprint 13 — Frame Management
- [ ] Frame type model (G4, G6, configurable)
- [ ] Capacity configuration per type
- [ ] Frame count recording: full, loose, damaged, reserved, unavailable
- [ ] Total calculation
- [ ] Demand vs. safety buffer comparison
- [ ] Reason required for corrections
- [ ] Shortage risk detection
- [ ] QR entry support
- [ ] Frame count input component

### Sprint 14 — Cold Chain Manager
- [ ] Workflow template model
- [ ] Step-based workflow with separated responsibility
- [ ] Scan recording: time, user, device, shipment, location
- [ ] Missing, late, duplicate, invalid scan detection
- [ ] Manual evidence entry (with approval)
- [ ] Audit export
- [ ] Cold chain step component
- [ ] Scanner surface component (full-width, readiness state, manual fallback, duplicate warning)

**Stage 5 deliverables:**
- Frame Management — recording, demand comparison, shortage alerts
- Cold Chain Manager — multi-step workflows, scan tracking, exception detection

---

## Stage 6 — Improvement and Pilot Launch (Sprints 15-16)

**Goal:** Improvement Hub, notifications, pilot content, launch.

### Sprint 15 — Improvement Hub and Notifications
- [ ] Improvement model: problem, evidence, proposed change, expected impact, owner, status
- [ ] Baseline → target → result → decision tracking
- [ ] Estimated vs. verified benefits
- [ ] In-app notification system
- [ ] Notification routing (severity-based, email/Slack/Teams adapters)
- [ ] Duplicate suppression, quiet hours
- [ ] Notification delivery + acknowledgement tracking
- [ ] Scheduled weekly summary reports

### Sprint 16 — Pilot content and launch
- [ ] Seed content for Stockflow and Trunking (20-30 controlled documents)
- [ ] Seed content for Receipt, Picking, Inflow (remaining 3 process areas)
- [ ] QR deployment material
- [ ] User onboarding flow
- [ ] Documentation — user guides, admin guide
- [ ] Backup and rollback tested
- [ ] Security review
- [ ] Accessibility audit
- [ ] Tenant isolation tests
- [ ] Pilot launch — 10-20 users, daily feedback collection

**Stage 6 deliverables:**
- Improvement Hub
- Notification system (in-app + channel adapters)
- All 5 process libraries with seed content
- Pilot-ready system

---

## Phase 1 release criteria (from PRD §18)

1. Full documentation suite approved
2. Warehouse Wiki information architecture implemented
3. Users can search approved content
4. Published versions are immutable
5. Review and approval workflow works
6. Article ownership and review dates visible
7. Mandatory acknowledgements work
8. English and German versions can be linked
9. Tenant and site isolation tests pass
10. Audit events exist for controlled actions
11. Critical mobile flows pass accessibility review
12. Pilot content exists for all five process areas
13. Backup and rollback tested
14. Security review has no unresolved critical findings

---

## Key ADRs needed (from architecture.md)

1. Identity provider
2. Hosting platform
3. Offline storage strategy
4. Event/job infrastructure
5. Object storage provider
6. AI provider strategy
7. WMS integration approach
8. Rich-text editor library
9. Document versioning strategy

---

## Architecture invariants

- UI never accesses database directly
- Domain never depends on framework code
- Authorization lives in application services
- Integrations use adapters
- Events publish through outbox
- Published Wiki versions are immutable
- Never trust tenant ID from client without validating membership
- Conflicts never silently overwrite content
