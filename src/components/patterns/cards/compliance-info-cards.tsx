import { Download, Gavel, Lock, ScrollText, ShieldCheck } from 'lucide-react'
import { InfoListCard } from '@/components/patterns/cards/info-list-card'

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

export function AppendOnlyCard() {
  return (
    <InfoListCard
      icon={ShieldCheck}
      title="Append-only by design"
      subtitle="Writes are forever — edits are impossible."
      items={[
        { icon: Lock, text: 'No edits, no deletes — for anyone' },
        { icon: ShieldCheck, text: 'Sealed and timestamped on write' },
        { icon: Download, text: 'Full export, anytime' },
      ]}
    />
  )
}
