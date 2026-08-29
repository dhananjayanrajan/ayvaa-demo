import { motion } from 'motion/react'
import { Languages, X } from 'lucide-react'

interface ActiveFilterStripProps {
  label: string
  onClear: () => void
}

export function ActiveFilterStrip({ label, onClear }: ActiveFilterStripProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-sky-500/[0.1] px-4 py-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-sky-500/[0.14]">
        <Languages className="h-4 w-4 text-sky-600" strokeWidth={2.4} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-sky-700/50">Language filter</span>
        <span className="mt-0.5 block truncate text-[12.5px] font-bold tracking-tight text-sky-800">{label} speakers only</span>
      </span>
      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={onClear}
        aria-label="Clear language filter"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sky-500/[0.12] text-sky-700"
      >
        <X className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden />
      </motion.button>
    </div>
  )
}
