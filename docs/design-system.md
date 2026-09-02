# AYVAA DESIGN SYSTEM — BINDING CONTRACT

**Version:** 1.0 — Movement 1 frozen (§0–§2, §9–§11). Movement 2 open: §3 written at v0 (provisional), §4–§8 skeletons. P0 in progress — M0.2 + M0.3 PASS (16/16 self-proof; three tsc gates); M0.1 exemplar-domain mining + M0.4 atoms seed in flight.
**Authority:** User intent is supreme. Where this document conflicts with any prior artifact (README, framework-plan v2, migration ledgers, REDESIGN.md, ANTI-DESIGN.md, progress logs), **this document wins**. Amendment only via §11.
**Audience:** A fresh session with no prior context. This document plus the repository are the complete world.
**Location:** `docs/design-system.md` (git-tracked per R13). Companion: `docs/verify-log.md` (git-tracked per R13).
**Session resume:** load this document + `docs/verify-log.md` + current phase state (§11.6).

---

## §0 — MISSION, GUARANTEES, RULINGS

### 0.1 Context

Ayvaa is a healthcare ecosystem: an in-house on-demand homecare booking platform (patients/guardians, healthcare professionals, partners, administrators, plus system operations), currently realized as a React/Vite/TypeScript prototype — 79 built screens (Patient 34, Professional 12, Partner 7, Admin 18, System 8), ~40 mock data modules, ~410 component files across role folders, a phone primitive kit, a shadcn/radix UI layer, an animation library. Product trajectory: ~20 applications, each with large screen collections, plus web portals for everything — roughly 10× the current corpus.

The current corpus was produced screen-first: components were *extracted as byproducts of screens*, then manually upgraded, then partially "refactored." That trajectory projects to 5000+ components at full scale and has already produced a half-baked refactor. This contract replaces that trajectory: a rebuild from ideology, not a cleanup.

The demo repo is the **specification** for the real project (R11): screen IDs and workflow mapping are the cross-reference spine between demo, docs, and future native builds.

### 0.2 Mission

Build the **Ayvaa Component Framework**: a bounded, closed-catalog, behaviorally-complete component system specialized for healthcare delivery surfaces.

- It is **not** a base UI kit and does not replace shadcn/Material — those are substrate (I11).
- It is **not** a refactor of the old corpus. The old corpus is a *requirements quarry only* (R6).
- It exists to do three jobs, from which all ten expectations derive:
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

**Component count is bounded; screens are unbounded but cheap.** Framework components grow only when a genuinely new pattern is admitted (I7). Screens are assemblies: typed imports + typed data + layout order — nothing else. A screen that "needs" a bespoke component is a framework gap, and the fix belongs in the framework. This invariant is the anti-5000 mechanism; every other section serves it.

### 0.5 Compliance Matrix

Every expectation maps to named mechanisms and named checks. Check IDs are specified fully in §9: **V1** static/structural audit, **V2** interaction matrix, **V3** fan-out & lifecycle test, **V4** state-capture set, **V5** concurrent choreography test, **V6** QoL matrix, **V7** user walkthrough.

| # | Expectation | Enforced by | Verified by |
|---|---|---|---|
| E1 | Healthcare-curated | §3 semantics layer + §8 catalog | V1 catalog audit, V7 |
| E2 | Apparent purpose/priority/urgency/state | §3 visual encoding + §4 tokens + I6 axes | V4, V7 |
| E3 | Ultra-clear data, no misreads | I6 data discipline + §3 content rules | V1 render-path lint, V4, V7 |
| E4 | Layered shared state | I1 layers + I3 actors + §5 machines | V3 |
| E5 | Reactive to user and data | I2 anatomy + §5 (machines react to data events, not just input) | V2 |
| E6 | Organic interactivity by default | §6 QoL built once at L2, inherited by composition | V6 |
| E7 | Expressive whole-surface response | §3 tone maps + I2 anatomy | V4 |
| E8 | Mutual communication | I3 actors + typed event catalog | V3, V1 event audit |
| E9 | Ultra smooth, no jank | §6 motion doctrine + I5 canonical wiring | V5 |
| E10 | QoL: triggers, gestures, shortcuts | §6 QoL catalog at L2 | V6 |

### 0.6 Ruling Registry

Decisions made and binding. Reopen only via §11.

