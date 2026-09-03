# 07d — COMPONENT CATALOG: DATA DISPLAYS

**Part 4 of 5** of the component catalog. **Owns completely:** every catalog pattern whose job is stating facts — chips, pills, fact rows, quotes, strips, notes, meters, rings, tiles, stat bands, live dots.
**Status:** v1.0 — proposed. Ratification seals as R24.
**Provenance:** [R]/[C]/[M]/[D] as before. **M** = MUST · **S** = SHOULD.

---

## 1 — Tone-carrier taxonomy [D — the new decision]

A fact's weight decides WHICH primitive states it. One status statement per surface (01 §9.3) becomes checkable by this rule:

| Weight of the fact | Carrier | Example |
|---|---|---|
| the surface's dominant meaning | shell / card accent / fill (01 §7.3) | the visit card's in-progress state |
| a discrete state on a row/surface | **StatusPill** (solid, dark surfaces) or **Chip** (tinted, light surfaces) | "Overdue", "2 of 5 sealed" |
| a point-in-time | **TimeChip** | "2:00 PM" |
| a labeled value | **FactRow** / StatCell | "Amount · ₹2,400" |
| a trend or progress | **Meter / Ring** | adherence 4 of 7 |
| a spoken artifact | **QuotePanel** | caregiver's verbatim note |
| ambient guidance or aftermath | **NoteStrip** / **StatusStrip** | "what happens now" |

- **[M]** Never two carriers for one fact: a paid fact is a chip OR a tile mark OR a stamp — never stacked expressions (AP28/29).
- **[M]** The dominant meaning never demotes to a chip, and a chip never promotes to a shell (02 §3.5 as component law).

## 2 — Chip

