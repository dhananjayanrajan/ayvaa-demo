import { useEffect, useRef, useState } from 'react'
import { BadgeCheck, BellRing, CalendarDays, Check, CheckCircle2, ChevronRight, ClipboardList, Clock, Filter, Footprints, ListChecks, Loader2, Lock, MapPin, MessageSquare, Phone, Quote, Radio, ReceiptText, ScrollText, Share2, ShieldCheck, SlidersHorizontal, Undo2, X, type LucideIcon } from 'lucide-react'
import { Card, Chip, LiveDot, Tile, TimeChip } from '@/components/base/phone/kit'
import { ExpandRow } from '@/components/base/phone/expand-row'
import { CARE_STEPS, SESSION_LEDGER, VISIT_SUMMARY, VITAL_READINGS, payment, paymentBreakdown, paymentMethodLabel, summaryShareText, type VitalReading, vitalIntent } from '@/data/patientVisitSummary'
import { DarkPanel } from '@/components/base/phone/dark-panel'
import { IconLifecycleButton, QuietLifecycleButton } from '@/components/base/phone/lifecycle-button'
import { ACTIVE_STEP_META, LIVE_VISIT, VISIT_STEPS, WALK_LAPS_TOTAL, formatElapsed, sealedStepsOf, todoStepsOf, type LedgerRow, type VisitStep } from '@/data/patientLiveVisit'
import { useDemo } from '@/lib/store'
import { QuotePanel } from '@/components/base/phone/quote-panel'
import { initialsOf } from '@/data/patientMatching'
import { FactRows } from '@/components/base/phone/fact-rows'
import { useRouter } from '@/lib/router'
import { LIVE_VISIT as LIVE_VISIT_Visits, USUAL_CAREGIVER, applyVisitFilters, completedVisits, confirmedCount, filterOptions, missedVisits, timeRange, type VisitFilters, upcomingSubtitle, upcomingVisits } from '@/data/patientVisits'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { EmptyState } from '@/components/base/phone/empty-state'
import { SheetShell } from '@/components/base/phone/sheet-shell'
import { AccentHero } from '@/components/base/phone/accent-hero'
import { StatusPill } from '@/components/base/phone/status-pill'
import { HeroHighlight, HeroTopRow, StatCell } from '@/components/base/phone/hero-cells'
import { Row } from '@/components/base/phone/row'

export function CareDeliveredCard() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <Card>
      <div className="flex flex-col gap-2 p-3">
        {CARE_STEPS.map((step) => {
          const open = openId === step.id
          const Icon = step.icon
          return (
            <ExpandRow
              key={step.id}
              icon={Icon}
              tone="success"
              dense={false}
              open={open}
              onToggle={() => setOpenId((cur) => (cur === step.id ? null : step.id))}
              title={step.title}
              sub={step.summary}
              trailing={
                <span className="flex shrink-0 flex-col items-end gap-1.5">
                  <Chip intent="success" icon={Check}>
                    Done
                  </Chip>
                  <TimeChip>{step.time}</TimeChip>
                </span>
              }
            >
              <div className="rounded-2xl bg-white/[0.6] px-4 py-3.5">
                <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">
                  What was done
                </div>
                <div className="mt-1 text-[12px] font-semibold leading-snug text-[#0B211B]/70">
                  {step.detail}
                </div>
              </div>
              <div className="mt-2.5 flex items-center gap-2 rounded-xl bg-emerald-500/[0.1] px-3 py-2.5">
                <Check className="h-3.5 w-3.5 shrink-0 text-emerald-700" strokeWidth={2.4} aria-hidden />
                <span className="min-w-0 text-[10.5px] font-bold text-emerald-800">
                  Sealed {step.time}, written to the immutable visit record
                </span>
              </div>
            </ExpandRow>
          )
        })}
      </div>
    </Card>
  )
}

interface CaregiverCardProps {
  elapsedSeconds: number
}

type RequestPhase = 'idle' | 'working' | 'done'

