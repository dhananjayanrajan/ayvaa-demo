import { motion } from 'motion/react'
import { Ban, CalendarClock, ShieldCheck } from 'lucide-react'
import { rise } from '@/components/phone/kit'
import { InfoListCard } from '@/components/admin/ui/InfoListCard'

const items = [
  { icon: CalendarClock, text: 'Re-confirmed every 90 days' },
  { icon: Ban, text: 'Withdrawals stop care immediately' },
  { icon: ShieldCheck, text: 'Sealed record, immutable' },
]

export function ConsentLifecycleCard() {
  return (
    <motion.div variants={rise}>
      <InfoListCard
        icon={ShieldCheck}
        title="Consent is a living record"
        subtitle="The ledger enforces itself — no chasing, no expiry surprises."
        items={items}
      />
    </motion.div>
  )
}
