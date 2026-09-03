# 04 — INTERACTION

**Owns completely:** the trigger taxonomy, gesture specs, keyboard standard, the a11y standard, the QoL catalog (default-on behaviors with conditions), gating mechanics, hold-to-confirm, and per-pattern interaction requirements.
**Status:** v1.0 — proposed. [D] expansions vetoable; ratification seals as R18.
**Provenance:** [R] = ratified foundation · [C] = old canon (spirit) · [M] = mined evidence · [D] = derived — vetoable.
**Strength:** **M** = MUST · **S** = SHOULD.

---

## 1 — First principles

1.1 **[M]** Everything visible is responsive. Any element that looks interactive responds to hover (desktop), press (touch), focus (keyboard), and data change — a static-looking control is a defect. Inverse: an element that never takes input renders no affordance (no chevron, no tint) — affordance promises behavior.

1.2 **[M]** Feedback is instant. Every input lands a visible response within one frame — a pressed state, a tint step, a morph. No input is ever acknowledged only after a network beat or a timeout. Async outcomes arrive later via the lifecycle arc; the *acknowledgment* is instant.

1.3 **[M]** QoL is default-on, not opted-in. The catalog (§4) ships inside components; a screen wires none of it. This is E6/E10's mechanism: built once at the right layer, inherited everywhere.

1.4 **[C]** Dead controls are defects. Every control drives real state through a visible lifecycle; toasts report outcomes, they never replace visible state change.

## 2 — Trigger taxonomy

Every input a component may receive, closed set [D — from your brainstorm list, corrected]:

**User input:** tap/press · long-press/hold · double-tap (rare, opt-in only) · swipe (directional, paged) · drag (free, constrained, or detach) · scroll · keyboard · voice/screenreader activation (via a11y layer).

**Data input:** prop/state change · live stream entry · clock crossing a threshold · dependency signal from another component (via lifted state, per master I3).

**System input:** focus (keyboard nav, screen reader) · reduced-motion preference (05 §7) · secure storage / biometric availability (rare, device-level).

- **[M]** No silent rows: every implemented trigger appears in its component's interaction declaration (07 format); every trigger has a defined response. A trigger with no response is either deleted from the component or given one.
- **[M]** Touch targets: minimum 44px effective height on all interactive elements [D — platform standard]; inline text links sized to their line.

## 3 — Gestures

Per-gesture contracts. Gesture vocabulary is complete per master 04 ownership — no pointer row is silent [R/D6].

### 3.1 Tap / press
The primary trigger. **[C]** Tap feedback on all interactive rows: scale 0.985 (seed; 05 owns values). Controlled rows (SegmentedTabs, OptionRow, radio rows) per 07 anatomy.

### 3.2 Swipe — paged
**[C/D]** Attached to tabbed surfaces (SegmentedTabs): horizontal drag switches page; panels pre-staged (adjacent content rendered, ready to slide in); drag follows the finger with elastic resistance (dragElastic ~0.18 seed), no momentum drift; the active pill morphs via layout animation; directional consistency (left/right = next/prev). Swipe never fires on vertical-scroll surfaces (direction locking).

### 3.3 Drag — constrained
**[C/D]** Sheets: vertical drag-to-dismiss — grabber affords it; drag follows finger; past threshold → dismiss choreography (05 §5); released short → spring back. Drag-to-confirm where suited (e.g. action panels): same mechanics, confirm threshold. Grabber cursor (`cursor-grab`/`grabbing`) on draggable surfaces.

### 3.4 Hold (long-press)
**[D — decides D3]** Two uses, both opt-in per component:
- **Progressive disclosure** (S): context actions on rows — only where a tap already opens the row (hold adds, never replaces).
- **Hold-to-confirm** for binding-stakes ceremony: reserved for the highest-cost irreversible acts ONLY — withdrawal of consent, payment capture above a threshold. The hold (600ms) with a filling ring + haptic-on-availability, then the binding arc proceeds. The button itself states the consequence; the hold is the friction, not a second confirm dialog. Release early = spring back, nothing happens. **Not** applied to payment below threshold or any medium-weight verb (03 §2) — a plain button plus stated consequences suffices; over-ceremony trains users to stop reading.
- **[M]** Hold, like every trigger, declares itself: the affordance states "hold to withdraw" — never a hidden gesture.

### 3.5 Pinch
**[D — decides D6-candidate]** Deferred: pinch-zoom applies to media/documents only (07 entries decide); never a page-level gesture. Not in the base vocabulary.

### 3.6 Scroll
**[C]** The body zone scrolls (01 §1.2); overscroll bounces within the frame; edge fades where content continues past the fold (S). Scroll never competes with a drag surface (direction locking M).

### 3.7 Keyboard
Full equivalent operation for every interactive element [M]:
- Tab/Shift-Tab traverses in visual order; focus-visible ring per 01 (never removed).
- Enter/Space activate buttons and rows; Esc closes sheets/dims (dismiss, not navigate) and reverts armed states.
- Arrows within composite controls (tabs, radios, steppers, dial inputs): roving focus; +/- step dials [C DialInput evidence].
- Keyboard equivalents are declared per component in 07; a keyboard-impossible interaction (e.g. hold-to-confirm: offer key alternative "press Enter and hold"? — OPEN, §8) is stated in the entry.

