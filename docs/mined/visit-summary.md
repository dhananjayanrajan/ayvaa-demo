# MINED — visit-summary

auto-extracted from legacy corpus — requirements evidence only (R6). object-literal tone maps dumped raw; props surfaces as member lists; everything else summarized.

### src/apps/patient/P17.tsx (147 lines)
imports: AppBar ← @/components/phone/AppBar | BodyArea, EndOfScroll, FootBar, Screen ← @/components/phone/Screen | Chip, Panel, Section, Tile, rise, stagger ← @/components/phone/kit | StaticButton ← @/components/phone/LifecycleButton | useRouter ← @/lib/router | SummaryHero ← @/components/visits/VisitsSet | VitalsCard ← @/components/visits/VisitsSet | VitalsSheet ← @/components/visits/VisitsSet | SessionLedgerCard ← @/components/visits/VisitsSet | CareDeliveredCard ← @/components/visits/VisitsSet | CaregiverNoteCard ← @/components/visits/VisitsSet | PaymentCard ← @/components/visits/VisitsSet
exports: P17
state: null | false   effects:0 timers:0 machines:0

### src/components/review/ReviewSet.tsx (908 lines)
imports: AccentHero ← @/components/phone/AccentHero | HeroHighlight, HeroTopRow, StatCell ← @/components/phone/HeroCells | FactRows ← @/components/phone/FactRows | CONSENT_ITEMS, REVIEW_GUARDIAN, REVIEW_MATCH, REVIEW_PATIENT, REVIEW_SCHEDULE, REVIEW_WEEK, activeDayNames, bookingRows, consentProgress, consentScopeRows, dispatchFacts, dispatchSteps, paymentMethod, recordRows, type ConsentId ← @/data/patientReview | StatusPill ← @/components/phone/StatusPill | Row ← @/components/phone/Row | OfferMeter ← @/components/patient/matching/OfferMeter | cn ← @/lib/utils | SheetShell ← @/components/phone/SheetShell | useRouter ← @/lib/router | StepList ← @/components/phone/StepList | HIGHLIGHT_TAGS, RATED_VISIT, buildFeedbackRows, ratingLabel ← @/data/patientRating
exports: BookingRecordCard, ConfirmedHero, ConsentCard, ConsentScopeSheet, DispatchSequence, HighlightTags, PatientCard, PaymentCard, RateVisitSheet, RatingHero, ReviewHero, ReviewMatchCard, ShareButton, StarPicker, SummaryCard, VisitRecordCard
state: 'idle' | 'idle'   effects:2 timers:2 machines:0
props `ConsentCardProps`: approvals: Record<ConsentId, boolean> · onToggle: (id: ConsentId) => void · onOpenScope: () => void
props `ConsentScopeSheetProps`: onClose: () => void
props `HighlightTagsProps`: selected: string[] · onToggle: (tag: string) => void
props `RateVisitSheetProps`: submitted: boolean · stars: number · selectedTags: string[] · note: string · onStars: (stars: number) => void · onToggleTag: (tag: string) => void · onNote: (note: string) => void · onConfirmed: () => void · onClose: () => void · onBackToVisits: () => void · onHome: () => void
props `RatingHeroProps`: submitted: boolean · stars: number · highlightCount: number · note: string · onOpenSheet: () => void
props `StarPickerProps`: value: number | null · onChange: (stars: number) => void

### src/components/patient/review/BookingRecordCard.tsx (26 lines)
imports: AccentHero ← @/components/phone/AccentHero | HeroTopRow ← @/components/phone/HeroCells | FactRows ← @/components/phone/FactRows | recordRows ← @/data/patientReview
exports: BookingRecordCard
state: (none)   effects:0 timers:0 machines:0

### src/components/patient/review/ConfirmedHero.tsx (45 lines)
imports: AccentHero ← @/components/phone/AccentHero | StatusPill ← @/components/phone/StatusPill | HeroTopRow, HeroHighlight, StatCell ← @/components/phone/HeroCells | dispatchFacts ← @/data/patientReview
exports: ConfirmedHero
state: (none)   effects:0 timers:0 machines:0

### src/components/patient/review/ConsentCard.tsx (120 lines)
imports: AccentHero ← @/components/phone/AccentHero | Row ← @/components/phone/Row | OfferMeter ← @/components/patient/matching/OfferMeter | CONSENT_ITEMS, REVIEW_GUARDIAN, consentProgress, type ConsentId ← @/data/patientReview | cn ← @/lib/utils
exports: ConsentCard
state: (none)   effects:0 timers:0 machines:0
props `ConsentCardProps`: approvals: Record<ConsentId, boolean> · onToggle: (id: ConsentId) => void · onOpenScope: () => void