| R# | Ruling |
|---|---|
| R1 | One communication substrate: an XState v5 actor web provided by the framework runtime; it absorbs the legacy event bus. No second bus. |
| R2 | Machine threshold: "if it owns time, async, gating, or flow, it has a machine; pure kinetic response stays motion props." |
| R3 | One canonical wiring hook: machine→motion **and machine→tone** derivation through a single framework hook; no component hand-wires its own. Hand-maintained tone tables are banned (they desync from state — F2-class defect). |
| R4 | Cutover is strangler-fig: vertical slice certifies the interlock, then domain-by-domain lands components **with** their rebuilt screens. |
| R5 | Deletion is progressive and grep-gated; the repo stays green throughout; final cull is the last act. |
| R6 | The old corpus is mined for requirements only; byte-fidelity to it is dead. |
| R7 | Certification scope = the 79 existing screens. The 84 planned-but-unbuilt screens are deferred until after cutover, then built on the finished framework. |
| R8 | Calibration exemplars: Completion Sheet (drag, timers, choreography, gating), Live Visit surface (streaming data, ticking, fan-out), Consent-Gated Record surface (data states, gated access, audit). DialInput carries over as the seed — the tactile bar all L2 must match. |
| R9 | New code lives under `src/framework/`; legacy `src/components/` remains runnable until culled. |
| R10 | Two-movement document: Movement 1 (structural: §0–§2, §9–§11) frozen before building; Movement 2 (§3–§8 specifics) seals through exemplar proof. |
| R11 | Demo-first, native-ready. The demo repo is the specification for the real project: every rebuilt screen keeps its screen ID and workflow mapping; workflow/screen/coverage docs remain the cross-reference spine. Platform-neutral core by construction: machines, event catalog, semantics layer, data contracts, and semantic tone tokens contain no platform imports (no react, react-dom, framer-motion, tailwind) — enforced as a V1 import gate. The web execution surface (DOM, motion execution, class resolution, ARIA, gestures) is confined to atoms/universals/the wiring hook. No speculative abstraction layer is built now; if a second platform becomes real, semantics + machines + contracts port unchanged and only the execution surface is rewritten. |
| R12 | §3 v0 ratified as drafted by user assent: stakes precedence person-safety > binding > elevated > routine > informational; content rule 10 stands as written. P0 authorized. |
| R13 | Documentation tracking policy: `docs/design-system.md`, `docs/verify-log.md`, and the product spine (`docs/workflows.md`, `docs/screens.md`, `docs/coverage.md`) are git-tracked and committed. All superseded-era docs (refactor era, framework v1/v2, old canon copies) remain local and gitignored — mining seed only. Default for new docs: tracked unless ruled otherwise. |

### 0.7 Success Condition

The program is done when all of the following hold, with evidence:

- (a) Every catalog component passes all applicable checks V1–V7.
- (b) All 79 screens rebuilt on the new framework pass user walkthrough.
- (c) Screens contain only catalog imports + typed data — grep proves zero out-of-catalog JSX.
- (d) Legacy components are deleted; tree audit matches §8 exactly.
- (e) A new screen can be assembled without adding a single framework file.

### 0.8 What "100%" Means

The guarantee binds **catalog components and screens assembled from catalog components** — and because §7 forbids JSX outside the catalog, that inheritance is closed. "100% satisfaction of the ten expectations" therefore means: every shipped unit passed the full applicable check set, and the compliance matrix has at least one mechanism and one check per expectation. It does not mean the checks are infallible; **V7 walkthrough is the final authority over every claim in this document.**

---

## §1 — FAILURE LEDGER

Eight failure modes produced the current mess. Each is a law's parent: the standing rule is binding because the failure already happened once.

| # | Failure | What happened | Root cause | Standing rule |
|---|---|---|---|---|
| F1 | **Screen-byproduct explosion** | Components extracted from screens; 400+ components for 79 screens; projected 5000+ at ~10× scale | Components inherit screen specificity; count scales as screens × states | **I7** — design against a closed catalog; never extract |
| F2 | **Wrapper fraud** | "Hardening" commits were 5–15-line emit wrappers (batch commit `4d8dbb3`); 45 "DomainSets" were concatenation bundles with suffix forks (`Phase_*`, `VAULT_KIND_UI`, `BillingHeroProps_Patient`) | Shape performed, substance skipped; verification inspected neither | **I2** — anatomy gate; **I12** — behavioral proof |
| F3 | **Verification theater** | tsc-only gates claimed completion; the contract's own 8-check protocol never executed; no walkthrough ever run | A gate that cannot fail is not a gate; motion and behavior were never tested | **I12** — nothing verified until the user sees it |
| F4 | **Rename-dedup** | "Deduplication" by renaming duplicates instead of merging variants | Merging treated as file shuffling, not API design | **I7** — variant-merge into single exports; suffix forks prohibited |
| F5 | **Bulk churn & cosmetic rebases** | Bulk sweeps across many domains; bulk-add then bulk-revert; a 50-commit message-reword rebase lost a file (`fb3bb82`) | Optics optimized over landings | **I10** — one domain in flight, small verified landings, no cosmetic rebases on live work |
| F6 | **Fidelity to a flawed baseline** | A prior contract demanded byte-fidelity to originals — preserving the disease while treating symptoms | Refactor frame instead of rebuild frame | **R6** — mine requirements, never implementation |
| F7 | **Abstract canon** | 585-line design documents written without building; components drifted from them immediately | Untested decisions rot on contact | **I8** — canon seals only after exemplar proof |
| F8 | **Canon without enforcement mechanism** | Empirically-derived rules that were real (type scale, radius ladder, long-content line, one-fact-one-place) still decayed across document eras — contradictions accumulated between revision passes because enforcement was prose and memory | Rules without named checks rot | **I13** — every rule names its check at sealing time, or it is demoted to guidance |