## 4 — The QoL catalog

Default-on behaviors. Each row: the behavior, its trigger condition, and where it lives (layer). A component that qualifies for a row MUST ship it; the 07 entry lists applicable rows.

| # | Behavior | Condition | Layer |
|---|---|---|---|
| Q1 | Instant press feedback (scale, tint step) | every interactive element | universals/composites |
| Q2 | Drag-to-dismiss sheets | every sheet | SheetShell |
| Q3 | Swipe-paged tabs with pre-staged panels | every tabbed surface | SegmentedTabs |
| Q4 | Odometer/count-up on numeric change | every value that changes numerically (money, counts, timers) | numeric primitives |
| Q5 | Edge fades + rubber-clamp on drag surfaces | draggable/scrollable bounds | universals |
| Q6 | Keyboard equivalent + focus-visible | every interactive element | all |
| Q7 | Gating that states its reason | every gated control | composites |
| Q8 | Completion choreography | every consequential action (02 §4.1 arc) | composites |
| Q8b | Auto-dismiss confirmation with dim-unblur | sheets that complete an act | SheetShell |
| Q9 | Cause-diagnosing empty states | every list | list primitives |
| Q10 | Persisted per-mode state (reopen never resets) | every tabbed/sheet state owner | composites |
| Q11 | Just-added state for streamed entries (tint + live chip until superseded) | every streamed list | list primitives |
| Q12 | Live pulse on live dots | every live state | LiveDot |
| Q13 | Haptics where meaningful (on hold-complete, on done of binding acts) | device supports; demo simulates | composites, opt-out |
| Q14 | Value-that-changed visibly lands (key-remount fade/slide) | every changed display value | numeric primitives |

- **[M]** Q-rows are inherited by composition, not re-wired per screen. A screen discovering it needs to hand-wire a Q-row means the component is at the wrong layer — fix the layer.
- **[D]** Q13 haptics: demo-level = no-op; declared so the build phase implements, not invents.

## 5 — Gating mechanics

5.1 **[M]** A gated control states its reason in itself — label or intrinsic note ("Pick at least one day to continue"), `aria-disabled`, muted fill, `cursor-not-allowed`. No adjacent hint duplicating what the label can say (03 §8); no silent disabled.

5.2 **[M]** Gating is live: the gate derives from state (single-source, I6) — completing the requirement unlocks in the same render pass. A user who fixed the cause should never see a stale disabled state.

5.3 **[M]** Completed actions stay disabled in their done state — status derives from the persisted record; reopening never resets (D4).

5.4 **[D]** Multi-step forms carry a live setup strip: status dot (amber pulse while incomplete, emerald check when ready), "N of M left" in the state hue, one full-width meter animating width + gradient (amber → emerald) from derived completion [C — P01 evidence]. The CTA gate derives from the same derivation as the strip — one source.

5.5 **[M]** Blocking states lock the inputs they protect (02 §4.3) — and the lock is stated.

## 6 — A11y standard

- **[M]** Semantics before styling: buttons are buttons (`<button>`), rows are buttons with `role` where they act as one, toggles `aria-pressed`, tabs `role=tablist/tab` + `aria-selected`, radios `role=radiogroup/radio` + `aria-checked`, expansions `aria-expanded` + the visible rotating chevron [C].
- **[M]** Every icon-only control carries `aria-label` naming its action; every icon-only status chip carries `aria-label` naming the state.
- **[M]** Focus-visible ring on every interactive element; focus moves predictably (into sheets on open, back to trigger on close); focus is never trapped without Esc.
- **[M]** Live regions: streamed entries and status flips announce (`aria-live=polite`); urgent escalations (person-safety) announce assertively [D].
- **[M]** Disabled/working states set both `disabled`/`aria-disabled` and their visual mute together.
- **[S]** Reduced-motion behavior is declared per component (05 §7); interaction still completes — only the motion simplifies.

## 7 — Per-pattern requirements (preview of 07 format)

Every 07 entry declares: applicable Q-rows · gesture set · keyboard map · a11y roles · gating conditions. Example shape:

> **Completion Sheet** — Q2, Q4, Q6, Q7, Q8, Q8b, Q10 · gestures: drag-dismiss, (hold-to-confirm if binding) · keyboard: Esc dismiss, Enter submit, focus in/out · a11y: dialog role, aria-modal, labelledby · gating: derives from form validity, states reason.

## 8 — Open items

| Item | Status | Owner |
|---|---|---|
| Hold-to-confirm keyboard alternative (hold vs Enter-hold) | OPEN | 07 binding entries |
| Haptic map per act | OPEN | build phase |
| Double-tap uses (if any exist) | OPEN — likely none | 07 audit |
| Touch-target audit for inline chips as controls | OPEN | 07 |

## 9 — Rule index (MUST summary)

Everything visible responds · instant feedback · QoL default-on and inherited · no dead controls · no silent triggers · 44px targets · swipe pre-staged + direction-locked · drag follows finger with spring-back · hold declares itself · full keyboard equivalence · a11y roles before styling · gating states reason in itself, derives live, never resets · blocking locks and states why · Q-rows never hand-wired by screens.
