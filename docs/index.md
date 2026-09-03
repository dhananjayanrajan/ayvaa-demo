# Design System Suite Index

> Master index of the Ayvaa design system documentation suite.
> Suite authority: `design-system.md` (this index is supplementary).
> This index is the cutover spine: it maps every task type and domain to its
> owning document, and it carries the build-phase cutover order.

## Part 1 — Task-Type → Owning Document

Every construction question routes to exactly one owning document. From `09-construction.md` §2.

| Task type | Owning document |
|-----------|-----------------|
| What color / spacing / radius / type role? | 01-design-language |
| What state / tone / mode / entity treatment? | 02-states-and-semantics |
| What word / verb / register / copy line? | 03-content |
| What gesture / trigger / QoL / a11y? | 04-interaction |
| What duration / spring / choreography? | 05-motion |
| What data shape / props / module pattern / act resolution? | 06-data |
| Which shell / chrome component? | 07a-components-shells |
| Which list / row / disclosure component? | 07b-components-lists |
| Which control / input component? | 07c-components-controls |
| Which data-display component? | 07d-components-displays |
| Which care-delivery composition? | 07e-components-care-domains |
| Which platform / shared composition? | 07f-components-platform-domains |
| How to assemble a screen? | 08-composition |
| How to build / ratify / gate a pattern? | 09-construction |

## Part 2 — Domain → Compositions, Primitives, Data, Screens

Each domain's catalog surface: the compositions it consumes (07e/07f), the primitives those compositions assemble from (07a–07d), the data modules that feed them (06), and the screens that assemble them (08).

### Patient / Guardian

| Layer | Entries |
|-------|---------|
| **Compositions (07e)** | MatchCard★, BookingWizard, ConsentCard+ScopeSheet, DoseRow+Schedule, VitalsCard+Sheet, VisitCard family, LiveVisit★, VisitSummary family, RateVisitSheet, PaymentSheet |
| **Primitives (07a–07d)** | PhoneFrame, Screen, AppBar, NavBar, SheetShell★, PageHero★, HeroCells, Row★, ExpandRow, StepList, EmptyState, Field★, SegmentedTabs★, LifecycleButton★, DialInput★, StarPicker, StatusPill, TimeChip, FactRows, StatStrip, QuotePanel, Meter, Ring, Tile, LiveDot, Skeleton |
| **Data (06)** | patientOnboarding, patientAuth, patientVerification, patientIdentity, patientRecovery, patientDashboard, patientNotifications, patientCatalogue, services, patientMatching, patientCarePlan, patientReports, patientVisits, patientLiveVisit, patientVisitSummary, patientRating, patientMeds, patientPrescriptions, patientRecords, patientConsent, patientBilling |
| **Screens (08)** | P01–P34 (34 existing) + P35–P94 (60 planned) |

### Healthcare Professional

| Layer | Entries |
|-------|---------|
| **Compositions (07f)** | OffersInbox★, SessionRunner★, AvailabilityEditor, IdentityVerificationJourney, IncidentReportFlow |
| **Primitives (07a–07d)** | PhoneFrame, Screen, AppBar, NavBar, SheetShell★, PageHero★, HeroCells, Row★, ExpandRow, StepList, EmptyState, Field★, SegmentedTabs★, LifecycleButton★, DialInput★, StatusPill, TimeChip, FactRows, StatStrip, QuotePanel, Meter, Ring, Tile, LiveDot, Skeleton |
| **Data (06)** | professionalCare, sessionExecution, sessionRecords, incidentData, payoutData, profileData, professionalHistory, availabilityData |
| **Screens (08)** | PR01–PR12 (12 existing) + PR13–PR29 (17 planned) |

### Partner

| Layer | Entries |
|-------|---------|
| **Compositions (07f)** | OffersInbox★, SessionRunner★, AvailabilityEditor, ApprovalQueue |
| **Primitives (07a–07d)** | PhoneFrame, Screen, AppBar, NavBar, SheetShell★, PageHero★, HeroCells, Row★, ExpandRow, StepList, EmptyState, Field★, SegmentedTabs★, LifecycleButton★, StatusPill, TimeChip, FactRows, StatStrip, QuotePanel, Meter, Ring, Tile, Skeleton |
| **Data (06)** | partnerPerformanceTypes, partnerBillingTypes, performanceData, payoutData, profileData |
| **Screens (08)** | PT01–PT07 (7 existing) + PT08–PT14 (7 planned) |

