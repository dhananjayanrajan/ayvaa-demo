import { ShieldCheck } from 'lucide-react'
import { AccentHero } from '@/components/admin/ui/AccentHero'
import { StatusPill } from '@/components/patient/matching/StatusPill'
import { USUAL_CAREGIVER, confirmedCount, missedVisits, upcomingVisits } from '@/data/patientVisits'

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
      <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">{label}</div>
      <div className="mt-1 truncate text-[12.5px] font-extrabold leading-none tabular-nums text-white">{value}</div>
    </div>
  )
}

export function VisitsHero() {
  const upcoming = upcomingVisits()
  const missed = missedVisits()
  const confirmed = confirmedCount(upcoming)

  return (
    <AccentHero tone="emerald">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
          <ShieldCheck className="h-3 w-3" aria-hidden />
          This week
        </span>
        <StatusPill tone="emerald" label="GPS verified" />
      </div>

      <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        {upcoming.length} visits ahead,{' '}
        <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
          {confirmed} confirmed
        </span>
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
