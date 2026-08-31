# AYVAA CAREGIVER — Component Refactor: Master Targets & Progression

**For the executing agent.** This is the exhaustive, stage-by-stage, step-by-step target
register for the ENTIRE component refactor — every stage and step that has been completed
and every stage and step that is to be completed, covering the full progression of every
document plan shared to date. It is the single source of truth for *what* must happen and
*what has happened*; `refactor-rules.md` is the rulebook for *how* it happens; the migration
ledger (`component-migrations.md`) is the append-only history; the coverage tracker
(`component-coverage.md`) is the per-file membership record.

**Legend:** ✅ = completed · ⏳ = in progress · ⬜ = pending · 🔒 = blocked on a ruling.

---

## PART A — THE COMPLETED ARC (everything done to date)

### A1. Foundation & inventory (Era 1–2)

| Step | Status | Detail |
|------|--------|--------|
| Initial project setup | ✅ | Foundation shell, design system, data layer (commits 6fedf9f, 2bd5626, 55e5c1b) |
| Screen-build era | ✅ | P01–P34, PR01–PR12, PT01–PT07, A01–A18, S01–S08 built with per-screen data + component sets |
| Original plan (B1–B18) issued | ✅ | Function-based family regrouping, hard page freeze, behavior preservation |
| Ruling 1 — vendor quarantine | ✅ | `smoothui/` (~200) + `ui/` (29 shadcn) frozen, never edited; unused-flag list deferred to B18 |
| Ruling 2 — data-module relocation | ✅ | 12 modules moved to `src/data/` (10 moves + 2 collision renames); 53 consumers re-pointed; sweep-gap incident caught & fixed |
| Full state audit | ✅ | Found family membership never locked; F1 ~35%; B11–B18 untouched; no coverage checklist |
| Coverage checklist written | ✅ | `component-coverage.md` created (Rev 1–3) |

### A2. Sheet architecture (F1) — CLOSED 57/57

| Step | Status | Detail |
|------|--------|--------|
| B2 — Sheet frame merge | ✅ | 3× SheetShell + BottomSheet + SheetHeader → one canonical `phone/SheetShell` (height full/auto/scroll, mount- or open-controlled, BottomSheet alias, SheetHeader); Controls + ScreenBlocks deleted (grep-verified zero) |
| B3 — Patient sheets (12) | ✅ | TimeSheet, WhoSheet, FiltersSheet, ServiceSheet, LanguageSheet, DoseDetailSheet, WithdrawSheet, LiveVisitSheet, AddPrescriptionSheet, CaregiverSheet, ConsentSheet, VisitSheet |
| B4 — Prof/admin/system sheets (7) | ✅ | AccountSheet, ConfirmWithdrawSheet, PayoutReceiptSheet, CertificationUploadSheet, EditProfileSheet, ConsentRecordSheet, AccessDetailSheet |
| F1 finish — partner (14) | ✅ | 14/14 rewired (auto/scroll modes); CloseSheet/EscalateSheet/PhotoViewSheet keep-ruled as content fragments |
| F1 finish — professional (7) | ✅ | 7/7 rewired; RecordSheet orphaned (zero consumers, deletion at B18) |
| F1 finish — patient (12 corrections) | ✅ | All 12 already-canonical (disk-verified); family count corrected 58→57 |
| F1 FINAL | ✅ | 40 rewired · 5 keep-ruled · 12 already-canonical · orphan: RecordSheet |

### A3. Heroes & stat headers (F2) — CLOSED

| Step | Status | Detail |
|------|--------|--------|
| B5 — Patient heroes | ✅ | HeroCells (HeroTopRow/HeroHighlight/StatCell/TapCell) built; 3 hand-rolled shells → kit Hero; 6 local StatCells + 4 inline copies deleted; 21 rewired |
| B5 — Admin/partner/system/prof heroes | ✅ | kit Hero gains tone prop; PhaseHero + PHASE_THEME (7 keys) built; WarnHero deleted; system trio + PaymentHero + EarningsHero + DossierHero → PhaseHero; partner emerald hand-rolls → kit Hero |
| F2 residual | ✅ | EntrySheetsHero → PhaseHero; onboarding Hero keep-ruled (brand splash); ProfileHero/ReportsHero/RatingHero verified on AccentHero; gold stays in HeroAccent map (decision closed) |
| F2 FINAL | ✅ | All role heroes processed |