export function CaregiverCard({ elapsedSeconds }: CaregiverCardProps) {
  const { notify } = useDemo()
  const { name, first, initial, role, visitsWithFamily, rating } = LIVE_VISIT.caregiver
  const [requestPhase, setRequestPhase] = useState<RequestPhase>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const requestUpdate = () => {
    if (requestPhase !== 'idle') return
    setRequestPhase('working')
    timers.current.push(setTimeout(() => setRequestPhase('done'), 800))
    timers.current.push(
      setTimeout(
        () => notify({ title: 'Update requested', body: `${first} will reply in your secure chat within minutes`, kind: 'ok' }),
        900,
      ),
    )
  }

  return (
    <Card>
      <div className="p-5">
        <div className="flex items-center gap-3.5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-[14px] font-extrabold text-white shadow-[0_10px_22px_-10px_rgba(5,150,105,0.8)]">
            {initial}
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[14px] font-extrabold tracking-tight text-[#0B211B]">{name}</div>
            <div className="mt-0.5 truncate text-[11.5px] font-medium text-[#0B211B]/55">{role}</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-[#0B211B]/[0.04] px-3.5 py-2.5">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Visits with family</div>
            <div className="mt-1 text-[12.5px] font-extrabold leading-none tabular-nums text-[#0B211B]">
              {visitsWithFamily}
            </div>
          </div>
          <div className="rounded-2xl bg-[#0B211B]/[0.04] px-3.5 py-2.5">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Family rating</div>
            <div className="mt-1 text-[12.5px] font-extrabold leading-none tabular-nums text-[#0B211B]">{rating}</div>
          </div>
        </div>

        <DarkPanel className="mt-3" glow={false}>
          <div className="flex items-center justify-between gap-3">
            <span className="flex min-w-0 items-center gap-2">
              <LiveDot className="text-emerald-300" />
              <span className="truncate text-[12px] font-bold text-emerald-50/85">With {LIVE_VISIT.patientFirst} now</span>
            </span>
            <span className="shrink-0 text-[15px] font-extrabold leading-none tabular-nums text-emerald-200">
              {formatElapsed(elapsedSeconds)}
            </span>
          </div>
          <div className="mt-2.5 flex items-baseline justify-between gap-3">
            <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">On site since</span>
            <span className="text-right text-[12px] font-bold tabular-nums text-emerald-50/90">{LIVE_VISIT.startedAt}</span>
          </div>
        </DarkPanel>

        <div className="mt-4 flex gap-2.5">
          <ConnectButton
            icon={MessageSquare}
            label="Message"
            workingLabel="Opening chat…"
            doneLabel="Chat open"
            variant="soft"
            notifyTitle="Chat opened"
            notifyBody={`Secure chat with ${first} over Ayvaa`}
          />
          <ConnectButton
            icon={Phone}
            label="Call"
            workingLabel="Connecting…"
            doneLabel="On the line"
            variant="solid"
            notifyTitle={`Calling ${first}`}
            notifyBody="Secure Ayvaa line, number never shared"
          />
        </div>

        <QuietLifecycleButton
          phase={requestPhase}
          className="mt-2.5"
          idleIcon={Radio}
          idleLabel="Ask for a quick update"
          workingLabel="Sending request…"
          doneLabel="Update requested"
          doneTone="tint"
          onPress={requestUpdate}
        />
      </div>
    </Card>
  )
}

export function CaregiverNoteCard() {
  return (
    <Card>
      <div className="p-5">
        <QuotePanel
          kicker="Verbatim"
          kickerIcon={Quote}
          quote={VISIT_SUMMARY.note}
          author={`${VISIT_SUMMARY.caregiver}, caregiver`}
          authorInitial={initialsOf(VISIT_SUMMARY.caregiver)}
        />
      </div>
    </Card>
  )
}

interface CompletedCardProps {
  filters: VisitFilters
  onClearFilters: () => void
}

const EVIDENCE = [
  { label: 'Blood pressure', value: '126/78' },
  { label: 'Pulse', value: '72 bpm' },
  { label: 'Note', value: 'Walked the full loop, appetite improving' },
]

function CompletedRow({ visitId }: { visitId: string }) {
  const visit = completedVisits().find((v) => v.id === visitId)
  const { navigate } = useRouter()
  const [open, setOpen] = useState(false)
  if (!visit) return null

  return (
    <ExpandRow
      icon={Check}
      tone="success"
      dense={false}

      open={open}
      onToggle={() => setOpen((v) => !v)}
      title={
        <>
          {visit.day}, {visit.date}
        </>
      }
      sub={`${USUAL_CAREGIVER}, ${timeRange(visit)}`}
      trailing={
        <span className="flex shrink-0 items-center gap-1.5">
          <Chip intent="success" icon={Check}>
            Done
          </Chip>
        </span>
      }
    >
      <div className="rounded-2xl bg-white/[0.6] px-4 py-3.5">
        <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">
          Evidence from this visit
        </div>
        <div className="mt-3">
          <FactRows rows={EVIDENCE} tone="light" />
        </div>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {visit.vitals && <Chip intent="info">Vitals logged</Chip>}
        {visit.note && <Chip intent="neutral">Note added</Chip>}
        <Chip intent="success">GPS verified</Chip>
      </div>

      <button
        type="button"
        onClick={() => navigate('/patient/p17')}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500/[0.12] py-3 text-[12.5px] font-extrabold text-emerald-700 transition-colors hover:bg-emerald-500/[0.16]"
      >
        <ScrollText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        Open full visit summary
      </button>
    </ExpandRow>
  )
}

export function CompletedCard({ filters, onClearFilters }: CompletedCardProps) {
  const list = applyVisitFilters(completedVisits(), filters)

  if (list.length === 0) {
    return <EmptyTabState cause="filters" label="completed visits" onClearFilters={onClearFilters} />
  }

  return (
    <Card>
      <div className="flex flex-col gap-2.5 p-3">
        {list.map((v) => (
          <CompletedRow key={v.id} visitId={v.id} />
        ))}
      </div>
    </Card>
  )
}

interface ConnectButtonProps {
  icon: LucideIcon
  label: string
  workingLabel: string
  doneLabel: string
  variant?: 'soft' | 'solid'
  notifyTitle: string
  notifyBody: string
}

type Phase_ConnectButton = 'idle' | 'working' | 'done'

export function ConnectButton({
  icon: Icon,
  label,
  workingLabel,
  doneLabel,
  variant = 'soft',
  notifyTitle,
  notifyBody,
}: ConnectButtonProps) {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<Phase_ConnectButton>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const run = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(setTimeout(() => setPhase('done'), 900))
    timers.current.push(setTimeout(() => notify({ title: notifyTitle, body: notifyBody, kind: 'ok' }), 1000))
  }

  return (
    <motion.button
      type="button"
      whileTap={phase === 'idle' ? { scale: 0.985 } : undefined}
      onClick={run}
      disabled={phase !== 'idle'}
      aria-disabled={phase !== 'idle'}
      className={cn(
        'flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-[13px] font-bold transition-colors',
        variant === 'solid'
          ? phase === 'done'
            ? 'bg-emerald-600 text-white'
            : phase === 'working'
              ? 'cursor-wait bg-emerald-600/60 text-white'
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
          : phase === 'done'
            ? 'bg-emerald-500/[0.16] text-emerald-800'
            : phase === 'working'
              ? 'cursor-wait bg-emerald-500/[0.06] text-emerald-700/50'
              : 'bg-emerald-500/[0.12] text-emerald-700',
      )}
    >
      {phase === 'idle' && (
        <>
          <Icon className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          <span className="truncate">{label}</span>
        </>
      )}
      {phase === 'working' && (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          <span className="truncate">{workingLabel}</span>
        </>
      )}
      {phase === 'done' && (
        <>
          <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
          <span className="truncate">{doneLabel}</span>
        </>
      )}
    </motion.button>
  )
}

interface EmptyTabStateProps {
  cause: 'filters' | 'all-good'
  label: string
  onClearFilters: () => void
}

export function EmptyTabState({ cause, label, onClearFilters }: EmptyTabStateProps) {
  if (cause === 'all-good') {
    return (
      <EmptyState
        container="card"
        spacing="margin"
        padding="md"
        icon={CheckCircle2}
        tone="emerald"
        badge="square"
        size="sm"
        title="Nothing here, and that is good"
        titleClassName="text-[14px] font-extrabold tracking-tight text-[#0B211B]"
        body="No visits were ever missed on this plan. Every scheduled session has been delivered."
        bodyClassName="text-[12px] leading-snug text-[#0B211B]/55 mx-auto max-w-[28ch] text-pretty"
      />
    )
  }

  return (
    <EmptyState
      container="card"
      spacing="margin"
      padding="md"
      icon={SlidersHorizontal}
      tone="neutral"
      badge="square"
      size="sm"
      title={`Your filters hide every ${label}`}
      titleClassName="text-[14px] font-extrabold tracking-tight text-[#0B211B]"
      body="Visits are excluded by the active filters. Clear them to see the full ledger."
      bodyClassName="text-[12px] leading-snug text-[#0B211B]/55 mx-auto max-w-[28ch] text-pretty"
      action={{ label: 'Clear filters', onClick: onClearFilters }}
      actionStyle="full"
    />
  )
}

interface FilterSheetProps {
  initial: VisitFilters
  visibleCount: number
  onApply: (filters: VisitFilters) => void
  onClose: () => void
}

type Phase_FilterSheet = 'idle' | 'working' | 'done'

export function FilterSheet({ initial, visibleCount, onApply, onClose }: FilterSheetProps) {
  const [draft, setDraft] = useState<VisitFilters>(initial)
  const [phase, setPhase] = useState<Phase_FilterSheet>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const unchanged = draft.caregiverOnly === initial.caregiverOnly && draft.confirmedOnly === initial.confirmedOnly

  const toggle = (id: keyof VisitFilters) => {
    if (phase !== 'idle') return
    setDraft((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const apply = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(setTimeout(() => setPhase('done'), 550))
    timers.current.push(setTimeout(() => onApply(draft), 1200))
  }

  return (
    <SheetShell
      icon={Filter}
      title="Filter visits"
      subtitle="Toggles cut every tab as soon as you apply"
      tone={phase === 'done' ? 'success' : 'info'}
      onClose={onClose}
      footer={
        <motion.button
          type="button"
          whileTap={!unchanged && phase === 'idle' ? { scale: 0.985 } : undefined}
          onClick={apply}
          disabled={unchanged || phase !== 'idle'}
          aria-disabled={unchanged || phase !== 'idle'}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white transition-colors',
            phase === 'done'
              ? 'bg-emerald-600'
              : phase === 'working'
                ? 'cursor-wait bg-emerald-600/60'
                : unchanged
                  ? 'cursor-not-allowed bg-[#0B211B]/[0.08] text-[#0B211B]/40'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
          )}
        >
          {phase === 'idle' && (unchanged ? 'No changes to apply' : `Show ${visibleCount} visits`)}
          {phase === 'working' && (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Applying…
            </>
          )}
          {phase === 'done' && (
            <>
              <Check className="h-4 w-4" strokeWidth={2.6} aria-hidden />
              Filters applied
            </>
          )}
        </motion.button>
      }
    >
      <div className="flex flex-col gap-2 pb-2">
        {filterOptions.map((option) => {
          const on = draft[option.id]
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => toggle(option.id)}
              aria-pressed={on}
              className={cn(
                'flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors',
                on ? 'bg-emerald-500/[0.08]' : 'bg-[#0B211B]/[0.035]',
              )}
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">{option.label}</span>
                <span className="mt-0.5 block text-[10.5px] font-semibold leading-snug text-[#0B211B]/45">{option.sub}</span>
              </span>
              <span
                className={cn(
                  'relative h-6 w-10 shrink-0 rounded-full transition-colors duration-300',
                  on ? 'bg-emerald-500' : 'bg-[#0B211B]/[0.12]',
                )}
              >
                <motion.span
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 34 }}
                  className={cn(
                    'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-[0_2px_6px_rgba(11,33,27,0.25)]',
                    on ? 'left-[18px]' : 'left-0.5',
                  )}
                />
              </span>
            </button>
          )
        })}

        <div className="mt-1 rounded-2xl bg-[#0B211B]/[0.03] px-4 py-3">
          <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Always on</div>
          <div className="mt-1 text-[12px] font-bold leading-snug text-[#0B211B]/70">
            GPS verification runs on every visit with {USUAL_CAREGIVER} and cannot be turned off.
          </div>
        </div>
      </div>
    </SheetShell>
  )
}

