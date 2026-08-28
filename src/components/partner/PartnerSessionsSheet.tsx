import { motion } from 'motion/react'
import { X, Stethoscope, ChevronRight } from 'lucide-react'
import { Tile } from '@/components/phone/kit'

interface PartnerSessionsSheetProps {
  sessionsCount: number
  onClose: () => void
  onViewHistory: () => void
}

export function PartnerSessionsSheet({ sessionsCount, onClose, onViewHistory }: PartnerSessionsSheetProps) {
  return (
    <motion.div
      key="sessions-sheet"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
      className="absolute inset-x-0 bottom-0 z-50 flex flex-col gap-3.5 rounded-t-[28px] bg-white p-5 pb-7 shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
    >
      <div aria-hidden className="mx-auto h-1.5 w-10 shrink-0 rounded-full bg-[#0B211B]/15" />
      <div className="flex items-start gap-3">
        <Tile icon={Stethoscope} tone="ink" size="lg" />
        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Sessions this month</div>
          <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">{sessionsCount} verified sessions</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
          aria-label="Close session summary"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
      <div className="flex items-center justify-between rounded-2xl bg-[#0B211B]/[0.03] p-4">
        <span className="text-[13px] font-bold text-[#0B211B]">Completed</span>
        <span className="font-mono text-lg font-black text-[#0B211B]">{sessionsCount}</span>
      </div>
      <button
        type="button"
        onClick={onViewHistory}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.05] py-3 text-sm font-bold text-[#0B211B]/75"
      >
        View session history
        <ChevronRight className="h-4 w-4" />
      </button>
    </motion.div>
  )
}
