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
  MoveRight,
  Send,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import {
  Card,
  Chip,
  Hero,
  Kicker,
  LiveChip,
  Ring,
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

const chain = ['Incident raised', 'Plan linked', 'Supervisors paged']

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
              <Card intent="warning" rail>
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <Tile icon={ShieldCheck} tone="warning" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold tracking-tight text-[#0B211B]">Nothing slips through</div>
                      <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                        If anything goes wrong, an incident is raised, linked to the care plan, and supervisors are notified within seconds.
                      </div>
                    </div>
                  </div>
                  <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
                    {chain.map((s, idx) => (
                      <span key={s} className="flex items-center gap-1.5">
                        {idx > 0 && <MoveRight className="h-3 w-3 text-amber-500/70" aria-hidden />}
                        <Chip intent="warning">{s}</Chip>
                      </span>
                    ))}
                    <Chip intent="warning" icon={Zap} className="ml-auto">≤ 60 s</Chip>
                  </div>
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
        <SmoothButton
          variant="outline"
          shape="pill"
          size="lg"
          className="w-full border-emerald-700/15 bg-white/85 text-[#0B211B] shadow-[0_10px_26px_-14px_rgba(11,33,27,0.35)] backdrop-blur"
          onClick={() => notify({ title: 'System history', body: 'Full event log opened · 1,204 events this month', kind: 'info' })}
        >
          <History className="h-4 w-4 text-emerald-600" aria-hidden />
          View full system history
        </SmoothButton>
      </FootBar>
    </Screen>
  )
}
