import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { SHEET_MODES, type SheetMode } from './sheetData'
import { cn } from '@/lib/utils'

type Props = {
  mode: SheetMode
  saved: SheetMode[]
  onSelect: (mode: SheetMode) => void
}

export function ModeTabs({ mode, saved, onSelect }: Props) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-[#0B211B]/[0.06] p-1" role="tablist">
      {SHEET_MODES.map((m) => {
        const active = mode === m.id
        const done = saved.includes(m.id)
        const Icon = m.icon
        return (
          <motion.button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={active}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(m.id)}
            className="relative flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5"
          >
            {active && (
              <motion.span
                layoutId="pr07-mode"
                transition={{ type: 'spring', stiffness: 480, damping: 38 }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_8px_18px_-8px_rgba(16,185,129,0.7)]"
              />
            )}
            <Icon
              className={cn('relative h-3.5 w-3.5', active ? 'text-white' : 'text-[#0B211B]/45')}
              strokeWidth={2.4}
              aria-hidden
            />
            <span
              className={cn(
                'relative text-[9px] font-extrabold uppercase tracking-[0.12em]',
                active ? 'text-white' : 'text-[#0B211B]/45',
              )}
            >
              {m.label}
            </span>
            {done && !active && <Check className="relative h-3 w-3 text-emerald-600" strokeWidth={3.5} aria-hidden />}
          </motion.button>
        )
      })}
    </div>
  )
}
