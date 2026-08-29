import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { FilterKey } from '@/data/patientNotifications'

export function FilterTabs({
  filter,
  totalCount,
  actionCount,
  onSelect,
}: {
  filter: FilterKey
  totalCount: number
  actionCount: number
  onSelect: (f: FilterKey) => void
}) {
  const tabs: { key: FilterKey; label: string; count: number }[] = [
    { key: 'all', label: 'Everything', count: totalCount },
    { key: 'action', label: 'Needs action', count: actionCount },
  ]
  return (
    <div className="flex gap-1 rounded-full bg-[#0B211B]/[0.05] p-1" role="tablist">
      {tabs.map((tab) => {
        const active = filter === tab.key
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(tab.key)}
            className="relative flex-1 rounded-full px-2 py-2"
          >
            {active && (
              <motion.span
                layoutId="p07-filter-pill"
                transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                className="absolute inset-0 rounded-full bg-white shadow-[0_6px_16px_-8px_rgba(11,33,27,0.4)]"
              />
            )}
            <span
              className={cn(
                'relative block truncate text-[10px] font-extrabold uppercase tracking-[0.1em] transition-colors duration-200',
                active ? 'text-emerald-700' : 'text-[#0B211B]/40',
              )}
            >
              {tab.label} · {tab.count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