### src/components/patient/review/ConsentScopeSheet.tsx (50 lines)
imports: SheetShell ← @/components/phone/SheetShell | consentScopeRows ← @/data/patientReview | useRouter ← @/lib/router
exports: ConsentScopeSheet
state: (none)   effects:0 timers:0 machines:0
props `ConsentScopeSheetProps`: onClose: () => void

### src/components/patient/review/DispatchSequence.tsx (61 lines)
imports: AccentHero ← @/components/phone/AccentHero | StatusPill ← @/components/phone/StatusPill | StepList ← @/components/phone/StepList | dispatchSteps ← @/data/patientReview
exports: DispatchSequence
state: (none)   effects:0 timers:0 machines:0

### src/components/patient/review/HighlightTags.tsx (39 lines)
imports: HIGHLIGHT_TAGS ← @/data/patientRating | cn ← @/lib/utils
exports: HighlightTags
state: (none)   effects:0 timers:0 machines:0
props `HighlightTagsProps`: selected: string[] · onToggle: (tag: string) => void

### src/components/patient/review/PatientCard.tsx (52 lines)
imports: Card ← @/components/phone/kit | initialsOf ← @/data/patientMatching | REVIEW_GUARDIAN, REVIEW_PATIENT ← @/data/patientReview
exports: PatientCard
state: (none)   effects:0 timers:0 machines:0

### src/components/patient/review/PaymentCard.tsx (27 lines)
imports: Card, Tile ← @/components/phone/kit | paymentMethod ← @/data/patientReview | useRouter ← @/lib/router
exports: PaymentCard
state: (none)   effects:0 timers:0 machines:0

### src/components/patient/review/RateVisitSheet.tsx (240 lines)
imports: SheetShell ← @/components/phone/SheetShell | QuotePanel ← @/components/phone/QuotePanel | RATED_VISIT, buildFeedbackRows, ratingLabel ← @/data/patientRating | cn ← @/lib/utils
exports: RateVisitSheet
state: 'idle'   effects:1 timers:1 machines:0
props `RateVisitSheetProps`: submitted: boolean · stars: number · selectedTags: string[] · note: string · onStars: (stars: number) => void · onToggleTag: (tag: string) => void · onNote: (note: string) => void · onConfirmed: () => void · onClose: () => void · onBackToVisits: () => void · onHome: () => void

### src/components/patient/review/RatingHero.tsx (81 lines)
imports: AccentHero ← @/components/phone/AccentHero | StatusPill ← @/components/phone/StatusPill | HeroTopRow, HeroHighlight, StatCell ← @/components/phone/HeroCells | RATED_VISIT, ratingLabel ← @/data/patientRating
exports: RatingHero
state: (none)   effects:0 timers:0 machines:0
props `RatingHeroProps`: submitted: boolean · stars: number · highlightCount: number · note: string · onOpenSheet: () => void

### src/components/patient/review/ReviewHero.tsx (61 lines)
imports: AccentHero ← @/components/phone/AccentHero | HeroTopRow, HeroHighlight, StatCell ← @/components/phone/HeroCells | REVIEW_SCHEDULE, REVIEW_WEEK, activeDayNames ← @/data/patientReview
exports: ReviewHero
state: (none)   effects:0 timers:0 machines:0

### src/components/patient/review/ReviewMatchCard.tsx (61 lines)
imports: useRouter ← @/lib/router | AccentHero ← @/components/phone/AccentHero | StatusPill ← @/components/phone/StatusPill | initialsOf ← @/data/patientMatching | REVIEW_MATCH ← @/data/patientReview
exports: ReviewMatchCard
state: (none)   effects:0 timers:0 machines:0

### src/components/patient/review/ShareButton.tsx (26 lines)
imports: IconLifecycleButton ← @/components/phone/LifecycleButton
exports: ShareButton
state: 'idle'   effects:1 timers:1 machines:0

### src/components/patient/review/StarPicker.tsx (43 lines)
imports: cn ← @/lib/utils
exports: StarPicker
state: (none)   effects:0 timers:0 machines:0
props `StarPickerProps`: value: number | null · onChange: (stars: number) => void

