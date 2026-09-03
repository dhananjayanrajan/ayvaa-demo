# 05 — MOTION

**Owns completely:** the duration scale, the spring catalog per origin, entrance/exit doctrine, choreography of concurrent transitions, live-motion behavior, effects, reduced-motion, and the banned-motion register.
**Status:** v1.0 — proposed. Serves master I5 (state decides, presentation executes) and 02's one-map rule; motion values are presentation, derived from the state map. [D] expansions vetoable; ratification seals as R19.
**Provenance:** [R] = ratified foundation · [C] = old canon (spirit) · [M] = mined census evidence · [D] = derived — vetoable.
**Strength:** **M** = MUST · **S** = SHOULD.

---

## 1 — First principles

1.1 **[M/R]** No static transitions anywhere. Every state change lands through visible motion — per the component's one-map table (02 §4.2). A value that silently swaps, a state that hard-cuts, a surface that jumps: each is a defect.

1.2 **[M/R]** Motion is never decoration. Every animated element carries state or data meaning (the pulse says "live", the fill says "accumulating", the flip says "sealed"). Animation with no state meaning is deleted (01 §10.4).

1.3 **[M]** Motion follows the finger. Drag and swipe surfaces track input directly — the user's hand owns the velocity; release behavior (spring back, snap, dismiss) is the component's decision, not a canned playback.

1.4 **[M/R]** Concurrent transitions choreograph as ONE flow. A sheet dismissing while its sibling card updates is a single orchestrated sequence, never two competing animations (A8: consequences staged through actions — no independent loops running beside user motion).

1.5 **[M]** Per-origin springs, never unified. Different surfaces have different mass: a sheet is heavy, a chip is light. One spring constant for everything is a defect — the catalog below assigns per role.

1.6 **[M]** Performance floor: 60fps on transform/opacity. Height/width reveals are permitted ONLY for bounded disclosure (§4.2); layout thrash in hot paths (streamed lists, ticking surfaces) is a defect. AnimatePresence owns every mount/unmount.

---

## 2 — The duration scale

Closed set [M/D — census: 0.32×2, 0.2, 0.25, 0.45]. Arbitrary durations are drift.

| Token | Value | Applies to |
|---|---|---|
| `fast` | 0.2s | dim layer fades, small overlay dismissals |
| `base` | 0.25s | chevron rotation, opacity crossfades, small control responses |
| `entrance` | 0.32s | rise entrances, height reveals (easeInOut), staggered children |
| `fill` | 0.45s | chart bars, continuity segments, meter fills (easeOut, origin-left) |

**Color flips** [D — sealed, vetoable]: the ONE permitted CSS transition is `transition-colors` — `duration-300` on light surfaces, `duration-500` on whole-shell flips (shell + orbs + hairline + tiles recolor together, 01 §6.2). `transition: all` banned everywhere (I9). Layout/transform motion MUST go through motion variants, never CSS.

**Fixed intervals** [C/M]: stagger `0.05s` per child · live pulse cycle `1.6s` · completion auto-dismiss `850ms` after done (any user input cancels the pending dismissal [D]) · hold-to-confirm ring `600ms` (04 §3.4).

---

## 3 — The spring catalog

Per role. [C] canon attested · [M] census attested (pairing inference flagged) · [D] proposed roles.

| Role | stiffness/damping | Used by |
|---|---|---|
| `sheet` | 380 / 40 | sheet enter/exit — the heavy surface [C] |
| `gentle` | 300 / 30 | small panels, option rows, soft reveals [C] |
| `tabA` | 480 / 38 | segmented tab, tone family A [C] |
| `tabB` | 420 / 34 | segmented tab, tone family B [C] |
| `tabC` | 500 / 40 | segmented tab, tone family C [C] |
| `pop` | 400 / 16–22 | odometer digits, chip appearance, just-added entries — the light bounce [M — pairing inferred from census 400×{stiffness} / {16,22}×damping; exact pairing unproven, miner rerun owed] |
| `dial` | calibration-owned | DialInput detent snap — owned by its 07 entry [R8 spirit] |

- **[M]** The tab family stays per-tone — three distinct springs is the canon fidelity ruling (per-tone restoration commit history); collapsing to one is a veto, not a drift fix.
- **[D]** Tone→spring map (publishes the sealed keep-three): `positive` → tabA · `attention`/`risk` → tabB · `active`/`neutral` → tabC. A tab pill's spring follows its surface's dominant family (02 §3.5) — tone families carry different perceptual mass, and the snap is part of the surface's voice.
- **[D]** Assignment rule: components pick the spring whose ROLE matches (weight of the moving surface), never a spring that "looks right" per screen. The catalog is the closed set.

---

## 4 — Doctrine by motion class

### 4.1 Entrance

- **[C]** Card/section entrances: `rise` variant — opacity 0→1, y 8→0, `entrance` duration, easeOut; parent `stagger` (0.05s/child) for composed lists.
- **[C]** Streamed/just-added list entries: opacity + y + scale entrance, then a distinct "just-added" state (tinted bg + live chip) until superseded (Q11). Unique ids per insertion, atomic state updates (06 §5) — the infinite-render crash class is a motion-adjacent defect.
- **[C]** Chart/segment fills: scaleX 0→1 origin-left (bars: height 0→value), `fill` duration, easeOut, staggered — the animation expresses accumulation, reading order oldest→latest.
- **[C]** Height reveals (expansions): height 0→'auto' + opacity, `entrance`, easeInOut — bounded disclosure only.

### 4.2 Exit

