# 01 — DESIGN LANGUAGE

**Owns completely:** layout, screen anatomy, alignment, spacing, radius, surfaces & elevation, color realization, typography, iconography, numeral presentation.
**Status:** v1.0 — values sealed with provenance or listed open (§13). Master §3 holds the *meanings*; this document holds the *values* that realize them.
**Provenance tags:** `[C]` = old canon (spirit) · `[M]` = mined census evidence · `[D]` = derived decision from evidence — vetoable · `[R]` = ruling.
**Strength:** **M** = MUST (binding) · **S** = SHOULD (guidance).

---

## 1 — Canvas & frame

1.1 **[M]** The demo surface is a phone frame (~390pt class). Components MUST NOT encode viewport assumptions — no width media queries, no viewport-relative units inside components (R11: platform-neutral thinking; responsive behavior is decided with the second platform).

1.2 **[M]** Screens scroll in exactly one place: the body zone. AppBar and NavBar never scroll with content. Inside sheets, only the middle zone scrolls (three-zone anatomy, §7.3).

---

## 2 — Screen anatomy

2.1 **[C]** A screen is a vertical stack: AppBar → optional hero band → content bands → NavBar. No overlapping layers except dim + sheet (which mount transiently, never permanently).

2.2 **[C/M]** Content bands are announced by a Section marker: hue-carrying accent bar + uppercase micro-label + hairline + trailing state pill. A Section's trailing pill carries ONLY a state statement within the pill budget ("3 of 5 sealed", "Locked" — 03 §3) — never actions, never links. Actions live in full-width buttons below (the long-content rule, §9.6). Divider-style centered labels are banned.

2.3 **[C]** One fact, one place. If the Section trailing pill states a count, no card inside that band repeats it — not in a header, not in a hero strip.

2.4 **[C]** Cards stay in their lane: a card inside a band does not restate the band's marker in its own header.

---

## 3 — Layout & composition

3.1 **[C]** Single-column vertical flow. Two columns exist only inside defined cells: stat bands (max two stat columns side by side, or ring + stacked stats — a third metric becomes a full-width footer strip) and the 2-column fact-cell grid that wraps (never a horizontally scrolling chip row that clips).

3.2 **[C]** No content overlap, ever. If it can't fit, restructure — never shrink fonts, never let text flow around fixed-width siblings.

3.3 **[C]** Fixed-width elements (chips, timestamps, chevrons, rings) never share a line with wrapping body text. The meta column is `flex flex-col items-end`: chip + chevron row, then time beneath.

3.4 **[C]** The two-column row anatomy: fixed-width icon tile left → flexible content column (`flex-1 min-w-0`) → fixed meta column right. Title takes `flex-1 min-w-0 truncate` on the title line; body wraps full-width of the content column on its own line(s).

3.5 **[C]** Series alignment: every item in a series (stat bands, chart columns, ribbon cells) shares ONE grid and ONE alignment rule — all left-aligned or all centered, never mixed.

3.6 **[C]** Label/value rows: `flex items-baseline justify-between gap-3` — micro-label left (`shrink-0`), value right-aligned (`min-w-0 truncate` only if genuinely bounded), rows stacked with `gap-2.5`. No leader dots, no dotted leaders, ever.

3.7 **[C]** Expansion content sits in a contained panel at FULL card width (`rounded-2xl bg-ink/[0.03] p-3`) — never deep-indented under its icon. Expansions reveal NEW information, never a repeat of the row.

3.8 **[C]** The long-content rule: if content might run even slightly long — a sentence, name, value, explanation — it NEVER shares a line with anything else. Two stacked lines always beat one crowded row.

3.9 **[S]** Segregation between list items is done with spacing and contained panels. Horizontal divider lines between list items are banned (`border-t`, `divide-x`, dotted leaders). The only permitted hairlines: the top hairline inside a dark shell header, the single footer-join hairline inside a shell, and the Section marker rule.

---

## 4 — Spacing scale

4.1 **[M/D]** Closed scale (Tailwind units): `0.5 · 1 · 1.5 · 2 · 2.5 · 3 · 3.5 · 4 · 5`. Arbitrary spacing values are banned (`mt-[3px]` appears twice in the census — delete).

4.2 **[C]** Card padding: `p-5` heroes and dark shells · `p-4` standard cards · `p-3` inner panels and contained expansions.

4.3 **[C]** Vertical rhythm: `mt-2`/`mt-3` inside panels · `mt-4` between major blocks · `mt-5` before the rules/footer group of a hero.

