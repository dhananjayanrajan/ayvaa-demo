import { AnimatePresence, motion } from 'motion/react'
import { Chip, StatStrip } from '@/components/base/phone/kit'
import type { Intent } from '@/components/base/phone/kit'
import { PHASE_THEME, PhaseHero } from '@/components/base/phone/phase-hero'
import { cn } from '@/lib/utils'

export type ChainPhase = 'sealed' | 'verifying' | 'verified'

type HeroTheme = {
  theme: (typeof PHASE_THEME)[keyof typeof PHASE_THEME]
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
    theme: PHASE_THEME.emerald,
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
    theme: PHASE_THEME.amber,
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
    theme: PHASE_THEME.emeraldBright,
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
    <PhaseHero theme={t.theme}>
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

      <StatStrip
        className="mt-5"
        cells={[
          { key: 'accesses', value: 12, label: 'Accesses', dot: cn('transition-colors duration-500', t.statDot), labelClassName: cn('transition-colors duration-500', t.statLabel) },
          { key: 'changes', value: 3, label: 'Changes', dot: cn('transition-colors duration-500', t.statDot), labelClassName: cn('transition-colors duration-500', t.statLabel) },
          { key: 'tampered', value: 0, label: 'Tampered', dot: cn('transition-colors duration-500', t.statDot), labelClassName: cn('transition-colors duration-500', t.statLabel) },
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
