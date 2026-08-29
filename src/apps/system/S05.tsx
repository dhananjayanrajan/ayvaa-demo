import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ShieldCheck } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Chip, LiveChip, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { useDemo } from '@/lib/store'
import { RecheckHero } from '@/components/system/recheck/RecheckHero'
import { RecheckResolutionCard } from '@/components/system/recheck/RecheckResolutionCard'
import { ReversedOfferTraceCard } from '@/components/system/transactions/ReversedOfferTraceCard'
import { NoAvailabilityLadder } from '@/components/system/transactions/NoAvailabilityLadder'
import { recheckSubject } from '@/data/system/recheck'
import type { LadderPhase, RecheckPhase } from '@/data/system/recheck'

const PROBE_MS = 780
const LADDER_MS = 950

export function S05() {
  const { notify, pushTrail, dispatch, setDispatch } = useDemo()
  const [phase, setPhase] = useState<RecheckPhase>('monitoring')
  const [probeIndex, setProbeIndex] = useState(0)
  const [ladderPhase, setLadderPhase] = useState<LadderPhase>('idle')
  const [ladderStep, setLadderStep] = useState(0)
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

  const runRecheck = () => {
    clearTimers()
    setProbeIndex(0)
    setPhase('probing')
    notify({
      title: 'Re-check running',
      body: `${recheckSubject.professional}'s calendar is being verified live`,
      kind: 'info',
    })

    for (let i = 1; i <= probeStepsLength(); i++) {
      schedule(() => setProbeIndex(i), i * PROBE_MS)
    }
    const total = probeStepsLength() * PROBE_MS + 250
    schedule(() => {
      setPhase('reversed')
      setDispatch({
        recheck: 0,
        declined: dispatch.declined + 1,
        waiting: dispatch.waiting + 1,
        round: dispatch.round + 1,
      })
      pushTrail({
        time: '9:42 AM',
        title: 'Re-check reversed offer',
        body: 'Conflict found · availability re-verified · slot re-offered',
        state: 'done',
      })
      notify({
        title: 'Conflict found · offer reversed',
        body: 'Window closes before the visit ends · slot re-offered in round three',
        kind: 'warn',
      })
    }, total)
  }

  const probeStepsLength = () => 3

  const playLadder = () => {
    clearTimers()
    setLadderStep(0)
    setLadderPhase('playing')
    notify({
      title: 'Replaying the ladder',
      body: "This morning's no-availability response, step by step",
      kind: 'info',
    })

    for (let k = 1; k <= ladderStepsLength(); k++) {
      schedule(() => setLadderStep(k), k * LADDER_MS)
    }
    schedule(() => {
      setLadderPhase('secured')
      pushTrail({
        time: '9:02 AM',
        title: 'No availability resolved',
        body: 'Ladder completed · visit rebooked · refund guarantee intact',
        state: 'done',
      })
      notify({
        title: 'Ladder secured',
        body: 'Visit rebooked · family kept whole · refund guarantee intact',
        kind: 'ok',
      })
    }, ladderStepsLength() * LADDER_MS + 250)
  }

  const ladderStepsLength = () => 4

  const onRowTap = (title: string, body: string, kind: 'ok' | 'warn' | 'info' = 'info') => {
    notify({ title, body, kind })
  }

  const recheckSectionChip = () => {
    if (phase === 'reversed')
      return <Chip intent="info" className="border-transparent">Reversed · re-offered</Chip>
    if (phase === 'probing')
      return <Chip intent="warning" dot className="border-transparent">Checking now</Chip>
    return <Chip intent="warning" dot className="border-transparent">1 pending</Chip>
  }

  return (
    <Screen>
      <AppBar
        title="Re-checked before confirmed"
        subtitle="Availability re-check · reversal and ladder"
        trailing={
          <div className="flex items-center gap-2">
            <AgentAvatar seed="ayvaa-system" size={42} />
            <LiveChip />
          </div>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <RecheckHero
                phase={phase}
                waiting={dispatch.waiting}
                declined={dispatch.declined}
                recheckPending={phase === 'reversed' ? 0 : dispatch.recheck}
                round={dispatch.round}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Live re-check" trailing={recheckSectionChip()} />
            </motion.div>

            <motion.div variants={rise}>
              <RecheckResolutionCard
                phase={phase}
                probeIndex={probeIndex}
                onRun={runRecheck}
                onRowTap={(title, body) => onRowTap(title, body)}
              />
            </motion.div>

            {phase === 'reversed' && (
              <ReversedOfferTraceCard
                onEventTap={(title, body) => onRowTap(title, body)}
              />
            )}

            <motion.div variants={rise}>
              <Section
                label="No availability"
                trailing={
                  ladderPhase === 'secured' ? (
                    <Chip intent="success" icon={ShieldCheck} className="border-transparent">Secured</Chip>
                  ) : ladderPhase === 'playing' ? (
                    <Chip intent="warning" dot className="border-transparent">Replaying</Chip>
                  ) : (
                    <Chip intent="info" className="border-transparent">Recorded 8:15 AM</Chip>
                  )
                }
              />
            </motion.div>

            <motion.div variants={rise}>
              <NoAvailabilityLadder
                phase={ladderPhase}
                completed={ladderStep}
                onPlay={playLadder}
                onStepTap={(title, body) => onRowTap(title, body)}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={ShieldCheck} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Scheduled care must happen. If nobody accepts, the ladder runs on its own while the family watches. And if care truly cannot happen, the money returns before anyone has to ask.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of re-check console" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
    </Screen>
  )
}
