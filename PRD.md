# FCOS Flow — Product Requirements Document

**Version:** 1.0  
**Status:** Final Phase 1 baseline  
**Product owner:** Hameed Bello  
**Date:** 2026-07-12  
**Tagline:** Run every shift with confidence.

---

## 1. Executive summary

FCOS Flow is an AI-assisted operating system for fulfillment centres. It provides one structured environment for frontline leaders to prepare, run, monitor, hand over, and improve warehouse shifts.

Traditional warehouse management systems typically manage inventory, orders, and transactions well, but the daily operating layer is fragmented across spreadsheets, paper, whiteboards, Slack, verbal handovers, personal notes, and tribal knowledge. This causes information loss, unclear accountability, late escalation, inconsistent execution, avoidable quality failures, weak learning loops, and invisible leadership work.

FCOS Flow fills this gap through:

- a live Command Center
- a Captain Companion
- structured Shift Handovers
- Quality Intelligence
- Incident Management
- a searchable Warehouse Wiki
- Frame Management
- Cold Chain Management
- Continuous Improvement
- Captain Development
- Recognition
- AI-assisted reporting
- multi-site Operations Intelligence

The product will be built in phases. Phase 1 establishes the enterprise-grade product foundation and the first production module: the Warehouse Wiki.

---

## 2. Product vision

> Become the trusted operating layer for every fulfillment-centre shift—helping teams execute consistently, identify risk early, resolve problems quickly, preserve operational knowledge, and improve continuously.

### Mission

Help warehouse leaders:

- understand what matters now
- detect risks before they become failures
- assign explicit ownership
- preserve critical context between shifts
- standardize process execution
- make quality and compliance visible
- reduce administrative work
- develop people using evidence
- convert recurring pain into measurable improvement
- access trusted operational knowledge instantly

### Product promise

A Captain opening FCOS Flow should be able to answer within five seconds:

1. Is the shift healthy?
2. What requires attention?
3. Who owns each issue?
4. What must happen next?
5. What changed since the previous shift?
6. Where is the approved process for this situation?

---

## 3. Problem statement

Fulfillment-centre leadership work is often distributed across:

- WMS tools
- spreadsheets
- paper forms
- shared drives
- whiteboards
- Slack or Teams
- email
- verbal handovers
- personal notebooks
- tribal knowledge

This creates seven structural problems:

1. **Information loss** between shifts.
2. **Unclear accountability** when several teams touch one process.
3. **Late detection** of operational, quality, and compliance risks.
4. **Inconsistent execution** across rotating Captains.
5. **Weak learning loops** after incidents.
6. **Invisible leadership work** beyond throughput.
7. **Knowledge fragmentation**, leading to repeated questions and avoidable dependency on experienced individuals.

### Representative operational problems

- Stockflow prepares cold-chain log tags, Chilled scans them, and Packaging verifies them, yet accountability is not separated by step.
- Packaging Captains count G4 and G6 frames differently, creating inconsistent records and late shortages.
- Freshness and damages are reported weekly, but top offenders, customer complaints, root causes, and corrective actions are disconnected.
- Shift handovers depend on individual habits.
- New Captains are trained through tribal knowledge.
- SOPs exist in different places and may be outdated.
- Captains are often evaluated mostly through operational output rather than coaching, reliability, quality, improvement, and team development.

---

## 4. Target market

### Initial deployment

- One fulfillment centre
- Grocery or e-commerce environment
- Multiple shifts per day
- Rotating Captains and Supervisors
- Existing WMS remains system of record
- FCOS Flow acts as execution, coordination, knowledge, and improvement layer

### Expansion market

- Multi-site grocery fulfillment
- Retail distribution centres
- Third-party logistics providers
- Dark stores
- Micro-fulfillment centres
- Manufacturing operations with shift-based execution

### Key stakeholders

- Economic buyer: Head of Fulfillment, COO, Operations Director
- Operational sponsor: FC Lead / Site Director
- Primary users: Captains and Supervisors
- Secondary users: Quality, People Team, Process Owners, FC Leads
- Occasional users: Shoppers, Trainers, Auditors
- Network users: Central Operations and HQ

---

## 5. User personas

### Captain / Team Lead

**Primary job:** Run a reliable shift while coordinating people, process, quality, knowledge, and exceptions.

**Needs:**

- start-of-shift priorities
- structured checks
- fast incident logging
- clear escalation paths
- reliable SOP access
- quality visibility
- simple handover
- low admin burden
- visible evidence of contribution