### Administrator

| Layer | Entries |
|-------|---------|
| **Compositions (07f)** | ApprovalQueue, IncidentReportFlow, IdentityVerificationJourney |
| **Primitives (07a–07d)** | PhoneFrame, Screen, AppBar, NavBar, SheetShell★, PageHero★, HeroCells, Row★, ExpandRow, StepList, EmptyState, Field★, SegmentedTabs★, LifecycleButton★, StatusPill, TimeChip, FactRows, StatStrip, QuotePanel, Meter, Ring, Tile, Skeleton |
| **Data (06)** | patientAudit, patientConsent, incidentData, system/auditLog, system/transactions, system/notifications |
| **Screens (08)** | A01–A09 (9 existing) + A10–A18 (9 planned) |

### System

| Layer | Entries |
|-------|---------|
| **Compositions (07f)** | SessionRunner★, IncidentReportFlow |
| **Primitives (07a–07d)** | PhoneFrame, Screen, AppBar, NavBar, SheetShell★, PageHero★, HeroCells, Row★, ExpandRow, StepList, EmptyState, Field★, SegmentedTabs★, LifecycleButton★, StatusPill, TimeChip, FactRows, StatStrip, QuotePanel, Meter, Ring, Tile, Skeleton |
| **Data (06)** | system/executionTrail, system/notifications, system/transactions, system/recheck, system/auditLog, system/payments |
| **Screens (08)** | S01–S03 (3 existing) + S04–S08 (5 planned) |

## Part 3 — Cutover Order (anchored on the three exemplars)

The build phase rebuilds screens as pure assemblies from the catalog. Order is anchored on the three calibration exemplars (R8) — **Completion Sheet, Live Visit, Consent-Gated Record** — which seal the open values. Clean-first sequencing is refused: cleanliness earns nothing; the exemplars are the sealing mechanism.

### Slice 1 — Completion Sheet domain (exemplar 1)

Builds only the catalog entries the completion-sheet domain consumes, in layer order, then rebuilds the two summary screens as pure assemblies.

| Step | Work | Consumes |
|------|------|----------|
| 1.1 | Miner rerun inside the slice (before first odometer entry) | legacy corpus |
| 1.2 | Catalog primitives the domain consumes (SheetShell, PageHero/AccentHero, HeroCells, FactRows, StatusPill, Row, ExpandRow, QuotePanel, StarPicker, LifecycleButton, Chip, TimeChip, Card, Tile, Section, Panel) | 07a–07d |
| 1.3 | Domain compositions: VisitSummary family (SummaryHero, SessionLedgerCard, CareDeliveredCard, CaregiverNoteCard, VitalsCard, PaymentBreakdownCard, ShareSummaryButton) | 07e §4.8 |
| 1.4 | Domain compositions: RateVisitSheet + RatingHero + HighlightTags | 07e §4.9 |
| 1.5 | Shared confirm-arc machinery (LifecycleButton arc, SheetShell mounting) | 07c, 07a |
| 1.6 | Rebuild P17 (Visit Summary) as pure assembly | 08 |
| 1.7 | Rebuild P18 (Rate Visit) as pure assembly | 08 |
| 1.8 | Walkthrough package (captures + user walkthrough) | §5 |

### Slice 2 — Live Visit domain (exemplar 2)

| Step | Work | Consumes |
|------|------|----------|
| 2.1 | Catalog primitives the domain consumes (LiveDot, Meter ticking variant, StreamList, PageHero phase) | 07a–07d |
| 2.2 | LiveVisit family compositions (LiveVisitHero, LiveStepCard, VisitSoFarSheet, StreamList ledger, notify-at-sign-off) | 07e §4.7 |
| 2.3 | Rebuild P16 (Live Visit Tracking) as pure assembly | 08 |

### Slice 3 — Consent-Gated Record domain (exemplar 3)

