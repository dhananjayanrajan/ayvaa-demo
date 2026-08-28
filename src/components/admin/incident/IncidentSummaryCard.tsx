import { motion } from 'motion/react'
import { Card, Chip, rise } from '@/components/phone/kit'
import { Overline } from '@/components/admin/ui/Overline'
import type { Incident } from '@/data/types'

interface IncidentSummaryCardProps {
  inc: Incident
}

export function IncidentSummaryCard({ inc }: IncidentSummaryCardProps) {
  return (
    <motion.div variants={rise}>
      <Card>
        <div className="p-4">
          <Overline>What happened</Overline>
          <p className="mt-1.5 text-pretty text-[13px] font-medium leading-relaxed text-[#0B211B]/75">{inc.summary}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {inc.tags.map((t) => (
              <Chip key={t} intent="neutral">
                {t}
              </Chip>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