- **[C]** Everything that mounts can unmount visibly: `AnimatePresence` on every conditional surface.
- **[C]** Sheet exit: y → 100% on `sheet` spring; dim fades `fast`; the two run as one choreography — dim never lingers after its sheet, sheet never slides over a blank dim.
- **[C]** List removals: collapse height + fade (no pop-out jumps).
- **[C]** Confirmation strips: fade/slide in via AnimatePresence when their state arrives.

### 4.3 Choreography — the completion chain

**[M/R]** Every consequential action (02 §4.1 arc) runs ONE orchestrated chain — the reference sequence:

1. input lands → instant press feedback (04 §1.2, one frame)
2. working state: control/sheet flips (tone + composition per the map), inputs lock
3. done state: whole-surface flip to positive — shell, tiles, chips, button together (transition-colors 500 on shells)
4. confirmation strip fades/slides in (AnimatePresence)
5. `850ms` hold → sheet auto-dismisses on the `sheet` spring
6. dim fades `fast`, unblurs — background state already updated in the same pass (fan-out law, master I3)

Stages 2–6 are declared as one variant chain on the component's map — not five separately-timed effects. Timers self-clean on unmount; navigation (if any) waits for done to land.

**The failed branch runs the same chain** [M — R30's law at motion level]: resolution arrives as data (06 §7 — never a timer); `failed` flips tone AND composition to risk in the same pass (never color alone), the recovery surface (retry/refund per 02 §5.7) enters as part of the chain, and retry re-enters at working. No independent error loop beside the chain (§1.4).

### 4.4 Value motion

- **[C]** Numeric changes land visibly: odometer/count-up for money and counters (Q4/Q14); `key`-remount fade/slide where odometer is overkill. A number that swaps silently is a missed animation.
- **[C]** Countdowns tick (interval owned by component state); hitting zero flips STATE — hue + copy + recovery — never color alone (02 §4.4).
- **[M]** Elapsed/live values update without layout shift (tabular-nums, fixed-width digits — 01 §10.1).

### 4.5 Live motion

- **[C]** Live dots pulse: opacity [1, 0.4, 1], 1.6s, repeat Infinity — pulse IS the live signal; a static dot marked "live" is a contradiction (reduced-motion excepted: §5 — the dot remains, the pulse stops).
- **[C]** The latest segment/entry in a sequence carries brightness + glow — glow here is a state signal (recency), permitted by 1.2.
- **[M]** Ticking surfaces (elapsed timers, streaming ledgers) animate per-entry, staggered — never re-render the whole list's motion on each tick.

### 4.6 Effects

- **[C]** Shell ambiance (glow orbs, hairline, deep shadow) is STATIC structure that recolors with state via transition-colors — orbs never animate position or opacity on their own.
- **[D]** Loading skeletons (02 §1.3): opacity breathe per the Skeleton entry (07d §15) — skeletons occupy the real anatomy (never a spinner replacing a layout).
- **[C]** Press feedback: whileTap scale 0.985 on all interactive rows/blocks [M — five drift scales in census collapse to this one]. Hover: tint step only — hover-translate lifts are banned as affordance on data surfaces (01 §6.1).

---

## 5 — Reduced motion

**[M/D]** The `prefers-reduced-motion` preference is honored system-wide:

- transforms (rise, slide, scale) reduce to opacity fades or hard state cuts
- pulses stop (live state still indicated — dot present, no pulse)
- choreography chains collapse to instant state flips with the confirmation strip still appearing
- drag follows the finger still (direct manipulation is input, not ornament) but spring-back becomes a short fade
- every interaction still completes — motion simplifies, function never degrades (04 §6 tie)

Declared per component in 07; the collapse behavior is the default, exceptions must argue.

---

## 6 — Banned-motion register

**[M/C/R]** Each banned pattern cites its law: `transition: all` (I9) · CSS transitions on transform/layout (§2) · unified springs across origins (§1.5) · hover-translate as data affordance (§4.6) · silent value swaps (§4.4) · independent animation loops beside staged consequences (§1.4, A8) · decoration motion with no state meaning (§1.2) · layout thrash in hot paths (§1.6) · hard-cut state changes (§1.1) · five drift tap-scales (§4.6 — one remains) · permanent ambient animation (§4.6) · timer-based resolution flips (06 §7 — resolution is data, the chain only presents it).

---

## 7 — Rule index (MUST summary)

No static transitions · motion carries state meaning · finger owns drag · concurrent = one choreography · per-origin springs from the closed catalog · closed duration scale · transition-colors is the only CSS transition (300 light / 500 shell) · AnimatePresence everywhere · completion chain is one variant chain, timers self-clean, failure runs the same chain to risk with resolution as data (06 §7) · odometer on changed values · pulse on live, zero flips state · tap 0.985 everywhere · reduced-motion collapses to fades, function intact.

---

## 8 — Open items

| Item | Status | Owner |
|---|---|---|
| `pop` spring exact pairing (400/16 vs 400/22) | OPEN — miner rerun owed [M gap] | build phase, first odometer entry |
| `dial` spring constants | OPEN — DialInput 07 entry | build phase |
| Skeleton breathe — sealed at 07d §15 (1→0.55→1, 1.2s) | SEALED [D] — vetoable | user |
| Tab per-tone springs: keep three vs collapse one | SEALED [C] keep-three — vetoable; map published at §3 | user |
| Color-flip 300/500 split | SEALED [D] — vetoable | user |
| Odometer implementation approach (per-digit roll vs count-up) | OPEN | 07 numeric entries |
