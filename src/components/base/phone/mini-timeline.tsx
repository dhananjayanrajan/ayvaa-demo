import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export type MiniTimelineItem = {
  title: string
  note?: string
  trailing?: ReactNode
  done?: boolean
  pending?: boolean
}

export function MiniTimeline({ items, className }: { items: MiniTimelineItem[]; className?: string }) {
  return (
    <div className={cn('flex flex-col', className)}>
      {items.map((item, i) => {
        const last = i === items.length - 1
        return (
          <div key={`${item.title}-${i}`} className="flex gap-3">
            <div className="flex flex-col items-center">
              {item.done ? (
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                </span>
              ) : item.pending ? (
                <span className="relative grid h-5 w-5 shrink-0 place-items-center">
                  <span aria-hidden className="absolute h-5 w-5 animate-ping rounded-full bg-amber-400/40" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-amber-500" />
                </span>
              ) : (
                <span className="h-5 w-5 shrink-0 rounded-full border-2 border-[#0B211B]/20" />
              )}
              {!last && <span aria-hidden className="my-1 w-px flex-1 bg-[#0B211B]/10" />}
            </div>
            <div className={last ? 'min-w-0 flex-1 pb-0.5' : 'min-w-0 flex-1 pb-4'}>
              <div className="flex items-baseline justify-between gap-2">
                <span className="break-words text-[13px] font-bold tracking-tight text-[#0B211B]">{item.title}</span>
                {item.trailing}
              </div>
              {item.note && (
                <div className="mt-0.5 break-words text-[11px] font-medium text-[#0B211B]/55">{item.note}</div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
