import { Lock } from 'lucide-react'
import { AccentHero } from '@/components/admin/ui/AccentHero'
import { recordRows } from '@/data/patientReview'

export function BookingRecordCard() {
  return (
    <AccentHero tone="emerald">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">Your booking</span>
        <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/40">
          <Lock className="h-3 w-3" aria-hidden />
          Sealed
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-2.5">
        {recordRows().map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-3">
            <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">{row.label}</span>
            <span className="truncate text-[12.5px] font-bold tabular-nums text-emerald-50/90">{row.value}</span>
          </div>
        ))}
      </div>
    </AccentHero>
  )
}
