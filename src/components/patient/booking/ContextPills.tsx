import { motion } from 'motion/react'
import { CalendarDays, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ContextPills({
  lovedFirstName,
  category,
  days,
  windowLabel,
  onOpenWho,
  onOpenTime,
}: {
  lovedFirstName: string
  category: string
  days: string[]
  windowLabel: string
  onOpenWho: () => void
  onOpenTime: () => void
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={onOpenWho}
        className="flex items-center justify-between gap-2 rounded-2xl bg-emerald-400/[0.14] px-3.5 py-2.5 text-left transition-colors hover:bg-emerald-400/[0.2]"
      >
        <span className="min-w-0">
          <span className="block text-[8.5px] font-bold uppercase tracking-[0.12em] text-emerald-100/60">
            Receiving care
          </span>
          <span className="mt-0.5 block truncate text-[12px] font-extrabold leading-none text-white">
            {lovedFirstName}
          </span>
        </span>
        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-emerald-200/70" aria-hidden />
      </motion.button>

      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={onOpenTime}
        className="flex items-center justify-between gap-2 rounded-2xl bg-emerald-400/[0.14] px-3.5 py-2.5 text-left transition-colors hover:bg-emerald-400/[0.2]"
      >
        <span className="min-w-0">
          <span className="block text-[8.5px] font-bold uppercase tracking-[0.12em] text-emerald-100/60">
            Visit window
          </span>
          <span className="mt-0.5 block truncate text-[12px] font-extrabold leading-none text-white">
            {windowLabel}
          </span>
        </span>
        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-emerald-200/70" aria-hidden />
      </motion.button>

      <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
        <span className="block text-[8.5px] font-bold uppercase tracking-[0.12em] text-emerald-100/50">
          Support type
        </span>
        <span className="mt-0.5 block truncate text-[12px] font-extrabold leading-none text-emerald-50/85">
          {category}
        </span>
      </div>

      <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
        <span className="flex items-center gap-1.5 text-[8.5px] font-bold uppercase tracking-[0.12em] text-emerald-100/50">
          <CalendarDays className="h-2.5 w-2.5" aria-hidden />
          Days
        </span>
        <span
          className={cn(
            'mt-0.5 block truncate text-[12px] font-extrabold leading-none',
            days.length > 0 ? 'text-emerald-50/85' : 'text-amber-300/90',
          )}
        >
          {days.length > 0 ? days.join(', ') : 'Pick below'}
        </span>
      </div>
    </div>
  )
}
