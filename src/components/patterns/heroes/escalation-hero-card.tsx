import { motion } from 'motion/react'
import { Chip, Hero, rise } from '@/components/base/phone/kit'
import { escalatedTickets } from '@/data/seed'

export function EscalationHeroCard() {
  const [e1] = escalatedTickets

  return (
    <motion.div variants={rise}>
      <Hero tone="amber">
        <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-amber-200/50">
          Escalation · judgment call
        </div>
        <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
          This one needs{' '}
          <span className="bg-gradient-to-r from-amber-200 to-orange-100 bg-clip-text text-transparent">your judgment</span>
        </h2>
        <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-amber-100/55">
          The system did its part — a human now closes the loop.
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          <motion.div
            animate={{ opacity: [1, 0.8, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Chip intent="warning" light dot>
              Waiting {e1.waiting}
            </Chip>
          </motion.div>
          <Chip intent="neutral" light>
            Human decision required
          </Chip>
        </div>
      </Hero>
    </motion.div>
  )
}
