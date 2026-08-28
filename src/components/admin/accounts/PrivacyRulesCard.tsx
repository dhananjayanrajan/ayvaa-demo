import { motion } from 'motion/react'
import { Eye, Lock, ShieldCheck } from 'lucide-react'
import { Chip, rise } from '@/components/phone/kit'
import { InfoListCard } from '@/components/admin/ui/InfoListCard'

const items = [
  { icon: Eye, text: 'Every view is logged with your name' },
  { icon: ShieldCheck, text: 'Flagged accounts are supervisor-only' },
  { icon: Lock, text: 'Access writes to the immutable audit record' },
]

export function PrivacyRulesCard() {
  return (
    <motion.div variants={rise}>
      <InfoListCard
        icon={Eye}
        title="Private by default"
        subtitle="Account access is never silent. Each rule below is enforced by the platform itself."
        items={items}
        footer={
          <>
            <Chip intent="neutral" light icon={Lock}>Audit-grade</Chip>
            <Chip intent="success" light>Zero silent access</Chip>
          </>
        }
      />
    </motion.div>
  )
}
