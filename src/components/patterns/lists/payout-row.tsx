import { ReceiptText } from 'lucide-react'
import { Row } from '@/components/base/phone/row'

type Props = {
  date: string
  sessions: number
  amount: string
  paid: boolean
  onPress: () => void
}

export function PayoutRow({ date, sessions, amount, paid, onPress }: Props) {
  return (
    <Row
      icon={ReceiptText}
      tone="neutral"
      tileSize="sm"
      title={date}
      titleClassName="text-[13.5px] font-extrabold"
      metaLabel={`${sessions} sessions`}
      amount={amount}
      chip={{ label: paid ? 'Paid' : 'In transit', intent: paid ? 'success' : 'warning', dot: !paid }}
      onClick={onPress}
      showChevron={false}
    />
  )
}
