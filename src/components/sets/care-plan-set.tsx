import { Activity, CalendarCheck, CalendarClock, CalendarOff, Check, ChevronDown, ChevronRight, HeartPulse, Loader2, MapPin, Quote, Salad, ScrollText, ShieldCheck, ShieldOff, SlidersHorizontal, UserRoundCheck } from 'lucide-react'
import { SheetShell } from '@/components/base/phone/sheet-shell'
import { DarkPanel } from '@/components/base/phone/dark-panel'
import { FactRows } from '@/components/base/phone/fact-rows'
import { CAREGIVER, CONSENT_CYCLE, GOALS, GOALS_LOGGED, METRICS, PLAN, VITALS, WEEK, axisLabels, completedVisits, consentScopeRows, consentSteps, dayDetailLine, formatValue, goalSummary, maxVisitMinutes, planLinks, type Goal, type GoalSession, type MetricId, type VisitDay, visitFacts } from '@/data/patientCarePlan'
import { useRouter } from '@/lib/router'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { AccentHero } from '@/components/base/phone/accent-hero'
import { Row } from '@/components/base/phone/row'
import { StatusPill } from '@/components/base/phone/status-pill'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'
import { Card, Chip, Meter, Tile } from '@/components/base/phone/kit'
import { QuotePanel } from '@/components/base/phone/quote-panel'
import { HeroHighlight, HeroTopRow, StatCell } from '@/components/base/phone/hero-cells'

interface CaregiverSheetProps {
  onClose: () => void
}

export function CaregiverSheet({ onClose }: CaregiverSheetProps) {
  const { navigate } = useRouter()

  const facts = [
    { label: 'Visits with this plan', value: String(CAREGIVER.visitsWithPlan) },
    { label: 'Goals logged', value: CAREGIVER.goalsLogged },
    { label: 'On-time arrivals', value: CAREGIVER.onTime },
    { label: 'Next visit', value: CAREGIVER.nextVisit },
  ]

  return (
    <SheetShell
      icon={UserRoundCheck}
      title={CAREGIVER.name}
      subtitle={`Assigned caregiver, with this plan since week ${CAREGIVER.sinceWeek}`}
      tone="info"
      onClose={onClose}
      footer={
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => {
              onClose()
              navigate('/patient/p11')
            }}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-sky-600 py-3.5 text-[13px] font-bold text-white"
          >
            <UserRoundCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Full profile</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onClose()
              navigate('/patient/p17')
            }}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
          >
            Last summary
          </button>
        </div>
      }
    >
      <DarkPanel>
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-[15px] font-extrabold text-white">
            {CAREGIVER.firstName[0]}
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[14px] font-extrabold tracking-tight text-white">{CAREGIVER.name}</div>
            <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-100/50">
              {CAREGIVER.role}, licence verified
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-white/[0.1] px-2.5 py-1 text-[10px] font-extrabold tabular-nums text-emerald-100">
            {CAREGIVER.rating}
          </span>
        </div>
      </DarkPanel>

      <div className="mt-3 rounded-2xl bg-[#0B211B]/[0.03] p-4">
        <FactRows rows={facts} tone="light" />
      </div>
    </SheetShell>
  )
}

