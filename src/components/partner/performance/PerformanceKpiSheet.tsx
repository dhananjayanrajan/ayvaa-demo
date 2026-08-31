import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SheetShell } from '@/components/phone/SheetShell'
import { cn } from '@/lib/utils'

interface Kpi {
  icon: LucideIcon
  value: string
  label: string
  tint: string
  iconBg: string
  detail: string
}

interface PerformanceKpiSheetProps {
  kpi: Kpi | null
  onClose: () => void
}

export function PerformanceKpiSheet({ kpi, onClose }: PerformanceKpiSheetProps) {
  return (
    <AnimatePresence>
      {kpi && (
        <motion.div
          className="absolute inset-0 z-50 flex flex-col justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <SheetShell onClose={onClose} height="auto">
            <div>
              <div className="flex items-start gap-4">
                <span className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl', kpi.iconBg)}>
                  <kpi.icon className="h-6 w-6" strokeWidth={2.4} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">{kpi.label}</h3>
                  <p className="mt-1 text-2xl font-extrabold tabular-nums text-[#0B211B]">{kpi.value}</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/5 text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/10 focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                  aria-label="Close details"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>
              <div className="mt-5 rounded-2xl bg-[#0B211B]/[0.03] p-4">
                <p className="text-pretty text-[13px] font-medium leading-relaxed text-[#0B211B]/70">{kpi.detail}</p>
              </div>
            </div>
          </SheetShell>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
