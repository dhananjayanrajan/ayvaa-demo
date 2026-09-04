import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CredentialCard({
  stepsDone,
  stepsTotal,
  footerNote,
  children,
}: {
  stepsDone: number
  stepsTotal: number
  footerNote: string
  children: ReactNode
}) {
  const ready = stepsDone === stepsTotal
  const pct = Math.round((stepsDone / stepsTotal) * 100)
  return (
    <div className="rounded-3xl border border-[#0B211B]/[0.06] bg-white shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)]">
      {children}
      <div className="px-4 pb-4 pt-1">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className={cn(
              'grid h-4 w-4 shrink-0 place-items-center rounded-full transition-colors duration-300',
              ready ? 'bg-emerald-500 text-white' : 'bg-amber-500/[0.18]',
            )}
          >
            {ready ? (
              <Check className="h-2.5 w-2.5" strokeWidth={3.5} aria-hidden />
            ) : (
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-amber-500"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
            )}
          </span>
          <span
            className={cn(
              'min-w-0 flex-1 text-[10px] font-extrabold tabular-nums transition-colors duration-300',
              ready ? 'text-emerald-600' : 'text-amber-600',
            )}
          >
            {ready ? 'Ready to verify' : `${stepsTotal - stepsDone} of ${stepsTotal} left`}
          </span>
        </div>
        <div aria-hidden className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#0B211B]/[0.06]">
          <motion.div
            className={cn(
              'h-full rounded-full transition-colors duration-500',
              ready
                ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
                : 'bg-gradient-to-r from-amber-400 to-amber-500',
            )}
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
        </div>
        <p className="mt-2.5 text-pretty text-[10px] font-bold leading-snug text-[#0B211B]/45">
          {footerNote}
        </p>
      </div>
    </div>
  )
}
