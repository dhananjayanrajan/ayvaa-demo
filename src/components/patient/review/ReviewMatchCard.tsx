import { useRouter } from '@/lib/router'
import { AccentHero } from '@/components/admin/ui/AccentHero'
import { StatusPill } from '@/components/phone/StatusPill'
import { initialsOf } from '@/data/patientMatching'
import { REVIEW_MATCH } from '@/data/patientReview'
import { BadgeCheck, ChevronRight, Send, Star } from 'lucide-react'

export function ReviewMatchCard() {
  const { navigate } = useRouter()

  return (
    <AccentHero tone="emerald">
      <div className="flex items-start gap-3.5">
        <div className="relative shrink-0">
          <span className="grid h-14 w-14 place-items-center rounded-[20px] bg-white/[0.1] text-[15px] font-black tracking-tight text-white">
            {initialsOf(REVIEW_MATCH.name)}
          </span>
          <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-white">
            <BadgeCheck className="h-3 w-3 text-emerald-600" strokeWidth={3} aria-hidden />
          </span>
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <div className="truncate text-[15px] font-extrabold tracking-tight text-white">{REVIEW_MATCH.name}</div>
          <div className="truncate text-[11.5px] font-semibold text-emerald-100/55">{REVIEW_MATCH.role}</div>
        </div>
        <StatusPill tone="emerald" label="Primary" className="mt-0.5" />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
        <span className="flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 fill-white/70 text-white/70" aria-hidden />
          <span className="text-[11.5px] font-extrabold tabular-nums text-white/85">{REVIEW_MATCH.rating}</span>
        </span>
        <span className="text-[11px] font-bold tabular-nums text-white/55">{REVIEW_MATCH.years} yrs experience</span>
        <span className="text-[11px] font-bold tabular-nums text-white/55">{REVIEW_MATCH.sessions} sessions</span>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-400/15 text-emerald-200">
          <Send className="h-4 w-4" strokeWidth={2.4} aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[12.5px] font-bold tracking-tight text-white">Leading match for this booking</span>
          <span className="mt-0.5 block truncate text-[10px] font-semibold text-emerald-100/55">
            Availability re-checked on acceptance
          </span>
        </span>
      </div>

      <button
        type="button"
        onClick={() => navigate('/patient/p11')}
        className="mt-2 flex w-full items-center justify-between gap-3 rounded-2xl bg-emerald-400/[0.12] px-3.5 py-3 text-left transition-colors duration-300 hover:bg-emerald-400/[0.18]"
      >
        <span className="min-w-0 text-[12px] font-extrabold text-emerald-50">View full profile</span>
        <ChevronRight className="h-4 w-4 shrink-0 text-emerald-200/70" aria-hidden />
      </button>
    </AccentHero>
  )
}
