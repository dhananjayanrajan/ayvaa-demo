import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Category {
  label: string
  icon: LucideIcon
}

interface PartnerCareCategoryGridProps {
  categories: Category[]
  selected: string
  onSelect: (label: string) => void
}

export function PartnerCareCategoryGrid({ categories, selected, onSelect }: PartnerCareCategoryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {categories.map((c) => {
        const active = selected === c.label
        return (
          <motion.button
            key={c.label}
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(c.label)}
            className={cn(
              'relative flex items-center gap-2.5 rounded-2xl p-3.5 text-left transition-all',
              active
                ? 'bg-emerald-500/[0.12] ring-2 ring-emerald-500/60 shadow-[0_10px_24px_-14px_rgba(16,185,129,0.8)]'
                : 'bg-white ring-1 ring-inset ring-[#0B211B]/[0.08] hover:ring-[#0B211B]/[0.18]',
            )}
          >
            <span
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl',
                active
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_6px_14px_-6px_rgba(16,185,129,0.8)]'
                  : 'bg-[#0B211B]/[0.05] text-[#0B211B]/55',
              )}
            >
              <c.icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
            </span>
            <span
              className={cn(
                'min-w-0 flex-1 text-[12px] font-bold leading-tight tracking-tight',
                active ? 'text-emerald-800' : 'text-[#0B211B]/70',
              )}
            >
              {c.label}
            </span>
            {active && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-white shadow-[0_4px_10px_-4px_rgba(16,185,129,0.8)]"
              >
                <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
              </motion.span>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
