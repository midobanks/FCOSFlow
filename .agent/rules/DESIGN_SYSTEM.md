# FCOS Flow — Design System

**System name:** Flowline  
**Version:** 1.0  
**Status:** Final Phase 1 baseline

---

## 1. Purpose

Flowline supports safe, consistent, and fast interactions across mobile devices, shared tablets, desktop workstations, and FC wallboards.

Priorities:

- operational clarity
- accessibility
- high information density without noise
- reliable status communication
- large touch targets
- multilingual support
- trustworthy knowledge presentation

---

## 2. Brand foundation

### Attributes

- Calm
- Precise
- Capable
- Human
- Accountable
- Forward-moving

### Visual metaphor

Flow is expressed through connected steps, clear paths, directional movement, and smooth transitions.

Avoid industrial clichés and decorative warehouse imagery.

---

## 3. Colour tokens

### Brand

| Token | Hex | Use |
|---|---|---|
| `brand.50` | `#E8F7F5` | Selected background |
| `brand.100` | `#CDEDEA` | Subtle highlight |
| `brand.300` | `#69C3BC` | Secondary accent |
| `brand.500` | `#0F766E` | Primary action |
| `brand.600` | `#0B655F` | Hover |
| `brand.700` | `#084F4B` | Active |
| `brand.900` | `#052F2D` | Deep surface |

### Neutral

| Token | Hex |
|---|---|
| `neutral.0` | `#FFFFFF` |
| `neutral.25` | `#FAFBFC` |
| `neutral.50` | `#F5F7F9` |
| `neutral.100` | `#E9EDF2` |
| `neutral.200` | `#D7DEE6` |
| `neutral.400` | `#8A99A8` |
| `neutral.600` | `#52606D` |
| `neutral.800` | `#243B53` |
| `neutral.900` | `#102A43` |
| `neutral.950` | `#071521` |

### Semantic

| Meaning | Base | Background | Strong text |
|---|---|---|---|
| Success | `#1F7A4D` | `#E8F5EE` | `#145235` |
| Warning | `#B7791F` | `#FFF6DD` | `#744A0E` |
| Danger | `#C53030` | `#FDECEC` | `#822020` |
| Information | `#2B6CB0` | `#EBF4FF` | `#1E4E80` |
| Unknown | `#66788A` | `#EEF1F4` | `#3D4D5C` |

Status always includes icon and text.

---

## 4. Typography

Font stack:

