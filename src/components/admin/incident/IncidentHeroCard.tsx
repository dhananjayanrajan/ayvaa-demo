import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { Chip, Kicker, rise } from '@/components/phone/kit'
import { ShieldAlert } from 'lucide-react'
import type { Incident } from '@/data/types'

function IncidentHero({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[26px] border border-rose-200/10 bg-[#230D14] shadow-[0_28px_64px_-30px_rgba(60,10,25,0.7)]">
      <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-rose-500/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />
      <div className="relative p-5">{children}</div>
    </div>
  )
}

interface IncidentHeroCardProps {
  inc: Incident
}

export function IncidentHeroCard({ inc }: IncidentHeroCardProps) {
  return (
    <motion.div variants={rise}>
      <IncidentHero>
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
      </IncidentHero>
    </motion.div>
  )
}
