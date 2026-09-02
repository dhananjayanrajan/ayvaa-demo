# MINED — live-visit

auto-extracted from legacy corpus — requirements evidence only (R6). object-literal tone maps dumped raw; props surfaces as member lists; everything else summarized.

### src/apps/patient/P16.tsx (231 lines)
imports: AppBar ← @/components/phone/AppBar | BodyArea, EndOfScroll, FootBar, Screen ← @/components/phone/Screen | Panel, Section, Tile, rise, stagger ← @/components/phone/kit | useRouter ← @/lib/router | LIVE_VISIT, SEAL_TIME, VISIT_STEPS, WALK_LAPS_START, WALK_LAPS_TOTAL, activeStepIndexOf, activeStepOf, buildLedger, formatElapsed, type VisitStep, ← @/data/patientLiveVisit | LiveVisitHero ← @/components/visits/VisitsSet | LiveStepCard ← @/components/visits/VisitsSet | StepTimeline ← @/components/visits/VisitsSet | CaregiverCard ← @/components/visits/VisitsSet | PlanCard ← @/components/visits/VisitsSet | VisitSoFarSheet ← @/components/visits/VisitsSet | useDemo ← @/lib/store
exports: P16
state: false | LIVE_VISIT.elapsedBaseSeconds | VISIT_STEPS | WALK_LAPS_START | false   effects:4 timers:0 machines:0

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

### src/data/patientLiveVisit.ts (132 lines)
exports: LIVE_VISIT, SEAL_TIME, StepState, StepReading, VisitStep, VISIT_STEPS, WALK_LAPS_TOTAL, WALK_LAPS_START, ACTIVE_STEP_META, activeStepOf, activeStepIndexOf, sealedStepsOf, todoStepsOf, formatElapsed, LedgerRow, buildLedger
state: (none)   effects:0 timers:0 machines:0

## domain census (26 files, 2115 lines)
spring pairs: 500×2
stiffness singles: 500×2
damping singles: 34×2
durations: 0.2×1  0.25×1  0.45×1
eases: easeOut×1
curves: (none)
repeats: (none)
delays: (none)
whileTap: scale: 0.97×2  scale: 0.9×1  scale: 0.985×1  scale: 0.99×1
whileHover: (none)
rounded: rounded-2xl×33  rounded-full×25  rounded-xl×14
text-px: text-[9px]×31  text-[12px]×16  text-[10px]×10  text-[13px]×10  text-[10.5px]×8  text-[12.5px]×8  text-[14px]×8  text-[15px]×8  text-[11.5px]×7  text-[11px]×7  text-[19px]×3  text-[20px]×2  text-[13.5px]×1  text-[8px]×1  text-[9.5px]×1
tracking: tracking-[0.14em]×23  tracking-[0.22em]×4  tracking-[0.16em]×3  tracking-[0.18em]×2
spacing: gap-2×27  gap-3×23  py-3.5×15  mt-4×14  mt-3×12  mt-0.5×11  mt-1.5×11  mt-2×11  px-4×11  mt-1×10  px-3.5×10  py-3×10  p-4×8  gap-2.5×7  py-2.5×7  gap-1.5×6  mt-2.5×6  gap-3.5×5
spacing-arbitrary: mt-[3px]×2
opacity /NN: 40×24  45×15  60×11  70×11  50×10  55×10  2×4  25×4  90×4  20×3  80×3  78×2
opacity /[0.0N]: 08×11  12×8  03×7  06×7  16×6  1×5  04×3  05×3  6×3  2×2  02×1  035×1
weights: bold×55  extrabold×45  semibold×17  medium×7
tabular-nums total: 25
