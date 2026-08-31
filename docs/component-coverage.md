# Component Coverage Checklist

**Purpose:** the authoritative per-file, per-family membership and status record for the
component refactor. Governs every remaining batch. A family may only close at 100% of its
listed membership. Updated at every batch close; the migration ledger
(`docs/component-migrations.md`) is the authoritative history of what each batch did.

**Revision history:** Rev 1 built from the full tree + state audit; Rev 2 reconciled against
the migration ledger; Rev 3 recorded the Ruling 2 data-move execution. This revision
consolidates all three, with later corrections applied inline. Discrepancy Register items 1-4
are all RESOLVED (Rev 2 + B10 lock).

## Legend

| Mark | Meaning |
|---|---|
| done | Processed in a closed batch (rewired, merged, or keep-ruled) |
| verify | Family batch closed, membership lock unproven — confirm in ledger at B18 |
| reopen | B10 incomplete — per-file status unknown until ledger check at reopen |
| pending | Unprocessed — belongs to an unstarted/incomplete family pass |
| deferred | Explicitly deferred with reason; must be re-ruled at family close |
| canonical | Canonical primitive in `components/phone/` — final home |
| debt | Placement debt — shared primitive stranded in a role folder; promotion owed |
| vendor | Quarantined vendor tree — frozen, never edited; unused-set flagged at B18 |

## Standing rulings

- **Ruling 1 (vendor quarantine):** `components/smoothui/*` (~200 files) and `components/ui/*`
  (29 shadcn primitives) frozen, never edited. Known consumed smoothui modules: agent-avatar,
  notification-badge, animated-file-upload, price-flow, ai-loader. Unused-vendor deletion flag
  list produced at B18; `lib/smoothui-data/` counts as a consumer of the vendor tree.
- **Ruling 2 (data moves) — EXECUTED:** 12 modules moved to `src/data/` (10 kept names;
  `partner/performance/types.ts` → `partnerPerformanceTypes.ts`, `partner/billing/types.ts` →
  `partnerBillingTypes.ts`; both renames forced by collision with the global `src/data/types.ts`).
  53 consumer files re-pointed. TSC clean; retired-path and blind-spot sweeps zero.
  See ledger "Ruling 2".
- **Deferred decisions:** Rx gold-vs-amber tone collapse → F2 residual batch.
  CompletedCard chevron restoration → B18.
- **Commit policy:** conventional commit format, detailed bullet body in plain easy English,
  one commit per completed step/batch, only changed files staged.

---

## F0 — Phone shell & frame — CLOSED (B1)

All 21 files in `components/phone/` are canonical: AppBar, DarkPanel, ExpandRow, FactTile,
HeroCells, kit, LifecycleButton, MiniTimeline, NavBar, NoteStrip, OptionRow, Pager, PhaseHero,
PhoneFrame, PushPreview, QuotePanel, ScreenshotButton, Screen, SheetShell, Splash, StatusPill.
Deleted (grep-verified): Controls, ScreenBlocks.

## F1 — Sheets — OPEN: 21 of 58 processed (19 rewired, 2 keep-ruled), 37 pending

### Rewired (19)
patient (B3): TimeSheet, WhoSheet, FiltersSheet, ServiceSheet, LanguageSheet, DoseDetailSheet,
WithdrawSheet, LiveVisitSheet, AddPrescriptionSheet, CaregiverSheet, ConsentSheet, VisitSheet
· professional (B4): AccountSheet, ConfirmWithdrawSheet, PayoutReceiptSheet,
CertificationUploadSheet, EditProfileSheet · admin (B4): ConsentRecordSheet ·
system (B4): AccessDetailSheet

### Keep-ruled in B4 (2)
AccountActionsSheet (rows defer to F5) · FailureDrillSheet (layoutId pill selector unique)

### Pending (37)
- patient (12): MessageSheet, PrescriptionSheet, OfferSheet, AuditLogSheet, RecordsExportSheet,
  ConsentScopeSheet, RateVisitSheet, EmailFallbackSheet, FilterSheet (visits), PaymentSheet,
  VisitSoFarSheet, VitalsSheet
- professional (7): CredentialsSheet, DevicesSheet, RecordSheet, SearchSheet, ReportSheet,
  SessionDetailSheet, DeclineOfferSheet
