import { motion } from 'motion/react'
import { Check, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { liveSteps } from '@/data/patientDashboard'

export function LiveStepper({ onPress }: { onPress: () => void }) {
  const doneCount = liveSteps.filter((s) => s.state === 'done').length
  const progressPct = ((doneCount + 1 - 1) / (liveSteps.length - 1)) * 100
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.99 }}
      onClick={onPress}
      className="block w-full rounded-2xl bg-white/[0.06] px-3 pb-3 pt-3.5 text-left transition-colors hover:bg-white/[0.09]"
      aria-label="Open live visit step details"
    >
      <div className="flex items-center gap-2">
        <span className="min-w-0 flex-1 text-[9px] font-extrabold uppercase tracking-[0.16em] text-emerald-100/50">
          Visit progress, tap for details
        </span>
        <span className="flex shrink-0 items-center gap-0.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-emerald-200/80">
          Details
          <ChevronRight className="h-3 w-3" strokeWidth={2.6} aria-hidden />
        </span>
      </div>
      <span className="relative mt-2.5 block h-4">
        <span aria-hidden className="absolute inset-x-[10%] top-1/2 h-px bg-white/15" />
        <span
          aria-hidden
          className="absolute left-[10%] top-1/2 h-px bg-emerald-300/60 transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
        <span className="absolute inset-0 grid grid-cols-5">
          {liveSteps.map((step) => (
            <span key={step.key} className="flex items-center justify-center">
              {step.state === 'done' ? (
                <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-400 text-[#0B231C] shadow-[0_0_0_3px_rgba(52,211,153,0.15)]">
                  <Check className="h-2.5 w-2.5" strokeWidth={4} aria-hidden />
                </span>
              ) : step.state === 'active' ? (
                <span className="relative grid h-4 w-4 place-items-center">
                  <span aria-hidden className="absolute h-4 w-4 animate-ping rounded-full bg-emerald-300/50" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_0_3px_rgba(52,211,153,0.2)]" />
                </span>
              ) : (
                <span className="h-2.5 w-2.5 rounded-full bg-white/20 shadow-[0_0_0_3px_rgba(255,255,255,0.04)]" />
              )}
            </span>
          ))}
        </span>
      </span>
      <span className="mt-1.5 grid grid-cols-5">
        {liveSteps.map((step) => (
          <span
            key={step.key}
            className={cn(
              'text-center text-[8px] font-extrabold uppercase tracking-[0.08em]',
              step.state === 'done' && 'text-emerald-100/70',
              step.state === 'active' && 'text-emerald-100/90',
              step.state === 'todo' && 'text-emerald-100/35',
            )}
          >
            {step.label}
          </span>
        ))}
      </span>
    </motion.button>
  )
}
