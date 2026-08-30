import { motion } from 'motion/react'
import { Activity } from 'lucide-react'
import { Card, Chip, Tile, rise } from '@/components/phone/kit'
import { adminMetrics } from '@/data/seed'

export function LiveSessionsCard() {
  return (
    <motion.div variants={rise}>
      <Card intent="success">
        <div className="flex items-center gap-3 p-5">
          <Tile icon={Activity} tone="live" size="lg" />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-extrabold leading-snug tracking-tight text-[#0B211B]">
              {adminMetrics.liveSessions} sessions live right now
            </div>
            <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              GPS-verified check-ins across Hyderabad
            </div>
          </div>
          <Chip intent="live" dot>Live</Chip>
        </div>
      </Card>
    </motion.div>
  )
}