- partner (14, zero contact): PartnerAlertsSheet, PartnerBillingSheet, PartnerDischargeFileSheet,
  PartnerInfoSheet, PartnerMessageSheet, PartnerReferralSheet, PartnerSessionsSheet,
  PartnerStaffSheet, PartnerStatsSheet, StaffDetailSheet, BillingInvoiceSheet,
  BillingUsageReportSheet, PerformanceFeedbackSheet, PerformanceKpiSheet
- admin (3): CloseSheet, EscalateSheet, PhotoViewSheet

## F2 — Heroes & stat headers — OPEN

- pending: patient/onboarding/Hero.tsx · professional/sheets/EntrySheetsHero.tsx
- verify (ledger gap — B5 Stage 4 never recorded; settle by disk grep of HeroCells / kit Hero
  imports at F2 residual batch): patient ProfileHero, ReportsHero, RatingHero
- keep-ruled in B5: PerformanceHero, CheckInHero, OnboardingHero, SessionSummaryHero (already
  on kit Hero); professional ProfileHero (distinct bottom-band composition)
- done (B5, ~28): all other role heroes on kit Hero / PhaseHero
- debt: admin/ui/AccentHero — app-wide standard stranded in admin/ui; promote in
  placement-debt batch
- note: duplicated B5 section in ledger — the second entry is authoritative
- SectionHeader: keep-ruled in B7 (state-driven vs static) — not an F2 member
- open decision at F2 residual: Rx amber maps to gold (yellow-200); collapse into amber or keep

## F3 — Status, chips & notices — CLOSED (B7), ledger-confirm at B18

Overline · PartnerChartConsentNote, PerformancePrivacyNote, PartnerAdmissionTag,
PartnerConsentNote, StaffVerificationNote · BiometricNote, PrivacyNotePanel, ConsentNote
(profile), VerificationNote (visits), DarkTimeChip, HighlightTags, RecheckNote, SealNote ·
ReliabilityNotice, PayPolicyNotice, SealedNotice x2 (history, sheets), PrivacyNotice,
SafetyNotice, SessionPrivacyNote, SheetFooterNote. Statuses: NoteStrip wrappers/collapses done;
DarkTimeChip DEFERRED (single consumer — F3 residual); HighlightTags DEFERRED (F12, merges with
CausePicker). Remainder verify (B7 closed, membership lock unproven).

## F4 — Buttons & lifecycle CTAs — OPEN (membership never locked; reopen before close)

- pending (unread): MarkSeenButton, SendResetButton, SignInButton, EmailCodeButton,
  VerifyButton, StatementButton
- deferred with reasons (re-rule at close): SubmitButton (severity class from data layer —
  severity→tone map is the F4 follow-up), SignOffButton (row-ratio), PrimaryAction (distinct
  sizing), CallButton (self-contained call lifecycle)
- verify (B6 closed, unlocked): ContinueButton, MatchButton, CreateButton, SignInAction,
  SendLinkButton, DownloadAllButton, DownloadReportButton, ShareButton, AddVisitButton,
  ConnectButton, ShareSummaryButton, FinishBar, MarkAllReadButton, NotificationBell,
  SaveAvailabilityButton, WithdrawButton, ExportHistoryButton, EditProfileButton,
  IncidentButton, SaveSheetButton
- punch list (visual, F4 sweep): OfferCard / PartnerReferralCard / StandingCard whileHover scales

## F5 — Rows — OPEN (B8 closed, membership never locked; ListRow promotion deferred)

- pending (unread): ReceiptRow, ResendRow, DigestRow, CredentialRow (patient/onboarding),
  DeliveryStrip, CallStrip, ContextPills, AlertToggleRow
- verify (B8): MedRow, StepRow, DocRow, EntryRow, ServiceRow, EarningRow, PendingSessionRow,
  PayoutRow, CertificationRow, AddCertificationRow, PreferenceRow, ChecklistRow, FieldTaskRow
- pending decision: admin/ui/ListRow promotion (own pass with hover/chevron fixes);
  navigator-card consumers deferred to it (PaymentCard, PlanCard, UpcomingCard visits;
  CreateAccountCard; SettingsCard; PartnerBillingCard, PartnerReferralCard)
- punch list (visual, ListRow pass): StaffList chevron-translate

## F6 — Cards & panels — OPEN (B9 patient closed; B10 18 read / 30 remaining; B11 unstarted)

