import { motion } from 'motion/react'
import { Download, ReceiptText } from 'lucide-react'
import type { Invoice } from './types'

interface BillingFooterProps {
  latest: Invoice
  onDownloadInvoice: () => void
  onUsageReport: () => void
}

export function BillingFooter({ latest, onDownloadInvoice, onUsageReport }: BillingFooterProps) {
  return (
    <div className="flex gap-2.5">
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        onClick={onDownloadInvoice}
        className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75 transition-colors hover:bg-[#0B211B]/[0.08]"
      >
        <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        <span className="truncate">{latest.month} invoice</span>
      </motion.button>
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        onClick={onUsageReport}
        className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
      >
        <ReceiptText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        <span className="truncate">Usage report</span>
      </motion.button>
    </div>
  )
}
