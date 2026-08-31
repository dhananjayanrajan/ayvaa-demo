# AYVAA CAREGIVER — Component Refactor: Complete Handoff Document

**For the incoming agent.** This document is the single sequential record of the entire
component refactor: every plan, stage, audit, doctrine, reversal, decision, incident, and
verified state, ending at the exact paused point. Read it fully before touching anything.

**Structure of this document:** a narrative map (§1–§12), followed by verbatim primary
sources as appendices — Appendix A (the original plan), Appendix B (the full state audit),
Appendix C (the doctrine-reversal ruling). When the narrative and an appendix disagree, the
appendix is the source; when an appendix and the current doctrine disagree, the DOCTRINE
section (§3) wins — it postdates them.

**Required reading, provided separately by the user (do not assume their contents):**
1. The Goal document (the end-state definition — authoritative over everything else)
2. The current `src/` file tree
3. The git commit log
**WARNING on the Goal document:** its trailing "Where we actually stand" section predates this
session (21 primitives, F1 ~35%, data moves pending) — treat it as historical. §2 of this
document is the current state of record.

4. On disk: `docs/component-migrations.md` (append-only ledger, the authoritative history)
   and `docs/component-coverage.md` (coverage tracker). This document maps how they got
   that way; they record the per-action detail.

**The user's standing instruction about reversals:** every reset, rework, and doctrine
reversal in this history was INTENTIONAL and is considered essential to reaching the goals.
Do not treat any of it as drift to be undone.

---

## 1. THE ARC — six eras of this job

**Era 1 — The original plan (B1–B18).** A batch-chain refactor: function-based family
regrouping (F0–F14), batches B1–B18 in dependency order, hard page freeze (import
re-pointing only), behavior preservation, and the guardrail "merge only where ≥2
implementations do the same job; no abstractions for one caller." Two structural rulings:
Ruling 1 (vendor trees `components/smoothui/` and `components/ui/` frozen, never edited;
unused-vendor flag list deferred to final certification) and Ruling 2 (misfiled data modules
move to `src/data/`, not rewritten). Full text in Appendix A.

**Era 2 — The audit.** B1–B10 were "done" but the audit found the critical defect: **family
membership was never locked per batch** — batches closed on whatever was read, not the
family's full inventory. F1 (sheets) only ~35% processed; B11–B18 untouched; data moves and
vendor flag list unexecuted; no coverage checklist existed, so nothing was provable. The
audit prescribed: coverage checklist first, then finish families, then certification. Full
text in Appendix B.

**Era 3 — The corrected execution.** A new session executed the audit's sequence: coverage
checklist written and committed; Ruling 2 executed (12 modules moved — including the 12th,
`sessionExecution.ts`, that the audit's list of 11 missed; 53 consumers re-pointed; one
sweep-gap incident caught and fixed); F1 finished (partner's 14 sheets rewired onto an
extended canonical SheetShell; professional's 7; the audit's patient pending-list discovered
12/12 stale — all already canonical); F2 closed; placement debts (FactRows, AccentHero)
promoted; B10 closed (48/48 read and ruled); B11 closed (39/39 read and ruled; Overline
promoted mid-batch).

