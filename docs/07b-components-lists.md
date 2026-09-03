# 07b — COMPONENT CATALOG: ROWS, LISTS & DISCLOSURE

**Part 2 of 6** of the component catalog. **Owns completely:** every catalog pattern that presents an ordered collection — rows, expandable rows, option rows, timelines, rails, accordions (exclusive groups), empty states, streamed-list hosts.
**Status:** v1.0 — proposed. Ratification seals as R22.
**Provenance:** [R]/[C]/[M]/[D] as before. **M** = MUST · **S** = SHOULD.

---

## 1 — Row ★

**Identity** — behavior-bearing (press, optional disclosure) · universals · THE house list entry — census-attested in every domain (feeds, visits, meds, offers, records). The most composed-with pattern in the corpus.
**Anatomy** [C/M — canon §4.1 exact] — fixed-width icon Tile left (`h-8` small rows, `h-10` header rows) · flexible content column (`flex-1 min-w-0`, `pt-0.5` on h-10) · fixed meta column right (`flex flex-col items-end`: chip + chevron row, then TimeChip beneath). Title row: title `flex-1 min-w-0 truncate` · body wraps FULL content-column width on its own line(s). Content column spacing `gap-3`, rows `py-3`.
**Props** — data: `title`, `body?`, `time?`, `icon?` · state: `open?`, `selected?` (optional-controlled, 06 §4.2) · callback: `onToggle?`, `onPress?` · config: `tone` (state hue — the row's chip carries the state; a neutral tile may carry TYPE), `variant: 'surface' | 'inset' | 'live' | 'tint'` (census-attested defaults) · slots: `leading?` (overrides tile), `trailing?` (meta column extras), `expansion?` (typed union per §2 — renders through ExpandRow's mechanics; ReactNode banned).
**State map** [C]:

| State | Tone carrier | Composition | Copy intent |
|---|---|---|---|
| rest | config tone | base | per content |
| pressed | — | whileTap 0.985 | — |
| expanded | tone + wash | expansion panel (full-width, §2) | per expansion |
| selected | family fill | family fill chip (never emerald — selection ≠ success, 01 §7.6) | per content |

