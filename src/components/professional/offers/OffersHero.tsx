import { motion } from 'motion/react'
import { Chip, Hero } from '@/components/phone/kit'
import { cn } from '@/lib/utils'

interface OffersHeroProps {
  activeCount: number
  accepting: boolean
  round: string
  expiresAt: string
  onToggleAccepting: () => void
}

export function OffersHero({ activeCount, accepting, round, expiresAt, onToggleAccepting }: OffersHeroProps) {
  const theme = accepting
    ? {
        bg: 'bg-[#0B231C]',
        border: 'border-emerald-200/10',
        glow: 'bg-emerald-400/25',
        kicker: 'text-emerald-200/50',
        title: 'text-white',
        titleGradient: 'from-emerald-300 to-teal-200',
        subtitle: 'text-emerald-100/55',
        chipIntent: 'live' as const,
        chipLabel: 'Accepting',
        chipDot: true,
        statusDot: 'bg-emerald-300',
        statusText: 'Accepting offers',
        toggleBg: 'bg-emerald-400',
        toggleBall: 'left-6',
      }
    : {
        bg: 'bg-[#3A2A0B]',
        border: 'border-amber-200/10',
        glow: 'bg-amber-400/25',
        kicker: 'text-amber-200/50',
        title: 'text-white',
        titleGradient: 'from-amber-300 to-orange-200',
        subtitle: 'text-amber-100/55',
        chipIntent: 'warning' as const,
        chipLabel: 'Paused',
        chipDot: false,
        statusDot: 'bg-amber-300',
        statusText: 'Paused — you receive nothing until you resume',
        toggleBg: 'bg-white/20',
        toggleBall: 'left-1',
      }

  return (
    <Hero className={cn(theme.bg, theme.border)}>
      <div aria-hidden className={cn('pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full blur-3xl', theme.glow)} />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className={cn('text-[9px] font-extrabold uppercase tracking-[0.22em]', theme.kicker)}>
            Dispatch · realtime
          </div>
          <Chip intent={theme.chipIntent} light dot={theme.chipDot} className="shrink-0 border-transparent">
            {theme.chipLabel}
          </Chip>
        </div>
        <h2 className={cn('mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight', theme.title)}>
          {activeCount} offer{activeCount === 1 ? '' : 's'}{' '}
          <span className={cn('bg-gradient-to-r bg-clip-text text-transparent', theme.titleGradient)}>
            waiting on you
          </span>
        </h2>
        <p className={cn('mt-1 text-[12px] font-medium leading-relaxed', theme.subtitle)}>
          Round {round} · offers expire at {expiresAt}. First to accept wins the slot.
        </p>

        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3.5">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            {accepting && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
            )}
            <span className={cn('relative inline-flex h-2.5 w-2.5 rounded-full', theme.statusDot)} />
          </span>
          <span className={cn('min-w-0 flex-1 text-[13px] font-bold', theme.subtitle)}>
            {theme.statusText}
          </span>
          <button
            type="button"
            onClick={onToggleAccepting}
            aria-label="Toggle accepting offers"
            className={cn(
              'relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-emerald-300/50',
              theme.toggleBg,
            )}
          >
            <motion.span
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className={cn(
                'absolute top-1 h-5 w-5 rounded-full bg-white shadow',
                theme.toggleBall,
              )}
            />
          </button>
        </div>
      </div>
    </Hero>
  )
}