### A4. Buttons & lifecycle CTAs (F4/B6)

| Step | Status | Detail |
|------|--------|--------|
| B6 part 1 — patient buttons | ✅ | LifecycleButton extended (IconLifecycleButton, QuietLifecycleButton, StaticButton); Pager promoted to phone/; TonalButton deleted; 15+ lifecycle CTAs rewired |
| B6 part 2 — prof/partner/system buttons | ✅ | SaveAvailabilityButton, WithdrawButton, ExportHistoryButton, SaveSheetButton, FinishBar, EditProfileButton, IncidentButton, FailureDrillSheet footer rewired |
| F4 deferred (re-rule at close) | ⏳ | SubmitButton (severity→tone map), SignOffButton (row-ratio), PrimaryAction (distinct sizing), CallButton (self-contained) — Options/Actions sweep territory |

### A5. Status, chips & notices (F3/B7) — CLOSED

| Step | Status | Detail |
|------|--------|--------|
| B7 | ✅ | NoteStrip built (replaces 9 byte-identical hand-rolls); StatusPill promoted to phone/; SheetFooterNote → CtaNote wrapper |
| F3 deferred | ⏳ | DarkTimeChip (single consumer), HighlightTags (F12) — re-rule at close |

### A6. Rows (F5/B8) — foundation for Sweep 1

| Step | Status | Detail |
|------|--------|--------|
| B8 | ✅ | ExpandRow built (3 twins collapsed); MedRow/StepRow/DocRow rewired; ListRow promotion deferred to own pass |
| Sweep 1 stage 1 — Row universal | ✅ | `phone/Row` (v4, 346 lines) built against full variation space; FactRows extended (mono + overrides); 11 conversions (7 file-row wrappers + ListRow adapter + 4 local hand-rolls killed) |
| Reclassifications | ✅ | ResendRow→Actions; DeliveryStrip+CallStrip→StatusStrip; onboarding CredentialRow→Field |

### A7. Cards & panels (F6/B9–B11) — read fully, keep-rulings superseded

| Step | Status | Detail |
|------|--------|--------|
| B9 — patient cards | ✅ | ExpandRow hideChevron; CareDeliveredCard/CaregiverCard/BookingRecordCard/VisitRecordCard/SummaryCard rewired; QuotePanel built; MedicationCard/RecoveryCard → kit Hero; ReportsListCard ReportRow → ExpandRow |
| B10 — prof/partner cards (48) | ✅ | ConfirmStrip built (3 collapsed); 44 keep-ruled with evidence; PartnerPatientHero → kit Hero |
| B11 — admin/system cards (39) | ✅ | Overline promoted to phone/; 39 keep-ruled with evidence; InfoListCard stays admin/ui |
| DOCTRINE REVERSAL | ✅ | All B9–B11 keep-rulings relabeled PENDING DECOMPOSITION; universal-by-universal sweep method adopted |

### A8. Placement debts — RESOLVED

| Step | Status | Detail |
|------|--------|--------|
| FactRows promotion | ✅ | patient/plan → phone/ (17 consumers) |
| AccentHero promotion | ✅ | admin/ui → phone/ (34 consumers) |
| Overline promotion | ✅ | admin/ui → phone/ (9 consumers) |
| Placement-debt register | ✅ | EMPTY |

### A9. The gate crisis — resolved

| Step | Status | Detail |
|------|--------|--------|
| Vacuous-gate revelation | ✅ | Root tsconfig solution-style; real gate = `tsc -p tsconfig.app.json` + `-p tsconfig.node.json` |
| Category A (10, this session) | ✅ | FIXED (broken adapters, missing import, unused imports) |
| Category B (~20, pre-session rewire artifacts) | ✅ | FIXED (5 LifecyclePhase mismatches + ~15 unused imports) |
| Category D (~70 unused symbols) | ✅ | FIXED (content-matched only; PT02 live-import incident repaired; line-delete ban in force) |
| Category C (47 original latent bugs) | 🔒 | PARKED — disposition ruling pending (Stage 0 below) |