| Step | Work | Consumes |
|------|------|----------|
| 3.1 | Catalog primitives the domain consumes (MiniTimeline, StatusPill, SearchSheet, PageHero) | 07a–07d |
| 3.2 | RecordsVault family (incl. `missing` data-state exemplar — open item) | 07e §5 |
| 3.3 | ConsentCard + ConsentScopeSheet + WithdrawalCeremony | 07e §4.3 |
| 3.4 | Rebuild P21 (Records) + P22 (Consent) as pure assemblies | 08 |

### Slices 4+ — remaining domains

After the three exemplars seal the open values, the remaining domains rebuild in dependency order (each domain's compositions before its screens). Full per-domain sequencing is recorded in the build conversation, not pre-decided here — the exemplars are the gate.

## Suite Documents

| # | Document | Scope | Lines | Status |
|---|----------|-------|-------|--------|
| — | [design-system.md](./design-system.md) | Master — mission, invariants, rulings, verification | 418 | Active |
| 01 | [01-design-language.md](./01-design-language.md) | Canvas, anatomy, layout, spacing, color, typography, icons | 227 | Active |
| 02 | [02-states-and-semantics.md](./02-states-and-semantics.md) | State axes, derivation matrix, per-entity treatments | 286 | Active |
| 03 | [03-content.md](./03-content.md) | Register, verb lexicon, copy budgets, state-copy bank | 153 | Active |
| 04 | [04-interaction.md](./04-interaction.md) | Trigger taxonomy, gestures, QoL catalog, a11y | 131 | Active |
| 05 | [05-motion.md](./05-motion.md) | Duration scale, spring catalog, entrance/exit, choreography | 149 | Active |
| 06 | [06-data.md](./06-data.md) | Data-layer boundary, module anatomy, props taxonomy | 122 | Active |
| 07a | [07a-components-shells.md](./07a-components-shells.md) | PhoneFrame, Screen, AppBar, NavBar, Sheet, Hero, Toast | 163 | Active |
| 07b | [07b-components-lists.md](./07b-components-lists.md) | Row, ExpandRow, StepList, Timeline, EmptyState, StreamList | 114 | Active |
| 07c | [07c-components-controls.md](./07c-components-controls.md) | Field, OtpInput, Switch, Tabs, LifecycleButton, Dial | 161 | Active |
| 07d | [07d-components-displays.md](./07d-components-displays.md) | Chip, StatusPill, FactRows, StatStrip, Meter, Ring, Skeleton | 172 | Active |
| 07e | [07e-components-care-domains.md](./07e-components-care-domains.md) | MatchCard, Booking, Consent, Dose, Vitals, Visit, Payment | 150 | Active |
| 07f | [07f-components-platform-domains.md](./07f-components-platform-domains.md) | Offers, Sessions, Availability, Identity, Approval, Incident | 119 | Active |
| 08 | [08-composition.md](./08-composition.md) | Screen assembly, page architecture, sheets, navigation | 124 | Active |
| 09 | [09-construction.md](./09-construction.md) | Routing table, 7-phase build, admission gate, ratification | 107 | Active |

## Operational Documents

| Document | Scope | Lines |
|----------|-------|-------|
| [screens.md](./screens.md) | Screen plan — 79 existing + 84 planned | 189 |
| [workflows.md](./workflows.md) | Workflow registry — 77 workflows across 5 groups | 104 |
| [coverage.md](./coverage.md) | Coverage matrix — 2 built, 75 partial | 113 |

## Mined Reference Documents

| Document | Scope |
|----------|-------|
| [mined/visit-summary.md](./mined/visit-summary.md) | Visit summary screen analysis |
| [mined/live-visit.md](./mined/live-visit.md) | Live visit screen analysis |
| [mined/consent-records.md](./mined/consent-records.md) | Consent records screen analysis |

## Work Packets

| Document | Scope |
|----------|-------|
| [packets/slice-1.md](./packets/slice-1.md) | Slice-1 work packet — completion-sheet domain (exemplar 1) |

## Suite Totals

- **14 canonical documents** (master + 01–09 + 07a–07f)
- **3 operational documents** (screens, workflows, coverage)
- **3 mined reference documents**
- **1 work packet** (slice-1)
- **~2,200 lines** of design system specification
