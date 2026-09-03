import { motion } from 'motion/react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Chip, LiveChip, Section, rise, stagger } from '@/components/phone/kit'
import { adminAttention, adminMetrics } from '@/data/admin/a01Data'
import { IncidentOverviewCard } from '@/components/admin/dashboard/IncidentOverviewCard'
import { AttentionList } from '@/components/admin/dashboard/AttentionList'
import { LiveSessionsCard } from '@/components/admin/dashboard/LiveSessionsCard'
import { OperationsHero } from '@/components/admin/heroes/OperationsHero'

export function A01() {
  return (
    <Screen>
      <AppBar
        title="Operations console"
        subtitle="Ayvaa HQ · live"
        trailing={
          <div className="flex items-center gap-2">
            <AgentAvatar seed="ayvaa-admin" size={42} />
            <LiveChip />
          </div>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <OperationsHero
                activeBookings={adminMetrics.activeBookings}
                sessionsToday={adminMetrics.sessionsToday}
                verified={adminMetrics.verified}
                openIncidents={adminMetrics.openIncidents}
              />
            </motion.div>

            <IncidentOverviewCard />

            <motion.div variants={rise}>
              <Section label="Needs attention now" trailing={<Chip intent="neutral">{adminAttention.length} queues</Chip>} />
            </motion.div>

            <AttentionList />

            <LiveSessionsCard />

            <motion.div variants={rise}>
              <EndOfScroll label="End of console" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
    </Screen>
  )
}
