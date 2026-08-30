import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export type VisitTab = 'upcoming' | 'completed' | 'missed'

interface VisitTabsProps {
  active: VisitTab
  counts: Record<VisitTab, number>
  onSelect: (tab: VisitTab) => void
}

const tabs: { id: VisitTab; label: string }[] = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'completed', label: 'Done' },
  { id: 'missed', label: 'Missed' },
]

export function VisitTabs({ active, counts, onSelect }: VisitTabsProps) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-[#0B211B]/[0.06] p-1" role="tablist">
      {tabs.map((t) => {
        const isActive = active === t.id
        return (
          <motion.button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(t.id)}
            className="relative flex-1 rounded-full py-2.5"
          >
            {isActive && (
              <motion.span
                layoutId="p15-tab"
                transition={{ type: 'spring', stiffness: 480, damping: 38 }}
                className="absolute inset-0 rounded-full bg-emerald-600 shadow-[0_8px_18px_-8px_rgba(5,120,85,0.8)]"
              />
            )}
            <span className="relative flex items-center justify-center gap-1.5">
              <span
                className={cn(
                  'text-[10px] font-extrabold uppercase tracking-[0.08em]',
                  isActive ? 'text-white' : 'text-[#0B211B]/45',
                )}
              >
                {t.label}
              </span>
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[9px] font-extrabold tabular-nums leading-none',
                  isActive ? 'bg-white/[0.2] text-white' : 'bg-[#0B211B]/[0.06] text-[#0B211B]/45',
                )}
              >
                {counts[t.id]}
              </span>
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
