import { motion } from 'motion/react'
import { X, Send, UserPlus, FileText, ChevronRight } from 'lucide-react'
import { Tile } from '@/components/phone/kit'

interface PartnerReferralSheetProps {
  onClose: () => void
  onNewReferral: () => void
  onContinueDraft: () => void
  onViewRecent: () => void
}

export function PartnerReferralSheet({
  onClose,
  onNewReferral,
  onContinueDraft,
  onViewRecent,
}: PartnerReferralSheetProps) {
  return (
    <motion.div
      key="referral-sheet"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
      className="absolute inset-x-0 bottom-0 z-50 flex flex-col gap-3.5 rounded-t-[28px] bg-white p-5 pb-7 shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
    >
      <div aria-hidden className="mx-auto h-1.5 w-10 shrink-0 rounded-full bg-[#0B211B]/15" />
      <div className="flex items-start gap-3">
        <Tile icon={UserPlus} tone="live" size="lg" />
        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Referral options</div>
          <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">Choose how you want to proceed</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
          aria-label="Close referral options"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div className="flex flex-col">
        <button
          type="button"
          onClick={onNewReferral}
          className="flex items-center gap-3 px-1 py-3.5 text-left"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <UserPlus className="h-5 w-5" strokeWidth={2.2} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[13.5px] font-bold tracking-tight text-[#0B211B]">Refer new patient</div>
            <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">Start a fresh 4-step referral wizard</div>
          </div>
          <ChevronRight className="h-4 w-4 text-[#0B211B]/30" />
        </button>
        <button
          type="button"
          onClick={onContinueDraft}
          className="flex items-center gap-3 px-1 py-3.5 text-left"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <FileText className="h-5 w-5" strokeWidth={2.2} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[13.5px] font-bold tracking-tight text-[#0B211B]">Continue draft</div>
            <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">Pick up where you left off</div>
          </div>
          <ChevronRight className="h-4 w-4 text-[#0B211B]/30" />
        </button>
        <button
          type="button"
          onClick={onViewRecent}
          className="flex items-center gap-3 px-1 py-3.5 text-left"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-700">
            <Send className="h-5 w-5" strokeWidth={2.2} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[13.5px] font-bold tracking-tight text-[#0B211B]">View recent referrals</div>
            <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">See all submitted referrals</div>
          </div>
          <ChevronRight className="h-4 w-4 text-[#0B211B]/30" />
        </button>
      </div>
    </motion.div>
  )
}
