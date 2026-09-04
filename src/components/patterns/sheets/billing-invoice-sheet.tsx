import { motion } from 'motion/react'
import { ClipboardCheck, Download, X } from 'lucide-react'
import { Chip } from '@/components/base/phone/kit'
import { SheetShell } from '@/components/base/phone/sheet-shell'
import type { Invoice, UsageItem } from '@/data/partnerBillingTypes'

interface BillingInvoiceSheetProps {
  invoice: Invoice
  usage: UsageItem[]
  onClose: () => void
  onDownload: () => void
}

export function BillingInvoiceSheet({ invoice, usage, onClose, onDownload }: BillingInvoiceSheetProps) {
  return (
    <SheetShell onClose={onClose} height="scroll">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#0B211B]/40">Statement</div>
          <div className="mt-1 text-[19px] font-extrabold tracking-tight text-[#0B211B]">{invoice.month}</div>
        </div>
        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={onClose}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
          aria-label="Close sheet"
        >
          <X className="h-4 w-4" aria-hidden />
        </motion.button>
      </div>

      <div className="mt-4 flex items-end justify-between rounded-3xl bg-[#0B231C] p-4">
        <div>
          <div className="font-mono text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Amount</div>
          <div className="mt-1 font-mono text-[26px] font-black leading-none tracking-tight text-white">{invoice.amount}</div>
        </div>
        <Chip intent={invoice.status === 'paid' ? 'success' : 'warning'} className="border-transparent">
          {invoice.status === 'paid' ? `Paid ${invoice.paidOn ?? ''}` : 'Projected'}
        </Chip>
      </div>

      <div className="mt-4 rounded-2xl bg-[#0B211B]/[0.035] p-4">
        <div className="flex flex-col gap-3.5">
          {usage.map((u) => (
            <div key={u.label} className="flex items-center justify-between gap-4">
              <span className="text-[12px] font-semibold leading-snug text-[#0B211B]/60">{u.label}</span>
              <span className="shrink-0 font-mono text-[12.5px] font-bold tabular-nums text-[#0B211B]">{u.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-[#0B211B]/[0.04] px-3.5 py-3">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#0B211B]/60">Total</span>
            <span className="font-mono text-[15px] font-black tabular-nums text-emerald-700">{invoice.amount}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2.5 px-1">
        <ClipboardCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600/70" strokeWidth={2.4} aria-hidden />
        <p className="min-w-0 flex-1 text-[10.5px] font-semibold leading-relaxed text-[#0B211B]/50">
          Generated from {invoice.sessions} verified sessions. Each one has a signed visit record.
        </p>
      </div>

      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={onDownload}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
      >
        <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        Download PDF
      </motion.button>
    </SheetShell>
  )
}
