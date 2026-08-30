import { ShieldCheck } from 'lucide-react'
import { AccentHero } from '@/components/admin/ui/AccentHero'
import { StatusPill } from '@/components/patient/matching/StatusPill'
import { HeroTopRow, HeroHighlight, StatCell } from '@/components/phone/HeroCells'
import { USUAL_CAREGIVER, confirmedCount, missedVisits, upcomingVisits } from '@/data/patientVisits'

export function VisitsHero() {
  const upcoming = upcomingVisits()
  const missed = missedVisits()
  const confirmed = confirmedCount(upcoming)

  return (
    <AccentHero tone="emerald">
      <HeroTopRow
        icon={ShieldCheck}
        label="This week"
        trailing={<StatusPill tone="emerald" label="GPS verified" />}
      />

      <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        {upcoming.length} visits ahead, <HeroHighlight>{confirmed} confirmed</HeroHighlight>
      </h2>
      <p className="mt-1.5 text-pretty text-[11.5px] font-semibold leading-snug text-emerald-100/70">
        Weekly plan with {USUAL_CAREGIVER}, Monday to Friday.
      </p>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/45">
          <span>Week confirmation</span>
          <span className="tabular-nums text-emerald-200">
            {confirmed} of {upcoming.length}
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 transition-[width] duration-700"
            style={{ width: `${(confirmed / Math.max(1, upcoming.length)) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <StatCell label="GPS verified" value="Every visit" />
        <StatCell label="Made right" value={missed.length > 0 ? `${missed.length} refunded` : 'Nothing owed'} />
      </div>
    </AccentHero>
  )
}