**Identity** — structure · atoms · tinted state chip for light surfaces (01 §7.3 realization).
**Anatomy** [C] — `rounded-full px-2.5 py-1`, meta size, bold; optional LiveDot (dot=live, static=settled); optional icon (Check for done-facts).
**Props** — data: `label` (≤3 words, 03 §3) · config: `tone`, `mode`, `dot?`, `live?`, `icon?` · slots: none.
**State map** — static (tone IS the state statement; arriving via config from the owner's map).
**Declaration** — non-interactive; icon-only chips carry `aria-label` naming the state [C]; tone announced in label when meaning-bearing ("Overdue" reads as is; a red dot alone reads via label).
**Composition** — light surfaces; row meta columns; NEVER on dark shells (07d §7 contrast law — StatusPill there).

## 3 — StatusPill

**Identity** — structure · atoms · the ONLY status expression on dark shells [C — AP53: translucent chips lose contrast, banned].
**Anatomy** [C] — SOLID `bg-{hue}-300` fill, dark ink (`#04241A`-family), optional pulsing dot (live); meta size bold.
**Props** — data: `label` · config: `tone`, `live?` · slots: none.
**State map** — static; the pulse is the live signal.
**Declaration** — a11y: live state announced via the dot's meaning ("in progress") in `aria-label`.
**Composition** — PageHero shells, dark cards; never on light surfaces (Chip's home) — the two are one family split by mode, not two concepts [D].

## 4 — TimeChip

**Identity** — structure · atoms · timestamps, one primitive everywhere [C — AP82: never hand-rolled timestamp pills].
**Anatomy** [C] — `rounded-full px-2 py-0.5`, meta, bold, tabular-nums; light variant (neutral wash + ink) and dark variant (`bg-white/[0.08]` + light text) — built once per mode, never re-derived per card.
**Props** — data: `label` (data-layer formatted, 06 §6.3) · config: `mode` · slots: none.
**State map** — static.
**Declaration** — a11y: announces as the formatted datetime (not the raw string).
**Composition** — every surface; a timestamp rendered as anything else is a defect (AP82).

## 5 — FactRows

**Identity** — structure · atoms-tier · label/value pairs — the universal replacement for leader dots [C].
**Anatomy** [C] — `flex items-baseline justify-between gap-3` per row: micro-label left (`shrink-0`) · bold right-aligned value (`min-w-0`, truncate only if genuinely bounded); rows stacked `gap-2.5`. Light + dark variants.
**Props** — data: `rows: {label, value}[]` (typed, cell-sized — AP62) · config: `mode`, `tone?` (value accent per row via data `intent?` — the vitalIntent pattern [M]) · slots: none.
**State map** — static; per-row intent arrives via data.
**Declaration** — non-interactive; a11y: each row reads "label, value".
**Composition** — summaries, sheets, expansions; a fact needing explanation gets a NoteStrip, never a longer value string (long-content rule).

## 6 — StatStrip / StatBand

**Identity** — structure · atoms-tier · the summary strip inside cards and the hero band — ONE structure, two scopes (AP6's law as a component).
**Anatomy** [C] — dark strip: `rounded-2xl bg-[#0B231C] px-4 py-3(–4)`, label above value, white values, `{hue}-100/xx` labels; max TWO stat columns side by side at phone width, or ring + stacked stats; a third metric becomes a full-width footer strip inside the panel (`bg-white/[0.04]`). Hero variant (PageHero band): 20px tabular values, micro-labels beneath, shared left-aligned baseline on a grid — never boxed tiles, never vertically-centered columns, never `divide-x`.
**Props** — data: `stats: {label, value, tone?}[]` (max 2 inline; 3+ MUST use the footer-strip composition) · config: `mode`, `variant: 'strip' | 'band'` · slots: none.
**State map** — static.
**Declaration** — non-interactive; values announce with labels.
**Composition** — "three columns + a ring on one line" is THE cardinal sin [C] — this component's API makes it unrepresentable (the union rejects a third inline stat rather than rendering it badly).

## 7 — QuotePanel

**Identity** — structure · universals · verbatim spoken artifacts (caregiver notes, feedback quotes).
**Anatomy** [C — QuotePanel census-attested] — flat dark mini-panel (inside expansions: NO orbs/shadows — 07b §2), serif quote typography, attribution row (initials + name + TimeChip), optional "Verbatim" chip.
**Props** — data: `quote`, `author: {initials, name}`, `at?`, `verbatim?: boolean` · config: `mode` · slots: none.
**State map** — static.
**Declaration** — non-interactive; a11y: `blockquote` semantics; attribution reads with the quote.
**Composition** — inside expansions (CaregiverNoteCard pattern), report surfaces (07e); quotes are REAL recorded text — a paraphrase in a quote panel is a content defect (03).

## 8 — NoteStrip

**Identity** — structure · universals · ambient guidance, aftermath, context — the explanation home (the long-content rule's surface).
**Anatomy** [M — commit-attested] — full-width tinted strip (family wash), icon tile, body wraps on its own lines; optional trailing chip (two-word state only).
**Props** — data: `body` (1–2 short sentences, 03 §3), `trailingState?` · config: `tone`, `mode` · slots: none.
**State map** — static.
**Declaration** — non-interactive; a11y: reads as a unit.
**Composition** — explanations NEVER live in pills, row meta, or beside other content — they live here or in EmptyState copy (03 §3); a note strip never duplicates a chip's fact (one fact, one place).

## 9 — StatusStrip

**Identity** — behavior-bearing (mounted pulse, dismissible) · universals · the state-outcome strip — confirmation aftermath and standing states ("what happens now" panels).
**Anatomy** [C/M — commit-attested hardening] — full-width strip, whole-surface tone per state (Mode A/B aware), role=status `aria-live=polite`, optional dismiss (Esc-guarded, `!dismissible` respected, mounted-once emit).
**Props** — data: `body` · state: `visible` (owner-controlled) · callback: `onDismiss?` · config: `tone`, `mode`, `dismissible?`.
**State map** [M — the hardened exemplar] — `visible (mounted pulse) → dismissed`; tone per state via the owner's map; AnimatePresence fade/slide in.
**Declaration** — Q-rows: Q1 (dismiss control), Q6 (Esc) · a11y: `role="status"`, polite announcement — outcomes announce once, not on every re-render.
**Composition** — post-arc confirmation (02 §4.1 done), standing-state explanations; never replaces the LifecycleButton's done composition — it accompanies it.

## 10 — Meter

**Identity** — structure (data-encoding) · atoms · linear progress/fraction.
**Anatomy** [C] — track + fill (`rounded-full` family); fill width = value; tint follows state hue; animates scaleX origin-left, `fill` duration (05 §4.1); ticking variant where time is the data (02 §4.4 — static bar where it should move is a defect, AP46).
**Props** — data: `value`, `max`, `label?` · config: `tone`, `mode`, `animated?`, `ticking?` (countdown variant: fill shrinks with time, zero flips STATE) · slots: none.
**State map** — static (the value IS the state); ticking variant owned by the host's clock.
**Declaration** — a11y: `role="progressbar"`/`aria-valuenow`; countdown announces remaining.
**Composition** — offer windows, refill levels, setup strips (04 §5.4), dose arcs; bars comparing identical values are deleted (01 §10.4).

## 11 — Ring

**Identity** — structure (data-encoding) · atoms · circular progress/score.
**Anatomy** [C] — ≤84px, stroke 6–7, rounded caps; value center (strip size, tabular) or beside as stacked stats; fill tint = state hue.
**Props** — data: `value`, `max`, `label?` · config: `tone`, `size?` · slots: none.
**State map** — static.
**Declaration** — a11y: `aria-valuenow` + label ("4 of 7 days open").
**Composition** — ratings, adherence; pairs with StatStrip's ring+stacked-stats composition (§6); never three-across with columns (AP6).

## 12 — Tile

**Identity** — structure · atoms · the icon container — the row anatomy's left anchor.
**Anatomy** [C] — `h-8`/`h-10`, `rounded-xl` (never circles, 01 §5.2), family wash + accent ink per tone/mode.
**Props** — data: `icon` (Lucide, size per 01 §9.1) · config: `tone`, `mode` · slots: none.
**State map** — static (goes family-fill when a control activates — OptionRow's active tile).
**Declaration** — `aria-hidden` (decorative); the row carries meaning.
**Composition** — Field, Row, OptionRow, NoteStrip anchors; a Tile never carries a SECOND state statement alongside the row's chip (one status statement).

## 13 — LiveDot

**Identity** — structure · atoms · the live signal.
**Anatomy** [C] — `h-2 w-2 rounded-full`; live = pulse (opacity [1, 0.4, 1], 1.6s — 05 §4.5); settled = static.
**Props** — config: `tone`, `mode`, `live` · data: none.
**State map** — static vs pulsing; the pulse IS the statement — a static dot labeled "live" is a contradiction (Q12).
**Declaration** — `aria-hidden`; the live state announces via the owning component's label.
**Composition** — Chip (dot/live), StatusPill (live), MiniTimeline halos, active steps; never a live dot on a non-live surface (affordance promises behavior — 04 §1.1 inverse).

## 14 — Catalog-wide rules (07d)

- **[M]** Displays encode data or are deleted — no decorative dot stacks, avatar piles, node rows, legends (01 §10.4 at component level).
- **[M]** All numerals tabular (01 §10.1); all formatted values arrive formatted (06 §1) — a display component formats nothing.
- **[M]** Tone always arrives via config from the owner's one-map; a display never derives its own tone from data — derivation belongs to the data layer (vitalIntent) [M — the mined precedent as the boundary].
- **[M]** Displays never fetch, never parse, never decide — they state.

## 15 — Open items (07d)

| Item | Status | Owner |
|---|---|---|
| StatusPill/Chip formal merge vs separate entries | SEALED [D: separate, one family split by mode] — vetoable | user |
| QuotePanel serif stack (exact family) | OPEN | 01 typography follow-up |
| Meter tick cadence (countdown variant) | OPEN — host-owned | 07e |
| Ring size variants beyond ≤84px | OPEN | 09 admission |
