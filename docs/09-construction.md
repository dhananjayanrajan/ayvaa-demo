# 09 — CONSTRUCTION: THE PROCEDURE

**Owns completely:** the construction procedure (any imagined component → built accurately from the suite), the routing table (question → owning document), the pattern-admission gate, the decision record, the expectation-guarantee map, and build-phase operation of the suite.
**Status:** v1.0 — proposed. Ratification seals as R28 — and with it, the suite is complete pending the ratification pass (§8).
**Provenance:** [R] = ratified · [C] = old canon (spirit) · [M] = mined evidence · [D] = derived — vetoable.
**Strength:** **M** = MUST · **S** = SHOULD.

---

## 1 — Purpose

The suite's promise (master §0.8): any component built **by following this suite** satisfies the ten expectations. This document is the mechanism — the path every construction takes, so the guarantee holds for anything imagined, not just the 400+ patterns the corpus already proved. Two builders applying this procedure to the same idea reach the same output (master 0.7b); the procedure is also how the suite itself stays bounded (master §0.4): new patterns enter only through the gate, never by extraction.

## 2 — The routing table

Every construction question has exactly one owning document. Ambiguity resolves per master §1's reading rule.

| Question | Owner |
|---|---|
| Is this already a pattern? What does it compose from? | 07a–07f + this document's gate (§4) |
| What does this state MEAN — tone, intensity, mode? | 02 (derivation matrix, entity treatments) |
| What does it SAY, every state? | 03 (bank, budgets, lexicon) |
| How is it structured on screen? Bands? | 08 (page law) + 01 (anatomy) |
| What does it look like — spacing, type, color values? | 01 (closed scales) |
| How does it take input — gestures, keyboard, a11y? | 04 (+ 07 entry of each primitive) |
| How does it move? | 05 (catalog + doctrine) |
| Where does data come from, what derives where? | 06 (boundary, taxonomy) |
| What is the whole state→presentation map? | 02 §4.2 format, per entry in 07 |
| May this be a NEW component at all? | §4 gate here |
| Which layer does it live in? | master I1 |

## 3 — The construction procedure

Seven phases, in order. Each has an exit criterion; skipping a phase is how drift happens (F7/F8's mechanism). The phases are the canon's "define the state model first" rule (AP34) made into a full pipeline. [M/D]

**Phase A — Situate.** Identify the entity (02 §5) and flow (03 §2 lexicon) the idea serves; the stakes and urgency of its surface. Search the catalog (07a–07f). Exit: an entity + treatment reference, and a catalog verdict — **compose** (→ Phase C as assembly), **extend** (variant of an existing pattern → Phase C as variant union), or **admit** (→ §4 gate first).

**Phase B — Semantics before pixels.** Write the state map FIRST (02 §4.2 format): every state, its tone/intensity/mode/composition/copy intent — tones derived by 02, never chosen; copy from the 03 bank with real data slots; composition branches where states demand different structures. Exit: the complete map, reviewable on its own — this becomes the entry's §4.

**Phase C — Anatomy.** Assemble from primitives (07a–07d) per the map's compositions. Place the pattern in its layer (master I1: atoms/universals/composites/domain). Apply 01's closed scales exactly — nothing invented. Exit: anatomy expressible entirely in catalog references + closed values.

**Phase D — Behavior.** Model the lifecycle completely (master I2): states, events, timeout paths, return paths (undo/cancel/handback — no dead ends); clocks owned once (07e §3.4); interaction via 04 (Q-rows, gestures, keyboard, a11y, gating mechanics). Exit: every 04 §2 trigger has a response; every state has a return; no screen will need to own behavior (08 §7.2).

**Phase E — Data.** Define the props contract in 06 §4's five categories; every derivation at the data layer (06 §3.1 — functions of state); parsing once; `dataState` markers where data varies; formatted values arrive formatted. Exit: zero parsing/derivation/formatting left at render.

**Phase F — Motion.** Assign per-state motion from the 05 catalogs (durations, springs by role); the map drives it (master I5); choreograph concurrent moments as one chain (05 §4.3); reduced-motion collapse declared. Exit: no invented values, no CSS-layout motion, no competing loops.

**Phase G — Verify.** Master §5 in rising order: tsc · grep the mechanical rules (08 §9 register for screens; 06 §7 for components) · captures at every state (the map is the shot list) · walkthrough — interactives face the DialInput bar (07c §9); screens face the reconstruction test (08 §1.2) and the live law (08 §7). Exit: the user has SEEN it (master I12 — nothing is done until then).

## 4 — The admission gate

A new component exists only if ALL hold [M — master I7 + 07e §1]:

1. **The assembly test fails:** the idea cannot be built from existing primitives + entity treatments without losing behavior, clarity, or expressiveness. (If it assembles — it MUST assemble; building it as a component is F1.)
2. **Not a variant:** it isn't parametric variation of an existing composition (that's a Props union on the existing entry).
3. **Semantic fit:** its states type against 02 (entity lifecycle or a legitimate new axis — never invented states).
4. **Full anatomy per master I2** — all nine items.
5. **Consumers:** ≥2 real screens, or 1 + a documented reuse trajectory.
6. **User approval** — the gate's final act is always yours.

