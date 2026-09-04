import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StaffVerificationNote() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-2xl bg-[#0B211B]/[0.035] px-4 py-3">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="flex w-full items-start gap-2.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
      >
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600/70" strokeWidth={2.4} aria-hidden />
        <span className="min-w-0 flex-1">
          <span className="block text-pretty text-[11px] font-medium leading-relaxed text-[#0B211B]/55">
            Every staff member is verified by Ayvaa before their first session. You approve who joins under Sunrise — approvals and
            declines are both logged.
          </span>
          <AnimatePresence>
            {expanded && (
              <motion.span
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="block overflow-hidden"
              >
                <span className="mt-2 block border-t border-[#0B211B]/[0.06] pt-2 text-[10.5px] font-medium leading-relaxed text-[#0B211B]/45">
                  Verification includes licence checks, background screening, and a short onboarding call. You can pause or resume
                  access at any time from the staff details.
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        <ChevronDown
          className={cn(
            'mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0B211B]/40 transition-transform',
            expanded && 'rotate-180',
          )}
          aria-hidden
        />
      </button>
    </div>
  )
}
