import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { BadgeCheck, Check, Loader2, Quote, Scale, ShieldCheck, Star } from 'lucide-react'
import { SheetShell } from '@/components/phone/SheetShell'
import { RATED_VISIT, buildFeedbackRows, ratingLabel } from '@/data/patientRating'
import { StarPicker } from './StarPicker'
import { HighlightTags } from './HighlightTags'
import { cn } from '@/lib/utils'

interface RateVisitSheetProps {
  submitted: boolean
  stars: number
  selectedTags: string[]
  note: string
  onStars: (stars: number) => void
  onToggleTag: (tag: string) => void
  onNote: (note: string) => void
  onConfirmed: () => void
  onClose: () => void
  onBackToVisits: () => void
  onHome: () => void
}

export function RateVisitSheet({
  submitted,
  stars,
  selectedTags,
  note,
  onStars,
  onToggleTag,
  onNote,
  onConfirmed,
  onClose,
  onBackToVisits,
  onHome,
}: RateVisitSheetProps) {
  const [phase, setPhase] = useState<'idle' | 'working'>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const submit = () => {
    if (phase !== 'idle' || stars === 0) return
    setPhase('working')
    timers.current.push(setTimeout(() => onConfirmed(), 1000))
  }

  const rows = buildFeedbackRows(stars, selectedTags.length, note)

  return (
    <SheetShell
      icon={submitted ? BadgeCheck : Star}
      tone={submitted ? 'success' : 'info'}
      title={submitted ? 'Feedback sealed' : 'Rate the visit'}
      subtitle={
        submitted
          ? `${stars} of 5 recorded privately`
          : `${RATED_VISIT.caregiver.first}'s visit, ${RATED_VISIT.dateLabel}`
      }
      onClose={onClose}
      footer={
        submitted ? (
          <div className="flex gap-2.5">
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={onBackToVisits}
              className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
            >
              <span className="truncate">Back to visits</span>
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={onHome}
              className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
            >
              <span className="truncate">Home</span>
            </motion.button>
          </div>
        ) : (
          <div>
            <motion.button
              type="button"
              whileTap={stars > 0 && phase === 'idle' ? { scale: 0.97 } : undefined}
              onClick={submit}
              disabled={stars === 0 || phase === 'working'}
              aria-disabled={stars === 0 || phase === 'working'}
              className={cn(
                'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-colors',
                stars === 0
                  ? 'cursor-not-allowed bg-[#0B211B]/[0.08] text-[#0B211B]/35'
                  : phase === 'working'
                    ? 'cursor-wait bg-amber-500/60'
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-[0_18px_36px_-18px_rgba(245,158,11,0.75)]',
              )}
            >
              {phase === 'working' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  <span className="truncate">Sealing feedback…</span>
                </>
              ) : stars === 0 ? (
                <span className="truncate">Choose a rating first</span>
              ) : (
                <>
                  <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
                  <span className="truncate">Submit private feedback</span>
                </>
              )}
            </motion.button>
            <p className="mt-2 text-center text-[10px] font-bold text-[#0B211B]/45">
              Goes to the quality team only, never the patient
            </p>
          </div>
        )
      }
    >
      {submitted ? (
        <div className="flex flex-col gap-5 pt-2">
          <div className="rounded-2xl bg-amber-500/[0.1] px-4 py-5">
            <div className="flex items-center justify-center gap-1.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  className={cn(
                    'h-6 w-6',
                    n <= stars ? 'fill-amber-400 text-amber-400' : 'fill-[#0B211B]/[0.07] text-[#0B211B]/[0.07]',
                  )}
                  aria-hidden
                />
              ))}
            </div>
            <div className="mt-2.5 text-center text-[15px] font-extrabold tracking-tight text-[#0B211B]">
              {stars} of 5, <span className="text-amber-600">{ratingLabel(stars).toLowerCase()}</span>
            </div>
            <p className="mt-1 text-center text-[11px] font-medium text-[#0B211B]/55">
              For {RATED_VISIT.caregiver.first}, {RATED_VISIT.dateLabel}
            </p>
          </div>

          <div>
            <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">
              Your feedback
            </div>
            <div className="mt-2.5 rounded-2xl bg-[#0B211B]/[0.04] px-4 py-3.5">
              <div className="flex flex-col gap-2.5">
                {rows.map((row) => (
                  <div key={row.label} className="flex items-baseline justify-between gap-3">
                    <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">
                      {row.label}
                    </span>
                    <span className="text-right text-[12.5px] font-bold text-[#0B211B]/80">{row.value}</span>
                  </div>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-amber-400/[0.16] px-3 py-1.5 text-[10.5px] font-bold text-amber-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {note.trim().length > 0 && (
            <div>
              <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">Your note</div>
              <div className="mt-2 rounded-2xl bg-[#0B231C] p-4">
                <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-emerald-200/50">
                  <Quote className="h-3 w-3" aria-hidden />
                  Verbatim
                </span>
                <p className="mt-2.5 font-serif text-pretty text-[13px] font-medium leading-relaxed text-white/90">
                  &ldquo;{note.trim()}&rdquo;
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 rounded-xl bg-emerald-500/[0.1] px-3 py-2.5">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-700" strokeWidth={2.4} aria-hidden />
            <span className="min-w-0 text-[10.5px] font-bold text-emerald-800">
              Sealed to your feedback record. The caregiver sees aggregated scores only, never your words.
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 pt-2">
          <div className="rounded-2xl bg-amber-500/[0.1] px-4 py-5">
            <div className="text-center text-[9px] font-extrabold uppercase tracking-[0.18em] text-amber-700/70">
              Your rating
            </div>
            <div className="mt-3">
              <StarPicker value={stars} onChange={onStars} />
            </div>
            <div className="mt-3 text-center">
              {stars > 0 ? (
                <span className="text-[15px] font-extrabold tracking-tight text-amber-600">
                  {ratingLabel(stars)}
                </span>
              ) : (
                <span className="text-[13px] font-bold text-[#0B211B]/40">Tap a star to begin</span>
              )}
            </div>
            <p className="mt-1 text-center text-[11px] font-medium text-[#0B211B]/50">
              How was {RATED_VISIT.caregiver.first} today?
            </p>
          </div>

          <HighlightTags selected={selectedTags} onToggle={onToggleTag} />

          <div>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">
                Anything else, optional
              </span>
              {note.trim().length > 0 && (
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-700">Added</span>
              )}
            </div>
            <textarea
              value={note}
              onChange={(e) => onNote(e.target.value)}
              rows={4}
              placeholder="A line for Ayvaa or the caregiver, kept private…"
              className="mt-2 w-full resize-none rounded-2xl bg-[#0B211B]/[0.06] p-4 text-[12.5px] font-medium leading-relaxed text-[#0B211B]/85 transition-colors placeholder:text-[#0B211B]/40 focus:bg-[#0B211B]/[0.09] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2.5 rounded-2xl bg-[#0B211B]/[0.03] px-3.5 py-3">
            <Scale className="h-4 w-4 shrink-0 text-[#0B211B]/40" strokeWidth={2.2} aria-hidden />
            <span className="min-w-0 flex-1 text-[11px] font-medium leading-snug text-[#0B211B]/55">
              Ratings feed matching weights. Low scores trigger a quality review of the professional.
            </span>
          </div>
        </div>
      )}
    </SheetShell>
  )
}
