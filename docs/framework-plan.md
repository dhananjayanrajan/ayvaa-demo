# AYVAA COMPONENT FRAMEWORK — MASTER BUILD DOCUMENT v2 — TRUE FRAMEWORK

**Document status:** Binding contract for the Ayvaa Component Framework. User is authority on intent; where any past document, ledger, or ruling conflicts, **this document wins**. Read fully before touching any file. This v2 massively upgrades v1 from scaffold to **true framework** — guarantees for your 5 expectations + 4-layer crux — so execution cannot drift back to copy-paste bundles.

---

## 0. WHY THIS DOCUMENT EXISTS — AND WHAT v2 FIXES

Refactor era began at `75826d2` (`75826d2^` = baseline originals), 411 commits over ~60 sessions. Produced `src/components/phone/` (36 files now: 34 + DialInput + FrameworkRuntime), consolidated patterns, fixed 47 latent bugs, reached gate 0. Failure: agent ledgered micro-deviations (unified springs, dropped whileTap/hover, flattened paddings, lost aria) — drift vs baseline; and strategic failure: 431→397 not massive, copy-paste bundles not framework.

**v1 failure mode we lived:** Pass 2 bulk python concatenation (19 sets interim) kept duplicates via rename (`Phase_*`, `VAULT_KIND_UI`, `LIVE_VISIT_Visits`), not variant-merge; no L2 machine upgrade beyond DialInput; no bus fan-out; tiny chip recolors not whole-card tone-map; static transitions not butter; apps still prop-drilled. Gate 0 proved nothing visual per §9.

**v2 guarantee:** Every component is **multi-layer, batteries-included, autonomous, communicating, expressive, butter, QoL, extensible, customizable, reusable, modular** — not a button/table kit. Plan now enforces **measurable contracts + verification** so 500 screens across 21 apps assemble from ~12 framework + ~8 feature imports per screen, per §3. Design ideology REDESIGN.md (585 lines, Mode A light Card p-5/mt-4/gap-3/19px/9px micro 0.22em/rise stagger/sheet 3-zone 86% + Mode B dark shell rounded-[26px] orbs/hairline, type scale, spacing, motion, a11y, tone-map whole-surface lifecycle idle→working→done §15.1, hard rules 15) + ANTI-DESIGN 82 patterns (1-82 layout/color/interaction/redundancy/process/form) are **law** (Law 7). No component ships without satisfying Laws 0-7 + §4 runtime + §6 QoL + verification §11.

What carries forward: design ideology, baseline originals in git, working universals in phone/ — all subject to fidelity proof. Docs are gitignored; user rulings are binding; tokens go to building, never recapping.

---

## 1. THE LAWS — BINDING, IN PRIORITY ORDER, NOW WITH MEASURABLE CONTRACTS

**Law 0 — Zero visual drift.** Identical rendered output for identical props — byte-class-for-byte-class vs baseline originals: every class string, motion value, spring constant, duration, easing, strokeWidth, opacity step, padding, radius, aria, trigger. Permitted deltas: file location, file name, import path, internal structure. Any deviation = defect to eliminate, never ledgered. **Proof:** per-export diff vs original + screenshot parity on default props where tooling exists (otherwise user eyes per §11) + user walkthrough per §11.

**Law 1 — Everything interactive and reactive (Expectation 1).** No static component. Every component responds to **user** (click/drag/keyboard/gesture), **data** (typed contract change), **state** (own + subscribed) through **visible, animated transitions**. **Contract:** every prop change → motion variant chain; every interactive element has `whileTap/whileHover` + `focus-visible` + `ARIA` + keyboard equivalent; no `div` with `onClick` without role/button semantics. **Verification:** interaction matrix per component (input → state → animation → bus event).

**Law 2 — Everything communicates (Expectation 2).** Components **own** what they own, **publish** what they own, **subscribe** to what concerns them — **Runtime Contract §4**. A seal in one card updates hero counter + sibling row chip + list trailing pill **in one rendered pass, bus-driven not prop-drilled**. **Contract:** every L2+ component consumes `FrameworkRuntime` via context (dev-mode warns when missing), owns state machine (self-cleaning timers on unmount), publishes semantic events, subscribes via `on`. **Event catalog §4.1 binding.** **Verification:** fan-out test — single `emit` updates all subscribers in one frame.