function DarkCycleStepper({ steps }: { steps: { label: string; sub: string; done: boolean }[] }) {
  const n = steps.length
  const doneCount = steps.filter((s) => s.done).length
  const startPct = 100 / n / 2
  const endPct = doneCount > 0 ? (100 / n) * (doneCount - 0.5) : startPct

  return (
    <div className="relative">
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
      <div className="relative grid" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
        {steps.map((step) => (
          <div key={step.label} className="flex flex-col items-center">
            {step.done ? (
              <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-400 text-[#04241A]">
                <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" aria-hidden>
                  <path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            ) : (
              <span className="relative grid h-4 w-4 place-items-center">
                <span aria-hidden className="absolute h-4 w-4 animate-ping rounded-full bg-rose-300/50" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-rose-200" />
              </span>
            )}
            <span className="mt-1.5 text-center text-[9px] font-extrabold uppercase tracking-[0.12em] text-white/70">
              {step.label}
            </span>
            <span className="text-center text-[9px] font-bold text-white/35">{step.sub}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ConsentCycleCard() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [scopeOpen, setScopeOpen] = useState(false)
  const [phase, setPhase] = useState<'idle' | 'working' | 'done'>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const acknowledge = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(setTimeout(() => setPhase('done'), 850))
    timers.current.push(
      setTimeout(() => notify({ title: 'Renewal reviewed', body: 'Your acknowledgement is logged in the consent record', kind: 'ok' }), 950),
    )
  }

  return (
    <AccentHero tone="rose">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-rose-200/50">
          <CalendarClock className="h-3 w-3" aria-hidden />
          Consent renewal
        </span>
        {phase === 'done' ? (
          <StatusPill tone="emerald" label="Reviewed" />
        ) : (
          <StatusPill tone="rose" label={`${CONSENT_CYCLE.totalDays - CONSENT_CYCLE.day} days left`} live />
        )}
      </div>

      <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Auto-renews on{' '}
        <span className="bg-gradient-to-r from-rose-300 to-orange-200 bg-clip-text text-transparent">
          {CONSENT_CYCLE.renewsOn}
        </span>
      </h3>
      <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-rose-100/60">
        {phase === 'done'
          ? 'You reviewed this renewal. It proceeds as an explicit, logged decision.'
          : 'Reviewing now keeps the renewal an explicit decision instead of an automatic one.'}
      </p>

      <div className="mt-5">
        <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em]">
          <span className="text-rose-100/50">90-day cycle</span>
          <span className="tabular-nums text-rose-200">
            Day {CONSENT_CYCLE.day} of {CONSENT_CYCLE.totalDays}
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rose-400 to-orange-300 transition-[width] duration-700"
            style={{ width: `${(CONSENT_CYCLE.day / CONSENT_CYCLE.totalDays) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-5">
        <DarkCycleStepper steps={consentSteps} />
      </div>

      <Row
        className="mt-5 rounded-2xl bg-white/[0.06] px-4 py-3.5"
        dark="white"
        padding="none"
        title="What this consent grants"
        titleClassName="text-[12.5px]"
        subtitle="Caregiver visits, partner referral, audit trail"
        subtitleClassName="text-[10.5px] font-semibold text-white/45"
        onClick={() => setScopeOpen((v) => !v)}
        ariaExpanded={scopeOpen}
        hoverClassName="hover:bg-white/[0.1]"
        whileTapDisabled
        showChevron={false}
        trailing={
          <motion.span animate={{ rotate: scopeOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown className="h-4 w-4 shrink-0 text-white/30" aria-hidden />
          </motion.span>
        }
      />

      <AnimatePresence initial={false}>
        {scopeOpen && (
          <motion.div
            key="scope"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-2 rounded-2xl bg-white/[0.06] px-4 py-3.5">
              {consentScopeRows().map((row, i) => (
                <div key={row.label} className={i === 0 ? '' : 'mt-2.5'}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-rose-100/40">{row.label}</span>
                    <span className="truncate text-[12.5px] font-bold text-rose-50/90">{row.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'done' && (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mt-3 flex items-center gap-2.5 rounded-xl bg-emerald-500/[0.12] px-3.5 py-3"
          >
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400 text-[#04241A]">
              <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
            </span>
            <span className="min-w-0 text-[10.5px] font-bold text-emerald-100">
              Renewal reviewed — logged to your consent record
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-5">
        <motion.button
          type="button"
          whileTap={phase === 'idle' ? { scale: 0.985 } : undefined}
          onClick={acknowledge}
          disabled={phase !== 'idle'}
          aria-disabled={phase !== 'idle'}
          className={cn(
            'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-4 text-[13px] font-bold text-white transition-colors',
            phase === 'done'
              ? 'bg-emerald-600'
              : phase === 'working'
                ? 'cursor-wait bg-rose-500/50'
                : 'bg-rose-500',
          )}
        >
          {phase === 'idle' && <span>Review and acknowledge renewal</span>}
          {phase === 'working' && (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              <span>Recording…</span>
            </>
          )}
          {phase === 'done' && (
            <>
              <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
              <span>Reviewed</span>
            </>
          )}
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          onClick={() => {
            notify({ title: 'Withdrawing', body: 'Withdrawal pauses care at the next visit boundary', kind: 'info' })
            navigate('/patient/p22')
          }}
          className="mt-2.5 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-white/[0.06] py-3 text-[12.5px] font-bold text-rose-100/90 transition-colors hover:bg-white/[0.1]"
        >
          <ShieldOff className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          Withdraw consent
        </motion.button>
      </div>
    </AccentHero>
  )
}

interface ConsentSheetProps {
  onClose: () => void
}

export function ConsentSheet({ onClose }: ConsentSheetProps) {
  const { navigate } = useRouter()

  return (
    <SheetShell
      icon={ShieldCheck}
      title="Consent, active"
      subtitle="Signed by you, governs who sees this plan"
      tone="success"
      onClose={onClose}
      footer={
        <div className="flex flex-col gap-2.5">
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => {
                onClose()
                navigate('/patient/p22')
              }}
              className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
            >
              <ScrollText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              <span className="truncate">Consent records</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onClose()
                navigate('/patient/p21')
              }}
              className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
            >
              <ScrollText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              <span className="truncate">Audit log</span>
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose()
              navigate('/patient/p22')
            }}
            className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-rose-500/[0.07] py-3.5 text-[13px] font-bold text-rose-600"
          >
            <ShieldOff className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Withdraw consent</span>
          </button>
        </div>
      }
    >
      <DarkPanel kicker="Consent scope">
        <FactRows rows={consentScopeRows()} />
      </DarkPanel>

      <p className="mt-3 pb-2 text-[11px] font-medium leading-relaxed text-[#0B211B]/50">
        Withdrawing pauses care at the next visit boundary. Every access to these records is in your audit log.
      </p>
    </SheetShell>
  )
}

interface DayDetailCardProps {
  day: VisitDay
  onOpenVisit: () => void
  onOpenSummary: () => void
}

function WeekRhythm() {
  return (
    <div className="mx-auto mt-4 flex gap-1.5">
      {WEEK.map((d) => (
        <span
          key={d.id}
          aria-hidden
          className={cn(
            'grid h-7 flex-1 place-items-center rounded-lg text-[9px] font-extrabold uppercase',
            d.done
              ? 'bg-emerald-500/[0.14] text-emerald-700'
              : 'bg-[#0B211B]/[0.04] text-[#0B211B]/30',
          )}
        >
          {d.day[0]}
        </span>
      ))}
    </div>
  )
}

function RestDayState({ onManageSchedule }: { onManageSchedule: () => void }) {
  return (
    <div className="p-5 text-center">
      <span className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-[#0B211B]/[0.05]">
        <CalendarOff className="h-5 w-5 text-[#0B211B]/40" strokeWidth={2.2} aria-hidden />
      </span>
      <div className="mt-3 text-[14px] font-extrabold tracking-tight text-[#0B211B]">Rest day, no visit scheduled</div>
      <p className="mx-auto mt-1.5 max-w-[30ch] text-pretty text-[12px] font-medium leading-snug text-[#0B211B]/55">
        Care runs on the marked days below. The next visit is Monday at 9:00 AM with {CAREGIVER.firstName}.
      </p>

      <WeekRhythm />

      <motion.button
        type="button"
        whileTap={{ scale: 0.985 }}
        onClick={onManageSchedule}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-500/[0.12] py-3 text-[12.5px] font-extrabold text-sky-700"
      >
        <SlidersHorizontal className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        Change visit days
      </motion.button>
    </div>
  )
}

export function DayDetailCard({ day, onOpenVisit, onOpenSummary }: DayDetailCardProps) {
  const { navigate } = useRouter()

  if (!day.done) {
    return (
      <Card>
        <RestDayState onManageSchedule={() => navigate('/patient/p34')} />
      </Card>
    )
  }

  return (
    <Card>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">{day.full}</div>
            <div className="mt-0.5 text-xs font-semibold leading-snug text-[#0B211B]/50">{dayDetailLine(day)}</div>
          </div>
          <Chip intent="success" dot className="shrink-0">
            Completed
          </Chip>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-emerald-500/[0.1] px-4 py-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-500/[0.14]">
            <CalendarCheck className="h-4 w-4 text-emerald-700" strokeWidth={2.4} aria-hidden />
          </span>
          <span className="min-w-0 flex-1 text-[13px] font-bold text-emerald-800">All goals logged at this visit</span>
          <span className="shrink-0 text-[11px] font-extrabold tabular-nums text-emerald-700">
            {GOALS_LOGGED.done} of {GOALS_LOGGED.total}
          </span>
        </div>

        <div className="mt-3 flex gap-2.5">
          <button
            type="button"
            onClick={onOpenVisit}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
          >
            <ScrollText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Visit detail</span>
          </button>
          <button
            type="button"
            onClick={onOpenSummary}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
          >
            <MapPin className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Full summary</span>
          </button>
        </div>
      </div>
    </Card>
  )
}

const sessionTone: Record<GoalSession['state'], { wrap: string; day: string; value: string }> = {
  met: { wrap: 'bg-emerald-500/[0.08]', day: 'text-emerald-700/60', value: 'text-emerald-800' },
  missed: { wrap: 'bg-rose-500/[0.07]', day: 'text-rose-500/70', value: 'text-rose-600' },
  pending: { wrap: 'bg-amber-500/[0.09]', day: 'text-amber-700/60', value: 'text-amber-700' },
}

function GoalRow({
  goal,
  open,
  onToggle,
  onOpenSession,
}: {
  goal: Goal
  open: boolean
  onToggle: () => void
  onOpenSession: () => void
}) {
  const Icon = goal.icon
  const tone = goal.state === 'met' ? 'success' : 'warning'

  return (
    <Row
      leading={
        <span
          className={cn(
            'grid h-10 w-10 shrink-0 place-items-center rounded-xl',
            goal.state === 'met' ? 'bg-emerald-500/[0.1] text-emerald-600' : 'bg-amber-500/[0.12] text-amber-600',
          )}
        >
          <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
        </span>
      }
      title={goal.title}
      titleClassName="text-[13px] leading-snug"
      subtitle={goal.result}
      subtitleClassName="mt-0.5 text-[11px] font-medium leading-snug text-[#0B211B]/50"
      padding="p-3.5"
      surface="inset"
      wrapSurface
      expandable
      open={open}
      onToggle={onToggle}
      chevronInTrailing
      hoverClassName="hover:bg-[#0B211B]/[0.02]"
      trailing={
        <Chip intent={tone} dot={goal.state === 'open'}>
          {goal.state === 'met' ? 'Met' : 'Open'}
        </Chip>
      }
      expansionPadded={false}
      expansion={
        <div className="px-3.5 pb-3.5">
          <div className="grid grid-cols-3 gap-1.5">
            {goal.sessions.map((s) => {
              const t = sessionTone[s.state]
              return (
                <motion.button
                  key={`${s.day}-${s.value}`}
                  type="button"
                  whileTap={{ scale: 0.93 }}
                  onClick={onOpenSession}
                  className={cn('rounded-xl px-2 py-2 text-center', t.wrap)}
                >
                  <span className={cn('block text-[8px] font-extrabold uppercase tracking-[0.14em]', t.day)}>{s.day}</span>
                  <span className={cn('mt-0.5 block text-[11px] font-bold tabular-nums', t.value)}>{s.value}</span>
                </motion.button>
              )
            })}
          </div>

          <QuotePanel
            kicker="Verbatim"
            kickerIcon={Quote}
            quote={goal.note}
            author={`${CAREGIVER.name}, caregiver`}
            authorInitial={CAREGIVER.firstName[0]}
          />
        </div>
      }
    />
  )
}

export function GoalsCard({ onOpenSession }: { onOpenSession: () => void }) {
  const [openId, setOpenId] = useState<string | null>('diet')
  const summary = goalSummary()
  const allMet = summary.open === 0

  return (
    <Card intent={allMet ? 'success' : 'warning'}>
      <div aria-hidden className={cn('h-1 w-full', allMet ? 'bg-gradient-to-r from-emerald-400 to-teal-400' : 'bg-gradient-to-r from-amber-400 to-orange-400')} />
      <div className="p-5">
        <div className="flex items-start gap-3.5">
          <Tile icon={Salad} tone={allMet ? 'success' : 'warning'} size="lg" />
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Goal completion</span>
              <Chip intent={allMet ? 'success' : 'warning'} dot={!allMet}>
                {summary.met} of {summary.total} met
              </Chip>
            </div>
            <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              {allMet
                ? 'Every goal sealed for the week.'
                : 'Diet completes Saturday, the other two are sealed for the week.'}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#0B211B]/40">Goal-days achieved</span>
            <span className={cn('shrink-0 text-[10px] font-extrabold tabular-nums', allMet ? 'text-emerald-700' : 'text-amber-700')}>
              {summary.achieved} of {summary.scored}
            </span>
          </div>
          <Meter value={summary.achieved / summary.scored} intent={allMet ? 'success' : 'warning'} delay={0.2} className="mt-2" />
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {GOALS.map((goal) => (
            <GoalRow
              key={goal.id}
              goal={goal}
              open={openId === goal.id}
              onToggle={() => setOpenId((prev) => (prev === goal.id ? null : goal.id))}
              onOpenSession={onOpenSession}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}

export function PlanHero() {
  const goals = goalSummary()
  const visits = completedVisits()

  return (
    <AccentHero tone="emerald">
      <HeroTopRow
        label="Recovery plan"
        trailing={
          <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] tabular-nums text-emerald-100/40">
            Wk {PLAN.week} of {PLAN.weeks}
          </span>
        }
      />

      <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Week {PLAN.week}, <HeroHighlight>{PLAN.status.toLowerCase()}</HeroHighlight>
      </h2>
      <p className="mt-1.5 text-pretty text-[11.5px] font-semibold leading-snug text-emerald-100/70">
        Every goal is logged by the caregiver at each visit.
      </p>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/40">
          <span>Plan progress</span>
          <span className="tabular-nums text-emerald-200">{PLAN.progress}%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 transition-[width] duration-700"
            style={{ width: `${PLAN.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <StatCell label="Visits done" value={String(visits)} />
        <StatCell label="Goals met" value={`${goals.met} of ${goals.total}`} />
      </div>
      <div className="mt-2 flex items-center justify-between gap-3 rounded-2xl bg-white/[0.04] px-3.5 py-2.5">
        <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">Incidents this week</span>
        <span className="truncate text-[12.5px] font-extrabold tabular-nums leading-none text-white">{PLAN.incidents}</span>
      </div>
    </AccentHero>
  )
}

const linkIcons = {
  reports: { icon: CalendarCheck, tone: 'info' as const },
  timeline: { icon: MapPin, tone: 'success' as const },
  manage: { icon: SlidersHorizontal, tone: 'warning' as const },
}

export function PlanLinksCard() {
  const { navigate } = useRouter()

  return (
    <Card>
      <div className="flex flex-col gap-2 p-3">
        {planLinks.map((link) => {
          const { icon: Icon, tone } = linkIcons[link.id as keyof typeof linkIcons]
          return (
            <Row
              key={link.id}
              icon={Icon}
              tone={tone}
              title={link.title}
              subtitle={link.sub}
              surface="inset"
              padding="comfortable"
              className="py-3.5"
              hoverClassName="hover:bg-[#0B211B]/[0.05]"
              showChevron={false}
              trailing={<ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />}
              onClick={() => navigate(link.target)}
            />
          )
        })}
      </div>
    </Card>
  )
}

const cx = (index: number, count: number) => (300 / count) * (index + 0.5)

const headerLabel: Record<MetricId, string> = {
  bp: 'Higher reading',
  steps: 'Daily average',
  weight: 'Weekly reading',
}

function makeScale(values: number[], target?: number) {
  const all = target != null ? [...values, target] : values
  const min = Math.min(...all)
  const max = Math.max(...all)
  const pad = (max - min) * 0.25 || 1
  return (v: number) => 98 - ((v - min + pad) / (max - min + pad * 2)) * 78
}

export function TrendsCard() {
  const [metricId, setMetricId] = useState<MetricId>('bp')
  const metric = METRICS.find((m) => m.id === metricId) ?? METRICS[0]
  const pointCount = metric.seriesA.values.length
  const [week, setWeek] = useState(pointCount - 1)
  useEffect(() => setWeek(pointCount - 1), [metricId, pointCount])

  const values = [...metric.seriesA.values, ...(metric.seriesB?.values ?? [])]
  const scale = makeScale(values, metric.target)
  const aPts = metric.seriesA.values.map((v, i) => `${cx(i, pointCount)},${scale(v)}`).join(' ')
  const bPts = metric.seriesB?.values.map((v, i) => `${cx(i, pointCount)},${scale(v)}`).join(' ')
  const labels = axisLabels(pointCount)
  const labelX = Math.min(272, Math.max(48, cx(week, pointCount)))

  return (
    <Card intent="info">
      <div aria-hidden className="h-1 w-full bg-gradient-to-r from-sky-400 to-teal-400" />
      <div className="p-5">
        <div className="flex items-start gap-3.5">
          <Tile icon={Activity} tone="info" size="lg" />
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Recovery metrics</span>
              <Chip intent="info">4 weeks</Chip>
            </div>
            <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              Recorded by the caregiver at each visit. Tap a week to read its value.
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-1 rounded-full bg-[#0B211B]/[0.06] p-1">
          {METRICS.map((m) => {
            const active = metricId === m.id
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setMetricId(m.id)}
                role="tab"
                aria-selected={active}
                className="relative flex-1 rounded-full px-2 py-2"
              >
                {active && (
                  <motion.span
                    layoutId="p13-metric-pill"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                    className="absolute inset-0 rounded-full bg-white shadow-[0_6px_16px_-8px_rgba(11,33,27,0.4)]"
                  />
                )}
                <span
                  className={cn(
                    'relative block truncate text-[10px] font-extrabold uppercase tracking-[0.1em] transition-colors duration-200',
                    active ? 'text-sky-700' : 'text-[#0B211B]/40',
                  )}
                >
                  {m.tab}
                </span>
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={metricId}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="mt-4"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#0B211B]/40">
                {headerLabel[metricId]}
              </span>
              <span className="shrink-0 text-[13px] font-extrabold tabular-nums text-emerald-700">{metric.delta}</span>
            </div>

            <svg viewBox="0 0 300 116" className="mt-2 h-[124px] w-full" aria-hidden>
              {[30, 56, 82].map((y) => (
                <line key={y} x1={14} x2={288} y1={y} y2={y} stroke="rgba(11,33,27,0.06)" strokeWidth="1" strokeDasharray="3 4" />
              ))}

              {metric.target != null && (
                <>
                  <motion.line
                    x1={14}
                    x2={288}
                    y1={scale(metric.target)}
                    y2={scale(metric.target)}
                    stroke="rgba(5,150,105,0.5)"
                    strokeWidth="1.5"
                    strokeDasharray="5 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
                  />
                  <motion.text
                    x={16}
                    y={scale(metric.target) - 5}
                    className="fill-emerald-700/80 text-[7.5px] font-extrabold uppercase"
                    letterSpacing="1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    {metric.targetLabel}
                  </motion.text>
                </>
              )}

              {bPts && (
                <motion.polyline
                  points={bPts}
                  fill="none"
                  stroke="#2dd4bf"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55, duration: 0.45 }}
                />
              )}

              <motion.polyline
                points={aPts}
                fill="none"
                stroke="#059669"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              />

              {metric.seriesB?.values.map((v, i) => (
                <motion.circle
                  key={`b-${i}`}
                  cx={cx(i, pointCount)}
                  cy={scale(v)}
                  r={3}
                  fill={i === week ? '#0d9488' : '#0B231C'}
                  stroke="#fff"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 320, damping: 17 }}
                />
              ))}

              {metric.seriesA.values.map((v, i) => (
                <motion.circle
                  key={`a-${i}`}
                  cx={cx(i, pointCount)}
                  cy={scale(v)}
                  r={i === week ? 5.5 : 3.5}
                  fill={i === week ? '#059669' : '#0B231C'}
                  stroke="#fff"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.25 + i * 0.1, type: 'spring', stiffness: 320, damping: 17 }}
                />
              ))}

              <motion.text
                key={`label-${metricId}-${week}`}
                x={labelX}
                y={scale(metric.seriesA.values[week]) - 11}
                textAnchor="middle"
                className="fill-emerald-800 text-[9.5px] font-extrabold tabular-nums"
                initial={{ opacity: 0, y: scale(metric.seriesA.values[week]) - 7 }}
                animate={{ opacity: 1, y: scale(metric.seriesA.values[week]) - 11 }}
                transition={{ duration: 0.2 }}
              >
                {formatValue(metric, week)}
                {metric.unit}
              </motion.text>
            </svg>

            <div className="grid" style={{ gridTemplateColumns: `repeat(${pointCount}, 1fr)` }}>
              {labels.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setWeek(i)}
                  aria-pressed={i === week}
                  className={cn(
                    'py-1 text-center text-[9px] font-extrabold uppercase tracking-[0.12em] transition-colors',
                    i === week ? 'text-emerald-700' : 'text-[#0B211B]/35',
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Card>
  )
}

interface VisitSheetProps {
  day: VisitDay
  onOpenCaregiver: () => void
  onClose: () => void
}

export function VisitSheet({ day, onOpenCaregiver, onClose }: VisitSheetProps) {
  const { navigate } = useRouter()

  return (
    <SheetShell
      icon={MapPin}
      title={day.full}
      subtitle={`${CAREGIVER.name} at ${day.time}, ${day.minutes} minutes on site`}
      tone="success"
      onClose={onClose}
      footer={
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => {
              onClose()
              navigate('/patient/p17')
            }}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
          >
            <ScrollText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Visit summary</span>
          </button>
          <button
            type="button"
            onClick={onOpenCaregiver}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
          >
            <HeartPulse className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Caregiver</span>
          </button>
        </div>
      }
    >
      <DarkPanel kicker="Vitals recorded">
        <FactRows rows={VITALS} />
        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-emerald-400/[0.12] px-3 py-2.5">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-emerald-100">All goals logged</span>
          <span className="text-[10px] font-bold tabular-nums text-emerald-200/70">
            {GOALS_LOGGED.done} of {GOALS_LOGGED.total}
          </span>
        </div>
      </DarkPanel>

      <div className="mt-3 rounded-2xl bg-[#0B211B]/[0.03] p-4">
        <FactRows rows={visitFacts(day)} tone="light" />
      </div>
    </SheetShell>
  )
}

interface WeekVisitsCardProps {
  selected: number
  onSelect: (index: number) => void
}

export function WeekVisitsCard({ selected, onSelect }: WeekVisitsCardProps) {
  const done = completedVisits()
  const max = maxVisitMinutes()

  return (
    <AccentHero tone="emerald">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">This week's visits</span>
          <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
            {done} of {done}{' '}
            <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">completed</span>
          </h2>
          <p className="mt-0.5 text-[11px] font-semibold text-emerald-100/50">Tap a day to see its visit</p>
        </div>
      </div>

      <div className="mt-5 flex h-28 items-end gap-2">
        {WEEK.map((w, i) => {
          const isActive = i === selected
          const pct = Math.max(6, ((w.minutes ?? 0) / max) * 100)
          return (
            <motion.button
              key={w.id}
              type="button"
              whileTap={{ scale: 0.93 }}
              onClick={() => onSelect(i)}
              aria-label={`${w.full}, ${w.done ? `visit completed, ${w.minutes} minutes` : 'no visit'}`}
              aria-pressed={isActive}
              className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5"
            >
              <span
                className={cn(
                  'text-[9px] font-extrabold tabular-nums',
                  isActive ? 'text-white' : w.done ? 'text-emerald-100/55' : 'text-emerald-100/25',
                )}
              >
                {w.done ? `${w.minutes}m` : '—'}
              </span>
              <span className="flex h-full w-full items-end overflow-hidden rounded-t-xl bg-white/[0.06]">
                <motion.span
                  initial={{ height: 0 }}
                  animate={{ height: w.done ? `${pct}%` : '6%' }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: 'easeOut' }}
                  className={cn(
                    'w-full rounded-t-xl',
                    w.done
                      ? isActive
                        ? 'bg-gradient-to-t from-emerald-400 to-teal-300 shadow-[0_-8px_20px_-8px_rgba(52,211,153,0.7)]'
                        : 'bg-gradient-to-t from-emerald-500/60 to-teal-400/50'
                      : 'bg-white/[0.1]',
                  )}
                />
              </span>
              <span
                className={cn(
                  'text-[9px] font-extrabold uppercase tracking-wide',
                  isActive ? 'text-white' : 'text-emerald-100/40',
                )}
              >
                {w.day}
              </span>
            </motion.button>
          )
        })}
      </div>

      <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-white/[0.04] px-3.5 py-2.5">
        <span className="min-w-0 flex-1 truncate text-[11px] font-bold text-emerald-50/80">
          Next visit, Monday 9:00 AM with {CAREGIVER.firstName}
        </span>
      </div>
    </AccentHero>
  )
}