Reading rule for a fresh session: when any choice is ambiguous, resolve it in the direction that makes F1–F8 structurally impossible to repeat.

---

## §2 — INVARIANTS

### I1 — Layer model & tree discipline

| Layer | Dir | Owns | May consume | Never |
|---|---|---|---|---|
| **L0 atoms** | `framework/atoms/` | Tokens (color/type/space/motion), atomic visuals | Nothing | Logic, timers, machines, domain |
| **L1 universals** | `framework/universals/` | Pattern shells: structure + slots | L0 | Machines, timers, domain knowledge |
| **L2 machines** | `framework/machines/` | Full behavior: actor machine, timers, gestures, a11y, tone-map, QoL, publish/subscribe | L0, L1, substrate, runtime | Domain data shapes (typed contracts only) |
| **L3 domains** | `framework/domains/<domain>/` | Healthcare compositions: data wiring, domain actors, flows | L0–L2, data layer | Re-implementing L2 behavior; out-of-catalog markup |
| **Screens** | `apps/` | Route, layout order, data supply | L3 sets (L2 directly where justified), data layer | Component JSX definitions, raw machine wiring, hand-tuned motion |

File laws: one universal/machine per file, PascalCase; domain folders kebab-case with a single `<Domain>Set.tsx` barrel per domain; export intent suffixes from the closed list in §8; no circular imports between layers; screens import from Set barrels only. New tree lives in `src/framework/` (R9); exact tree is a §10 deliverable.

### I2 — L2 anatomy (the machine gate)

An L2 component ships **all** of the following or it is not L2 — regardless of file location, name, or commit message:

1. Typed Props using kit tokens; no magic literals.
2. An owned XState v5 machine with typed events and states.
3. Self-cleaning timers and subscriptions (unmount-safe, leak-free).
4. Canonical motion wiring via the I5 hook; per-origin springs; `AnimatePresence` for mount/unmount.
5. Whole-surface tone-**and-composition** map: every machine state drives shell, tiles, chips, buttons **and structural branches** (some states demand different compositions — a pending state may be a status strip where idle is a button — from one source). A tint-only flip across states that need composition change is a defect.
6. Every applicable §6 QoL behavior for its pattern.
7. A11y: role, aria, focus-visible, full keyboard equivalent.
8. Publish/subscribe per the typed event catalog (§5).
9. **Return paths:** every machine models its way back or forward — undo, cancel, handback ("keep editing" after done); blocking states lock the inputs they protect and state why; no dead-end states.

### I3 — Actor unification

One communication substrate: the XState v5 actor web, provided by framework runtime context (dev-mode warns when missing). Actors publish; actors and components subscribe via typed hooks. The legacy event bus is absorbed — no parallel emitters, no dot-case string events without owners. Every event has a typed payload, an owning machine, and a catalog entry. **Fan-out: a single emit updates every subscriber within one rendered frame.**

### I4 — Machine threshold

If a component owns time (durations, timers, retries, sequences, timeouts), async, gating, or multi-step flow → it is L2 with a machine. Pure kinetic response (hover/focus/press tints) → motion props at L0/L1, no machine. This fences ceremony at the bottom and fraud at the top. Classification is recorded per component in the §8 catalog and audited.

### I5 — Machine decides, motion and tone execute

Machine state maps to declared motion variants **and to derived semantic-tone selections** through the framework's single wiring hook. No component hand-wires `useMachine` to framer-motion, and no component maintains a hand-written tone table that can desync from the state it mirrors — tone maps are derived selectors over machine state resolving to §4 semantic tokens. No CSS transitions for state-driven motion. Springs come from kit tokens, per-origin, never unified.

### I6 — Data discipline & the three state axes

Components receive clean typed fields; parsing and derivation happen at the data layer; zero parsing at render; zero magic literals. The three state axes are declared **separately** and rendered **distinctly**:

- **Interaction** — rest / hover / focus / active / disabled.
- **Lifecycle** — the machine's state (e.g., idle → working → done → failed). Field-level validation is its own field-machine lifecycle: `empty → invalid → valid` (invalid renders its hint; valid is the only success signal).
- **Data** — empty / loading / partial / stale / conflict. A `missing` data state (expected-yet-absent, carrying consequence) is an open exemplar-3 item (§3.7).

Conflating axes or staying silent about data state is a defect.

**Single-source derivation:** data-layer helpers are functions of current state; every surface derives from the same call. Two surfaces showing "the same" fact must derive from one source — a count in prose derives from the same data as its chip; desync between them is a defect class.

### I7 — Catalog closure, variants, and admission

The §8 catalog is the complete set of components that exist. Nothing ships outside it.

- **Parametric variation within one composition → variant Props union** (single export).
- **Different compositions → separate purpose-built components sharing primitives.** Never one config-driven mega-component: `ReactNode`/boolean-flag slot cards are banned. Slots (`leading/trailing/expansion/chip/title/subtitle/meta`) belong to L1 structural universals only.
- Suffix forks (`*_Patient`) are prohibited — F4.