**Law 3 — Expressiveness (Expectation 3).** State changes are **loud**: progress change recolors **entire card** (shell, orbs/hairline, tiles, chips, buttons — tone-map state machine REDESIGN §15.1); list item state flows to whole list. Eye lands where state moved. **Contract:** tone-map whole-surface flip per state (emerald↔amber↔rose vs dark vs light per domain), not tiny chip recolor; intensity scales with magnitude (meter + shell + Tile + Chip + Button all derive from same state). **Verification:** per-state screenshot shows whole-surface delta where capture available, else visual inspection.

**Law 4 — Butter (Expectation 4).** Ultra-smooth, fluid, responsive — no jank, no jerk, **no static transitions anywhere**. Concurrent transitions (sheet closing + background card updating) choreograph as **one seamless flow**. **Contract:** all motion via `motion/react` with per-origin springs (not unified), layoutId morphs for shared elements, `AnimatePresence` for mount/unmount, inertial projection where draggable (DialInput DNA), 60fps, no `transition: all` or CSS `transition` without motion token. **Verification:** concurrent animation test (sheet dismiss + hero update) — single orchestrated variant chain.

**Law 5 — Quality of life (Expectation 5).** Natural, organic, human expectations built in: **QoL Checklist §6** takes experience 100%→150%. **Contract:** every paged surface supports swipe with pre-staged content; every sheet supports drag-to-dismiss + drag-to-confirm where suited, keyboard equivalents, edge fades, rubber-clamp, grab cursors, gating that states its reason + cursor-not-allowed + muted fills, odometer/rolling values for every numeric change, CompletionSheet choreograph (`working → full-sheet state flip → done → auto-dismiss → dim unblurs`).

**Law 6 — Batteries included.** Ships with everything: typed data contract (parsed at data layer REDESIGN §10, zero parsing at render, zero magic literals), animations, lifecycles + timers (self-cleaning), gating with stated reasons, a11y, gestures, bus publishing. **Contract:** no component requires consumer to wire motion/timers/a11y/bus — batteries included per §10 anatomy.

**Law 7 — Design canon is law.** REDESIGN.md + ANTI-DESIGN.md are spec: two modes, type scale §2, spacing rhythm §3, structural patterns §4, motion §5, a11y §6, sheet 3-zone §9, data discipline §10, tone maps §15.1, hard rules §11, anti-patterns 1-82. Violation = defect. **Enforcement §11.**

**New Law 8 — Extensibility & Customization.** Framework is **advanced, highly customizable, fully reusable, extensible, modular massive collection** — not basic elements. Every component exposes **variant Props union** (single flexible export merging near-duplicate pairs) + **slot composition** (leading/trailing/expansion) + **tone/intent/size** tokens from kit — consumers compose, not fork. No duplication via suffix hacks after PASS2; variant = one export, multiple shapes.

---

## 2. THE FOUR LAYERS — THE CRUX, NOW ENFORCEABLE

| Layer | Location | What it is | Owns | Must satisfy |
|---|---|---|---|---|
| **L0 Primitives** | `phone/kit.tsx` | Atomic visual atoms + motion tokens (Tile, Chip, TimeChip, Panel, Hero, Expand, Meter, Ring, Section, StatCell, TapCell, LiveDot, Stat, StatStrip, rise/stagger, INTENT, CHIP_TINT/TILE_TONE/HERO_TONE, EASE) | classes only, no logic | Law 0, tokens only |
| **L1 Universals** | `phone/` | Pattern shells: props in → exact design out, zero logic, slots only | structure + slots | Laws 0,3,7 + 4 (motion tokens) |
| **L2 Composites** | `phone/` | **Batteries-included machines** — the true framework layer | full autonomy: state machines, timers (self-cleaning), staged animations, gestures, a11y, gating, bus publishing, QoL, tone-map | Laws 0-7 + §4 + §6 + anatomy §10 |
| **L3 Feature sets** | `components/<domain>/` | Caregiver-domain compositions — **thin, built ON L0–L2**, never re-implements motion/lifecycles | domain data wiring, flows, fan-out | Laws 0-7, thin §10, variant merges §5 |
| **Screens** | `apps/` | Assembly only | routing, layout order, data supply (clean typed fields) | import from Set files only |

