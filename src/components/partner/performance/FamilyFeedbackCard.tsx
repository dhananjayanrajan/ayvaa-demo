import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, Lock } from 'lucide-react'
import { Stars } from './Stars'
import { cn } from '@/lib/utils'
import type { PerformanceData } from '@/data/partnerPerformanceTypes'

interface FamilyFeedbackCardProps {
  data: PerformanceData
  onOpen: (feedbackIndex: number) => void
}

export function FamilyFeedbackCard({ data }: FamilyFeedbackCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const feedback = data.feedbacks[currentIndex]

  const goPrev = () => setCurrentIndex((prev) => (prev === 0 ? data.feedbacks.length - 1 : prev - 1))
  const goNext = () => setCurrentIndex((prev) => (prev === data.feedbacks.length - 1 ? 0 : prev + 1))

  return (
    <div className="relative overflow-hidden rounded-[22px] bg-[#0B231C] p-5 shadow-[0_20px_44px_-24px_rgba(6,40,30,0.7)]">
      <div aria-hidden className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-emerald-400/15 blur-3xl" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <Stars />
          <span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-emerald-200/50">
            {feedback.rating.toFixed(1)} · verbatim
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-2.5 min-h-[80px]"
          >
            <p className="text-pretty text-[14px] font-semibold leading-relaxed text-white/90">
              &ldquo;{feedback.quote}&rdquo;
            </p>
            <div className="mt-3.5 flex items-center gap-2.5 border-t border-white/[0.08] pt-3.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-[11px] font-extrabold text-emerald-200">
                {feedback.family.slice(0, 1)}
              </span>
              <span className="min-w-0 flex-1 truncate text-[12px] font-bold text-emerald-50/80">{feedback.family}</span>
              <span className="text-[9px] font-semibold text-emerald-100/40">{feedback.date}</span>
              <Lock className="h-3.5 w-3.5 shrink-0 text-emerald-100/30" aria-hidden />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1.5">
            {data.feedbacks.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  idx === currentIndex ? 'w-4 bg-emerald-300' : 'w-1.5 bg-white/20',
                )}
                aria-label={`Show feedback ${idx + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={goPrev}
              className="grid h-7 w-7 place-items-center rounded-full bg-white/[0.06] text-emerald-100/60 transition-colors hover:bg-white/[0.12]"
              aria-label="Previous feedback"
            >
              <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="grid h-7 w-7 place-items-center rounded-full bg-white/[0.06] text-emerald-100/60 transition-colors hover:bg-white/[0.12]"
              aria-label="Next feedback"
            >
              <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
