import { Gavel, Lock, ScrollText } from 'lucide-react'
import { InfoListCard } from '@/components/admin/ui/InfoListCard'

export function AccountabilityCard() {
  return (
    <InfoListCard
      icon={Gavel}
      title="Decisions on the record"
      subtitle="Approvals and rejections both carry full accountability."
      items={[
        { icon: Gavel, text: 'Who decided, when, on what evidence' },
        { icon: ScrollText, text: 'Rejections require a written reason' },
        { icon: Lock, text: 'Instantly written to the audit log' },
      ]}
    />
  )
}
