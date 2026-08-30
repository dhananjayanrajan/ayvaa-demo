import { motion } from 'motion/react'
import { ChevronRight, Star } from 'lucide-react'
import { AccentHero } from '@/components/admin/ui/AccentHero'
import { StatusPill } from '@/components/patient/matching/StatusPill'
import { RATED_VISIT, ratingLabel } from '@/data/patientRating'

interface RatingHeroProps {
  submitted: boolean
  stars: number
  highlightCount: number
  note: string
  onOpenSheet: () => void
}

export function RatingHero({ submitted, stars, highlightCount, note, onOpenSheet }: RatingHeroProps) {
  return (
    <AccentHero tone={submitted ? 'emerald' : 'amber'}>
      <div className="flex items-center justify-between gap-3">
        <span
          className={
            submitted
              ? 'text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50'
              : 'text-[9px] font-extrabold uppercase tracking-[0.22em] text-amber-200/50'
          }
        >
          Private feedback
        </span>
        {submitted ? (
          <StatusPill tone="emerald" label="Sealed" />
        ) : (
          <StatusPill tone="amber" label="Awaiting rating" live />
        )}
      </div>

      <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        How was {RATED_VISIT.caregiver.first}&apos;s visit{' '}
        <span
          className={
            submitted
              ? 'bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-amber-300 to-orange-200 bg-clip-text text-transparent'
          }
        >
          today
        </span>
        ?
      </h2>
      <p className="mt-1 text-[11.5px] font-semibold leading-snug text-white/55">
        {submitted
          ? 'Your rating is sealed. It shapes matching quality only.'
          : 'Your rating reaches the quality team only, never the patient record.'}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
          <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">Visit</div>
          <div className="mt-1 truncate text-[12.5px] font-extrabold leading-none tabular-nums text-white">
            {RATED_VISIT.dateLabel}
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
          <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">Caregiver</div>
          <div className="mt-1 truncate text-[12.5px] font-extrabold leading-none text-white">
            {RATED_VISIT.caregiver.first}
          </div>
        </div>
      </div>

      {submitted ? (
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-amber-400/[0.14] px-3.5 py-2.5">
            <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">
              <Star className="h-3 w-3 fill-amber-300 text-amber-300" aria-hidden />
              Your rating
            </div>
            <div className="mt-1 truncate text-[12.5px] font-extrabold leading-none tabular-nums text-white">
              {stars} of {5} <span className="font-bold text-amber-200">{ratingLabel(stars)}</span>
            </div>
          </div>
          <div className="rounded-2xl bg-amber-400/[0.14] px-3.5 py-2.5">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">Highlights</div>
            <div className="mt-1 truncate text-[12.5px] font-extrabold leading-none tabular-nums text-white">
              {highlightCount}
            </div>
          </div>
        </div>
      ) : (
        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          onClick={onOpenSheet}
          className="mt-2 flex w-full items-center gap-3 rounded-2xl bg-amber-400/[0.14] px-4 py-3.5 text-left transition-colors hover:bg-amber-400/[0.2]"
        >
          <span className="min-w-0 flex-1">
            <span className="block text-[12.5px] font-bold tracking-tight text-white">Rate this visit now</span>
            <span className="block text-[10.5px] font-semibold text-white/50">Stars, highlights and an optional note</span>
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-white/40" aria-hidden />
        </motion.button>
      )}
    </AccentHero>
  )
}
