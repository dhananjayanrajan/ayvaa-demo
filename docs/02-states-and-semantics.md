# 02 — STATES AND SEMANTICS

**Owns completely:** the three state axes in full, the derivation matrix (state → tone → intensity → mode), escalation and magnitude laws, mode selection, per-entity UI treatment for every canonical lifecycle, the data-state definitions (including `missing`), time-driven state behavior, persistence rules, and the state-surface declaration standard.
**Status:** v1.0 — proposed. R12 ratified the foundation (master §3); this document expands it. Every [D] expansion below is vetoable; user ratification of this document seals it as R16.
**Provenance tags:** [R] = R12-ratified foundation · [C] = old canon (spirit) · [M] = mined evidence · [D] = derived expansion — vetoable.
**Strength:** **M** = MUST · **S** = SHOULD.

---

## 1 — The three state axes

Every component carries up to three independent state axes. They are declared separately and rendered distinctly; conflating them is a defect. [R]

### 1.1 Interaction axis

| State | Meaning | Rendering law |
|---|---|---|
| rest | untouched | the component's base presentation |
| hover | pointer intent | MUST visibly register — a tint change lighter than or equal to the base is a defect; contained rows step [0.03] → [0.06] [C] |
| focus | keyboard/screenfocus | MUST render `focus-visible` ring on every interactive element — never removed, never invisible [M] |
| active / pressed | finger down | tap feedback per 05 (scale 0.985 seed) [C] |
| disabled | not available | muted fill, `cursor-not-allowed`, `aria-disabled`, and the reason stated in the control itself — never silent [C] |
| working | async in flight | the control's lifecycle state (§4), not a global block [M] |

### 1.2 Lifecycle axis

The component's own modeled states — idle → working → done → failed and their pattern-specific variants. Owned by §4 here, declared per component in 07.

### 1.3 Data axis

What the data feeding the component is doing, independent of any user interaction:

| State | Definition | Rendering law |
|---|---|---|
| empty | no data exists and none is expected or applicable | quiet; if a list view, cause-diagnosing empty state (§3.6) [C] |
| loading | expected data, arriving | skeleton in place at the same anatomy — never a full-screen block; control-level async uses the lifecycle state, not a screen skeleton [D] |
| partial | some entries/fields real, others absent or pending | show real values, mark pending ones explicitly — never fabricate, never leave silent gaps [D] |
| stale | data present but past its freshness contract | quiet freshness marker + refresh path — never silently presented as current [D] |
| conflict | two sources disagree | surface both values and the disagreement — never pick silently [D] |
| missing | the workflow expects a record; it is absent; absence carries consequence | MUST state: what's missing, what it blocks, the path to create/request it. Tone: attention. Escalates to risk when the block actively prevents scheduled care. Distinct from empty (nothing expected) and loading (arriving) — the distinction MUST be visible [D — defines the previously open item] |

### 1.4 Independence rules

- **[M]** A component can be in any combination (hover × working × stale). Each axis renders through its own channel: interaction via control states, lifecycle via the state map, data via the data-state markers. No axis may borrow another's signal.
- **[M]** Data state is never silent. A surface showing data MUST be able to answer "is this current, complete, and real?" by looking at it.

---

## 2 — The derivation matrix

### 2.1 How derivation works

Tone (which meaning), intensity (wash/chip/fill/shell), and mode (light/shell) derive from state — never chosen by taste. Order of authority [D]:

1. **Entity lifecycle treatment (§5)** — where an entity defines its state's treatment, it wins.
2. **The binding arc (§3.3)** — binding-stakes surfaces follow the ceremony arc, not the grid.
3. **The generic matrix (§3.2)** — the fallback for any state not covered above.
4. **Completion override** — lifecycle done/verified/sealed reads `positive` always, everywhere [R].

### 3.2 — The generic matrix

Stakes (rows) × urgency (columns) → tone + intensity. Light mode unless stated. [D — expansion of R12 anchors]

| Stakes \ Urgency | none | scheduled | soon | now | overdue | missed |
|---|---|---|---|---|---|---|
| informational | neutral wash | neutral wash | neutral wash | active chip | attention wash | attention wash |
| routine | neutral wash | neutral wash | active wash | attention chip* | risk chip + recovery | risk chip + recovery† |
| elevated | attention wash | attention wash | attention chip | attention fill | risk chip + recovery | risk chip + recovery† |
| person-safety | risk shell | risk shell | risk shell | risk shell | risk shell + escalation | risk shell + escalation |

\* the working control on an attention surface renders attention fill.
† recovery is mandatory and simultaneous — a missed state with no way forward is a defect [R].

Notes:
- **[D]** informational × overdue/missed renders attention wash, not risk: the viewer owes nothing; the fact is stated. Risk is reserved for surfaces the viewer must act on or be protected by.
- **[D]** person-safety is urgency-independent: an open incident with no clock is still a live risk shell.

### 3.3 — The binding arc

Binding stakes (consent acts, payments, withdrawal) are urgency-independent until failure. They follow the ceremony arc, not the grid [R/D]:

