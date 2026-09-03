# AYVAA DESIGN SYSTEM — MASTER DOCUMENT

**Version:** 2.2 — catalog completed and synced (07 split recorded; ChartBars, Skeleton, ToastHost admitted; all references closed). The deliverable of this phase is a documentation suite; no framework code, runtime, harness, or shared infrastructure exists or will be produced by it.
**Authority:** User intent is supreme. Where this document conflicts with any prior artifact (README, framework-plan v2, migration ledgers, REDESIGN.md, ANTI-DESIGN.md, progress logs), **this document wins**. Amendment only via §6.
**Audience:** A fresh session with no prior context. This suite plus the repository are the complete world.
**Location:** `docs/design-system.md` (this master). Detail documents land one at a time per §4.

---

## §0 — MISSION, GUARANTEES, RULINGS

### 0.1 Context

Ayvaa is a healthcare ecosystem: an in-house on-demand homecare booking platform (patients/guardians, healthcare professionals, partners, administrators, plus system operations), currently realized as a React/Vite/TypeScript prototype — 79 built screens (Patient 34, Professional 12, Partner 7, Admin 18, System 8), ~40 mock data modules, ~410 component files across role folders, a phone primitive kit, a shadcn/radix UI layer, an animation library. Product trajectory: ~20 applications, each with large screen collections, plus web portals for everything — roughly 10× the current corpus.

The current corpus was produced screen-first: components were *extracted as byproducts of screens*, then manually upgraded, then partially "refactored." That trajectory projects to 5000+ components at full scale and has already produced a half-baked refactor. This suite replaces that trajectory: a rebuild from ideology, not a cleanup.

The demo repo is the **specification** for the real project (R11): screen IDs and workflow mapping are the cross-reference spine between demo, docs, and future native builds.

### 0.2 Mission

Build the **Ayvaa design system**: a closed catalog of component patterns, fully specified across every dimension a component decision touches, specialized for healthcare delivery surfaces.

- It is **not** a base UI kit and does not replace shadcn/Material — those are substrate (I11).
- It is **not** a refactor of the old corpus. The old corpus is a *requirements quarry only* (R6).
- The suite is the product of this phase. Components and screens are the product of the build phase — assembled from the catalog as typed imports + typed data + layout order, nothing else.
- The suite exists to do three jobs, from which all ten expectations derive:
  1. **What components say** — curated healthcare semantics; purpose, priority, urgency, state legible at a glance; unmisreadable data (E1–E3).
  2. **How components connect** — layered ownership, shared state across operational dependency, mutual communication (E4, E8).
  3. **How components behave** — total reactivity, organic interactivity, expressive response, fluid motion, baked-in QoL (E5–E7, E9–E10).

### 0.3 The Ten Expectations — the yardstick, verbatim

1. Every component to be built as a highly tailored and curated output specifically for the healthcare industry.
2. Every component to be built readily apparent on exact purpose, nature, utility, priority, urgency, data and state.
3. Every component to be built intentionally to reflect ultra clear data with no room for misunderstanding anything.
4. Every component to be built into layers where dynamic data and state is shared across operational dependency.
5. Every component to be built extremely reactive to all activity from user and relative changes to data and state.
6. Every component to be built with organic and natural human interactivity baked into its core by default.
7. Every component to be built with fully eye-catching expressive behavior to overall data and state changes across.
8. Every component to be built communicable with each other over all data, state, and activity they own and affect.
9. Every component to be built ultra smooth and ultra fluid flowing with no janky static transitions or animations.
10. Every component to be built with quality of life experiences with automatic triggers, gestures and shortcuts.

### 0.4 The Core Economic Invariant

**Component patterns are bounded; screens are unbounded but cheap.** Catalog patterns grow only when a genuinely new pattern is admitted (I7, procedure in 09). Screens are assemblies: typed imports + typed data + layout order — nothing else. A screen that "needs" a bespoke component is a catalog gap, and the fix belongs in the catalog. This invariant is the anti-5000 mechanism; every other section serves it.

### 0.5 Expectation Map

Where each expectation is governed, and how it is checked. Checks are deliberately light: static inspection, captures, and the user's walkthrough (§5).

