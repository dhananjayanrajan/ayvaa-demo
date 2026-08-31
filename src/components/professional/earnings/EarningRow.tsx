import { Check } from 'lucide-react'
import { Row } from '@/components/phone/Row'

type Props = {
  patient: string
  day: string
  time: string
  amount: string
  onPress: () => void
}

export function EarningRow({ patient, day, time, amount, onPress }: Props) {
  return (
    <Row
      icon={Check}
      tone="success"
      tileSize="sm"
      title={patient}
      titleClassName="text-[13px] font-extrabold"
      metaLabel={day}
      amount={amount}
      amountNote={time}
      bodyClassName="pt-0.5"
      className="items-start rounded-2xl px-2 py-3"
      onClick={onPress}
      showChevron={false}
    />
  )
}
