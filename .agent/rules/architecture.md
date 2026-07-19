# FCOS Flow — Technical Architecture

**Version:** 1.0  
**Status:** Final Phase 1 baseline

---

## 1. Architecture goals

FCOS Flow must be:

- secure
- multi-tenant
- auditable
- resilient
- offline-tolerant
- modular
- integration-ready
- observable
- AI-provider-independent
- easy to evolve without premature microservices

---

## 2. Recommended stack

### Frontend

- Next.js 15+
- React 19+
- TypeScript
- Tailwind CSS
- shadcn/ui primitives
- TanStack Query
- React Hook Form
- Zod
- PWA support

### Backend

- Next.js Route Handlers
- modular application/service layer
- PostgreSQL
- Prisma ORM
- Redis
- object storage
- outbox pattern
- background worker

### Infrastructure

- Vercel or container platform
- managed PostgreSQL
- managed Redis
- private object storage
- centralized logging
- distributed tracing
- secrets manager

### Search

Phase 1:

- PostgreSQL full-text search
- trigram matching
- permission filtering

Later:

- dedicated search engine
- semantic retrieval

### AI

- provider abstraction
- OpenAI, Anthropic, or Gemini adapters
- permission-aware RAG
- prompt registry
- evaluation harness
- human review workflow

---

## 3. Architecture style

Use a modular monolith first.

Benefits:

- simpler transactions
- lower operational overhead
- faster delivery
- easier domain evolution
- clear upgrade path to services

A module may become a service only when independent scale, ownership, or availability justifies it.

---

## 4. Layering

```text
Presentation
  └─ Next.js pages, components, route handlers

Application
  └─ Use cases, authorization, orchestration, transactions

Domain
  └─ Entities, value objects, policies, state machines

Infrastructure
  └─ Prisma, cache, queue, storage, integrations
```

Rules:

- UI never accesses database directly.
- Domain never depends on framework code.
- Authorization lives in application services.
- Integrations use adapters.
- Events publish through outbox.

---

## 5. Bounded modules

- Identity and Access
- Organization and Site
- Warehouse Wiki
- Shift Execution
- Captain Companion
- Handovers
- Incidents and Actions
- Quality
- Frames
- Cold Chain
- Improvements
- People Development
- Recognition
- Notifications
- Integrations
- AI Assistance
- Analytics and Audit

---

## 6. Multi-tenancy

Shared database, shared schema, tenant key on every tenant-owned record.

Required fields:

- `organization_id`
- `site_id` where applicable

Controls:

- application-level tenant scope
- database constraints
- row-level security where feasible
- tenant-aware cache keys
- tenant-aware storage paths
- tenant-aware jobs
- tenant-aware search index
- tenant-scoped exports

---

## 7. Identity and authentication

### Initial

- OIDC-compatible identity provider
- MFA for privileged roles
- short-lived access tokens
- refresh-token rotation
- secure session cookies

### Enterprise

- SAML/OIDC SSO
- SCIM provisioning
- managed-device policies
- conditional access

### Shared devices

- short inactivity timeout
- fast user switching
- no persistent personal data
- re-authentication for sensitive actions
- visible signed-in user

---

## 8. Authorization

RBAC plus scope and policy checks.

Dimensions:

- organization
- site
- team
- process area
- role
- record state
- action type
- governance level

Example:

A Captain may create a local draft but cannot publish a network-controlled SOP.

---

## 9. Data persistence

### PostgreSQL

Use for:

- users and permissions
- articles and versions
- shifts
- incidents
- quality records
- frame counts
- cold-chain workflows
- audit metadata
- configuration

### Object storage

Use for:

- SOP attachments
- quality photos
- incident evidence
- exports

Requirements:

- private buckets
- signed URLs
- malware scanning
- metadata stripping where needed

### Redis

Use for:

- cache
- rate limits
- distributed locks
- short-lived presence
- job coordination

Never use Redis as the source of truth.

---

## 10. Warehouse Wiki architecture

### Write path

1. Author creates draft.
2. Draft content saved as structured JSON and normalized text.
3. Author submits for review.
4. Reviewer decision stored.
5. Approved version publishes in transaction.
6. Previous published version becomes superseded.
7. Search index updates through outbox.
8. Acknowledgement campaign may be generated.

### Read path

