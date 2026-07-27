# FCOS Flow — Shift Steering

## Document purpose

This document defines the product and implementation requirements for the **Shift Steering** page in FCOS Flow.

Shift Steering is an expanded shift-planning and live capacity-management workspace for Captains and Supervisors. It converts workload into labour hours, labour hours into staffing requirements, and staffing requirements into a clear operational plan.

The page is organised into three parallel operational columns:

1. **Ambient**
2. **Chilled**
3. **Frozen**

Each column contains the same planning structure so Captains can compare workload, available hours, staffing needs, projected completion, and risk across all temperature zones.

---

# 1. Product objective

Shift Steering should help Captains:

- calculate productive labour capacity for the shift
- allocate labour hours across tasks
- plan Ambient, Chilled, and Frozen independently
- calculate required staffing for Picking and Splitting
- plan Replenishment, Return and Waste, Cleaning, and other support tasks
- account for breaks, inactive time, and operational buffers
- compare required labour hours with available labour hours
- identify staffing deficits or surpluses
- rebalance Shoppers during the shift
- predict task and zone completion times
- generate clear operational recommendations
- create a final shift allocation plan

The page should support both:

- **Pre-shift planning**
- **Live shift steering**

---

# 2. Core product principle

> **Convert workload into hours, hours into people, and people into a clear shift plan.**

Every zone should answer:

- How much work is planned?
- How many productive hours are required?
- How many Shoppers are needed?
- When should each task finish?
- Where is the staffing gap?
- What happens if the allocation is not adjusted?

---

# 3. Primary users

## Captain

Uses Shift Steering to:

- prepare the shift plan
- assign Shoppers to tasks
- calculate task staffing
- react to live workload changes
- rebalance staff across zones
- monitor projected completion

## Supervisor

Uses Shift Steering to:

- review the complete fulfilment-centre plan
- identify cross-zone staffing risks
- approve major reassignments
- monitor labour-capacity balance
- compare planned and actual execution
- support escalation decisions

## FC Lead

Uses Shift Steering to:

- review operational capacity
- understand labour deficits and surpluses
- compare shift performance
- identify recurring planning issues
- evaluate process efficiency

---

# 4. Page structure

The page should contain five main sections:

1. **Shift header**
2. **Global shift assumptions**
3. **Three-column zone planning workspace**
4. **Cross-zone capacity summary**
5. **Live steering and recommendations**

---

# 5. Shift header

The page header should display:

- Site
- Shift date
- Shift name
- Shift start time
- Shift end time
- Current time
- Planned headcount
- Actual headcount
- Gross labour hours
- Net productive labour hours
- Total allocated labour hours
- Remaining unallocated hours
- Overall shift status

Example:

> **FC9 · Morning Shift · 06:00–13:45**  
> 25 Shoppers · 193.75 gross hours · 174.25 productive hours  
> 168.5 allocated · 5.75 unallocated · Status: Attention Required

---

# 6. Global shift assumptions

These inputs apply across Ambient, Chilled, and Frozen unless overridden within a zone.

| Field | Description |
|---|---|
| Shift start time | Planned beginning of the shift |
| Shift end time | Planned end of the shift |
| Total Shoppers | Number of available workers |
| Break duration | Total planned break time per Shopper |
| Inactive time | Expected non-productive time |
| Contingency buffer | Reserved labour capacity |
| Average OLS per round | Default order lines per picking round |
| Default transition time | Average time between picking rounds |
| Current time | Used for live recalculation |
| Planning mode | Pre-shift or live steering |

## Labour capacity calculations

```text
Gross labour hours =
Number of Shoppers × Shift duration
```

```text
Net productive labour hours =
Gross labour hours
− Total break hours
− Planned inactive hours
− Contingency buffer
```

The system should distinguish between:

- Gross labour hours
- Break hours
- Inactive hours
- Reserved hours
- Net productive hours
- Allocated hours
- Unallocated hours

