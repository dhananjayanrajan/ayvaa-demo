import { Lock } from 'lucide-react'
import { AccentHero } from '@/components/admin/ui/AccentHero'
import { HeroTopRow, HeroHighlight } from '@/components/phone/HeroCells'
import { REPORTS, totalReportedVisits } from '@/data/patientReports'
import { cn } from '@/lib/utils'

export function ReportsHero() {
  const visits = totalReportedVisits()

  return (
    <AccentHero tone="emerald">
      <HeroTopRow
        icon={Lock}
        label="Sealed archive"
        trailing={
          <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] tabular-nums text-emerald-100/40">
            {REPORTS.length} reports
          </span>
        }
      />

      <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Three months, <HeroHighlight>steadily better</HeroHighlight>
      </h2>
      <p className="mt-1.5 text-pretty text-[11.5px] font-semibold leading-snug text-emerald-100/70">
        Written by the caregiver, sealed when written, never edited after.
      </p>

      <div className="mt-5 overflow-hidden rounded-2xl bg-white/[0.06]">
        {REPORTS.map((report, i) => (
          <div key={report.id}>
            {i > 0 && <div aria-hidden className="mx-3.5 h-px bg-white/[0.07]" />}
            <div className="flex items-center gap-3 px-3.5 py-3">
              <span
                aria-hidden
                className={cn(
                  'h-2 w-2 shrink-0 rounded-full',
                  i === 0 ? 'bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]' : 'bg-emerald-300/25',
                )}
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12.5px] font-extrabold tracking-tight text-white">
                  {report.month}
                </span>
                <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">
                  {report.visitsCount} visits
                </span>
              </span>
              <span
                className={cn(
                  'shrink-0 rounded-full px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em]',
                  report.trend === 'improving' ? 'bg-emerald-400/[0.16] text-emerald-200' : 'bg-white/[0.08] text-white/50',
                )}
              >
                {report.trendLabel}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between gap-3 rounded-2xl bg-white/[0.04] px-3.5 py-2.5">
        <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">Visits covered</span>
        <span className="truncate text-[12.5px] font-extrabold tabular-nums leading-none text-white">{visits}</span>
      </div>
    </AccentHero>
  )
}
