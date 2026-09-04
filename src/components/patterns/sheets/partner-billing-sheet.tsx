import { ChevronRight, ReceiptText } from 'lucide-react'
import { SheetShell } from '@/components/base/phone/sheet-shell'

interface PartnerBillingSheetProps {
  invoiceAmount: string
  invoiceSessions: string
  onClose: () => void
  onViewBilling: () => void
}

export function PartnerBillingSheet({
  invoiceAmount,
  invoiceSessions,
  onClose,
  onViewBilling,
}: PartnerBillingSheetProps) {
  return (
    <SheetShell
      icon={ReceiptText}
      tone="warning"
      title="Billing summary"
      subtitle="February invoice is paid"
      onClose={onClose}
      height="auto"
    >
      <div className="rounded-2xl bg-[#0B211B]/[0.03] p-4">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold text-[#0B211B]">February invoice</span>
          <span className="font-mono text-lg font-black text-[#0B211B]">{invoiceAmount}</span>
        </div>
        <div className="mt-1 text-xs font-medium text-[#0B211B]/55">{invoiceSessions}</div>
      </div>
      <button
        type="button"
        onClick={onViewBilling}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.05] py-3 text-sm font-bold text-[#0B211B]/75"
      >
        View billing details
        <ChevronRight className="h-4 w-4" />
      </button>
    </SheetShell>
  )
}