### Patient — done (B9, incl. keep-rulings)
auth: BiometricUnlock, CreateAccountCard, DigestDetail, PasswordCard, ResetInfo · billing:
LedgerCard, ReceiptList, ReceiptTicket · booking: EstimateCard, ScheduleCard, WhoCard ·
consent: ScopesCard, WithdrawCard · dashboard: MedicationCard, RecoveryCard,
UpcomingVisitsCard · identity: PrivacyFactsCard · matching: MatchCard · meds: DueDoseCard,
MedLogCard, RefillCard · notifications: ActionCard, SettingsCard · onboarding: AftercarePanel,
ConsentBlock, ReviewSummary · plan: ConsentCycleCard, DayDetailCard, GoalsCard, PlanLinksCard,
TrendsCard (F8 re-check at B14), WeekVisitsCard · prescriptions: DocumentsCard,
PrescriptionList, RefillCard · recovery: GuaranteesCard, RecoveryFoot, SafetyCard, SentActions,
SentCard · reports: LatestReportCard (divider flag), ReportsListCard · review:
BookingRecordCard, ConsentCard, PatientCard, PaymentCard, ReviewMatchCard, SummaryCard,
VisitRecordCard · visits: CareDeliveredCard, CaregiverCard, CaregiverNoteCard, CompletedCard
(chevron decision at B18), LiveStepCard, LiveVisitCard, MissedCard, PaymentCard (visits),
PlanCard, SessionLedgerCard, UpcomingCard, VitalsCard · verification: NextStepsCard ·
profile: ReviewShell (rule at read if not a card)

### B10 locked from ledger — read (18): PartnerPatientHero rewired to kit Hero (kept custom:
useCountUp, four-band theme); keep-ruled (17): PartnerCarePathway, PartnerRecoveryTrajectory
(F8-adjacent), StaffList, PartnerBillingCard, PartnerReferralCard, NotePanel (QuotePanel
absorption ruled OUT), IncidentPanel, OfferCard, SessionRecordCard, AcceptedOffersCard,
DeclinedOffersCard, ArrivalTimelineCard (MiniTimeline-adjacent residual), StandingCard,
AccountCard, SessionListCard, LiveSessionCard, PayoutHistoryCard

### B10 remaining unread — professional (18): SecurityDevicesCard, PasswordCard, DayEditorCard,
SaveConfirmation, TimeOffCard, PayoutLinkCard, SessionEarningsCard, RecordExpansion,
SubmittedPanel, TriggerPreview, OnboardingFooter, SafetyChecksCard, TermsAcceptanceCard,
CertificationsCard, PreferencesCard, UploadConfirmation, ChecklistCard, SignOffConfirmation

### B10 remaining unread — partner (12): BillingFooter, StatementCarousel, UsageLedgerCard,
ReferredPatientList, PartnerPatientFooter, CareGoalsCard, FamilyFeedbackCard,
PerformanceFooter, PerformanceKpis, PartnerClinicalRecommendation, PartnerDischargeRecords,
StaffApprovalCard

### Pending — admin (B11): FlaggedAccountCard, PrivacyRulesCard, RecentActivityList (divider
flag), WeeklySessionsCard, ApprovalCard, GovernanceCard, AppendOnlyCard, AuditEntryList
(divider flag), ComplianceToolsList, ConsentLifecycleCard, DueReviewCard, WithdrawalCard,
AttentionList, IncidentOverviewCard, LiveSessionsCard, AccountabilityCard,
EscalationTicketCard, RelatedTicketsList, DecisionNoteCard (NoteStrip candidate — rule at
read), IncidentSummaryCard, LinkedRecordsCard, PhotoEvidenceCard, DeletionQueueList (divider
flag), RetentionPeriodsList

### Pending — system (B11): AccessLogCard, CaptureChainCard, SealChainCard, DeliveryHealthCard,
EventFanOutCard, FailsafeCard, FailureDrillCard, LiveFanOutCard, IncidentLinkingCard,
SupervisorEscalationCard, NotificationFeed, RecheckResolutionCard, RecheckRulesList,
RefundCard, OfferStatusList

### Pending decisions
admin/ui/InfoListCard (F6 canonical target; promotion decision at B11) · patient/plan/FactRows
(debt — cross-role, promote in placement-debt batch)

## F7 — Steppers, rails & timelines — OPEN (B14)
WizardStepper, LiveStepper, JourneyRail, JourneyTime, MonthTimeline, AuditTimeline,
StepTimeline, DispatchSequence, CycleStep, ArrivalTimelineCard (B10 keep-ruled; F7 re-check),
PartnerCarePathway (B10 keep-ruled; F7 re-check), IncidentTimelineCard, TransactionStepList.
(MiniTimeline canonical in phone/.)

