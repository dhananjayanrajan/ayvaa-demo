import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

const filters = [
  { id: 'awaiting', label: 'Awaiting' },
  { id: 'approved', label: 'Approved' },
  { id: 'rejected', label: 'Rejected' },
]

interface FilterBarProps {
  value: string
  onChange: (v: string) => void
  layoutId?: string
}

export function FilterBar({ value, onChange, layoutId = 'filter-bar' }: FilterBarProps) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-[#0B211B]/[0.06] p-1" role="tablist">
      {filters.map((f) => {
        const active = value === f.id
        return (
          <motion.button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={active}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(f.id)}
            className="relative flex-1 rounded-full py-2.5"
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: 'spring', stiffness: 480, damping: 38 }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_8px_18px_-8px_rgba(16,185,129,0.7)]"
              />
            )}
            <span
              className={cn(
                'relative block truncate text-[10px] font-extrabold uppercase tracking-[0.08em]',
                active ? 'text-white' : 'text-[#0B211B]/45',
              )}
            >
              {f.label}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