```css
font-family:
  Inter,
  ui-sans-serif,
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

| Token | Size / line | Weight | Use |
|---|---|---|---|
| `display.lg` | 40 / 48 | 700 | Wallboard KPI |
| `display.md` | 32 / 40 | 700 | Page headline |
| `heading.lg` | 24 / 32 | 700 | Major section |
| `heading.md` | 20 / 28 | 650 | Card title |
| `heading.sm` | 16 / 24 | 650 | Subsection |
| `body.lg` | 18 / 28 | 400 | Important instruction |
| `body.md` | 16 / 24 | 400 | Default |
| `body.sm` | 14 / 20 | 400 | Secondary |
| `label.md` | 14 / 20 | 600 | Form label |
| `label.sm` | 12 / 16 | 600 | Metadata |
| `mono.sm` | 13 / 20 | 500 | IDs and codes |

Minimum text size: 12 px.

---

## 5. Spacing and layout

Base unit: 4 px.

Spacing tokens:

`0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80`

Gutters:

- mobile: 16 px
- tablet: 24 px
- desktop: 32 px

Grid:

- mobile: 4 columns
- tablet: 8 columns
- desktop: 12 columns

---

## 6. Shape and elevation

### Radius

| Token | Value |
|---|---:|
| `radius.sm` | 6 px |
| `radius.md` | 10 px |
| `radius.lg` | 14 px |
| `radius.pill` | 999 px |

Use borders before shadows.

---

## 7. Core components

### Button

Variants:

- Primary
- Secondary
- Quiet
- Danger
- Link
- Icon

Sizes:

- Small: 36 px
- Medium: 44 px
- Large: 48 px

### Input

- persistent label
- optional hint
- unit suffix
- inline validation
- scan support
- preserve value on error

### Search field

Wiki search requirements:

- large primary search on home
- keyboard shortcut on desktop
- recent searches
- search suggestions
- filter access
- clear button
- voice search later

### Status badge

Contains:

- icon
- text
- optional count

### Approval badge

Values:

- Local Draft
- Site Approved
- Network Approved
- Superseded
- Archived

### Article metadata strip

Shows:

- owner
- version
- effective date
- review date
- scope
- language

### Article card

Required:

- title
- content type
- process area
- approval status
- short summary
- updated date
- owner

### Process card

Required:

- process name
- short description
- content count
- owner
- unresolved review count

### Metric card

Required:

- name
- current value
- target
- trend
- status
- period
- source
- last refresh

### Action card

Required:

- title
- status
- owner
- due time
- source module
- priority

### Timeline

Use for:

- article version history
- incident history
- handover amendments
- cold-chain evidence
- audit records

### Data table

- sticky header
- keyboard support
- filters
- sort
- pagination
- permission-aware export
- mobile card transformation

### Checklist

- required or optional
- evidence requirement
- blocked state
- not applicable with reason
- progress summary

### Alert banner

Variants:

- Critical
- Warning
- Information
- Offline
- Stale
- Review Due
- Acknowledgement Required

### Modal and drawer

- modal for short actions
- drawer for record detail
- no long forms in modals
- unsaved-data protection

### Toast

Use only for transient confirmation.

### Scanner surface

- full-width target
- readiness state
- manual fallback
- duplicate warning
- invalid-code explanation

### Rich text editor

Supported blocks:

- heading
- paragraph
- ordered list
- unordered list
- table
- image
- attachment
- warning
- information
- checklist
- callout
- related content

### Version comparison

- additions
- removals
- changed metadata
- side-by-side desktop
- inline mobile

### AI draft panel

Required:

- AI-assisted label
- sources
- edit
- reject
- regenerate
- publish/approve
- audit notice

---

## 8. Navigation

### Mobile bottom navigation

Maximum five:

- Today
- Tasks
- Incidents
- Wiki
- More

### Desktop side navigation

Sections:

- Operate
- Learn
- Improve
- Develop
- Admin

Current site and shift appear above navigation.

---

## 9. Charts

Principles:

- begin with operational question
- show target
- label directly
- provide table alternative
- avoid 3D
- avoid decorative gauges
- do not overload

Recommended:

- line chart for trends
- horizontal bar for top offenders
- stacked bar for issue mix
- simple bars for Wiki usage
- sparklines in metric cards

---

## 10. Motion

- default duration: 150–200 ms
- reduced-motion support
- no celebratory motion for compliance
- no auto-scrolling dashboards
- avoid animation in high-severity alerts

---

## 11. Responsive behavior

### Mobile

- one column
- sticky search
- collapsible article sections
- card-based tables
- scan-first entry

### Tablet

- split view
- article contents sidebar
- two columns
- larger controls

### Desktop

- dense tables
- advanced filters
- multi-panel command layouts
- full version comparison

### Wallboard

- large typography
- no personal data
- no confidential article content
- auto-refresh indicator

---

## 12. Accessibility

- WCAG 2.2 AA
- contrast checks
- minimum 44 px touch targets
- visible focus
- semantic landmarks
- text alternatives
- no colour-only meaning
- error summary and inline error
- screen-reader announcements
- 200% zoom support
- accessible editor toolbar

---

## 13. Content style

Use:

- direct verbs
- short sentences
- specific operational language
- neutral tone

Prefer:

> Assign an owner before closing.

Avoid:

> Please ensure that the relevant stakeholder is assigned accordingly.

---

## 14. Component naming

Use domain-aware names:

- `WikiArticleCard`
- `ArticleApprovalBadge`
- `ProcessLibraryCard`
- `VersionComparison`
- `ShiftReadinessCard`
- `FrameCountInput`
- `ColdChainStep`

Avoid vague names such as `InfoBox`.

---

## 15. Governance

Every new component requires:

- use case
- accessibility behavior
- responsive behavior
- state matrix
- example
- tests
- design-system approval

Do not add near-duplicate components.
