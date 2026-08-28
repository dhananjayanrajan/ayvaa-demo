import { motion } from 'motion/react'
import { CheckCircle2, ShieldAlert } from 'lucide-react'
import { Card, Chip, Tile, rise } from '@/components/phone/kit'
import type { Incident } from '@/data/types'

interface LinkedRecordsCardProps {
  inc: Incident
}

export function LinkedRecordsCard({ inc }: LinkedRecordsCardProps) {
  return (
    <motion.div variants={rise}>
      <Card>
        <div className="flex items-start gap-3 p-4">
          <Tile icon={CheckCircle2} tone="success" />
          <div className="min-w-0 flex-1">
            <div className="text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">{inc.linkedVisit}</div>
            <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              Visit record · sealed and timestamped
            </div>
          </div>
          <Chip intent="success">Sealed</Chip>
        </div>
        <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />
        <div className="flex items-start gap-3 p-4">
          <Tile icon={ShieldAlert} tone="warning" />
          <div className="min-w-0 flex-1">
            <div className="text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">{inc.linkedPlan}</div>
            <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              Care plan · resumes when incident closes
            </div>
          </div>
          <Chip intent="warning">Paused</Chip>
        </div>
      </Card>
    </motion.div>
  )
}
