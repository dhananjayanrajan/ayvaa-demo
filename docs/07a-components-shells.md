# 07a — COMPONENT CATALOG: SHELLS & CHROME

**Part 1 of 6** of the component catalog (07a shells/chrome · 07b rows/lists/disclosure · 07c controls/inputs · 07d data displays · 07e care domains · 07f platform domains).
**Owns completely:** every catalog pattern whose job is structure — the screen frame, bars, sheets, toasts, sections, panels, hero shells, and the cells that compose them. Behavior-bearing entries declare their behavior; pure structure entries declare why they have none.
**Status:** v1.0 — proposed. Ratification seals as R21.
**Provenance:** [R] = ratified · [C] = old canon (spirit) · [M] = mined evidence · [D] = derived — vetoable.

---

## 0 — The entry format

Every catalog entry in 07a–07f uses this skeleton [D — the standard]:

1. **Identity** — name · layer (per master I1) · classification (structure / controlled / behavior-bearing per I4) · one-line purpose. *Controlled* = takes input with no lifecycle beyond its own interaction — the value lives with its owner (06 §4.2), so a controlled input may sit at atoms tier (Switch, Checkbox, StarPicker); behavior ownership per I1 means owning state of record, which controlled inputs do not. *Behavior-bearing* = owns an arc or flow above the I4 threshold.
2. **Anatomy** — the structure, in 01's language.
3. **Props contract** — per 06 §4 categories: data / state / callback / config / slots. Variant unions declared; suffix forks banned.
4. **State map** — the one-map table (02 §4.2): state → tone · intensity · mode · composition · copy intent. A column may be elided only where constant across ALL states of the pattern (`const: X`) or genuinely inapplicable (`—`); where a pattern class's presentation channels carry other names (a button's fill/copy/exit), the map keeps its columns under those channel names — the requirement is that ONE table derives every state's tone, composition, and copy, not the column labels. Structure-only entries state "static" and why.
5. **Declaration block** — Q-rows (04 §4) · gestures · keyboard · a11y · gating. "—" where genuinely inapplicable.
6. **Composition rules** — what may compose it, what it composes, what it must never do.
7. **Provenance & open items.**

Layer discipline applies: atoms live under these shells (they consume nothing up); domain compositions (07e) never re-implement what an entry here owns.

---

## 1 — PhoneFrame