| Phase | Treatment |
|---|---|
| pre-commit | **risk shell** — Mode B ceremony; consequences stated concretely before the act; the action control is the ceremony's center [R] |
| in-flight | working lifecycle state inside the shell; inputs lock, stating why [R — A5] |
| committed | **positive** — the confirmation surface flips (sheet header, strip, or card per composition); the persisted record reads positive thereafter [R] |
| failed (e.g. payment) | risk chip + recovery surface (retry/refund path) — money never ambiguous [R] |
| reversed (refund/withdrawal-cancelled) | states the fact plainly; refund completion reads positive [D] |

### 3.4 — Mode selection (light card vs dark shell)

Shell is triggered by exactly three conditions — never by hue preference [D, from C]:

1. **Stakes binding, pre-commit** — the ceremony.
2. **Stakes person-safety, live** — the escalation surface.
3. **The screen's hero/identity card** — heroes may carry Mode B regardless of stakes (identity weight).

Everything else is a light card. A shell on any other surface is a defect.

### 3.5 — Dominant meaning & precedence

A surface carrying multiple meanings resolves by precedence: person-safety > binding > elevated > routine > informational; ties broken by urgency [R]. The dominant meaning takes the surface (shell tint / accent / fill); every secondary meaning demotes to a chip or link [R/D]. Worked example: a visit-in-progress card (active) with a linked open incident (person-safety) renders risk-led; the visit state demotes to a chip.

### 3.6 — Empty states diagnose cause

A zero-length list MUST explain why, with the matching remedy [C]: search miss ("Nothing matches X" → reset search) vs filter exclusion ("Your filters hide every service" → clear filters) vs genuinely nothing (state the fact and the path). Each cause: its own copy, icon, action. A single generic empty state is a defect.

---

## 4 — Lifecycle presentation

### 4.1 The action arc

Every consequential action runs the same arc [C/M — six wild implementations of this in one mined domain]:

| Stage | Composition | Copy law |
|---|---|---|
| idle | the action control, in context | names the effect with real data ("Seal 2 changes") |
| gated | control muted, reason in itself | the blocked control IS the reason ("Pick at least one day to continue") — no adjacent hint duplicating it |
| working | control or sheet flips to working: spinner, muted fill, `cursor-wait`, inputs locked | narrates the transition ("Sealing your consent") |
| done | whole-surface flip to positive; confirmation strip or sheet-header state change | states the outcome ("Consent sealed"); navigation only after done lands |
| failed | risk state + the way out | never the word "error" (03 §2.5) |
| handback | after done: "keep editing", undo where reversible | no dead ends; done never strands the user [R — A5] |

States that demand different structures get different compositions — idle renders a button, pending renders a status strip, done renders a confirmation strip. A tint-only flip across such states is a defect [R — A4].

### 4.2 The one-map rule

Every behavioral component holds ONE source of truth mapping state → presentation. The map is declarable as a table — this is the standard shape every 07 entry MUST declare [D — formalizes C §15.1, mined zero-tone-map finding]:

| State | Tone | Intensity | Mode | Composition | Copy intent |
|---|---|---|---|---|---|
| …per state… | token | wash/chip/fill/shell | light/shell | which structure renders | working/done/gated lines |

Scattered `state === 'x' ? class : class` conditionals across a component body are banned — presentation derives from the map, or is co-located with the state it mirrors; never duplicated [R — I5/A10]. The map drives tone AND composition AND copy intent together, so whole-surface flips (01 §6.2) fall out mechanically.

### 4.3 Blocking & return paths

- **[M]** Blocking states lock the inputs they protect: rows muted, toggles guarded, cursor-not-allowed — and the CTA states why ("Sealing locked during withdrawal").
- **[M]** Every stateful flow has its return path: undo (restores the prior sealed state + notifies), cancel (before effect), abort (kills in-flight — a distinct verb, only where killing is meaningful), handback after done. No dead-end states.
- **[M]** State persists with its owner at the correct scope: reopening a tab, sheet, or screen never resets persisted state; done derives from the persisted record so re-entry shows done (D4). Per-mode state persists per mode.

### 4.4 Time-driven state

- **[M]** Countdowns tick; a decaying value MUST move (static bar where time is the data is a defect). Absolute time is primary ("2:00 PM today"), relative secondary ("in 20 min") [R — 03].
- **[M]** Hitting zero flips STATE — hue + copy + recovery path — never color alone.
- **[M]** Thresholds (when `soon` begins, when `overdue` begins) are per-entity data (§5), never universal constants [R].
- **[M]** Async paths declare their timeout behavior: a timeout transitions to failed with copy stating what happened and the way out — never a silent spinner (D2).

---

## 5 — Per-entity UI treatment

Entity lifecycles [R — master §3.5] rendered as treatments. Where an entity defines a state, it overrides the generic matrix. Intensity steps per the escalation law (§6). [D — the treatments; lifecycles themselves are R]

### 5.1 Visit / Session

