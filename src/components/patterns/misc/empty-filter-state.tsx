import { motion } from 'motion/react'
import { Inbox } from 'lucide-react'
import { Card, rise } from '@/components/base/phone/kit'
import { EmptyState } from '@/components/base/phone/empty-state'

interface EmptyFilterStateProps {
  filter: string
}

export function EmptyFilterState({ filter }: EmptyFilterStateProps) {
  const label =
    filter === 'approved' ? 'No approved decisions' :
    filter === 'rejected' ? 'No rejected decisions' :
    'Nothing pending'

  return (
    <motion.div variants={rise}>
      <Card className="p-4">
        <EmptyState
          container="dashed"
          icon={Inbox}
          tone="emerald"
          badge="round"
          size="md"
          title={label}
          titleClassName="text-[13.5px] font-bold tracking-tight text-[#0B211B]/70"
          body="Every decision lands in the audit log"
          bodyClassName="text-xs leading-relaxed text-[#0B211B]/45"
          chip="Nothing pending"
          chipIntent="success"
        />
      </Card>
    </motion.div>
  )
}
