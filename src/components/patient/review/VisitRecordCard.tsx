import { BadgeCheck } from 'lucide-react'
import { Card, Tile } from '@/components/phone/kit'
import { RATED_VISIT } from '@/data/patientRating'

const recordRows = [
  { label: 'Checked in', value: RATED_VISIT.checkInAt },
  { label: 'Sign-off', value: RATED_VISIT.signOffAt },
  { label: 'Steps sealed', value: `${RATED_VISIT.stepsSealed} of ${RATED_VISIT.stepsSealed}` },
  { label: 'Goals met', value: `${RATED_VISIT.goalsMet} of ${RATED_VISIT.goalsMet}` },
]

export function VisitRecordCard() {
  return (
    <Card>
      <div className="p-5">
        <div className="flex items-start gap-3.5">
          <Tile icon={BadgeCheck} tone="success" size="lg" />
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
              Verified visit record
            </div>
            <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              Sealed before you rate. Your feedback never alters it.
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2.5">
          {recordRows.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-3">
              <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">
                {row.label}
              </span>
              <span className="text-right text-[12.5px] font-bold tabular-nums text-[#0B211B]/80">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
