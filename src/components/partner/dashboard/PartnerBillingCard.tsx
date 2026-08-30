import { motion } from 'motion/react'
import { ReceiptText } from 'lucide-react'
import { Card, Chip, Tile } from '@/components/phone/kit'

interface PartnerBillingCardProps {
  invoiceAmount: string
  invoiceSessions: string
  onViewBilling: () => void
}

export function PartnerBillingCard({ invoiceAmount, invoiceSessions, onViewBilling }: PartnerBillingCardProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.985 }}
      onClick={onViewBilling}
      className="group block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2"
    >
      <Card>
        <div className="flex items-center gap-3 p-4">
          <Tile icon={ReceiptText} tone="emerald" size="lg" />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-extrabold leading-snug tracking-tight text-[#0B211B]">February invoice</div>
            <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">{invoiceSessions}</div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <span className="font-mono text-[14px] font-black tabular-nums tracking-tight text-[#0B211B]">{invoiceAmount}</span>
            <Chip intent="success" className="border-transparent">Paid</Chip>
          </div>
        </div>
      </Card>
    </motion.button>
  )
}
