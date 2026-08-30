import type { ReactNode } from 'react'
import { Quote } from 'lucide-react'

export function QuotePanel({
  quote,
  author,
  authorInitial,
  badge = 'Verified',
  kicker,
  kickerIcon: KickerIcon,
  footerTrailing,
}: {
  quote: string
  author: string
  authorInitial: string
  badge?: string
  kicker?: string
  kickerIcon?: typeof Quote
  footerTrailing?: ReactNode
}) {
  return (
    <div className="rounded-[20px] bg-[#0B231C] p-4">
      {kicker && (
        <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-emerald-200/50">
          {KickerIcon && <KickerIcon className="h-3 w-3" aria-hidden />}
          {kicker}
        </span>
      )}
      <p className="mt-2.5 font-serif text-pretty text-[13px] font-medium leading-relaxed text-white/90">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-3 flex items-center gap-2.5 border-t border-white/[0.08] pt-3">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-[10px] font-extrabold text-emerald-200">
          {authorInitial}
        </span>
        <span className="min-w-0 flex-1 truncate text-[11.5px] font-bold text-emerald-50/80">{author}</span>
        {footerTrailing ?? (
          <span className="shrink-0 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-200">
            {badge}
          </span>
        )}
      </div>
    </div>
  )
}
