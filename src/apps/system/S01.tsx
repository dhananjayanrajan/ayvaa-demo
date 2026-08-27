import { motion } from 'motion/react'
import {
  Activity,
  ArrowUpRight,
  Bell,
  CalendarCheck,
  CalendarPlus,
  CheckCircle2,
  CreditCard,
  History,
  MapPin,
  Send,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import {
  Card,
  Chip,
  Cta,
  Hero,
  Kicker,
  LiveChip,
  Panel,
  Section,
  Stat,
  Tile,
  TimeChip,
  rise,
  stagger,
} from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'
import { systemTrail } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

const icons: Record<string, LucideIcon> = {
  'Booking created': CalendarPlus,
  'Offers dispatched': Send,
  'Offer accepted': CheckCircle2,
  'Sessions generated': CalendarCheck,
  'Arrival verified': MapPin,
  'Family notified': Bell,
  'Payment captured': CreditCard,
}

const toneByTitle: Record<string, TileTone> = {
  'Booking created': 'neutral',
  'Offers dispatched': 'info',
  'Offer accepted': 'success',
  'Sessions generated': 'success',
  'Arrival verified': 'success',
  'Family notified': 'info',
  'Payment captured': 'success',
}

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

            <motion.div variants={rise}>
              <Card>
                {systemTrail.map((e, i) => {
                  const Icon = icons[e.title] ?? Activity
                  const now = e.state === 'now'
                  const last = i === total - 1
                  return (
                    <div key={e.id} className="flex items-stretch gap-3 px-3.5">
                      <div className="flex flex-col items-center py-3">
                        <Tile icon={Icon} tone={now ? 'live' : (toneByTitle[e.title] ?? 'neutral')} />
                        {!last && (
                          <span aria-hidden className="mt-1 w-px flex-1 bg-gradient-to-b from-[#0B211B]/15 via-[#0B211B]/[0.07] to-transparent" />
                        )}
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.985 }}
                        onClick={() => notify({ title: e.title, body: `${e.time} · ${e.body}`, kind: now ? 'ok' : 'info' })}
                        className="group flex min-w-0 flex-1 gap-3 py-3 pr-0.5 text-left"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">{e.title}</div>
                          <div className="mt-0.5 line-clamp-2 text-xs font-medium leading-relaxed text-[#0B211B]/55">{e.body}</div>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1.5">
                          <TimeChip>{e.time}</TimeChip>
                          {now ? (
                            <Chip intent="live" dot>Now</Chip>
                          ) : (
                            <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 text-emerald-500/60 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                          )}
                        </div>
                      </motion.button>
                    </div>
                  )
                })}
              </Card>
            </motion.div>

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
      <FootBar>
        <Cta
          icon={History}
          onClick={() => notify({ title: 'System history', body: 'Full event log opened · 1,204 events this month', kind: 'info' })}
        >
          View full system history
        </Cta>
      </FootBar>
    </Screen>
  )
}