---

# 7. Three-column zone layout

The main workspace should display three equal-width columns on desktop:

| Ambient | Chilled | Frozen |
|---|---|---|
| Zone workload | Zone workload | Zone workload |
| Labour capacity | Labour capacity | Labour capacity |
| Task allocation | Task allocation | Task allocation |
| Picking calculator | Picking calculator | Picking calculator |
| Splitting calculator | Splitting calculator | Splitting calculator |
| Risks and recommendations | Risks and recommendations | Risks and recommendations |

On smaller screens, the columns should become tabs or vertically stacked sections.

Recommended tab labels:

- Ambient
- Chilled
- Frozen
- All Zones

---

# 8. Zone summary card

Each zone should begin with a compact summary card.

## Required information

- Planned order lines
- Completed order lines
- Remaining order lines
- Planned headcount
- Current headcount
- Productive hours available
- Required labour hours
- Labour surplus or deficit
- Planned finish time
- Projected finish time
- Zone status

## Status values

- On Track
- Attention
- At Risk
- Critical
- Completed

Example:

> **Chilled — At Risk**  
> 16,800 OLS planned · 9,200 completed  
> 7 Shoppers active · 9 required  
> Projected finish: 14:08  
> Labour deficit: 8.5 hours

---

# 9. Zone task allocation

Each zone should include the following default tasks:

- Replenishment
- Picking
- Splitting
- Return and Waste
- Cleaning
- Quality checks
- Support tasks
- Other

## Task allocation fields

| Field | Description |
|---|---|
| Task | Operational activity |
| Start time | Planned task start |
| End time | Required completion time |
| Required labour hours | Calculated or manually entered |
| Allocated labour hours | Assigned capacity |
| Assigned Shoppers | Number of workers |
| Current progress | Work completed |
| Remaining workload | Outstanding work |
| Projected finish | Expected completion |
| Status | On Track, Attention, At Risk, Critical |
| Owner | Responsible Captain or Shopper |
| Action | Edit, assign, rebalance, resolve |

---

# 10. Picking calculator

Each zone should have its own Picking calculator.

## Required inputs

- Total order lines
- Completed order lines
- Remaining order lines
- Average picking speed
- Average OLS per round
- Average transition time per round
- Planned inactive time
- Planned completion time
- Current assigned Shoppers

## Productive picking hours

```text
Base picking hours =
Total OLS ÷ Average picking speed
```

## Estimated number of rounds

```text
Estimated rounds =
Total OLS ÷ Average OLS per round
```

Round up where complete rounds are required.

## Transition hours

```text
Transition hours =
Estimated rounds × Average transition time per round
```

## Adjusted picking hours

When inactive time is entered as a fixed amount:

```text
Adjusted picking hours =
Base picking hours
+ Transition hours
+ Inactive hours
```

When inactive time is entered as a percentage:

```text
Adjusted picking hours =
(Base picking hours + Transition hours)
÷ (1 − Inactive time percentage)
```

## Required Shoppers

```text
Required Shoppers =
Adjusted picking hours
÷ Effective available hours per Shopper
```

Always round up to the next whole Shopper.

## Picking outputs

- Base productive hours
- Estimated rounds
- Transition hours
- Adjusted labour hours
- Required Shopper count
- Current Shopper count
- Staffing difference
- Required OLS per hour
- Projected finish time
- Remaining OLS at deadline
- Risk level

---

# 11. Splitting calculator

Each zone should contain a dedicated Splitting calculator.

## Required inputs

- Total RCs to be split
- RCs already completed
- Average time to complete one RC
- Task start time
- Required end time
- Planned inactive time
- Current assigned Shoppers
- Optional contingency percentage

## Total splitting workload

```text
Total splitting minutes =
Total RCs × Average minutes per RC
```

```text
Total splitting hours =
Total splitting minutes ÷ 60
```

## Remaining splitting workload