## F8 — Meters, charts & stat strips — OPEN (B14)
OfferMeter, ValidityMeter, WeekBars, PasswordMeter, Sparkline, LedgerBar,
PartnerRecoveryTrajectory (B10 keep-ruled; F8 re-check), CategoryMixCard, TrendsCard (B9;
re-check), big-number cells (3 value scales, with Vault TapStat), MedsHero dose rail.
Punch-list divide-x strips ride this pass: RevenueHero, LedgerChainHero, AuditHero,
RecheckHero, TransactionHero, SessionSummaryHero.

## F9 — Filters, tabs & empty states — OPEN (B12)
FilterTabs x3 (patient/notifications, patient/records, professional/history),
EmptyFilterState x2 (admin/approvals, professional/history), EmptyMatches, EmptyTabState,
CaughtUpCard, ActiveFilterStrip, admin/ui/FilterBar, VisitTabs, DayFilterBar, ModeTabs,
EmptyOffersCard (B10 area — rule at read). (Pager canonical — moved early.) ServiceList is the
cause-aware empty-state exemplar (B9 keep-ruled).

## F10 — Forms, entry & file input — OPEN (B13)
Radio, EyeToggle, DescriptionInput, CaptureFileTile, PhotoAttach, OtpInput, AccountSearch,
CustomRangePicker, FilterToggleRow, DayToggle, PasswordCard (B9 — CredentialRow composition,
F10 territory).

## F11 — Ratings & stars — OPEN (B15)
partner/performance/Stars, StarPicker, RatingStrip, RatingCta.

## F12 — Pickers & selection grids — OPEN (B15)
CategoryGrid, CategoryRail, WindowOption, CausePicker, SeveritySelector, QuickActions,
QuickActionsGrid, PartnerQuickActions, PartnerCareCategoryGrid, CheckTile, HighlightTags
(deferred from F3 — merges with CausePicker).

## F13 — Identity, avatar & credentials — OPEN (B16)
CaptureTile, SelfieCaptureCard, ConfidencePanel, TrustCell, CredentialCard x2 (patient
onboarding, patient profile), PartnerCredentialCard, SkillsCloud.

## F14 — Domain-genuine clinical residuals — OPEN (B17, re-shelled on F1-F6)
professional/sheets: MedVerificationPanel, VitalsPanel, NotesPanel, ReopenSheetsBar ·
system: ExecutionTrail, PostCommitRetryCard, RetryLadderCard, NoAvailabilityLadder,
ReversedOfferTraceCard, RollbackTraceCard, StateDiffCard · admin/retention: CryptoDeletionCard.

## Vendor (frozen)
`components/smoothui/*` (~200 files), `components/ui/*` (29 files), `lib/smoothui-data/*`.
Unused-vendor flag list at B18.

## Divider punch list (visual — deferred to screen-rebuild phase)
AuditEntryList, RecentActivityList, DeletionQueueList, ReferredPatientList, SessionListCard,
ReportsHero, InfoListCard, PayoutHistoryCard.

## Family close rule

A family closes only when: every file above shows done / deferred (re-ruled) / moved /
canonical, the ledger confirms the reconstruction, `npx tsc --noEmit` is clean, and the
dual-pattern retired-path sweep returns zero. B18 certifies against this file at 100%.

## Remaining batch order

F1 finish (partner first, 6-file reads) → F2 residual (2 heroes + ProfileHero/ReportsHero/
RatingHero verification + gold/amber decision) → placement-debt batch (FactRows, AccentHero)
→ B10 close (30 unread) → B11 → B12 → B13 → B14 → B15 → B16 → B17 → B18 (sweep, dedup audit,
compile, vendor flag list, deferred decisions, 100% certification) → screen rebuild resumes.

---
# Revision 4 — F1 partner sheets batch 1 (6 of 14)

- Rewired onto SheetShell height="auto": PartnerAlertsSheet, PartnerBillingSheet,
  PartnerDischargeFileSheet, PartnerInfoSheet, PartnerMessageSheet, PartnerReferralSheet
- F1 now 27 of 58 processed (25 rewired, 2 keep-ruled); partner 6 of 14; remaining:
  PartnerSessionsSheet, PartnerStaffSheet, PartnerStatsSheet, StaffDetailSheet,
  BillingInvoiceSheet, BillingUsageReportSheet, PerformanceFeedbackSheet, PerformanceKpiSheet
