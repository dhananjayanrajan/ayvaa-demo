import { motion } from 'motion/react'
import { FileText, MessageSquare } from 'lucide-react'

interface PartnerPatientFooterProps {
  onDischargeFile: () => void
  onMessageCareTeam: () => void
}

export function PartnerPatientFooter({ onDischargeFile, onMessageCareTeam }: PartnerPatientFooterProps) {
  return (
    <div className="flex gap-2.5">
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        onClick={onDischargeFile}
        className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/75 transition-colors hover:bg-[#0B211B]/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
      >
        <FileText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        <span className="truncate">Discharge file</span>
      </motion.button>
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        onClick={onMessageCareTeam}
        className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
      >
        <MessageSquare className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        <span className="truncate">Send a Message</span>
      </motion.button>
    </div>
  )
}