### A10. Row sweep stage 2 — CLOSED (Stages 1-3)

| Step | Status | Detail |
|------|--------|--------|
| Six navigator cards converted | ✅ | PaymentCard, PlanCard, UpcomingCard, CreateAccountCard, SettingsCard, PartnerBillingCard |
| Chevron verification (CreateAccountCard, PartnerBillingCard) | ✅ | Both rendered duplicate trailing chevrons; fixed with `showChevron={false}` (CreateAccount keeps ArrowRight trailing, PartnerBilling keeps amount+Paid chip) |
| List interiors tranche | ✅ | 15 conversions: named list rows (AddCertificationRow, ServiceRow, EntryRow, ChecklistRow, MedRow scheduled, StepRow todo, FieldTaskRow) + card interiors (UpcomingVisitsCard, WhoCard, PrivacyFactsCard, PlanLinksCard, DocumentsCard, PrescriptionList, SafetyCard, VitalsCard, ScheduleCard, PrescriptionSheet, CaptureChainCard, EscalateSheet, StaffList, AccessLogCard, ReferredPatientList, OfferStatusList, SessionListCard, SafetyChecksCard, StateDiffCard, AccountActionsSheet) + sheet option rows (PartnerReferralSheet, PartnerAlertsSheet, PartnerStaffSheet). Row hub extended: align, padding, disabled, titleMeta, body |
| Sweep close | ✅ | Grep zero-proof of hand-rolled row signatures across all 15 converted files; ledger; large commit (2c968b4) |

---

## PART B — THE REMAINING PROGRESSION (every stage to complete)

### Stage 0 — Category C disposition ruling ✅

| Step | Detail |
|------|--------|
| 0.1 | Get user ruling: park C (recommended) vs fix now |
| 0.2 | If park: log as pre-certification workstream (Stage 15); resume Row stage 2 |
| 0.3 | If fix now: reorder Stage 15 to front |

**RESOLVED:** user ruled PARK. Category C (47 original latent bugs) logged as Stage 15 pre-certification workstream. Row sweep stage 2 resumed. (Gate standing later dropped to 33 as A/B/D closed.)

### Stage 1 — Row sweep stage 2: chevron verification ✅

| Step | Detail |
|------|--------|
| 1.1 | Read CreateAccountCard + PartnerBillingCard adapters (disk) |
| 1.2 | Confirm duplicate trailing chevron state (Row default chevron unless `showChevron={false}`) |
| 1.3 | Fix with `showChevron={false}` + trailing ReactNode as needed |
| 1.4 | Real gate + visual check |

**RESOLVED:** both adapters rendered duplicate trailing chevrons. CreateAccountCard kept ArrowRight trailing + `showChevron={false}`; PartnerBillingCard kept amount+Paid chip + `showChevron={false}`. Real gate exit 2 = 47 Category C, zero errors from either adapter. Commit 00bcba7.

### Stage 2 — Row sweep stage 2: list interiors ✅

| Step | Detail |
|------|--------|
| 2.1 | Convert ServiceRow (patient catalogue) |
| 2.2 | Convert MedRow (patient meds) |
| 2.3 | Convert DocRow (patient prescriptions) |
| 2.4 | Convert EntryRow (patient records) |
| 2.5 | Convert StepRow (patient plan) |
| 2.6 | Convert ChecklistRow (professional onboarding) |
| 2.7 | Convert FieldTaskRow (professional onboarding) |
| 2.8 | Convert AddCertificationRow + CertificationRow (professional profile) |
| 2.9 | Convert alert/staff/referral/device rows inside B10–B11 keep-ruled cards |
| 2.10 | Convert sheet option rows (partner referral options) |
| 2.11 | Real gate + grep adoption count after each tranche |

