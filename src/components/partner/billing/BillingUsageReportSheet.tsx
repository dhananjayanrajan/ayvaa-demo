import { motion } from 'motion/react'
import { ReceiptText, X } from 'lucide-react'
import type { UsageItem } from './types'

interface BillingUsageReportSheetProps {
  usage: UsageItem[]
  onClose: () => void
  onEmailReport: () => void
}

export function BillingUsageReportSheet({ usage, onClose, onEmailReport }: BillingUsageReportSheetProps) {
  return (
    <motion.div
      key="usage-report-sheet"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
      className="absolute inset-x-0 bottom-0 z-50 flex max-h-[88%] flex-col rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
    >
      <div className="shrink-0 px-5 pt-4">
        <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-7 pt-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#0B211B]/40">Usage report</div>
            <div className="mt-1 text-[19px] font-extrabold tracking-tight text-[#0B211B]">This month at a glance</div>
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
            aria-label="Close sheet"
          >
            <X className="h-4 w-4" aria-hidden />
          </motion.button>
        </div>

        <div className="mt-4 flex flex-col gap-2.5">
          {usage.map((u, i) => (
            <div key={u.label} className="flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.035] px-4 py-3.5">
              <span className="font-mono text-[10px] font-extrabold tabular-nums text-emerald-600/60">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0 flex-1 truncate text-[13px] font-bold tracking-tight text-[#0B211B]">{u.label}</span>
              <span className="shrink-0 font-mono text-[13px] font-black tabular-nums text-[#0B211B]">{u.value}</span>
            </div>
          ))}
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onClick={onEmailReport}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
        >
          <ReceiptText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          Email me the full report
        </motion.button>
        <p className="mt-2.5 text-center text-[10.5px] font-semibold text-[#0B211B]/45">
          Delivered as PDF · breaks down every session and caregiver hour
        </p>
      </div>
    </motion.div>
  )
}
