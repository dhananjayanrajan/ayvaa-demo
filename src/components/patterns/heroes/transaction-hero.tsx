import { AnimatePresence, motion } from 'motion/react'
import { Chip, Meter, StatStrip } from '@/components/base/phone/kit'
import type { Intent } from '@/components/base/phone/kit'
import { PHASE_THEME, PhaseHero } from '@/components/base/phone/phase-hero'
import { transactionMeta } from '@/data/system/transactions'
import type { TransactionPhase } from '@/data/system/transactions'
import { cn } from '@/lib/utils'

const TOTAL_WRITES = 4

type HeroTheme = {
  theme: (typeof PHASE_THEME)[keyof typeof PHASE_THEME]
  kicker: string
  gradient: string
  sub: string
  meta: string
  label: string
  count: string
  chipIntent: Intent
  chipLabel: string
  chipDot: boolean
  meterIntent: Intent
  statDot: string
  statLabel: string
  chips: { intent: Intent; label: string }[]
}

const THEMES: Record<TransactionPhase, HeroTheme> = {
  idle: {
    theme: PHASE_THEME.emerald,
    kicker: 'text-emerald-200/50',
    gradient: 'from-emerald-300 to-teal-200',
    sub: 'text-emerald-100/55',
    meta: 'text-emerald-100/55',
    label: 'text-emerald-100/45',
    count: 'text-emerald-100/70',
    chipIntent: 'info',
    chipLabel: 'Ready',
    chipDot: false,
    meterIntent: 'info',
    statDot: 'bg-teal-300',
    statLabel: 'text-emerald-100/45',
    chips: [
      { intent: 'info', label: 'Atomic write' },
      { intent: 'success', label: 'Sealed on commit' },
    ],
  },
  running: {
    theme: PHASE_THEME.amber,
    kicker: 'text-amber-200/60',
    gradient: 'from-amber-200 to-orange-200',
    sub: 'text-amber-100/60',
    meta: 'text-amber-100/60',
    label: 'text-amber-100/50',
    count: 'text-amber-100/80',
    chipIntent: 'warning',
    chipLabel: 'Writing',
    chipDot: true,
    meterIntent: 'warning',
    statDot: 'bg-amber-300',
    statLabel: 'text-amber-100/50',
    chips: [
      { intent: 'warning', label: 'Atomic' },
      { intent: 'warning', label: 'Isolated' },
    ],
  },
  committed: {
    theme: PHASE_THEME.emeraldBright,
    kicker: 'text-emerald-300/70',
    gradient: 'from-emerald-300 to-teal-200',
    sub: 'text-emerald-100/65',
    meta: 'text-emerald-100/60',
    label: 'text-emerald-100/50',
    count: 'text-emerald-200/80',
    chipIntent: 'success',
    chipLabel: 'Committed',
    chipDot: false,
    meterIntent: 'success',
    statDot: 'bg-emerald-300',
    statLabel: 'text-emerald-100/50',
    chips: [
      { intent: 'success', label: 'Series live' },
      { intent: 'success', label: 'Offers emitted' },
    ],
  },
  failing: {
    theme: PHASE_THEME.rose,
    kicker: 'text-rose-200/60',
    gradient: 'from-rose-300 to-orange-200',
    sub: 'text-rose-100/60',
    meta: 'text-rose-100/55',
    label: 'text-rose-100/50',
    count: 'text-rose-100/70',
    chipIntent: 'danger',
    chipLabel: 'Failed',
    chipDot: false,
    meterIntent: 'danger',
    statDot: 'bg-rose-300/80',
    statLabel: 'text-rose-100/50',
    chips: [
      { intent: 'danger', label: 'Rollback armed' },
      { intent: 'warning', label: 'Nothing partial' },
    ],
  },
  'rolling-back': {
    theme: PHASE_THEME.rose,
    kicker: 'text-rose-200/60',
    gradient: 'from-rose-300 to-orange-200',
    sub: 'text-rose-100/60',
    meta: 'text-rose-100/55',
    label: 'text-rose-100/50',
    count: 'text-rose-100/70',
    chipIntent: 'danger',
    chipLabel: 'Rolling back',
    chipDot: true,
    meterIntent: 'danger',
    statDot: 'bg-rose-300/80',
    statLabel: 'text-rose-100/50',
    chips: [
      { intent: 'danger', label: 'Reversing in order' },
      { intent: 'warning', label: '0 partial records' },
    ],
  },
  'rolled-back': {
    theme: PHASE_THEME.rose,
    kicker: 'text-rose-200/50',
    gradient: 'from-rose-300 to-orange-200',
    sub: 'text-rose-100/60',
    meta: 'text-rose-100/55',
    label: 'text-rose-100/45',
    count: 'text-rose-100/60',
    chipIntent: 'danger',
    chipLabel: 'Rolled back',
    chipDot: false,
    meterIntent: 'danger',
    statDot: 'bg-rose-300/80',
    statLabel: 'text-rose-100/45',
    chips: [
      { intent: 'danger', label: '0 partial records' },
      { intent: 'success', label: 'Attempt logged' },
    ],
  },
}