interface LiveStepCardProps {
  step: VisitStep
  stepIndex: number
  stepsTotal: number
  lapsDone: number
}

export function LiveStepCard({ step, stepIndex, stepsTotal, lapsDone }: LiveStepCardProps) {
  const Icon = step.icon
  const isWalk = step.id === 'walk'
  const lapsVisible = isWalk && step.state === 'active'
  const startPct = 100 / WALK_LAPS_TOTAL / 2
  const endPct = (100 / WALK_LAPS_TOTAL) * (Math.min(lapsDone, WALK_LAPS_TOTAL - 1) + 0.5)

  return (
    <Card>
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Happening now</span>
          <Chip intent="live" dot>
            Step {stepIndex} of {stepsTotal}
          </Chip>
        </div>
        <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
          No action needed. The log updates itself.
        </p>

        <div className="mt-4 rounded-2xl bg-[#0B231C] p-4">
          <div className="flex items-center gap-3">
            <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-400/[0.2] text-emerald-100">
              <span aria-hidden className="absolute inset-0 animate-ping rounded-xl bg-emerald-400/20" />
              <Icon className="relative h-4 w-4" strokeWidth={2.4} aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[14px] font-extrabold tracking-tight text-white">{step.title}</div>
              <div className="mt-0.5 text-[11px] font-medium leading-snug text-emerald-100/60">{step.summary}</div>
            </div>
          </div>

          {lapsVisible && (
            <div className="mt-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-100/40">Lap progress</span>
                <span className="text-[10px] font-extrabold tabular-nums text-emerald-200">
                  Lap {Math.min(lapsDone + 1, WALK_LAPS_TOTAL)} of {WALK_LAPS_TOTAL}
                </span>
              </div>
              <div className="relative mt-2">
                <div
                  aria-hidden
                  className="absolute top-[7px] h-0.5 rounded-full bg-white/[0.12]"
                  style={{ left: `${startPct}%`, right: `${startPct}%` }}
                />
                <div
                  aria-hidden
                  className="absolute top-[7px] h-0.5 rounded-full bg-emerald-300"
                  style={{ left: `${startPct}%`, width: `${endPct - startPct}%` }}
                />
                <div className="relative grid" style={{ gridTemplateColumns: `repeat(${WALK_LAPS_TOTAL}, 1fr)` }}>
                  {Array.from({ length: WALK_LAPS_TOTAL }, (_, i) => {
                    const done = i < lapsDone
                    const current = i === lapsDone
                    return (
                      <div key={i} className="flex flex-col items-center">
                        {done ? (
                          <span className="mt-[3px] h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        ) : current ? (
                          <span className="relative grid h-4 w-4 place-items-center">
                            <span aria-hidden className="absolute h-4 w-4 animate-ping rounded-full bg-emerald-300/50" />
                            <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-300" />
                          </span>
                        ) : (
                          <span className="mt-[3px] h-2.5 w-2.5 rounded-full bg-white/25" />
                        )}
                        <span
                          className={cn(
                            'mt-1.5 text-[9px] font-extrabold tabular-nums',
                            current ? 'text-white' : done ? 'text-emerald-100/75' : 'text-emerald-100/40',
                          )}
                        >
                          {i + 1}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          <div className="mt-3 flex flex-col gap-2 border-t border-white/[0.08] pt-3">
            <div className="flex items-baseline justify-between gap-3">
              <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Started at</span>
              <span className="text-right text-[12px] font-bold tabular-nums text-emerald-50/90">{ACTIVE_STEP_META.startedAt}</span>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Care goal</span>
              <span className="text-right text-[12px] font-bold text-emerald-50/90">{ACTIVE_STEP_META.goalLabel}</span>
            </div>
          </div>
        </div>

        <motion.div
          key={step.id}
          aria-hidden
          className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-500/[0.1] px-3.5 py-2.5"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="min-w-0 text-[10px] font-bold text-emerald-800">
            Updating live as the caregiver logs each step
          </span>
        </motion.div>
      </div>
    </Card>
  )
}

export function LiveVisitCard() {
  const { navigate } = useRouter()
  if (!LIVE_VISIT_Visits) return null

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.985 }}
      onClick={() => navigate('/patient/p16')}
      className="block w-full text-left"
      aria-label="Live visit in progress, open tracking"
    >
      <AccentHero tone="emerald">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
            <Radio className="h-3 w-3" aria-hidden />
            Happening today
          </span>
          <StatusPill tone="emerald" label="In progress" live />
        </div>

        <div className="mt-4 flex items-center gap-3.5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-400/[0.16] text-[14px] font-black text-emerald-100">
            {LIVE_VISIT_Visits.caregiver?.[0] ?? 'N'}
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-extrabold tracking-tight text-white">
              {LIVE_VISIT_Visits.caregiver} arrived at {LIVE_VISIT_Visits.arrivedAt}
            </div>
            <div className="mt-0.5 text-[11.5px] font-semibold leading-snug text-emerald-100/60">
              {LIVE_VISIT_Visits.locationNote}, {LIVE_VISIT_Visits.minutes} minutes in
            </div>
          </div>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-400/[0.14]">
            <ChevronRight className="h-4 w-4 text-emerald-200" strokeWidth={2.4} aria-hidden />
          </span>
        </div>
      </AccentHero>
    </motion.button>
  )
}

interface LiveVisitHeroProps {
  patientFirst: string
  startedAt: string
  signOffEta: string
  elapsedSeconds: number
  windowMinutes: number
  notifyAtSignOff: boolean
  onToggleNotify: () => void
}

export function LiveVisitHero({
  patientFirst,
  startedAt,
  signOffEta,
  elapsedSeconds,
  windowMinutes,
  notifyAtSignOff,
  onToggleNotify,
}: LiveVisitHeroProps) {
  const ratio = Math.min(1, elapsedSeconds / (windowMinutes * 60))

  return (
    <AccentHero tone="emerald">
      <HeroTopRow
        label="Visit in progress"
        trailing={<StatusPill tone="emerald" label="Live" live />}
      />

      <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Care underway with <HeroHighlight>{patientFirst}</HeroHighlight>
      </h2>
      <p className="mt-1.5 text-pretty text-[11.5px] font-semibold leading-snug text-emerald-100/70">
        Logged step by step and sealed as it happens.
      </p>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/45">
          <span>Visit window</span>
          <span className="tabular-nums text-emerald-200">
            {formatElapsed(elapsedSeconds)} of {windowMinutes} min
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 transition-[width] duration-1000"
            style={{ width: `${ratio * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <StatCell label="Checked in" value={startedAt} />
        <StatCell label="Sign-off" value={signOffEta} />
      </div>

      <button
        type="button"
        onClick={onToggleNotify}
        aria-pressed={notifyAtSignOff}
        className={cn(
          'mt-2 flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition-colors',
          notifyAtSignOff ? 'bg-emerald-400/[0.16]' : 'bg-white/[0.06] hover:bg-white/[0.1]',
        )}
      >
        <span
          className={cn(
            'grid h-8 w-8 shrink-0 place-items-center rounded-xl',
            notifyAtSignOff ? 'bg-emerald-400/[0.2] text-emerald-100' : 'bg-white/[0.08] text-white/60',
          )}
        >
          <BellRing className="h-4 w-4" strokeWidth={2.4} aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[12.5px] font-bold tracking-tight text-white">Ping me at sign-off</span>
          <span className="block text-[10.5px] font-semibold text-emerald-100/55">
            {notifyAtSignOff ? 'A push arrives the moment the visit closes' : 'Tap to get one push when the visit closes'}
          </span>
        </span>
        <span
          className={cn(
            'relative h-6 w-10 shrink-0 rounded-full transition-colors duration-300',
            notifyAtSignOff ? 'bg-emerald-400' : 'bg-white/[0.15]',
          )}
        >
          <motion.span
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 34 }}
            className={cn(
              'absolute top-0.5 h-5 w-5 rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.3)]',
              notifyAtSignOff ? 'left-[18px] bg-[#062419]' : 'left-0.5 bg-white',
            )}
          />
        </span>
      </button>
    </AccentHero>
  )
}

export function MissedCard() {
  const list = missedVisits()
  const visit = list[0]

  return (
    <Card intent="danger">
      <div className="p-5">
        <div className="flex items-start gap-3.5">
          <Tile icon={X} tone="danger" size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">
                {visit?.day}, {visit?.date}
              </span>
              <Chip intent="danger">Missed</Chip>
            </div>
            <p className="mt-1 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/60">{visit?.reason}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-emerald-500/[0.08] px-4 py-3">
          <Tile icon={Undo2} tone="success" size="sm" />
          <div className="min-w-0 flex-1">
            <div className="text-[12.5px] font-bold tracking-tight text-emerald-800">Refund processed automatically</div>
            <div className="mt-0.5 text-[10.5px] font-semibold leading-snug text-emerald-700/60">
              Missed visits are never charged, returned to your card
            </div>
          </div>
          <span className="shrink-0 text-[13px] font-extrabold tabular-nums text-emerald-700">{visit?.refund}</span>
        </div>
      </div>
    </Card>
  )
}

export function PaymentCard({ onPress }: { onPress: () => void }) {
  return (
    <Card>
      <Row
        icon={ReceiptText}
        tone="success"
        tileSize="lg"
        title="Visit charge, captured"
        titleClassName="text-[13px] font-bold"
        subtitle={paymentMethodLabel()}
        subtitleClassName="truncate text-[11px] font-semibold text-[#0B211B]/45"
        trailing={
          <span className="flex shrink-0 flex-col items-end gap-1">
            <span className="text-[13px] font-extrabold tabular-nums tracking-tight text-[#0B211B]">{payment.total}</span>
            <Chip intent="success">Paid</Chip>
          </span>
        }
        className="p-4"
        hoverClassName="hover:bg-[#0B211B]/[0.02]"
        onClick={onPress}
        whileTapDisabled
      />
    </Card>
  )
}

type Phase_PaymentSheet = 'idle' | 'working' | 'done'

export function PaymentSheet({ onClose }: { onClose: () => void }) {
  const { notify } = useDemo()
  const [reason, setReason] = useState('')
  const [phase, setPhase] = useState<Phase_PaymentSheet>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const dirty = reason.trim().length > 0

  const submit = () => {
    if (phase !== 'idle' || !dirty) return
    setPhase('working')
    timers.current.push(setTimeout(() => setPhase('done'), 700))
    timers.current.push(
      setTimeout(() => notify({ title: 'Dispute filed', body: 'Our billing team will review it within 2 days', kind: 'ok' }), 1200),
    )
  }

  return (
    <SheetShell
      icon={ReceiptText}
      title="Payment breakdown"
      subtitle={`Visit charge on ${paymentMethodLabel()}`}
      tone={phase === 'done' ? 'success' : 'info'}
      onClose={onClose}
      footer={
        <motion.button
          type="button"
          whileTap={phase === 'idle' && dirty ? { scale: 0.985 } : undefined}
          onClick={submit}
          disabled={phase !== 'idle' || !dirty}
          aria-disabled={phase !== 'idle' || !dirty}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white transition-colors',
            phase === 'done'
              ? 'bg-emerald-600'
              : phase === 'working'
                ? 'cursor-wait bg-emerald-600/60'
                : dirty
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
                  : 'cursor-not-allowed bg-[#0B211B]/[0.08] text-[#0B211B]/40',
          )}
        >
          {phase === 'idle' && (dirty ? 'Submit dispute' : 'Write a reason first')}
          {phase === 'working' && (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Submitting…
            </>
          )}
          {phase === 'done' && (
            <>
              <Check className="h-4 w-4" strokeWidth={2.6} aria-hidden />
              Dispute filed
            </>
          )}
        </motion.button>
      }
    >
      <div className="flex flex-col gap-3 pb-2">
        <div className="relative overflow-hidden rounded-2xl bg-[#0B231C] p-4">
          <div aria-hidden className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="relative">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">Breakdown</div>
            <div className="mt-3.5">
              <FactRows rows={paymentBreakdown()} />
            </div>
            <p className="mt-3 text-[10px] font-bold text-emerald-100/45">
              Captured only after this visit was verified and sealed.
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-[#0B211B]/[0.03] px-4 py-3.5">
          <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Dispute this charge</div>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Tell us what looks wrong…"
            rows={3}
            className="mt-2 w-full resize-none rounded-xl border border-[#0B211B]/[0.08] bg-white px-3.5 py-3 text-[12.5px] font-semibold leading-snug text-[#0B211B] placeholder:text-[#0B211B]/35 focus:border-emerald-500/40 focus:outline-none"
          />
          <div className="mt-1.5 text-[10px] font-semibold text-[#0B211B]/40">
            {dirty ? 'Our billing team reviews every dispute within 2 days.' : 'A reason is required before filing.'}
          </div>
        </div>
      </div>
    </SheetShell>
  )
}

export function PlanCard() {
  const { navigate } = useRouter()

  return (
    <motion.button type="button" whileTap={{ scale: 0.99 }} onClick={() => navigate('/patient/p13')} className="block w-full text-left">
      <Card>
        <Row
          icon={ClipboardList}
          tone="info"
          tileSize="lg"
          title="Today's plan"
          titleClassName="text-[14px] font-extrabold"
          subtitle={`${VISIT_STEPS.length} steps from the elderly care plan`}
          subtitleClassName="text-[11.5px] font-medium leading-snug text-[#0B211B]/55"
          className="gap-3.5 p-4"
          hoverClassName="hover:bg-transparent"
          whileTapDisabled
        />
      </Card>
    </motion.button>
  )
}

function TimeCell({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.06] px-3.5 py-3">
      <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">{label}</div>
      <div className="mt-1 text-[15px] font-extrabold leading-none tabular-nums text-white">{value}</div>
      <div className="mt-1.5 text-[9.5px] font-semibold leading-snug text-emerald-100/50">{sub}</div>
    </div>
  )
}

export function SessionLedgerCard() {
  const [checkIn, checkOut, onSite] = SESSION_LEDGER
  const [hours, minutes] = onSite.value.replace('h ', ':').replace('m', '').trim().split(':')

  return (
    <AccentHero tone="emerald">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
          <MapPin className="h-3 w-3" aria-hidden />
          Session record
        </span>
        <StatusPill tone="emerald" label="GPS sealed" />
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="relative grid h-[76px] w-[76px] shrink-0 place-items-center rounded-full bg-emerald-400/[0.12]">
          <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-emerald-400/15" />
          <div className="relative text-center">
            <div className="text-[20px] font-extrabold leading-none tabular-nums tracking-tight text-white">{hours}</div>
            <div className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.18em] text-emerald-100/45">hrs</div>
          </div>
          <span aria-hidden className="absolute -right-1 top-1/2 -translate-y-1/2 text-[11px] font-extrabold text-emerald-200/70">
            :
          </span>
          <span aria-hidden className="absolute -left-1 top-1/2 -translate-y-1/2 text-[11px] font-extrabold text-emerald-200/70">
            :
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">Minutes on site</div>
            <div className="mt-0.5 text-[15px] font-extrabold leading-none tabular-nums text-white">{minutes}</div>
          </div>
          <div className="mt-3">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">Alert-free stretch</div>
            <div className="mt-0.5 text-[15px] font-extrabold leading-none tabular-nums text-white">Entire visit</div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <TimeCell label={checkIn.label} value={checkIn.value} sub={checkIn.sub} />
        <TimeCell label={checkOut.label} value={checkOut.value} sub={checkOut.sub} />
      </div>

      <div className="mt-2 flex items-center gap-2.5 rounded-2xl bg-white/[0.06] px-3.5 py-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-400/[0.16]">
          <Footprints className="h-4 w-4 text-emerald-200" strokeWidth={2.4} aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[12px] font-bold tracking-tight text-white">One continuous presence</span>
          <span className="block text-[10.5px] font-semibold text-emerald-100/55">
            No checkout in between, no gap to explain
          </span>
        </span>
      </div>
    </AccentHero>
  )
}

export function ShareSummaryButton() {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<'idle' | 'working' | 'done'>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const share = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(setTimeout(() => setPhase('done'), 700))
    timers.current.push(
      setTimeout(() => {
        void navigator.clipboard?.writeText(summaryShareText())
        notify({ title: 'Summary copied', body: 'Visit record copied to clipboard', kind: 'ok' })
      }, 1200),
    )
    timers.current.push(setTimeout(() => setPhase('idle'), 2600))
  }

  return (
    <IconLifecycleButton
      phase={phase}
      icon={Share2}
      revert
      ariaLabel="Share visit summary"
      onPress={share}
    />
  )
}

interface StepRowProps {
  step: VisitStep
  open?: boolean
  onToggle?: () => void
}

export function StepRow({ step, open = false, onToggle }: StepRowProps) {
  const Icon = step.icon

  if (step.state === 'todo') {
    return (
      <Row
        leading={
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#0B211B]/[0.07] text-[#0B211B]/50">
            <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
          </span>
        }
        title={step.title}
        titleClassName="text-[13px] text-[#0B211B]/70"
        subtitle={step.summary}
        subtitleClassName="text-[11px] text-[#0B211B]/45"
        chip={{ label: 'Upcoming', intent: 'neutral' }}
        surface="inset"
        padding="even"
      />
    )
  }

  return (
    <ExpandRow
      icon={Icon}
      tone="success"
      open={open}
      onToggle={onToggle}
      title={step.title}
      sub={step.summary}
      trailing={
        <span className="flex shrink-0 flex-col items-end gap-1.5">
          <Chip intent="success" icon={BadgeCheck}>
            Sealed
          </Chip>
          <TimeChip>{step.time}</TimeChip>
        </span>
      }
    >
      <div className="rounded-2xl bg-white/[0.6] px-4 py-3.5">
        <FactRows rows={step.readings ?? []} tone="light" />
      </div>

      <div className="mt-2.5 flex items-center gap-2 rounded-xl bg-emerald-500/[0.1] px-3 py-2.5">
        <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-emerald-700" strokeWidth={2.4} aria-hidden />
        <span className="min-w-0 text-[10.5px] font-bold text-emerald-800">
          Sealed {step.time}, written to the immutable visit record
        </span>
      </div>
    </ExpandRow>
  )
}

interface StepTimelineProps {
  steps: VisitStep[]
}

export function StepTimeline({ steps }: StepTimelineProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const done = sealedStepsOf(steps)
  const upcoming = todoStepsOf(steps)

  return (
    <Card intent="success">
      <div aria-hidden className="h-1 w-full bg-gradient-to-r from-emerald-400 to-teal-400" />
      <div className="p-5">
        <div className="flex items-start gap-3.5">
          <Tile icon={ListChecks} tone="success" size="lg" />
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Visit log</span>
              <Chip intent="success">
                {done.length} of {VISIT_STEPS.length} sealed
              </Chip>
            </div>
            <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              Sealed steps open their readings and audit detail on tap.
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-700">Sealed and verified</span>
          <span className="text-[10px] font-extrabold tabular-nums text-emerald-700">{done.length}</span>
        </div>

        <div className="mt-2 flex flex-col gap-2">
          {done.map((step) => (
            <StepRow
              key={step.id}
              step={step}
              open={openId === step.id}
              onToggle={() => setOpenId((cur) => (cur === step.id ? null : step.id))}
            />
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#0B211B]/45">Coming up</span>
          <span className="text-[10px] font-extrabold tabular-nums text-[#0B211B]/45">{upcoming.length}</span>
        </div>

        <div className="mt-2 flex flex-col gap-2">
          {upcoming.map((step) => (
            <StepRow key={step.id} step={step} />
          ))}
        </div>
      </div>
    </Card>
  )
}

type Phase_SummaryHero = 'idle' | 'working' | 'done'

export function SummaryHero() {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<Phase_SummaryHero>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const acknowledge = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(setTimeout(() => setPhase('done'), 850))
    timers.current.push(
      setTimeout(() => notify({ title: 'Summary reviewed', body: 'Your review is logged to the audit trail', kind: 'ok' }), 950),
    )
  }

  return (
    <AccentHero tone="emerald">
      <HeroTopRow
        icon={Lock}
        label="Sealed summary"
        trailing={
          phase === 'done' ? (
            <StatusPill tone="emerald" label="Reviewed" />
          ) : (
            <StatusPill tone="emerald" label="Verified" />
          )
        }
      />

      <h2 className="mt-1.5 text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Visit sealed, <HeroHighlight>end to end</HeroHighlight>
      </h2>
      <p className="mt-1.5 text-pretty text-[11.5px] font-semibold leading-snug text-emerald-100/70">
        {phase === 'done'
          ? 'Your confirmation is recorded against this sealed record.'
          : 'Every reading and step below belongs to this one sealed record.'}
      </p>

      <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-400/[0.16] text-[13px] font-extrabold text-emerald-100">
          {initialsOf(VISIT_SUMMARY.caregiver)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-extrabold tracking-tight text-white">
            {VISIT_SUMMARY.caregiver}
          </span>
          <span className="mt-0.5 block text-[10.5px] font-semibold text-emerald-100/55">
            Signed the record at {VISIT_SUMMARY.signedAt}
          </span>
        </span>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <StatCell label="Steps completed" value={VISIT_SUMMARY.stepsDone} />
        <StatCell label="Goals met" value={VISIT_SUMMARY.goalsMet} />
      </div>

      <div className="mt-2 flex items-baseline justify-between gap-3 rounded-2xl bg-white/[0.04] px-3.5 py-2.5">
        <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">Duration</span>
        <span className="text-[12.5px] font-extrabold tabular-nums leading-none text-white">{VISIT_SUMMARY.duration}</span>
      </div>

      <AnimatePresence initial={false}>
        {phase === 'done' && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-3 flex items-center gap-2.5 rounded-xl bg-emerald-500/[0.12] px-3.5 py-3"
          >
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400 text-[#04241A]">
              <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
            </span>
            <span className="text-[11.5px] font-bold text-emerald-100">Review logged to your audit trail</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        whileTap={phase === 'idle' ? { scale: 0.985 } : undefined}
        onClick={acknowledge}
        disabled={phase !== 'idle'}
        aria-disabled={phase !== 'idle'}
        className={cn(
          'mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-[12.5px] font-extrabold transition-colors',
          phase === 'done'
            ? 'bg-emerald-600 text-white'
            : phase === 'working'
              ? 'cursor-wait bg-white/[0.06] text-emerald-50/60'
              : 'bg-white/[0.08] text-emerald-50 hover:bg-white/[0.12]',
        )}
      >
        {phase === 'idle' && 'Mark as reviewed'}
        {phase === 'working' && (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Recording…
          </>
        )}
        {phase === 'done' && (
          <>
            <Check className="h-4 w-4" strokeWidth={2.6} aria-hidden />
            Reviewed
          </>
        )}
      </motion.button>
    </AccentHero>
  )
}

export function UpcomingCard({ filters, onClearFilters }: { filters: VisitFilters; onClearFilters: () => void }) {
  const { navigate } = useRouter()
  const list = applyVisitFilters(upcomingVisits(), filters)

  if (list.length === 0) {
    return <EmptyTabState cause="filters" label="upcoming visits" onClearFilters={onClearFilters} />
  }

  return (
    <Card>
      <div className="flex flex-col gap-2 p-3">
        {list.map((v) => {
          const pending = v.status === 'pending'
          return (
            <Row
              key={v.id}
              icon={CalendarDays}
              tone={pending ? 'warning' : 'success'}
              title={`${v.day}, ${v.date}`}
              subtitle={upcomingSubtitle(v)}
              subtitleClassName="text-[11px] font-semibold leading-snug text-[#0B211B]/45"
              chip={{ label: pending ? 'Pending' : 'Confirmed', intent: pending ? 'warning' : 'success', dot: pending }}
              surface="inset"
              surfaceTone="rounded-2xl bg-[#0B211B]/[0.03]"
              wrapSurface
              className="p-3.5"
              hoverClassName="hover:bg-[#0B211B]/[0.05]"
              onClick={() => navigate(v.status === 'live' ? '/patient/p16' : '/patient/p17')}
            />
          )
        })}
      </div>
    </Card>
  )
}

interface VisitSoFarSheetProps {
  elapsedSeconds: number
  ledger: LedgerRow[]
  onClose: () => void
  onOpenLog: () => void
}

export function VisitSoFarSheet({ elapsedSeconds, ledger, onClose, onOpenLog }: VisitSoFarSheetProps) {
  return (
    <SheetShell
      icon={Clock}
      tone="success"
      title="Visit so far"
      subtitle={`Started ${LIVE_VISIT.startedAt} with ${LIVE_VISIT.caregiver.first}`}
      onClose={onClose}
      footer={
        <div>
          <button
            type="button"
            onClick={onOpenLog}
            className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
          >
            Open full visit log
          </button>
          <p className="mt-2 text-center text-[10px] font-bold text-[#0B211B]/45">
            Rows seal themselves the moment each step completes
          </p>
        </div>
      }
    >
      <div className="rounded-2xl bg-[#0B231C] p-4">
        <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Session ledger</div>
        <div className="mt-3 flex flex-col gap-2.5">
          {ledger.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-3">
              <span className="flex shrink-0 items-center gap-2">
                <span
                  aria-hidden
                  className={cn(
                    'h-1.5 w-1.5 shrink-0 rounded-full',
                    row.state === 'done'
                      ? 'bg-emerald-300'
                      : row.state === 'active'
                        ? 'animate-pulse bg-emerald-300'
                        : 'bg-white/25',
                  )}
                />
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/50">{row.label}</span>
              </span>
              <span
                className={cn(
                  'text-right text-[12px] font-bold tabular-nums',
                  row.state === 'done'
                    ? 'text-emerald-50/90'
                    : row.state === 'active'
                      ? 'text-emerald-300'
                      : 'text-emerald-100/45',
                )}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-[#0B211B]/[0.03] px-4 py-3.5">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-baseline justify-between gap-3">
            <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">On site for</span>
            <span className="text-right text-[12px] font-bold tabular-nums text-[#0B211B]/80">
              {formatElapsed(elapsedSeconds)}
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Caregiver</span>
            <span className="text-right text-[12px] font-bold text-[#0B211B]/80">{LIVE_VISIT.caregiver.name}</span>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Care category</span>
            <span className="text-right text-[12px] font-bold text-[#0B211B]/80">{LIVE_VISIT.category}</span>
          </div>
        </div>
      </div>
    </SheetShell>
  )
}

export function VisitsHero() {
  const upcoming = upcomingVisits()
  const missed = missedVisits()
  const confirmed = confirmedCount(upcoming)

  return (
    <AccentHero tone="emerald">
      <HeroTopRow
        icon={ShieldCheck}
        label="This week"
        trailing={<StatusPill tone="emerald" label="GPS verified" />}
      />

      <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        {upcoming.length} visits ahead, <HeroHighlight>{confirmed} confirmed</HeroHighlight>
      </h2>
      <p className="mt-1.5 text-pretty text-[11.5px] font-semibold leading-snug text-emerald-100/70">
        Weekly plan with {USUAL_CAREGIVER}, Monday to Friday.
      </p>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/45">
          <span>Week confirmation</span>
          <span className="tabular-nums text-emerald-200">
            {confirmed} of {upcoming.length}
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 transition-[width] duration-700"
            style={{ width: `${(confirmed / Math.max(1, upcoming.length)) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <StatCell label="GPS verified" value="Every visit" />
        <StatCell label="Made right" value={missed.length > 0 ? `${missed.length} refunded` : 'Nothing owed'} />
      </div>
    </AccentHero>
  )
}

interface VitalsCardProps {
  onSelect: (reading: VitalReading) => void
}

function ReadingRow({ reading, onPress }: { reading: VitalReading; onPress: () => void }) {
  return (
    <Row
      icon={reading.icon}
      tone={vitalIntent(reading.trend) === 'success' ? 'success' : 'neutral'}
      label={reading.label}
      labelClassName="font-bold tracking-[0.14em]"
      title={reading.value}
      titleClassName="text-[14px] font-extrabold tabular-nums tracking-tight"
      chip={{ label: reading.shortTrend, intent: vitalIntent(reading.trend) }}
      surface="inset"
      padding="even"
      className="p-4"
      hoverClassName="hover:bg-[#0B211B]/[0.05]"
      showChevron={false}
      trailing={<ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />}
      onClick={onPress}
    />
  )
}

export function VitalsCard({ onSelect }: VitalsCardProps) {
  return (
    <Card>
      <div className="flex flex-col gap-2 p-3">
        {VITAL_READINGS.map((r) => (
          <ReadingRow key={r.id} reading={r} onPress={() => onSelect(r)} />
        ))}
      </div>
    </Card>
  )
}

type Phase_VitalsSheet = 'idle' | 'working' | 'done'

export function VitalsSheet({ reading, onClose }: { reading: VitalReading; onClose: () => void }) {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<Phase_VitalsSheet>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const share = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(setTimeout(() => setPhase('done'), 700))
    timers.current.push(
      setTimeout(() => notify({ title: 'Shared with doctor', body: `${reading.label} reading sent to Dr. Mehta`, kind: 'ok' }), 1200),
    )
  }

  return (
    <SheetShell
      icon={reading.icon}
      title={reading.label}
      subtitle={`Recorded ${reading.recordedAt}, compared with last visit`}
      tone={phase === 'done' ? 'success' : 'info'}
      onClose={onClose}
      footer={
        <motion.button
          type="button"
          whileTap={phase === 'idle' ? { scale: 0.985 } : undefined}
          onClick={share}
          disabled={phase !== 'idle'}
          aria-disabled={phase !== 'idle'}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white transition-colors',
            phase === 'done'
              ? 'bg-emerald-600'
              : phase === 'working'
                ? 'cursor-wait bg-emerald-600/60'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
          )}
        >
          {phase === 'idle' && 'Share with doctor'}
          {phase === 'working' && (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Sharing…
            </>
          )}
          {phase === 'done' && (
            <>
              <Check className="h-4 w-4" strokeWidth={2.6} aria-hidden />
              Shared
            </>
          )}
        </motion.button>
      }
    >
      <div className="flex flex-col gap-3 pb-2">
        <div className="relative overflow-hidden rounded-2xl bg-[#0B231C] p-4">
          <div aria-hidden className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="relative">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">Reading</div>
            <div className="mt-1 text-[20px] font-extrabold leading-none tabular-nums tracking-tight text-white">
              {reading.value}
            </div>
            <div className="mt-1.5 text-[11px] font-bold text-emerald-300">{reading.trendLabel}</div>
            <div className="mt-3.5">
              <FactRows
                rows={[
                  { label: 'Last visit', value: reading.prev },
                  { label: 'Recorded', value: reading.recordedAt },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[#0B211B]/[0.03] px-4 py-4">
          <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Against last visit</div>
          <div className="mt-3 flex flex-col gap-3">
            {reading.compare.map((bar, i) => (
              <div key={bar.label}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[10px] font-bold text-[#0B211B]/55">{bar.label}</span>
                  <span
                    className={cn(
                      'text-[12px] font-extrabold tabular-nums',
                      i === reading.compare.length - 1 ? 'text-emerald-700' : 'text-[#0B211B]/70',
                    )}
                  >
                    {bar.value}
                  </span>
                </div>
                <div aria-hidden className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#0B211B]/[0.06]">
                  <motion.div
                    className={cn('h-full origin-left rounded-full', i === reading.compare.length - 1 ? 'bg-emerald-500' : 'bg-[#0B211B]/25')}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: bar.pct / 100 }}
                    transition={{ duration: 0.45, delay: i * 0.1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-[#0B211B]/[0.03] px-4 py-3.5">
          <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">What it means</div>
          <div className="mt-1 text-[12px] font-semibold leading-snug text-[#0B211B]/70">{reading.meaning}</div>
        </div>

        <div className="rounded-2xl bg-[#0B211B]/[0.03] px-4 py-3.5">
          <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">How it was taken</div>
          <div className="mt-1 text-[12px] font-semibold leading-snug text-[#0B211B]/70">{reading.detail}</div>
          <div className="mt-2.5 flex items-center gap-2 rounded-xl bg-emerald-500/[0.1] px-3 py-2.5">
            <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-emerald-700" strokeWidth={2.4} aria-hidden />
            <span className="min-w-0 text-[10.5px] font-bold text-emerald-800">
              Sealed {reading.recordedAt} to the immutable visit record
            </span>
          </div>
        </div>
      </div>
    </SheetShell>
  )
}