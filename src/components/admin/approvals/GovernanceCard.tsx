import { motion } from 'motion/react'
import { Gavel, Lock, ScrollText } from 'lucide-react'
import { rise } from '@/components/phone/kit'
import { InfoListCard } from '@/components/admin/ui/InfoListCard'

const items = [
  { icon: Gavel, text: 'Who decided, when, on what evidence' },
  { icon: ScrollText, text: 'Rejections require a written reason' },
  { icon: Lock, text: 'Instantly written to the audit log' },
]

export function GovernanceCard() {
  return (
    <motion.div variants={rise}>
      <InfoListCard
        icon={Gavel}
        title="Decisions on the record"
        subtitle="Approvals and rejections both carry full accountability."
        items={items}
      />
    </motion.div>
  )
}