| # | Expectation | Governed by | Checked by |
|---|---|---|---|
| E1 | Healthcare-curated | §3 + 02 semantics + 07 catalog | inspection (every component declares its semantic contract) + walkthrough |
| E2 | Apparent purpose/priority/urgency/state | 02 derivation + 01 encoding | captures + walkthrough |
| E3 | Ultra-clear data, no misreads | 06 data + 03 content | inspection (no parse-at-render, no magic literals) + walkthrough |
| E4 | Layered shared state | I1, I3 + 06 + 08 | inspection (single-source derivation, explicit flow) + walkthrough |
| E5 | Reactive to user and data | 04 interaction + 05 motion | walkthrough |
| E6 | Organic interactivity by default | 04 QoL catalog | walkthrough |
| E7 | Expressive whole-surface response | I5 + 02 + 05 | captures + walkthrough |
| E8 | Mutual communication | I3 + 06 + 08 | inspection + walkthrough |
| E9 | Ultra smooth, no jank | 05 motion | captures + walkthrough |
| E10 | QoL: triggers, gestures, shortcuts | 04 | walkthrough |

### 0.6 Ruling Registry

Status: **ACTIVE** governs now · **PARKED** is decided but belongs to the build phase · **SUPERSEDED** is history, kept for provenance.

| R# | Status | Ruling |
|---|---|---|
| R1 | SUPERSEDED (R15) | Actor-web communication substrate. |
| R2 | SUPERSEDED (R15) | Machine threshold as platform mandate. Survives as pattern guidance in I4. |
| R3 | SUPERSEDED (R15) | Single canonical wiring hook. Survives as discipline in I5. |
| R4 | PARKED — build phase | Strangler-fig cutover: vertical slice certifies, then domain-by-domain lands components with their rebuilt screens. |
| R5 | PARKED — build phase | Deletion is progressive and grep-gated; repo stays green; final cull is the last act. |
| R6 | ACTIVE | The old corpus is mined for requirements only; byte-fidelity to it is dead. |
| R7 | PARKED — build phase | Certification scope = the 79 existing screens; the 84 planned-but-unbuilt screens are deferred until after cutover. |
| R8 | PARKED — build phase | Calibration exemplars (Completion Sheet / Live Visit / Consent-Gated Record; DialInput as tactile bar) remain the sealing mechanism for open values. |
| R9 | SUPERSEDED (R15) | New code under `src/framework/`. |
| R10 | SUPERSEDED (2.0 rewrite) | Two-movement document structure — replaced by the suite architecture (§4). |
| R11 | ACTIVE (amended) | Demo-first, native-ready. The demo repo is the specification for the real project: every rebuilt screen keeps its screen ID and workflow mapping; workflow/screen/coverage docs are the cross-reference spine; no speculative abstraction layer is built. The v1.0 import-gate machinery is moot under R15; the surviving principle is platform-neutral *thinking* — semantics, data contracts, and component contracts are written without web-only assumptions. |
| R12 | ACTIVE | Semantic foundation ratified as drafted: urgency = time-criticality, not clinical danger; stakes precedence person-safety > binding > elevated > routine > informational; tones from universal + clinical convention; ONE content register. |
| R13 | ACTIVE (amended 2.1) | Documentation tracking: the suite and the product spine (`docs/workflows.md`, `docs/screens.md`, `docs/coverage.md`) are git-tracked. The evidence ledger (`docs/verify-log.md`) is retired — evidence lives in git history and the amendment log. Old canon (`docs/redesign.md`, `docs/anti-design.md`) stays local and gitignored as mining seed until the suite completes, then is deleted. New docs tracked unless ruled otherwise. |
| R14 | ACTIVE | A seed is a decision. Concrete values enter the suite only with evidence and user approval; nothing is invented silently. |
| R15 | ACTIVE | The goal is a component design documentation suite, not a UI framework. No framework code, no runtime, no harness, no shared infrastructure — ever. Component state management is a per-component pattern decision, not a platform. The v1.0 §9 verification protocol and §10 build program are superseded. |

### 0.7 Success Condition — documentation phase

The suite is done when all of the following hold:

