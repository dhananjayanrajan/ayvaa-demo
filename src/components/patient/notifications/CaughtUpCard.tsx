import { Check } from 'lucide-react'
import { PhaseHero, PHASE_THEME } from '@/components/phone/PhaseHero'
import type { CaughtUpStats } from '@/data/patientNotifications'

export function CaughtUpCard({ stats }: { stats: CaughtUpStats }) {
  const read = stats.total - stats.unreadCount - stats.actionCount
  return (
    <PhaseHero theme={PHASE_THEME.emerald}>
      <div className="relative">
        <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
          <Check className="h-3 w-3" aria-hidden />
          All caught up
        </div>
        <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
          Everything else is{' '}
          <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
            read
          </span>
        </h3>
        <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-emerald-100/70">
          Only the items waiting on you are shown. Switch back for the full feed.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
            <div className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-emerald-100/50">
              In the feed
            </div>
            <div className="mt-1 text-[15px] font-extrabold tabular-nums leading-none text-white">
              {stats.feedCount}
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
            <div className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-emerald-100/50">
              Read
            </div>
            <div className="mt-1 text-[15px] font-extrabold tabular-nums leading-none text-white">
              {read}
            </div>
          </div>
        </div>
        <div className="mt-2 rounded-2xl bg-white/[0.04] px-4 py-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/50">
              Missed notifications
            </span>
            <span className="text-[11px] font-extrabold tabular-nums text-emerald-300">0</span>
          </div>
        </div>
      </div>
    </PhaseHero>
  )
}
