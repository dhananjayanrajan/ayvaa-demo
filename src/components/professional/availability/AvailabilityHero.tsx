import type { ReactNode } from 'react'
import { Clock } from 'lucide-react'
import { Chip, Kicker } from '@/components/phone/kit'

type Props = {
  openCount: number
  weeklyHours: number
  peakDay: string
  dirty: boolean
  children: ReactNode
}

export function AvailabilityHero({ openCount, weeklyHours, peakDay, dirty, children }: Props) {
  return (
    <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
      <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Kicker>
              <Clock className="h-3 w-3 text-emerald-300/80" aria-hidden />
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
      </div>
    </div>
  )
}
