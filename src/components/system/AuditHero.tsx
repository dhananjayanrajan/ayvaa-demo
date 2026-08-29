import { AnimatePresence, motion } from 'motion/react'
import { Chip } from '@/components/phone/kit'
import type { Intent } from '@/components/phone/kit'
import { cn } from '@/lib/utils'

export type ChainPhase = 'sealed' | 'verifying' | 'verified'

type HeroTheme = {
  card: string
  border: string
  orbA: string
  orbB: string
  hairline: string
  kicker: string
  gradient: string
  sub: string
  label: string
  chipIntent: Intent
  chipLabel: string
  chipDot: boolean
  statDot: string
  statLabel: string
  chips: { intent: Intent; label: string }[]
}

const THEMES: Record<ChainPhase, HeroTheme> = {
  sealed: {
    card: 'bg-[#0B231C]',
    border: 'border-emerald-200/10',
    orbA: 'bg-emerald-400/25',
    orbB: 'bg-teal-300/15',
    hairline: 'via-emerald-200/40',
    kicker: 'text-emerald-200/50',
    gradient: 'from-emerald-300 to-teal-200',
    sub: 'text-emerald-100/55',
    label: 'text-emerald-100/45',
    chipIntent: 'info',
    chipLabel: 'Ledger sealed',
    chipDot: false,
    statDot: 'bg-teal-300',
    statLabel: 'text-emerald-100/45',
    chips: [
      { intent: 'info', label: 'Immutable' },
      { intent: 'success', label: 'Tamper-evident' },
    ],
  },
  verifying: {
    card: 'bg-[#241B0C]',
    border: 'border-amber-200/15',
    orbA: 'bg-amber-400/25',
    orbB: 'bg-orange-400/12',
    hairline: 'via-amber-200/40',
    kicker: 'text-amber-200/60',
    gradient: 'from-amber-200 to-orange-200',
    sub: 'text-amber-100/60',
    label: 'text-amber-100/50',
    chipIntent: 'warning',
    chipLabel: 'Verifying seals',
    chipDot: true,
    statDot: 'bg-amber-300',
    statLabel: 'text-amber-100/50',
    chips: [
      { intent: 'warning', label: 'Re-hashing' },
      { intent: 'warning', label: 'Link by link' },
    ],
  },
  verified: {
    card: 'bg-[#062419]',
    border: 'border-emerald-300/20',
    orbA: 'bg-emerald-400/30',
    orbB: 'bg-teal-300/20',
    hairline: 'via-emerald-300/50',
    kicker: 'text-emerald-300/70',
    gradient: 'from-emerald-300 to-teal-200',
    sub: 'text-emerald-100/65',
    label: 'text-emerald-100/50',
    chipIntent: 'success',
    chipLabel: 'Chain verified',
    chipDot: false,
    statDot: 'bg-emerald-300',
    statLabel: 'text-emerald-100/50',
    chips: [
      { intent: 'success', label: 'Every seal intact' },
      { intent: 'success', label: 'Zero tampering' },
    ],
  },
}

const HEADLINES: Record<ChainPhase, { pre: string; accent: string }> = {
  sealed: { pre: 'Reads are', accent: 'records too' },
  verifying: { pre: 'Re-hashing', accent: 'the whole chain' },
  verified: { pre: 'Verified —', accent: 'not one seal broken' },
}

const SUBS: Record<ChainPhase, string> = {
  sealed: 'Every access, change and consent is sealed the moment it happens.',
  verifying: 'Each entry is re-hashed and compared to the seal of the one before it.',
  verified: 'Every seal matches. The ledger has never been touched.',
}

interface AuditHeroProps {
  phase: ChainPhase
  verifiedCount: number
  totalCount: number
  onVerify: () => void
}

export function AuditHero({ phase, verifiedCount, totalCount }: AuditHeroProps) {
  const t = THEMES[phase]
  const headline = HEADLINES[phase]

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
            Personal audit ledger · 24 hours
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
          <div className="flex items-center justify-between gap-2">
            <span className={cn('text-[9px] font-extrabold uppercase tracking-[0.18em] transition-colors duration-500', t.label)}>
              Seals verified
            </span>
            <span className="text-[10px] font-extrabold tabular-nums text-white">
              {verifiedCount}/{totalCount}
            </span>
          </div>
          <div className="mt-2 flex gap-1">
            {Array.from({ length: totalCount }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  'h-1.5 flex-1 rounded-full transition-colors duration-300',
                  i < verifiedCount
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-300'
                    : phase === 'verifying' && i === verifiedCount
                      ? 'relative overflow-hidden bg-amber-300/25'
                      : 'bg-white/15',
                )}
              >
                {phase === 'verifying' && i === verifiedCount && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-amber-300"
                    animate={{ opacity: [1, 0.25, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.08]">
          <div className="flex flex-col gap-1.5 px-3 first:pl-0">
            <div className="flex items-center gap-1.5 text-[15px] font-extrabold tabular-nums leading-none text-white">
              <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full transition-colors duration-500', t.statDot)} />
              12
            </div>
            <div className={cn('text-[9px] font-bold uppercase tracking-[0.16em] transition-colors duration-500', t.statLabel)}>
              Accesses
            </div>
          </div>
          <div className="flex flex-col gap-1.5 px-3">
            <div className="flex items-center gap-1.5 text-[15px] font-extrabold tabular-nums leading-none text-white">
              <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full transition-colors duration-500', t.statDot)} />
              3
            </div>
            <div className={cn('text-[9px] font-bold uppercase tracking-[0.16em] transition-colors duration-500', t.statLabel)}>
              Changes
            </div>
          </div>
          <div className="flex flex-col gap-1.5 px-3">
            <div className="flex items-center gap-1.5 text-[15px] font-extrabold tabular-nums leading-none text-white">
              <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full transition-colors duration-500', t.statDot)} />
              0
            </div>
            <div className={cn('text-[9px] font-bold uppercase tracking-[0.16em] transition-colors duration-500', t.statLabel)}>
              Tampered
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