- (a) Every dimension a component decision touches has a governing section somewhere in the suite.
- (b) Every rule is concrete: two builders applying the same document to the same problem reach the same output.
- (c) Every value is either sealed with provenance or explicitly open, with its owning document named.
- (d) The suite alone — no other reference — suffices to construct any component pattern present in the legacy corpus at or above its current quality.
- (e) The user has read and ratified each document.

Build-phase success conditions (screens rebuilt, legacy culled, assembly economics) are re-ratified in the build conversation — not inherited silently from v1.0.

### 0.8 What the Guarantee Means

The suite's guarantee is conditional on application: any component built *by following the suite* satisfies the ten expectations, because every expectation maps to named mechanisms (§0.5) and the construction procedure (09) routes every decision through them. It does not mean unattended perfection. **The user's walkthrough is the final authority over every claim in this suite.**

---

## §1 — FAILURE LEDGER

Nine failure modes produced the current mess. Each is a law's parent: the standing rule is binding because the failure already happened once.

| # | Failure | What happened | Root cause | Standing rule |
|---|---|---|---|---|
| F1 | **Screen-byproduct explosion** | Components extracted from screens; 400+ components for 79 screens; projected 5000+ at ~10× scale | Components inherit screen specificity; count scales as screens × states | **I7** — design against a closed catalog; never extract |
| F2 | **Wrapper fraud** | "Hardening" commits were 5–15-line emit wrappers; 45 "DomainSets" were concatenation bundles with suffix forks | Shape performed, substance skipped; verification inspected neither | **I2** — the completeness gate is the component, not its commit message |
| F3 | **Verification theater** | tsc-only gates claimed completion; protocols were written and never executed | A gate that cannot fail is not a gate | **I12** — nothing is done until the user has seen it |
| F4 | **Rename-dedup** | "Deduplication" by renaming duplicates instead of merging variants | Merging treated as file shuffling, not API design | **I7** — variant-merge into single exports; suffix forks prohibited |
| F5 | **Bulk churn & cosmetic rebases** | Bulk sweeps; bulk-add then bulk-revert; a 50-commit message-reword rebase lost a file | Optics optimized over landings | **I10** — one thing in flight, small verified landings, no cosmetic rebases on live work |
| F6 | **Fidelity to a flawed baseline** | A prior contract demanded byte-fidelity to originals — preserving the disease while treating symptoms | Refactor frame instead of rebuild frame | **R6** — mine requirements, never implementation |
| F7 | **Abstract canon** | 585-line design documents written without building; components drifted from them immediately | Untested decisions rot on contact | **I8** — open values stay open until evidence; nothing invented silently |
| F8 | **Canon without enforcement mechanism** | Real, empirically-derived rules still decayed across document eras — contradictions accumulated because enforcement was prose and memory | Rules without application procedures rot | **I8** — rules carry strength (MUST/SHOULD), provenance, and concreteness sufficient for two builders to agree |
| F9 | **Deliverable creep** | A documentation mandate escalated into building runtime, harness, and token seeds — infrastructure the deliverable never needed; each green gate read as authorization for the next step; retention was rationalized instead of questioned | Momentum substituted for disposal; scope changes were never surfaced for ruling | **I0** — only ruled deliverables are built; a passing check is evidence, never authorization; the user disposes on scope |

Reading rule for a fresh session: when any choice is ambiguous, resolve it in the direction that makes F1–F9 structurally impossible to repeat.

---

## §2 — INVARIANTS

### I0 — Deliverable boundary