| State | Treatment | Notes |
|---|---|---|
| scheduled | active wash + absolute time chip | calm, booked |
| en-route / arrived | active chip + live dot | caregiver moving |
| in-progress | active chip, live dot, ticking elapsed | the live surface (exemplar 2 domain) |
| completing | attention chip | sign-off owed |
| sealed | positive chip / sealed card | payment gate open; history reads positive |
| missed | risk chip **+ platform-initiated re-dispatch strip (active)** | recovery is platform-owned — never user-chased [R] |
| cancelled | neutral wash + reason | no recovery owed |

### 5.2 Dose

| State | Treatment | Notes |
|---|---|---|
| scheduled | neutral wash | future fact |
| due | attention fill (working dose surface) | the eye lands here [R example] |
| taken | positive chip | sealed record |
| refused | risk chip + recorded reason | refusal is first-class, never silent absence [R — MAR] |
| overdue | risk chip + nudge arc | escalates on the clock |
| missed | risk chip + escalation | consequence stated |

### 5.3 Consent

| State | Treatment | Notes |
|---|---|---|
| draft | neutral wash | |
| offered / awaiting signature | active chip | awaiting the signer |
| signed / active | positive chip + sealed record | **care runs on the sealed version** [R] |
| pending changes | attention chip ("2 pending") on the positive sealed surface | the split is visible: sealed vs pending never blend [R] |
| expiring | attention chip → fill as window closes | threshold = entity data |
| withdrawal ceremony | risk shell (binding arc §3.3) | consequences concrete, pre-commit |
| withdrawn | risk chip, historical record | states the fact + date |
| renewed | positive chip | |

### 5.4 Incident

| State | Treatment | Notes |
|---|---|---|
| reported / triaged / investigating | risk shell, live, escalation affordance | person-safety [R]; severity scales intensity (§6), never tone |
| resolved | positive confirmation; record reads informational with risk-toned event chip | closed, not hidden |
| links | incident always links back to visit/plan [R] | |

### 5.5 Booking request

| State | Treatment | Notes |
|---|---|---|
| requested / matching | active wash → chip (live broadcast) | |
| offered | attention chip + expiry countdown | clock visible |
| accepted / scheduled | positive chip | |
| expired / no-offer | risk chip + **mandatory alternatives surface** | never a dead end [R] |

### 5.6 Verification / Credential

| State | Treatment | Notes |
|---|---|---|
| submitted / in-review | active chip | |
| verified | positive chip + expiry micro-fact | expiry is scheduled urgency [R] |
| renewal window (soon) | attention chip | |
| expiring (now) | attention fill | |
| lapsed (missed) | risk chip + renew path | blocks work — consequence stated |
| rejected | risk chip + resubmit path | reason stated |

### 5.7 Payment

| State | Treatment | Notes |
|---|---|---|
| estimated | neutral wash (fact) | |
| authorized / capturing | active chip, live | |
| captured | positive chip | sealed fact |
| failed | risk chip + retry/refund surface | "no money left your account" — the way out, same breath [R — 03] |
| refunded | positive chip | money returned is a good outcome [D] |

### 5.8 Payout

| State | Treatment | Notes |
|---|---|---|
| accrued | neutral wash (balance fact) | |
| withdrawn / requested | active chip | |
| in-transit | active chip, live | visible state, never a black box [R] |
| settled | positive chip | |

---

## 6 — The escalation law

Two independent scalars govern loudness [D]:

1. **Tone is set by meaning** (matrix/entity treatment) — it never scales continuously; it steps at meaning boundaries.
2. **Intensity scales with magnitude** within the same tone — severity, counts, proximity [D — E7 formalized]:
   - more items affected → step up (1 pending = wash; 3+ = chip)
   - closer to the edge (2 h → 15 min) → step up
   - higher severity → step up, up to the shell for person-safety

**Escalation triggers (tone steps, not just intensity):**
- Window opens (scheduled → now): tone steps per matrix; the actionable control takes fill.
- Window passes (now → overdue): tone steps to risk **and the recovery path surfaces simultaneously** — never one without the other [R].
- Recovery accepted: tone steps back down along the same path (risk → attention/active → positive on completion).

---

## 7 — Rule index (MUST summary)

Three axes declared separately, each rendered distinctly · data state never silent · missing ≠ empty ≠ loading visible · derivation order: entity > binding arc > matrix > completion override · completion always positive · shell only on three triggers · precedence person-safety > binding > elevated > routine > informational, ties by urgency · dominant meaning owns surface, secondary demotes · empty states diagnose cause · action arc with stated reasons, narration, handback · one-map rule per behavioral component · blocking locks inputs and states why · return paths always · persistence across reopen · countdowns tick, zero flips state · thresholds are entity data · timeouts declare themselves · intensity scales with magnitude, tone steps at meaning boundaries · recovery paths simultaneous with risk.

---

## 8 — Open items

| Item | Status | Owner |
|---|---|---|
| Per-entity threshold values (when `soon` begins per entity) | OPEN | build phase — entity data modules |
| Severity ladder exact levels (incident) | OPEN | 07 incident entry |
| Hold-to-confirm for binding ceremony | OPEN (candidate) | 04 |
| Copy banks per state (working/done/gated lines) | OPEN | 03 |
| Live-streaming semantics (unique ids, atomic prepend) | OPEN | 07 live entries + 06 |
