import { motion } from 'motion/react'
import { Download, Eye, FileText } from 'lucide-react'
import { SheetShell } from '@/components/base/phone/sheet-shell'

interface PartnerDischargeFileSheetProps {
  onClose: () => void
  onView: () => void
  onDownload: () => void
}

export function PartnerDischargeFileSheet({ onClose, onView, onDownload }: PartnerDischargeFileSheetProps) {
  return (
    <SheetShell
      icon={FileText}
      tone="ink"
      title="Discharge file"
      subtitle="Latest summary PDF"
      onClose={onClose}
      height="auto"
    >
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
          whileTap={{ scale: 0.97 }}
          onClick={onView}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.05] py-3 text-sm font-bold text-[#0B211B]/75 transition-colors hover:bg-[#0B211B]/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
        >
          <Eye className="h-4 w-4" />
          View
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={onDownload}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
        >
          <Download className="h-4 w-4" />
          Download
        </motion.button>
      </div>
    </SheetShell>
  )
}
