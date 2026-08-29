import { AnimatePresence, motion } from 'motion/react'
import { Chip, Meter } from '@/components/phone/kit'
import type { Intent } from '@/components/phone/kit'
import { transactionMeta } from '@/data/systemTransactions'
import type { TransactionPhase } from '@/data/systemTransactions'
import { cn } from '@/lib/utils'

const TOTAL_WRITES = 4

type HeroTheme = {
  card: string
  border: string
  orbA: string
  orbB: string
  hairline: string
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
    card: 'bg-[#0B231C]',
    border: 'border-emerald-200/10',
    orbA: 'bg-emerald-400/25',
    orbB: 'bg-teal-300/15',
    hairline: 'via-emerald-200/40',
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
    card: 'bg-[#241B0C]',
    border: 'border-amber-200/15',
    orbA: 'bg-amber-400/25',
    orbB: 'bg-orange-400/12',
    hairline: 'via-amber-200/40',
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
    card: 'bg-[#062419]',
    border: 'border-emerald-300/20',
    orbA: 'bg-emerald-400/30',
    orbB: 'bg-teal-300/20',
    hairline: 'via-emerald-300/50',
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
    card: 'bg-[#230D14]',
    border: 'border-rose-200/15',
    orbA: 'bg-rose-500/25',
    orbB: 'bg-orange-400/10',
    hairline: 'via-rose-300/40',
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
    card: 'bg-[#230D14]',
    border: 'border-rose-200/15',
    orbA: 'bg-rose-500/30',
    orbB: 'bg-orange-400/12',
    hairline: 'via-rose-300/50',
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
    card: 'bg-[#230D14]',
    border: 'border-rose-200/10',
    orbA: 'bg-rose-500/25',
    orbB: 'bg-orange-400/10',
    hairline: 'via-rose-300/40',
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
    <div
      className={cn(
        'relative overflow-hidden rounded-[26px] border shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)] transition-colors duration-500',
        t.card,
        t.border,
      )}
    >
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full blur-3xl transition-colors duration-500',
          t.orbA,
        )}
      />
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full blur-3xl transition-colors duration-500',
          t.orbB,
        )}
      />
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent transition-colors duration-500',
          t.hairline,
        )}
      />

      <div className="relative p-5">
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

        <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.08]">
          <div className="flex flex-col gap-1.5 px-3 first:pl-0">
            <div className="flex items-center gap-1.5 text-[15px] font-extrabold tabular-nums leading-none text-white">
              <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full transition-colors duration-500', t.statDot)} />
              {doneWrites}
            </div>
            <div className={cn('text-[9px] font-bold uppercase tracking-[0.16em] transition-colors duration-500', t.statLabel)}>
              Writes
            </div>
          </div>
          <div className="flex flex-col gap-1.5 px-3">
            <div className="flex items-center gap-1.5 text-[15px] font-extrabold tabular-nums leading-none text-white">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              0
            </div>
            <div className={cn('text-[9px] font-bold uppercase tracking-[0.16em] transition-colors duration-500', t.statLabel)}>
              Partial
            </div>
          </div>
          <div className="flex flex-col gap-1.5 px-3">
            <div className="flex items-center gap-1.5 text-[15px] font-extrabold tabular-nums leading-none text-white">
              <span
                aria-hidden
                className={cn(
                  'h-1.5 w-1.5 rounded-full transition-colors duration-500',
                  phase === 'rolled-back' ? 'bg-rose-300/80' : t.statDot,
                )}
              />
              {outcome}
            </div>
            <div className={cn('text-[9px] font-bold uppercase tracking-[0.16em] transition-colors duration-500', t.statLabel)}>
              Took
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {t.chips.map((c) => (
            <Chip key={c.label} intent={c.intent} light className="border-transparent">
              {c.label}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  )
}
