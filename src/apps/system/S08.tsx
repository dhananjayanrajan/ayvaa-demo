import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { BellRing, Loader2, Radio } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Chip, Section, rise, stagger } from '@/components/phone/kit'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { LiveFanOutCard } from '@/components/system/LiveFanOutCard'
import { DeliveryHealthCard } from '@/components/system/DeliveryHealthCard'
import { NotificationFeed } from '@/components/system/NotificationFeed'
import { IncidentLinkingCard } from '@/components/system/IncidentLinkingCard'
import { IncidentTimelineCard } from '@/components/system/IncidentTimelineCard'
import { SupervisorEscalationCard } from '@/components/system/SupervisorEscalationCard'

const FANOUT_MS = 5 * 420 + 260

export function S08() {
  const { notify, pushTrail } = useDemo()
  const { navigate } = useRouter()
  const [run, setRun] = useState(0)
  const [live, setLive] = useState(false)
  const [delivered, setDelivered] = useState(false)
  const [pushes, setPushes] = useState(1240)
  const [latency, setLatency] = useState('0.4s')
  const timers = useRef<number[]>([])

  useEffect(() => {
    return () => {
      timers.current.forEach((t) => window.clearTimeout(t))
    }
  }, [])

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }

  const schedule = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }

  const simulate = () => {
    clearTimers()
    setLive(true)
    setRun((r) => r + 1)
    notify({
      title: 'Live alert emitted',
      body: 'Near fall · Mrs. Iyer · fanning out to 5 destinations',
      kind: 'info',
    })
    schedule(() => {
      setLive(false)
      setDelivered(true)
      setPushes((p) => p + 1)
      setLatency('0.4s')
      pushTrail({
        time: '9:41 AM',
        title: 'Incident alert delivered',
        body: 'Near fall · Mrs. Iyer · fanned out to 5 destinations in 0.4s',
        state: 'done',
      })
      notify({
        title: 'Delivered everywhere',
        body: 'Family, caregiver, partner, audit log and escalation pager',
        kind: 'ok',
      })
    }, FANOUT_MS)
  }

  const onFeedTap = (p: { title: string; body: string; kind: 'ok' | 'warn' | 'info' }) => {
    notify(p)
  }

  const onIncidentTap = (p: { title: string; body: string; kind: 'ok' | 'warn' | 'info' }) => {
    notify(p)
  }

  const onEscalationTap = (p: { title: string; body: string; kind: 'ok' | 'warn' | 'info' }) => {
    notify(p)
  }

  return (
    <Screen>
      <AppBar
        title="Every alert, delivered"
        subtitle="Notification delivery · incident timeline"
        onBack={() => navigate('/system/s04')}
        trailing={<AgentAvatar seed="ayvaa-system" size={42} />}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Section
                label="Live delivery"
                trailing={
                  live ? (
                    <Chip intent="warning" dot className="border-transparent">Fanning out</Chip>
                  ) : delivered ? (
                    <Chip intent="success" className="border-transparent">Delivered</Chip>
                  ) : (
                    <Chip intent="neutral" className="border-transparent">Idle</Chip>
                  )
                }
              />
            </motion.div>

            <LiveFanOutCard run={run} />

            <motion.div variants={rise}>
              <Section
                label="Delivery health"
                trailing={
                  live ? (
                    <Chip intent="warning" dot className="border-transparent">Live</Chip>
                  ) : (
                    <Chip intent="success" className="border-transparent">99.2%</Chip>
                  )
                }
              />
            </motion.div>

            <DeliveryHealthCard pushes={pushes} latency={latency} live={live} />

            <motion.div variants={rise}>
              <Section
                label="Notification feed"
                trailing={
                  <Chip intent="success" className="border-transparent">All sent</Chip>
                }
              />
            </motion.div>

            <NotificationFeed notify={onFeedTap} delivered={delivered} />

            <motion.div variants={rise}>
              <Section
                label="Incident linking"
                trailing={
                  <Chip intent="danger" className="border-transparent">
                    {delivered ? '4 linked' : '3 linked'}
                  </Chip>
                }
              />
            </motion.div>

            <IncidentLinkingCard delivered={delivered} />

            <motion.div variants={rise}>
              <Section
                label="Incident timeline"
                trailing={
                  delivered ? (
                    <Chip intent="danger" dot className="border-transparent">Live</Chip>
                  ) : (
                    <Chip intent="neutral" className="border-transparent">Idle</Chip>
                  )
                }
              />
            </motion.div>

            <IncidentTimelineCard notify={onIncidentTap} delivered={delivered} />

            <motion.div variants={rise}>
              <Section
                label="Supervisor escalation"
                trailing={
                  delivered ? (
                    <Chip intent="success" className="border-transparent">Acknowledged</Chip>
                  ) : live ? (
                    <Chip intent="warning" dot className="border-transparent">Paging</Chip>
                  ) : (
                    <Chip intent="neutral" className="border-transparent">On call</Chip>
                  )
                }
              />
            </motion.div>

            <SupervisorEscalationCard notify={onEscalationTap} live={live} delivered={delivered} />

            <motion.div variants={rise}>
              <EndOfScroll label="End of notification console" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <motion.button
          type="button"
          whileTap={live ? undefined : { scale: 0.97 }}
          onClick={simulate}
          disabled={live}
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 disabled:cursor-wait disabled:bg-[#0B211B]/[0.35]"
        >
          {live ? (
            <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
          ) : (
            <Radio className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          )}
          {live ? 'Fanning out' : delivered ? 'Simulate another alert' : 'Simulate live alert'}
        </motion.button>
        <div className="mt-2 flex items-center justify-center gap-1.5 text-[10.5px] font-semibold text-[#0B211B]/45">
          <BellRing className="h-3 w-3" aria-hidden />
          One event · five destinations · zero drift
        </div>
      </FootBar>
    </Screen>
  )
}
