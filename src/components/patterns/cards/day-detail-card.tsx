import { motion } from 'motion/react'
import { CalendarCheck, CalendarOff, MapPin, ScrollText, SlidersHorizontal } from 'lucide-react'
import { Card, Chip } from '@/components/base/phone/kit'
import { useRouter } from '@/lib/router'
import { CAREGIVER, GOALS_LOGGED, WEEK, dayDetailLine, type VisitDay } from '@/data/patientCarePlan'
import { cn } from '@/lib/utils'

interface DayDetailCardProps {
  day: VisitDay
  onOpenVisit: () => void
  onOpenSummary: () => void
}

function WeekRhythm() {
  return (
    <div className="mx-auto mt-4 flex gap-1.5">
      {WEEK.map((d) => (
        <span
          key={d.id}
          aria-hidden
          className={cn(
            'grid h-7 flex-1 place-items-center rounded-lg text-[9px] font-extrabold uppercase',
            d.done
              ? 'bg-emerald-500/[0.14] text-emerald-700'
              : 'bg-[#0B211B]/[0.04] text-[#0B211B]/30',
          )}
        >
          {d.day[0]}
        </span>
      ))}
    </div>
  )
}

function RestDayState({ onManageSchedule }: { onManageSchedule: () => void }) {
  return (
    <div className="p-5 text-center">
      <span className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-[#0B211B]/[0.05]">
        <CalendarOff className="h-5 w-5 text-[#0B211B]/40" strokeWidth={2.2} aria-hidden />
      </span>
      <div className="mt-3 text-[14px] font-extrabold tracking-tight text-[#0B211B]">Rest day, no visit scheduled</div>
      <p className="mx-auto mt-1.5 max-w-[30ch] text-pretty text-[12px] font-medium leading-snug text-[#0B211B]/55">
        Care runs on the marked days below. The next visit is Monday at 9:00 AM with {CAREGIVER.firstName}.
      </p>

      <WeekRhythm />

      <motion.button
        type="button"
        whileTap={{ scale: 0.985 }}
        onClick={onManageSchedule}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-500/[0.12] py-3 text-[12.5px] font-extrabold text-sky-700"
      >
        <SlidersHorizontal className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        Change visit days
      </motion.button>
    </div>
  )
}

export function DayDetailCard({ day, onOpenVisit, onOpenSummary }: DayDetailCardProps) {
  const { navigate } = useRouter()

  if (!day.done) {
    return (
      <Card>
        <RestDayState onManageSchedule={() => navigate('/patient/p34')} />
      </Card>
    )
  }

  return (
    <Card>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">{day.full}</div>
            <div className="mt-0.5 text-xs font-semibold leading-snug text-[#0B211B]/50">{dayDetailLine(day)}</div>
          </div>
          <Chip intent="success" dot className="shrink-0">
            Completed
          </Chip>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-emerald-500/[0.1] px-4 py-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-500/[0.14]">
            <CalendarCheck className="h-4 w-4 text-emerald-700" strokeWidth={2.4} aria-hidden />
          </span>
          <span className="min-w-0 flex-1 text-[13px] font-bold text-emerald-800">All goals logged at this visit</span>
          <span className="shrink-0 text-[11px] font-extrabold tabular-nums text-emerald-700">
            {GOALS_LOGGED.done} of {GOALS_LOGGED.total}
          </span>
        </div>

        <div className="mt-3 flex gap-2.5">
          <button
            type="button"
            onClick={onOpenVisit}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
          >
            <ScrollText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Visit detail</span>
          </button>
          <button
            type="button"
            onClick={onOpenSummary}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
          >
            <MapPin className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Full summary</span>
          </button>
        </div>
      </div>
    </Card>
  )
}