4.4 **[C]** Icon-tile rows: `flex items-start gap-3`; text column gets `pt-0.5` when the tile is `h-10`.

4.5 **[M]** Dominant census rhythm (what the scale must serve): gap-2/gap-3 lead, mt-1→mt-4 in even use, px-3.5/py-3.5 for row bodies. These are the rhythm anchors; anything outside the closed scale in 4.1 is drift to delete.

---

## 5 — Radius ladder

5.1 **[M/D]** Four steps, absolute: `rounded-[26px]` dark shells → `rounded-2xl` cards, panels, inner tiles → `rounded-xl` icon boxes, strips, contained expansion panels → `rounded-full` pills, chips, dots, check badges, meters, grabbers. Census shows NO `rounded-3xl` usage — the canon's five-step ladder collapses to four; `rounded-lg` (×2) and `rounded-[20px]` (×2) are drift, deleted.

5.2 **[C]** Radius is judged relative to container size: 16px on a 40px tile is a circle. Icon containers are NEVER circles.

---

## 6 — Surfaces & elevation

### 6.1 Mode A — light informational card

- **[C]** White card, dark ink. No `border` + white fill outlines — accents are pure tinted fills (`bg-{hue}-500/[0.08–0.14]` for icon containers and panels).
- **[C]** Dark summary strips inside light cards: `rounded-2xl bg-[#0B231C] px-4 py-3(–4)` with white values and `{hue}-100/xx` labels.
- **[C]** Hover affordance on interactive rows: `hover:bg-[#0B211B]/[0.02]` (contained rows step [0.03] → [0.06]); hover must be visible — a tint lighter than or equal to the row's own background is a defect. Hover-translate lifts are banned as affordance.

### 6.2 Mode B — dark immersive shell

- **[C]** Reserved by STAKES, not hue — the reservation rule (binding-destruction ceremonies, person-safety live surfaces, screen heroes) is owned by 02 §3.4; this section defines the anatomy.
- **[C]** Shell anatomy: `rounded-[26px]`, `border-{hue}-200/10`, hue-tinted deep background (hex table §8.4), deep colored shadow `shadow-[0_28px_64px_-30px_rgba(...)]` derived from the shell hue, two ambient blurred glow orbs (`blur-3xl`, off-right-top and off-bottom-left), top hairline `h-px bg-gradient-to-r from-transparent via-{hue}-300/40 to-transparent`. Shell, orbs, hairline, border all recolor together on state change (`transition-colors duration-300/500`) — a partial flip (chip only) is a defect.
- **[C]** ONE containment level maximum inside a shell: the centerpiece lives directly on the shell. A footer group may join via the single allowed `h-px bg-white/[0.08]` hairline. Panels-in-panels-in-shells are banned.
- **[C]** Inner panels: `bg-white/[0.06]` (neutral) or `bg-{hue}-400/[0.10–0.15]` (accented). Expansions inside shells render FLAT dark mini-panels — no orbs, no shadows.

### 6.3 Elevation

- **[C]** Shadows belong to Mode B shells only. Light cards are flat, differentiated by washes. No shadow inside expansions, no stacked shadows.

---

## 7 — Color system (realization of master §3.3)

### 7.1 Family mapping

**[M/D]** Token → hue family: `positive` = emerald · `attention` = amber · `risk` = rose · `active` = sky · `neutral` = ink (`#0B211B` family). No sixth family. A third hue inside one card is banned — the single accent carries the card; emerald appears ONLY for completed/success states.

### 7.2 Ink scale (light surfaces)

