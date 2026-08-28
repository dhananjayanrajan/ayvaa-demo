import { motion } from 'motion/react'
import { Activity, AlertTriangle, ChevronRight, Hourglass, ShieldCheck, UserCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import {
  Card,
  Chip,
  Hero,
  Kicker,
  LiveChip,
  Section,
  Stat,
  Tile,
  rise,
  stagger,
} from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'
import { adminAttention, adminMetrics } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

export function A01() {
  const { navigate } = useRouter()
  const { notify, dispatch } = useDemo()

  const attention: { icon: LucideIcon; tone: TileTone; onClick: () => void }[] = [
    {
      icon: Hourglass,
      tone: 'warning',
      onClick: () =>
        notify({
          title: 'Dispatch round in progress',
          body: `Round ${dispatch.round} · ${dispatch.waiting} offers waiting · expires ${dispatch.expiresAt}`,
          kind: 'info',
        }),
    },
    { icon: UserCheck, tone: 'success', onClick: () => navigate('/admin/a03') },
    { icon: ShieldCheck, tone: 'ink', onClick: () => navigate('/admin/a06') },
  ]

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

            <motion.div variants={rise}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.985 }}
                onClick={() => navigate('/admin/a02')}
                className="group block w-full text-left"
              >
                <Card intent="danger">
                  <div className="flex items-center gap-3 p-4">
                    <Tile icon={AlertTriangle} tone="danger" size="lg" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
                        {adminMetrics.openIncidents} open incidents
                      </span>
                      <span className="mt-0.5 block text-xs font-medium text-[#0B211B]/55">
                        One is critical · tap to open the incident room
                      </span>
                    </span>
                    <ChevronRight
                      className="h-4 w-4 shrink-0 text-rose-500/60 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </div>
                </Card>
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Needs attention now" trailing={<Chip intent="neutral">{attention.length} queues</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {attention.map((a, i) => (
                  <div key={adminAttention[i].title}>
                    {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.985 }}
                      onClick={a.onClick}
                      className="group flex w-full items-center gap-3 px-4 py-3.5 text-left"
                    >
                      <Tile icon={a.icon} tone={a.tone} />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">
                          {adminAttention[i].title}
                        </span>
                        <span className="mt-0.5 block line-clamp-2 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                          {adminAttention[i].body}
                        </span>
                      </span>
                      <ChevronRight
                        className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/20 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600"
                        aria-hidden
                      />
                    </motion.button>
                  </div>
                ))}
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Card intent="success">
                <div className="flex items-center gap-3 p-5">
                  <Tile icon={Activity} tone="live" size="lg" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
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

            <motion.div variants={rise}>
              <EndOfScroll label="End of console" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
    </Screen>
  )
}
