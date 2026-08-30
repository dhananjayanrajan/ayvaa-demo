import { ChevronRight, ReceiptText } from 'lucide-react'
import { Card, Chip, Tile } from '@/components/phone/kit'
import { payment, paymentMethodLabel } from '@/data/patientVisitSummary'

export function PaymentCard({ onPress }: { onPress: () => void }) {
  return (
    <Card>
      <button
        type="button"
        onClick={onPress}
        className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-[#0B211B]/[0.02]"
      >
        <Tile icon={ReceiptText} tone="success" size="lg" />
        <span className="min-w-0 flex-1">
          <span className="block text-[13px] font-bold tracking-tight text-[#0B211B]">Visit charge, captured</span>
          <span className="mt-0.5 block truncate text-[11px] font-semibold text-[#0B211B]/45">
            {paymentMethodLabel()}
          </span>
        </span>
        <span className="flex shrink-0 flex-col items-end gap-1">
          <span className="text-[13px] font-extrabold tabular-nums tracking-tight text-[#0B211B]">{payment.total}</span>
          <Chip intent="success">Paid</Chip>
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />
      </button>
    </Card>
  )
}