```text
Remaining RCs =
Total RCs − Completed RCs
```

```text
Remaining splitting hours =
Remaining RCs × Average minutes per RC ÷ 60
```

## Available duration

```text
Available duration =
Required end time − Task start time
```

For live steering:

```text
Remaining available duration =
Required end time − Current time
```

## Effective available time per Shopper

```text
Effective time per Shopper =
Available duration × (1 − Inactive time percentage)
```

## Required number of Shoppers

```text
Required Shoppers =
Remaining splitting hours
÷ Effective available time per Shopper
```

Always round up.

## Splitting outputs

- Total splitting labour hours
- Remaining splitting labour hours
- Available completion window
- Effective hours per Shopper
- Required Shoppers
- Current assigned Shoppers
- Staffing gap or surplus
- Projected completion time
- RCs per hour required
- RCs expected to remain at deadline
- Recommended action

---

# 12. Replenishment planning

Each of the three zone columns—Ambient, Chilled, and Frozen—should contain a structured Replenishment calculator.

## Replenishment categories

The page must support the following replenishment types:

1. **OG (Obst und Gemüse) Replenishment**
2. **Pallet Replenishment**
3. **Dry/Fresh Replenishment**
4. **Splitted RC Replenishment**
5. **Unsplitted RC Replenishment**

The categories available in a zone may be configured by site. For example, OG and Fresh activities may be more relevant to Chilled, while Dry replenishment may be more relevant to Ambient.

## Required inputs for every replenishment category

Each replenishment category must contain the following inputs:

| Field | Description |
|---|---|
| Total TUs | Total transport units that must be replenished |
| Average speed per TU | Average number of TUs completed by one Shopper per hour |
| Start time | Planned beginning of the task |
| Required end time | Deadline for completing the task |
| Current assigned Shoppers | Number of Shoppers currently allocated |
| Completed TUs | TUs already replenished during live steering |
| Inactive time | Optional fixed time or productivity-loss percentage |
| Contingency buffer | Optional additional capacity allowance |

`Average speed per TU` should be displayed operationally as **TUs per Shopper per hour**.

## Category input table

| Replenishment type | Total TUs | Average speed per TU |
|---|---:|---:|
| OG Replenishment | User input | User input |
| Pallet Replenishment | User input | User input |
| Dry/Fresh Replenishment | User input | User input |
| Splitted RC Replenishment | User input | User input |
| Unsplitted RC Replenishment | User input | User input |

## Base labour-hours calculation

```text
Required replenishment hours =
Total TUs ÷ Average TUs completed per Shopper per hour
```

Example:

```text
240 TUs ÷ 40 TUs per Shopper per hour = 6 labour hours
```

## Remaining workload during live steering

```text
Remaining TUs =
Total TUs − Completed TUs
```

```text
Remaining replenishment hours =
Remaining TUs ÷ Average TUs completed per Shopper per hour
```

## Effective completion window

```text
Available duration =
Required end time − Start time
```

During a live shift:

```text
Remaining available duration =
Required end time − Current time
```

When inactive time is entered as a percentage:

```text
Effective time per Shopper =
Available duration × (1 − Inactive time percentage)
```

## Required Shopper calculation

```text
Required Shoppers =
Required replenishment hours ÷ Effective time per Shopper
```

Always round up to the next whole Shopper.

## Projected completion time

```text
Projected duration =
Remaining replenishment hours ÷ Current assigned Shoppers
```

```text
Projected finish =
Current time + Projected duration
```

The projected duration should be adjusted for inactive time where applicable.

## Replenishment outputs

For each category, display:

- Total TUs
- Completed TUs
- Remaining TUs
- Average TUs per Shopper per hour
- Required labour hours
- Remaining labour hours
- Available completion window
- Required Shoppers
- Current assigned Shoppers
- Staffing gap or surplus
- Projected finish time
- TUs expected to remain at the deadline
- Status
- Recommended action

