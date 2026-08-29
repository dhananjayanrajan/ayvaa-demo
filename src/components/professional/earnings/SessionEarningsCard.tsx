import { Card } from '@/components/phone/kit'
import { paidAverage, type SessionRecord } from './sessionRecords'
import { EarningRow } from './EarningRow'
import { PendingSessionRow } from './PendingSessionRow'

type Props = {
  sessions: SessionRecord[]
  onPressSession: (session: SessionRecord) => void
}

export function SessionEarningsCard({ sessions, onPressSession }: Props) {
  return (
    <Card>
      <div className="flex flex-col gap-1 p-3">
        {sessions.map((s) => (
          <EarningRow
            key={s.id}
            patient={s.patient}
            day={s.day}
            time={s.time}
            amount={s.amount}
            onPress={() => onPressSession(s)}
          />
        ))}
        <div className="mt-1">
          <PendingSessionRow patient="Ramesh Sharma" when="Tonight, 6:00 PM" note="Pays only after the family signs off" />
        </div>
      </div>
      <div className="flex items-center justify-between bg-[#0B211B]/[0.03] px-5 py-3">
        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Average per session</span>
        <span className="text-[13px] font-extrabold tabular-nums text-[#0B211B]">₹{paidAverage.toLocaleString('en-IN')}</span>
      </div>
    </Card>
  )
}
