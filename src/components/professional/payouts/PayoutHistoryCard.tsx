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
      <div className="flex flex-col gap-1 p-3">
        {payouts.map((p) => (
          <PayoutRow
            key={p.date}
            date={p.date}
            sessions={p.sessions}
            amount={p.amount}
            paid={p.status === 'paid'}
            onPress={() => onPressPayout(p)}
          />
        ))}
      </div>
    </Card>
  )
}
