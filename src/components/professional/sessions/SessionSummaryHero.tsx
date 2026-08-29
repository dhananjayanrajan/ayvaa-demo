import { Chip, Hero, Kicker, Stat } from '@/components/phone/kit'
import { cn } from '@/lib/utils'

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

      <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.08]">
        <Stat label="Live" value={liveCount} dot={theme.statLive} />
        <Stat label="Upcoming" value={upcomingCount} dot={theme.statUpcoming} />
        <Stat label="Total" value={totalCount} dot={theme.statTotal} />
      </div>
    </Hero>
  )
}