A new pattern is admitted only via: ≥2 real consumer screens (or 1 + documented reuse trajectory), a semantic contract fitting §3, full anatomy per layer, user approval, and full verification. Otherwise: compose the existing catalog. The catalog is audited before any new file is created (a standing step of the P2 cycle).

### I8 — Canon authority & sealing

REDESIGN.md and ANTI-DESIGN.md carry forward as **provisional** canon — their empirically-derived rules are seed evidence of the intended design spirit, not binding spec, and their internal era-contradictions (F8) prove why I13 exists. A canon section becomes sealed law only after surviving exemplar calibration (§10). Sealed sections change only by user ruling with proven cause. Provisional sections guide but may be overridden by exemplar evidence — recorded, then promoted or discarded. No abstract-only canon.

### I9 — Determinism & code hygiene

Identical props + identical data → identical rendered output. No render-time randomness or wall-clock reads — machines own clocks. No code comments. No `transition: all`. No CSS bypassing tokens.

### I10 — Working discipline

One domain in flight. Small, verified landings. Conventional commits. Gate (tsc app + node) after every landing. Disk authoritative. Python-heredoc over sed for `!`/`?`; full-file writes via a single heredoc, one delimiter, one EOF. Content-matched edits only. Grep-gated deletions. No bulk sweeps. No cosmetic rebases on live work. Documentation per R13: contract, evidence ledger, and product spine are git-tracked; superseded-era docs remain ignored on disk as mining seed. User rulings are binding and recorded in the registry (§0.6).

### I11 — Substrate respect

React/Vite/TS, radix/shadcn, framer-motion, and XState are substrate. Never reimplement substrate behavior (focus traps, portals, a11y primitives) — compose and wrap. The framework owns semantics and behavior *above* substrate, nothing below it.

### I12 — Verification is binding

tsc is necessary, never sufficient. The §9 protocol executes per unit before a unit is "done." Nothing is verified until the user has seen it — captures where tooling exists, walkthrough always. A landed unit without evidence is not landed.

### I13 — Every rule names its check

At sealing time, every rule in §3–§8 maps to at least one V1–V7 row — grep, lint, capture, matrix, or walkthrough — or is demoted to guidance. This extends the §0.5 compliance matrix down to every individual rule. F8 is structurally impossible under this invariant.

---

## §3 — SEMANTICS LAYER (v0 — provisional; seals via exemplars per I8/§11.2)

### 3.1 What this layer is

The closed vocabulary of meaning from which every tone, priority, state derivation, and copy line draws. This is what makes the framework Ayvaa's rather than a generic kit with opinions (E1–E3). Tokens (§4), machine states (§5), and content all type against it. **Components never invent meanings — they consume them.**

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

**Intensity ladder per token** (names now; values sealed in §4): `wash` (tinted panel) → `chip` (solid pill) → `fill` (active control) → `shell` (dark immersive surface). Shell is reserved: **binding decisions and person-safety live surfaces**. Mode (light card vs dark shell) is a function of *stakes*, not hue.

### 3.4 Derivation rule — tone from state

Anchors now; full matrix sealed by exemplars:

- Urgency rising, stakes ≤ routine: `neutral → active → attention`, intensifying wash → chip → fill.
- Urgency `overdue`/`missed`: `risk` **with a mandatory recovery path surfaced** — a missed state with no way forward is a defect (I2.9).
- Stakes `binding`, pre-commit: `risk` ceremony (shell, consequences stated); post-commit: `positive` sealed.
- Stakes `person-safety`: `risk` live surface with escalation affordance, regardless of anything else on screen.
- Lifecycle done/verified/sealed: `positive` — always, everywhere.
- **Dominant meaning owns the surface**; secondary meanings demote to chips/links. Precedence: person-safety > binding > elevated > routine > informational; ties broken by urgency. (This makes "one dominant hue per card" a computable rule, not taste.)

### 3.5 Canonical entity lifecycles — the domain grammar (E1)

The framework knows Ayvaa's first-class entities semantically; L2/L3 machines type against these. Components never invent states.

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

Extension only by I7 admission as domains cut.

### 3.6 Content rules — one register (user ruling)

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
10. Celebration is earned: a `positive` state gets one confirmation line, not decoration. *(open item — user may want more delight in done-states)*

### 3.7 Provenance, open items, sealing

Seeds carried from the old canon (as seed, not fidelity): hue intent semantics, positive-done-only, copy-is-the-interface, missed-state recovery paths, long-content line rule, one-fact-one-place. Still provisional: full derivation matrix (3.4), intensity values, per-entity thresholds, `missing` data state, copy banks. Every sealed item names its check (I13).

---

## §4 — TOKENS (Movement 2 — seals via exemplar 1)

Binding direction now (R11 + I5): machine state → derived selector → **semantic tokens** (§3.3 vocabulary + intensity ladder) → resolved by **exactly one web resolver file** into concrete classes. Components never hold raw literals (I9).

