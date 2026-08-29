import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

const days = [
  { id: 'mon', label: 'Mon', date: '10' },
  { id: 'tue', label: 'Tue', date: '11' },
  { id: 'wed', label: 'Wed', date: '12' },
  { id: 'thu', label: 'Thu', date: '13' },
  { id: 'fri', label: 'Fri', date: '14' },
  { id: 'sat', label: 'Sat', date: '15' },
  { id: 'sun', label: 'Sun', date: '16' },
]

interface DayFilterBarProps {
  value: string
  onChange: (id: string) => void
}

export function DayFilterBar({ value, onChange }: DayFilterBarProps) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-[#0B211B]/[0.06] p-1">
      {days.map((day) => {
        const active = value === day.id
        return (
          <motion.button
            key={day.id}
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(day.id)}
            className={cn(
              'relative flex-1 rounded-full px-1 py-2.5 transition-colors',
              active ? 'text-white' : 'text-[#0B211B]',
            )}
          >
            {active && (
              <motion.span
                layoutId="pr04-day-filter"
                transition={{ type: 'spring', stiffness: 480, damping: 38 }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_8px_18px_-8px_rgba(16,185,129,0.7)]"
              />
            )}
            <span className="relative flex flex-col items-center gap-0.5">
              <span className={cn('text-[8px] font-extrabold uppercase tracking-[0.12em]', active ? 'text-white/80' : 'text-[#0B211B]/40')}>
                {day.label}
              </span>
              <span className={cn('text-[13px] font-extrabold leading-none', active ? 'text-white' : 'text-[#0B211B]')}>
                {day.date}
              </span>
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