**Layer discipline (binding):** layer consumes only lower layers. L3 never re-implements motion/lifecycles (that's L2). L2 never knows caregiver data (typed contracts only, parsing at data layer). Screens never contain component JSX — they assemble. Violation = revert.

**Autonomy DNA (§8):** L2 components own state machines end-to-end (DialInput exemplar: inertial velocity→decay→spring snap, odometer, rubber-clamp, detent bar stretch, hue emerald→amber, keyboard +/- , ARIA slider, timers cleaned). Every L2 after DialInput must match this DNA for its pattern (e.g., Row expansion = chevron rotate + motion height + bus publish; Sheet = drag-y dismiss + dim choreograph; SegmentedTabs = swipe pre-staged + layoutId pill + per-tone springs 480/38 vs 420/34 etc).

---

## 3. THE TARGET TREE (≈75-81 files, replacing 397) — BUDGET IS MEANS, PRODUCT IS ASSEMBLY

```
src/components/
├── phone/                    # L0–L2 framework tier — ~36 files, one universal per file, PascalCase
│   ├── kit.tsx               # L0 only: Tile, Chip, TimeChip, Panel, Hero, Expand, Meter, Ring, Section, StatCell, TapCell, LiveDot, Stat, StatStrip, rise/stagger
│   ├── DialInput.tsx         # L2 exemplar: inertial dial, odometer, rubber-clamp (calibration, §8)
│   ├── FrameworkRuntime.tsx  # Runtime context + useFrameworkEvent (bus §4) — separate from kit
│   ├── PhoneFrame  Screen  AppBar  NavBar  Splash  PushPreview  ScreenshotButton  Pager
│   ├── SheetShell            # + CompletionSheet behavior §6 (working→flip→done→dismiss→unblur)
│   ├── PhaseHero  AccentHero  HeroCells  LiveHero (Mode B orbs/hairline)
│   ├── Row  ExpandRow  OptionRow (per-tone springs, whileTap 0.985, chevron rotate)
│   ├── StepList  MiniTimeline (rails, alignment)
│   ├── Field (+ EyeToggle, PasswordMeter)  Switch  Radio (tile maps)
│   ├── SegmentedTabs  LifecycleButton-family  ActionPair (swipe pre-staged, layoutId)
│   ├── FactRows  FactTile  QuotePanel  StatusStrip  StatusPill  NoteStrip  EmptyState  DarkPanel  Overline  CredentialCard
│   └── (ConfirmStrip→StatusStrip; near-duplicates merged as variant exports)
│
├── <domain>/<Domain>Set.tsx  # L3 feature tier — 45 domain sets, cross-role, kebab-case domains (thin on L2)
│   ├── auth/AuthSet.tsx                # patient+professional+partner auth (PasswordCard variants union)
│   ├── onboarding/OnboardingSet.tsx    # patient+professional onboarding (Hero variants union)
│   ├── home/HomeSet.tsx                # patient dashboard + admin/partner dashboards (cross-role union)
│   ├── booking/BookingSet.tsx  catalogue/CatalogueSet.tsx  matching/MatchingSet.tsx
│   ├── visits/VisitsSet.tsx  sessions/SessionsSet.tsx
│   ├── care-plan/CarePlanSet.tsx  meds/MedsSet.tsx  records/RecordsSet.tsx
│   ├── consent/ConsentSet.tsx (patient+admin)  billing/BillingSet.tsx (patient+partner, BillingHero union)
│   ├── earnings/EarningsSet.tsx  offers/OffersSet.tsx  incidents/IncidentsSet.tsx
│   ├── profile/ProfileSet.tsx (patient+professional, Props union)  identity/IdentitySet.tsx
│   ├── notifications/NotificationsSet.tsx (patient+system)  escalations/EscalationsSet.tsx
│   ├── review/ReviewSet.tsx  recovery/RecoverySet.tsx  reports/ReportsSet.tsx
│   ├── transactions/TransactionsSet.tsx  partner-patient/PartnerPatientSet.tsx
│   ├── ui/UiSet.tsx  sheets/SheetsSet.tsx  accounts/AccountsSet.tsx
│   ├── recheck/RecheckSet.tsx  retry/RetrySet.tsx  approvals/ApprovalsSet.tsx
│   ├── retention/RetentionSet.tsx  availability/AvailabilitySet.tsx
│   ├── history/HistorySet.tsx  payouts/PayoutsSet.tsx  verification/VerificationSet.tsx
│   ├── performance/PerformanceSet.tsx  referral/ReferralSet.tsx  staff/StaffSet.tsx
│   ├── analytics/AnalyticsSet.tsx  drills/DrillsSet.tsx  execution/ExecutionSet.tsx
│   └── audit/AuditSet.tsx (admin+system chain)
│
└── (NO role folders after Pass 3: patient/, professional/, partner/, admin/, system/ are DELETED)
```

**Merge map (fragmentation → variant, not duplication):** old role folders `patient/*`, `professional/*`, `partner/*`, `admin/*`, `system/*` → single kebab domain per hazard (e.g., `patient/plan` + `admin/dashboard` → `care-plan` + `home`; `patient/auth` + `professional/auth` + `partner/auth` → `auth` with `PasswordCard_Patient|Professional` union → `PasswordCard` variant Props + `as` migration alias). Alias `BillingHero_Partner as BillingHero` etc is **migration-only scaffolding** — stable once apps repoint per-role (eb88c51), to be collapsed to union Props and removed.

**Budget:** ~36 phone + ~45 domain sets ≈ 81 files. 397 files resolve into these sets; near-duplicate pairs merge into **single variant exports** (union Props, not suffix), 49 deleted wrappers stay gone. Count is means — product is screen #401 assembles from ~12 framework + ~8 feature imports.

---

## 4. THE RUNTIME CONTRACT — LAWS 1, 2, 5 — BINDING

```ts
// FrameworkRuntime — React context, provided by every app shell
interface FrameworkRuntime {
  notify(event: NotifyEvent): void      // semantic notify (toast/push within PhoneFrame)
  navigate(route: string): void         // route change via bus, not direct router
  emit(event: string, payload?: unknown): void
  on(event: string, handler: (payload: unknown) => void): () => void // returns unsubscribe, self-cleaning
}
```

- Every L2+ component **consumes runtime via context** (dev-mode warns when missing; fallback warns).
- Components **own** state machines (open/closed, phase, timers — self-cleaning on unmount), **publish** semantic events, **subscribe** to what concerns them. **Fan-out is bus-driven, not prop-drilled.**
- **Event catalog §4.1 (binding, extend as needed):** `visit.sealed`, `dose.taken`, `filters.applied`, `tab.swiped`, `sheet.completed`, `sheet.dismissed`, `auth.verified`, `payment.confirmed`, `profile.updated`, `visit.scheduled`, `consent.granted`, `drill.triggered`, `audit.logged`, `recheck.scheduled`, etc. — each L3 domain publishes its domain events; L2 publishes generic (`sheet.dismissed`, `tab.swiped`).
- Existing screens wrap `useDemo` into runtime — migration, not rewrite. Hook `useFrameworkEvent(event, handler)` available.

**Verification:** fan-out test per domain — single `emit` updates all subscribers in one frame, no prop drilling; unmount cleans timers/handlers (no leaks).

---

## 5. NAMING CONVENTION — BINDING, EXTENSIBILITY

- Framework files: `PascalCase.tsx`, one universal per file. Set files: `<Domain>Set.tsx` in kebab-case domain folders (e.g., `care-plan/CarePlanSet.tsx`, `partner-patient/PartnerPatientSet.tsx`).
- Export intent suffixes — `*Card *Row *Hero *Sheet *Strip *Panel *Bar *Rail *Pill *Button *Field *Picker *Tile *Cell *Meter` — no synonyms, per §5. `useX` hooks, `PascalCase` types, `SCREAMING_SNAKE` constants.
- Data modules: `src/data/<domain>.ts` — components receive **clean typed fields; zero parsing at render; zero magic literals** (REDESIGN §10).
- Screens import from set files only; no deep intra-set paths. Path is `@/components/<domain>/<Domain>Set` — variant aliases via `as Original` where cross-role suffix existed (e.g., `BillingHero_Partner as BillingHero` per-role) — **scaffolding only**, to be collapsed to union Props post-stabilization per §3.
- **Variant rule:** near-duplicate pairs → **single variant export** with union Props (e.g., `BillingHeroProps = BillingHeroProps_Patient | BillingHeroProps_Partner` plus discriminated `variant` or optional fields), not suffix hacks. After PASS2, suffix hacks eliminated via union (remaining 6 files fixed 7875767).
- No code comments (`// ──` etc) per instruction — bulk clean 31d0be9; future merges must not add comments.

---

## 6. THE QOL PATTERNS — LAW 5 — BUILD ONCE IN L2, INHERIT EVERYWHERE — CHECKLIST

Every L2 must satisfy this checklist; L3 inherits; screen benefits without wiring:

1. **CompletionSheet** — choreographed `working → full-sheet state flip → done → auto-dismiss (850ms) → dim unblurs`, one orchestrated variant chain, timers self-cleaning, `AnimatePresence`.
2. **Swipe-paged tabs** — `SegmentedTabs` panels support horizontal drag (`dragElastic 0.18`, `dragMomentum false`, pre-staged content, `layoutId` pill, per-tone springs).
3. **Drag-to-dismiss sheets** + drag-to-confirm where suited (SheetShell `drag="y"` + `dragConstraints` + dismiss threshold).
4. **Shared-element morphs** — `layoutId` sliding pills; cross-component morphs (hero stat → detail).
5. **Odometer/rolling values** — every numeric change uses odometer (kit `Odometer` global) — not static text swap.
6. **Edge fades, rubber-clamping, grab cursors, keyboard equivalents** on draggable surfaces (DialInput DNA).
7. **Gating that states its reason** + `cursor-not-allowed` + muted fills + `aria-disabled`; no silent disabled.
8. **A11y:** `aria-expanded`, `role=button/tab`, `focus-visible:ring`, keyboard `+/-`/`Enter`/`Space`/`Esc`.

**Verification:** QoL matrix per L2 — each bullet tested via interaction (swipe, drag, keyboard) + visual variant chain inspected.

---

## 7. THE PASSES — EXECUTION ORDER, NOW WITH VERIFICATION GATES PER EXPECTATION

| Pass | Job | Proof per unit | Output |
|---|---|---|---|
| **0. Census** | Diff all M/D files (`git diff --name-status 75826d2^ HEAD -- src/components src/apps src/data` — 301 M + 49 D) vs baseline; classify: normalization-OK vs **design-drift** | read-only | Drift register — fidelity spec |
| **1. L2 fidelity + QoL + Runtime** | **Upgrade universals to true L2 machines** against absorbed originals' full variation space (Row tap 0.985/hover/chevrons, StepList rails, SegmentedTabs per-tone springs, SheetShell per-origin springs/dims, StatusStrip animations, QuotePanel sizes, Field tile maps) — deltas eliminated, not ledgered. **Then add §4 runtime + §6 QoL checklist per L2** — each L2 becomes batteries-included autonomous per §10 anatomy | **Gate 0 (app+node) + diff vs original = zero visual-class deltas + interaction matrix + fan-out + QoL checklist** | commits per hub, one hub in flight |
| **2. Domain sets** | Domain by domain: **migrate fidelity-corrected L2s into `<Domain>Set.tsx` thin compositions** (never re-implement motion/lifecycles); rewrite consumer imports per-role variant alias (scaffolding per §3 → union); apply drift fixes as each lands; **merge near-duplicate pairs as single variant export (union Props, not suffix)**; enforce **tone-map whole-surface + butter + bus** per domain | **Gate 0 + per-export diff vs original + tone-map screenshot where capture exists else visual inspection + concurrent choreograph + variant union test** | commits per domain, one domain in flight, no comments |
| **3. Restructure** | Delete role folders (`patient/` etc); normalize names to §5; finalize tree; ensure 0 old role imports remain | **Tree audit vs §3 (81 target) + grep 0 old imports + gate 0** | restructure commit |
| **4. Certification** | **User walkthrough, screen by screen — mandatory. Breaks → fix → re-walk. Gate proves nothing visual per §9.** | user judgment | sign-off |

**Standing rules:** one hub/domain in flight; gate after every exchange; no keep/refactor contemplation — rebuilt through layers; no UI redesign by agent (REDESIGN/ANTI-DESIGN decide); tokens to building, never recapping; **one sweep in flight; grep-gated deletions; conventional commits; docs gitignored; user rulings binding; disk authoritative; python-heredoc over sed for `!`/`?`; content-matched edits only.**

---

## 8. THE CALIBRATION EXEMPLAR — DialInput — DNA FOR ALL L2

Before mass production, user tests framework DNA with one L2: horizontal watch-dial of spokes; drag spins with detent increments; **release velocity projects inertial spin** (deceleration, spring snap to nearest spoke — mechanical, buttery); odometer 38px hero scale; center detent bar stretches while dragging, hue-derives emerald→amber at max, whole-card expressiveness Law 3; keyboard +/- stepping; edge fades; rubber-clamp; fully controlled API (`value/onChange/min/max/step/label/unit`), zero domain knowledge. **Verdict calibrates all L2.** Built in lab P99 (later removed per instruction 1c0c4d3) after acceptance; phone now has DialInput + FrameworkRuntime as L2 baseline.

---

## 9. THE HISTORICAL LEDGER — RETAINED, DEMOTED

`docs/component-migrations.md` + `docs/component-coverage.md` record old program — commits, keep-rulings, incidents (vacuous gate, history-expansion seds, emit corruption), micro-deviation list fix queue. **Surviving process rules (binding):** real gate = `npx tsc --noEmit -p tsconfig.app.json` + `-p tsconfig.node.json` exit codes directly; gate that never fails is not gate; content-matched edits only; disk authoritative; staging checks; python-heredoc over sed; one sweep in flight; grep-gated deletions; conventional commits; docs gitignored; user rulings binding. **Heading: compile gate proves nothing visual. Nothing verified until user sees it.**

---

## 10. COMPONENT ANATOMY — BATTERIES-INCLUDED L2 — CHECKLIST (binding)

Every L2 MUST have:
- **Typed contract:** Props interface with intent/tone/size/variant tokens from kit, no magic literals; data parsed at data layer.
- **State machine:** `idle → working → done` or `closed → open` etc, owned internally, self-cleaning timers (`useRef` + `useEffect` cleanup), staged `motion` variants.
- **Bus:** `useFrameworkEvent` subscribe + `emit/notify` publish; dev-mode warn if missing runtime.
- **Tone-map:** whole-surface variant (shell + Tile + Chip + Button) derived from single state — Law 3.
- **Butter:** `motion` springs per-origin, `layoutId`, `AnimatePresence`, inertial/rubber where draggable — Law 4.
- **QoL:** §6 checklist (swipe, drag-dismiss, odometer, edge fades, rubber, keyboard, gating reason) — Law 5.
- **A11y:** `aria-*`, `role`, `focus-visible`, keyboard equivalents.
- **Verification:** diff vs original + interaction matrix + fan-out + tone-map visual + concurrent choreograph.

L3 thin: composes L2s with domain data wiring only; no motion/timers re-implemented; variant Props union for duplicates.

---

## 11. VERIFICATION PROTOCOL — BEYOND TSC (binding)

TSC is necessary not sufficient. Per unit (hub/domain) must pass:
1. **Gate 0:** `npx tsc --noEmit -p tsconfig.app.json` + `-p tsconfig.node.json` — exit codes directly.
2. **Diff vs original:** byte-class-for-byte-class on default props (no drift).
3. **Interaction matrix:** every input (click/drag/key/data change) → state → animation → bus event — visible.
4. **Fan-out:** single `emit` updates all subscribers one frame.
5. **Tone-map:** per-state whole-surface visual delta (screenshot where tooling exists, else direct visual inspection — mechanism gap closed: no phantom parity claim without capture).
6. **Butter:** concurrent transitions (sheet dismiss + hero update) single choreograph, 60fps.
7. **QoL checklist:** §6 all bullets tested.
8. **User walkthrough §9:** screen by screen, breaks → fix → re-walk — final sign-off.

---

## 12. EXTENSIBILITY & CUSTOMIZATION — ADVANCED FRAMEWORK (binding)

Framework is not basic elements — it's **massive, modular, reusable, extensible, customizable**:

- **Variant Props union:** one flexible export per pattern (e.g., `CardProps = CardProps_Light | CardProps_Dark` + `tone/size/variant`), consumers pick tone/intent/size/slots, no fork.
- **Slot composition:** `leading/trailing/expansion/chip/title/subtitle/meta` slots per universals (Row, Card, Hero) — compose without forking.
- **Token customization:** `INTENT`, `CHIP_TINT/TILE_TONE/HERO_TONE`, `EASE`, `rise/stagger` in kit — domain sets theme via tone-map, not new CSS.
- **Modularity:** ~36 phone + ~45 domain sets ≈ 81 files; screen assembles from ~12 framework + ~8 feature imports; new screen = new assembly, not new components.
- **Anti-design enforcement:** 82 patterns (1-82) + REDESIGN hard rules §11 are linted via grep + walkthrough — no ad-hoc markup, no thin wrappers, no config-driven generic components (#69), no registry bypass (#40).

Progress log lives in `docs/framework-progress.md` (mutable, gitignored in contract). This document is §0-§12 immutable contract.
