# 07c — COMPONENT CATALOG: CONTROLS & INPUTS

**Part 3 of 5** of the component catalog. **Owns completely:** every catalog pattern that takes input — fields, toggles, selections, tabs, action buttons, the dial, steppers, pickers, search surfaces.
**Status:** v1.0 — proposed. Ratification seals as R23.
**Provenance:** [R]/[C]/[M]/[D] as before. **M** = MUST · **S** = SHOULD.

---

## 1 — Field ★

**Identity** — behavior-bearing (validation lifecycle D1) · universals · THE house input row — credentials, forms, settings (P01-attested).
**Anatomy** [C §12 exact] — one composed white card holds all fields; each field is a row: tinted icon Tile left (`h-10 w-10 rounded-xl`) · content column: micro-label above an inline bold input value (the input IS the value typography) · trailing control right (eye toggle on the same tile recipe). Fields are REAL inputs: typed state, `htmlFor`/`id`, `aria-invalid`, placeholders on the value's type scale at `/25` — display rows that fire notifications are banned (AP27).
**Props** — data: `label`, `icon`, `unit?`, `autocomplete?`, `inputMode?` · state: `value` (controlled), `invalid?: string` (the hint text; absent = not invalid) · callback: `onChange`, `onBlur?` · config: `type` (text/password/number/textarea), `placeholder?`, `disabled?` + reason · slots: `trailing?` (eye toggle class).
**State map** [R — D1 lifecycle]:

| State | Tile hue | Composition | Copy intent |
|---|---|---|---|
| empty | neutral | input idle, placeholder | — |
| invalid | rose | hint line appears — ONLY in this state | the specific fix, not "invalid" |
| valid | emerald gradient tile | the ONLY success signal | — |

- **[M]** The emerald gradient tile is the only success expression on a field — no check badge, no strip (one status statement).
- **[C/M]** Password fields add a 3-segment strength meter (rose/amber/emerald by score) on its own full-width line, aligned to the text gutter, rendered only once the field has content.
- **[M]** Multi-field gating derives per 04 §5.4: the strip and the CTA gate derive from ONE validity derivation.
**Declaration** — Q-rows: Q1 (trailing controls), Q6 · keyboard: standard input focus, eye toggle tabbable (`aria-label="Show password"`, `aria-pressed`) · a11y: `aria-invalid` + hint wired via `aria-describedby`; label always visible (never placeholder-as-label) · gating: disabled carries reason.
**Composition** — fields compose into credential cards (07e auth family); validation runs on blur/submit — never per-keystroke shaming [D]; the data layer validates (06 §1), the field renders the verdict.

## 2 — OtpInput

**Identity** — behavior-bearing · universals · segmented one-time-code entry (P03-attested).
**Anatomy** [C/M] — N segmented cells, monospace/tabular digits; auto-advance on entry, backspace retreats, paste distributes; filled cells tint family; resends carry a ticking validity countdown (zero flips state + resend path, 02 §4.4).
**Props** — data: `length`, `resendAfter?` · state: `value` · callback: `onChange`, `onComplete`, `onResend` · config: `tone`, `invalid?`.
**State map** — empty → filling → complete → invalid (shake/fail tint + retry) — invalid reuses D1's hint law.
**Declaration** — Q-rows: Q1, Q6 · keyboard: full numeric entry, paste, arrows between cells · a11y: single labeled input semantics (screen readers hear ONE code field, not N boxes) [D implementation note].
**Composition** — verification journeys only; never a generic digit splitter.

## 3 — Switch

**Identity** — behavior-bearing · atoms-tier · binary preference toggle (reversible settings).
**Anatomy** [M — commit-attested] — track `h-7 w-12`, knob with spring travel; ON = family fill (state hue of its surface — emerald ONLY where the setting means "active/completed", otherwise the surface family), OFF = neutral wash.
**Props** — data: `label`, `description?` · state: `checked` (controlled) · callback: `onChange` · config: `tone`, `disabled?` + reason.
**State map** — off → on (spring, `pop` role); no working state — switches apply instantly or they're forms.
**Declaration** — Q-rows: Q1, Q6 · keyboard: Space toggles · a11y: `role="switch"` + `aria-checked`, label paired.
**Composition** — preference/filter surfaces. **Legal acts never ride a Switch** — consent scopes use pending/seal mechanics (02 §5.3: AP71); a switch that instantly flips a sealed legal record is a defect.

