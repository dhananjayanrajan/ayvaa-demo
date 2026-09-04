import { Download, Lock, ShieldCheck } from 'lucide-react'
import { InfoListCard } from '@/components/patterns/cards/info-list-card'

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
