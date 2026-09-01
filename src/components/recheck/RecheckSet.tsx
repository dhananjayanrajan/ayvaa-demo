import { AnimatePresence, motion } from 'motion/react'
import type { Intent } from '@/components/phone/kit'
import { Card, Chip, StatStrip, Tile, rise } from '@/components/phone/kit'
import { PHASE_THEME, PhaseHero } from '@/components/phone/PhaseHero'
import type { RecheckPhase } from '@/data/system/recheck'
import { probeSteps, recheckSubject } from '@/data/system/recheck'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'
import { AlertTriangle, CalendarCheck, CalendarClock, CalendarX2, Loader2, ScanSearch, ScrollText, SearchCheck, Zap } from 'lucide-react'
import { StepList } from '@/components/phone/StepList'
import { Row } from '@/components/phone/Row'

type HeroTheme = {
  theme: (typeof PHASE_THEME)[keyof typeof PHASE_THEME]
  kicker: string
  gradient: string
  sub: string
  meta: string
  label: string
  chipIntent: Intent
  chipLabel: string
  chipDot: boolean
  statLabel: string
  waitingDot: string
  declinedDot: string
  chips: { intent: Intent; label: string }[]
}

const THEMES: Record<RecheckPhase, HeroTheme> = {
  monitoring: {
    theme: PHASE_THEME.emerald,
    kicker: 'text-emerald-200/50',
    gradient: 'from-emerald-300 to-teal-200',
    sub: 'text-emerald-100/55',
    meta: 'text-emerald-100/55',
    label: 'text-emerald-100/45',
    chipIntent: 'info',
    chipLabel: 'System-gated',
    chipDot: false,
    statLabel: 'text-emerald-100/45',
    waitingDot: 'bg-emerald-300',
    declinedDot: 'bg-white/30',
    chips: [
      { intent: 'info', label: 'Re-check pending' },
      { intent: 'success', label: 'No double-booking' },
    ],
  },
  probing: {
    theme: PHASE_THEME.amber,
    kicker: 'text-amber-200/60',
    gradient: 'from-amber-200 to-orange-200',
    sub: 'text-amber-100/60',
    meta: 'text-amber-100/60',
    label: 'text-amber-100/50',
    chipIntent: 'warning',
    chipLabel: 'Verifying',
    chipDot: true,
    statLabel: 'text-amber-100/50',
    waitingDot: 'bg-amber-300',
    declinedDot: 'bg-white/30',
    chips: [
      { intent: 'warning', label: 'In motion' },
      { intent: 'warning', label: '0 assumptions' },
    ],
  },
  reversed: {
    theme: PHASE_THEME.sky,
    kicker: 'text-sky-200/60',
    gradient: 'from-sky-300 to-blue-200',
    sub: 'text-sky-100/60',
    meta: 'text-sky-100/55',
    label: 'text-sky-100/50',
    chipIntent: 'info',
    chipLabel: 'Handled',
    chipDot: false,
    statLabel: 'text-sky-100/50',
    waitingDot: 'bg-sky-300',
    declinedDot: 'bg-white/30',
    chips: [
      { intent: 'info', label: 'Re-offered' },
      { intent: 'success', label: 'No penalty applied' },
    ],
  },
}

const HEADLINES: Record<RecheckPhase, { pre: string; accent: string }> = {
  monitoring: { pre: 'Every acceptance,', accent: 'gets verified' },
  probing: { pre: 'Verifying', accent: 'the live calendar' },
  reversed: { pre: 'Conflict found,', accent: 'handled in seconds' },
}

const SUBS: Record<RecheckPhase, string> = {
  monitoring: 'Accepting an offer re-checks live availability before anything is confirmed.',
  probing: 'Comparing the accepted window against every committed session.',
  reversed: 'The acceptance was reversed and the slot is already being re-offered.',
}

interface RecheckHeroProps {
  phase: RecheckPhase
  waiting: number
  declined: number
  recheckPending: number
  round: number
}

