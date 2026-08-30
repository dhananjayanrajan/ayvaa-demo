import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface FilterTabsProps {
  tabs: { id: string; label: string; count: number }[]
  value: string
  onChange: (id: string) => void
  layoutId: string
}

export function FilterTabs({ tabs, value, onChange, layoutId }: FilterTabsProps) {
  return (
    <div className="flex gap-1 rounded-full bg-[#0B211B]/[0.05] p-1" role="tablist">
      {tabs.map((tab) => {
        const active = value === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative min-w-0 flex-1 rounded-full px-1 py-2 text-[12px] font-bold transition-colors',
              active ? 'text-white' : 'text-[#0B211B]/50 hover:text-[#0B211B]/75',
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-[#0B211B]"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative flex items-baseline justify-center gap-1">
              <span>{tab.label}</span>
              <span className="text-[10px] font-extrabold tabular-nums opacity-60">{tab.count}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