The suite is the deliverable of the documentation phase; components and screens are the deliverable of the build phase. While the mandate is documentation, no code, no token files, no tooling, no infrastructure is produced — however useful it would be later. A passing check is evidence, never authorization. Scope changes only by user ruling (F9's standing rule).

### I1 — Layer discipline

Five conceptual roles; layers consume only lower layers. Physical directory layout is a build-phase decision — the discipline is the contract.

| Role | Owns | May consume | Never |
|---|---|---|---|
| **Atoms** | Tokens, atomic visuals (Tile, Chip, Dot, Meter…) | Nothing | Logic, timers, behavior ownership, domain |
| **Universals** | Pattern shells with slots (SheetShell, Row, Hero shells…) | Atoms | Behavior ownership beyond their own pattern, domain knowledge |
| **Composites** | Components owning behavior: state lifecycle, timers, a11y, QoL, tone mapping | Atoms, universals | Domain data shapes (typed contracts only) |
| **Domain compositions** | Healthcare wiring: data joined to composites, flows | Everything below | Re-implementing lower-layer behavior |
| **Screens** | Assembly: imports, layout order, data supply | Domain sets, data layer | Component JSX, presentation logic, hand-tuned motion |

Behavior is owned exactly once, at the lowest layer that can own it.

### I2 — Component anatomy (the completeness gate)

Any component that owns behavior ships **all** of the following or it is not done — regardless of file name, location, or commit message:

1. Typed Props; tone/size/variant expressed as token types; no magic literals.
2. An explicit, deliberately modeled state lifecycle — a state-machine pattern where complexity warrants, disciplined React state where it doesn't (per-component choice, R15). Either way, states, events, and transitions are enumerable by reading the component.
3. Self-cleaning timers and subscriptions — unmount-safe, leak-free. Async paths declare their timeout behavior with copy that says what happened and the way out (D2).
4. ONE source mapping state → presentation (I5).
5. Whole-surface tone-**and-composition** response: shell, tiles, chips, buttons — and structural branches — move together. A tint-only flip across states that need different compositions is a defect (A4).
6. Every applicable QoL behavior (04).
7. Full a11y: role, aria, focus-visible, keyboard equivalent.
8. Return paths: undo, cancel, handback ("keep editing" after done); no dead-end states (A5). Blocking states lock the inputs they protect and state why.
9. State persists with its owner at the correct scope: reopening a tab, sheet, or screen never resets persisted state (D4).

Field-level validation is its own lifecycle: `empty → invalid → valid`; the hint exists only in invalid; valid is the only success signal (D1).

### I3 — Communication discipline

Components communicate through explicit React mechanisms: props in, callbacks out, state lifted to the common owner, context for genuine cross-tree concerns. **One fact, one owner, one source.** Every derived value derives from a single derivation (I6); two surfaces showing "the same" fact derive from the same call. Parents compose; children publish intent via callbacks and own nothing beyond their ownership. No hidden channels, no parallel stores for one fact. E4 and E8 are served by data-flow design, not by a communication platform.

### I4 — Behavior threshold

Components owning time, async, gating, or multi-step flow model their lifecycle explicitly and completely — states, events, transitions, timeout paths, return paths. A state-machine pattern is the default recommendation where complexity warrants; plain state is acceptable where it is honestly sufficient. Pure kinetic response (hover/press/focus) stays declarative motion props. The fence: no ceremony below the threshold, no ad-hoc state spaghetti above it. Typed verb distinctions hold where flows are modeled: `cancel` (before effect) ≠ `abort` (kill in-flight); `retry`, `resolve`, `reject` are explicit events (D5).

### I5 — State decides, presentation executes

Every behavioral component holds ONE source of truth mapping state → presentation: the tone surface, the composition branches, and the motion variants all derive from it. States that need different structures get different compositions; hand-maintained presentation tables that mirror state by hand are defects waiting to desync — derive, or co-locate with the state itself, never duplicate (A10/D7). Springs come from the motion document (05), per-origin, never unified. No CSS transitions for state-driven motion.

### I6 — Data discipline & the three state axes

Components receive clean typed fields; parsing and derivation happen at the data layer; zero parsing at render; zero magic literals. The three state axes are declared **separately** and rendered **distinctly**:

- **Interaction** — rest / hover / focus / active / disabled.
- **Lifecycle** — the component's own state (e.g., idle → working → done → failed).
- **Data** — empty / loading / partial / stale / conflict; `missing` (expected-yet-absent, carrying consequence) is an open item owned by 02.

Conflating axes or staying silent about data state is a defect.

**Single-source derivation:** data-layer helpers are functions of current state; every surface derives from the same call. A count in prose derives from the same data as its chip; desync between them is a defect class (A6).

### I7 — Catalog closure, variants, and admission

The catalog (07) is the complete set of component patterns that exist. Nothing ships outside it.

- **Parametric variation within one composition → variant Props union** (single export).
- **Different compositions → separate purpose-built components sharing primitives.** Never one config-driven mega-component: `ReactNode`/boolean-flag slot cards are banned. Slots belong to structural universals only.
- Suffix forks (`*_Patient`) are prohibited (F4).

A new pattern is admitted only through the construction procedure (09): a semantic contract fitting §3, full anatomy per I2, user approval. Otherwise: compose the existing catalog.

### I8 — Canon authority & concreteness

This suite supersedes REDESIGN.md and ANTI-DESIGN.md as canon; they remain mining seed (R6) and are deleted once the suite is complete. Rules carry strength — **MUST** (binding) or **SHOULD** (guidance) — and every rule is written concrete enough that two builders reach the same output; a rule that cannot meet that bar is demoted to guidance (anti-F8). Values are **sealed** (decided, provenance stated) or **open** (owned by a named document, decided in the build phase with evidence and user approval per R14). Nothing is invented silently.

### I9 — Determinism & code hygiene

Identical props + identical data → identical rendered output. No render-time randomness or wall-clock reads — the component's state owns its clock. No code comments. No `transition: all`. No CSS bypassing tokens.

### I10 — Working discipline

One thing in flight. Small, verified landings. Conventional commits. Gate (tsc app + node) after every landing. Disk authoritative. Python-heredoc over sed for `!`/`?`; full-file writes via a single heredoc, one delimiter, one EOF. Content-matched edits only. Grep-gated deletions. No bulk sweeps. No cosmetic rebases on live work. User rulings are binding and recorded in the registry (§0.6).

### I11 — Substrate respect

React, Vite, TypeScript, Tailwind, radix/shadcn, and framer-motion are substrate. State libraries (e.g. XState) are per-component choices, not platform commitments (R15). Never reimplement substrate behavior — focus traps, portals, a11y primitives — compose and wrap. The suite owns semantics and behavior *above* substrate, nothing below it.

### I12 — Verification

Standing checks, in rising order of authority: tsc (both configs) after every landing; grep where a rule is mechanically checkable; captures where a claim is visual; and the user's walkthrough, which is final. Nothing is done until the user has seen it. A landed unit without user eyes is not landed (F3's standing rule).