**Era 4 — The doctrine reversal (the user's correction).** The B9–B11 keep-rulings answered
the wrong question. The user revealed that every component was INTENTIONALLY built unique —
uniqueness is the input to abstraction, not a reason to skip it. The goal was never dedup:
it is decomposition into universal primitives + thin specific compositions. This superseded
the remaining batch chain with a universal-by-universal sweep program. Full ruling in
Appendix C; the binding doctrine in §4.

**Era 5 — Sweep 1 (Row) + the gate crisis.** The Row universal was built against the full
observed variation space and adopted by 11 file-tier conversions + 6 navigator cards. During
adoption, a clipboard/disk contradiction exposed that **the compile gate had been vacuous
all along** — root `tsconfig.json` is solution-style (`"files": []`, references only), so
plain `npx tsc --noEmit` compiles ZERO files and always exits 0. Every prior "TSC CLEAN"
proved nothing. The real gate (`tsc -p tsconfig.app.json`) revealed 129 errors in 85 files,
categorized A/B/C/D (see §7). A, B, and D are fixed and closed; C (47 pre-refactor bugs) is
parked for a workstream ruling.

**Era 6 — Now.** Row sweep stage 2 (corpus adoption) is ~25% complete and paused at the
Category C disposition decision. The gate is real, the doctrine is set, the method is proven.

**Era 7 — The universal sweeps (Stages 0-6 closed).** Category C ruled PARK (Stage 0). Row
sweep stage 2 closed (Stages 1-3): chevron verification + 15 list/card/sheet-option
conversions, Row hub extended (align/padding/disabled/titleMeta/body). StepList universal
built and swept (Stage 4, 13 timelines + RecheckRulesList→Row). StatStrip added to kit and
swept (Stage 5, 7 divide-x strips). PhaseShell consolidation closed (Stage 6): slate theme +
10 shells onto PhaseHero + ProfilePreviewSheet sheet gap closed + IncidentLinkingCard
timeline→StepList. StatusStrip universal closed (Stage 7). Quote variants closed (Stage 8).
Gate standing: 33 errors, pure Category C (baseline unchanged). Current position: Stage 9
(EmptyState universal) — REDO under the NORMALIZATION MANDATE (see §3): the initial Stage 9
sweep produced nesting-doll wrappers and is being redone as real folder/file/import
normalization.

---

## 2. WHAT STANDS (verified — do not redo)

- **Canonical library, `components/phone/` — 28 files:** kit, SheetShell, LifecycleButton,
  OptionRow, DarkPanel, HeroCells, PhaseHero, FactTile, MiniTimeline, NoteStrip, ExpandRow,
  QuotePanel, StatusPill, Pager, PhoneFrame, Screen, AppBar, NavBar, PushPreview,
  ScreenshotButton, Splash (the original 21) + FactRows, AccentHero, Overline (promotions) +
  ConfirmStrip, Row, StepList, StatusStrip, EmptyState (new universals). FactRows is extended
  (mono variant + className overrides); SheetShell is extended (height: full/auto/scroll,
  header slot); PhaseHero is extended (slate theme key; theme prop is structural — callers
  pass custom PhaseHeroTheme objects); kit is extended (StatStrip hub).
- **Pre-session deletions (grep-verified zero consumers, per the audit):** phone/Controls,
  phone/ScreenBlocks, patient/matching/SheetShell, patient/onboarding/SheetShell,
  professional/payouts/SheetShell, admin/ui/BottomSheet, admin/ui/SheetHeader,
  admin/escalations/WarnHero, admin/ui/TonalButton.
- **Ruling 2 executed:** 12 data modules live in `src/data/` (two collision-forced renames:
  `partnerPerformanceTypes.ts`, `partnerBillingTypes.ts`); zero retired-path references.
- **F1 shell layer closed:** all 57 sheet files use canonical SheetShell (40 rewired,
  5 content-fragment keep-rulings, 12 already-canonical). The B4 precedent holds: sheets
  with self-owned non-blur dims keep them (the canonical dim adds backdrop-blur — a visual
  change).
- **F2 closed:** all role heroes on kit Hero / PhaseHero / AccentHero or keep-ruled
  (professional ProfileHero bottom-band; patient onboarding Hero brand splash). Gold stays
  in the HeroAccent map (single consumer RxHero; collapse = visual change — ruled by the
  behavior-preservation constraint; revisit at screen-rebuild).
- **Placement debts:** ALL resolved (FactRows, AccentHero, Overline promoted).
- **B10/B11 reads:** every prof/partner/admin/system card file has been READ with consumer
  maps — that evidence base is complete and reusable; the keep-rulings are superseded by the
  doctrine reversal, but the reads are gold.
- **Row universal stage 1:** 11 conversions + 6 navigator cards live on Row, real-gate clean.
- **Row universal stage 2 (Stages 1-3):** chevron verification (CreateAccountCard + PartnerBillingCard `showChevron={false}`) + 15 list/card/sheet-option conversions; Row hub extended (align/padding/disabled/titleMeta/body). Grep zero-proof of hand-rolled row signatures. Commit 2c968b4.
- **StepList universal (Stage 4):** phone/StepList.tsx built against full variation space; 13 timeline files converted + RecheckRulesList→Row. Grep zero-proof of vertical-rail timelines. Commit 3637fab.
- **StatStrip (Stage 5):** added to phone/kit; 7 divide-x strips converted; kit Stat now zero-consumer (removal flagged at final cert). Commit 0a024ef.
- **PhaseShell consolidation (Stage 6):** slate theme + 10 shells onto PhaseHero (5 residuals + 5 orb-anatomy finds); ProfilePreviewSheet sheet gap closed onto SheetShell; IncidentLinkingCard timeline→StepList. Commit ae70312.
- **Categories A/B/D of the gate crisis: fixed and closed.** Gate standing: 33 errors, pure Category C (baseline unchanged since Stage 3).

---

## 3. THE DOCTRINE — FOUNDING RULING AND CURRENT BINDING RULES

**The founding ruling (user, verbatim — the reason the entire current program exists):**

> "I just realized the fault that you have been going through each component code,
> understanding that its quite unique on its own and you have decided to keep it. But here
> is the big twist, I already know every single component is mostly unique. I intentionally
> built them all that way and I still started this huge refactor task because I want to turn
> the components into modular and abstract components so that things become maintainable.
> This means, its not at all good enough for us to merely decouple small parts of the
> components for better reuse, we need to build universal and specific components for
> everything. That's how we truly achieve all the goals and perfectly complete your entire
> plan."

**Two-tier end state (binding):**
1. **Universal components** in `phone/` — building blocks whose prop APIs cover the FULL
   observed variation space of their pattern across the corpus. Rich variant props,
   exact-compat className overrides at every slot, never designed from one caller's shape.
2. **Specific components** — domain files that remain, but as PURE COMPOSITION: arrangement
   + data + domain logic. Zero hand-rolled pattern instances inside them.

**NORMALIZATION MANDATE (user correction, binding — supersedes the nesting-doll reading):**
The refactor is NOT satisfied by moving code into a universal and leaving a thin wrapper
file that just re-renders it with props ("Russian nesting dolls"). A massive refactor means
a MASSIVE NORMALIZATION of the components themselves: their folders, their file names, and
every import that points at them. Concretely:
- A specific component that has become a pure prop-config of a universal (no domain logic,
  no data sourcing, no multi-call-site value) is DELETED, and its config is inlined at the
  call site(s) — the wrapper file itself is removed, not kept as a one-line re-export.
- A specific component that retains genuine domain logic (data sourcing, cause branching,
  multi-caller sharing) is KEPT, but its file is normalized: correct folder, correct name,
  and every import across `apps/` and `components/` re-pointed to the canonical location.
- Same-family components are CONSOLIDATED into a single canonical file where they share a
  pattern, rather than scattered as N near-identical files in N folders.
- The end state is a genuinely smaller, navigable tree — not the same tree with imports
  swapped. Component count must fall, folders must be coherent, names must be canonical.
- Hard constraint unchanged: identical rendered output for identical props. Normalization
  changes WHERE code lives and HOW it is named/imported, never WHAT it renders.

**Family-close rule (binding):** a component is done only when it is pure composition.
"Keep" is legitimate only for what is genuinely composition after decomposition.

**Hard constraint (unchanged across the entire job):** identical rendered output for
identical props. Abstraction via variant props and className overrides, never redesign.
Micro-deviations are permitted only when ledgered (precedents: no-hover-motion drops,
focus-ring additions, spring normalization 380/40, done-state solid emerald-600).

**Retracted doctrine:** "merge only where ≥2 implementations / no abstractions for one
caller / bolt-on economics" — the original plan's third guardrail, applied as gospel through
B9–B11, producing ~130 keep-rulings that answered the wrong question. Superseded by the
founding ruling. Near-duplicate PAIRS are still logged (useful evidence for universal
design), but they no longer gate anything.

**Universal-by-universal sweep method (supersedes the B12–B17 chain):** dependency order —
**Row (in flight) → StepList/Timeline → FactRows/StatStrip extensions → PhaseShell
consolidation → StatusStrip → Quote variants → EmptyState → Tabs/Filters → Options/Actions →
Field (forms) → Identity → clinical residuals.** For each universal: (1) gather the
corpus-wide pattern evidence (most is already read — see §7 registers), (2) design/build the
universal against the full variation space, hub-first with its own message, (3) sweep the
entire corpus adopting it — every component containing that pattern, regardless of old
batch status — with real-gate + grep adoption-count + retired-pattern verification,
(4) ledger, (5) one large commit per sweep stage.

**Final certification (B18, redefined):** zero hand-rolled pattern instances outside
`phone/` — grep-checkable, not judgment-based. Plus: retired-path sweep zero, real gate
clean (after Category C disposition), dedup audit, unused-vendor flag list, orphan-register
resolution, dev-server visual walkthrough of touched surfaces (advisable — never done yet),
coverage tracker at 100% under the composition rule. Only then does screen rebuilding resume.

---

## 4. THE REAL GATE — binding process rules

1. **Compile gate = `npx tsc --noEmit -p tsconfig.app.json` plus `-p tsconfig.node.json`.**
   Exit codes read DIRECTLY, never piped through `head` unguarded (head swallows exit codes).
   Plain `npx tsc --noEmit` compiles NOTHING (solution-style root config: `"files": []`,
   references only) — this exact mistake invalidated ~30 gates of history. Current standing:
   33 errors, ALL Category C (down from 47 as A/B/D closed; unchanged since Stage 3).
2. **A gate that never fails is not a gate.** If a long run of greens occurs, run a negative
   control (deliberately break a file, confirm the gate fails, revert).
3. **No blind line-number deletes.** A fixed-`Nd` sed once deleted a LIVE import on PT02
   (aimed at a different line) — caught by the real gate, root-caused via git diff, repaired.
   Content-matched edits only; if line numbers are unavoidable, read the exact line first
   and verify the anchor.
4. **Disk is authoritative over clipboard.** A stale clipboard paste contradicted the gate
   once; the gate won. When output contradicts expectations, inspect disk state directly.
5. **Terminal crashes on this machine happen** (several, always AFTER work completed).
   Recovery procedure: full read-only state inspection (moves on disk, git status, grep
   counts, real gate) — determine what ran, repair only what is missing, then formal gates.
6. **Heredoc emits are first-and-final; one clean full re-emit permitted, then the message
   ends.** Hub files (phone/*) get their own message, one block, no sibling emits.
7. **Staging checks before trust:** when a sed is risky, split it — apply, grep the result,
   THEN build the next step on the confirmed state (a CaptureChainCard import-insertion sed
   once silently missed its target line; the staging check caught it).
8. **Read batches capped at 6 files, piped through `xclip -selection clipboard`** (the
   user's clipboard workflow). Long pastes can truncate or corrupt in transit — a mangled
   paste is suspect until spot-checked against disk.
9. **One stage per exchange when verification gates are involved.** Large chunks are
   encouraged BETWEEN gates (the user's "large chunks" ruling), but every chunk still ends
   with gate + proof output, and unexpected gate results stop everything until root-caused.
10. **Commits: conventional format, plain-English bullet bodies, only changed files, large
    commits combining multiple steps (no tiny doc-only commits — user ruling).** Ledger and
    coverage entries ride with the next substantial commit.
11. **Deletions only after grep proves zero consumers (both path styles).**
12. **The migration ledger (`docs/component-migrations.md`) is append-only** and records
    every rewire, keep-ruling, normalization flag, preserved difference, incident, and
    correction.
13. **One sweep/batch in flight — never hold two families' bodies at once.** (Original plan
    guardrail, carried forward.)

---

## 5. CANONICAL API NOTES (what the universals cover)

- **Row** (`phone/Row.tsx`, 346 lines, v4): leading (Tile/custom/liveDot badge) · label
  overline · title · subtitle · metaLabel/metaValue/metaNote (stacked or metaInline) ·
  trailing (chip/amount columns/time/ReactNode) · expandable (chevron in title OR
  chevronInTrailing) + expansion + wrapSurface · surface none/inset/live/tint · dark ·
  fresh entrance · hoverClassName · whileTapDisabled · className overrides at every slot
  (tile/title/subtitle/label/trailing/expansion). Known intentional deviations ledgered:
  focus-ring additions; ListRow's Tile group-hover scale not reproduced (punch list).
- **SheetShell:** mount- or open-controlled; height full (h-86%, header slot OR icon/title,
  footer slot) / auto (compact card) / scroll (max-h-88%); BottomSheet alias; SheetHeader.
- **PhaseHero + PHASE_THEME** (8 keys incl. blueDeep, emeraldBright, slate). Theme prop is
  STRUCTURAL (PhaseHeroTheme object: border/shell/orbA/orbB/hairline/shadow) — callers pass
  custom themes ({...PHASE_THEME.key, overrides}) so uniqueness feeds through props.
- **StepList** (phone/StepList.tsx): nodeStyle tile/circle/dot, nodeSize sm/md/lg, theme
  light/dark, activeStyle spinner/ping, per-item node/rail overrides, time/titleMeta/
  trailingTitle/contentClassName slots, expandable.
- **StatStrip** (in phone/kit): dark + light variants, cols, dot, valueClassName/
  labelClassName overrides.
- **FactRows:** dark/light + mono + labelClassName/valueClassName overrides.
- **LifecycleButton family:** LifecycleButton (phases idle/working/done; tones
  success/warning/danger/info/accent), IconLifecycleButton, QuietLifecycleButton,
  StaticButton, CtaNote. Call sites map local status unions via explicit ternaries
  (per-file done-states: 'saved' ×4, 'added' ×1 — the B-category fix).
- **ConfirmStrip** (animated emerald strip), **NoteStrip** (static), **ExpandRow**,
  **OptionRow/OptionCheck**, **QuotePanel**, **MiniTimeline**, **DarkPanel**, **HeroCells**
  (HeroTopRow/HeroHighlight/StatCell/TapCell; HeroAccent includes gold), **StatusPill**,
  **Pager**, **Overline**, **AccentHero**, and kit (Tile/Chip/Card/Panel/Hero/Meter/Ring/
  Section/TimeChip/Expand/Stat/Cta and motion constants).

---

## 6. REGISTERS (carried forward; full detail in the ledger)

- **Orphans (zero consumers; deletion ruled at final certification):** RecordSheet
  (professional/history).
- **Near-duplicate pairs (logged for the rebuild phase; both keep):** SubmittedPanel/
  TriggerPreview · BillingFooter/PartnerPatientFooter · EventFanOutCard/LiveFanOutCard ·
  RetryLadderCard/NoAvailabilityLadder · EmptyFilterState pair (admin + professional/history;
  consolidation belongs to the EmptyState sweep).
- **PhaseHero-adjacent hand-rolled shells (PhaseShell consolidation candidates):**
  ApprovalCard (4-state incl. slate), WithdrawalCard (2-state), IncidentLinkingCard (rose),
  ReversedOfferTraceCard (sky), RollbackTraceCard (rose). All single-caller.
  **RESOLVED (Stage 6):** all 5 absorbed onto PhaseHero + 5 orb-anatomy finds (CaughtUpCard,
  MatchCard, EstimateCard, ActionCard, ProfilePreviewSheet). Register now EMPTY.
- **Reclassifications:** ResendRow → Actions sweep (3-state strip); DeliveryStrip +
  CallStrip → StatusStrip universal (identical animated strips — ConfirmStrip's two-line
  sibling); onboarding CredentialRow → Field universal base (Forms sweep; already
  cross-role: P01/A13/PasswordCard — promotion debt for that sweep).
- **Punch lists (visual, deferred to screen-rebuild phase by design):** hairline dividers
  (~25 surfaces); whileHover/hover-brightness/group-hover violations (~20); divide-x stat
  strips (RevenueHero, LedgerChainHero, AuditHero, RecheckHero, TransactionHero,
  SessionSummaryHero + several hero interiors); CompletedCard chevron restoration (on
  request); CaptureChainCard `bg-mint text-brand-ink` suspected non-existent tokens
  (bug-flagged).
- **Vendor quarantine (Ruling 1, unchanged):** smoothui (~200 files) and ui/ (29 shadcn
  files) frozen, never edited. Consumed smoothui modules: agent-avatar, notification-badge,
  animated-file-upload, price-flow, ai-loader (+ `lib/smoothui-data` as a consumer).
  Unused-vendor flag list at final certification.

---

## 7. THE GATE CRISIS — categories and disposition

- **A (this session's errors, 10): FIXED.** PaymentCard/PartnerBillingCard adapters (a
  phantom `amountClassName` prop and a missing import — amounts rebuilt as trailing
  ReactNode with exact classes), CaptureChainCard import (staged-insert fix), unused imports.
- **B (pre-session rewire artifacts, ~20): FIXED.** Five LifecyclePhase mismatches mapped
  (idle→idle, per-file done-state→done, middle states→working — rendering changed from
  broken to intended, user-ruled); ~15 unused imports left by pre-session B5/B8/B9 rewires.
- **D (unused symbols, ~70 TS6133): FIXED.** One deliberate survivor: A12's `cleanup` —
  it IS the fix for a real timer leak (timers pushed to timersRef, never cleared); wiring
  it is a Category C decision.
- **C (47 errors, ORIGINAL pre-refactor bugs, PARKED — disposition is the #1 open
  decision):** P24 data-model mismatches ×12 (`c.default` always undefined — the "Default"
  chip has never rendered; last4/expires missing) · PR07 notify signature ×4 · P25
  QuickRequest fields ×3 · A15 tone-union mismatches ×3 · PR04 detail-optional ×2 · PR03
  (Offer type import + round type) ×2 · A11 Incident fields ×2 · singles: A02
  decision-optional, A10 details-optional, PT01 onNotify variance, A12 timer leak, Offer-type
  imports ×4 (PR03 + four offer components), RecordSheet downloadSessionFile never exported,
  patientBilling Blob type, StatementButton arg type, StaffHero Record index,
  StaffDetailSheet joinedAt, PartnerPatientHero useRef arg, PartnerCarePathway TimeChip
  className prop, RecordExpansion IncidentPanel resolved prop, SessionDetailSheet/
  SessionListCard Session.location, DeletionQueueList state type.
  **Recommendation on record: park C until a pre-certification workstream; resume Row
  stage 2 now. Every C item is catalogued; nothing is hidden.**

---

## 8. IN-FLIGHT WORK — Stage 9: EmptyState universal (REDO under NORMALIZATION MANDATE)

**Stages 0-8 CLOSED** (commits 00bcba7, 2c968b4, 3637fab, 0a024ef, ae70312, 6b02662, e75c366).
Current position: Stage 9 — EmptyState universal, being REDONE because the initial sweep
produced nesting-doll wrappers (see §3 NORMALIZATION MANDATE). The universal
`phone/EmptyState.tsx` is built and verified; the sweep must now NORMALIZE the family —
delete pure-config wrappers and inline at call sites, consolidate same-family files, fix
folders/names/imports — instead of leaving thin re-export wrappers.

**Evidence read (Stage 7):**
- ConfirmStrip (phone/, canonical): single-line animated emerald strip — Check icon badge
  (h-5 w-5 rounded-full bg-emerald-500, strokeWidth 3), children as body (text-[11px] font-bold
  leading-snug text-emerald-900/80), shell `flex items-center gap-3 rounded-xl bg-emerald-500/[0.08]
  px-3 py-2.5`, animation initial {opacity 0, y:8, scale 0.98} / exit {opacity 0, y:-6} /
  transition {0.25 easeOut}. 3 consumers: SignOffConfirmation, SaveConfirmation, UploadConfirmation.
- DeliveryStrip (patient/verification): two-line — MailCheck badge (strokeWidth 2.8), overline
  'Email fallback delivered' (text-[9px] uppercase tracking-[0.16em] text-emerald-700/60) + body
  email (text-[12px] font-bold tracking-tight text-emerald-700), shell `flex items-start gap-3
  rounded-xl bg-emerald-500/[0.08] px-3.5 py-2.5`, animation initial {opacity 0, y:6} / exit
  {opacity 0, y:-4} (no scale, no transition). Consumer: P03.tsx:136 `{emailDelivered && <DeliveryStrip email={guardian.email} />}` (mount-controlled).
- CallStrip (patient/recovery): identical to DeliveryStrip but PhoneCall badge (strokeWidth 2.6),
  overline 'Call requested', body 'A coordinator calls you within 10 minutes', className adds
  `mt-3`. Consumer: SentCard.tsx:45 `{callState === 'done' && <CallStrip />}` (mount-controlled).

**Design decision (pending implementation):** StatusStrip universal in phone/ absorbing all three.
Props: {icon?: LucideIcon (default Check), title?: string, children, align?: 'center'|'start',
className?}. Canonical animation = ConfirmStrip's. Delivery/Call → title + align="start" +
className="px-3.5" + their icon; ConfirmStrip → <StatusStrip>{children}</StatusStrip>. LEDGERED
micro-deviations: Delivery/Call animation unified to ConfirmStrip's (y:6→y:8, exit y:-4→y:-6,
added scale, added 0.25 easeOut transition), icon strokeWidth 2.8/2.6→3. All consumers
mount-controlled (no AnimatePresence) so exit anims don't visibly play regardless. ConfirmStrip
deleted after its 3 consumers re-point to StatusStrip (grep-verify zero consumers first).

**Next:** build StatusStrip hub (own message per rule §4.6), convert ConfirmStrip + DeliveryStrip +
CallStrip, re-point 5 consumers (P03, SentCard, SignOffConfirmation, SaveConfirmation,
UploadConfirmation), delete ConfirmStrip/DeliveryStrip/CallStrip (grep-verify zero), real gate
(expect exit 2 = 33 Category C, zero errors from StatusStrip/converted files), grep zero-proof,
ledger + coverage, large commit.

---

## 9. OPEN DECISIONS (in order)

1. ~~**Category C disposition** (park vs fix now)~~ — RESOLVED: park (Stage 0). Now Stage 15 workstream.
2. ~~Two navigator-card chevron verifications (§8)~~ — RESOLVED (Stage 1, commit 00bcba7).
3. Parked for the rebuild phase: gold-vs-amber collapse, CompletedCard chevron restoration (Stage 16.9).

---

## 10. THE REMAINING ROAD (after Stage 9)

EmptyState (REDO under normalization) → Tabs/Filters (3× FilterTabs, VisitTabs,
DayFilterBar, ModeTabs, FilterBar, ActiveFilterStrip) → Options/Actions (ResendRow, SubmitButton
severity map, quick-reply chips, referral option rows) → Field (forms; onboarding CredentialRow
promotion) → Identity (avatars, CaptureTile, SelfieCaptureCard, CredentialCards, TrustCell,
SkillsCloud) → clinical residuals (MedVerificationPanel, VitalsPanel, NotesPanel,
ExecutionTrail-adjacent) → Category C workstream (Stage 15) → **final certification (§3)** →
screen rebuilding resumes. EVERY remaining stage applies the NORMALIZATION MANDATE (§3): delete
pure-config wrappers and inline, consolidate same-family files, normalize folders/names/imports —
not nesting-doll re-exports.

---

## 11. HOW TO START (for the incoming agent)

1. Read this document, the Goal, the tree, the commit log, then tail both docs on disk.
2. ~~Get the user's ruling on Category C~~ — RESOLVED: park (Stage 0).
3. ~~Verify the two navigator-card chevron states~~ — RESOLVED (Stage 1).
4. ~~Resume Row sweep stage 2, next tranche: the list interiors~~ — CLOSED (Stages 1-3).
5. Current position: Stages 0-8 CLOSED. Resume Stage 9 (EmptyState universal) as a REDO under
   the NORMALIZATION MANDATE (§3): the universal is built; delete pure-config wrappers and
   inline at call sites, consolidate same-family files, normalize folders/names/imports, real
   gate + grep proofs, ledger, large commit.
6. Hold every rule in §4. The rules exist because each one was paid for.

---

## 12. A NOTE ON HONESTY OF RECORD

The ledger contains retractions and incident records, including one retraction of false
"corruption" claims (a read-channel problem blamed on the repo) and the vacuous-gate
revelation (§7). The pre-session agent's "TSC clean at every gate" claims rest on the
vacuous gate and were proven partly false by Category B. Trust the real gate, the grep
proofs, and the ledger's incident records — not historical claims. The user has reviewed
the full arc and endorses every reversal as intentional (see top of document).

---

# APPENDIX C — THE DOCTRINE REVERSAL (complete record)

This appendix preserves the reversal in three layers: the user's founding ruling (verbatim),
the agent's full reasoning response (verbatim — the self-diagnosis and the method's
justification, which the incoming agent must internalize, not just know), and the
confirmations that followed.

## C.1 — The user's ruling (verbatim)

> "Stop for a moment. I think we need to go back and rework on every single stage of the
> entire plan from B1 itself because, I just realized the fault that you have been going
> through each component code, understanding that its quite unique on its own and then you
> have decided to keep it. But here is the big twist, I already know every single component
> is mostly unique. I intentionally built them all that way and I still started this huge
> refactor task because I want to turn the components into modular and abstract components
> so that things become maintainable. This means, its not at all good enough for us to merely
> decouple small parts of the components for better reuse, we need to build universal and
> specific components for everything. That's how we truly achieve all the goals and perfectly
> complete your entire plan, both of which I have shared multiple times including your old
> initial audit if you remember.
>
> So I want you to think deeply over this."

## C.2 — The agent's full understanding (verbatim)

I've thought about this properly, and you've identified the exact flaw. Not a surface flaw —
a doctrinal one. Let me own it precisely, then lay out what the correction means.

### What I got wrong

I inherited a guardrail from the earlier agent's audit — **"no new abstractions for one
caller; merge only where ≥2 implementations do the same job"** — and I've been enforcing it
as gospel all session. Under that rule, reading a component, finding it unique, and
keep-ruling it *was* the correct outcome. I even built a vocabulary around it: "bolt-on
economics," "props-per-delta," "distinct variant, single caller." B9, B10, and B11 produced
roughly **130 keep-rulings on that logic.**

But your intent inverts the entire criterion. You built every component unique *on purpose*
— and started this refactor *because of* that, not despite it. The question was never
**"is this a duplicate that deserves merging?"** It was always **"what universal parts does
this decompose into?"** Uniqueness isn't a reason to keep a component — it's the expected
input to abstraction. Every one of those 130 keep-rulings was the wrong answer to the right
question. And it's not just B9–B11: the same doctrine lives inside my "completed" batches
(the partner sheet option rows kept custom "because OptionRow lacks amber/sky circles" —
instead of giving OptionRow tones; the five "PhaseHero-adjacent residuals" kept hand-rolled
shells "because merging needs props" — when the props *are* the abstraction). The goal you
restated says it outright: *no screen contains its own private version of a row, chip, card,
hero, or meter.* A WithdrawalCard containing its own hand-rolled step timeline, fact rows,
and shell violates that goal even though it's a "genuine one-purpose composition."

So, honestly: **F6 is not closed. F5's kept rows aren't done. Several "done" batches carry
the same flaw inside their content layers.** Better said now than at B18.

### What the correction means — the two-tier end state

The goal, correctly read, produces a library of two kinds of components:

1. **Universal components** (`phone/`) — richly prop-driven building blocks whose APIs cover
   the *entire variation space* we've now observed: Row (leading / title+facts / trailing
   slots), StepList (the state-machine timeline that appears in at least 9 components),
   FactRow/StatStrip, PhaseShell (PhaseHero + the slate variant + props for state-dependent
   content), QuotePanel variants, EmptyState, SegmentedTabs, OptionRow/OptionGrid with tones,
   ActionPair, and so on.
2. **Specific components** — the domain files that remain, but as **thin compositions**:
   arrangement + data, zero hand-rolled pattern instances. MedVerificationPanel should read
   as `StepList + FactRows + ActionPair`, not as bespoke UI that happens to resemble those.

"Keep" becomes legitimate only when what remains is pure composition. That's the new
family-close rule.

### What stands

Not everything reopens. The canonical tier itself is real and correctly shaped — SheetShell
(three height modes is exactly the model you're describing), LifecycleButton's family, kit,
PhaseHero, HeroCells, FactRows, NoteStrip, ConfirmStrip, ExpandRow, OptionRow, the
promotions. **The shell layer was abstracted properly; the content layer inside every sheet
and card never was.** That's the gap, precisely.

### The rework method — and why it's actually stronger now

We now hold something Phase 0 never had: **the complete corpus, read.** Every pattern
instance across ~470 files has been seen this session. That enables the cleanest possible
structure — **universal-by-universal global sweeps** instead of family-by-family passes:

- For each universal in dependency order (Row → StepList/Timeline → FactRow/StatStrip →
  PhaseShell → Quote → EmptyState → Tabs/Filters → Options/Actions → Identity → clinical
  residuals): build the universal once against the *full* observed variation space, then
  sweep the entire corpus adopting it — every component containing that pattern, regardless
  of its old batch status — verify (real gate + grep adoption counts + retired-pattern
  sweep), ledger, one large commit.
- Each sweep is provably complete corpus-wide (grep is the proof), nothing gets re-touched
  repeatedly, and no universal is designed from one caller's shape — the exact failure mode
  the old guardrail accidentally institutionalized.
- Hard constraint unchanged: identical rendered output. Abstraction via variant props, never
  redesign.

This replaces the remaining chain (F3/F4/F5 residuals, B12–B17, the 130 keep-rulings, all
"adjacent residuals") with one coherent program, and B18's certification becomes meaningful:
*zero hand-rolled pattern instances outside `phone/`* — checkable by grep, not by judgment.

(The original text asked the user to confirm the doctrine and the sweep structure, and
proposed Row as the first universal.)

## C.3 — The confirmations

The user's ruling was confirmed with: "Lets begin." (The doctrine, the two-tier end state,
and the universal-by-universal sweep structure were all thereby adopted; the ledger's
DOCTRINE CORRECTION entry records the retraction of the bolt-on guardrail, and the coverage
doc's Revision 14 relabeled all keep-rulings as pending decomposition.)


---

# APPENDIX A — THE ORIGINAL PLAN (verbatim, as issued)

Confirming the task precisely:

- **Scope shift:** components only. Zero page/screen edits (`apps/**`) until the entire refactor lands — screens only get their imports re-pointed when a batch touches what they consume.
- **Goal:** collapse hundreds of redundant, screen-rolled components into one normalized, modular component library — merged, abstracted, and replaced where a clearer standard component exists — even if the final line count doesn't shrink, because improvements are made where genuinely necessary.
- **Method:** function-based regrouping (what a component *is*, not which screen or role folder it sits in), then an iterative batch chain: **read family → refactor family → fix all consumers' imports → verify → next family** — never all files in context at once.
- **Hard constraint:** behavior preservation. Every page must keep working identically after its imports are re-pointed. No redesigns, no visual changes — API normalization and deduplication only.

## The Plan

### Phase 0 — Inventory (context-safe)

The tree I have stops at depth 3, so I can't batch yet. First request: **the full recursive file listing of `components/` only** (`find src/components -name '*.tsx' -o -name '*.ts' | sort` or equivalent), plus the same for `data/` since some "components" may actually be data/helper modules misfiled. I will not open any file yet.

From that listing alone (names + paths + nesting, no bodies), I build:

1. **The Registry Map** — every existing component assigned to exactly one *functional family*. Families are role-agnostic and nesting-agnostic; expected first-pass families (to be confirmed against the real listing):
   - **Shell & frame** — PhoneFrame, Screen, AppBar, NavBar, FootBar, SafeArea variants, screen scaffolds
   - **Heroes & headers** — AccentHero, stat-band heroes, section headers, screen intros
   - **Sheets & overlays** — SheetShell variants, dim layers, bottom sheets, dialogs, upload sheets, edit sheets
   - **Controls & buttons** — lifecycle buttons, CTAs, chip buttons, toggle rows, steppers, segmented controls
   - **Status & feedback** — StatusPill (light/dark variants), confirmation strips, banners, empty states, toasts/notify plumbing
   - **Data display** — InfoListCard, stat strips, count chips, definition rows, timeline/audit rows
   - **Lists & rows** — list cards, row items, "just added" rows, selectable rows
   - **Charts & meters** — OfferMeter, WeekBars, progress/meters, graph primitives
   - **Forms & entry** — Input/Textarea wrappers, dirty-check blocks, file-input tiles, upload plumbing
   - **Identity** — avatars, name tiles, credential chips
   - **Role-genuine** — anything that is genuinely unique to a clinical/workflow domain and cannot normalize (expected to be a small residual)
2. **The Batch Plan** — families ordered by dependency (primitives first: shell → controls → status → composites), sized so each batch stays well under context limits (roughly 10–25 files per batch depending on size).
3. **The Migration Ledger** — a single `data/componentMigrations.ts` (or `.md`) maintained throughout: `old path → new path or canonical component`, per batch. This is what makes consumer import-fixing mechanical instead of guesswork.

### Phase 1 — Batch chain loop

For each batch, in order:

1. **Read:** all component bodies in the family + `grep` for their usages across `components/` and `apps/` (grep output only — I do not read consumer files wholesale).
2. **Canonicalize:** define the family's normalized target — one or few canonical components with a typed, superset prop API that every rolled variant maps onto; kill true duplicates; replace hand-rolls with the registry standard where one exists; extract genuinely shared primitives upward into `components/phone/` or a new `components/kit/` tier.
3. **Emit:** new/merged canonical files as heredocs, full contents, one block per file. Deleted files noted in the ledger.
4. **Fix imports:** emit the minimal edits (or full re-emits for small files) for every consumer — component and screen alike — so the repo compiles after the batch. Batch is not "done" until `tsc`-clean is plausible and no dangling old paths remain.
5. **Ledger update + terse changelog**, then your confirmation before the next batch.

### Phase 2 — Verification sweep

After the last batch: one pass over the migration ledger confirming zero references to retired paths, one compile check, and a dedup audit confirming no two files in the library do the same job. Only then do we return to screen rebuilding.

### Guardrails I'll hold throughout

- **No behavior change:** identical rendered output for identical props; prop renames only where the consumer is updated in the same batch.
- **Delete with evidence:** a component is only removed after grep proves every usage is migrated.
- **No new abstractions for one caller:** merging happens only where ≥2 implementations genuinely do the same job; unique components get moved/normalized, not force-fitted.
- **One batch in flight:** I never hold two families' bodies at once.

Plan follows. Two structural rulings first, then the Registry Map, the Batch Chain, and the kickoff.

## Ruling 1 — Vendor trees are quarantined, not refactored

- `components/smoothui/` (~200 files) is a vendored third-party showcase library — per-domain `index.tsx` folders, its own `lib/`, self-contained. Rewriting vendor internals is not refactoring, it's a fork. I will **grep for its usage** in `apps/` and app components; anything unused gets quarantined (left untouched, flagged for deletion), anything actually consumed stays frozen as-is.
- `components/ui/` (shadcn primitives) same treatment: vendor, frozen. App components that hand-roll what `ui/` provides (badge, progress, tabs, sheet, switch) get re-pointed to it — but `ui/` itself is never edited.
- These two trees are ~55% of the file count and 0% of the redundancy problem. Excluding them keeps every batch inside context limits. Confirm or override this ruling.

## Ruling 2 — Misfiled data modules

`professional/availability/availabilityData.ts`, `professional/earnings/sessionRecords.ts`, `professional/history/historyData.ts`, `professional/incidents/incidentData.ts`, `professional/payouts/payoutData.ts`, `professional/profile/profileData.ts`, `professional/sheets/sheetData.ts`, `partner/performance/performanceData.ts`, `partner/billing/types.ts`, `partner/performance/types.ts`, `system/drills/drillOutcomeTheme.ts` — all violate the `src/data/` convention. They get **moved** (not rewritten) to `src/data/` in the batch that touches their family, with import re-pointing.

## Registry Map — functional families (role-agnostic, nesting-agnostic)

Every app component (≈470 files across admin/partner/patient/professional/system/phone) assigns to exactly one family. Counts are approximate; exact membership is locked per-batch at read time.

| # | Family | ≈Count | Canonical target |
|---|--------|--------|------------------|
| F0 | **Phone shell & frame** | 10 | `components/phone/*` as-is; becomes the single import root for every screen scaffold |
| F1 | **Sheet architecture** | ~50 | Merge 3× `SheetShell` (patient/matching, patient/onboarding, professional/payouts) + admin `BottomSheet`/`SheetHeader` → **one** canonical `SheetShell` with tone variants; then all ~45 content sheets become thin domain consumers |
| F2 | **Heroes & stat headers** | ~35 | `AccentHero` (dark) + one light `Hero` + one `StatBand` — absorbs every `*Hero`, `*HeroCard`, `WarnHero`, `ConfirmedHero`, `LedgerChainHero`, `VaultHeroCard`, `PaymentHero`, `TransactionHero`, `RecheckHero`… |
| F3 | **Status, chips & notices** | ~30 | `StatusPill` (light/dark) + `Chip` + `Note` — absorbs `Overline`, `DarkTimeChip`, `HighlightTags`, every `*Note`/`*Notice`/`PrivacyNote` |
| F4 | **Buttons & lifecycle CTAs** | ~30 | `LifecycleButton` (idle→working→done) + `TonalButton` + `BodyEndCta` — absorbs all `*Button`/`*Action` single-purpose wrappers |
| F5 | **Rows** | ~30 | `Row` family (leading tile / title+facts / trailing) — absorbs all `*Row`, `ListRow`, `EntryRow`, `MedRow`, `DocRow`, `PayoutRow`, `EarningRow`… |
| F6 | **Cards & panels** | ~90 | `Card` shell + `InfoListCard` + `Panel` — absorbs the giant `*Card`/`*Panel` population; per-domain content stays, shells merge |
| F7 | **Steppers, rails & timelines** | ~15 | `Stepper` + `Timeline` (grid-aligned) — absorbs `WizardStepper`, `LiveStepper`, `JourneyRail`, `MonthTimeline`, `AuditTimeline`, `StepTimeline`, `ArrivalTimelineCard`, `DispatchSequence`, `CycleStep`… |
| F8 | **Meters, charts & stat strips** | ~20 | `Meter` + `Sparkline`/`Bars` + `StatStrip` — absorbs `OfferMeter`, `ValidityMeter`, `WeekBars`, `PasswordMeter`, `Stars`-adjacent meters |
| F9 | **Filters, tabs & empty states** | ~20 | `SegmentedTabs` + `FilterBar` + cause-aware `EmptyState` — absorbs 3× `FilterTabs`, `EmptyFilterState` ×2, `EmptyMatches`, `EmptyTabState`, `CaughtUpCard`, `Pager` |
| F10 | **Forms, entry & file input** | ~20 | `Field`, `OtpInput`, `ToggleRow`, `FileTile` — absorbs `Radio`, `EyeToggle`, `DescriptionInput`, `CaptureFileTile`, `PhotoAttach` |
| F11 | **Ratings & stars** | ~6 | `Stars` (display + interactive) — absorbs `Stars`, `StarPicker`, `RatingStrip`, `RatingCta` |
| F12 | **Pickers & selection grids** | ~15 | `OptionGrid` + `OptionRow` — absorbs `CategoryGrid`, `CategoryRail`, `WindowOption`, `DayToggle`, `CausePicker`, `SeveritySelector`, `QuickActions(Grid)` |
| F13 | **Identity, avatar & credentials** | ~20 | `Avatar` + `CredentialRow/Card` + `TrustCell` — absorbs `CaptureTile`, `SelfieCaptureCard`, the three `CredentialCard`s, certification rows |
| F14 | **Domain-genuine clinical residuals** | ~35 | Kept, but re-shelled on F1–F6 primitives: vitals panels, med verification, checklists, transaction/rollback ladders, retention crypto, session execution |

## Batch Chain (dependency-ordered, 10–25 files per batch)

```
B1  F0 Phone shell          → read+refactor phone/* (the root everything sits on)
B2  F1a Sheet frame         → 3 SheetShells + BottomSheet/SheetHeader → one SheetShell
B3  F1b Sheets: patient     → all patient content sheets → canonical consumers
B4  F1c Sheets: prof+partner+admin+system → remaining content sheets
B5  F2 Heroes               → all heroes, all roles
B6  F4 Buttons/CTAs         → all lifecycle + tonal buttons
B7  F3 Status/chips/notices → StatusPill, Chip, Note family
B8  F5 Rows                 → Row family + all row consumers
B9  F6a Cards: patient      → patient card population
B10 F6b Cards: prof+partner → professional + partner cards
B11 F6c Cards: admin+system → admin + system cards
B12 F9 Filters/tabs/empty   → tabs, filter bars, empty states, Pager
B13 F10 Forms & files       → fields, OTP, toggles, file tiles
B14 F7+F8 Steppers/meters   → timelines, charts, meters, stat strips
B15 F11+F12 Ratings/pickers → stars, grids, selectors
B16 F13 Identity            → avatars, credentials, capture
B17 F14 Clinical residuals  → vitals, meds, ladders, execution — re-shelled
B18 Ledger sweep            → zero retired-path references, dedup audit, compile
```

Each batch = **grep usages → read bodies → emit canonicals + consumers → re-point every importing file (components AND screens) → ledger entry**. Screens get zero redesign; only their import lines change, and only when the batch touches what they consume.

## Migration Ledger

Single file `docs/component-migrations.md`, appended per batch: `old path → new path | merged-into | deleted | consumers-repointed`. The mechanical basis for B18 and makes every batch verifiable.

## Kickoff — B1 request

Send these 10 files (the entire phone shell, which everything depends on):

1. `components/phone/PhoneFrame.tsx`
2. `components/phone/Screen.tsx`
3. `components/phone/ScreenBlocks.tsx`
4. `components/phone/AppBar.tsx`
5. `components/phone/NavBar.tsx`
6. `components/phone/Controls.tsx`
7. `components/phone/kit.tsx`
8. `components/phone/PushPreview.tsx`
9. `components/phone/ScreenshotButton.tsx`
10. `components/phone/Splash.tsx`

Plus two grep outputs so B1's consumer map is real before I touch anything:
- `grep -rn "components/phone" src/apps src/components --include='*.tsx' --include='*.ts' | grep -v "src/components/phone"` (first ~80 lines suffice per import target if it's huge — a count per file is fine: `grep -rc` style summary)
- `grep -rn "from '@/components/smoothui\|from \"@/components/smoothui" src/apps src/components src/lib --include='*.tsx' --include='*.ts'` — to settle Ruling 1 with evidence.

Also confirm the smoothui/ui quarantine ruling and whether B1 starts immediately after sign-off.
