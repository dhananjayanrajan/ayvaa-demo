import { motion } from 'motion/react'
import { BellRing } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import {
  Chip,
  Hero,
  Kicker,
  LiveChip,
  LiveDot,
  Section,
  Stat,
  rise,
  stagger,
} from '@/components/phone/kit'
import { autoNotifications } from '@/data/system/notifications'
import { useDemo } from '@/lib/store'
import { PushPreview } from '@/components/phone/PushPreview'
import { NotificationFeed } from '@/components/notifications/NotificationsSet'
import { IncidentLinkingCard } from '@/components/escalations/EscalationsSet'
import { EventFanOutCard } from '@/components/drills/DrillsSet'

export function S03() {
  const { notify } = useDemo()
  const sent = autoNotifications.length
  const first = autoNotifications[0]

  return (
    <Screen>
      <AppBar
        title="Automated notifications"
        subtitle="Sent today · nobody pressed send"
        trailing={
          <div className="flex items-center gap-2">
            <AgentAvatar seed="ayvaa-alerts" size={42} />
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
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <Kicker>Notification feed</Kicker>
                    <h2 className="mt-2 text-[19px] font-extrabold leading-snug tracking-tight text-white">
                      {sent} pushes,{' '}
                      <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">zero taps</span>
                    </h2>
                    <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                      Every update landed on time — the system sent them itself.
                    </p>
                  </div>
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
                    <span aria-hidden className="absolute inset-0 rounded-full bg-emerald-400/10 blur-lg" />
                    <BellRing className="relative h-5 w-5 text-emerald-200" strokeWidth={2} aria-hidden />
                    <LiveDot className="absolute right-2.5 top-2.5 text-emerald-300" />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.08]">
                  <Stat label="Delivered" value={sent} dot="bg-emerald-300" />
                  <Stat label="Failed" value={0} dot="bg-rose-300/70" />
                  <Stat label="Open rate" value="94%" dot="bg-teal-300" />
                </div>

                {first && (
                  <div className="mt-4">
                    <PushPreview title={first.title} body={first.body} time="now" onDark />
                  </div>
                )}
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Live feed · today" trailing={<Chip intent="success">Auto</Chip>} />
            </motion.div>

            <NotificationFeed notify={notify} />

            <motion.div variants={rise}>
              <Section label="Incident auto-linking" trailing={<Chip intent="danger">This week</Chip>} />
            </motion.div>

            <IncidentLinkingCard />

            <motion.div variants={rise}>
              <Section label="One event, everywhere" trailing={<Chip intent="info">Fan-out</Chip>} />
            </motion.div>

            <EventFanOutCard />

            <motion.div variants={rise}>
              <EndOfScroll label="End of notification feed" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
    </Screen>
  )
}