### Supervisor

**Primary job:** Maintain cross-area performance and intervene where support is needed.

**Needs:**

- cross-area visibility
- prioritized alerts
- overdue actions
- incident trends
- process ownership
- approval controls
- evidence for feedback and development

### FC Lead

**Primary job:** Keep the site reliable, compliant, productive, and continuously improving.

**Needs:**

- site health summary
- recurring risks
- cross-shift consistency
- knowledge governance
- improvement portfolio
- leadership capacity visibility
- site adoption analytics

### Quality Lead

**Primary job:** Prevent customer-impacting quality failures.

**Needs:**

- freshness and damages trends
- top-offending SKUs
- complaint evidence
- location and handling patterns
- corrective action tracking
- approved quality SOPs

### Process Owner

**Primary job:** Maintain trusted operational procedures.

**Needs:**

- version control
- review workflow
- article ownership
- scheduled review dates
- approval and acknowledgement tracking
- local versus network governance

### New Captain / New Starter

**Primary job:** Learn the role safely and demonstrate readiness.

**Needs:**

- structured learning paths
- searchable procedures
- assigned mentor
- practice tasks
- knowledge checks
- evidence-based sign-off

### Central Operations

**Primary job:** Standardize network execution without erasing local context.

**Needs:**

- governed templates
- network standards
- adoption analytics
- multi-site trends
- controlled local variation
- network-wide process ownership

---

## 6. Product goals

1. Reduce information loss between shifts.
2. Make ownership explicit.
3. Improve early risk detection.
4. Standardize Captain workflows.
5. Make approved operational knowledge searchable.
6. Reduce administrative and reporting effort.
7. Improve incident resolution quality.
8. Make leadership and improvement work visible.
9. Support multi-site scaling.
10. Provide safe, reviewable AI assistance.
11. Work under imperfect connectivity.
12. Improve onboarding speed and execution consistency.

---

## 7. Non-goals for Phase 1

FCOS Flow will not initially:

- replace the WMS
- control material-handling equipment
- calculate payroll
- replace HR systems
- make autonomous promotion or disciplinary decisions
- make final food-safety decisions
- become the source of truth for financial inventory valuation
- provide a full real-time 3D digital twin
- deliver predictive analytics without sufficient data
- use composite scores as the sole basis for employee evaluation
- publish AI-generated SOPs without human approval

---

## 8. Product principles

1. **Shift-first**
2. **Action over observation**
3. **Glanceable under pressure**
4. **One operational source of truth**
5. **Human-approved AI**
6. **Offline-tolerant**
7. **Audit by default**
8. **Configurable, not chaotic**
9. **No metric without context**
10. **Fair by design**
11. **Knowledge must be governed**
12. **Capture once, reuse everywhere**

---

## 9. Product modules

| # | Module | Purpose | Phase |
|---|---|---|---|
| 1 | Command Center | Live site and shift health | MVP |
| 2 | Captain Companion | Personal shift workspace | MVP |
| 3 | Shift Handover | Structured, acknowledged continuity | MVP |
| 4 | Quality Intelligence | Freshness, damages, offenders, actions | MVP |
| 5 | Incident Center | Log, assign, escalate, resolve | MVP |
| 6 | Captain Dashboard | Contribution and role-relevant performance | Phase 2 |
| 7 | Improvement Hub | Kaizen and measurable improvement | MVP-lite |
| 8 | Warehouse Wiki | Versioned SOPs and operational knowledge | First build |
| 9 | Frame Management | G4/G6 availability and shortage risk | MVP |
| 10 | Cold Chain Manager | Log tags, scans, compliance | MVP |
| 11 | AI Shift Reports | Reviewable automated reporting | Phase 2 |
| 12 | AI Standup Generator | Shift-specific standup drafts | Phase 2 |
| 13 | AI Root Cause Assistant | Evidence-based hypotheses | Phase 2 |
| 14 | Complaint Explorer | Search and analyze customer feedback | Phase 2 |
| 15 | Warehouse AI | Permission-aware operational assistant | Phase 2 |
| 16 | FC Digital Twin | Spatial operational visualization | Phase 3 |
| 17 | Predictive Analytics | Forecast operational risks | Phase 3 |
| 18 | Captain Growth | Competencies and development plans | Phase 2 |
| 19 | Recognition | Evidence-based recognition | Phase 2 |
| 20 | Operations Intelligence | Multi-site analytics | Phase 3 |

---

## 10. Warehouse Wiki scope

The first build module covers:

- SOPs
- processes
- FAQs
- templates
- training guides
- policies
- checklists
- troubleshooting guides

### Required process libraries

1. Receipt
2. Picking
3. Stockflow
4. Trunking
5. Inflow

Every process area must include:

- process overview
- role and responsibility matrix
- start-of-shift checklist
- incident and escalation guide
- handover template
- FAQ section
- training guide
- editable operational template
- glossary
- owner and review cycle

---

## 11. Core MVP workflows

### Search and use knowledge

1. User searches by phrase, SKU, process, or role.
2. Search respects organization, site, role, and permissions.
3. Approved content ranks above drafts.
4. User opens current published version.
5. Article shows owner, effective date, review date, and scope.
6. User can bookmark, acknowledge, or suggest a correction.

### Create and publish content

1. Authorized user creates draft.
2. Draft is assigned to owner and category.
3. Author submits for review.
4. Reviewer compares changes.
5. Reviewer approves, requests changes, or rejects.
6. Approved version is published.
7. Published version becomes immutable.
8. Previous version becomes superseded.
9. Required acknowledgements are assigned.

### Start shift

1. Sign in.
2. Confirm site, shift, and scope.
3. Review previous handover.
4. Complete required start checks.
5. Open linked SOPs where needed.
6. Escalate high-risk exceptions.
7. Update readiness.

### Incident

1. Log incident.
2. Assign owner and severity.
3. Apply immediate containment.
4. Link relevant SOP.
5. Track action and timeline.
6. Resolve and verify.
7. Promote recurrence to Improvement Hub.

### Shift handover

1. System pre-populates metrics, incidents, and risks.
2. Outgoing Captain adds context.
3. Submit and lock.
4. Incoming Captain acknowledges.
5. Amendments remain append-only.

---

## 12. Functional requirements

### Identity and access

- Support organizations, sites, zones, teams, and shifts.
- Use role-based access with site/team scope.
- Enforce permissions server-side.
- Support shared-device sessions.
- Audit privileged changes.
- Add enterprise SSO later.

### Warehouse Wiki

- Create, review, approve, publish, supersede, and archive content.
- Support SOP, process, FAQ, template, training guide, policy, checklist, troubleshooting, and quick reference types.
- Support English and German.
- Provide permission-aware full-text search.
- Support QR links.
- Maintain immutable published versions.
- Support article ownership and review dates.
- Support mandatory acknowledgements.
- Allow suggestions without uncontrolled editing.
- Support private attachments and malware scanning.
- Show local versus network-approved status.
- Record search analytics and zero-result queries.

### Command Center

- Show readiness, incidents, overdue actions, quality, frames, cold chain, handover, and knowledge alerts.
- Link each tile to source records.
- Show stale data.
- Support privacy-safe wallboard mode.

### Captain Companion

- Show shift, tasks, alerts, actions, required reading, and handover obligations.
- Support quick completion and escalation.
- Preserve drafts offline.
- Prevent mandatory compliance completion without evidence.

### Shift Handover

- Pre-populate from live modules.
- Require unresolved risks and next-shift priorities.
- Support acknowledgement and clarification.
- Lock submitted records.
- Allow append-only amendments.

### Quality Intelligence

- Record observations by SKU, location, issue type, severity, and quantity.
- Attach photos.
- Show metrics, targets, trends, top offenders.
- Link observations to incidents, SOPs, and corrective actions.
- Track reslotting requests and outcomes.

### Incident Center

- Support P1–P4 severity.
- Require owner and due time.
- Support Open, Contained, Investigating, Monitoring, Resolved, Closed.
- Record timeline and evidence.
- Require closure criteria.
- Detect likely duplicates.
- Link relevant SOPs.

### Improvement Hub

- Capture problem, evidence, proposed change, expected impact, owner, and status.
- Track baseline, target, result, and decision.
- Separate estimated and verified benefits.

### Frame Management

- Support configurable frame types and capacities.
- Record full containers, loose, damaged, reserved, unavailable.
- Calculate totals.
- Compare against demand and safety buffer.
- Require reason for corrections.
- Support QR entry.

### Cold Chain Manager

- Define workflow templates.
- Separate responsibility by step.
- Store scan time, user, device, shipment, and location.
- Flag missing, late, duplicate, or invalid scans.
- Support manual evidence only with approval.
- Export audit records.

### Notifications

- In-app, email, Slack/Teams, and push.
- Severity-based routing.
- Duplicate suppression.
- Quiet hours except critical.
- Delivery and acknowledgement tracking.