---

## §3 — SEMANTIC FOUNDATION (ratified — R12; full reference expands in 02)

### 3.1 What this layer is

The closed vocabulary of meaning from which every tone, priority, state derivation, and copy line draws. This is what makes the system Ayvaa's rather than a generic kit with opinions (E1–E3). Tokens (01), component states (07), and content (03) all type against it. **Components never invent meanings — they consume them.**

### 3.2 The two axes of consequence

Urgency is **time-criticality, not clinical danger** — Ayvaa is homecare; no acute hospital operations exist here (user ruling). Stakes are what ignoring or erring costs. Two orthogonal scales; conflating them is a defect.

**Urgency (the clock):**

| Level | Meaning | Examples |
|---|---|---|
| `none` | no clock applies | sealed visit record, settled payout |
| `scheduled` | known future window | tomorrow's visit, open offer window |
| `soon` | window approaching | dose in 30 min, offer expires in 2 h |
| `now` | action window open | dose due, caregiver arriving |
| `overdue` | window passed, recovery possible | dose missed 15 min ago, renewal due |
| `missed` | window closed — **recovery mandatory** | missed visit, expired offer, lapsed credential |

Thresholds (when `soon` begins, etc.) are per-entity data, never universal constants (I6).

**Stakes (the weight):**

| Level | Meaning | Examples |
|---|---|---|
| `informational` | reading only | report published, ledger entry |
| `routine` | normal action, reversible | editing a draft, selecting a filter |
| `elevated` | attention owed; neglect has consequences | expiring credential, low refill, unconfirmed address |
| `person-safety` | a person's wellbeing is implicated | incident, abnormal vitals flag, missed visit without contact |
| `binding` | legally/financially irreversible | consent acts, payment capture, withdrawal |

The orthogonality in practice: **consent withdrawal** = binding × none → full ceremony, no clock. **Dose due** = now × routine → attention working surface. **Incident** = person-safety × now → risk live escalation.

### 3.3 Tone vocabulary — the closed color meanings

Derived from natural universal understanding + clinical convention (user ruling). Five meanings. No sixth.

