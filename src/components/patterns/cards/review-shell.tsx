import { Quote, Star } from 'lucide-react'
import { AccentHero } from '@/components/base/phone/accent-hero'
import { initialsOf } from '@/data/patientMatching'
import type { Review } from '@/data/patientCaregiverProfile'

export function ReviewShell({ review }: { review: Review }) {
  return (
    <AccentHero tone="emerald">
      <div className="flex items-center justify-between gap-3">
        <Quote className="h-5 w-5 fill-emerald-300/40 text-emerald-300/40" aria-hidden />
        <span className="flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 fill-emerald-300 text-emerald-300" aria-hidden />
          <span className="text-[12px] font-extrabold tabular-nums text-white">{review.rating.toFixed(1)}</span>
          <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">
            {review.month} {review.year}
          </span>
        </span>
      </div>

      <p className="mt-2.5 font-serif text-pretty text-[14px] font-medium leading-relaxed text-white/90">
        {review.quote}
      </p>

      <div className="mt-4 flex items-center gap-2.5 border-t border-white/[0.08] pt-3.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-[11px] font-extrabold text-emerald-200">
          {initialsOf(review.family)}
        </span>
        <span className="min-w-0 flex-1 truncate text-[12px] font-bold text-emerald-50/80">{review.family}</span>
        <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">{review.context}</span>
      </div>
    </AccentHero>
  )
}