export function RecheckHero({ phase, waiting, declined, recheckPending, round }: RecheckHeroProps) {
  const t = THEMES[phase]
  const headline = HEADLINES[phase]
  const total = Math.max(1, waiting + declined + recheckPending)
  const waitingPct = (waiting / total) * 100
  const recheckPct = (recheckPending / total) * 100
  const declinedPct = Math.max(0, 100 - waitingPct - recheckPct)

  return (
    <PhaseHero theme={t.theme}>
      <div className="flex items-center justify-between gap-3">
        <div className={cn('flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] transition-colors duration-500', t.kicker)}>
          Dispatch round {round} · live
        </div>
        <Chip intent={t.chipIntent} light dot={t.chipDot} className="border-transparent">
          {t.chipLabel}
        </Chip>
      </div>

      <h2 className="mt-2 text-[19px] font-extrabold leading-snug tracking-tight text-white">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={phase}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="inline"
          >
            {headline.pre}{' '}
            <span className={cn('bg-gradient-to-r bg-clip-text text-transparent transition-all duration-500', t.gradient)}>
              {headline.accent}
            </span>
          </motion.span>
        </AnimatePresence>
      </h2>

      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={phase}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className={cn('mt-1 text-[12px] font-medium leading-relaxed transition-colors duration-500', t.sub)}
        >
          {SUBS[phase]}
        </motion.p>
      </AnimatePresence>

      <div className="mt-4">
        <div className={cn('text-[9px] font-extrabold uppercase tracking-[0.18em] transition-colors duration-500', t.label)}>
          Offer pool
        </div>
        <div className="mt-2 flex h-2 gap-1 overflow-hidden rounded-full">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300"
            animate={{ width: `${waitingPct}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          <motion.div
            className="h-full rounded-full bg-amber-400"
            animate={{ width: `${recheckPct}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          <motion.div
            className="h-full rounded-full bg-white/25"
            animate={{ width: `${declinedPct}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
        <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1">
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-white">
            <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full transition-colors duration-500', t.waitingDot)} />
            {waiting} waiting
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-white">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            {recheckPending} re-check
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-white">
            <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full transition-colors duration-500', t.declinedDot)} />
            {declined} declined
          </span>
        </div>
      </div>

      <StatStrip
        className="mt-5"
        cells={[
          { key: 'waiting', value: waiting, label: 'Waiting', dot: cn('transition-colors duration-500', t.waitingDot), labelClassName: cn('transition-colors duration-500', t.statLabel) },
          { key: 'recheck', value: recheckPending, label: 'Re-check', dot: 'bg-amber-400', labelClassName: cn('transition-colors duration-500', t.statLabel) },
          { key: 'round', value: round, label: 'Round', dot: 'bg-teal-300', labelClassName: cn('transition-colors duration-500', t.statLabel) },
        ]}
      />

      <div className="mt-4 flex flex-wrap gap-1.5">
        {t.chips.map((c) => (
          <Chip key={c.label} intent={c.intent} light className="border-transparent">
            {c.label}
          </Chip>
        ))}
      </div>

      <div className="mt-4 rounded-2xl bg-white/[0.06] px-3.5 py-3 transition-colors duration-500">
        <div className="text-[13px] font-bold tracking-tight text-white">{recheckSubject.professional}</div>
        <div className={cn('mt-0.5 text-[11px] font-medium transition-colors duration-500', t.meta)}>
          {recheckSubject.role} · accepted at {recheckSubject.acceptedAt}
        </div>
      </div>
    </PhaseHero>
  )
}

type ProbeVisual = 'pending' | 'active' | 'done'

interface RecheckResolutionCardProps {
  phase: RecheckPhase
  probeIndex: number
  onRun: () => void
  onRowTap: (title: string, body: string) => void
}

export function RecheckResolutionCard({ phase, probeIndex, onRun }: RecheckResolutionCardProps) {
  const probeStateFor = (i: number): ProbeVisual => {
    if (phase === 'reversed') return 'done'
    if (phase === 'probing') {
      if (i < probeIndex) return 'done'
      if (i === probeIndex) return 'active'
      return 'pending'
    }
    return 'pending'
  }

  return (
    <Card intent={phase === 'probing' ? 'warning' : phase === 'reversed' ? 'info' : 'neutral'}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <Tile
            icon={phase === 'probing' ? Loader2 : phase === 'reversed' ? CalendarX2 : ScanSearch}
            tone={phase === 'probing' ? 'warning' : phase === 'reversed' ? 'info' : 'neutral'}
            className={phase === 'probing' ? '[&_svg]:animate-spin' : undefined}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-bold tracking-tight text-[#0B211B]">
                Availability re-check
              </span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={phase}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="shrink-0"
                >
                  {phase === 'monitoring' && (
                    <Chip intent="warning" dot className="border-transparent">
                      Pending
                    </Chip>
                  )}
                  {phase === 'probing' && (
                    <Chip intent="warning" dot className="border-transparent">
                      Checking
                    </Chip>
                  )}
                  {phase === 'reversed' && (
                    <Chip intent="info" className="border-transparent">
                      Reversed
                    </Chip>
                  )}
                </motion.span>
              </AnimatePresence>
            </div>
            <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              {phase === 'reversed'
                ? recheckSubject.conflict
                : `${recheckSubject.offer} · accepted ${recheckSubject.acceptedAt}`}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-[#0B211B]/[0.035] px-3.5 py-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2.5">
              <CalendarClock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden />
              <span className="min-w-0 flex-1 text-[11.5px] font-semibold leading-snug text-[#0B211B]/75">
                Visit needs · {recheckSubject.visitWindow}
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CalendarCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-600" aria-hidden />
              <span className="min-w-0 flex-1 text-[11.5px] font-semibold leading-snug text-[#0B211B]/75">
                Personal window · {recheckSubject.personalWindow}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <StepList
            nodeStyle="circle"
            nodeSize="md"
            theme="light"
            activeStyle="spinner"
            railClassName="bg-[#0B211B]/[0.08]"
            steps={probeSteps.map((step, i) => {
              const state = probeStateFor(i)
              return {
                key: step.title,
                state: state === 'active' ? 'active' : state,
                title: step.title,
                titleClassName: 'text-[12.5px]',
                body: step.body,
                bodyClassName: 'text-[11px]',
                contentClassName: i === probeSteps.length - 1 ? 'pb-0.5' : 'pb-3',
              }
            })}
          />
        </div>

        {phase === 'reversed' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mt-4 flex items-start gap-2.5 rounded-2xl bg-sky-500/[0.08] px-3.5 py-3"
          >
            <SearchCheck className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" strokeWidth={2.4} aria-hidden />
            <p className="min-w-0 flex-1 text-[11.5px] font-semibold leading-relaxed text-sky-700">
              Acceptance reversed within seconds. The slot re-entered dispatch and Suresh keeps a clean record.
            </p>
          </motion.div>
        )}

        {phase === 'monitoring' && (
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={onRun}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
          >
            <ScanSearch className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            Run availability re-check
          </motion.button>
        )}
      </div>
    </Card>
  )
}

type NotifyFn = (payload: {
  title: string
  body: string
  kind: 'ok' | 'warn'
}) => void

const rules: { icon: LucideIcon; intent: Intent; title: string; body: string; notifyBody: string; kind: 'ok' | 'warn' }[] = [
  {
    icon: Zap,
    intent: 'success',
    title: 'Instant acceptance',
    body: 'Free in the window · confirmed on the spot',
    notifyBody: 'Free in the window · acceptance confirmed instantly',
    kind: 'ok',
  },
  {
    icon: AlertTriangle,
    intent: 'warning',
    title: 'Conflict reversal',
    body: 'New conflict · offer reversed, re-dispatched',
    notifyBody: 'New conflict found · offer reversed, session re-dispatched',
    kind: 'warn',
  },
  {
    icon: ScrollText,
    intent: 'info',
    title: 'Transparent logging',
    body: 'Every outcome logged · visible to family',
    notifyBody: 'Every outcome is logged and shown to the family transparently',
    kind: 'ok',
  },
]

interface RecheckRulesListProps {
  notify: NotifyFn
}

export function RecheckRulesList({ notify }: RecheckRulesListProps) {
  return (
    <motion.div variants={rise}>
      <Card>
        {rules.map((r, i) => (
          <Row
            key={r.title}
            leading={
              <span className="flex shrink-0 items-center gap-3">
                <span className="flex w-6 shrink-0 flex-col items-center">
                  <span className="text-[10px] font-extrabold tabular-nums text-emerald-600/60">{String(i + 1).padStart(2, '0')}</span>
                  {i < rules.length - 1 && <span aria-hidden className="mt-1 w-px flex-1 bg-[#0B211B]/10" />}
                </span>
                <Tile icon={r.icon} tone={r.intent} size="sm" />
              </span>
            }
            title={r.title}
            titleClassName="text-[13px]"
            subtitle={r.body}
            subtitleClassName="text-xs text-[#0B211B]/55"
            surface="none"
            padding="none"
            className='py-3'
            hoverClassName=""
            onClick={() => notify({ title: `Rule: ${r.title.toLowerCase()}`, body: r.notifyBody, kind: r.kind })}
          />
        ))}
      </Card>
    </motion.div>
  )
}