1. Actor identity and scope resolved.
2. Search query executed with permission filters.
3. Current published version returned.
4. Historical version requires explicit authorized route.
5. Attachments use short-lived signed URLs.

### Search ranking

1. exact title
2. exact tag
3. title prefix
4. summary
5. body
6. role/site relevance
7. weak popularity tie-breaker

Drafts never outrank published content for normal readers.

---

## 11. Event architecture

Use transactional outbox.

Example events:

- `wiki.article.created`
- `wiki.version.submitted`
- `wiki.version.published`
- `wiki.review.overdue`
- `wiki.acknowledgement.required`
- `incident.created`
- `frame.risk_detected`
- `cold_chain.exception_created`

Consumers must be idempotent.

---

## 12. Background jobs

- notification delivery
- review reminders
- acknowledgement reminders
- search indexing
- file scanning
- report generation
- WMS sync
- AI jobs
- export generation
- stale-data detection

Requirements:

- retry with backoff
- dead-letter queue
- tenant scope
- correlation IDs
- observability
- idempotency

---

## 13. Offline architecture

Supported offline actions:

- draft article edits
- bookmarked approved article access
- draft incident
- checklist completion
- draft handover notes
- frame count
- cold-chain scan queue

Strategy:

- service worker
- IndexedDB
- local encryption where appropriate
- client operation IDs
- background sync
- version conflict detection

Conflicts never silently overwrite content.

---

## 14. Search architecture

### MVP

- PostgreSQL `tsvector`
- trigram index
- weighted title/summary/body fields
- tenant/site filters
- language-aware configuration
- zero-result analytics

### Later

Dedicated search engine for:

- large document corpus
- semantic retrieval
- multi-site scale
- complaint exploration
- AI retrieval

Search must not broaden permissions.

---

## 15. AI architecture

Components:

- provider adapter
- prompt registry
- retrieval service
- permission filter
- redaction layer
- source citation builder
- evaluation harness
- review/publish workflow
- cost and latency monitoring

AI-generated Wiki content remains a draft until approved.

---

## 16. Integrations

Potential:

- WMS
- Slack
- Teams
- Power BI
- SAP
- HRIS
- identity provider
- IoT temperature sensors
- barcode scanners
- email
- push notifications

Use adapter pattern, webhook verification, retries, and integration health monitoring.

---

## 17. API architecture

- REST JSON under `/api/v1`
- OpenAPI
- shared Zod schemas
- idempotency keys
- cursor pagination
- stable error envelope
- signed webhooks
- rate limiting
- ETag/version support

GraphQL is not required for Phase 1.

---

## 18. Observability

Logs:

- correlation ID
- organization ID
- site ID
- actor ID
- module
- operation
- result
- latency

Metrics:

- request rate
- error rate
- latency
- job backlog
- outbox lag
- search latency
- zero-result search rate
- attachment-scan failures
- offline conflict rate
- AI latency/cost
- integration freshness

---

## 19. Availability and recovery

- 99.9% target
- automated backups
- point-in-time recovery
- restore testing
- infrastructure as code
- rollback-capable deployment
- health checks
- graceful degradation

Suggested MVP:

- RPO: 15 minutes
- RTO: 4 hours

---

## 20. Security architecture

- encryption in transit and at rest
- least privilege
- secret rotation
- malware scanning
- signed uploads
- audit logs
- rate limiting
- CSP
- CSRF protection
- dependency scanning
- SAST/DAST
- tenant-isolation tests

See `SECURITY.md`.

---

## 21. Deployment model

Environments:

- local
- development
- staging
- production

Rules:

- separate databases
- no production personal data in lower environments
- feature flags
- migration gates
- smoke tests
- gradual rollout for high-risk features

---

## 22. Repository structure

```text
apps/web
apps/worker
packages/domain
packages/application
packages/database
packages/auth
packages/ui
packages/contracts
packages/observability
packages/config
packages/test-support
```

---

## 23. Required ADRs

- identity provider
- hosting platform
- offline storage
- event/job infrastructure
- object storage
- search technology
- AI provider strategy
- WMS integration
- row-level security
- analytics platform
- rich-text editor
- document versioning strategy

---

## 24. Scale path

Move a module into a service only when:

- independent scaling is required
- availability needs differ
- contract is stable
- ownership is independent
- transaction boundaries are understood
- operational cost is justified
