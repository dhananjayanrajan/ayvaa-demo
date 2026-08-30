import { AccentHero } from '@/components/admin/ui/AccentHero'
import { HeroTopRow, HeroHighlight, StatCell } from '@/components/phone/HeroCells'
import { PLAN, completedVisits, goalSummary } from '@/data/patientCarePlan'

export function PlanHero() {
  const goals = goalSummary()
  const visits = completedVisits()

  return (
    <AccentHero tone="emerald">
      <HeroTopRow
        label="Recovery plan"
        trailing={
          <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] tabular-nums text-emerald-100/40">
            Wk {PLAN.week} of {PLAN.weeks}
          </span>
        }
      />

      <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Week {PLAN.week}, <HeroHighlight>{PLAN.status.toLowerCase()}</HeroHighlight>
      </h2>
      <p className="mt-1.5 text-pretty text-[11.5px] font-semibold leading-snug text-emerald-100/70">
        Every goal is logged by the caregiver at each visit.
      </p>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/40">
          <span>Plan progress</span>
          <span className="tabular-nums text-emerald-200">{PLAN.progress}%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 transition-[width] duration-700"
            style={{ width: `${PLAN.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <StatCell label="Visits done" value={String(visits)} />
        <StatCell label="Goals met" value={`${goals.met} of ${goals.total}`} />
      </div>
      <div className="mt-2 flex items-center justify-between gap-3 rounded-2xl bg-white/[0.04] px-3.5 py-2.5">
        <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">Incidents this week</span>
        <span className="truncate text-[12.5px] font-extrabold tabular-nums leading-none text-white">{PLAN.incidents}</span>
      </div>
    </AccentHero>
  )
}
