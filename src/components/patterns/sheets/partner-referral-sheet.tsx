import { ChevronRight, FileText, Send, UserPlus } from 'lucide-react'
import { SheetShell } from '@/components/base/phone/sheet-shell'
import { Row } from '@/components/base/phone/row'

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
  const options = [
    { icon: UserPlus, tile: 'bg-emerald-100 text-emerald-700', title: 'Refer new patient', sub: 'Start a fresh 4-step referral wizard', onSelect: onNewReferral },
    { icon: FileText, tile: 'bg-amber-100 text-amber-700', title: 'Continue draft', sub: 'Pick up where you left off', onSelect: onContinueDraft },
    { icon: Send, tile: 'bg-sky-100 text-sky-700', title: 'View recent referrals', sub: 'See all submitted referrals', onSelect: onViewRecent },
  ]
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
        {options.map((o) => (
          <Row
            key={o.title}
            leading={
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${o.tile}`}>
                <o.icon className="h-5 w-5" strokeWidth={2.2} />
              </span>
            }
            title={o.title}
            subtitle={o.sub}
            subtitleClassName="text-xs"
            surface="none"
            padding="none"
            className="px-1"
            showChevron={false}
            trailing={<ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/30" aria-hidden />}
            onClick={o.onSelect}
          />
        ))}
      </div>
    </SheetShell>
  )
}