## 4 — Checkbox

**Identity** — behavior-bearing · atoms-tier · explicit acceptance / multi-select acts.
**Anatomy** [C §12] — `rounded-xl` squircle in the tile family (never a circle — 01 §5.2); check appears with a scale-in; consent rows pair it with the expandable document row (tinted FileText tile, "Versioned document" micro-label) in a contained panel.
**Props** — data: `label`, `document?: {title, version}` · state: `checked` (controlled) · callback: `onChange` · config: `tone`, `disabled?` + reason.
**State map** — unchecked → checked; **consent is NEVER pre-checked** [R — AP38]: pending reads amber pending-strip, accepted flips the confirmation strip to emerald "written to your consent record" [C].
**Declaration** — Q-rows: Q1, Q6 · keyboard: Space · a11y: real `<input type="checkbox">` semantics or `role="checkbox"` + `aria-checked`; visible label always.
**Composition** — consent blocks (binding — the check starts the seal flow, never IS the seal), multi-select lists; distinct from Switch by weight: checkbox = acts/selections, switch = preferences.

## 5 — SegmentedTabs ★

**Identity** — behavior-bearing · universals · THE tab/filter pill bar — page sections, list filters, sheet modes.
**Anatomy** [C §4.8 exact] — pill tab bar; active pill slides via layout animation (layoutId); per-filter counts derived from data (live, never hardcoded — 06 §3.2); `role="tablist"/"tab"` + `aria-selected`.
**Props** — data: `tabs: {id, label, count?}[]` · state: `activeId` (controlled) · callback: `onChange` · config: `tone` (drives WHICH per-tone spring — 05 catalog tabA/B/C per family [C — keep-three sealed]), `size?` · slots: none.
**State map** — static presentation over controlled state; the pill morph IS the state change (05 §1.1).
**Declaration** — Q-rows: **Q3** (swipe-paged: horizontal drag switches page, panels pre-staged, dragElastic ~0.18, no momentum, direction-locked) · Q1, Q6 · keyboard: ArrowLeft/Right rove (wrap optional [D: no wrap]), Home/End · a11y: full tablist semantics; counts announced in the label ("Drafts, 3").
**Composition** — pairs with paged panels owned by the screen; per-mode state inside panels persists per mode (Q10 — reopening a tab shows its saved state [C]); never used for record selection (that's OptionRow, AP56); count derives from the same filter call as the list (one source).

## 6 — LifecycleButton ★

**Identity** — behavior-bearing (the action arc) · universals · THE consequential-action control — every idle→working→done surface. Six wild census implementations collapse here [M — ConnectButton, StaticButton, IconLifecycleButton ×2, QuietLifecycleButton, ShareButton inline].
**Anatomy** [C §8 exact] — idle: family fill, label names the effect with real data (03 §8) · working: spinner + `cursor-wait` + muted fill (`busy` token, 01 §7.3) + inputs locked · done: solid emerald + check + done label ("Details saved") · timers staged through a self-cleaning ref array; navigation waits for done (~1.4–1.6s hold) [C].
**Props** — data: `label`, `workingLabel?`, `doneLabel?` (03 bank patterns; working/done narrate the SAME verb) · callback: `onComplete` (fires the act; the button owns the arc timing), `onDone?` (fires after done lands — navigation hook) · config: `variant: 'solid' | 'soft' | 'quiet' | 'icon'` (census-attested union), `tone` (idle family), `disabled?` + reason (gating renders BEFORE idle: the reason is the label, 04 §5).
**State map** [R — 02 §4.1]:

| State | Fill | Copy | Exit |
|---|---|---|---|
| gated | muted + `cursor-not-allowed` | the reason | — |
| idle | family fill | "{Verb} {n} {thing}" | tap → working |
| working | `busy` /50 + spinner | working line | act resolves → done OR failed |
| done | solid positive + check | done line | auto → handback (Q8b where sheet-hosted) |
| failed | risk + the way out | failed line | retry → working |

**Declaration** — Q-rows: Q1, Q6, **Q8** (this IS the arc's control), Q13 (haptic on binding done) · keyboard: Enter/Space; working sets `aria-busy`; done announces · a11y: `aria-disabled` in gated/done (done stays disabled — status derives from the persisted record, 04 §5.3) · gestures: tap only.
**Composition** — footer CTAs (SheetShell zone 3), hero actions, inline record buttons; the FAILED arc renders in-place (risk + way out) — never a toast-only failure (04 §1.4). Variants are one export with a union — NOT four components (I7).

## 7 — ConnectButton

**Identity** — behavior-bearing · universals · the connect arc (call/contact actions): `idle → connecting → connected` [C §13 census: two implementations reconcile HERE — C7 ruling].
**Anatomy** — LifecycleButton's arc with connect semantics: connecting = spinner, connected = check + "Connected" — built once, `light` tone prop, reused across hero and sheet variants on the same screen [C].
**Props** — data: `icon`, `label`, `workingLabel`, `doneLabel` (census contract preserved) · callback: `onConnect`, `onConnected?` · config: `variant: 'soft' | 'solid'`, `tone`, `notify?: {title, body}` (ambient report AFTER the state change — never instead of it).
**State map** — idle → connecting → connected (timers self-clean; a second tap re-runs or hands off per composition).
**Declaration** — Q-rows: Q1, Q6, Q8 · a11y: `aria-busy` while connecting; connected announces.
**Composition** — caregiver contact actions; notification is an outcome report, the visible connected state is the product.

## 8 — HoldConfirmButton

**Identity** — behavior-bearing · universals · the binding-ceremony control (04 §3.4's decision made concrete).
**Anatomy** [D] — a LifecycleButton whose trigger is HOLD: press and hold 600ms, a ring fills around the icon/label, haptic on completion (Q13), then the binding arc proceeds (working → done). Release early → spring back, nothing happens. The label states the consequence ("Hold to withdraw consent") — the gesture declares itself, never hidden.
**Props** — LifecycleButton's contract + `holdMs?` (default 600) · `onComplete` fires only on completed hold.
**State map** — idle → arming (ring fills) → working → done (binding arc §3.3); cancel = release.
**Declaration** — Q-rows: Q1, Q6, Q8, Q13 · keyboard: OPEN — Enter-hold alternative undecided (04 §8); until sealed, keyboard path = Enter arms, Enter-and-hold not required [D interim] · a11y: `aria-description` states the hold mechanics.
**Composition** — ONLY the highest-cost irreversible acts (04 §3.4): withdrawal, threshold payments. Medium verbs never hold (over-ceremony trains users to stop reading).

## 9 — DialInput ★

**Identity** — behavior-bearing · universals · the calibration exemplar — the tactile bar every interactive entry is judged against (R8).
**Anatomy** [R8 exact] — horizontal watch-dial of spokes; drag spins with detent increments; **release velocity projects inertial spin** — deceleration, spring snap to nearest detent (mechanical, buttery); odometer value at 38px hero scale; center detent bar stretches while dragging, hue derives emerald→amber at max stretch (whole-surface expressiveness, E7); edge fades; rubber-clamp at bounds.
**Props** — fully controlled, zero domain knowledge [R8]: `value`, `onChange`, `min`, `max`, `step`, `label`, `unit`.
**State map** — rest → dragging (bar stretches, hue derives) → settling (inertial decay → detent snap) → rest.
**Declaration** — Q-rows: Q5 (rubber-clamp, edge fades, grab cursor), Q6 (keyboard +/- steps), Q4 (odometer) · gestures: horizontal drag, direction-locked · a11y: `role="slider"` + `aria-valuemin/max/now`, arrows step.
**Composition** — duration/quantity dials (07e scheduling); **the DNA bar**: every 07c/07b interactive entry must survive the DialInput question — does release feel mechanical, does the surface express the interaction, does the keyboard work, does it clamp? An entry that fails the bar does not ship.

## 10 — Stepper

**Identity** — structure (+ behavior if it opens detail) · universals · dot-rail progress.
**Anatomy** [C §13 exact] — built on a GRID, never flex-with-inline-connectors: rail absolutely positioned at exact first/last dot centers (`left/right: 100/n %` for n steps); dots in one `grid-cols-n` row; labels in a second matching `grid-cols-n` row beneath; progress segment width derives from done-count and TERMINATES on a dot center. Flex chains misalign dots, truncate labels ("ARRIV…"), drift as labels wrap — banned.
**Props** — data: `steps: {label}[]`, `doneCount` · callback: `onOpen?` (if it opens detail) · config: `tone`.
**State map** — static (doneCount derives from data — one source with the steps' states).
**Declaration** — Q-rows: Q1, Q6 (when it opens detail) · a11y: when tappable, the whole stepper is a button with `aria-label` ("Visit progress, tap for details") + header row stating it + chevron [C]; else `aria-hidden` decorative? NO — progress is data: announce "step 2 of 5" minimum [D].
**Composition** — dispatch sequences, visit progress; pairs with StepList (07b) — the stepper is the summary, the list is the record; one fact, one place per surface.

## 11 — TimeSheet (pickers)

**Identity** — behavior-bearing · universals · time/slot selection — THE OptionRow composition reference [C §15.4: "TimeSheet is the reference"].
**Anatomy** — OptionRow list of slots (label + consequence sub-line: "Morning · 45 min · 2 slots left"); selection = radio semantics; slot states derive from data (open/full/past); reschedule surfaces transform slots live — picking a new slot previews the change against the sealed series before commit [C — reschedule redesign evidence].
**Props** — data: `slots: {id, label, consequence?, state}[]` · state: `selectedId` · callback: `onSelect`, `onConfirm` · config: `tone`.
**State map** — idle → selected (preview strip: what changes) → confirm via LifecycleButton.
**Declaration** — Q-rows: Q1, Q6 · a11y: radiogroup; full/past slots disabled WITH reason ("Full").
**Composition** — booking/scheduling (07e); unavailable slots are disabled + reasoned, never hidden — the user sees why a slot is gone.

## 12 — SearchSheet

**Identity** — behavior-bearing · universals · sheet-hosted search (04 §3.3 + SheetShell composition).
**Anatomy** [C §4.8 exact] — SheetShell three zones: input FIXED in header zone (never scrolls) · results scroll in the middle · privacy/static note pinned in footer. Designed empties for idle ("Type to search") and no-results (cause-diagnosing, Q9). Results grouped by the SAME grouping as the main list; tapping a result closes the sheet and opens that record inline [C].
**Props** — data: `search(records, query)` (data-layer function, 06 §3.4), `groupings` · callback: `onPick(record)` · config: `placeholder`, `tone` · debounced copy per 06 §3.4 (~180ms).
**State map** — idle → searching → results | empty(cause) — counts derive from one call.
**Declaration** — Q-rows: Q2 (inherited via SheetShell), Q9, Q6 · keyboard: focus INTO input on open, Esc closes, arrows + Enter pick · a11y: combobox semantics [D], results announced with group context.
**Composition** — records, documents, professionals (07e); the main list and search results MUST render through the same row components — no second presentation of the same record.

## 13 — Catalog-wide rules (07c)

- **[M]** Real inputs only — no display rows posing as fields, no fake file buttons, no dead toggles (AP27/50).
- **[M]** Controlled by default (06 §4.2); every control's value lives with its owner; sheets own transient form state, screens own persisted records.
- **[M]** Weight-matched controls: Switch = preference · Checkbox = act/selection · OptionRow = record choice · LifecycleButton = consequential commit · HoldConfirmButton = binding ceremony. Substituting down a weight class (a switch sealing consent) is a defect.
- **[M]** Every control passes the DialInput bar (§9) at walkthrough.

## 14 — Open items (07c)

| Item | Status | Owner |
|---|---|---|
| DialInput spring constants | OPEN | build phase (R8 seed carries) |
| HoldConfirmButton keyboard path | OPEN [D interim: Enter arms] | walkthrough |
| Field validation timing (blur/submit — proposed) | SEALED [D] — vetoable | user |
| OtpInput single-input vs N-box semantics | SEALED [D: one semantic field] — vetoable | user |
| SegmentedTabs arrow wrap | OPEN [D: no wrap] | walkthrough |
