import { motion } from 'motion/react'
import type { Severity } from '@/data/incidentData'
import { cn } from '@/lib/utils'

type Props = {
  severities: Severity[]
  severity: Severity
  onSelect: (severity: Severity) => void
}

const activeTint: Record<Severity, string> = {
  Minor: 'bg-blue-500/[0.12] text-blue-700',
  Moderate: 'bg-amber-500/[0.16] text-amber-700',
  Critical: 'bg-rose-500/[0.14] text-rose-600',
}

export function SeveritySelector({ severities, severity, onSelect }: Props) {
  return (
    <div className="flex gap-2">
      {severities.map((s) => {
        const active = severity === s
        return (
          <motion.button
            key={s}
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(s)}
            aria-pressed={active}
            className={cn(
              'flex flex-1 items-center justify-center rounded-2xl py-3 text-[13px] font-extrabold tracking-tight transition-colors',
              active ? activeTint[s] : 'bg-[#0B211B]/[0.04] text-[#0B211B]/45',
            )}
          >
            {s}
          </motion.button>
        )
      })}
    </div>
  )
}
