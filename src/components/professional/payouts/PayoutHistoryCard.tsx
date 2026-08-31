import { Card } from '@/components/phone/kit'
import type { Payout } from '@/data/payoutData'
import { PayoutRow } from './PayoutRow'

type Props = {
  payouts: Payout[]
  onPressPayout: (p: Payout) => void
}

export function PayoutHistoryCard({ payouts, onPressPayout }: Props) {
  return (
    <Card>
      {payouts.map((p) => (
        <div key={p.date}>
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
