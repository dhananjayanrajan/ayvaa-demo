import { AccentHero } from '@/components/admin/ui/AccentHero'
import { REVIEW_SCHEDULE, REVIEW_WEEK, activeDayNames } from '@/data/patientReview'

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
      <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">{label}</div>
      <div className="mt-1 truncate text-[12.5px] font-extrabold leading-none tabular-nums text-white">{value}</div>
    </div>
  )
}

export function ReviewHero({ guardianFirstName }: { guardianFirstName: string }) {
  return (
    <AccentHero tone="emerald">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">Final check</span>
        <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] tabular-nums text-emerald-100/40">Step 3 of 3</span>
      </div>

      <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        One tap and{' '}
        <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">care begins</span>
      </h2>
      <p className="mt-1.5 text-pretty text-[11.5px] font-semibold leading-snug text-emerald-100/70">
        {guardianFirstName} is approving a recurring plan, charged only after each completed visit.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <StatCell label="Visits" value={`${REVIEW_SCHEDULE.visitsPerWeek} per week`} />
        <StatCell label="Session length" value={REVIEW_SCHEDULE.duration} />
      </div>

      <div className="mt-2 rounded-2xl bg-white/[0.06] p-3.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/40">Your week</span>
          <span className="truncate text-[10px] font-bold tabular-nums text-emerald-100/70">
            {activeDayNames()}, {REVIEW_SCHEDULE.time}
          </span>
        </div>
        <div className="mt-2.5 grid grid-cols-7 gap-1.5">
          {REVIEW_WEEK.map((day, i) => (
            <span
              key={`${day.full}-${i}`}
              className={`grid h-8 place-items-center rounded-xl text-[10px] font-extrabold uppercase ${
                day.active
                  ? 'bg-gradient-to-br from-emerald-400 to-teal-400 text-[#0B231C] shadow-[0_6px_14px_-8px_rgba(16,185,129,0.9)]'
                  : 'bg-white/[0.06] text-emerald-100/25'
              }`}
            >
              {day.short}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between gap-3 rounded-2xl bg-white/[0.04] px-3.5 py-2.5">
        <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">Est. weekly total</span>
        <span className="truncate text-[12.5px] font-extrabold tabular-nums leading-none text-white">
          {REVIEW_SCHEDULE.weeklyPrice}
        </span>
      </div>
    </AccentHero>
  )
}
