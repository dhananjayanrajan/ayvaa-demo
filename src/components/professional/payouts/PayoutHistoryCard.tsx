import { Card } from '@/components/phone/kit'
import type { Payout } from './payoutData'
import { PayoutRow } from './PayoutRow'

type Props = {
  payouts: Payout[]
  onPressPayout: (p: Payout) => void
}

export function PayoutHistoryCard({ payouts, onPressPayout }: Props) {
  return (
    <Card>
      {payouts.map((p, i) => (
        <div key={p.date}>
          {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
          <PayoutRow
            date={p.date}
            sessions={p.sessions}
            amount={p.amount}
            paid={p.status === 'paid'}
            onPress={() => onPressPayout(p)}
          />
        </div>
      ))}
    </Card>
  )
}