| Token | Meaning | Is | Is never |
|---|---|---|---|
| `positive` | safe / complete / confirmed / verified / healthy | the only completion signal | selection, activity, emphasis |
| `attention` | needs human action / time pressure / pending | where the eye lands | danger, failure |
| `risk` | harm / missed / failed / denied / irreversible-danger | genuine loss or danger only | mild emphasis, information |
| `active` | in progress / informational / awaiting another party | the working color | done, wrong |
| `neutral` | structure / inactive / disabled / archived | absence of state | a state statement |

Selection and active controls take the surface's **dominant family hue**, never `positive` (selection is not success).

**Intensity ladder per token** (names binding; values open → 02): `wash` (tinted panel) → `chip` (solid pill) → `fill` (active control) → `shell` (dark immersive surface). Shell is reserved: **binding decisions and person-safety live surfaces**. Mode (light card vs dark shell) is a function of *stakes*, not hue.

### 3.4 Derivation rule — tone from state

Anchors now; full matrix expands in 02:

- Urgency rising, stakes ≤ routine: `neutral → active → attention`, intensifying wash → chip → fill.
- Urgency `overdue`/`missed`: `risk` **with a mandatory recovery path surfaced** — a missed state with no way forward is a defect (I2.8).
- Stakes `binding`, pre-commit: `risk` ceremony (shell, consequences stated); post-commit: `positive` sealed.
- Stakes `person-safety`: `risk` live surface with escalation affordance, regardless of anything else on screen.
- Lifecycle done/verified/sealed: `positive` — always, everywhere.
- **Dominant meaning owns the surface**; secondary meanings demote to chips/links. Precedence: person-safety > binding > elevated > routine > informational; ties broken by urgency. (This makes "one dominant hue per card" a computable rule, not taste.)

### 3.5 Canonical entity lifecycles — the domain grammar (E1)

The system knows Ayvaa's first-class entities semantically; components type against these. Components never invent states.

| Entity | Lifecycle | Non-obvious semantic rules |
|---|---|---|
| Visit / Session | scheduled → en-route → arrived → in-progress → completing → sealed \| missed \| cancelled | sealed is the payment gate; **missed triggers platform-initiated re-dispatch** (the reliability promise) — never user-chased |
| Dose | scheduled → due → taken \| refused \| missed | refusal is a first-class record, never silent absence (MAR convention); missed escalates on the clock |
| Consent | draft → offered → signed/active → (expiring) → renewed \| withdrawn | pending-changes vs sealed-record split: **care runs on the sealed version**; withdrawal is binding ceremony |
| Incident | reported → triaged → investigating → resolved | severity modulates treatment; always links back to visit/plan |
| Booking request | requested → matching → offered → accepted → scheduled \| expired/no-offer | no-offer owes the alternatives/recovery surface — never a dead end |
| Verification / Credential | submitted → in-review → verified \| rejected | expiry is scheduled urgency; renewal window opens before lapse |
| Payment | estimated → authorized → capturing → captured \| failed → refunded | money never ambiguous; failed owes the retry/refund surface |
| Payout | accrued → withdrawn → in-transit → settled | in-transit is a visible state, not a black box |

Extension only by I7 admission.

### 3.6 Content rules — one register (user ruling; expanded with patterns in 03)

One voice everywhere: plain, precise, warm-professional. A professional trusts it; a tired family member reads it at a glance. No register-switching, no jargon modes, no coddling.

1. Every number derives from data (I6) — no spelled-out literals beside computed ones.
2. Time is explicit and absolute where it decides action ("2:00 PM today"), relative only as secondary ("in 20 min"). Countdowns tick; zero flips state with a recovery path.
3. Money is exact, currency-prefixed, tabular; never silently rounded.
4. No blame language about people — incidents describe events, not judgments.
5. Never say "error." Say what happened and the way out ("Payment didn't go through — no money left your account. Try again.").
6. Actions name their effect with real data ("Seal 2 changes"); blocked controls state the reason in themselves ("Pick at least one day to continue"); working/done narrate the transition ("Sealing your consent" → "Consent sealed").
7. Irreversible actions state consequences before the act, concretely, same voice. No legal fog.
8. Precision where precision matters: medication names and doses exact, vitals exact with units; everything else plain words. Professional terms appear only with a plain gloss on first use.
9. Privacy in copy: no raw IDs, last-4 only for instruments and documents, names as the user knows them.
10. Celebration is earned: a `positive` state gets one confirmation line, not decoration.

