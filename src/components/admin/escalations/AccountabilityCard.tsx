import { motion } from 'motion/react'
import { Bell, Link2, ShieldCheck } from 'lucide-react'
import { rise } from '@/components/phone/kit'
import { InfoListCard } from '@/components/admin/ui/InfoListCard'

const items = [
  { icon: Link2, text: 'Sessions, receipts and messages stay linked' },
  { icon: ShieldCheck, text: 'Decisions logged with your name' },
  { icon: Bell, text: 'The family sees the outcome' },
]

export function AccountabilityCard() {
  return (
    <motion.div variants={rise}>
      <InfoListCard
        accent="amber"
        icon={ShieldCheck}
        title="Every call is on the record"
        subtitle="Linking is automatic — so is accountability."
        items={items}
      />
    </motion.div>
  )
}
