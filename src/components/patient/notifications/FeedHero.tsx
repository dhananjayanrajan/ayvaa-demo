import { BellRing } from 'lucide-react'
import { Hero } from '@/components/phone/kit'

export function FeedHero({
  total,
  actionCount,
  unreadCount,
}: {
  total: number
  actionCount: number
  unreadCount: number
}) {
  return (
    <Hero>
      <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
        <BellRing className="h-3 w-3" aria-hidden />
        Notification feed, today
      </div>
      <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        {total} updates,{' '}
        <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
          {actionCount} need you
        </span>
      </h2>
      <p className="mt-1 text-pretty text-[12px] font-medium leading-relaxed text-emerald-100/70">
        Confirmations, doses and receipts land here the moment they happen.
      </p>

      <div className="mt-5 rounded-2xl bg-white/[0.06] px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/50">
            Inbox state
          </span>
          <span className="text-[10px] font-extrabold tabular-nums text-emerald-200">
            {unreadCount} unread, 0 missed
          </span>
        </div>
      </div>
    </Hero>
  )
}
