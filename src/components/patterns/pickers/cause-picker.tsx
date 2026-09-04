import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import type { SeverityConfig } from '@/data/incidentData'
import { cn } from '@/lib/utils'

type Props = {
  causes: string[]
  cause: string
  config: SeverityConfig
  onSelect: (cause: string) => void
}

export function CausePicker({ causes, cause, config, onSelect }: Props) {
  return (
    <div>
      <div className="mb-2 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">What happened</div>
      <div className="flex flex-wrap gap-2">
        {causes.map((c) => {
          const active = cause === c
          return (
            <motion.button
              key={c}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(c)}
              aria-pressed={active}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-bold transition-colors',
                active ? config.causeActive : 'bg-[#0B211B]/[0.045] text-[#0B211B]/55',
              )}
            >
              {active && <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />}
              {c}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
