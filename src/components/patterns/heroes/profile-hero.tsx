import { BadgeCheck, CalendarDays } from 'lucide-react'
import { Chip, Kicker } from '@/components/base/phone/kit'
import { cn } from '@/lib/utils'

type Props = {
  name: string
  role: string
  initials: string
  rating: number
  visits: number
  years: number
  openDays: number
}

export function ProfileHero({ name, role, initials, rating, visits, years, openDays }: Props) {
  return (
    <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-emerald-400/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-14 h-44 w-44 rounded-full bg-teal-300/15 blur-3xl" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />

      <div className="relative p-6 pb-5">
        <Kicker>Verified professional</Kicker>

        <div className="mt-5 flex items-start gap-4">
          <span className="relative shrink-0">
            <span className="grid h-24 w-24 place-items-center rounded-[26px] bg-gradient-to-br from-emerald-400/30 to-teal-400/20 text-[24px] font-black tabular-nums tracking-tight text-emerald-100 ring-1 ring-emerald-300/20">
              {initials}
            </span>
            <span className="absolute -bottom-1.5 -right-1.5 grid h-7 w-7 place-items-center rounded-full bg-emerald-400 ring-4 ring-[#0B231C]">
              <BadgeCheck className="h-4 w-4 text-[#062419]" strokeWidth={2.8} aria-hidden />
            </span>
          </span>
          <div className="min-w-0 flex-1 pt-1.5">
            <h2 className="break-words text-[19px] font-extrabold leading-snug tracking-tight text-white">{name}</h2>
            <p className="mt-1.5 text-[12px] font-medium leading-snug text-emerald-100/55">{role}</p>
          </div>
        </div>

        <div className="mt-7 flex items-start justify-between gap-4 px-1">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1">
              <span className="text-[20px] font-extrabold tabular-nums leading-none tracking-tight text-white">{rating}</span>
              <span className="text-[11px] leading-none text-amber-400" aria-hidden>
                ★
              </span>
            </div>
            <div className="mt-2 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Rating</div>
          </div>
          <div className="min-w-0">
            <div className="text-[20px] font-extrabold tabular-nums leading-none tracking-tight text-white">
              {visits.toLocaleString('en-IN')}
            </div>
            <div className="mt-2 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Visits</div>
          </div>
          <div className="min-w-0 text-right">
            <div className="text-[20px] font-extrabold tabular-nums leading-none tracking-tight text-white">
              <span className="tabular-nums">{years}</span>
              <span className="ml-1 text-[13px] font-extrabold tracking-tight text-emerald-100/70">yrs</span>
            </div>
            <div className="mt-2 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Experience</div>
          </div>
        </div>
      </div>

      <div aria-hidden className="relative h-px bg-white/[0.08]" />

      <div className="relative flex items-center gap-3 px-6 py-4">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-400/15 text-emerald-200">
          <CalendarDays className="h-4 w-4" strokeWidth={2.2} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Offer matching</div>
          <div className="mt-1 text-[13px] font-extrabold tracking-tight text-white">
            {openDays > 0 ? `Live on ${openDays} open days` : 'Paused, no open days'}
          </div>
        </div>
        <Chip
          intent={openDays > 0 ? 'live' : 'neutral'}
          light
          dot={openDays > 0}
          className={cn('shrink-0 border-transparent')}
        >
          {openDays > 0 ? 'Matching' : 'Off'}
        </Chip>
      </div>
    </div>
  )
}
