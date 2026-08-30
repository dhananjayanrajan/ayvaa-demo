import { AnimatePresence, motion } from 'motion/react'
import { Lock, X } from 'lucide-react'
import { Stars } from './Stars'
import type { FeedbackEntry } from './types'

interface PerformanceFeedbackSheetProps {
  feedback: FeedbackEntry | null
  onClose: () => void
}

export function PerformanceFeedbackSheet({ feedback, onClose }: PerformanceFeedbackSheetProps) {
  return (
    <AnimatePresence>
      {feedback && (
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
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative rounded-t-[28px] bg-white p-5 pb-7 shadow-2xl"
          >
            <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-[#0B211B]/10" />
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-lg font-extrabold text-emerald-700">
                {feedback.family.slice(0, 1)}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-[15px] font-extrabold tracking-tight text-[#0B211B]">{feedback.family}</h3>
                <p className="mt-0.5 text-[12px] font-semibold text-[#0B211B]/50">Verified family feedback · {feedback.date}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Stars />
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">
                    {feedback.rating.toFixed(1)} rating
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/5 text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/10 focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                aria-label="Close feedback details"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <div className="mt-5 rounded-2xl bg-[#0B211B]/[0.03] p-4">
              <p className="text-pretty text-[14px] font-semibold leading-relaxed text-[#0B211B]/80">
                &ldquo;{feedback.quote}&rdquo;
              </p>
            </div>

            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">
              <Lock className="h-3.5 w-3.5" aria-hidden />
              Shared with partner consent
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