**Denied ≠ dead:** a denial routes to assembly (worked example 1) or to a data-layer derivation — the need is still served, just at the right layer.

**Admission output:** the decision record (§5) becomes the new 07 entry draft — documentation debt is paid at admission, never after.

## 5 — The decision record [D]

The artifact the procedure produces — and by design it IS the 07a §0 entry format: identity · anatomy · props contract · state map · declaration block · composition rules · provenance. Every phase writes its section (B→§4, C→§2, D→§5, E→§3). Consequence: **an admitted pattern arrives fully documented; a composed assembly leaves behind only its data-layer derivations** — nothing else to maintain. This convergence is the suite's self-documenting mechanism.

## 6 — Worked examples

**6.1 Denied — "medication adherence week view."** Situate: dose entity (02 §5.2), informational-to-elevated stakes, no clock. Catalog search: Ring (07d §11), ContinuityBar (07b §7), FactRows; nothing named "AdherenceCard." Assembly test: the view = one Ring whose value derives from dose records (`adherenceOf(doses, week)` — a 06 §3.1 data-layer function), tone derived by 02 (a week with missed doses carrying recovery → risk chip; clean week → positive; overdue items → attention), streak detail as ContinuityBar segments, numbers as FactRows. Everything assembles. **Verdict: denied — new component would fail gate 1. The derivation lives in the data module; the ring composes on-screen.** F1 prevented mechanically: the corpus would have built `AdherenceCard.tsx`.

**6.2 Admitted — signature capture (consent signing).** Situate: consent entity (02 §5.3), binding stakes (the ceremony arc), no clock. Assembly test: fails genuinely — stroke capture is behavior no primitive owns; a typed-initials fallback exists but the signature artifact is workflow-real. Variant test: fails — nothing to vary. Gate: semantic fit (binding arc integration, states: empty → signing → signed → voided — all 02-typed); anatomy complete per master I2 (pointer capture follows the finger per 05 §1.3, clear/redo return paths, strokes → Blob per 06 §6.2, a11y: the typed-initials path is the non-pointer equivalent — declared, not an afterthought); consumers: consent signing (patient) + partner referral consent — ≥2. **Verdict: admitted** → decision record becomes the 07c entry: `SignatureCapture`, behavior-bearing, Q5 (rubber-clamp edges) + Q6 (keyboard path) + Q13 (haptic on complete), binding-arc copy per 03.

## 7 — Build-phase operation

7.1 **[M]** During the rebuild (a separate conversation per R15's frame; the v1.0 build program sits in git history for re-ratification there), this suite is the governing canon — REDESIGN/ANTI-DESIGN are superseded entirely; per R13's amendment they are **deleted the moment the suite is ratified** (their surviving spirit is already inside the suite).

7.2 **[M/R14]** Open values across the suite (each document's open-items register) seal only with evidence + user approval — exemplar captures, walkthrough breaks, census reruns. Nothing seals silently; nothing stays open past its owning decision.

7.3 **[M]** Every legacy screen rebuilt walks its compositions through §3 — the procedure is also the rebuild discipline (R4/R7 parked rulings execute under it).

7.4 **[M]** Suite amendments follow master §6; contradictions discovered during building go to amendment, never to local drift (F8's law at suite scale).

## 8 — The ratification pass (suite completion)

Master 0.7's conditions, as the concrete remaining acts:

- (a)/(b)/(c) — **met as of this document** (every dimension owned; rules concrete; values sealed-with-provenance or open-with-owner).
- (d) — proven by the walkthrough pass, not by claim.
- (e) — **yours**: each detail document carries a proposed ruling number (01 open · 02→R16 · 03→R17 · 04→R18 · 05→R19 · 06→R20 · 07a→R21 · 07b→R22 · 07c→R23 · 07d→R24 · 07e→R25 · 07f→R26 · 08→R27 · this→R28). Walk, veto the flagged [D] calls, ratify each.
- On the last ratification: master amendment log records suite completion + version bump; `redesign.md`/`anti-design.md` are deleted; the suite is the whole world (master §6.4).

## 9 — Rule index (MUST summary)

Seven phases in order, each with its exit · semantics before pixels · assembly test decides component-hood · denied routes to the right layer · admission pays its documentation debt · the decision record is the 07 entry · open values seal with evidence only · walkthrough is the final authority for everything.

## 10 — Open items

| Item | Status | Owner |
|---|---|---|
| Ratification of 01–08 (R16–R27 proposals) | OPEN — the pass is §8(e) | user |
| Old-canon deletion act | OPEN — gated on §8(e) | user |
| Walkthrough order for (d) | OPEN | build conversation |
| Re-ratification of parked build rulings (R4/R5/R7/R8) against the suite | OPEN | build conversation |
