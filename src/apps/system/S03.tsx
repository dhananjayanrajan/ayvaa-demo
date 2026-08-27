import { useState } from 'react'
import { motion } from 'motion/react'
import {
  AlarmClock,
  Ban,
  BellRing,
  CalendarCheck,
  Check,
  ChevronDown,
  CreditCard,
  LayoutDashboard,
  Link2,
  Route,
  ScrollText,
  ShieldCheck,
  Smartphone,
  SlidersHorizontal,
  Stethoscope,
  TrendingUp,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import {
  Card,
  Chip,
  Cta,
  Expand,
  Hero,
  Kicker,
  LiveChip,
  LiveDot,
  Panel,
  Section,
  Stat,
  Tile,
  TimeChip,
  rise,
  stagger,
} from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'
import { autoNotifications, incidentLinking } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

const icons: Record<string, LucideIcon> = {
  'Visit reminders': AlarmClock,
  'Arrival alerts': CalendarCheck,
  'Consent reminders': ShieldCheck,
  'Receipt pushes': CreditCard,
}

const toneByTitle: Record<string, TileTone> = {
  'Visit reminders': 'success',
  'Arrival alerts': 'info',
  'Consent reminders': 'warning',
  'Receipt pushes': 'ink',
}

const destinations: { icon: LucideIcon; label: string; sub: string }[] = [
  { icon: Smartphone, label: "Family's phone", sub: 'Instant push' },
  { icon: Stethoscope, label: "Caregiver's app", sub: 'Live shift' },
  { icon: TrendingUp, label: "Partner's metrics", sub: 'Realtime' },
  { icon: LayoutDashboard, label: 'Admin console', sub: 'Oversight' },
  { icon: ScrollText, label: 'Audit log', sub: 'Immutable record' },
]

function PushPreview({ title, body, time, onDark }: { title: string; body: string; time: string; onDark: boolean }) {
  return (
    <div
      className={cn(
        'rounded-2xl p-3',
        onDark
          ? 'bg-white/[0.07] backdrop-blur-sm'
          : 'bg-[#0B231C] shadow-[0_18px_40px_-20px_rgba(6,40,30,0.6)]',
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-emerald-500 to-teal-500 shadow-[0_6px_14px_-6px_rgba(16,185,129,0.6)]">
          <BellRing className="h-4 w-4 text-white" strokeWidth={2.2} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span className="truncate text-[11px] font-bold text-white">Ayvaa Care</span>
            <span className="ml-auto shrink-0 text-[9px] font-bold uppercase tracking-wide text-emerald-100/40">{time}</span>
          </div>
          <div className="truncate text-[11px] font-semibold text-emerald-100/85">{title}</div>
        </div>
      </div>
      <p className="mt-2 line-clamp-2 text-[11px] font-medium leading-relaxed text-emerald-100/60">{body}</p>
    </div>
  )
}

export function S03() {
  const { notify } = useDemo()
  const [expandedId, setExpandedId] = useState<string | null>(null)
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

            <motion.div variants={rise}>
              <Card>
                {autoNotifications.map((n, i) => {
                  const Icon = icons[n.title] ?? AlarmClock
                  const open = expandedId === n.id
                  return (
                    <div key={n.id}>
                      {i > 0 && <div aria-hidden className="mx-3.5 h-px bg-[#0B211B]/[0.05]" />}
                      <motion.button
                        whileTap={{ scale: 0.985 }}
                        onClick={() => {
                          setExpandedId(open ? null : n.id)
                          if (!open) notify({ title: n.title, body: `${n.time} · ${n.body}`, kind: 'ok' })
                        }}
                        className="group flex w-full items-start gap-3 px-3.5 py-3 text-left"
                      >
                        <Tile icon={Icon} tone={toneByTitle[n.title] ?? 'success'} />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <TimeChip>{n.time}</TimeChip>
                            <span className="truncate text-[13px] font-bold tracking-tight text-[#0B211B]">{n.title}</span>
                          </div>
                          <div className="mt-1 line-clamp-2 text-xs font-medium leading-relaxed text-[#0B211B]/55">{n.body}</div>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1.5">
                          <Chip intent="success" icon={Check}>Sent</Chip>
                          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
                            <ChevronDown className="h-3.5 w-3.5 text-[#0B211B]/25" aria-hidden />
                          </motion.span>
                        </div>
                      </motion.button>
                      <Expand open={open}>
                        <div className="px-3.5 pb-3.5">
                          <PushPreview title={n.title} body={n.body} time={n.time} onDark={false} />
                          <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-emerald-600/70">
                            <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                            Automatic push · delivered to family + caregiver
                          </div>
                        </div>
                      </Expand>
                    </div>
                  )
                })}
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Incident auto-linking" trailing={<Chip intent="danger">{incidentLinking.count}</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card intent="danger">
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <Tile icon={Link2} tone="danger" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-bold tracking-tight text-[#0B211B]">Auto-linked to care plans</div>
                      <div className="truncate text-[11px] font-semibold text-rose-500/80">Supervisors notified in seconds</div>
                    </div>
                    <Chip intent="danger">{incidentLinking.count}</Chip>
                  </div>
                  <p className="mt-3 text-[13px] font-medium leading-relaxed text-[#0B211B]/65">{incidentLinking.body}</p>
                  <Panel intent="danger" className="mt-3 p-3">
                    <p className="text-[12px] font-medium leading-relaxed text-[#0B211B]/75">{incidentLinking.paged}</p>
                  </Panel>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/15">
                      <Ban className="h-3 w-3 text-rose-600" strokeWidth={2.5} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1 text-xs font-semibold leading-snug text-rose-600/85">{incidentLinking.paused}</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="One event, everywhere" trailing={<Chip intent="info">Fan-out</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Hero>
                <div className="flex items-center gap-3">
                  <Tile icon={Route} tone="white" />
                  <div className="min-w-0">
                    <div className="text-sm font-bold tracking-tight text-white">Single source of truth</div>
                    <div className="mt-0.5 text-[11px] font-medium text-emerald-100/55">One event fans out · zero drift</div>
                  </div>
                </div>
                <div className="mt-4 flex flex-col items-center">
                  <Chip intent="live" light dot>1 event emitted</Chip>
                  <span aria-hidden className="my-1 h-4 w-px bg-gradient-to-b from-emerald-300/60 to-transparent" />
                  <div className="grid w-full grid-cols-2 gap-2">
                    {destinations.map((d, i) => (
                      <motion.div
                        key={d.label}
                        whileHover={{ y: -2 }}
                        className={cn(
                          'rounded-2xl bg-white/[0.06] p-3',
                          i === destinations.length - 1 && 'col-span-2',
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] bg-emerald-400/15 text-emerald-200">
                            <d.icon className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                          </span>
                          <div className="min-w-0">
                            <div className="truncate text-[11px] font-bold text-white">{d.label}</div>
                            <div className="truncate text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">{d.sub}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of notification feed" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <Cta
          icon={SlidersHorizontal}
          onClick={() => notify({ title: 'Notification rules', body: 'Quiet hours 21:00–07:00 · escalations always break through', kind: 'info' })}
        >
          Tune notification rules
        </Cta>
      </FootBar>
    </Screen>
  )
}
