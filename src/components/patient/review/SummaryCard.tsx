import { Card } from '@/components/phone/kit'
import { bookingRows } from '@/data/patientReview'

export function SummaryCard() {
  return (
    <Card>
      <div className="flex flex-col gap-2.5 p-5">
        {bookingRows().map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-3">
            <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">{row.label}</span>
            <span className="truncate text-[12.5px] font-bold tabular-nums text-[#0B211B]/80">{row.value}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
