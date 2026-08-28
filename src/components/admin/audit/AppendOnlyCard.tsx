import { motion } from 'motion/react'
import { Download, Lock, ShieldCheck } from 'lucide-react'
import { rise } from '@/components/phone/kit'
import { InfoListCard } from '@/components/admin/ui/InfoListCard'

const items = [
  { icon: Lock, text: 'No edits, no deletes — for anyone' },
  { icon: ShieldCheck, text: 'Sealed and timestamped on write' },
  { icon: Download, text: 'Full export, anytime' },
]

export function AppendOnlyCard() {
  return (
    <motion.div variants={rise}>
      <InfoListCard
        icon={ShieldCheck}
        title="Append-only by design"
        subtitle="Writes are forever — edits are impossible."
        items={items}
      />
    </motion.div>
  )
}