## Consolidated replenishment summary

Each zone should also show a combined replenishment total.

```text
Total replenishment labour hours =
OG hours
+ Pallet hours
+ Dry/Fresh hours
+ Splitted RC hours
+ Unsplitted RC hours
```

The consolidated summary should display:

- Total TUs across all categories
- Total labour hours required
- Total Shoppers currently assigned
- Total Shoppers required
- Earliest category deadline
- Highest-risk replenishment category
- Overall replenishment status

## Example

| Category | Total TUs | Speed | Required h | Assigned | Required Shoppers | Deadline | Status |
|---|---:|---:|---:|---:|---:|---|---|
| OG | 180 | 45 TU/h | 4.0 | 1 | 2 | 09:00 | At Risk |
| Pallet | 120 | 30 TU/h | 4.0 | 2 | 2 | 10:00 | On Track |
| Dry/Fresh | 240 | 40 TU/h | 6.0 | 2 | 2 | 11:00 | On Track |
| Splitted RC | 160 | 32 TU/h | 5.0 | 1 | 2 | 10:30 | Attention |
| Unsplitted RC | 90 | 30 TU/h | 3.0 | 1 | 1 | 12:00 | On Track |

## Rule-based replenishment recommendations

```text
IF projected finish > required end time
THEN recommend additional Shoppers
```

```text
IF one replenishment category is projected to finish early
AND another category is at risk
THEN recommend moving a trained Shopper between categories
```

```text
IF actual TU speed < planned TU speed
THEN recalculate required labour hours and projected finish
```

```text
IF remaining TUs = 0
THEN release assigned capacity to the highest-risk eligible task
```

---

# 13. Return and Waste planning

Inputs:

- Estimated RCs or totes
- Average processing time
- Required completion time
- Assigned Shoppers
- Documentation time
- Cleaning time

Outputs:

- Required labour hours
- Required Shopper count
- Projected finish
- Staffing gap
- Unfinished workload at deadline

Manual entry of required hours should be supported for the MVP.

---

# 14. Cleaning planning

Each zone should allow cleaning tasks to be planned by area.

Each task should contain:

- Cleaning area
- Estimated minutes
- Assigned Shopper
- Earliest start
- Required completion
- Status
- Sign-off
- Optional evidence

---

# 15. Inactive time

Inactive time should be visible and configurable per zone.

Examples:

- Walking between assignments
- Waiting for carts
- Scanner setup
- Equipment delays
- Meetings
- Stand-ups
- Task switching
- Process waiting
- End-of-shift transition
- Cold-area clothing transition

Captains should be able to enter inactive time as:

- Minutes per Shopper
- Total labour hours
- Percentage of productive time

The system should show its capacity impact.

---

# 16. Cross-zone capacity summary

Below the three columns, the page should show one consolidated table.

| Zone | Available h | Required h | Difference | Required Shoppers | Current Shoppers | Projected Finish | Status |
|---|---:|---:|---:|---:|---:|---|---|
| Ambient | 92.0 | 86.5 | +5.5 | 13 | 14 | 13:18 | On Track |
| Chilled | 58.0 | 66.5 | -8.5 | 9 | 7 | 14:08 | At Risk |
| Frozen | 24.0 | 22.0 | +2.0 | 4 | 4 | 13:25 | On Track |

Example recommendation:

> Ambient has 5.5 surplus labour hours. Reassign two Chilled-trained Shoppers from Ambient to Chilled for 90 minutes.

---

# 17. Shopper assignment panel

Each Shopper row should show:

- Name
- Shift start
- Shift end
- Current zone
- Current task
- Next task
- Transition time
- Average picking speed
- Trained zones
- Specialised skills
- Break group
- Allocated hours
- Unallocated hours
- Assignment conflicts

The system should prevent:

- overlapping assignments
- allocation beyond scheduled hours
- assignment to restricted tasks without training
- critical zones falling below minimum coverage

