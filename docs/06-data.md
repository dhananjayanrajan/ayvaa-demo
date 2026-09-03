# 06 — DATA

**Owns completely:** the data-layer boundary, module anatomy and conventions, derivation discipline, the props taxonomy wiring the three state axes, list/stream mechanics, file & object handling, act resolution & retry, and the code-hygiene defect-class register.
**Status:** v1.0 — proposed. Serves master I6/I3 and 02's axes. [D] expansions vetoable; ratification seals as R20.
**Provenance:** [R] = ratified foundation · [C] = old canon (spirit) · [M] = mined evidence · [D] = derived — vetoable.
**Strength:** **M** = MUST · **S** = SHOULD.

---

## 1 — The boundary

1.1 **[M/R]** Parsing happens exactly once, at the data layer. Dirty input (mock seeds, API strings) enters the data module; components receive clean typed fields. `parseAmount("₹52,800")` → `{ currency: "₹", value: 52800, formatted: "₹52,800" }`; `"HDFC Bank · ending ••4821"` → `{ bank: "HDFC Bank", last4: "4821" }`. A component that splits, slices, or regexes a display string at render is a defect (E3's mechanism).

1.2 **[M/R]** Derived facts (totals, counts, tenure, groupings, "N of M") are computed in the data layer and passed as props — never hardcoded literals in components (`daysLeft = 23` is a violation), never computed twice.

1.3 **[M]** The direction is one-way: data → components → callbacks → (parent) → data. Components never mutate what they're given; parents re-derive and re-supply.

1.4 **[C]** Shared helpers live in ONE module and are imported across domains (`parseBank` pattern). Copy-pasting a helper into a second module is a defect; if two domains need it, it has one home.

## 2 — Module anatomy

2.1 **[C]** One module per domain: types → constants → parsers → derived builders. Layout of directories is a build-phase decision (master I1); the discipline is the contract.

2.2 **[M/D]** Export convention: `const`-arrow for parsers and builders (census: the corpus data modules carry zero `export function` — all const-arrow), `type`/`interface` PascalCase, constants SCREAMING_SNAKE. Named exports only; every name a consumer imports must exist — re-verify the export list whenever a consumer is written (missing-import is a crash class, §8).

2.3 **[C]** Constants that never move (cycle lengths, thresholds, consequence copy, money prefixes, debounce intervals) live beside the helpers that use them — entity thresholds per 02 §4.4 are entity-module constants.

2.4 **[M/D]** Types are shape-honest: `VitalReading` carries `{ kind, value, unit, trend, takenAt }` — not loose strings a component must interpret. If a component needs to ask "what tone is this?", the answer is a derived field from the data layer (`vitalIntent(reading)` — the mined precedent for 02's derivation), not a component-side lookup. **Derivations return CLASSIFICATION, never tone tokens [D]:** `vitalIntent(reading)` returns `'normal' | 'borderline' | 'abnormal'` — semantic levels the owning component's one-map translates via 02 (§4.2 there). The data layer never assigns tone; the map is the single meaning→presentation translation point.

## 3 — Derivation discipline

3.1 **[M/R]** Helpers are functions OF current state — parametrized, never baked to seed: `sealedStepsOf(steps)`, `buildLedger(steps, lapsDone)`, `changeCountOf(grantedIds, location)`. A helper that only works for one hardcoded record is a defect.

3.2 **[M/R]** Single-source: every surface showing "the same" fact calls the same derivation. The Section pill's "3 of 5 sealed" and any card mentioning the count derive from `consentProgress(approvals)` — prose counts and chip counts never compute independently (A6).

3.3 **[M]** Zero parsing at render; zero magic literals; zero per-screen re-implementations of a domain helper. A screen-local `filter(...)` over domain data should be a data-layer function with a name that says what it means.

3.4 **[D]** Search/filter mechanics: the input owns instant state; the list consumes a debounced copy (~180ms, constant in the data module); reset clears both copies in one action. Filtering logic is a data-layer function (`applyVisitFilters(visits, filters)` — corpus-attested), so the AppBar badge count, the list, and the empty-state diagnosis all derive from one call.

## 4 — Props taxonomy — wiring the three axes

Every component's props fall into five closed categories [D — the contract 07 entries declare against]:

| Category | Carries | Naming | Examples from census |
|---|---|---|---|
| **data** | typed fields from the data layer | noun | `step: VisitStep`, `ledger: LedgerRow[]`, `patientFirst: string` |
| **state** | the controlled half of the lifecycle axis | adjective/noun | `value`, `selected`, `approvals: Record<ConsentId, boolean>` |
| **callback** | intent out (03 lexicon verbs) | `on` + verb | `onSeal`, `onToggleTag`, `onApply`, `onOpenScope` |
| **config** | tokens only — tone/size/variant/mode | token-typed | `tone: Tone`, `variant?: 'soft'\|'solid'\|'quiet'\|'icon'` |
| **slots** | structure placeholders | slot nouns | universals only (master I7): `leading`, `trailing`, `expansion`, `meta` |

A data-layer function passed as a prop (`search(records, query)` — SearchSheet) is a **data** prop: a reference into the data layer, not a sixth category [D].

4.1 **[M]** Interaction axis is NEVER props — hover/focus/press are the component's internal states. A component taking `isHovered` as a prop is malformed.

4.2 **[M/D]** Lifecycle axis ownership follows the record: the component owns its transient lifecycle (working/done of an in-flight action — self-cleaning timers, 02 §4); the parent owns the persisted record state, passed down as **state props** and updated via callbacks. Controlled (`value`/`onChange` — StarPicker) is the default for anything that persists; **optional-controlled** (`open?`, `onToggle?` with internal default — StepRow, census-attested) where a component is useful standalone but lift-able for exclusive groups (one `openId` at the card container).

4.3 **[M]** Data axis arrives as data props; where a component renders across data states, it declares a `dataState` marker prop typed to 02 §1.3 (`'empty' | 'loading' | 'partial' | 'stale' | 'conflict' | 'missing'`) — the component renders each distinctly (02 §1.3 laws); it never guesses from `undefined`.

4.4 **[M]** Notifications report outcomes; they never replace visible state change (Q-row Q8's arc is the state change). An `onNotify`-style callback may exist for ambient reporting (delivered via the ToastHost context, 07a §11) — a component whose ONLY effect is a notify is a dead control (04 §1.4).

## 5 — Lists & streams

5.1 **[M]** Streamed/appended entries get unique ids minted per insertion — `${baseId}-${seq}` from a monotonic counter. Reusing a fixed id pool duplicates React keys and, under layout animations, crashes with an infinite render loop (the corpus's worst crash class — §8).

5.2 **[M]** State updates that touch multiple related slices are ONE atomic `setState` (prepend fresh + clear stale flags in the same pass) — never two chained updates that can render an intermediate lie.

5.3 **[M]** Keys are stable identities, never array indices on reorderable/streamed lists.

5.4 **[C]** Streaming cadence: entries arrive on a timer the component owns, staggered animation per entry (05 §4.5); a "just-added" visual state (Q11) holds until superseded; the update passes through the same data-layer builders (§3.1) so every dependent surface — counts, ribbons, hero stats — moves in the same pass (A8).

## 6 — Files & objects

6.1 **[C]** Attachments are real: hidden `<input type="file">` + ref; the file tile shows real name/size on the icon-tile recipe — never a thumbnail, never a fake button.

6.2 **[M]** Object URLs: created on attach, revoked on replace AND on unmount — every create has a revoke path (leak class, §8). Exports: content → Blob → object URL → programmatic download click → revoke, with the preparing→saved lifecycle (03 bank).

6.3 **[M]** Dates: parsed into day/month/time fields at the data layer; reading order reassembly is presentation (01 §8.5) — the component never slices `"Mar 13, 2:00 PM"` from a raw string.

## 7 — Act resolution & retry

7.1 **[M]** An act's resolution is DATA, never a timer. Arc-bearing controls (LifecycleButton, HoldConfirmButton, ConnectButton) receive the outcome as a controlled `status` input (`'idle' | 'working' | 'done' | 'failed'`) owned by the flow; presentation derives from it (07c §6). A working→done flip that fires on a schedule is a defect — demo simulations drive `status` through composition-declared constants (07e §3.5), declared as simulation data.

7.2 **[M]** Resolution is single-source: for payment, `status` derives from the payment record's lifecycle (02 §5.7); for seal, from the consent record's pending/sealed state (02 §5.3). The control holds no parallel lifecycle of record — its internal timing (press feedback, the done-hold before handback) is presentation.

7.3 **[M]** Timeouts are declared per flow: the flow awaiting resolution owns a timeout constant (data module, §2.3); on expiry it transitions the record to failed with D2 copy — what happened + the way out. A silent spinner past a timeout is a defect (02 §4.4).

7.4 **[M]** Retry re-enters the arc at working: the failed surface's recovery control dispatches the SAME act — no second control lineage. Every failable act declares its failed line in the 03 bank row it uses.

## 8 — The defect-class register

Known crash/defect classes from the corpus, each with its owning law. Mechanically checkable ones are grep/lint targets at build time; all are walkthrough checks.

| Class | Owning law | Owner doc |
|---|---|---|
| Parse-at-render (slicing display strings) | §1.1 | 06 |
| Magic literals in components | §1.2, §3.3 | 06 |
| Duplicate derived facts (two computations of one count) | §3.2 | 06 |
| Module-scope constants referencing component props (import-time ReferenceError) | §2.3/§3.3 — constants live beside the helpers that use them; render code derives inline | 06 |
| Missing named imports from data modules | §2.2 write-time rule | 06 |
| Side effects fired inside state updaters or render | compute next state, set it, then fire | 06 |
| Duplicate keys in streamed lists (infinite-render crash) | §5.1 | 06 |
| Unrevoked object URLs | §6.2 | 06 |
| Lowercase component-typed props rendered as `<icon />` | component props holding components are PascalCase-destructured | 06 |
| Config-driven mega-components (`ReactNode` slot cards) | master I7 | master |
| Timer-based resolution flips (working→done on a schedule) | §7.1 | 06 |
| Sheets collapsed by their own positioning wrapper | mount sheet directly under AnimatePresence with key | 08 |
| Kit components on wrong-surface contrast | 01 §7.7 | 01 |
| `React.createElement`-style dynamic tag construction | never — components are static identifiers | 06 |

## 9 — Rule index (MUST summary)

Parse once at the data layer · clean typed fields in · derived facts as functions of state · derivations return classification, never tone · single-source derivation · zero magic literals · constants beside helpers · shared helpers have one home · props in five closed categories · interaction axis never props · controlled by default, optional-controlled for lift-able · dataState marker typed to 02 · notify never replaces state · unique minted ids · atomic updates · stable keys · real file inputs · every object URL revoked · no module-scope prop references · no side effects in updaters · act resolution is data, never a timer.

## 10 — Open items

| Item | Status | Owner |
|---|---|---|
| Debounce interval confirmation (180ms corpus-attested) | SEALED [C] — vetoable | user |
| dataState prop naming convention | SEALED [D] — vetoable | user |
| Demo seed migration plan (dirty strings → clean typed modules) | OPEN | build phase |
| Event/telemetry shape if the real project needs instrumentation | OPEN | real project — explicitly out of demo scope |
