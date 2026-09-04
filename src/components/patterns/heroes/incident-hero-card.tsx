import { motion } from 'motion/react'
import { Chip, Hero, Kicker, rise } from '@/components/base/phone/kit'
import { ShieldAlert } from 'lucide-react'
import type { Incident } from '@/data/types'

interface IncidentHeroCardProps {
  inc: Incident
}

export function IncidentHeroCard({ inc }: IncidentHeroCardProps) {
  return (
    <motion.div variants={rise}>
      <Hero tone="rose">
        <Kicker>Critical incident · auto-contained</Kicker>
        <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
          Care plan{' '}
          <span className="bg-gradient-to-r from-rose-300 to-orange-200 bg-clip-text text-transparent">paused automatically</span>
        </h2>
        <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-rose-100/55">
          Post-operative care plan · week 4 of 6 · paused until a supervisor closes this incident.
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          <Chip intent="neutral" light>Raised {inc.raised}</Chip>
          <Chip intent="neutral" light>By {inc.by}</Chip>
          <Chip intent="danger" light icon={ShieldAlert}>Containment active</Chip>
        </div>
      </Hero>
    </motion.div>
  )
}