**Declaration** — Q-rows: Q1, Q6, Q9 (when hosting empty), Q12 (live variants) · gestures: tap (press or toggle — never both), swipe NOT default (rows don't page; action-swipe is a 07e decision, must pass 09 admission) · keyboard: row is a button; Enter/Space; `aria-expanded` when expandable · a11y: `role="button"` where it acts, icon `aria-hidden`, chip states `aria-label` when icon-only · gating: locked rows (02 §4.3) render muted + `cursor-not-allowed` + reason.
**Composition rules** — one status statement per row (tile = type OR chip = state, never both saying state) [C]; body text never wraps around chips/times [C]; rows compose FactRows/expansions inside their expansion slot, never hand-rolled meta stacks. **A Row never contains another interactive element** — the whole row is one control; nested controls need the expansion slot with their own semantics.

## 2 — ExpandRow

**Identity** — behavior-bearing · universals · the disclosure pattern: preview/anchor row that reveals NEW information inline.
**Anatomy** [C] — anchor row (Row anatomy) + contained expansion panel: `rounded-2xl bg-ink/[0.03] p-3` (light) at FULL card width — never deep-indented [C]; rotating chevron (`rotate 180`, `base` duration) — visible affordance mandatory [C, AP80]; `aria-expanded` + stated promise ("Tap an entry for its actor detail") [C §15.13].
**Content laws** [C] — expansion reveals NEW information, never a repeat of the row. Structure inside: preview/anchor element first, then meta rows sharing ONE gutter (same icon-container width + gap-3 — vertical alignment law, 01 §3). Designed artifacts: verbatim notes as serif quotes in a flat dark mini-panel ("Verbatim" chip); incident narratives as hue-matched flat mini-shells with outcome strip. NO orbs/shadows inside expansions [C].
**Props** — data: anchor fields + `expansion: typed structure` (NOT ReactNode — expansions are typed composites: `{vitals?[], note?{text,author,at}, narrative?{...}, metaRows?[]}`; the union extends only by 09 admission — a recurring fourth shape is an admission, never a ReactNode escape hatch) · state: `open?` · callback: `onToggle?` · config: `tone`.
**State map** — `closed → open` (height 0→auto + opacity, `entrance` easeInOut — 05 §4.1/4.2).
**Declaration** — Q-rows: Q1, Q6 · gestures: tap anchor · keyboard: Enter/Space toggle, Esc closes · a11y: button semantics on anchor, `aria-expanded`, `aria-controls`.
**Composition** — Row's `expansion?` slot DELEGATES here: ExpandRow is the expansion mechanism, not a competing row [D]. The canonical hosts: CareDeliveredCard (CARE_STEPS), StepRow (visit steps), record rows, incident narratives. **Bottom sheets are for global/screen actions — row inspection expands inline where the row lives** [C §4.4]. An expansion that only repeats the row is deleted.

## 3 — OptionRow

**Identity** — behavior-bearing (selection) · universals · THE house radio row (sheets, pickers, preference lists).
**Anatomy** [C §15.4 exact] — FULL-WIDTH row (never segmented half-width buttons, never chevron navigate-rows): leading icon Tile (goes family gradient/fill when active) · label + consequence sub-line · dedicated Radio glyph component right (§5) — never a chevron, never a check badge substituting for the radio glyph.
**Props** — data: `label`, `consequence?`, `icon?` · state: `selected` (controlled — group owns) · callback: `onSelect` · config: `tone`, `disabled` + reason.
**State map** — rest → selected (tile fill + glyph) → disabled (muted, reason).
**Declaration** — Q-rows: Q1, Q6 · gestures: tap · keyboard: arrow rove within `radiogroup`, Enter/Space select · a11y: `role="radio"` + `aria-checked`, group `role="radiogroup"` + `aria-label`; disabled carries reason.
**Composition** — selection lists in sheets are ALWAYS OptionRow sets; segmented alternatives only for tone-family tab switching (07c SegmentedTabs), never record selection (AP56). Selection tint = the surface's family hue, never emerald [R].

## 4 — StepList / StepRow

**Identity** — behavior-bearing (per-step state, disclosure) · universals · ordered step presentation with per-step lifecycle (the visit/dose arc renderer).
**Anatomy** [C §15.8 — state-branched rows] — container on a shared left rail; rows render their STATE as different COMPOSITIONS: `todo` rows are quiet static entries (neutral chip, NO accordion) · `done` rows are full ExpandRows (state-hued tile, status chip, TimeChip, readings panel + confirmation strip in expansion) · `active` row is the emphasized entry (live dot, family wash).
**Props** — data: `steps: Step[]` (generic contract: `{id, label, detail?, state, readings?, recordedAt?}` — domain instances (`VisitStep`, `DoseStep`) name it at the data layer per 06), `activeStep?` · state: `openId?` (exclusive at container) · callback: `onToggleStep?` · config: `tone`.
**State map** — per-row state from data (`todo/active/done` — the 02 dose/visit arcs); container is stateless beyond openId.
**Declaration** — Q-rows: Q1, Q6, Q11 (when steps stream in) · a11y: ordered list semantics; per-row per ExpandRow.
**Composition** — sealed/derived counts derive via 06 §3.1 helpers (`sealedStepsOf(steps)` — corpus-attested); the container never recomputes row states. TimeChip on done rows, live dot on active.
**Open** — whether `active` step opens its expansion automatically — OPEN [D proposal: no; user taps].

## 5 — Radio (glyph)

**Identity** — structure · atoms · the selection glyph — a dedicated primitive, never a substituted check badge or chevron.
**Anatomy** [C] — circle outline → family fill + inner dot/check when selected; `h-4 w-4`-class on rows, scales with surface.
**Props** — config: `selected`, `tone`, `disabled` · data: none.
**Declaration** — non-interactive itself (the row is the control); `aria-hidden` (the row carries `aria-checked`).
**Composition** — only with OptionRow (or a 09-admitted sibling); never on navigate-rows.

## 6 — MiniTimeline

**Identity** — structure · universals · ordered-event rail (incident progress, dispatch sequence, notification history).
**Anatomy** [C §4.3] — left rail: `h-5 w-5` cell with `h-2.5 w-2.5` dot; live dots get `animate-ping` halo (pulse = live, 05 §4.5); `w-px flex-1` connector, omitted on last item; row: title left, timestamp right (TimeChip), detail + tag second line. Connector + dot tint follow the ROW's state hue [C].
**Props** — data: `entries: {title, time?, detail?, tone, live?}[]` · config: none · slots: none.
**State map** — static (tones arrive per entry via data).
**Declaration** — non-interactive by default; entries MAY be tap targets via 09 admission (chart-cells law: same record state as list rows, 01 §10.4) · a11y: ordered list; live entries announce.
**Composition** — events ordered oldest→newest unless the story reads better reversed (07e decides per composition); tint follows state, one dominant per card (02 §3.5).

## 7 — ContinuityBar (LedgerBar)

**Identity** — structure (data-encoding) · universals · the accumulating-sequence visualization (ledger entries, visits, laps).
**Anatomy** [C §15.12] — ONE unified rounded track (`rounded-xl bg-white/[0.06]`); flush segments ARE the events, filling oldest→latest on entrance (scaleX origin-left, staggered — accumulation expressed, 05 §4.1); state hue per segment; glow + brightness on the LATEST; day/state labels in a matching axis row beneath.
**Props** — data: `segments: {id, label?, tone, live?}[]` · callback: `onSegmentTap?` (opens the same record state as list rows — every entry point lands on the same record, 01 §10.4) · config: none.
**State map** — static (tones per segment via data).
**Declaration** — Q-rows: Q1 (segments tappable) · a11y: `aria-label` summarizes the sequence ("5 visits, latest today"); segments announce tone meaning when tappable.
**Composition** — segments encode REAL data — a bar comparing identical values is decoration and is deleted (01 §10.4); never restates the list it accompanies (one fact, one place — the bar IS the shape of the list's fact).

## 8 — EmptyState

**Identity** — structure · universals · cause-diagnosing empty presentation (02 §3.6 is this component's law).
**Anatomy** [C/M — EmptyTabState census] — icon (cause-specific) · headline (≤5 words) · one sentence naming the cause · full-width remedy button ("Reset search" / "Clear all filters" / "Request care"). Each cause = own icon, copy, action (Q9).
**Props** — data: `cause: 'search' | 'filters' | 'none'`, `query?` · callback: `onRemedy` · config: `tone` · (copy derives from cause via 03 §9 bank — a component taking pre-built copy for a known cause is malformed).
**State map** — static per cause.
**Declaration** — Q-rows: Q9 (this IS it) · Q1, Q6 (remedy) · a11y: headline is the heading; remedy announced.
**Composition** — lists host it inside their body zone; a list without a cause-typed empty path is incomplete (Q9).

## 9 — StreamList (the streamed-list host)

**Identity** — behavior-bearing · universals · owns the streaming mechanics every live list inherits (Q11 + 06 §5 + 05 §4.5 codified as ONE component).
**Anatomy** — composed list body; entries render via a typed render contract (NOT ReactNode slots — a typed `entry` union the host switches on, per I7).
**Mechanics [M — crash-class codified]** — unique ids minted per insertion (`${baseId}-${seq}`, monotonic) · ONE atomic update per arrival (prepend fresh + clear stale flags in the same pass — never chained setStates) · staggered entrance per entry (opacity+y+scale) · "just-added" state (tint + live chip) until superseded · stream timer owned by the host (self-cleaning); key stability guaranteed by construction.
**Props** — data: `entries` (typed union), `streaming?: boolean` · callback: `onEntryPress?` · config: `tone`, `cadence?` (demo constant).
**State map** — `idle → streaming → settled` (host lifecycle for demo simulation); entries carry their own tones via data.
**Declaration** — Q-rows: Q11 (this IS it), Q1, Q6 · a11y: `aria-live=polite` on new entries (assertive for person-safety, 02 §5.4) · gestures: tap entries (same record law).
**Composition** — hosts ledger streams, notification feeds, live visit logs (07e); never duplicates the mechanics — a 07e composition hand-rolling ids/atomic-prepends is a defect (behavior owned once, lowest layer).

## 10 — Catalog-wide rules (07b)

- **[M]** Disclosure is inline-first: expansion at the row (ExpandRow); sheets are for global actions — the 02 §4.1 arc + SheetShell for acts, not inspections [C].
- **[M]** Exclusive accordions: when multiple expandables share a card, ONE `openId` at the container — opening one closes the rest [C §14.6].
- **[M]** Every list answers "empty with cause" (Q9) and "streaming with just-added" (Q11 where applicable).
- **[M]** Rows never nest interactive elements; expansions never repeat their row; option selection never emerald; glyphs never substitute each other.

## 11 — Open items (07b)

| Item | Status | Owner |
|---|---|---|
| Action-swipe on rows (delete/archive) | OPEN — likely banned on safety surfaces | 09 admission |
| Active step auto-expansion | OPEN [D: no] | walkthrough |
| StreamList cadence default | OPEN — demo constant | build phase |
| MiniTimeline entry direction per story | OPEN | 07e compositions |
