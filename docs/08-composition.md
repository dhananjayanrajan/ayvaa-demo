# 08 — COMPOSITION: SCREENS & PAGES

**Owns completely:** what a screen is and may contain, screen-level state ownership, page architecture (bands), page-level laws, sheet & overlay mounting, navigation discipline, the screen-life law, the screen manifest, and the forbidden-content register.
**Status:** v1.0 — proposed. Ratification seals as R27. Amends 07a §9 on one point (§2, flagged).
**Provenance:** [R] = ratified · [C] = old canon (spirit) · [M] = mined evidence · [D] = derived — vetoable.
**Strength:** **M** = MUST · **S** = SHOULD.

---

## 1 — The screen definition

1.1 **[M/R]** A screen is an ASSEMBLY: catalog imports (domain barrels, 07e §3.1) + typed data supply (06 modules) + layout order + the declarative state of what is open. Nothing else.

1.2 **[M]** The reconstruction test (screen scale): a screen file must be reconstructible from its manifest declaration (§8) + its data module + the catalog. Anything in a screen file that the reconstruction can't produce is either a catalog gap (09 admission) or a violation.

1.3 **[M/R]** Screen IDs are permanent (R11): the demo screen's ID (P17, PR06, A02…) is its identity across demo, docs, and the real project — rebuilds keep IDs; the manifest is the cross-reference spine.

1.4 **[M]** Screens are role-shaped by DATA and composition order, never by config flags — a screen file contains zero role conditionals (F4 fence at screen level).

## 2 — State ownership (canonical table)

State lives at the lowest owner that can own it; lifted only for cross-component sharing (master I3). [D — consolidates 07e §3.3, 06 §4]

| State | Owner | Examples |
|---|---|---|
| what is open (sheet, expansion, tab) | **screen** | `openSheet`, `openId`, `activeTab` |
| interaction axis | components (NEVER props — 06 §4.1) | hover, focus, press |
| component arcs (working→done timing) | composites | LifecycleButton, SheetShell done |
| clocks (ticking values) | highest displaying composition (07e §3.4) | LiveVisit elapsed |
| persisted record state | data layer, re-derived by parents | sealed, submitted, verified |
| derivations (counts, filters, formats) | data layer (06 §3) | `applyVisitFilters`, `consentProgress` |
| presentation maps (tone/composition per state) | **components** | PageHero phases, MatchCard cardTone |

**Erratum — amends 07a §9 [D]:** PageHero's phase map is owned INTERNALLY by the component; the screen passes `phase: stateKey` + typed data. A screen holding presentation tables violates 1.1. (07a's "map as a prop" line is corrected by this section.)

## 3 — Page architecture

3.1 **[M]** One hero per screen. The hero is the screen's summary and narrative lead (02 §3.4 trigger 3); two heroes on one screen is a defect. Everything below is bands.

3.2 **[M]** Bands: a Section marker (01 §2.2) + its cards. No card outside a band; no band without its marker; no orphan cards floating on the screen.

3.3 **[D — band ordering law]** Bands order by urgency-and-narrative: live/actionable first (what is happening, what is owed NOW) → attention (pending, upcoming) → content (plans, records) → history (sealed, settled). The eye lands where the state moved (E2/E7 at page scale). Per-screen narrative may reorder within these tiers (the variation rule) but never buries an actionable band below history.

3.4 **[C]** Cards stay in their lane (01 §2.4); the Section owns the count (01 §2.3); the screen never restates a fact in hero + band + card.

3.5 **[M]** Every list region on the screen carries its cause-diagnosing empty path (Q9) — an empty list rendering nothing is a hole in the page.

## 4 — Page-level laws

4.1 **[M/R]** One fact, one place — page scale: the master statement lives at the highest surface that states it; every echo is a defect.

4.2 **[C]** One dominant family per screen (01 §7.6 page hue): hero, tab pills, row tiles, notes, CTAs carry the family; sky never defaults controls on an emerald screen; rose only on genuinely dangerous surfaces.

4.3 **[C]** The long-content rule at page scale: explanations live in NoteStrips/EmptyState copy — never in trailing pills, never beside fixed-width siblings (03 §3 budgets).

4.4 **[M/R]** State persists across reopen (D4): returning to a screen shows its true state — done reads done, filters remember (per Q10 scope), nothing resets for show.

4.5 **[D]** Nothing below the fold contradicts the fold: the hero's narrative and the band order tell one story — a hero claiming "all sealed" above an open incident band is a derivation bug (single-source, 06 §3.2).

## 5 — Sheets & overlays at screen level

5.1 **[C]** Sheets are their own component files — screens NEVER contain sheet JSX [C §14.6].

