import { Activity, CalendarCheck, Check } from 'lucide-react'
import { Hero } from '@/components/phone/kit'
import { HeroTopRow, HeroHighlight } from '@/components/phone/HeroCells'
import { Meter } from '@/components/phone/kit'
import { carePlan } from '@/data/seed'

export function RecoveryCard({
  onPlan,
  onReports,
}: {
  onPlan: () => void
  onReports: () => void
}) {
  return (
    <Hero>
      <HeroTopRow
        icon={Activity}
        label="Recovery plan, elderly care"
      />
      <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Week {carePlan.week} of {carePlan.weeks}, <HeroHighlight>on track</HeroHighlight>
      </h3>
      <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-emerald-100/70">
        {carePlan.visitsDone} visits completed, goals logged at each one
      </p>

      <div className="mt-4 rounded-2xl bg-white/[0.06] p-4">
        <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/50">
          <span>Plan progress</span>
          <span className="tabular-nums text-emerald-200">{carePlan.progress}%</span>
        </div>
        <Meter value={carePlan.progress / 100} intent="success" delay={0.2} className="mt-2" />
        <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-300/70">
          <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
          On schedule, zero reschedules
        </div>
      </div>

      <div className="mt-4 flex gap-2.5">
        <button
          type="button"
          onClick={onPlan}
          className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 text-[13px] font-bold text-white shadow-[0_12px_28px_-12px_rgba(16,185,129,0.8)]"
        >
          <Activity className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          <span className="truncate">Open plan</span>
        </button>
        <button
          type="button"
          onClick={onReports}
          className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-white/[0.1] py-3.5 text-[13px] font-bold text-white transition-colors hover:bg-white/[0.16]"
        >
          <CalendarCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          <span className="truncate">Weekly reports</span>
        </button>
      </div>
    </Hero>
  )
}