### src/components/patient/review/SummaryCard.tsx (14 lines)
imports: Card ← @/components/phone/kit | FactRows ← @/components/phone/FactRows | bookingRows ← @/data/patientReview
exports: SummaryCard
state: (none)   effects:0 timers:0 machines:0

### src/components/patient/review/VisitRecordCard.tsx (36 lines)
imports: Card, Tile ← @/components/phone/kit | FactRows ← @/components/phone/FactRows | RATED_VISIT ← @/data/patientRating
exports: VisitRecordCard
state: (none)   effects:0 timers:0 machines:0

### src/components/patient/visits/CareDeliveredCard.tsx (56 lines)
imports: Card, Chip, TimeChip ← @/components/phone/kit | ExpandRow ← @/components/phone/ExpandRow | CARE_STEPS ← @/data/patientVisitSummary
exports: CareDeliveredCard
state: null   effects:0 timers:0 machines:0

### src/components/patient/visits/CaregiverCard.tsx (112 lines)
imports: Card, LiveDot ← @/components/phone/kit | DarkPanel ← @/components/phone/DarkPanel | QuietLifecycleButton ← @/components/phone/LifecycleButton | LIVE_VISIT, formatElapsed ← @/data/patientLiveVisit | useDemo ← @/lib/store
exports: CaregiverCard
state: 'idle'   effects:1 timers:2 machines:0
props `CaregiverCardProps`: elapsedSeconds: number

### src/components/patient/visits/CaregiverNoteCard.tsx (22 lines)
imports: Card ← @/components/phone/kit | QuotePanel ← @/components/phone/QuotePanel | initialsOf ← @/data/patientMatching | VISIT_SUMMARY ← @/data/patientVisitSummary
exports: CaregiverNoteCard
state: (none)   effects:0 timers:0 machines:0

### src/components/patient/visits/CompletedCard.tsx (93 lines)
imports: Card, Chip ← @/components/phone/kit | ExpandRow ← @/components/phone/ExpandRow | FactRows ← @/components/phone/FactRows | useRouter ← @/lib/router | USUAL_CAREGIVER, applyVisitFilters, completedVisits, timeRange, type VisitFilters ← @/data/patientVisits
exports: CompletedCard
state: false   effects:0 timers:0 machines:0
props `CompletedCardProps`: filters: VisitFilters · onClearFilters: () => void

### src/components/patient/visits/ConnectButton.tsx (84 lines)
imports: useDemo ← @/lib/store | cn ← @/lib/utils
exports: ConnectButton
state: 'idle'   effects:1 timers:2 machines:0
props `ConnectButtonProps`: icon: LucideIcon · label: string · workingLabel: string · doneLabel: string · variant?: 'soft' | 'solid' · notifyTitle: string · notifyBody: string

### src/components/patient/visits/EmptyTabState.tsx (47 lines)
imports: EmptyState ← @/components/phone/EmptyState
exports: EmptyTabState
state: (none)   effects:0 timers:0 machines:0
props `EmptyTabStateProps`: cause: 'filters' | 'all-good' · label: string · onClearFilters: () => void

### src/components/patient/visits/FilterSheet.tsx (125 lines)
imports: SheetShell ← @/components/phone/SheetShell | USUAL_CAREGIVER, filterOptions, type VisitFilters ← @/data/patientVisits | cn ← @/lib/utils
exports: FilterSheet
state: initial | 'idle'   effects:1 timers:2 machines:0
props `FilterSheetProps`: initial: VisitFilters · visibleCount: number · onApply: (filters: VisitFilters) => void · onClose: () => void

### src/components/patient/visits/LiveStepCard.tsx (127 lines)
imports: Card, Chip ← @/components/phone/kit | ACTIVE_STEP_META, WALK_LAPS_TOTAL, type VisitStep ← @/data/patientLiveVisit | cn ← @/lib/utils
exports: LiveStepCard
state: (none)   effects:0 timers:0 machines:0
props `LiveStepCardProps`: step: VisitStep · stepIndex: number · stepsTotal: number · lapsDone: number

### src/components/patient/visits/LiveVisitCard.tsx (49 lines)
imports: AccentHero ← @/components/phone/AccentHero | StatusPill ← @/components/phone/StatusPill | useRouter ← @/lib/router | LIVE_VISIT ← @/data/patientVisits
exports: LiveVisitCard
state: (none)   effects:0 timers:0 machines:0

