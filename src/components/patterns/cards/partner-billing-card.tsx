import { motion } from 'motion/react'
import { ReceiptText } from 'lucide-react'
import { Card, Chip } from '@/components/base/phone/kit'
import { Row } from '@/components/base/phone/row'
import type { TileTone } from '@/components/base/phone/kit'

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
        <Row
          icon={ReceiptText}
          tone={'emerald' as TileTone}
          tileSize="lg"
          title="February invoice"
          titleClassName="text-sm font-extrabold leading-snug"
          subtitle={invoiceSessions}
          subtitleClassName="text-xs"
          trailing={
            <span className="flex shrink-0 flex-col items-end gap-1.5">
              <span className="font-mono text-[14px] font-black tabular-nums tracking-tight text-[#0B211B]">{invoiceAmount}</span>
              <Chip intent="success" className="border-transparent">Paid</Chip>
            </span>
          }
          className="p-4"
          showChevron={false}
          hoverClassName="hover:bg-transparent"
          whileTapDisabled
        />
      </Card>
    </motion.button>
  )
}
