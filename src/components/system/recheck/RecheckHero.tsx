import { AnimatePresence, motion } from 'motion/react'
import { Chip } from '@/components/phone/kit'
import type { Intent } from '@/components/phone/kit'
import { recheckSubject } from '@/data/system/recheck'
import type { RecheckPhase } from '@/data/system/recheck'
import { cn } from '@/lib/utils'

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
    card: 'bg-[#0B1E2B]',
    border: 'border-sky-200/15',
    orbA: 'bg-sky-400/25',
    orbB: 'bg-blue-400/12',
    hairline: 'via-sky-200/40',
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
    <div
      className={cn(
        'relative overflow-hidden rounded-[26px] border shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)] transition-colors duration-500',
        t.card,
        t.border,
      )}
    >
      <div
        aria-hidden
        className={cn('pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full blur-3xl transition-colors duration-500', t.orbA)}
      />
      <div
        aria-hidden
        className={cn('pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full blur-3xl transition-colors duration-500', t.orbB)}
      />
      <div
        aria-hidden
        className={cn('pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent transition-colors duration-500', t.hairline)}
      />

      <div className="relative p-5">
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

        <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.08]">
          <div className="flex flex-col gap-1.5 px-3 first:pl-0">
            <div className="flex items-center gap-1.5 text-[15px] font-extrabold tabular-nums leading-none text-white">
              <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full transition-colors duration-500', t.waitingDot)} />
              {waiting}
            </div>
            <div className={cn('text-[9px] font-bold uppercase tracking-[0.16em] transition-colors duration-500', t.statLabel)}>
              Waiting
            </div>
          </div>
          <div className="flex flex-col gap-1.5 px-3">
            <div className="flex items-center gap-1.5 text-[15px] font-extrabold tabular-nums leading-none text-white">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              {recheckPending}
            </div>
            <div className={cn('text-[9px] font-bold uppercase tracking-[0.16em] transition-colors duration-500', t.statLabel)}>
              Re-check
            </div>
          </div>
          <div className="flex flex-col gap-1.5 px-3">
            <div className="flex items-center gap-1.5 text-[15px] font-extrabold tabular-nums leading-none text-white">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-teal-300" />
              {round}
            </div>
            <div className={cn('text-[9px] font-bold uppercase tracking-[0.16em] transition-colors duration-500', t.statLabel)}>
              Round
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

        <div className={cn('mt-4 rounded-2xl bg-white/[0.06] px-3.5 py-3 transition-colors duration-500')}>
          <div className="text-[13px] font-bold tracking-tight text-white">{recheckSubject.professional}</div>
          <div className={cn('mt-0.5 text-[11px] font-medium transition-colors duration-500', t.meta)}>
            {recheckSubject.role} · accepted at {recheckSubject.acceptedAt}
          </div>
        </div>
      </div>
    </div>
  )
}