### 3.7 Provenance & open items

Seeds carried from the old canon as spirit only (R6, I8): hue intent semantics, positive-done-only, copy-is-the-interface, missed-state recovery paths, long-content line rule, one-fact-one-place. **Open values** (decided in the build phase with evidence + approval, R14): full derivation matrix and per-entity thresholds (02), intensity ladder values (02), the `missing` data state (02), copy banks (03). Every sealed item states its provenance.

---

## §4 — THE SUITE

### 4.1 Provenance

User ruling: "multiple documents, extremely clear ones with details separated for literally everything that can possibly be considered." This master owns foundations; each detail document owns one dimension completely.

### 4.2 Index

| Document | Owns completely | Status |
|---|---|---|
| `design-system.md` (master) | Mission, expectations, failure ledger, rulings, invariants, semantic foundation, precedence | this rewrite |
| `01-design-language.md` | Layout, grid, alignment, spacing rhythm, radius, surfaces & elevation, color realization (the values behind §3.3), typography, iconography | written — proposed |
| `02-states-and-semantics.md` | Full derivation matrix, intensity ladder values, the three axes in full, per-entity UI treatment, open items | written — proposed (R16) |
| `03-content.md` | Voice, copy rules expanded with patterns, numbers/time/money/privacy, copy banks | written — proposed (R17) |
| `04-interaction.md` | Triggers, gestures, keyboard, the a11y standard, QoL catalog, gating | written — proposed (R18) |
| `05-motion.md` | Durations, springs per origin, entrance/exit doctrine, choreography, effects | written — proposed (R19) |
| `06-data.md` | Typed contracts, parsing, derivation, wiring the three axes | written — proposed (R20) |
| `07a-components-shells.md` | Catalog 1/6: shells & chrome — frame, screen, bars, splash, sections, panels, SheetShell, PageHero, HeroCells, ToastHost | written — proposed (R21) |
| `07b-components-lists.md` | Catalog 2/6: rows, lists & disclosure — Row, ExpandRow, OptionRow, StepList, rails, EmptyState, StreamList | written — proposed (R22) |
| `07c-components-controls.md` | Catalog 3/6: controls & inputs — Field, OTP, Switch, Checkbox, Tabs, LifecycleButton, DialInput, pickers | written — proposed (R23) |
| `07d-components-displays.md` | Catalog 4/6: data displays — chips, facts, strips, meters, rings, tiles, ChartBars, Skeleton | written — proposed (R24) |
| `07e-components-care-domains.md` | Catalog 5/6: care-delivery compositions — matching, booking, visits, meds, consent, records, billing | written — proposed (R25) |
| `07f-components-platform-domains.md` | Catalog 6/6: platform & shared — offers, sessions, approvals, incidents, auth, admin, system | written — proposed (R26) |
| `08-composition.md` | Screen assembly, page-level rules, forbidden content | written — proposed (R27) |
| `09-construction.md` | The procedure: any imagined component → built accurately from the suite; pattern admission | written — proposed (R28) |

A document that outgrows readability splits during writing — recorded at split time. Recorded split: `07` → `07a`–`07f` (catalog scale); `01` held whole.

### 4.3 Precedence

User > this master > detail documents > old canon (seed only) > legacy code (evidence only). Detail documents refine the master; the master wins on foundations; a detail document may not contradict §3 or §2 — conflicts go to amendment (§6).

### 4.4 Navigation

- To build any component → start at 09; it routes to every other document.
- To resolve a value → its owning document; if marked **open**, it is decided with evidence in the build phase — never invented.
- Ambiguity anywhere → §1 reading rule.

### 4.5 Writing conventions for the suite

Every rule states its strength (MUST/SHOULD). Every value states provenance (sealed, with source / open, with owner). Every pattern states its states. No rule exists without a home document; no home document holds another's content.

---

## §5 — VERIFICATION PHILOSOPHY

