import { motion } from 'motion/react'
import { Activity } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import {
  Chip,
  Hero,
  Kicker,
  LiveChip,
  Section,
  Stat,
  rise,
  stagger,
} from '@/components/phone/kit'
import { adminAttention, adminMetrics } from '@/data/seed'
import { IncidentOverviewCard } from '@/components/admin/IncidentOverviewCard'
import { AttentionList } from '@/components/admin/AttentionList'
import { LiveSessionsCard } from '@/components/admin/LiveSessionsCard'

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
              <Hero>
                <Kicker>
                  <Activity className="h-3 w-3 text-emerald-300/80" aria-hidden />
                  Operations console · live
                </Kicker>
                <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  Friday is running{' '}
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">on rails</span>
                </h2>
                <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                  Every queue is moving, verified and accounted for.
                </p>

                <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.08]">
                  <Stat label="Active" value={adminMetrics.activeBookings} dot="bg-emerald-300" />
                  <Stat label="Today" value={adminMetrics.sessionsToday} dot="bg-teal-300" />
                  <Stat label="Verified" value={adminMetrics.verified} dot="bg-sky-300/80" />
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  <Chip intent="danger" light dot>
                    {adminMetrics.openIncidents} open incidents
                  </Chip>
                  <Chip intent="success" light>All systems normal</Chip>
                </div>
              </Hero>
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