**Identity** — structure · universals · the demo device frame (demo-only; not part of the real-project surface).
**Anatomy** — fixed-size device viewport (~390pt class, 01 §1.1) with device chrome simulation; mounts exactly one Screen.
**Props** — data: none · config: `tone` (page background family) · slots: `children` (the Screen).
**State map** — static (a frame owns no state; boot/page splash lives in Splash, not here).
**Declaration** — Q-rows: — · gestures: — · keyboard: — · a11y: `role="application"` container, decorative.
**Composition** — wraps every demo screen; never rendered by real-product surfaces; never contains more than one Screen.
**Open** — exact frame dimensions [D: 390×844-class]. (Splash mounting is Screen's law, §2.)

## 2 — Screen (+ BodyArea, FootBar)

**Identity** — structure · universals · the page container: the single scroll boundary.
**Anatomy** [C/M] — `Screen`: AppBar zone → `BodyArea` (the ONLY scroll zone, `overflow-y-auto overscroll-contain`, bottom padding for nav clearance) → `FootBar`/NavBar zone → `EndOfScroll` marker inside the body's end. Splash mounts on boot + page change [M — commit-attested behavior].
**Props** — data: none · config: tone · slots: `appBar`, `children` (body), `footBar`.
**State map** — static structure; scroll position is transient browser state, never persisted.
**Declaration** — Q-rows: — · gestures: scroll (04 §3.6; direction-locks against drag surfaces) · keyboard: page scroll natural · a11y: `main` landmark; body is the sole `tab-order` scroll container.
**Composition** — screens assemble AppBar + bands + NavBar inside it. Body hosts bands with Section markers (§6). Nothing scrolls outside BodyArea (01 §1.2 is this component's enforcement).

## 3 — AppBar

**Identity** — structure · universals · top bar: identity, title, screen-level trailing triggers.
**Anatomy** [C] — leading (back or brand) · title (`row title` type role) · trailing triggers. **Identity triggers are initials-circle buttons — never icon buttons for a person** [C §14.6]. Notification bell carries a derived unread count badge (derives via 06 §3.2 — one source with the notifications screen).
**Props** — data: `title`, `unreadCount?`, `identity?: {initials, name}` · callback: `onBack?`, `onIdentity?`, `onNotifications?` · config: none · slots: none (closed anatomy — new trailing needs a catalog amendment).
**State map** — static; badge count is data-derived (data axis renders through the badge, not a lifecycle).
**Declaration** — Q-rows: Q1, Q6 · gestures: tap · keyboard: all triggers tabbable, Enter/Space activate · a11y: `banner` landmark; icon-only triggers `aria-label`; badge announces count.
**Composition** — never scrolls (Screen owns the boundary); never hosts page-content actions (those are bands/footers).

## 4 — NavBar

**Identity** — structure · universals · bottom primary navigation.
**Anatomy** [C] — 3–5 primary destinations, icon + label; active state = SOLID deep family fill (`bg-{hue}-600`), never light `500→400` gradient [C §14.4]; badge dots where a destination holds actionable state (count derives from data — one source).
**Props** — data: `items: {id, label, icon, badgeCount?}[]`, `activeId` · callback: `onNavigate(id)` · config: `tone` (screen family) · slots: none.
**State map** — static (active is controlled; no internal lifecycle).
**Declaration** — Q-rows: Q1, Q6 · gestures: tap; SWIPE BETWEEN TABS IS NOT A NAVBAR BEHAVIOR (nav is explicit tap — swipe-paging belongs to content surfaces, §7 SheetShell/07c SegmentedTabs) · keyboard: arrow keys move between destinations [C] · a11y: `navigation` landmark; destinations are links with `aria-current="page"` — never tablist semantics (tabs are in-page: 07c SegmentedTabs).
**Composition** — one per screen; owned by Screen's foot zone; never duplicated inside sheets.

## 5 — Splash

**Identity** — structure · universals · boot and page-transition overlay.
**Anatomy** [M — commit-attested] — thematic full-frame overlay, brand mark + wordmark; boot mode on app mount, transition mode on route change; exits with a fade (motion `fast`/`base` — 05 §2).
**Props** — config: `mode: 'boot' | 'transition'`, `tone` · data: none.
**State map** — single lifecycle: `visible → exiting` (timed, self-cleaning).
**Declaration** — Q-rows: Q6 not applicable (non-interactive) · a11y: `aria-hidden` once exited; announced once on boot.
**Composition** — never interactive, never persists, never stacks with sheets.
**Open** — duration values [D proposal: boot 900ms, transition 450ms — vetoable].

## 6 — Section

**Identity** — structure · atoms-tier composite · the band marker (01 §2.2 is this component's law).
**Anatomy** [C] — accent bar (family fill, `h-4 w-1`) + uppercase micro-label (0.14em) + hairline + optional trailing pill (family chip, ≤2 words).
**Props** — data: `label`, `trailing?: string` · config: `tone`, `mode` · slots: none (trailing is a string pill, not ReactNode — the config-card ban, master I7).
**State map** — static; tone derives from the band's dominant meaning (02 §3.5).
**Declaration** — Q-rows: — (non-interactive) · a11y: heading semantics (`role="heading"`/aria-level) so screen readers announce bands.
**Composition** — owns band counts exclusively: a card inside the band MUST NOT restate the trailing fact (01 §2.3).

## 7 — Panel / DarkPanel

**Identity** — structure · atoms-tier · contained surfaces inside cards and shells.
**Anatomy** [C] — `Panel`: `rounded-2xl` + wash per tone/mode (01 §7.3 table). `DarkPanel`: the shell inner panel — `bg-white/[0.06]` neutral or `bg-{hue}-400/[0.10–0.15]` accented; flat (no orbs/shadows — expansions inside shells render flat, 01 §6.2).
**Props** — data: none · config: `tone?`, `mode` · slots: `children` only.
**State map** — static (tone arrives via config; state flips happen at the shell/card level, not the panel).
**Declaration** — non-interactive; no Q-rows.
**Composition** — panels never nest inside panels inside a shell (one containment level, 01 §6.2 — this entry enforces it). A panel is never tappable; a tappable contained surface is a row (07b) or tap cell (§10).

---

## 8 — SheetShell ★

**Identity** — **behavior-bearing** · universals/composite boundary · the bottom sheet: the house modal surface. The deepest entry in 07a; host of Q2/Q8b/Q10.
**Anatomy** [C/M — corpus-attested across every domain] — three rigid zones:
1. **Fixed header** — grabber (`h-1.5 w-10 rounded-full bg-ink/15`, `cursor-grab`), icon Tile (tone follows lifecycle), title (`title` role, ≤3 words, never truncates — entity name goes to subtitle), close button. Never scrolls.
2. **Middle** — `min-h-0 flex-1 overflow-y-auto overscroll-contain`. The only scrolling zone.
3. **Pinned footer** — primary action (+ footnote). Never scrolls.
Frame: fixed height `h-[86%]` — **never `max-h`** (tab swaps inside must not resize the frame); `overflow-hidden`; `rounded-[26px]` top corners per shell tone.
**Mounting law** [C — crash class] — mounts DIRECTLY under the screen-level `AnimatePresence` with a key; never inside an outer positioned `motion.div` (the wrapper becomes the containing block and collapses the sheet to zero height — 06 §8 register). Per-entry keys include the parameter when entry should reset per param (`key={`log-${filter}`}`); `initial*` props land the right tab.
**Dim** — `bg-[rgba(15,26,22,0.45–0.5)] backdrop-blur-[2px]`, tappable (closes), fades `fast`, mounted/unmounted with the sheet inside the same AnimatePresence — never permanent [C, AP23].
**Props** — data: `title`, `subtitle?`, content via slots · state: `open` (controlled by screen; the SHEET owns nothing persisted except per-modality inner state, Q10) · callback: `onClose`, `onComplete?` · config: `tone` (drives header tile + shell wash; flips with outcome — see map) · slots: `headerMeta?`, `children` (middle), `footer` (pinned).
**State map** [C — PaymentSheet/RateVisitSheet/VitalsSheet census]:

| State | Tone | Composition | Copy intent |
|---|---|---|---|
| open | family/config | three zones, content live | per content |
| working | config → neutral fill | footer CTA working; middle inputs lock (02 §4.3) | "Sealing your consent" pattern |
| done | **positive flip** | header tile + footer flip; confirmation state | "Consent sealed" pattern |
| dismissed | — | unmount choreography | — |

**Declaration** — Q-rows: **Q2** (drag-to-dismiss: vertical drag on grabber/header; follows finger; past threshold → dismiss on `sheet` spring; short release → spring back) · **Q8b** (completion: done → `850ms` hold → auto-dismiss → dim fades + unblurs — 05 §4.3 chain) · **Q10** (per-modality inner state persists per entry parameter) · Q6 (Esc dismisses — never navigates; focus moves INTO the sheet on open, returns to trigger on close; `role="dialog"`, `aria-modal`, labelled by title) · gestures: drag (§3.3), tap dim, scroll middle only (direction-locked) · keyboard: Esc, Enter on footer CTA, Tab cycles inside · gating: footer CTA gate derives from content validity, states its reason (04 §5).
**Composition rules** — one sheet frame per domain per screen (reused by all that screen's sheets [C]); sheets are their own component files — screens never contain sheet JSX [C §14.6]; sheet-to-sheet switching keeps ONE mounted frame; content components (07e) fill middle/footer. The sheet NEVER hosts drag-to-dismiss inside its middle content.
**Open** — 86% height vs taller variant for full-page flows [D: keep 86%, full-page is a Screen, not a sheet]; drag threshold value [D proposal: 96px or 25% of height].

## 9 — PageHero (the hero shell family — AccentHero/PhaseHero converge)

**Identity** — behavior-bearing (tone-flipping) · universals · Mode B immersive shell for screen heroes and stake surfaces (02 §3.4's three triggers). The canon's AccentHero/PhaseHero are one family; the catalog admits **PageHero** with tone-driven phases — variant Props union, not two components [D — merge per master I7; the suffix-era split is F4 heritage].
**Anatomy** [C — full spec in 01 §6.2] — `rounded-[26px]` shell · hue-tinted deep bg · border `{hue}-200/10` · deep colored shadow · two glow orbs (static, recolor with state) · top hairline · overline row (kicker left + derived counter/step right) · 19px gradient headline with key phrase · one-line subtitle · 2-column stat-band cell grid (glass cells) · full-width tap cells ONLY for facts editable on this screen · footer strip for the money/total fact. ONE containment level max.
**Props** — data: `overline`, `headline`, `highlight` (the gradient phrase), `subtitle?`, `stats: {label, value}[]`, `facts?: {...}[]` (typed cell-sized facts — 03 §4) · callback: `onFactTap?` (only for editable-fact cells) · config: `phase` (the state key), `mode: 'dark' | 'light'` (the light variant is sealed [D]; exact flat-tone values are walkthrough-tunable) — **the phase map is INTERNAL to the component**: canonical PhaseSpecs per entity lifecycle state are materialized from the 02 §5 treatments as data-layer constants (06 §2.3) and consumed by the component; screens pass `phase: stateKey` + typed data and vary COMPOSITION (which cells, which story) — never tone semantics. A screen holding a presentation table violates 08 §1.1. PhaseSpec: `{tone, mode, headline gradient, pill, panel, meter, hint, tile, button, busy}` · slots: `children?` (the centerpiece — lives directly on the shell, never in a nested panel).
**State map** — THE phase map IS the state map (internal, canonical); the shell renders the spec for `phase` whole-surface (01 §6.2 partial-flip ban). Compositions differ per phase where the phase demands it (idle = send button / pending = status strip / accepted = confirmation strip — census-attested MatchCard arc).
**Declaration** — Q-rows: Q1 (tap cells), Q6, Q12 (live phases) · gestures: tap cells only · keyboard: tap cells tabbable · a11y: headline is `h1`-equivalent per screen; orbs/hairline `aria-hidden`; phase flips announce politely.
**Composition rules** — screens restructure the hero per their story — same shell, same type scale, DIFFERENT composition per screen; composition varies, tone semantics never do (the phase spec is canonical, derived from 02 §5) — the variation rule [C §14.2]: an archive lists contents as a ledger, a live session leads with its narrative row. Cloning the anatomy wholesale across siblings is banned (AP51). Heroes never scroll internally.
**Open** — orb opacity/blur exact values (01 §13); light-mode flat-tone exact values.

## 10 — HeroCells

**Identity** — structure · atoms-tier · the cells that compose PageHero bodies: `StatCell` (label above value, glass cell), `TapCell` (family `bg-{hue}-400/[0.14]` + chevron — EDITABLE facts on THIS screen only), `FactCell` (static glass — facts owned by cards below), `HeroTopRow`, `HeroHighlight` (the gradient phrase span).
**Props** — data: `label`, `value` (typed, cell-sized — AP62: sentence-length facts are banned from cells; full detail lives in a full-width row) · callback: `onTap` (TapCell) · config: `tone`, `mode` · slots: none.
**State map** — static; tone arrives via config from the owning hero's phase.
**Declaration** — TapCell: Q1, Q6, tap gesture, `aria-label` names what opens · FactCell: non-interactive — a chevron on a static cell is a defect (affordance promises behavior, 04 §1.1).
**Composition** — the editable/static split is the two-tier law [C §15.3]: a fact editable on this screen = TapCell; owned elsewhere = FactCell. Never invent a third treatment (AP44).

---

## 11 — ToastHost

**Identity** — behavior-bearing · universals · the transient outcome-report overlay: ambient confirmations for outcomes not visible where the user stands. The presentation half of the notify contract (06 §4.4).
**Anatomy** [D] — compact dark ink card (`#0B231C`-family, `rounded-2xl`) floating above all surfaces including sheets — dark carries its own depth, so no shadow-rule conflict (01 §6.3): tone-tinted icon Tile (`h-8`) · title (bold, ≤4 words — 03 §3) · body (≤1 sentence) · optional single action label (family accent text). Stack: top of frame, max 3, newest on top, older compress.
**Mechanics [D]** — ToastHost mounts ONCE per screen (chrome slot, sibling to the sheet AnimatePresence) and provides `notify({ title, body, tone?, action? })` via context — the chrome-level cross-tree concern sanctioned by master I3 ("context for genuine cross-tree concerns"). It owns the queue and its timers (self-cleaning); screens never touch them (08 §7.2). Auto-dismiss 2.8s ambient, extended to 5s while an action is offered. Enter: y −12 + opacity; exit: fade + collapse — AnimatePresence throughout (05 catalog `gentle`). Tap dismisses or activates; swipe-up dismisses (04 §3.3 light drag).
**Props (Host)** — data: none · config: none · provides: notify context. **Props (Toast)** — data: `title`, `body?`, `action?: { label, onPress }` · config: `tone` · state: internal (`entering → visible → exiting`).
**State map** — per-toast lifecycle only; the queue is steady-state structure. Tone renders as tile + accent only — the card stays ink; a toast IS an outcome statement, tinted by its meaning (positive/attention/risk).
**Declaration** — Q-rows: Q1, Q13 (haptic on binding outcomes when configured) · gestures: tap act/dismiss, swipe-up dismiss · a11y: `aria-live=polite` (assertive reserved for person-safety — 04 §6); announced once, never re-announced on re-render; auto-dismiss pauses while hovered/focused [D].
**THE LAW** — a toast NEVER substitutes for a visible state change (06 §4.4): if the outcome lands where the user is looking, the in-place arc (02 §4.1) carries it and no toast fires. Toasts exist for out-of-view and ambient outcomes — share complete, background record, dispatch events.
**Composition** — one host per screen; composites notify via context (never prop chains, never screen-owned queues); PushPreview stays a separate demo surface (a toast is in-app; a push is system-level).

## 12 — Catalog-wide composition rules (07a)

- **[M]** Shells and chrome never contain domain data logic — content arrives as typed props or slots from 07e compositions.
- **[M]** One fact, one place: bands own their counts (§6); heroes own their narrative; sheets own their outcome flips — no cross-restatement.
- **[M]** Every 07a entry is reusable across roles (patient/professional/partner/admin/system) with ZERO role conditionals — role variation is data and composition (07e), never config flags [F4 fence].
- **[D]** The catalog admits NO new chrome without the 09 construction procedure; "one more wrapper" is how 410 files happened.

## 13 — Open items (07a)

| Item | Status | Owner |
|---|---|---|
| Sheet drag threshold (96px vs 25%) | OPEN [D proposed] | walkthrough |
| Splash durations | OPEN [D proposed] | walkthrough |
| PageHero light-mode exact values (flat tone/accent) | OPEN — variant sealed [D] | walkthrough |
| AppBar closed-anatomy amendment path (new trailing type) | governed by 09 admission | 09 |
| Toast durations (2.8s ambient / 5s with action) | SEALED [D] — vetoable | user |