### Search and reporting

- Permission-aware global search.
- Authorized CSV/PDF exports.
- Scheduled weekly summaries.
- Source and refresh timestamps.

---

## 13. AI requirements

### Allowed

- draft reports
- summarize handovers and incidents
- suggest standup topics
- classify complaint themes
- retrieve approved SOPs
- suggest root-cause hypotheses
- convert voice notes into drafts

### Prohibited

- autonomous disciplinary decisions
- autonomous promotion decisions
- final food-safety or compliance approval
- silent modification of evidence
- cross-tenant retrieval
- hidden employee ranking
- unsupervised SOP publication

### Controls

- label AI output
- show sources
- require human review
- log prompt/model version
- redact sensitive data
- preserve permissions
- maintain manual fallback

---

## 14. Non-functional requirements

### Availability

- 99.9% monthly target
- graceful degradation
- offline support for selected workflows
- no silent data loss

### Performance

- dashboard under 3 seconds at p75
- common action under 1 second at p75
- search under 2 seconds at p75
- QR article open under 2 seconds when online

### Accessibility

- WCAG 2.2 AA
- 44 × 44 px minimum touch targets
- no colour-only status
- keyboard and screen-reader support
- 200% zoom support

### Localization

- English and German
- localized dates, numbers, decimals, and units
- IANA time zones

### Auditability

Audit:

- role changes
- exports
- approvals
- evidence amendments
- article publication
- acknowledgements
- AI publication
- compliance records

---

## 15. Success metrics

### North Star

**Reliable Shift Completion Rate**

Percentage of completed shifts meeting all configured reliability conditions.

### Warehouse Wiki North Star

**Successful Knowledge Resolution Rate**

Percentage of searches that result in an approved article being opened and no similar search being repeated within five minutes.

### Supporting metrics

- median search-to-open time
- zero-result search rate
- article helpfulness
- controlled-document review compliance
- acknowledgement completion
- handover completion
- incident assignment SLA
- frame shortages discovered late
- cold-chain completion
- Captain admin time
- weekly active users

---

## 16. Rollout plan

### Stage 0 — Discovery

- observe shifts
- map current workflows
- establish baseline
- identify systems of record
- confirm ownership and legal constraints

### Stage 1 — Warehouse Wiki pilot

- one site
- Stockflow and Trunking first
- 20–30 controlled documents
- 10–20 pilot users
- daily feedback

### Stage 2 — Process expansion

- Receipt
- Picking
- Inflow
- broader role access
- QR deployment
- acknowledgement campaigns

### Stage 3 — Core operations modules

- Shift Handover
- Incident Center
- Frame Management
- Cold Chain Manager
- Quality Intelligence
- Command Center

### Stage 4 — Intelligence

- AI assistance
- Captain Growth
- Recognition
- multi-site analytics

---

## 17. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Scope becomes too broad | Strict phased roadmap |
| Duplicate data entry | Integrate or prefill |
| Surveillance perception | Transparent purpose and strict permissions |
| Alert fatigue | Severity, grouping, tuning |
| AI hallucination | Sources and mandatory review |
| Shared-device exposure | Short sessions and device controls |
| Poor connectivity | Offline queue and conflict handling |
| Knowledge becomes outdated | Owners, review dates, overdue alerts |
| Local variation creates chaos | Governed templates |
| Composite score misuse | Mandatory drill-down and policy controls |
| Weak adoption | Prioritize immediate time savings |

---

## 18. Phase 1 release criteria

Phase 1 is complete when:

1. The full documentation suite is approved.
2. Warehouse Wiki information architecture is implemented.
3. Users can search approved content.
4. Published versions are immutable.
5. Review and approval workflow works.
6. Article ownership and review dates are visible.
7. Mandatory acknowledgements work.
8. English and German versions can be linked.
9. Tenant and site isolation tests pass.
10. Audit events exist for controlled actions.
11. Critical mobile flows pass accessibility review.
12. Pilot content exists for all five process areas.
13. Backup and rollback are tested.
14. Security review has no unresolved critical findings.

---

## 19. Open decisions

1. Which WMS is the source of truth?
2. Which identity provider is approved?
3. Slack, Teams, both, or neither?
4. Are scanners managed devices?
5. Which cold-chain hardware exists?
6. What retention periods apply?
7. What can HQ see at record level?
8. Who approves local and network SOPs?
9. Which metrics are centrally governed?
10. What legal or works-council review is required?

---

## 20. Definition of done

A feature is done only when:

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
