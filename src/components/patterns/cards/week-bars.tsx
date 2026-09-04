import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { hoursFor, type DayAvailability } from '@/data/availabilityData'

type Props = {
  days: DayAvailability[]
  selected: number
  onSelect: (index: number) => void
}

export function WeekBars({ days, selected, onSelect }: Props) {
  return (
    <div className="flex h-28 items-end gap-2">
      {days.map((d, i) => {
        const hrs = hoursFor(d.hours)
        const isActive = i === selected
        const pct = Math.max(6, (hrs / 12) * 100)
        return (
          <motion.button
            key={d.day}
            type="button"
            whileTap={{ scale: 0.93 }}
            onClick={() => onSelect(i)}
            aria-label={`${d.day}, ${d.off ? 'off' : d.hours}`}
            className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5"
          >
            <span
              className={cn(
                'text-[9px] font-extrabold tabular-nums',
                isActive ? 'text-white' : d.off ? 'text-emerald-100/25' : 'text-emerald-100/55',
              )}
            >
              {d.off ? '—' : `${hrs}h`}
            </span>
            <span className="flex h-full w-full items-end overflow-hidden rounded-t-xl bg-white/[0.06]">
              <motion.span
                initial={{ height: 0 }}
                animate={{ height: d.off ? '6%' : `${pct}%` }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: 'easeOut' }}
                className={cn(
                  'w-full rounded-t-xl',
                  d.off
                    ? 'bg-white/[0.1]'
                    : isActive
                      ? 'bg-gradient-to-t from-emerald-400 to-teal-300 shadow-[0_-8px_20px_-8px_rgba(52,211,153,0.7)]'
                      : 'bg-gradient-to-t from-emerald-500/60 to-teal-400/50',
                )}
              />
            </span>
            <span
              className={cn(
                'text-[9px] font-extrabold uppercase tracking-wide',
                isActive ? 'text-white' : 'text-emerald-100/40',
              )}
            >
              {d.day.slice(0, 3)}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
