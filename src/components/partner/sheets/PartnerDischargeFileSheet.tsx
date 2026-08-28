import { motion } from 'motion/react'
import { FileText, X, Download, Eye } from 'lucide-react'
import { Tile } from '@/components/phone/kit'

interface PartnerDischargeFileSheetProps {
  onClose: () => void
  onView: () => void
  onDownload: () => void
}

export function PartnerDischargeFileSheet({ onClose, onView, onDownload }: PartnerDischargeFileSheetProps) {
  return (
    <motion.div
      key="discharge-file-sheet"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
      className="absolute inset-x-0 bottom-0 z-50 flex flex-col gap-3.5 rounded-t-[28px] bg-white p-5 pb-7 shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
    >
      <div aria-hidden className="mx-auto h-1.5 w-10 shrink-0 rounded-full bg-[#0B211B]/15" />
      <div className="flex items-start gap-3">
        <Tile icon={FileText} tone="ink" size="lg" />
        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Discharge file</div>
          <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">Latest summary PDF</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50 transition-colors hover:bg-[#0B211B]/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
          aria-label="Close discharge file sheet"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div className="rounded-2xl bg-[#0B211B]/[0.03] p-4">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold text-[#0B211B]">Discharge Summary.pdf</span>
          <span className="text-[11px] font-medium text-[#0B211B]/45">2.4 MB</span>
        </div>
        <div className="mt-1 text-xs font-medium text-[#0B211B]/55">Last updated · today, 9:15 AM</div>
      </div>

      <div className="flex gap-2">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onView}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.05] py-3 text-sm font-bold text-[#0B211B]/75 transition-colors hover:bg-[#0B211B]/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
        >
          <Eye className="h-4 w-4" />
          View
        </motion.button>
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onDownload}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
        >
          <Download className="h-4 w-4" />
          Download
        </motion.button>
      </div>
    </motion.div>
  )
}
