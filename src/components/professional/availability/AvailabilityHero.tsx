import type { ReactNode } from 'react'
import { Clock } from 'lucide-react'
import { Chip, Hero, Kicker } from '@/components/phone/kit'

type Props = {
  openCount: number
  weeklyHours: number
  peakDay: string
  dirty: boolean
  children: ReactNode
}

export function AvailabilityHero({ openCount, weeklyHours, peakDay, dirty, children }: Props) {
  return (
    <Hero>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Kicker>
            <Clock className="h-3 w-3" aria-hidden />
            Matching window · this week
          </Kicker>
          <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
            {openCount} of 7 days{' '}
            <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">open</span>
          </h2>
          <p className="mt-0.5 text-[11px] font-semibold text-emerald-100/50">
            {dirty ? 'Unsaved edits · save to apply' : 'Tap a day below to edit its window'}
          </p>
        </div>
        <Chip intent={dirty ? 'info' : 'live'} light dot className="shrink-0">
          {dirty ? 'Draft' : 'Matching'}
        </Chip>
      </div>

      <div className="mt-5">{children}</div>

      <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-white/[0.04] px-4 py-3">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-200/60">Weekly hours</span>
          <span className="text-[15px] font-extrabold tabular-nums leading-none text-white">{weeklyHours}h</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-200/60">Longest day</span>
          <span className="text-[15px] font-extrabold tabular-nums leading-none text-white">{peakDay}</span>
        </div>
      </div>
    </Hero>
  )
}