**RESOLVED:** 15 conversions (named list rows + card interiors + sheet option rows). Row hub extended backward-compatibly: `align` (center/start), `padding` (none/inset/comfortable/roomy/even), `disabled`, `titleMeta`, `body`. Deferred to later sweeps (NOT Row): heroes, file tiles, option/selection rows (Options), timelines (StepList), form fields (Field). Row residuals logged: AccountSearch, RetentionPeriodsList/GoalsCard far-right chevron, NotificationFeed, ActionCard/ConsentCycleCard dark hero rows. LEDGERED micro-deviations: whileTap 0.99/0.97→0.985, EscalateSheet surface bg/[0.035]→/[0.03], VitalsCard ReadingRow aria-label lost, SafetyChecksCard row-level whileHover dropped, focus-ring additions.

### Stage 3 — Row sweep stage 2: close ✅

| Step | Detail |
|------|--------|
| 3.1 | Grep proof of zero remaining hand-rolled row patterns (signature: `flex w-full items-center gap-3` + Tile/custom leading + title/subtitle anatomy) |
| 3.2 | Real gate clean |
| 3.3 | Ledger entry (Sweep 1 stage 2 close) |
| 3.4 | Large conventional commit |

**RESOLVED:** grep zero-proof — all 15 converted files have zero `flex w-full items-center gap-3` / `flex w-full items-start gap-3` signatures. Real gate exit 2 = 33 Category C (baseline unchanged, down from 47 as A/B/D closed). Ledger + coverage updated. Commit 2c968b4.

### Stage 4 — StepList/Timeline universal ✅

| Step | Detail |
|------|--------|
| 4.1 | Gather corpus-wide pattern evidence (already read): RetryLadder, NoAvailabilityLadder, CycleStep, ExecutionTrail, CaptureChainCard steps, RecheckResolutionCard probes, IncidentTimeline, WithdrawalCard closure, ApprovalCard verification, ReversedOffer/Rollback traces, RefundCard events, MonthTimeline, AuditTimeline, StepTimeline, LiveStepper, JourneyRail, JourneyTime, DispatchSequence, WizardStepper (MiniTimeline already canonical) |
| 4.2 | Design/build universal StepList/Timeline against full variation space (hub-first, own message) |
| 4.3 | Sweep entire corpus adopting it (every component containing the pattern, regardless of old batch status) |
| 4.4 | Real gate + grep adoption count + retired-pattern verification |
| 4.5 | Ledger + large commit |

**RESOLVED:** StepList universal built (phone/StepList.tsx, ~318 lines): nodeStyle tile/circle/dot, nodeSize sm/md/lg, theme light/dark, activeStyle spinner/ping, per-item node/rail overrides, time/titleMeta/trailingTitle/contentClassName slots. 13 timeline files converted (NoAvailabilityLadder, RecheckResolutionCard, RetryLadderCard, RefundCard, DispatchSequence, ReversedOfferTraceCard, RollbackTraceCard, ExecutionTrail, WithdrawalCard, ApprovalCard, MonthTimeline dot, StateDiffCard trail, CaptureChainCard steps) + RecheckRulesList numbered-rail → Row. Residuals logged (single-caller extension debt): IncidentTimelineCard, PartnerCarePathway, horizontal steppers (LiveStepper, WizardStepper, JourneyRail, CycleStep, DarkCycleStepper). Grep zero-proof: zero `w-px flex-1`/`flex flex-col items-center` rail signatures outside phone/. LEDGERED micro-deviations: expansion wrapper pb-4, non-last item flex-1, title rows items-baseline→items-center, ExecutionTrail pure-gradient rail, focus rings. Commit 3637fab.

### Stage 5 — FactRows/StatStrip extensions ✅

| Step | Detail |
|------|--------|
| 5.1 | Extend FactRows further if variation demands (evidence: divide-x strips + big-number cells + Vault TapStat) |
| 5.2 | Build StatStrip universal (RevenueHero, LedgerChainHero, AuditHero, RecheckHero, TransactionHero, SessionSummaryHero + hero interiors) |
| 5.3 | Sweep corpus adopting it |
| 5.4 | Real gate + grep proofs + ledger + commit |

