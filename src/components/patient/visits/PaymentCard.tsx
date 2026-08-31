import { ReceiptText } from 'lucide-react'
import { Card, Chip } from '@/components/phone/kit'
import { Row } from '@/components/phone/Row'
import { payment, paymentMethodLabel } from '@/data/patientVisitSummary'

export function PaymentCard({ onPress }: { onPress: () => void }) {
  return (
    <Card>
      <Row
        icon={ReceiptText}
        tone="success"
        tileSize="lg"
        title="Visit charge, captured"
        titleClassName="text-[13px] font-bold"
        subtitle={paymentMethodLabel()}
        subtitleClassName="truncate text-[11px] font-semibold text-[#0B211B]/45"
        trailing={
          <span className="flex shrink-0 flex-col items-end gap-1">
            <span className="text-[13px] font-extrabold tabular-nums tracking-tight text-[#0B211B]">{payment.total}</span>
            <Chip intent="success">Paid</Chip>
          </span>
        }
        className="p-4"
        hoverClassName="hover:bg-[#0B211B]/[0.02]"
        onClick={onPress}
        whileTapDisabled
      />
    </Card>
  )
}
