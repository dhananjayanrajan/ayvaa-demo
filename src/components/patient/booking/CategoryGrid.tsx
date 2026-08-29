import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { bookingCategories } from '@/data/patientBooking'

export function CategoryGrid({
  category,
  onSelect,
}: {
  category: string
  onSelect: (label: string) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {bookingCategories.map((c) => {
        const active = category === c.label
        const Icon = c.icon
        return (
          <motion.button
            key={c.label}
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(c.label)}
            aria-pressed={active}
            className={cn(
              'relative flex min-h-[76px] items-center gap-2.5 rounded-2xl p-3.5 text-left transition-colors',
              active
                ? 'bg-emerald-500/[0.1] shadow-[0_10px_24px_-14px_rgba(16,185,129,0.8)]'
                : 'bg-white shadow-[0_1px_2px_rgba(11,33,27,0.06),0_14px_32px_-22px_rgba(11,33,27,0.25)] hover:bg-emerald-500/[0.04]',
            )}
          >
            <span
              className={cn(
                'grid h-9 w-9 shrink-0 place-items-center rounded-xl',
                active
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_6px_14px_-6px_rgba(16,185,129,0.8)]'
                  : 'bg-[#0B211B]/[0.05] text-[#0B211B]/55',
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span
                className={cn(
                  'block text-[12px] font-bold leading-tight tracking-tight',
                  active ? 'text-emerald-800' : 'text-[#0B211B]/70',
                )}
              >
                {c.label}
              </span>
              <span className="mt-1 block text-pretty text-[9.5px] font-semibold leading-snug text-[#0B211B]/40">
                {c.hint}
              </span>
            </span>
            {active && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
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