const HEADLINES: Record<TransactionPhase, { pre: string; accent: string }> = {
  idle: { pre: 'One booking,', accent: 'one safe write' },
  running: { pre: 'Writing', accent: 'the whole booking' },
  committed: { pre: 'Committed —', accent: 'nothing half-written' },
  failing: { pre: 'A write', accent: 'failed' },
  'rolling-back': { pre: 'Rolling it', accent: 'all the way back' },
  'rolled-back': { pre: 'Nothing was', accent: 'written' },
}

const SUBS: Record<TransactionPhase, string> = {
  idle: 'Watch a recurring booking commit as one atomic write — or break it on purpose.',
  running: 'Records are landing in order. The family sees nothing yet.',
  committed: 'Booking, series, sessions and audit sealed together. Offers are on their way.',
  failing: '',
  'rolling-back': 'Completed writes are reversing in order. Partial states are impossible.',
  'rolled-back': 'Every write reversed cleanly. The attempt itself is logged forever.',
}

interface TransactionHeroProps {
  phase: TransactionPhase
  doneWrites: number
  failedStep: number
}

export function TransactionHero({ phase, doneWrites, failedStep }: TransactionHeroProps) {
  const t = THEMES[phase]
  const headline = HEADLINES[phase]
  const outcome =
    phase === 'committed'
      ? transactionMeta.commitMs
      : phase === 'rolled-back'
        ? transactionMeta.rollbackMs
        : '—'

  return (
    <PhaseHero theme={t.theme}>
      <div className="flex items-center justify-between gap-3">
        <div className={cn('flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] transition-colors duration-500', t.kicker)}>
          Transaction {transactionMeta.id} · {transactionMeta.startedAt}
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
            <span
              className={cn(
                'bg-gradient-to-r bg-clip-text text-transparent transition-all duration-500',
                t.gradient,
              )}
            >
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
          {phase === 'failing'
            ? `Step ${failedStep} was rejected mid-transaction. Watch the unwind.`
            : SUBS[phase]}
        </motion.p>
      </AnimatePresence>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[13px] font-bold tracking-tight text-white">{transactionMeta.patient}</div>
          <div className={cn('mt-0.5 text-[11px] font-medium transition-colors duration-500', t.meta)}>
            {transactionMeta.careType}
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
          <Chip intent="neutral" light className="border-transparent">{transactionMeta.visitCount}</Chip>
          <Chip intent="neutral" light className="border-transparent">{transactionMeta.amount}</Chip>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between gap-2">
          <span className={cn('text-[9px] font-extrabold uppercase tracking-[0.18em] transition-colors duration-500', t.label)}>
            Sealed writes
          </span>
          <span className={cn('text-[10px] font-extrabold tabular-nums transition-colors duration-500', t.count)}>
            {doneWrites}/{TOTAL_WRITES}
          </span>
        </div>
        <Meter value={doneWrites / TOTAL_WRITES} intent={t.meterIntent} className="mt-2 bg-white/10" />
      </div>

      <StatStrip
        className="mt-5"
        cells={[
          { key: 'writes', value: doneWrites, label: 'Writes', dot: cn('transition-colors duration-500', t.statDot), labelClassName: cn('transition-colors duration-500', t.statLabel) },
          { key: 'partial', value: 0, label: 'Partial', dot: 'bg-emerald-300', labelClassName: cn('transition-colors duration-500', t.statLabel) },
          { key: 'took', value: outcome, label: 'Took', dot: cn('transition-colors duration-500', phase === 'rolled-back' ? 'bg-rose-300/80' : t.statDot), labelClassName: cn('transition-colors duration-500', t.statLabel) },
        ]}
      />

      <div className="mt-4 flex flex-wrap gap-1.5">
        {t.chips.map((c) => (
          <Chip key={c.label} intent={c.intent} light className="border-transparent">
            {c.label}
          </Chip>
        ))}
      </div>
    </PhaseHero>
  )
}
