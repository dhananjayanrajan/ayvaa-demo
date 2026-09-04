import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

type Props = {
  label: string
  time: string
  active: boolean
  onSelect: () => void
}

export function WindowOption({ label, time, active, onSelect }: Props) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.985 }}
      onClick={onSelect}
      aria-pressed={active}
      className={cn(
        'flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors',
        active ? 'bg-emerald-500/[0.08]' : 'bg-[#0B211B]/[0.03] hover:bg-[#0B211B]/[0.055]',
      )}
    >
      <span
        className={cn(
          'grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full',
          active ? 'bg-emerald-500' : 'bg-[#0B211B]/[0.12]',
        )}
      >
        {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
      </span>
      <span
        className={cn(
          'min-w-0 flex-1 text-[13px] font-bold tracking-tight',
          active ? 'text-emerald-800' : 'text-[#0B211B]/70',
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          'shrink-0 font-mono text-[11px] font-bold tabular-nums',
          active ? 'text-emerald-700' : 'text-[#0B211B]/45',
        )}
      >
        {time}
      </span>
    </motion.button>
  )
}