Open items for exemplar 1 to seal:
- Resolver final shape (typed class-map generator vs config tokens vs CSS custom properties).
- Intensity ladder values per token (wash/chip/fill/shell).
- Type scale confirmation (roles, sizes, tabular-nums rule; the single hero-amount exception).
- Radius ladder confirmation, judged relative to container size.
- Spring constants per origin; entrance/exit variants; stagger values.
- Spacing rhythm.
- **Deferred per R11:** responsive/resize behavior — decided with the second platform; catalog must not encode viewport assumptions until then.

---

## §5 — MACHINE CATALOG (skeleton + binding conventions)

Conventions binding now:
- Every machine declares states typed against §3 (entity lifecycles + three axes).
- **Every async machine declares its timeout transition** with copy that states what happened and the way out (D2).
- Event vocabulary is a closed typed set per domain. Verb distinctions: `cancel` (before effect) ≠ `abort` (kill in-flight); `retry`, `resolve`, `reject`, `clone` are typed domain verbs (D5).
- Field/form machines model `empty → invalid → valid`; the hint exists only in invalid (D1).
- State persists with its owning machine at the correct scope: reopening a tab, sheet, or screen never resets persisted state (D4).
- Every machine models return paths (I2.9).

Seed catalog candidates (admitted via I7, converted from the old registry's proven patterns — never copied): completion/lifecycle choreography machine; offer dispatch lifecycle; dispatch re-check; consent seal/pending/withdraw; dose schedule & refusal; payment capture/retry/refund; upload + verify (file, object-URL lifecycle); filter/search (debounced, cause-diagnosing empty states); tab paging (swipe pre-staged); disclosure (exclusive accordions); live streaming (unique-id minting, atomic prepend); odometer/count-up; countdown (zero flips state); hold-to-confirm (D3, provisional).

---

## §6 — MOTION DOCTRINE & QoL CATALOG (skeleton + binding doctrine)

Binding doctrine now: I5 (single hook, per-origin springs, no unified springs); `AnimatePresence` for mount/unmount; no CSS transitions for state-driven motion; no hover-translate as data affordance; tap feedback on all interactive rows (0.985 seed); streamed entries stagger; fills/segments animate with origin-left.

QoL seed set (each becomes a §6 catalog row with its own check at sealing): drag-to-dismiss sheets (+ drag-to-confirm where suited); swipe-paged tabs with pre-staged content; odometer/rolling values for every numeric change; edge fades, rubber-clamping, grab cursors; full keyboard equivalents; gating that states its reason (`cursor-not-allowed`, muted fill, `aria-disabled`); completion choreography (working → full-surface flip → done → auto-dismiss → dim unblurs, self-cleaning timers); **hold-to-confirm** for binding-stakes ceremony (D3 — provisional until an exemplar proves it).

Gesture vocabulary for V2 routing (complete, so no pointer row is silent): tap/click, swipe, drag, hold, pinch (candidate), scroll, keyboard.

---

## §7 — COMPOSITION CONTRACTS (skeleton — what a screen may never contain)

A screen contains only: catalog imports, typed data supply, layout order. Never: component JSX definitions, raw machine wiring, hand-tuned motion props, out-of-catalog markup, parsing or derivation at render, magic literals, module-scope references to component props, duplicate keys in streamed lists.

Page-level rules (seeded, sealing per I13): one fact, one place (Section markers own counts; cards never restate them); dominant meaning owns the surface (§3.4); the long-content rule — anything that might run long owns its line; state persists across reopen (D4); **screens must live** — every screen demonstrates its lifecycle as staged consequences of user actions (never independent loops), with all dependent surfaces updating in one pass (A8; verified at domain gate).

---

## §8 — COMPONENT CATALOG (living inventory skeleton)

Entry format (per component): ID · layer · name · file · threshold classification (I4) · variant unions · states (§3-typed) · QoL rows applicable · checks passed. The catalog is the complete set of components that exist; tree audit compares against it exactly (I7).

Seed inventory (provisional, converted never copied):
- **L0 atoms:** tokens + Tile, Chip, TimeChip, Panel, Hero, Expand, Meter, Ring, Section, StatCell, TapCell, LiveDot, Stat, StatStrip, rise/stagger, INTENT/tone maps, EASE.
- **L1 universals:** PhoneFrame, Screen, AppBar, NavBar, Splash, Pager, PushPreview, ScreenshotButton, SheetShell (three-zone), PhaseHero/AccentHero family, Row, ExpandRow, OptionRow, StepList, MiniTimeline, Field, Switch, Radio, SegmentedTabs, FactRows, FactTile, QuotePanel, StatusStrip, StatusPill, NoteStrip, EmptyState, DarkPanel, Overline, CredentialCard.
- **L2 machines:** DialInput (seed exemplar — tactile bar), FrameworkRuntime→actor-web plumbing; all others admitted via exemplars/I7.
- **L3 domains (candidates, cross-role merges, no suffix forks):** auth, onboarding, home, booking, catalogue, matching, visits, sessions, care-plan, meds, prescriptions, records, consent, billing, earnings, offers, incidents, profile, identity, notifications, escalations, review, recovery, reports, transactions, partner-patient, ui, sheets, accounts, recheck, retry, approvals, retention, availability, history, payouts, verification, performance, referral, staff, analytics, drills, execution, audit.

---

## §9 — VERIFICATION PROTOCOL

### 9.1 Principles

- **tsc is necessary, never sufficient** (I12). The check set below defines "done" for every unit.
- **Every check produces a binary verdict + an evidence artifact.** A landed unit without evidence is not landed.
- **Every check must be demonstrated to fail once on a seeded defect before it is trusted.** During P0, a disposable calibration unit is deliberately broken (a leaked timer, a silent state, a missing subscriber) and each check must catch its assigned defect. A check that cannot fail is theater — F3 is structural law.
- **The automation boundary is explicit per check.** Physical interaction (drag, swipe, momentum, hold) is not automatable in jsdom; those rows route to V4/V7 with the destination named — never silently dropped.
- **Any check regressing after green reopens the unit, and the full applicable set re-runs** — concurrent behaviors interact.

### 9.2 The check set

**V1 — Static & structural audit** *(mechanical)*
- `npx tsc --noEmit -p tsconfig.app.json && npx tsc --noEmit -p tsconfig.node.json` — exit codes read directly.
- Screens are assemblies: zero legacy `@/components/` imports in cut screens; zero inline motion props (`whileTap`, `drag`, `variants`, raw framer-motion imports) in screen files.
- Token discipline: zero hex outside token files; zero `transition: all`; zero `//` comments in framework code (I9).
- No suffix forks: zero `*_Patient`-style Props exports (I7/F4).
- Event closure: every emitted event literal exists in the typed catalog (§5).
- Layer discipline per I1; nothing in `framework/` imports legacy components.
- Platform-neutral core: machines/event-catalog/semantics/contracts import no react, react-dom, framer-motion, tailwind (R11 import gate).
- Tree audit: file inventory equals the §8 catalog exactly.
- Magic literals: zero parsing at render; data arrives as typed fields (I6).
- **Known defect-class register** (each mechanized where possible — lint/grep — else routed explicitly to V4/V7): lowercase-component props (`<icon />` crash class); side effects fired in state updaters or render; module-scope references to component props; missing named imports from data modules at consumer-write time; duplicate keys in layout-animated streamed lists (infinite-render crash); sheets collapsed by their own positioning wrapper; kit components on the wrong-surface contrast class; unrevoked object URLs.

Pass: every gate zero/exact. Evidence: command transcript in the ledger.

**V2 — Interaction matrix** *(automated where honest)*
Every input → state → visible animation → event, per component. The machine's transition table generates the matrix skeleton; rows classified:
- **Automatable rows** (click, keyboard, data change, timer advance): executed in the verify harness (`src/framework/verify/`, vitest + testing-library); assert transition fired, motion variant changed, event published with typed payload.
- **Pointer rows** (drag, swipe, hold, momentum, rubber-band, pinch-candidate): marked `pointer`, routed to V4 capture + V7 walkthrough with the destination named. A pointer row with no destination is a defect.

Pass: 100% of rows executed or explicitly routed; zero silent rows. Evidence: per-component matrix file.

**V3 — Fan-out & lifecycle test** *(automated)*
Single emit updates every subscriber within one rendered frame; nothing leaks. Harness mounts the unit's real subscriber web (as composed in its actual screen), emits once, asserts all subscribers re-rendered with new state; unmount, then assert zero live timers and zero live subscriptions.

Pass: full fan-out, zero leaks.

Applies: every unit owning an actor (all L2/L3); screens via at least one cross-component flow. Evidence: green test file.

**V4 — State-capture set** *(eye-gated, capture-backed)*
For each unit: captures at every lifecycle state, every data state (empty / loading / partial / stale / conflict), and gating states — default props, real composition, stored in `docs/verify/<unit>/`. The user's eyes are the sensor; captures are the evidence. Required distinctness: adjacent lifecycle states differ in **whole-surface** tone, not chip tint (E7); each data state renders — silence about data state is a defect (I6); gated states state their reason.

Pass: user confirms the set complete and distinct.

Applies: all layers (reduced set for L0: token states only). Evidence: capture directory + ledger sign-off.

**V5 — Concurrent choreography test** *(eye-gated, recording-backed)*
Concurrent transitions choreograph as one seamless flow (E9): capture of the unit's canonical concurrent moment (sheet dismiss while sibling card updates; list reorder while counter morphs). Criteria: single orchestrated variant chain, no jank, no competing transitions.

Applies: every motion-bearing unit; each screen's canonical moment at domain gate. Evidence: recording + sign-off.

**V6 — QoL matrix** *(mixed)*
Every applicable §6 QoL behavior, per unit — matrix generated from the §6 catalog. Each row: verdict with method; inapplicable rows carry a reason. Applies: all L2/L3. Evidence: matrix file.

**V7 — User walkthrough** *(human, final authority)*
The user drives. Walks: each exemplar before its canon seals (P1); each domain's screens at domain gate (P2); all 79 screens at final certification (P3). Breaks recorded → fixed → re-walked → break count to zero. V7 also audits what no check can see: legibility of purpose, priority, urgency, trust — the E1–E3 substance.

Pass: user sign-off, zero open breaks. Evidence: walkthrough log entries.

### 9.3 Applicability matrix

| Unit type | V1 | V2 | V3 | V4 | V5 | V6 | V7 |
|---|---|---|---|---|---|---|---|
| L0 atom | ✓ | — | — | reduced | — | — | via composition |
| L1 universal | ✓ | pointer rows routed | — | ✓ | if motion-bearing | — | via composition |
| L2 machine | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | at exemplar / composition |
| L3 domain set | ✓ | domain rows | ✓ (flows) | ✓ | ✓ | inherited audit | at domain gate |
| Screen | assembly audit | via its units | via its units | via its units | canonical moment | via its units | ✓ gate |

**Unit gate** = all applicable checks green. **Domain gate** = all unit gates in the domain + domain-level V3/V5 + V7 walkthrough, zero breaks + screens-must-live demonstration (§7).

### 9.4 Evidence ledger

`docs/verify-log.md` — mutable, git-tracked (R13). One entry per gate: date, unit, check IDs with verdicts, evidence paths, open breaks, resolution. A unit is "landed" only when its entry is complete. The user may demand replay of any evidence at any time; failure to replay reopens the unit.

---

## §10 — BUILD & CUTOVER PLAN

### 10.1 Phase overview

| Phase | Job | Exit criterion |
|---|---|---|
| **P0 Foundations** | Harness (self-proven), runtime/actors, atoms seed, semantics v0, just-in-time mining setup | Harness catches all seeded defects (§9.1); tsc 0 |
| **P1 Interlock & exemplars** | Three exemplar machines + wiring hook + carrier screens rebuilt | Vertical slice certified; Movement 2 sealed |
| **P2 Domain cutover** | Domain groups in sequence, per-domain cycle | All 79 screens rebuilt, walked, ledgered |
| **P3 Cull & certification** | Delete legacy; tree audit; full certification | §0.7 (a)–(e) all hold with evidence |
| **P4 Beyond** | 84 deferred screens + new apps on the framework | Out of program scope (R7) |

### 10.2 P0 — Foundations

- **M0.1 Mining setup:** mining is **just-in-time per domain** (bounded, one domain's worth), seeded from the old canon sections + the domain's legacy components/data as variation-space evidence (A9) — never from zero, never implementation. Output: `docs/mined/<domain>.md`. The three exemplar domains mine up front.
- **M0.2 Harness:** `src/framework/verify/` — test runner wired, capture tooling adapted, matrix/capture conventions fixed. **The harness proves itself on the disposable calibration unit: every check must catch its seeded defect.**
- **M0.3 Runtime:** runtime provider and typed hooks over the XState v5 actor web (I3) — provider, `useActor`-family hooks, dev-mode warnings, subscription self-cleaning.
- **M0.4 Atoms seed:** tokens + atomic visuals ported as seed (not fidelity — R6), subject to exemplar sealing.
- **M0.5 Semantics v0:** §3 — written and ratified (R12).

### 10.3 P1 — Interlock & exemplars

Exemplar order and carriers (user may reassign):

1. **Completion Sheet** → carrier **P17 Visit Summary**. Calibrates: machine→motion/tone wiring hook (I5), timers, choreography, gating, auto-dismiss, drag-dismiss; seals §4 + §6.
2. **Live Visit surface** → carrier **P16 Live Tracking**. Calibrates: streaming data, ticking state, fan-out across components, partial/stale data states; seals §5 core.
3. **Consent-Gated Record** → carrier **P21 Records**. Calibrates: data states (incl. the `missing` open item), gated access with stated reason, audit event publication, privacy masking; seals §3 remainder + §7.

Each exemplar's cycle: build L2 → full unit gate (V1–V6) → rebuild carrier screen as assembly → V7 walkthrough → **seal the Movement 2 sections this exemplar decided** → ledger entry.

**Vertical slice = exemplar 1's carrier screen walked green.** Exemplar 2 does not start before. Movement 2 fully seals at end of P1. DialInput DNA is the tactile bar every L2 must match (R8).

### 10.4 P2 — Domain cutover

Ordering rule: (a) domains fed by exemplar-proven patterns first; (b) cross-role shared domains before role-specific forks; (c) user reorders freely — the rule binds, the ladder proposes:

1. visits + sessions → 2. booking + matching + catalogue → 3. care-plan + meds + prescriptions + reports → 4. records + consent + identity + verification → 5. home + notifications + review + recovery + profile → 6. billing + payouts + earnings → 7. professional ops (offers, availability, history, incidents, sheets) → 8. partner (referral, staff, performance, partner-patient, partner billing) → 9. admin oversight (approvals, accounts, analytics, escalations) → 10. admin compliance (audit, consent tracking, retention) → 11. system (transactions, recheck, retry, drills, execution, audit) → 12. residuals (ui set, cross-domain sheets, stragglers)

Per-domain cycle (one domain in flight, I10):
1. **Mine** the domain's requirements (just-in-time, requirements-only, canon-seeded).
2. **Catalog delta:** audit the catalog first; compose existing, or admit new via I7 (never extract).
3. **Build:** L3 sets on L0–L2; new L2 machines land in the framework, never in the domain.
4. **Rebuild screens** as assemblies, in place, same screen IDs (regression anchors); port the domain's `data/` module to clean typed fields (I6).
5. **Verify:** unit gates + domain gate (V3 flows, V5 canonical, V7 walkthrough).
6. **Grep-gate:** zero legacy imports in the domain's screens; legacy domain components flagged dead.
7. **Ledger + commit.** Repo green at every commit.

Standing rule: screens remain runnable on legacy until their domain cuts; the product is never broken mid-flight (R5). Legacy is dead code walking — defects in it are mined as requirements and fixed forward in the framework; legacy itself is never patched.

### 10.5 P3 — Cull & certification

Preconditions: every domain group cut; ledger shows all 79 screens rebuilt + walked.

1. Final grep audit: zero legacy imports anywhere.
2. **Delete legacy** — role folders, old domain sets, superseded phone kit — everything except substrate (`ui/`, animation library) per I11. Deletion is the last act, never before (R5).
3. Tree audit: inventory equals §8 + substrate exactly.
4. **Full certification walkthrough:** all 79 screens, user-driven, breaks to zero.
5. §0.7 success condition checked item by item, evidence attached.

### 10.6 P4 — Beyond

The 84 deferred screens and future apps are built on the finished framework — pure assembly, the §0.4 economics realized. New patterns enter only via I7. Out of this program's scope; governed by §11.

---

## §11 — AMENDMENT PROTOCOL

**11.1 Authority.** Movement 1 sections (§0–§2, §9–§11), sealed Movement 2 sections, the ruling registry, and the success condition change **only by user ruling**. The agent proposes; the user disposes.

**11.2 Provisional Movement 2.** Unsealed §3–§8 content evolves during P1 with exemplar evidence: proposed change → evidence from the exemplar that forced it → user approval → sealed. No sealing without proof; no change without evidence (anti-F7).

**11.3 Sealed change procedure.** Ruling recorded in §0.6 registry + amendment noted in the section + ledger entry. The contract is edited once, deliberately — never drifted silently. From the moment of first write, all edits are applied directly to this file via targeted content-matched edits (I10).

**11.4 Precedence.** User > this document > all prior artifacts > progress logs. Ambiguity resolves toward making F1–F8 structurally impossible (§1 reading rule).

**11.5 Violations.** A violation is a defect — reverted and rebuilt per the rule, never ledgered-and-continued. A violation discovered post-hoc reopens the unit **and triggers a check-soundness review**: how did verification miss it, and which check must be hardened or added.

**11.6 Session continuation.** A fresh session loads: this document + `docs/verify-log.md` + current phase state. The contract is self-contained; no reliance on conversation memory. The document is the world.

**11.7 Versioning.** Movement 1 freeze stamps v1.0; amendments bump minor; ruling-driven rewrites bump major.

---

## AMENDMENT LOG

- **A1–A2** (F8 + I13): canon-without-enforcement failure and the every-rule-names-its-check invariant — from the REDESIGN/ANTI-DESIGN review.
- **A3** (I7): variant-union vs separate-purpose-built-components distinction; config-driven slot cards banned.
- **A4** (I2.5): tone-**and-composition** map — some states demand structural change, not tint.
- **A5** (I2.9): return paths — undo/cancel/handback; blocking states lock inputs and state why; no dead ends.
- **A6** (I6): single-source derivation — one fact, one source, zero desync.
- **A7** (§9 V1): known defect-class register mechanized.
- **A8** (§7, §9.3): screens must live — staged consequences, one-pass fan-out.
- **A9** (§10.2): mining seeded from old canon + legacy variation space.
- **A10** (R3, I5): machine→tone via the same single hook; hand-maintained tone tables banned. *(folded per direction; user-vetoable)*
- **D1**: field validation lifecycle `empty → invalid → valid` (§5, I6).
- **D2**: async timeout transitions declared per machine (§5).
- **D3**: hold-to-confirm candidate for binding ceremony (§6, provisional).
- **D4**: persistence-across-reopen rule (§5, §7).
- **D5**: typed verb vocabulary; cancel ≠ abort; retry/resolve/reject/clone typed (§5).
- **D6**: `missing` data-state open item (exemplar 3); gesture vocabulary completeness (V2); resize deferred per R11 (§4).
- **D7**: A10 folded into R3/I5 (see A10).
- **R12**: §3 v0 ratification recorded (user assent; P0 authorized).
- **R13**: docs tracking policy — contract, evidence ledger, and product spine tracked; superseded-era docs stay ignored (user ruling during P0).
