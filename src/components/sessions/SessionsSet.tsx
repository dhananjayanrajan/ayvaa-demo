import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { Activity, ArrowRight, CalendarDays, Check, FileText, Home, Loader2, Lock, MapPin, Phone, Play, ShieldCheck, Syringe, X } from 'lucide-react'
import { Card, Chip, Hero, Kicker, LiveDot, StatStrip, Tile } from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'
import type { SessionStep } from '@/data/sessionExecution'
import { QUICK_ACTIONS, STEP_ICONS } from '@/data/sessionExecution'
import type { StepState } from '@/data/sessionExecution'
import { cn } from '@/lib/utils'
import type { RowChip } from '@/components/phone/Row'
import { Row } from '@/components/phone/Row'
import { useState } from 'react'
import { SheetShell } from '@/components/phone/SheetShell'
import type { Session } from '@/data/types'

// ── CheckInHero.tsx ──
type Props_CheckInHero = {
  checkInTime: string
  doneCount: number
  total: number
  runningLabel: string
  steps: SessionStep[]
}

export function CheckInHero({ checkInTime, doneCount, total, runningLabel, steps }: Props_CheckInHero) {
  const allDone = doneCount === total
  return (
    <Hero>
      <Kicker>Live visit · GPS verified</Kicker>

      <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Checked in at{' '}
        <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">{checkInTime}</span>
      </h2>

      <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
        GPS matched the care address · this check-in is written permanently to the visit record.
      </p>

      <div className="mt-5 rounded-2xl bg-white/[0.06] p-3.5">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-emerald-100/50">Checklist progress</span>
          <span className="text-[10px] font-extrabold tabular-nums text-emerald-200">
            {doneCount}/{total}
          </span>
        </div>

        <div className="mt-2.5 flex gap-1">
          {steps.map((s) => (
            <span
              key={s.id}
              className={cn(
                'h-1.5 flex-1 overflow-hidden rounded-full',
                s.state === 'done' && 'bg-gradient-to-r from-emerald-400 to-teal-300',
                s.state === 'active' && 'bg-blue-300/30',
                s.state === 'todo' && 'bg-white/[0.18]',
                s.state === 'locked' && 'bg-white/10',
              )}
            >
              {s.state === 'active' && (
                <motion.span
                  className="h-full w-full rounded-full bg-blue-300"
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2.5">
          <LiveDot className={allDone ? 'text-emerald-300' : 'text-blue-300'} />
          <span
            className={cn(
              'min-w-0 flex-1 truncate text-[11px] font-bold uppercase tracking-[0.1em]',
              allDone ? 'text-emerald-100/80' : 'text-blue-100/80',
            )}
          >
            {runningLabel}
          </span>
          <Chip
            intent={allDone ? 'success' : 'live'}
            light
            icon={allDone ? undefined : Lock}
            dot={!allDone}
            className="shrink-0 border-transparent"
          >
            {allDone ? 'Complete' : 'Logged'}
          </Chip>
        </div>
      </div>
    </Hero>
  )
}

// ── ChecklistCard.tsx ──
type Props_ChecklistCard = {
  steps: SessionStep[]
  onPressStep: (step: SessionStep) => void
}

export function ChecklistCard({ steps, onPressStep }: Props_ChecklistCard) {
  return (
    <Card>
      <div className="flex flex-col gap-1 p-2">
        {steps.map((s) => {
          const Icon = STEP_ICONS[s.icon]
          return (
            <ChecklistRow
              key={s.id}
              title={s.title}
              body={s.body}
              icon={Icon}
              state={s.state}
              onPress={() => onPressStep(s)}
            />
          )
        })}
      </div>
    </Card>
  )
}

// ── ChecklistRow.tsx ──
type Props_ChecklistRow = {
  title: string
  body: string
  icon: LucideIcon
  state: StepState
  onPress: () => void
}

const tileFor = (state: StepState): { tone: TileTone; pulse?: boolean } => {
  if (state === 'done') return { tone: 'success' }
  if (state === 'active') return { tone: 'live', pulse: true }
  if (state === 'todo') return { tone: 'info' }
  return { tone: 'neutral' }
}

const chipFor = (state: StepState): RowChip => {
  switch (state) {
    case 'done':
      return { label: 'Done', intent: 'success', icon: Check }
    case 'active':
      return { label: 'Running', intent: 'live', dot: true }
    case 'todo':
      return { label: 'Start', intent: 'info', icon: Play }
    case 'locked':
      return { label: 'Locked', intent: 'neutral', icon: Lock }
  }
}

export function ChecklistRow({ title, body, icon, state, onPress }: Props_ChecklistRow) {
  const t = tileFor(state)
  const locked = state === 'locked'
  return (
    <Row
      leading={
        <span className="relative shrink-0">
          <Tile icon={icon} tone={t.tone} />
          {state === 'active' && (
            <span aria-hidden className="absolute -inset-1 -z-10 rounded-[18px] bg-blue-500/20 blur-md" />
          )}
        </span>
      }
      title={title}
      titleClassName={locked ? 'text-[#0B211B]/40' : undefined}
      subtitle={body}
      subtitleClassName={cn('text-[11px] font-semibold', locked ? 'text-[#0B211B]/35' : 'text-[#0B211B]/50')}
      chip={chipFor(state)}
      padding="roomy"
      className={cn(locked && 'cursor-not-allowed', state === 'active' && 'bg-blue-500/[0.05]')}
      hoverClassName={locked ? undefined : 'hover:bg-[#0B211B]/[0.02]'}
      disabled={locked}
      onClick={onPress}
    />
  )
}

// ── FieldTaskRow.tsx ──
interface FieldTaskRowProps {
  title: string
  time: string
  detail: string
  onReportClick: () => void
}

export function FieldTaskRow({ title, time, detail, onReportClick }: FieldTaskRowProps) {
  return (
    <Card intent="warning">
      <Row
        icon={MapPin}
        tone="warning"
        title={title}
        titleMeta={<span className="text-[11px] font-bold text-[#0B211B]/50">{time}</span>}
        subtitle={detail}
        subtitleClassName="text-[11px] leading-relaxed text-[#0B211B]/55"
        trailing={
          <button
            type="button"
            onClick={onReportClick}
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-[10px] font-bold text-amber-700 transition-colors hover:bg-amber-500/20"
          >
            <FileText className="h-3.5 w-3.5" aria-hidden />
            Report
          </button>
        }
      />
    </Card>
  )
}

// ── LiveSessionCard.tsx ──
interface LiveSessionCardProps {
  title: string
  detail: string
  time: string
  checklistProgress: number
  onResume: () => void
  onCallFamily: () => void
}

export function LiveSessionCard({
  title,
  detail,
  time,
  checklistProgress,
  onResume,
  onCallFamily,
}: LiveSessionCardProps) {
  const [loading, setLoading] = useState(false)

  const handleResume = () => {
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onResume()
    }, 700)
  }

  return (
    <Card intent="success" className="overflow-hidden">
      <div className="p-5">
        <div className="flex items-start gap-3">
          <Tile icon={Activity} tone="success" size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-sm font-extrabold leading-snug tracking-tight text-[#0B211B]">{title}</span>
              <Chip intent="success" dot>Live</Chip>
            </div>
            <p className="mt-1 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/60">{detail}</p>
            <div className="mt-1 text-[11px] font-bold text-[#0B211B]/45">{time}</div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-[10px] font-bold text-[#0B211B]/50">
            <span>Checklist progress</span>
            <span>{checklistProgress}%</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#0B211B]/[0.06]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${checklistProgress}%` }}
              transition={{ type: 'spring', stiffness: 60, damping: 15 }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
            />
          </div>
        </div>

        <div className="mt-4 flex gap-2.5">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={handleResume}
            disabled={loading}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-3.5 text-[13px] font-bold text-white transition-colors hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />}
            {loading ? 'Opening…' : 'Resume checklist'}
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={onCallFamily}
            className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-2xl bg-[#0B211B]/[0.05] text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
            aria-label="Call family"
          >
            <Phone className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
          </motion.button>
        </div>
      </div>
    </Card>
  )
}

// ── QuickActionsGrid.tsx ──
type Props_QuickActionsGrid = {
  onPressAction: (label: string, body: string) => void
}

export function QuickActionsGrid({ onPressAction }: Props_QuickActionsGrid) {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {QUICK_ACTIONS.map((q) => {
        const Icon = STEP_ICONS[q.key]
        return (
          <motion.button
            key={q.label}
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => onPressAction(q.label, q.body)}
            className="flex flex-col items-start gap-2.5 rounded-2xl bg-[#0B211B]/[0.04] p-3.5 transition-colors hover:bg-[#0B211B]/[0.07]"
          >
            <Tile icon={Icon} tone="info" size="sm" />
            <span className="text-[12px] font-extrabold tracking-tight text-[#0B211B]">{q.label}</span>
          </motion.button>
        )
      })}
    </div>
  )
}

// ── ReportSheet.tsx ──
interface ReportSheetProps {
  open: boolean
  onClose: () => void
  onSubmit: (note: string) => void
}

export function ReportSheet({ open, onClose, onSubmit }: ReportSheetProps) {
  const [note, setNote] = useState('')

  if (!open) return null

  const handleSubmit = () => {
    onSubmit(note)
    setNote('')
    onClose()
  }

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <SheetShell onClose={onClose} height="auto">
        <div>
          <div className="flex items-start gap-3">
            <Tile icon={FileText} tone="warning" size="lg" />
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Field task report</h3>
              <p className="mt-0.5 text-xs font-medium text-[#0B211B]/55">Complete the report to maintain dispatch priority.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
              aria-label="Close report sheet"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your visit summary…"
            className="mt-4 min-h-[100px] w-full resize-none rounded-2xl bg-[#0B211B]/[0.04] p-3 text-sm font-medium text-[#0B211B] outline-none focus:ring-2 focus:ring-emerald-500/40"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="mt-4 w-full rounded-2xl bg-emerald-500 py-3.5 text-sm font-bold text-white transition-colors hover:bg-emerald-600"
          >
            Submit report
          </button>
        </div>
      </SheetShell>
    </motion.div>
  )
}

// ── SessionDetailSheet.tsx ──
function sessionIcon(title: string): LucideIcon {
  if (title.includes('insulin')) return Syringe
  if (title.includes('wellness')) return Home
  if (title.includes('physio')) return Activity
  return CalendarDays
}

interface SessionDetailSheetProps {
  session: Session | null
  onClose: () => void
  onCall: (session: Session) => void
  onDirections: (session: Session) => void
}

export function SessionDetailSheet({ session, onClose, onCall, onDirections }: SessionDetailSheetProps) {
  if (!session) return null
  const Icon = sessionIcon(session.title)

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <SheetShell onClose={onClose} height="auto">
        <div>
          <div className="flex items-start gap-3">
            <Tile icon={Icon} tone="success" size="lg" />
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">{session.title}</h3>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#0B211B]/50">{session.time}</span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Confirmed</span>
              </div>
              <p className="mt-2 text-[12px] font-medium leading-relaxed text-[#0B211B]/70">{session.detail}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
              aria-label="Close details"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <div className="mt-4 rounded-2xl bg-[#0B211B]/[0.03] p-3.5">
            <div className="flex items-center gap-2 text-[11px] font-bold text-[#0B211B]/60">
              <MapPin className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
              <span>{session.location ?? 'Location shared after acceptance'}</span>
            </div>
          </div>

          <div className="mt-4 flex gap-2.5">
            <button
              type="button"
              onClick={() => onCall(session)}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-3.5 text-[13px] font-bold text-white transition-colors hover:bg-emerald-600"
            >
              <Phone className="h-4 w-4" aria-hidden />
              Call
            </button>
            <button
              type="button"
              onClick={() => onDirections(session)}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
            >
              <MapPin className="h-4 w-4" aria-hidden />
              Directions
            </button>
          </div>
        </div>
      </SheetShell>
    </motion.div>
  )
}

// ── SessionListCard.tsx ──

function sessionTone(title: string): TileTone {
  if (title.includes('insulin')) return 'info'
  if (title.includes('wellness')) return 'success'
  if (title.includes('physio')) return 'success'
  return 'neutral'
}

interface SessionListCardProps {
  sessions: Session[]
  onSessionClick: (session: Session) => void
}

export function SessionListCard({ sessions, onSessionClick }: SessionListCardProps) {
  return (
    <Card>
      {sessions.length === 0 ? (
        <div className="px-4 py-6 text-center text-[12px] font-medium text-[#0B211B]/45">
          No sessions for this day.
        </div>
      ) : (
        sessions.map((s) => {
          const Icon = sessionIcon(s.title)
          const tone = sessionTone(s.title)
          return (
            <div key={s.id}>
              <Row
                icon={Icon}
                tone={tone}
                title={s.title}
                titleMeta={
                  <Chip intent="success" className="border-transparent">Confirmed</Chip>
                }
                subtitle={s.detail}
                subtitleClassName="text-[11px] leading-relaxed"
                body={
                  <div className="mt-0.5 flex items-center gap-1.5 text-[10px] font-semibold text-[#0B211B]/45">
                    <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                    <span>{s.location ?? 'Location shared after acceptance'}</span>
                    {s.distance && <span className="shrink-0">· {s.distance}</span>}
                  </div>
                }
                trailing={<span className="text-[11px] font-bold text-[#0B211B]/50">{s.time}</span>}
                showChevron={false}
                surface="none"
                padding="none"
                hoverClassName="hover:bg-[#0B211B]/[0.02]"
                onClick={() => onSessionClick(s)}
              />
            </div>
          )
        })
      )}
    </Card>
  )
}

// ── SessionSummaryHero.tsx ──
interface SessionSummaryHeroProps {
  dateLabel: string
  liveCount: number
  upcomingCount: number
  totalCount: number
  hasLive: boolean
}

export function SessionSummaryHero({
  dateLabel,
  liveCount,
  upcomingCount,
  totalCount,
  hasLive,
}: SessionSummaryHeroProps) {
  const theme = hasLive
    ? {
        kicker: 'text-emerald-200/60',
        title: 'text-white',
        gradient: 'from-emerald-300 to-teal-200',
        chipIntent: 'live' as const,
        chipLabel: 'Live now',
        statLive: 'bg-emerald-300',
        statUpcoming: 'bg-teal-300',
        statTotal: 'bg-sky-300/80',
      }
    : {
        kicker: 'text-amber-200/60',
        title: 'text-white',
        gradient: 'from-amber-300 to-orange-200',
        chipIntent: 'warning' as const,
        chipLabel: 'No live',
        statLive: 'bg-amber-300',
        statUpcoming: 'bg-amber-200',
        statTotal: 'bg-amber-100',
      }

  return (
    <Hero>
      <div className="flex items-start justify-between gap-3">
        <Kicker className={theme.kicker}>{dateLabel}</Kicker>
        <Chip intent={theme.chipIntent} light dot={hasLive} className="shrink-0 border-transparent">
          {theme.chipLabel}
        </Chip>
      </div>
      <h2 className={cn('mt-2 text-[19px] font-extrabold leading-snug tracking-tight', theme.title)}>
        {totalCount} session{totalCount !== 1 ? 's' : ''}{' '}
        <span className={cn('bg-gradient-to-r bg-clip-text text-transparent', theme.gradient)}>
          scheduled
        </span>
      </h2>

      <StatStrip
        className="mt-5"
        cells={[
          { key: 'live', value: liveCount, label: 'Live', dot: theme.statLive },
          { key: 'upcoming', value: upcomingCount, label: 'Upcoming', dot: theme.statUpcoming },
          { key: 'total', value: totalCount, label: 'Total', dot: theme.statTotal },
        ]}
      />
    </Hero>
  )
}

// ── SignOffButton.tsx ──
export type SignOffStatus = 'idle' | 'signing' | 'signed'

type Props_SignOffButton = {
  remaining: number
  status: SignOffStatus
  onPress: () => void
}

export function SignOffButton({ remaining, status, onPress }: Props_SignOffButton) {
  const gated = remaining > 0
  const signed = status === 'signed'
  return (
    <motion.button
      type="button"
      whileTap={gated || status === 'signing' ? undefined : { scale: 0.97 }}
      onClick={onPress}
      disabled={gated || status === 'signing'}
      aria-disabled={gated || status === 'signing'}
      className={cn(
        'flex flex-[1.4] items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-[13px] font-bold transition-colors duration-300',
        signed && 'bg-emerald-500 text-white shadow-[0_18px_36px_-18px_rgba(16,185,129,0.85)]',
        !signed && status === 'signing' && 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
        !signed && status === 'idle' && gated && 'bg-[#0B211B]/[0.05] text-[#0B211B]/45 cursor-not-allowed',
        !signed && status === 'idle' && !gated && 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
      )}
    >
      {status === 'signing' ? (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin" strokeWidth={2.4} aria-hidden />
      ) : signed ? (
        <Check className="h-4 w-4 shrink-0" strokeWidth={2.8} aria-hidden />
      ) : (
        <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      )}
      <span className="truncate">
        {status === 'signing'
          ? 'Signing off…'
          : signed
            ? 'Signed off'
            : gated
              ? `${remaining} step${remaining === 1 ? '' : 's'} left`
              : 'Complete and sign off'}
      </span>
    </motion.button>
  )
}
