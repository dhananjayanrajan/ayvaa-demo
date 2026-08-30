import { motion } from 'motion/react'
import { AccentHero } from '@/components/admin/ui/AccentHero'
import { CAREGIVER, WEEK, completedVisits, maxVisitMinutes } from '@/data/patientCarePlan'
import { cn } from '@/lib/utils'

interface WeekVisitsCardProps {
  selected: number
  onSelect: (index: number) => void
}

export function WeekVisitsCard({ selected, onSelect }: WeekVisitsCardProps) {
  const done = completedVisits()
  const max = maxVisitMinutes()

  return (
    <AccentHero tone="emerald">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">This week's visits</span>
          <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
            {done} of {done}{' '}
            <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">completed</span>
          </h2>
          <p className="mt-0.5 text-[11px] font-semibold text-emerald-100/50">Tap a day to see its visit</p>
        </div>
      </div>

      <div className="mt-5 flex h-28 items-end gap-2">
        {WEEK.map((w, i) => {
          const isActive = i === selected
          const pct = Math.max(6, ((w.minutes ?? 0) / max) * 100)
          return (
            <motion.button
              key={w.id}
              type="button"
              whileTap={{ scale: 0.93 }}
              onClick={() => onSelect(i)}
              aria-label={`${w.full}, ${w.done ? `visit completed, ${w.minutes} minutes` : 'no visit'}`}
              aria-pressed={isActive}
              className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5"
            >
              <span
                className={cn(
                  'text-[9px] font-extrabold tabular-nums',
                  isActive ? 'text-white' : w.done ? 'text-emerald-100/55' : 'text-emerald-100/25',
                )}
              >
                {w.done ? `${w.minutes}m` : '—'}
              </span>
              <span className="flex h-full w-full items-end overflow-hidden rounded-t-xl bg-white/[0.06]">
                <motion.span
                  initial={{ height: 0 }}
                  animate={{ height: w.done ? `${pct}%` : '6%' }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: 'easeOut' }}
                  className={cn(
                    'w-full rounded-t-xl',
                    w.done
                      ? isActive
                        ? 'bg-gradient-to-t from-emerald-400 to-teal-300 shadow-[0_-8px_20px_-8px_rgba(52,211,153,0.7)]'
                        : 'bg-gradient-to-t from-emerald-500/60 to-teal-400/50'
                      : 'bg-white/[0.1]',
                  )}
                />
              </span>
              <span
                className={cn(
                  'text-[9px] font-extrabold uppercase tracking-wide',
                  isActive ? 'text-white' : 'text-emerald-100/40',
                )}
              >
                {w.day}
              </span>
            </motion.button>
          )
        })}
      </div>

      <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-white/[0.04] px-3.5 py-2.5">
        <span className="min-w-0 flex-1 truncate text-[11px] font-bold text-emerald-50/80">
          Next visit, Monday 9:00 AM with {CAREGIVER.firstName}
        </span>
      </div>
    </AccentHero>
  )
}
