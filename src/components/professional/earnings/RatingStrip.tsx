import { Star } from 'lucide-react'

type Props = {
  rating: number
  count: number
}

export function RatingStrip({ rating, count }: Props) {
  return (
    <div className="flex items-center justify-between rounded-3xl bg-amber-500/[0.08] px-5 py-4">
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-400/20 text-amber-600">
          <Star className="h-4 w-4" strokeWidth={2.4} aria-hidden />
        </span>
        <div>
          <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-amber-700/70">Average rating</div>
          <div className="mt-0.5 text-[10.5px] font-semibold text-amber-800/60">From {count} family sign-offs</div>
        </div>
      </div>
      <span className="text-[19px] font-extrabold tabular-nums leading-none text-amber-800">{rating}</span>
    </div>
  )
}