Four checks exist, in rising order of authority: **tsc** (both configs) after every landing; **grep** where a rule is mechanically checkable (token discipline, suffix forks, render-path parsing); **captures** where a claim is visual; and the **user's walkthrough**, which is final authority over everything. Nothing is done until the user has seen it.

The superseded v1.0 protocol (V1–V7, harness mechanics, seeded-defect calibration) is retired. Its surviving lessons are already law: a check that has never failed proves nothing (F3), and evidence without eyes is decoration.

---

## §6 — AMENDMENT PROTOCOL

**6.1 Authority.** Master foundations (§0–§3, §5–§6), the ruling registry, and the success condition change **only by user ruling**. The agent proposes; the user disposes. Detail documents evolve with evidence + user approval (R14, I8).

**6.2 Procedure.** Ruling recorded in the registry → the section amended → amendment-log entry. Edited once, deliberately; targeted content-matched edits; full-file rewrites only for wholesale supersedes like this one.

**6.3 Violations.** A violation is a defect — corrected at the source, never ledgered-and-continued. Post-hoc discovery asks how the suite failed to prevent it and hardens the rule.

**6.4 Session continuation.** A fresh session loads: this suite + the repository + current phase state. The suite is self-contained; no reliance on conversation memory.

**6.5 Versioning.** This rewrite stamps 2.0. User-ruling rewrites bump major; amendments bump minor.

---

## AMENDMENT LOG

*(Section references pre-dating 2.0 point at the v1.0 structure, preserved in git history.)*

- **A1–A2**: canon-without-enforcement failure (F8) and the concreteness requirement — from the REDESIGN/ANTI-DESIGN review.
- **A3**: variant-union vs separate-purpose-built-components distinction; config-driven slot cards banned.
- **A4**: tone-**and-composition** map — some states demand structural change, not tint.
- **A5**: return paths — undo/cancel/handback; blocking states lock inputs and state why; no dead ends.
- **A6**: single-source derivation — one fact, one source, zero desync.
- **A7**: known defect-class register (crash classes from the legacy corpus) — absorbed into 06/09 writing material.
- **A8**: screens must live — staged consequences, one-pass fan-out — absorbed into 08.
- **A9**: mining seeded from old canon + legacy variation space — executed; `docs/mined/` + `scripts/mine.mjs`.
- **A10/D7**: presentation derives from state; hand-maintained tone tables banned — now I5.
- **D1**: field validation lifecycle `empty → invalid → valid` — now I2.
- **D2**: async timeout transitions declared — now I2.3/I4.
- **D3**: hold-to-confirm candidate for binding ceremony — open, owned by 04.
- **D4**: persistence-across-reopen — now I2.9.
- **D5**: typed verb vocabulary; cancel ≠ abort — now I4.
- **D6**: `missing` data-state open item — owned by 02; gesture vocabulary completeness → 04.
- **R12**: semantic foundation ratified (urgency ≠ clinical danger; stakes precedence; tones from universal + clinical convention; one register).
- **R13**: docs tracking policy — suite, ledger, spine tracked; superseded-era docs ignored.
- **R14**: a seed is a decision — values need evidence + approval.
- **R15**: documents-only deliverable — no framework code, runtime, harness, or shared infrastructure, ever; R1–R3 superseded; v1.0 §9/§10 retired (build program recoverable from git history for the build conversation, to be re-ratified there).
- **F9 + I0**: deliverable-creep failure added with its standing rule — from the deviation audit.
- **2.0 rewrite**: master restructured as suite index; invariants rewritten as pattern disciplines (I0–I12); expectation map lightened; verification protocol replaced by §5; suite architecture §4 added.
- **2.1**: R13 amended — evidence ledger retired, `docs/verify-log.md` deleted; superseded-era docs and dead tooling purged; canon seed expiry stated in I8 (user ruling during suite writing).
- **2.2**: catalog completion — `07` split to `07a`–`07f` recorded; index statuses synced; ChartBars + Skeleton (07d) and ToastHost (07a) admitted; dangling references closed (05 shimmer → 07d §15, 02 loading → 07d §15, 07f analytics → 07d, 06 notify → 07a §11); tone-arrival rule widened to cover data-layer derivation; part numbering corrected; register debris removed. Pre-ratification completion — no ruling changed.
