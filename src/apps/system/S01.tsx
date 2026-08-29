import { motion } from 'motion/react'
import {
  ShieldCheck,
  Zap,
} from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import {
  Card,
  Chip,
  Hero,
  Kicker,
  LiveChip,
  Panel,
  Section,
  Stat,
  Tile,
  rise,
  stagger,
} from '@/components/phone/kit'
import { systemTrail } from '@/data/system/executionTrail'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'
import { ExecutionTrail } from '@/components/system/execution/ExecutionTrail'

const escalation: { label: string; sub: string }[] = [
  { label: 'Incident raised', sub: 'Detected automatically' },
  { label: 'Care plan linked', sub: 'Full context attached' },
  { label: 'Supervisors paged', sub: 'Push + SMS fallback' },
]

export function S01() {
  const { notify } = useDemo()
  const total = systemTrail.length
  const nowEvent = systemTrail.find((e) => e.state === 'now')
  const doneCount = total - (nowEvent ? 1 : 0)

  return (
    <Screen>
      <AppBar
        title="What the system did today"
        subtitle="One recurring plan · live, end to end"
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
              <Hero>
                <Kicker>Today's pulse</Kicker>
                <h2 className="mt-2 text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  {total} actions,{' '}
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">zero handoffs</span>
                </h2>
                <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                  One recurring care plan, executed by the system itself.
                </p>

                <div aria-hidden className="mt-4 flex gap-1">
                  {systemTrail.map((e) => (
                    <span
                      key={e.id}
                      className={cn(
                        'h-1.5 flex-1 rounded-full',
                        e.state === 'now' ? 'relative overflow-hidden bg-emerald-300/25' : 'bg-gradient-to-r from-emerald-400 to-teal-300',
                      )}
                    >
                      {e.state === 'now' && (
                        <motion.span
                          className="absolute inset-0 rounded-full bg-emerald-300"
                          animate={{ opacity: [1, 0.25, 1] }}
                          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      )}
                    </span>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.08]">
                  <Stat label="Completed" value={doneCount} dot="bg-emerald-300" />
                  <Stat label="In motion" value={nowEvent ? 1 : 0} dot="bg-teal-300" />
                  <Stat label="Incidents" value={0} dot="bg-rose-300/70" />
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  <Chip intent="neutral" light>Recurring plan</Chip>
                  <Chip intent="success" light>On schedule</Chip>
                  <Chip intent="neutral" light>0 reschedules</Chip>
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Execution trail" trailing={<Chip intent="neutral">{total} events</Chip>} />
            </motion.div>

            <ExecutionTrail trail={systemTrail} notify={notify} />

            <motion.div variants={rise}>
              <Card intent="warning">
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <Tile icon={ShieldCheck} tone="warning" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-bold tracking-tight text-[#0B211B]">Nothing slips through</span>
                        <Chip intent="warning" icon={Zap}>≤ 60 s</Chip>
                      </div>
                      <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                        Any failure becomes an incident, links itself to the care plan and pages supervisors on its own.
                      </p>
                    </div>
                  </div>
                  <Panel intent="warning" className="mt-3.5 p-3.5">
                    <div className="flex flex-col">
                      {escalation.map((s, i) => (
                        <div key={s.label} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <span aria-hidden className={cn('mt-1 h-2 w-2 shrink-0 rounded-full', i === escalation.length - 1 ? 'bg-amber-500' : 'bg-amber-400/80')} />
                            {i < escalation.length - 1 && <span aria-hidden className="my-1 w-px flex-1 bg-amber-500/25" />}
                          </div>
                          <div className={cn('min-w-0 pb-3', i === escalation.length - 1 && 'pb-0')}>
                            <div className="text-[13px] font-bold tracking-tight text-[#0B211B]">{s.label}</div>
                            <div className="text-[11px] font-semibold text-amber-700/70">{s.sub}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Panel>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of today's trail" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
    </Screen>
  )
}
