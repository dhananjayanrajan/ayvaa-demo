import { motion } from 'motion/react'
import { Bell, Link2, ShieldCheck } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import {
  Chip,
  Section,
  rise,
  stagger,
} from '@/components/phone/kit'
import { escalatedTickets } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { EscalationHeroCard } from '@/components/admin/escalations/EscalationHeroCard'
import { EscalationTicketCard } from '@/components/admin/escalations/EscalationTicketCard'
import { RelatedTicketsList } from '@/components/admin/escalations/RelatedTicketsList'
import { InfoListCard } from '@/components/admin/ui/InfoListCard'

export function A08() {
  const { notify } = useDemo()
  const alsoEscalated = escalatedTickets.length - 1

  return (
    <Screen>
      <AppBar
        title="Escalated tickets"
        subtitle="Needs a human decision"
        trailing={<AgentAvatar seed="ayvaa-tickets" size={42} />}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-amber-400/[0.14] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <EscalationHeroCard />

            <EscalationTicketCard notify={notify} />

            <motion.div variants={rise}>
              <Section label="Also escalated" trailing={<Chip intent="neutral">{alsoEscalated} more</Chip>} />
            </motion.div>

            <RelatedTicketsList notify={notify} />

            <motion.div variants={rise}>
              <InfoListCard
                accent="amber"
                icon={ShieldCheck}
                title="Every call is on the record"
                subtitle="Linking is automatic — so is accountability."
                items={[
                  { icon: Link2, text: 'Sessions, receipts and messages stay linked' },
                  { icon: ShieldCheck, text: 'Decisions logged with your name' },
                  { icon: Bell, text: 'The family sees the outcome' },
                ]}
              />
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of escalations" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
    </Screen>
  )
}
