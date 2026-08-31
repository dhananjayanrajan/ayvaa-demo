# AYVAA CAREGIVER — Component Refactor: Binding Rules of Engagement

**For the executing agent.** This document is the standing, non-negotiable rulebook for the
entire component refactor. It consolidates the user's explicit process rules with every
binding rule already established in `project-handoff.md` §4 (the real gate) and the doctrine
(§3). Read it before every stage. When this document and any other doc disagree, this
document plus the DOCTRINE in `project-handoff.md` §3 win.

---

## 1. THE USER'S SEVEN PROCESS RULES (verbatim intent, binding)

1. **Strict step-by-step, stage-by-stage process.** The full refactor proceeds exactly as
   expected — one stage at a time, in dependency order, never skipping ahead. No stage is
   "done" until its own verification passes.

2. **Plan before change; force adherence with skills.** Never rush into changes. Plan first,
   then build and load the required skills to keep myself stuck to the plan of action every
   single time. Skills are the enforcement mechanism for discipline.

3. **No token-wasting rehashes.** Never respond with rehashes of what has been understood,
   learnt, or modified — except a final hyper-concise table summary. Communicate only signal.

4. **Constant documentation at every stage.** Every change and every decision is recorded
   exactly per the pattern in `component-migrations.md` (append-only ledger),
   `component-coverage.md` (coverage tracker), and `project-handoff.md` — at every single
   stage, without fail.

5. **Confirm the codebase with the real gate after every stage.** Run the `npx` TypeScript
   check after completing every single stage. If there are errors, fix them immediately.
   Only run git commands when everything is stable.

6. **Never rush without understanding.** Never proceed without being fully clear over the
   state of the code being modified. Only when fully clear may massive bulk changes proceed.

7. **Conserve tokens with bulk changes.** Use every technique and shortcut to make vast,
   bulk changes without rewriting everything line by line. Prefer mechanical, tool-driven,
   large-chunk edits over line-by-line rewrites.

8. **No keep/refactor contemplation — every component is abstracted.** Never contemplate
   whether a component stays as-is or gets refactored. EVERY component must be turned into a
   clean, reusable, modular component. Even the most customized, highly-specific components
   feed ALL their uniqueness through the modular component's props — turning even uniquely
   built components into a structured framework. Nothing stays hand-rolled.

9. **No design-decision head-breaking — use the design skills.** Never spend tokens
   deliberating design decisions on any component. Load and use the REDESIGN skill
   (`src/.claude/skills/REDESIGN.md`) and the ANTI-DESIGN skill
   (`src/.claude/skills/ANTI-DESIGN.md`) whenever a design decision must be adjusted. The ONE
   strictly-banned constraint: never meddle with utility, animations, data, or state — these
   were intentionally built into each component and must not be lost during the refactor.

10. **Refactor-only mandate — no UI corrections, ever.** The job is NO LONGER to fix minor UI
    inconsistencies or improve the design per REDESIGN/ANTI-DESIGN by any means. ALL effort,
    time, and tokens go PURELY to fully refactoring components exactly per `refactor-goals.md`
    and `refactor-targets.md`, completing all of them extremely well. The end state is a
    massive transformation of the entire components codebase — from completely independent,
    specially designed, highly interactive components into a highly reusable framework where
    EVERY component is fully built on abstracted modular base components while STILL
    maintaining their extremely customized, tailored output for highly specific purposes as
    they exist right now. All customization that makes them unique is fed in through the
    modular components — turning even extremely uniquely built components into a reusable
    structured framework. Never waste tokens on UI corrections, decision monologues, or
    recitals back to the user. Tokens are spent on achieving goals, not affirming. Never
    forget the standing subtasks: commit after each stage and update documents exactly as
    instructed.

11. **MASSIVE NORMALIZATION, not nesting dolls (user correction, binding).** A massive refactor
    is NOT mild edits, and it is NOT moving code into a universal and leaving a thin wrapper
    file that just re-renders it with props ("Russian nesting dolls"). It means a massive
    normalization of the components themselves: their folders, their file names, and every
    import that points at them. Concretely: (a) a specific component that has become a pure
    prop-config of a universal (no domain logic, no data sourcing, no multi-call-site value)
    is DELETED and its config inlined at the call site(s) — the wrapper file is removed, not
    kept as a one-line re-export; (b) a specific component that retains genuine domain logic
    is KEPT but its file is normalized (correct folder, correct name, every import re-pointed
    to the canonical location); (c) same-family components are CONSOLIDATED into a single
    canonical file where they share a pattern. The end state is a genuinely smaller, navigable
    tree — component count must fall, folders coherent, names canonical. Hard constraint
    unchanged: identical rendered output for identical props — normalization changes WHERE code
    lives and HOW it is named/imported, never WHAT it renders.

