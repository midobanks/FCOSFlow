# FCOS Flow — Security and Privacy Specification

**Version:** 1.0  
**Status:** Final Phase 1 baseline

---

## 1. Security objectives

FCOS Flow must protect:

- operational integrity
- tenant isolation
- employee privacy
- compliance evidence
- customer-related quality data
- credentials and secrets
- Wiki content and approvals
- AI inputs and outputs
- audit history

Priorities:

1. Prevent unauthorized access.
2. Prevent cross-tenant leakage.
3. Preserve evidence integrity.
4. Preserve published-content integrity.
5. Minimize personal data.
6. Maintain operational availability.
7. Audit privileged activity.
8. Prevent AI from bypassing controls.

---

## 2. Data classification

### Public

- marketing content
- public product documentation

### Internal

- generic SOPs
- non-sensitive site configuration
- aggregated non-personal metrics

### Confidential

- shift handovers
- incidents
- quality observations
- supplier and SKU issue data
- improvement projects
- internal SOP drafts

### Restricted

- employee development records
- personal notes
- customer personal data
- authentication data
- sensitive exports
- compliance evidence
- security logs
- confidential Wiki categories
- AI prompts containing personal data

---

## 3. Privacy principles

- collect only necessary data
- state purpose clearly
- separate operational and people-development data
- minimize retention
- support data-subject rights
- never infer protected characteristics
- never use nationality, ethnicity, religion, gender, age, health, union status, or similar attributes for scoring
- involve legal and works council before employee analytics rollout

---

## 4. Identity security

- OIDC/SAML preferred
- MFA for privileged roles
- short-lived sessions
- refresh rotation
- secure cookies
- brute-force protection
- session visibility
- immediate revocation on offboarding
- SCIM for enterprise lifecycle

Shared devices require short inactivity timeouts and fast switching.

---

## 5. Authorization

Use least privilege with:

- role
- organization
- site
- team
- process area
- governance level
- record state
- action type

Controls:

- server-side authorization
- deny by default
- object-level authorization
- field-level restrictions where needed
- privileged-action re-authentication
- approval workflows
- automated tenant-isolation tests

---

## 6. Wiki governance security

1. Published versions are immutable.
2. Local users cannot overwrite network-locked content.
3. Administrators do not automatically receive approval rights.
4. Approval decisions require content-governance permission.
5. Acknowledgements bind to exact version hash.
6. Historical versions remain accessible only to authorized users.
7. Confidential categories are excluded from general search.
8. QR links never bypass authentication.
9. Attachments remain private.
10. AI-generated drafts cannot self-publish.

---

## 7. Multi-tenant isolation

Mandatory:

- `organization_id` on tenant data
- tenant-scoped queries
- row-level security where feasible
- tenant-aware cache keys
- tenant-scoped storage
- tenant-aware jobs
- permission-aware search
- export scoping
- automated cross-tenant tests

Never trust tenant ID supplied by the client without validating membership.

---

## 8. Data protection

### In transit

- TLS 1.2+
- HSTS
- signed webhooks
- certificate validation

### At rest

- encrypted database
- encrypted object storage
- encrypted backups
- encrypted approved offline data

### Secrets

- secrets manager
- no secrets in source control
- rotation policy
- environment separation
- least-privileged service accounts

---

## 9. Evidence integrity

Audit-sensitive records:

- submitted handovers
- frame counts
- cold-chain scans
- incident events
- Wiki publication and approvals
- acknowledgements
- role changes
- exports
- AI publication

Rules:

- append-only history
- immutable original evidence
- amendments rather than overwrite
- server timestamps plus device timestamps
- actor and device attribution
- no uncontrolled database edits

---

## 10. File upload security

- allow-list file types
- size limits
- malware scanning
- metadata stripping
- signed upload URLs
- private buckets
- short-lived download URLs
- image transcoding
- no executable files
- no public-by-default access

---

## 11. API security

- authentication by default
- rate limiting
- input validation
- output encoding
- idempotency keys
- CSRF protection
- CORS allow-list
- stable errors
- no stack traces
- replay protection
- request size limits
- pagination limits

---

## 12. Web security

- Content Security Policy
- `frame-ancestors`
- Referrer-Policy
- Permissions-Policy
- secure cookies
- XSS prevention
- CSRF protection
- dependency scanning
- no sensitive data in URLs

---

## 13. Offline security

- minimize cached restricted data
- encrypt approved local data
- automatic expiry
- purge on sign-out
- no offline people-development data by default
- visible pending sync
- idempotency protection
- managed-device controls where required

---

## 14. Logging and monitoring

Log:

- sign-in/out
- failed authorization
- role changes
- exports
- privileged configuration
- evidence amendments
- Wiki approval/publication
- AI publication
- webhook failures
- suspicious activity

Do not log:

- passwords
- tokens
- full personal notes
- restricted attachments
- unredacted prompts
- unnecessary customer data

Alert on:

- denied-access spikes
- cross-tenant failures
- unusual exports
- role escalation
- repeated failed sign-ins
- audit failures
- malware detection
- unauthorized publication attempts
- suspicious search behavior

---

## 15. AI security

Threats:

- prompt injection
- data exfiltration
- cross-tenant retrieval
- hallucination
- unsafe automation
- sensitive-data leakage
- malicious uploaded documents

Controls:

- permission-aware retrieval
- treat retrieved content as untrusted data
- system-prompt separation
- output validation
- source citations
- human approval
- redaction
- provider contractual review
- no training on customer data without approval
- prompt/model versioning
- evaluation and red-team tests
- kill switch
- cost and abuse limits

---

## 16. People analytics safeguards

- transparent metric definitions
- no hidden scoring
- no protected characteristics
- no public individual rankings
- allow context and response
- human review
- authorized access only
- works-council/legal review
- retention limits
- export restrictions
- regular fairness review

---

## 17. Retention

Retention must be configurable and legally reviewed.

Suggested starting points:

- audit logs: 24 months
- Wiki historical versions: life of article plus 24 months
- acknowledgements: policy-dependent
- incident evidence: 24 months
- quality photos: 12 months
- exports: 7–30 days
- AI prompts/outputs: minimum practical period
- personal notes: user-controlled, short retention

---

## 18. Secure development lifecycle

Required:

- threat modelling
- dependency scanning
- SAST
- DAST
- secrets scanning
- code review
- infrastructure review
- migration review
- penetration testing before enterprise rollout
- incident response runbooks
- backup restore tests

---

## 19. Security acceptance criteria

- tenant isolation verified
- role permissions verified
- published Wiki versions immutable
- QR links respect permissions
- attachments scanned
- audit events complete
- exports authorized
- restricted categories excluded from unauthorized search
- AI cannot bypass permissions
- no unresolved critical vulnerabilities