- Canonical change: SheetShell gains height ('full' | 'auto') — superset API, no consumer breakage

---
# Revision 5 — F1 partner sheets batch 2 (12 of 14)

- Rewired: PartnerSessionsSheet, PartnerStaffSheet, PartnerStatsSheet (auto);
  StaffDetailSheet (auto, self-owned dim preserved); BillingInvoiceSheet,
  BillingUsageReportSheet (scroll)
- Canonical change: SheetShell height now 'full' | 'auto' | 'scroll'
- F1 now 33 of 58 processed (31 rewired, 2 keep-ruled); partner 12 of 14; remaining partner:
  PerformanceFeedbackSheet, PerformanceKpiSheet; then professional 7, patient 12, admin 3

---
# Revision 6 — F1 partner sheets COMPLETE (14 of 14); admin F1 resolved

- Rewired: PerformanceFeedbackSheet, PerformanceKpiSheet (auto, self-owned dims preserved)
- Keep-ruled with evidence: admin CloseSheet, EscalateSheet, PhotoViewSheet — content
  fragments; A02 already wraps them in canonical BottomSheet. Admin F1 entry resolved
- F1 now 36 of 58 processed (34 rewired, 2 keep-ruled from B4); partner closed 14/14;
  admin closed 3/3; remaining: professional 7, patient 12
- Canonical: SheetShell height 'full' | 'auto' | 'scroll' — final after this batch

---
# Revision 7 — F1 professional sheets tranche 1 (6 of 7)

- Rewired: CredentialsSheet, DevicesSheet (scroll); RecordSheet, SearchSheet (full + header
  slot); ReportSheet, SessionDetailSheet (auto, self-owned dims preserved)
- Canonical change: SheetShell full mode gains header?: ReactNode slot (superset API)
- NEW REGISTER — orphaned components (zero grep-proven consumers; deletion ruled at B18):
  RecordSheet (professional/history)
- F1 now 42 of 58 processed (40 rewired, 2 keep-ruled); professional 6 of 7; remaining:
  DeclineOfferSheet (prof) + patient 12

---
# Revision 8 — Professional F1 COMPLETE (7 of 7); patient pending-list corrected

- Rewired: DeclineOfferSheet (scroll, self-owned dim preserved)
- CORRECTION: MessageSheet, PrescriptionSheet, OfferSheet (profile), AuditLogSheet,
  RecordsExportSheet were already canonical consumers — disk-verified, moved pending → done.
  Patient F1 remaining is 7 sheets, not 12
- F1 now 48 of 58 processed (46 rewired, 2 keep-ruled); professional closed 7/7;
  partner closed 14/14; admin closed 3/3; remaining: patient 7

---
# Revision 9 — F1 FAMILY CLOSED (57 of 57)

- Corrections: ConsentScopeSheet, RateVisitSheet, EmailFallbackSheet, FilterSheet (visits),
  PaymentSheet, VisitSoFarSheet, VitalsSheet — already canonical, pending → done
- Family count corrected 58 → 57 (phantom audit miscount closed)
- F1 FINAL: 40 rewired · 5 keep-ruled · 12 already-canonical · orphan register: RecordSheet (B18)
- Session rewires: partner 14, professional 7 (21 total; ~500 lines of hand-rolled shell code
  retired). Canonical SheetShell now covers all three sheet idioms
- NEXT per sequence: F2 residual — patient/onboarding/Hero.tsx, professional/sheets/
  EntrySheetsHero.tsx (unread), ProfileHero/ReportsHero/RatingHero ledger-gap verification
  (disk grep), Rx gold-vs-amber decision

---
# Revision 10 — F2 FAMILY CLOSED

- Rewired: EntrySheetsHero → PhaseHero (blueDeep/emeraldBright)
- Keep-ruled: patient/onboarding/Hero (brand splash, single caller)
- Verified done (ledger gap closed): ProfileHero, ReportsHero, RatingHero — on AccentHero +
  HeroCells, B5 Stage 4 confirmed by disk
- Decision closed: gold stays in HeroAccent map (collapse = visual change on frozen surface;
  ruled by constraint)
- NEXT per sequence: placement-debt batch — promote FactRows (patient/plan → phone/) and
  AccentHero (admin/ui → phone/), then B10 close (30 unread cards)