### src/components/patient/visits/LiveVisitHero.tsx (106 lines)
imports: AccentHero ← @/components/phone/AccentHero | StatusPill ← @/components/phone/StatusPill | HeroTopRow, HeroHighlight, StatCell ← @/components/phone/HeroCells | formatElapsed ← @/data/patientLiveVisit | cn ← @/lib/utils
exports: LiveVisitHero
state: (none)   effects:0 timers:0 machines:0
props `LiveVisitHeroProps`: patientFirst: string · startedAt: string · signOffEta: string · elapsedSeconds: number · windowMinutes: number · notifyAtSignOff: boolean · onToggleNotify: () => void

### src/components/patient/visits/MissedCard.tsx (39 lines)
imports: Card, Chip, Tile ← @/components/phone/kit | missedVisits ← @/data/patientVisits
exports: MissedCard
state: (none)   effects:0 timers:0 machines:0

### src/components/patient/visits/PaymentCard.tsx (31 lines)
imports: Card, Chip ← @/components/phone/kit | Row ← @/components/phone/Row | payment, paymentMethodLabel ← @/data/patientVisitSummary
exports: PaymentCard
state: (none)   effects:0 timers:0 machines:0

### src/components/patient/visits/PaymentSheet.tsx (102 lines)
imports: SheetShell ← @/components/phone/SheetShell | FactRows ← @/components/phone/FactRows | paymentBreakdown, paymentMethodLabel ← @/data/patientVisitSummary | useDemo ← @/lib/store | cn ← @/lib/utils
exports: PaymentSheet
state: '' | 'idle'   effects:1 timers:2 machines:0

### src/components/patient/visits/PlanCard.tsx (30 lines)
imports: Card ← @/components/phone/kit | Row ← @/components/phone/Row | VISIT_STEPS ← @/data/patientLiveVisit | useRouter ← @/lib/router
exports: PlanCard
state: (none)   effects:0 timers:0 machines:0

### src/components/patient/visits/SessionLedgerCard.tsx (75 lines)
imports: AccentHero ← @/components/phone/AccentHero | StatusPill ← @/components/phone/StatusPill | SESSION_LEDGER ← @/data/patientVisitSummary
exports: SessionLedgerCard
state: (none)   effects:0 timers:0 machines:0

### src/components/patient/visits/ShareSummaryButton.tsx (36 lines)
imports: IconLifecycleButton ← @/components/phone/LifecycleButton | summaryShareText ← @/data/patientVisitSummary | useDemo ← @/lib/store
exports: ShareSummaryButton
state: 'idle'   effects:1 timers:3 machines:0

### src/components/patient/visits/StepRow.tsx (66 lines)
imports: Chip, TimeChip ← @/components/phone/kit | ExpandRow ← @/components/phone/ExpandRow | FactRows ← @/components/phone/FactRows | Row ← @/components/phone/Row | VisitStep ← @/data/patientLiveVisit
exports: StepRow
state: (none)   effects:0 timers:0 machines:0
props `StepRowProps`: step: VisitStep · open?: boolean · onToggle?: () => void

### src/components/patient/visits/StepTimeline.tsx (65 lines)
imports: Card, Chip, Tile ← @/components/phone/kit | VISIT_STEPS, sealedStepsOf, todoStepsOf, type VisitStep ← @/data/patientLiveVisit
exports: StepTimeline
state: null   effects:0 timers:0 machines:0
props `StepTimelineProps`: steps: VisitStep[]

### src/components/patient/visits/SummaryHero.tsx (126 lines)
imports: AccentHero ← @/components/phone/AccentHero | StatusPill ← @/components/phone/StatusPill | HeroTopRow, HeroHighlight, StatCell ← @/components/phone/HeroCells | initialsOf ← @/data/patientMatching | VISIT_SUMMARY ← @/data/patientVisitSummary | useDemo ← @/lib/store | cn ← @/lib/utils
exports: SummaryHero
state: 'idle'   effects:1 timers:2 machines:0

### src/components/patient/visits/UpcomingCard.tsx (43 lines)
imports: Card ← @/components/phone/kit | Row ← @/components/phone/Row | useRouter ← @/lib/router | applyVisitFilters, upcomingSubtitle, upcomingVisits, type VisitFilters ← @/data/patientVisits
exports: UpcomingCard
state: (none)   effects:0 timers:0 machines:0