5.2 **[M — crash class]** A sheet mounts DIRECTLY under the screen-level `AnimatePresence` with a key — never inside an outer positioned `motion.div` (the wrapper becomes the containing block and collapses the sheet to zero height — AP66, 06 §7 register).

5.3 **[C]** Per-entry keys carry the parameter when entry should reset per param (`key={`log-${filter}`}`); `initial*` props land the right tab; inner per-mode state persists (Q10).

5.4 **[C]** The dim layer: tappable (closes), `fast` fade, mounted/unmounted WITH the sheet inside the same AnimatePresence — permanent overlays are banned (AP23). Close buttons DISMISS, never navigate.

5.5 **[C]** One sheet frame per domain per screen (07a §8); sheet-to-sheet switching keeps ONE mounted frame. Dim + sheet are the only overlapping layers on a screen (01 §2.1).

## 6 — Navigation law

6.1 **[M/C]** Navigate only to routes mounted in the app shell — deep links to unmounted screens flood the console with runtime errors (AP48). List-entry details open in-app sheets (§5), not phantom routes.

6.2 **[M]** Notification taps do two things in one pass: navigate AND complete the read lifecycle (read state lives with the screen; mark-all-read fans out to dots, counters, and disables itself at zero) [C §13].

6.3 **[R]** Deep flows hand back (02 §4.3): a done action returns the user to a working surface ("keep editing"), never strands them past a dead end; the NavBar is the primary escape; back is navigation, close is dismissal — never confused.

6.4 **[D]** Cross-screen flows (BookingWizard) return to their family's entry surface after completion or cancellation — the wizard contract (07e §4.2) states each step's forward path.

## 7 — Screens must live

7.1 **[M/R — A8]** Every screen demonstrates its lifecycle: user action → arc → fan-out. Consequences are STAGED THROUGH actions, never run on independent loops beside them (05 §1.4).

7.2 **[M/D]** Screens own NOTHING behavioral — no timers, no streams, no arcs. A `setTimeout` in a screen file is a defect (07e §3.5: clocks live in compositions, cadences in StreamList, simulation data in data modules). **This is the wrapper pattern's ban at its source.**

7.3 **[C]** A frozen screen is a broken promise (AP63): enumerate what would change in reality and wire it. Enumerating is the manifest's job (§8); the life is the compositions' job (§2 ownership).

7.4 **[M]** Every dependent surface updates in ONE pass per action (A6/I3): the hero stat, the band pill, the open sheet, the list row — no surface learns about an action late.

## 8 — The screen manifest [D]

Comments are banned (I9), so the screen declaration is TYPED DATA — the R11 spine mechanized:

`data/screens.ts` — one typed row per screen:

```ts
{ id: "P17", name: "Visit Summary", domain: "visits",
  data: ["patientVisitSummary"], flows: ["visit-seal", "share-summary"],
  liveSurfaces: [], entityRefs: ["visit"] }
```

- **[M]** Every screen has a manifest row; the manifest is checked against real imports at build time (grep: barrels + data modules referenced in the file must match the row).
- **[M]** `flows[]` reference named arcs from the 03 bank / 07 family contracts — a flow with no owning composition or bank entry is a gap 09 must resolve.
- **[S]** The manifest doubles as the walkthrough index (certification order, coverage claims — R7's scope) and the real-project cross-reference (R11).

## 9 — Forbidden content (screen register)

**[M]** A screen file NEVER contains: component JSX definitions (inline components rendering UI) · presentation maps (components own them — §2 erratum) · hand-tuned motion props (05 is the components' law) · sheet JSX (§5.1) · legacy `@/components/` imports · parsing/derivation at render (06 §1) · magic literals (06 §1.2) · module-scope references to props (06 §7) · duplicate keys (06 §5) · timers or streams (§7.2) · permanent overlays (§5.4) · raw HTML · viewport assumptions (01 §1.1) · decoration without data meaning (01 §10.4) · role conditionals (§1.4) · unread manifest (§8).

## 10 — Rule index (MUST summary)

Screen = imports + data + order · reconstruction test · permanent IDs · state at lowest owner · maps inside components · one hero · banded with markers · band order urgency-first · one fact one place · one family per screen · persistence across reopen · sheets as files under AnimatePresence with keys · dim dies with its sheet · close dismisses, back navigates · mounted routes only · notifications navigate AND read · screens own nothing behavioral · one-pass fan-out · manifest typed and checked.

## 11 — Open items

| Item | Status | Owner |
|---|---|---|
| Band-order tiers (§3.3) | SEALED [D] — vetoable | user |
| Manifest shape (fields above) | SEALED [D] — vetoable | user |
| Screen-file state granularity (useState clusters vs reducer) | OPEN — per-component pattern choice (R15) | build phase |
| Walkthrough order definition from manifest | OPEN | build conversation |
