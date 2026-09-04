import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { CategoryChip } from '@/data/patientCatalogue'

export function CategoryRail({
  chips,
  category,
  onSelect,
}: {
  chips: CategoryChip[]
  category: string
  onSelect: (c: string) => void
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {chips.map((chip) => {
        const active = category === chip.label
        return (
          <motion.button
            key={chip.label}
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={() => onSelect(chip.label)}
            aria-pressed={active}
            className={cn(
              'flex h-9 shrink-0 items-center gap-2 rounded-full pl-4 pr-3 text-[11px] font-extrabold tracking-tight transition-colors',
              active
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_8px_18px_-8px_rgba(16,185,129,0.7)]'
                : 'bg-[#0B211B]/[0.05] text-[#0B211B]/60 hover:bg-[#0B211B]/[0.08]',
            )}
          >
            {chip.label}
            <span
              className={cn(
                'grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[9.5px] font-extrabold tabular-nums',
                active ? 'bg-white/[0.2] text-white' : 'bg-[#0B211B]/[0.06] text-[#0B211B]/45',
              )}
            >
              {chip.count}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