---

## 2. THE REAL GATE (binding — from project-handoff §4)

1. **Compile gate = `npx tsc --noEmit -p tsconfig.app.json` plus `-p tsconfig.node.json`.**
   Exit codes read DIRECTLY, never piped through `head` unguarded (head swallows exit codes).
   Plain `npx tsc --noEmit` compiles NOTHING (solution-style root config: `"files": []`,
   references only) — this exact mistake invalidated ~30 gates of history.
2. **A gate that never fails is not a gate.** If a long run of greens occurs, run a negative
   control (deliberately break a file, confirm the gate fails, revert).
3. **No blind line-number deletes.** Content-matched edits only; if line numbers are
   unavoidable, read the exact line first and verify the anchor.
4. **Disk is authoritative over clipboard.** When output contradicts expectations, inspect
   disk state directly.
5. **Terminal crashes happen.** Recovery: full read-only state inspection (moves on disk,
   git status, grep counts, real gate) — determine what ran, repair only what is missing,
   then formal gates.
6. **Heredoc emits are first-and-final; one clean full re-emit permitted, then the message
   ends.** Hub files (phone/*) get their own message, one block, no sibling emits.
7. **Staging checks before trust.** When a sed is risky, split it — apply, grep the result,
   THEN build the next step on the confirmed state.
8. **Read batches capped at 6 files, piped through `xclip -selection clipboard`.** Long
   pastes can truncate or corrupt in transit — a mangled paste is suspect until spot-checked
   against disk.
9. **One stage per exchange when verification gates are involved.** Large chunks are
   encouraged BETWEEN gates, but every chunk still ends with gate + proof output, and
   unexpected gate results stop everything until root-caused.
10. **Commits: conventional format, plain-English bullet bodies, only changed files, large
    commits combining multiple steps (no tiny doc-only commits).** Ledger and coverage
    entries ride with the next substantial commit.
11. **Deletions only after grep proves zero consumers (both path styles).**
12. **The migration ledger is append-only** and records every rewire, keep-ruling,
    normalization flag, preserved difference, incident, and correction.
13. **One sweep/batch in flight — never hold two families' bodies at once.**

---

## 3. THE DOCTRINE (binding — from project-handoff §3)

- **Two-tier end state:** (1) Universal components in `phone/` whose prop APIs cover the FULL
  observed variation space, with rich variant props and exact-compat className overrides at
  every slot, never designed from one caller's shape. (2) Specific components as PURE
  COMPOSITION — arrangement + data + domain logic, zero hand-rolled pattern instances.
- **NORMALIZATION MANDATE (user correction, binding — supersedes the nesting-doll reading):**
  the refactor is NOT satisfied by moving code into a universal and leaving a thin wrapper
  file that just re-renders it with props. It means a MASSIVE NORMALIZATION of the components
  themselves: folders, file names, and every import. Pure-config wrappers are DELETED and
  inlined at call sites; same-family files are CONSOLIDATED into one canonical file; folders
  and names are made coherent; every import is re-pointed. End state = genuinely smaller,
  navigable tree; component count must fall. Identical rendered output for identical props
  unchanged — normalization changes WHERE code lives and HOW it is named/imported, never WHAT
  it renders.
- **Family-close rule:** a component is done only when it is pure composition. "Keep" is
  legitimate only for what is genuinely composition after decomposition.
- **Hard constraint:** identical rendered output for identical props. Abstraction via variant
  props and className overrides, never redesign. Micro-deviations only when ledgered.
- **Retracted doctrine:** "merge only where ≥2 implementations / no abstractions for one
  caller / bolt-on economics" — superseded by the founding ruling. Uniqueness is the INPUT to
  abstraction, not a reason to skip it.
- **Universal-by-universal sweep method:** dependency order — Row (in flight) → StepList/
  Timeline → FactRows/StatStrip extensions → PhaseShell consolidation → StatusStrip → Quote
  variants → EmptyState → Tabs/Filters → Options/Actions → Field (forms) → Identity →
  clinical residuals. For each: (1) gather corpus-wide pattern evidence, (2) design/build the
  universal against the full variation space, hub-first with its own message, (3) sweep the
  entire corpus adopting it with real-gate + grep adoption-count + retired-pattern
  verification, (4) ledger, (5) one large commit per sweep stage.
- **Final certification (B18, redefined):** zero hand-rolled pattern instances outside
  `phone/` — grep-checkable, not judgment-based. Plus: retired-path sweep zero, real gate
  clean (after Category C disposition), dedup audit, unused-vendor flag list, orphan-register
  resolution, dev-server visual walkthrough of touched surfaces, coverage tracker at 100%
  under the composition rule. Only then does screen rebuilding resume.

---

## 4. THE FULL PROGRESSION — MASTER TODO TABLE

Every stage below is a todo item. Each stage ends with: real gate (rule §2.1), grep proofs
where required, ledger + coverage update (rule §1.4), and a large conventional commit (rule
§2.10). One sweep in flight at a time (rule §2.13).

| # | Stage | Scope / Deliverable | Verification |
|---|-------|--------------------|--------------|
| 0 | **Category C disposition ruling** | Get user ruling: park C (recommended) vs fix now. If park, log as pre-certification workstream. | Ruling recorded in ledger |
| 1 | **Row sweep stage 2 — chevron verification** | Verify CreateAccountCard + PartnerBillingCard adapters for duplicate trailing chevrons; fix with `showChevron={false}` + trailing as needed. | Real gate + visual check |
| 2 | **Row sweep stage 2 — list interiors** | Convert ServiceRow, MedRow, DocRow, EntryRow, StepRow, ChecklistRow, FieldTaskRow, AddCertificationRow, CertificationRow (professional profile), alert/staff/referral/device rows inside B10–B11 cards, sheet option rows (partner referral options) onto Row. | Real gate + grep adoption count |
| 3 | **Row sweep stage 2 — close** | Grep proof of zero remaining hand-rolled row patterns (signature: `flex w-full items-center gap-3` + Tile/custom leading + title/subtitle anatomy). Ledger + large commit. | Real gate + grep zero-proof |
| 4 | **StepList/Timeline universal** | Build universal against full variation space (RetryLadder, NoAvailabilityLadder, CycleStep, ExecutionTrail, CaptureChainCard steps, RecheckResolutionCard probes, IncidentTimeline, WithdrawalCard closure, ApprovalCard verification, ReversedOffer/Rollback traces, RefundCard events, MonthTimeline, AuditTimeline, StepTimeline, LiveStepper, JourneyRail, JourneyTime, DispatchSequence, WizardStepper; MiniTimeline already canonical). Sweep corpus adopting it. | Real gate + grep adoption count + retired-pattern sweep |
| 5 | **FactRows/StatStrip extensions** | Extend FactRows + build StatStrip universal (divide-x strips + big-number cells + Vault TapStat). Sweep corpus. | Real gate + grep proofs |
| 6 | **PhaseShell consolidation** | Absorb 5 residuals (ApprovalCard, WithdrawalCard, IncidentLinkingCard, ReversedOfferTraceCard, RollbackTraceCard) + slate theme + state-dependent content slots. | Real gate + grep proofs |
| 7 | **StatusStrip universal** | Build StatusStrip (DeliveryStrip + CallStrip — identical animated strips, ConfirmStrip's two-line sibling). Sweep corpus. | Real gate + grep proofs |
| 8 | **Quote variants** | Normalize QuotePanel variants across corpus. | Real gate + grep proofs |
| 9 | **EmptyState universal** | Build cause-aware EmptyState (EmptyFilterState pair, EmptyMatches, EmptyTabState, CaughtUpCard, inline empty states). Sweep corpus. **REDO under NORMALIZATION MANDATE:** delete pure-config wrappers and inline at call sites, consolidate same-family files, normalize folders/names/imports. | Real gate + grep proofs |
| 10 | **Tabs/Filters universal** | Build SegmentedTabs + FilterBar (3× FilterTabs, VisitTabs, DayFilterBar, ModeTabs, FilterBar, ActiveFilterStrip). Sweep corpus. | Real gate + grep proofs |
| 11 | **Options/Actions universal** | Build OptionRow tones + ActionPair (ResendRow, SubmitButton severity map, quick-reply chips, referral option rows). Sweep corpus. | Real gate + grep proofs |
| 12 | **Field (forms) universal** | Build Field universal base (onboarding CredentialRow promotion; P01/A13/PasswordCard promotion debt). Sweep corpus. | Real gate + grep proofs |
| 13 | **Identity universal** | Build Avatar + CredentialRow/Card + TrustCell (avatars, CaptureTile, SelfieCaptureCard, CredentialCards, TrustCell, SkillsCloud). Sweep corpus. | Real gate + grep proofs |
| 14 | **Clinical residuals** | Re-shell MedVerificationPanel, VitalsPanel, NotesPanel, ExecutionTrail-adjacent on universals. | Real gate + grep proofs |
| 15 | **Category C workstream** (if parked at stage 0) | Fix all 47 Category C pre-refactor bugs (P24 ×12, PR07 ×4, P25 ×3, A15 ×3, PR04 ×2, PR03 ×2, A11 ×2, singles). | Real gate clean (zero errors) |
| 16 | **Final certification (B18)** | Zero hand-rolled pattern instances outside phone/ (grep-checkable); retired-path sweep zero; real gate clean; dedup audit; unused-vendor flag list; orphan-register resolution (RecordSheet deletion); dev-server visual walkthrough of touched surfaces; coverage tracker at 100% under composition rule. | Real gate + grep zero-proof + coverage 100% |
| 17 | **Screen rebuilding resumes** | Rebuild page files on the normalized library (punch lists: hairline dividers, whileHover/group-hover violations, divide-x stat strips, CompletedCard chevron restoration, gold-vs-amber collapse, CaptureChainCard token bug). | Real gate + visual walkthrough |

---

## 5. STANDING REGISTERS (carried forward — see project-handoff §6)

- **Orphans (delete at final cert):** RecordSheet (professional/history).
- **Near-duplicate pairs (logged for rebuild; both keep):** SubmittedPanel/TriggerPreview ·
  BillingFooter/PartnerPatientFooter · EventFanOutCard/LiveFanOutCard ·
  RetryLadderCard/NoAvailabilityLadder · EmptyFilterState pair.
- **PhaseShell consolidation candidates:** ApprovalCard, WithdrawalCard, IncidentLinkingCard,
  ReversedOfferTraceCard, RollbackTraceCard.
- **Reclassifications:** ResendRow → Actions; DeliveryStrip + CallStrip → StatusStrip;
  onboarding CredentialRow → Field.
- **Punch lists (deferred to screen-rebuild):** hairline dividers (~25); whileHover/
  hover-brightness/group-hover violations (~20); divide-x stat strips; CompletedCard chevron
  restoration; CaptureChainCard `bg-mint text-brand-ink` token bug.
- **Vendor quarantine (Ruling 1):** smoothui (~200) + ui/ (29 shadcn) frozen, never edited.
  Unused-vendor flag list at final cert.

---

## 6. OPEN DECISIONS (in order)

1. **Category C disposition** (park vs fix now) — recommendation: park, resume Row.
2. Two navigator-card chevron verifications (Row stage 2).
3. Parked for rebuild: gold-vs-amber collapse, CompletedCard chevron restoration.

---

## 7. HOW TO START

1. ~~Confirm Category C disposition (stage 0)~~ — RESOLVED: park (Stage 15 workstream).
2. ~~Verify the two navigator-card chevron states (stage 1)~~ — RESOLVED.
3. ~~Resume Row sweep stage 2, next tranche: list interiors (stage 2)~~ — CLOSED (Stages 1-3).
4. Current position: Stages 0-8 CLOSED (commits 00bcba7, 2c968b4, 3637fab, 0a024ef, ae70312,
   6b02662, e75c366). Stage 9 (EmptyState universal) NEXT as a REDO under the NORMALIZATION
   MANDATE (§1.11, §3): the universal is built; delete pure-config wrappers and inline at call
   sites, consolidate same-family files, normalize folders/names/imports, real gate + grep
   proofs, ledger, large commit.
5. Hold every rule in §1 and §2. The rules exist because each one was paid for.
