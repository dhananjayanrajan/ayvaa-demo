import { motion } from 'motion/react'
import { Activity, AlertTriangle, CalendarCheck, Hourglass, ShieldCheck, UserCheck } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { ActionRow, IconTile, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill, StatCard } from '@/components/phone/Controls'
import { adminAttention, adminMetrics } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

const attentionIcons = [Hourglass, UserCheck, ShieldCheck]

export function A01() {
  const { navigate } = useRouter()
  const { notify, dispatch } = useDemo()

  const attentionActions = [
    () =>
      notify({
        title: 'Dispatch round in progress',
        body: `Round ${dispatch.round} · ${dispatch.waiting} offers waiting · expires ${dispatch.expiresAt}`,
        kind: 'info',
      }),
    () => navigate('/admin/a03'),
    () => navigate('/admin/a06'),
  ]

  return (
    <Screen>
      <AppBar
        title="Operations console"
        subtitle="Ayvaa HQ · live"
        trailing={
          <div className="flex items-center gap-2">
            <AgentAvatar seed="ayvaa-admin" size={42} />
            <Pill tone="ok">All systems</Pill>
          </div>
        }
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item} className="flex gap-3">
            <StatCard icon={CalendarCheck} value={adminMetrics.activeBookings} label="Active bookings" tone="mint" />
            <StatCard icon={Activity} value={adminMetrics.sessionsToday} label="Sessions today" />
          </motion.div>
          <motion.div variants={item} className="flex gap-3">
            <StatCard icon={ShieldCheck} value={adminMetrics.verified} label="Sessions verified" />
            <StatCard
              icon={AlertTriangle}
              value={String(adminMetrics.openIncidents)}
              label="Open incidents"
              tone="error"
              className="cursor-pointer"
              onClick={() => navigate('/admin/a02')}
            />
          </motion.div>
          <motion.div variants={item}>
            <SectionHeader label="Needs attention now" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {adminAttention.map((a, i) => {
                const Icon = attentionIcons[i] ?? AlertTriangle
                return (
                  <div key={a.title} className="px-2 py-1.5">
                    <ActionRow
                      icon={Icon}
                      title={a.title}
                      subtitle={a.body}
                      onClick={attentionActions[i]}
                    />
                  </div>
                )
              })}
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard tone="mint" className="flex items-center gap-3">
              <IconTile icon={Activity} tone="white" className="animate-pulse" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-brand-ink">{adminMetrics.liveSessions} sessions live right now</div>
                <div className="mt-0.5 text-[13px] font-medium text-brand-ink/80">GPS-verified check-ins across Hyderabad</div>
              </div>
              <Pill tone="ok" className="bg-white/70">Live</Pill>
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <EndOfScroll label="End of console" />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}