---

# 18. Live shift steering

During the shift, Captains should update:

- Current time
- Completed OLS by zone
- Completed RCs by zone
- Actual picking speed
- Actual staffing
- Absences
- Delays
- Task completion
- Inactive time
- Equipment or process interruptions

The system should recalculate:

- Remaining labour requirement
- Revised Shopper requirement
- New projected finish
- Staffing deficits
- Capacity that can be released
- Cross-zone transfer opportunities
- Risk status

---

# 19. Rule-based recommendations

## Splitting delay

```text
IF projected splitting finish > required end time
THEN recommend additional Shoppers
```

## Picking underperformance

```text
IF actual picking speed < planned picking speed
THEN recalculate required labour hours and projected finish
```

## Capacity conflict

```text
IF allocated labour hours > available labour hours
THEN highlight over-allocation
```

## Rebalancing opportunity

```text
IF one zone has surplus capacity
AND another zone has a labour deficit
AND trained Shoppers are available
THEN recommend a temporary transfer
```

## Break risk

```text
IF a planned break causes a zone to fall below minimum coverage
THEN recommend delaying or changing the break group
```

---

# 20. Recommended desktop layout

```text
┌─────────────────────────────────────────────────────────────┐
│ Shift Header                                                │
├─────────────────────────────────────────────────────────────┤
│ Global Shift Assumptions                                    │
├───────────────────┬───────────────────┬─────────────────────┤
│ AMBIENT           │ CHILLED           │ FROZEN              │
│ Zone Summary      │ Zone Summary      │ Zone Summary        │
│ Task Allocation   │ Task Allocation   │ Task Allocation     │
│ Picking           │ Picking           │ Picking             │
│ Splitting         │ Splitting         │ Splitting           │
│ Risks             │ Risks             │ Risks               │
├───────────────────┴───────────────────┴─────────────────────┤
│ Cross-Zone Capacity Summary                                 │
├─────────────────────────────────────────────────────────────┤
│ Shopper Assignments                                         │
├─────────────────────────────────────────────────────────────┤
│ Live Recommendations and Rebalancing Actions                │
└─────────────────────────────────────────────────────────────┘
```

---

# 21. MVP scope

The first release should include:

1. Shift start and end times
2. Global Shopper headcount
3. Break and inactive-time inputs
4. Three-column Ambient, Chilled, and Frozen layout
5. Zone workload input
6. Zone task allocation
7. Picking calculator per zone
8. Splitting calculator per zone
9. Replenishment manual planning
10. Return and Waste manual planning
11. Cleaning allocation
12. Required Shopper calculation
13. Capacity surplus or deficit
14. Cross-zone summary
15. Named Shopper assignments
16. Projected completion
17. Basic rule-based recommendations
18. Save and duplicate shift plan

---

# 22. Acceptance criteria

The page is successful when a Captain can:

- create a complete shift plan in under five minutes
- plan Ambient, Chilled, and Frozen independently
- calculate net productive labour hours
- calculate Picking hours from OLS and average speed
- calculate Splitting staffing from RC workload and deadline
- identify labour deficits and surpluses by zone
- compare the three zones side by side
- assign Shoppers without schedule conflicts
- update live progress
- immediately see revised staffing requirements
- identify which zone can release capacity
- identify which zone needs support
- generate a clear final allocation plan

---

# 23. Success metrics

Track:

- Percentage of shifts planned using Shift Steering
- Median time to create a shift plan
- Percentage of Captains returning weekly
- Number of live rebalancing actions
- Percentage of tasks completed by planned end time
- Reduction in unallocated labour hours
- Reduction in late task completion
- Accuracy of projected finish times
- Captain satisfaction score
- Supervisor adoption rate

---

# 24. Final product statement

> **Shift Steering gives Captains one place to plan, compare, and rebalance Ambient, Chilled, and Frozen—before and during every shift.**
