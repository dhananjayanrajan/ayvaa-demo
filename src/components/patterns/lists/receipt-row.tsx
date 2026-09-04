import { Row } from '@/components/base/phone/row'
import { fmtINR, type Receipt } from '@/data/patientBilling'
import { ReceiptTicket } from '../cards/receipt-ticket'

interface ReceiptRowProps {
  receipt: Receipt
  open: boolean
  onToggle: () => void
}

export function ReceiptRow({ receipt, open, onToggle }: ReceiptRowProps) {
  const Icon = receipt.icon

  if (receipt.state === 'planned') {
    return (
      <Row
        leading={
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#0B211B]/[0.07] text-[#0B211B]/50">
            <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
          </span>
        }
        title={`${receipt.day}, ${receipt.date}`}
        titleClassName="text-[13px] font-bold text-[#0B211B]/70"
        subtitle={receipt.note}
        subtitleClassName="break-words text-[11.5px] font-medium leading-snug text-[#0B211B]/45"
        chip={{ label: receipt.chip, intent: 'neutral' }}
        className="rounded-2xl bg-[#0B211B]/[0.03] gap-3.5 p-4"
        showChevron={false}
      />
    )
  }

  const live = receipt.state === 'live'
  const refund = receipt.state === 'refund'

  return (
    <Row
      icon={Icon}
      tone={refund ? 'warning' : live ? 'success' : 'neutral'}
      liveDot={live}
      title={`${receipt.day}, ${receipt.date}`}
      titleClassName="text-[13px] font-extrabold"
      subtitle={receipt.note}
      subtitleClassName="break-words text-[11.5px] font-medium leading-snug text-[#0B211B]/55"
      chip={{
        label: receipt.chip,
        intent: refund ? 'warning' : live ? 'live' : 'success',
        dot: live,
      }}
      amount={!refund ? fmtINR(receipt.amount) : undefined}
      expandable
      open={open}
      onToggle={onToggle}
      hoverClassName="hover:bg-[#0B211B]/[0.06]"
      surface="tint"
      surfaceTone={live ? 'rounded-2xl bg-emerald-500/[0.06]' : 'rounded-2xl bg-[#0B211B]/[0.03]'}
      wrapSurface
      className="items-start gap-3.5 p-4"
      showChevron={false}
      expansion={<ReceiptTicket receipt={receipt} />}
    />
  )
}