**RESOLVED:** StatStrip hub added to phone/kit (dark + light variants, cols, dot, valueClassName/labelClassName). 7 divide-x stat strips converted: AuditHero, TransactionHero, RecheckHero, RevenueHero, SessionSummaryHero, LedgerChainHero (local HeroCell deleted), DueReviewCard (light). kit Stat now ZERO consumers (flagged for removal at final cert). Grep zero-proof: zero `grid grid-cols-3 divide-x` outside phone/. Commit 0a024ef.

### Stage 6 — PhaseShell consolidation ✅

| Step | Detail |
|------|--------|
| 6.1 | Absorb 5 residuals: ApprovalCard (4-state incl. slate), WithdrawalCard (2-state), IncidentLinkingCard (rose), ReversedOfferTraceCard (sky), RollbackTraceCard (rose) |
| 6.2 | Add slate theme + state-dependent content slots to PhaseShell |
| 6.3 | Sweep corpus adopting it |
| 6.4 | Real gate + grep proofs + ledger + commit |

**RESOLVED:** 'slate' key added to PHASE_THEME/PhaseHeroKey (border-slate-200/10, shell bg-[#0F172A], orbA bg-slate-400/20, orbB bg-slate-300/10, hairline via-slate-300/30). PhaseHero theme prop is STRUCTURAL (PhaseHeroTheme object) — callers pass custom themes ({...PHASE_THEME.key, overrides}). 10 shells converted to PhaseHero (5 known residuals + 5 orb-anatomy finds via grep 'rounded-[26px] border'): ApprovalCard (4-state incl slate + orbA/orbB overrides for approved), WithdrawalCard (sealed 3-micro-diff emeraldBright override), IncidentLinkingCard (rose static), ReversedOfferTraceCard (sky), RollbackTraceCard (rose), CaughtUpCard (exact emerald), MatchCard (exact emerald), EstimateCard (exact emerald), ActionCard (amber 3-override), ProfilePreviewSheet (emerald + full SheetShell conversion — closed the F1 gap). IncidentLinkingCard internal timeline ALSO converted to StepList (last vertical-rail timeline). Remaining 'rounded-[26px] border' consumers (legit non-PhaseHero, no orbs): ProfileHero, PhotoViewSheet. LEDGERED micro-deviations: WithdrawalCard orb/hairline state-switch color transitions lost, static shells gained transition-colors duration-500, ProfilePreviewSheet sheet micros. Commit ae70312.

### Stage 7 — StatusStrip universal ✅ CLOSED

| Step | Detail |
|------|--------|
| 7.1 | Build StatusStrip (DeliveryStrip + CallStrip — identical animated strips, ConfirmStrip's two-line sibling) |
| 7.2 | Sweep corpus adopting it |
| 7.3 | Real gate + grep proofs + ledger + commit |

**CLOSED (commit 6b02662):** phone/StatusStrip.tsx universal (icon/title/children/align/className),
ConfirmStrip's canonical animation. ConfirmStrip DELETED (3 professional consumers re-pointed);
DeliveryStrip + CallStrip → StatusStrip wrappers. LEDGERED micro-deviations: animation unified,
icon strokeWidth 2.8/2.6→3.

### Stage 8 — Quote variants ✅ CLOSED

| Step | Detail |
|------|--------|
| 8.1 | Normalize QuotePanel variants across corpus (EscalationTicketCard inline quote, NotePanel footer-anatomy decision, FamilyFeedbackCard quote carousel) |
| 8.2 | Sweep corpus adopting it |
| 8.3 | Real gate + grep proofs + ledger + commit |

**CLOSED (commit e75c366):** QuotePanel extended (bare/headerTrailing/glyph/footer/className);
7 quote blocks normalized. Keep-ruled: ReviewShell, RecordSheet (orphan), PartnerClinicalRecommendation.

### Stage 9 — EmptyState universal ✅ CLOSED (REDO under NORMALIZATION MANDATE)

| Step | Detail |
|------|--------|
| 9.1 | Build cause-aware EmptyState (EmptyFilterState pair, EmptyMatches, EmptyTabState, CaughtUpCard, inline empty states; ServiceList is the exemplar) |
| 9.2 | Sweep corpus adopting it — **as REAL NORMALIZATION**: delete pure-config wrappers and inline at call sites, consolidate same-family files, normalize folders/names/imports (NOT nesting-doll re-exports) |
| 9.3 | Real gate + grep proofs + ledger + commit |

**CLOSED (REDO):** universal `phone/EmptyState.tsx` built (tones emerald/amber/neutral; badge
round/square/soft × sm/md/lg; containers card/plain/dashed/soft/bare; spacing gap/margin; gaps
sm/md; paddings sm/md/lg/dashed/none; action pill/full; chip). Deleted pure-config wrappers
(professional/history/EmptyFilterState → inlined PR12, professional/offers/EmptyOffersCard →
inlined PR03). Kept genuine domain composition (admin EmptyFilterState, EmptyMatches,
EmptyTabState). Inline conversions (ServiceList, SearchSheet). Ruled out (SessionListCard,
AccessLogCard). Hard-constraint Tailwind v4 source-order fix (removed color from title/body
defaults). 7 consumers. Gate discrepancy ledgered: app gate = 47 errors, clean baseline also 47
(earlier '33' stale).

### Stage 10 — Tabs/Filters universal

| Step | Detail |
|------|--------|
| 10.1 | Build SegmentedTabs + FilterBar (3× FilterTabs, VisitTabs, DayFilterBar, ModeTabs, FilterBar, ActiveFilterStrip) |
| 10.2 | Sweep corpus adopting it |
| 10.3 | Real gate + grep proofs + ledger + commit |

### Stage 11 — Options/Actions universal

| Step | Detail |
|------|--------|
| 11.1 | Build OptionRow tones + ActionPair (ResendRow 3-state strip, SubmitButton severity→tone map, quick-reply chips, referral option rows) |
| 11.2 | Sweep corpus adopting it |
| 11.3 | Real gate + grep proofs + ledger + commit |

### Stage 12 — Field (forms) universal

| Step | Detail |
|------|--------|
| 12.1 | Build Field universal base (onboarding CredentialRow promotion; P01/A13/PasswordCard promotion debt) |
| 12.2 | Sweep corpus adopting it (Radio, EyeToggle, DescriptionInput, CaptureFileTile, PhotoAttach, OtpInput, AccountSearch, CustomRangePicker, FilterToggleRow, DayToggle) |
| 12.3 | Real gate + grep proofs + ledger + commit |

### Stage 13 — Identity universal

| Step | Detail |
|------|--------|
| 13.1 | Build Avatar + CredentialRow/Card + TrustCell (avatars, CaptureTile, SelfieCaptureCard, CredentialCards, TrustCell, SkillsCloud) |
| 13.2 | Sweep corpus adopting it |
| 13.3 | Real gate + grep proofs + ledger + commit |

### Stage 14 — Clinical residuals

| Step | Detail |
|------|--------|
| 14.1 | Re-shell MedVerificationPanel, VitalsPanel, NotesPanel, ExecutionTrail-adjacent on universals |
| 14.2 | Real gate + grep proofs + ledger + commit |

### Stage 15 — Category C workstream (if parked at Stage 0)

| Step | Detail |
|------|--------|
| 15.1 | P24 data-model mismatches ×12 (`c.default` always undefined; last4/expires missing) |
| 15.2 | PR07 notify signature ×4 |
| 15.3 | P25 QuickRequest fields ×3 |
| 15.4 | A15 tone-union mismatches ×3 |
| 15.5 | PR04 detail-optional ×2 |
| 15.6 | PR03 (Offer type import + round type) ×2 |
| 15.7 | A11 Incident fields ×2 |
| 15.8 | Singles: A02 decision-optional, A10 details-optional, PT01 onNotify variance, A12 timer leak, Offer-type imports ×4, RecordSheet downloadSessionFile, patientBilling Blob, StatementButton arg, StaffHero Record index, StaffDetailSheet joinedAt, PartnerPatientHero useRef, PartnerCarePathway TimeChip className, RecordExpansion IncidentPanel resolved, SessionDetailSheet/SessionListCard Session.location, DeletionQueueList state type |
| 15.9 | Real gate clean (zero errors) |

### Stage 16 — Final certification (B18)

| Step | Detail |
|------|--------|
| 16.1 | Zero hand-rolled pattern instances outside `phone/` (grep-checkable, not judgment-based) |
| 16.2 | Retired-path sweep zero (both path styles) |
| 16.3 | Real gate clean |
| 16.4 | Dedup audit (no two files do the same job) |
| 16.5 | Unused-vendor flag list (smoothui/ui) |
| 16.6 | Orphan-register resolution (RecordSheet deletion, grep-verified zero consumers) |
| 16.7 | Dev-server visual walkthrough of touched surfaces |
| 16.8 | Coverage tracker at 100% under the composition rule |
| 16.9 | Deferred decisions closed: gold-vs-amber collapse, CompletedCard chevron restoration |

### Stage 17 — Screen rebuilding resumes

| Step | Detail |
|------|--------|
| 17.1 | Rebuild page files on the normalized library |
| 17.2 | Punch list — hairline dividers (~25 surfaces) |
| 17.3 | Punch list — whileHover/hover-brightness/group-hover violations (~20) |
| 17.4 | Punch list — divide-x stat strips |
| 17.5 | Punch list — CompletedCard chevron restoration |
| 17.6 | Punch list — CaptureChainCard `bg-mint text-brand-ink` token bug |
| 17.7 | Real gate + visual walkthrough |

---

## PART C — STANDING REGISTERS (carried forward)

| Register | Entries |
|----------|---------|
| Orphans (delete at B18) | RecordSheet (professional/history) |
| Near-duplicate pairs (rebuild phase) | SubmittedPanel/TriggerPreview · BillingFooter/PartnerPatientFooter · EventFanOutCard/LiveFanOutCard · RetryLadderCard/NoAvailabilityLadder · EmptyFilterState pair |
| PhaseShell consolidation candidates | ApprovalCard, WithdrawalCard, IncidentLinkingCard, ReversedOfferTraceCard, RollbackTraceCard |
| Reclassifications | ResendRow→Actions · DeliveryStrip+CallStrip→StatusStrip · onboarding CredentialRow→Field |
| Punch lists (screen-rebuild phase) | hairline dividers (~25) · whileHover/group-hover (~20) · divide-x stat strips · CompletedCard chevron · CaptureChainCard token bug |
| Vendor quarantine (Ruling 1) | smoothui (~200) + ui/ (29) frozen; unused-flag list at B18 |

---

## PART D — OPEN DECISIONS (in order)

1. ~~**Category C disposition** (park vs fix now)~~ — RESOLVED: park (Stage 0). Now Stage 15 workstream.
2. ~~Two navigator-card chevron verifications (Stage 1)~~ — RESOLVED (Stage 1, commit 00bcba7).
3. Parked for rebuild: gold-vs-amber collapse, CompletedCard chevron restoration (Stage 16.9).

---

## PART E — HOW TO START

1. ~~Confirm Category C disposition (Stage 0)~~ — RESOLVED: park.
2. ~~Verify the two navigator-card chevron states (Stage 1)~~ — RESOLVED.
3. ~~Resume Row sweep stage 2, next tranche: list interiors (Stage 2)~~ — CLOSED (Stages 1-3).
4. Current position: Stages 0-9 CLOSED (commits 00bcba7, 2c968b4, 3637fab, 0a024ef, ae70312, 6b02662, e75c366, 0337ae8, 5a86937). Stage 9 (EmptyState universal) CLOSED as a REDO under the NORMALIZATION MANDATE. Stage 10 (Tabs/Filters universal) NEXT.
5. Hold every rule in `refactor-rules.md` §1 and §2. The rules exist because each one was paid for.
