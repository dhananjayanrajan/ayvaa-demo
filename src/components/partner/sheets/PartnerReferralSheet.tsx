import { ChevronRight, FileText, Send, UserPlus } from 'lucide-react'
import { SheetShell } from '@/components/phone/SheetShell'

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
    <SheetShell
      icon={UserPlus}
      tone="live"
      title="Referral options"
      subtitle="Choose how you want to proceed"
      onClose={onClose}
      height="auto"
    >
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
    </SheetShell>
  )
}
