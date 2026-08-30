import { motion } from 'motion/react'
import { FILTERS, type FilterId } from './historyData'
import { cn } from '@/lib/utils'

type Props = {
  filter: FilterId
  counts: Record<FilterId, number>
  onSelect: (filter: FilterId) => void
}

export function FilterTabs({ filter, counts, onSelect }: Props) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-[#0B211B]/[0.06] p-1" role="tablist">
      {FILTERS.map((f) => {
        const active = filter === f.id
        return (
          <motion.button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={active}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(f.id)}
            className="relative flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5"
          >
            {active && (
              <motion.span
                layoutId="pr12-filter"
                transition={{ type: 'spring', stiffness: 480, damping: 38 }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_8px_18px_-8px_rgba(16,185,129,0.7)]"
              />
            )}
            <span
              className={cn(
                'relative block truncate text-[9px] font-extrabold uppercase tracking-[0.16em]',
                active ? 'text-white' : 'text-[#0B211B]/45',
              )}
            >
              {f.label}
            </span>
            <span
              className={cn(
                'relative rounded-full px-1.5 py-0.5 text-[8.5px] font-extrabold tabular-nums',
                active ? 'bg-white/20 text-white' : 'bg-[#0B211B]/[0.06] text-[#0B211B]/40',
              )}
            >
              {counts[f.id]}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
