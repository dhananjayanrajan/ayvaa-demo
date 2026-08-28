import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Kpi {
  icon: LucideIcon
  value: string
  label: string
  tint: string
  iconBg: string
  detail: string
}

interface PerformanceKpisProps {
  kpis: Kpi[]
  onSelect: (kpi: Kpi) => void
}

export function PerformanceKpis({ kpis, onSelect }: PerformanceKpisProps) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {kpis.map((k) => (
        <motion.button
          key={k.label}
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect(k)}
          className={cn(
            'rounded-2xl p-4 text-left outline-none transition-colors hover:bg-opacity-80 focus-visible:ring-2 focus-visible:ring-emerald-500/40',
            k.tint,
          )}
        >
          <span className={cn('flex h-8 w-8 items-center justify-center rounded-xl', k.iconBg)}>
            <k.icon className="h-4 w-4" strokeWidth={2.4} aria-hidden />
          </span>
          <div className="mt-3 text-[22px] font-extrabold tabular-nums leading-none tracking-tight text-[#0B211B]">{k.value}</div>
          <div className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/45">{k.label}</div>
        </motion.button>
      ))}
    </div>
  )
}
