import { Undo2, X } from 'lucide-react'
import { Card, Chip, Tile } from '@/components/base/phone/kit'
import { missedVisits } from '@/data/patientVisits'

export function MissedCard() {
  const list = missedVisits()
  const visit = list[0]

  return (
    <Card intent="danger">
      <div className="p-5">
        <div className="flex items-start gap-3.5">
          <Tile icon={X} tone="danger" size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">
                {visit?.day}, {visit?.date}
              </span>
              <Chip intent="danger">Missed</Chip>
            </div>
            <p className="mt-1 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/60">{visit?.reason}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-emerald-500/[0.08] px-4 py-3">
          <Tile icon={Undo2} tone="success" size="sm" />
          <div className="min-w-0 flex-1">
            <div className="text-[12.5px] font-bold tracking-tight text-emerald-800">Refund processed automatically</div>
            <div className="mt-0.5 text-[10.5px] font-semibold leading-snug text-emerald-700/60">
              Missed visits are never charged, returned to your card
            </div>
          </div>
          <span className="shrink-0 text-[13px] font-extrabold tabular-nums text-emerald-700">{visit?.refund}</span>
        </div>
      </div>
    </Card>
  )
}