### src/components/patient/visits/VisitSoFarSheet.tsx (93 lines)
imports: SheetShell ← @/components/phone/SheetShell | LIVE_VISIT, formatElapsed, type LedgerRow ← @/data/patientLiveVisit | cn ← @/lib/utils
exports: VisitSoFarSheet
state: (none)   effects:0 timers:0 machines:0
props `VisitSoFarSheetProps`: elapsedSeconds: number · ledger: LedgerRow[] · onClose: () => void · onOpenLog: () => void

### src/components/patient/visits/VisitsHero.tsx (49 lines)
imports: AccentHero ← @/components/phone/AccentHero | StatusPill ← @/components/phone/StatusPill | HeroTopRow, HeroHighlight, StatCell ← @/components/phone/HeroCells | USUAL_CAREGIVER, confirmedCount, missedVisits, upcomingVisits ← @/data/patientVisits
exports: VisitsHero
state: (none)   effects:0 timers:0 machines:0

### src/components/patient/visits/VitalsCard.tsx (42 lines)
imports: Card ← @/components/phone/kit | Row ← @/components/phone/Row | VITAL_READINGS, vitalIntent, type VitalReading ← @/data/patientVisitSummary
exports: VitalsCard
state: (none)   effects:0 timers:0 machines:0
props `VitalsCardProps`: onSelect: (reading: VitalReading) => void

### src/components/patient/visits/VitalsSheet.tsx (134 lines)
imports: SheetShell ← @/components/phone/SheetShell | FactRows ← @/components/phone/FactRows | VitalReading ← @/data/patientVisitSummary | useDemo ← @/lib/store | cn ← @/lib/utils
exports: VitalsSheet
state: 'idle'   effects:1 timers:2 machines:0

### src/data/patientVisitSummary.ts (175 lines)
exports: VISIT_SUMMARY, VitalKind, VitalTrend, VitalReading, VITAL_READINGS, vitalIntent, SessionRow, SESSION_LEDGER, CareStep, CARE_STEPS, payment, paymentMethodLabel, paymentBreakdown, summaryShareText
state: (none)   effects:0 timers:0 machines:0

### src/data/patientReview.ts (130 lines)
exports: REVIEW_MATCH, REVIEW_PATIENT, REVIEW_GUARDIAN, WeekDay, REVIEW_WEEK, REVIEW_SCHEDULE, activeDayNames, scheduleValue, bookingRows, ConsentId, ConsentItem, CONSENT_ITEMS, consentProgress, paymentMethod, consentScopeRows, dispatchFacts, DispatchStep, dispatchSteps, recordRows
state: (none)   effects:0 timers:0 machines:0

## domain census (44 files, 4094 lines)
spring pairs: 400/16×2  400/22×2  500/34×2
stiffness singles: 400×4  500×2
damping singles: 16×2  22×2  34×2
durations: 0.32×2  0.2×1  0.25×1  0.45×1
eases: easeOut×3
curves: (none)
repeats: (none)
delays: (none)
whileTap: scale: 0.97×4  scale: 0.985×3  scale: 0.8×2  scale: 0.93×2  scale: 0.99×1
whileHover: (none)
rounded: rounded-2xl×75  rounded-full×42  rounded-xl×26  rounded-[20px]×2  rounded-lg×2
text-px: text-[9px]×69  text-[12.5px]×32  text-[10.5px]×24  text-[12px]×24  text-[11px]×23  text-[13px]×20  text-[10px]×18  text-[15px]×18  text-[11.5px]×16  text-[19px]×13  text-[14px]×12  text-[20px]×2  text-[13.5px]×1  text-[8px]×1  text-[9.5px]×1
tracking: tracking-[0.14em]×47  tracking-[0.18em]×12  tracking-[0.22em]×8  tracking-[0.16em]×3  tracking-[0.12em]×2
spacing: gap-2×47  gap-3×41  mt-2×35  mt-3×32  mt-1×30  mt-4×30  px-3.5×30  gap-1.5×26  py-3.5×26  py-3×22  mt-0.5×21  mt-1.5×21  py-2.5×21  px-4×20  p-4×15  gap-2.5×14  gap-3.5×13  mt-2.5×12
spacing-arbitrary: mt-[3px]×2
opacity /NN: 40×66  50×32  55×32  45×23  70×23  60×21  25×10  80×7  90×6  15×5  85×5  2×4
opacity /[0.0N]: 06×23  08×16  1×15  03×11  04×11  14×11  07×9  12×9  16×8  05×6  2×4  6×3
weights: bold×109  extrabold×103  semibold×36  medium×26
tabular-nums total: 43