**[C/D]** Text ink = `#0B211B` at exactly four steps: `/80` values & body emphasis · `/55` secondary body · `/40` labels & micro-labels · `/35` timestamps & meta. Census drift `/45 /60 /70 /90 /25` maps: `/45→/40`, `/25→/35` (or a wash where it's a tint), `/60 /70` → wash tokens if they color surfaces, `/55` if text. Ink opacity is for TEXT; surface tints use the wash scale (§7.5).

### 7.3 Tone realization table

**[C/D]** Per intensity level (master §3.3 ladder). Wash = tinted panel · Chip = solid pill · Fill = active control · Shell = immersive surface.

| Token | wash (light) | wash (dark) | chip (light) | chip (dark) | fill | shell |
|---|---|---|---|---|---|---|
| positive | `bg-emerald-500/10` | `bg-emerald-400/[0.12]` | `bg-emerald-500/10` + `text-emerald-700` | `bg-emerald-300` + ink | `bg-emerald-600` | `bg-[#062419]` |
| attention | `bg-amber-500/10` | `bg-amber-400/[0.12]` | `bg-amber-500/10` + `text-amber-700` | `bg-amber-300` + ink | `bg-amber-600` | `bg-[#241A0B]` |
| risk | `bg-rose-500/10` | `bg-rose-400/[0.12]` | `bg-rose-500/10` + `text-rose-700` | `bg-rose-300` + ink | `bg-rose-600` | `bg-[#230D14]` |
| active | `bg-sky-500/10` | `bg-sky-400/[0.12]` | `bg-sky-500/10` + `text-sky-700` | `bg-sky-300` + ink | `bg-sky-600` | `bg-[#0A1B26]` |
| neutral | `bg-[#0B211B]/[0.03]` | `bg-white/[0.06]` | `bg-[#0B211B]/[0.06]` + `/70` | `bg-white/[0.08]` + `white/80` | `bg-[#0B211B]/70` | `bg-[#0B231C]` |

Chip ink on dark chips: `#04241A`-family (dark ink on solid mid-hue). Busy-state fills: `/50` of the family fill. Active/selected controls use SOLID deep fill (`bg-{hue}-600`), never light `500→400` gradients.

### 7.4 Shell accents (dark surfaces)

**[C]** Shell text accents: overline in muted hue (`{hue}-200/60`), headline gradient `from-white to-{hue}-200` via `bg-clip-text`, panel labels `{hue}-100/xx`, hairline/orb/border per §6.2. The shell's dominant hue carries tiles, chips, meters, connectors and CTA together.

### 7.5 Wash opacity scale

**[M/D]** Closed set: `03 · 04 · 06 · 08 · 10 · 12 · 14` (plus shells' internal `white/[0.06]` and `white/[0.08]`). Census drift maps: `05→04 or 06`, `07→06 or 08`, `09→08`, `16→14`, `02→03`. Washes above `[0.15]` are fills, not washes — escalate the intensity level instead of the opacity.

### 7.6 Hue discipline

- **[C]** One dominant family per card, derived from state (derivation matrix → 02). Secondary meanings demote to chips/links.
- **[C]** Emerald = completion only. Selection is NOT success — selectable chips/tags take the card's dominant family, never emerald. Sky is pending-decision/informational; sky never defaults controls on an emerald-themed screen.
- **[C]** Rose appears only on genuinely dangerous/lost states; amber only on true pending/warning. Mild informational rose accents (interaction warnings) stay light-tint; high-stakes danger is full rose shell.
- **[D — sealed with R8]** Continuous-input exception: DialInput's detent bar maps range position to hue (emerald → amber at limit) as a POSITIONAL signal, not a completion claim. Discrete state surfaces remain fully bound by this law.

### 7.7 Contrast rules

- **[C]** Light kit components (dark ink assumed) MUST NOT drop onto dark shells — use the dark variant (`bg-white/[0.08]`, light text, tabular-nums). Contrast-check every kit usage per surface.
- **[C]** Translucent status chips are banned on shells — status on dark surfaces is a SOLID mid-hue pill (`bg-{hue}-300`) with dark ink.

---

## 8 — Typography

### 8.1 Closed type scale

**[M/D]** Nine roles, integer px only:

| Role | px | Census anchor |
|---|---|---|
| micro-label | 9 | ×69 — dominant |
| meta / timestamp | 10 | ×18 |
| footnote | 11 | ×23 |
| body | 12 | ×24 |
| row title | 13 | ×20 |
| card title | 14 | ×12 |
| strip value | 15 | ×18 |
| headline (shell) | 19 | ×13 |
| stat band value | 20 | ×2 |
| hero amount | 38 | the single exception [C] |

Half-steps are banned and map DOWN: `10.5→10`, `11.5→11`, `12.5→12`, `13.5→13`, `9.5→9`, `8→9`. The census carries 75 half-step uses — they are the drift this scale deletes. Screens do not invent sizes. The hero amount's currency prefix (18px, §8.4) is a sealed sub-role of the hero-amount composite, not an independent size [D].

### 8.2 Weights

**[C/M]** Four roles: `medium` body · `semibold` labels · `bold` values & micro-labels · `extrabold` titles & numerals. Census: extrabold ≈ bold in dominance — display weight is the house voice.

### 8.3 Tracking

**[M/D]** Two roles: micro-label `tracking-[0.14em]` (census ×47) · overline `tracking-[0.22em]` (census ×8). Drift folds: `0.16→0.14`, `0.18→0.14`, `0.12→banned` (floor is 0.14). All micro-labels are uppercase.

### 8.4 Role bindings

**[C]** Card title `text-[14px] font-extrabold tracking-tight` · dark shell headline `text-[19px] font-extrabold tracking-tight` with gradient key phrase · row title `text-[13px] font-extrabold` · body `text-[12px] font-medium leading-snug` at `/55` · value `text-[12px] font-bold` at `/80` · meta `text-[10px] font-bold tabular-nums` at `/35` · strip value `text-[15px] font-extrabold tabular-nums leading-none` · hero amount `text-[38px] font-extrabold leading-none tracking-tight` with `text-[18px]` currency prefix.

### 8.5 Text handling

- **[C]** `break-words` on any free text; `truncate` ONLY on row titles sharing a line with fixed-width elements. Truncation must never hide state — status lives in chips, not truncated titles.
- **[C]** A label word never sits inside its value ("Supervisors paged: near fall…" is banned). Label and value are always separate lines; label-above-value is the default pairing.
- **[C]** Dates are parsed into day/month/time fields at the data layer and reassembled in reading order — never sliced from raw strings at render (mechanism: 06 §6.3).

---

## 9 — Iconography

9.1 **[D]** Lucide throughout. Sizes: `h-4` inside `h-8` tiles, `h-5` inside `h-10` tiles, standalone `h-4`/`h-5` inline. One icon size per row.

9.2 **[C]** Decorative icons: `aria-hidden`. Icon-only controls carry `aria-label` describing the action. Icon-only status chips carry `aria-label` describing the state.

9.3 **[C]** One status statement per row: one tile OR one chip carries state — never both saying the same thing. A neutral icon tile may identify row TYPE while the chip carries state.

9.4 **[C]** Icons never substitute for labeled data. If a value needs explaining, the explanation is text — an icon alone is decoration, and decoration is deleted.

---

## 10 — Numerals & data presentation

10.1 **[M]** `tabular-nums` on EVERY numeral that aligns or updates: money, counts, dates, times, IDs, chart figures, initials, axis labels. Census: 43 uses in one domain — the rule is house-wide.

10.2 **[C]** Money: exact, currency-prefixed (prefix one size down, e.g. 18px beside 38px), never silently rounded. Formatting patterns → 03.

10.3 **[C]** Animated values land visibly (count-up/odometer, `key`-remount fade) — a number that silently swaps is a missed animation. Motion specifics → 05.

10.4 **[C]** Every visual element carries data or is deleted: no decorative dot stacks, avatar piles, node rows; bars comparing identical values are decoration; no legends restating what fills + chips already say.

---

## 11 — Anti-pattern index (visual class)

The banned patterns this document enforces, for grep-and-eye checking (full register → 08): three-column squeeze · text wrapping around chips · label-inside-value · boxes-in-boxes · outlined blocks · divider segregation · hover-translate affordance · translucent chips on shells · light kit on dark surfaces · decorative visuals · partial hue flips · radius drift · half-step type sizes · off-scale spacing · off-scale washes.

---

## 12 — Rule index (MUST summary)

Single column + defined cells · no overlap · fixed-width/wrapping separation · two-column row anatomy · series alignment · label-above-value · full-width expansions · long-content rule · closed spacing scale · closed radius ladder · shell anatomy + one containment level · flat light cards · closed ink steps · closed wash set · closed type scale (half-steps banned) · closed tracking · tabular-nums everywhere · one family per card · emerald-done-only · dark-variant kit on shells · solid status pills on shells · icons labeled or aria-hidden · one status statement per row · decoration deleted.

---

## 13 — Open items

| Value | Status | Owner |
|---|---|---|
| Exact orb opacity/blur params | OPEN (proposed `blur-3xl` + `500/20`) | build phase, exemplar capture |
| Shadow rgba derivation rule | OPEN (proposed: shell hue at 0.45, `0_28px_64px_-30px`) | build phase |
| 8.1 half-step DOWN-mapping | SEALED [D] — vetoable | user |
| 7.5 wash drift mapping | SEALED [D] — vetoable | user |
| Icon tile size × family pairs beyond h-8/h-10 | OPEN | 07 component entries |
| Portal/responsive layout | OPEN | deferred with second platform [R11] |
