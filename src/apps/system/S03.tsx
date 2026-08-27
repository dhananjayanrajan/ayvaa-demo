import { motion } from 'motion/react'
import {
  AlarmClock,
  Ban,
  BellRing,
  CalendarCheck,
  Check,
  CreditCard,
  LayoutDashboard,
  Link2,
  Route,
  ScrollText,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Stethoscope,
  TrendingUp,
} from 'lucide-react'
import type { ComponentType, ReactNode } from 'react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { autoNotifications, incidentLinking } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>

const icons: Record<string, IconType> = {
  'Visit reminders': AlarmClock,
  'Arrival alerts': CalendarCheck,
  'Consent reminders': ShieldCheck,
  'Receipt pushes': CreditCard,
}

const tileTones: Record<string, 'mint' | 'tonal' | 'warn' | 'ink'> = {
  'Visit reminders': 'mint',
  'Arrival alerts': 'tonal',
  'Consent reminders': 'warn',
  'Receipt pushes': 'ink',
}

const destinations: { icon: IconType; label: string; sub: string }[] = [
  { icon: Smartphone, label: "Family's phone", sub: 'Instant push' },
  { icon: Stethoscope, label: "Caregiver's app", sub: 'Live shift' },
  { icon: TrendingUp, label: "Partner's metrics", sub: 'Realtime' },
  { icon: LayoutDashboard, label: 'Admin console', sub: 'Oversight' },
  { icon: ScrollText, label: 'Audit log', sub: 'Immutable record' },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } } }
const item = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring' as const, stiffness: 280, damping: 26 } },
}

function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[24px] border border-[#0B211B]/[0.06] bg-white',
        'shadow-[0_1px_2px_rgba(11,33,27,0.05),0_20px_44px_-24px_rgba(11,33,27,0.22)]',
        className,
      )}
    >
      {children}
    </div>
  )
}

function DarkCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] shadow-[0_24px_60px_-28px_rgba(6,40,30,0.65)]">
      <div className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full bg-emerald-400/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-teal-300/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200/40 to-transparent" />
      <div className={cn('relative', className)}>{children}</div>
    </div>
  )
}

function Tile({ icon: Icon, tone = 'mint', className }: { icon: IconType; tone?: 'mint' | 'tonal' | 'warn' | 'rose' | 'ink' | 'white'; className?: string }) {
  const tones: Record<string, string> = {
    mint: 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_8px_18px_-8px_rgba(16,185,129,0.6)]',
    tonal: 'border border-[#0B211B]/[0.05] bg-[#0B211B]/[0.045] text-[#0B211B]/70',
    warn: 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-[0_8px_18px_-8px_rgba(245,158,11,0.55)]',
    rose: 'bg-gradient-to-br from-rose-500 to-red-500 text-white shadow-[0_8px_18px_-8px_rgba(244,63,94,0.55)]',
    ink: 'bg-[#0B231C] text-emerald-300',
    white: 'bg-white text-emerald-600 shadow-[0_6px_14px_-8px_rgba(11,33,27,0.4)]',
  }
  return (
    <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px]', tones[tone], className)}>
      <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
    </span>
  )
}

function Chip({ tone = 'ghost', className, children }: { tone?: 'mint' | 'warn' | 'rose' | 'ghost' | 'light'; className?: string; children: ReactNode }) {
  const tones: Record<string, string> = {
    mint: 'border-emerald-600/20 bg-emerald-500/10 text-emerald-700',
    warn: 'border-amber-500/25 bg-amber-400/15 text-amber-700',
    rose: 'border-rose-500/25 bg-rose-500/10 text-rose-600',
    ghost: 'border-[#0B211B]/[0.07] bg-[#0B211B]/[0.04] text-[#0B211B]/55',
    light: 'border-white/15 bg-white/[0.08] text-emerald-100/85',
  }
  return (
    <span className={cn('inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-[3px] text-[10px] font-bold tracking-wide', tones[tone], className)}>
      {children}
    </span>
  )
}

function PingDot({ className }: { className?: string }) {
  return (
    <span className={cn('relative flex h-1.5 w-1.5', className)}>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
    </span>
  )
}

function TimeChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-lg bg-[#0B211B]/[0.05] px-1.5 py-0.5 text-[10px] font-bold tabular-nums tracking-tight text-[#0B211B]/45">
      {children}
    </span>
  )
}

function SectionLabel({ children, trailing }: { children: ReactNode; trailing?: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-3.5 w-1 rounded-full bg-gradient-to-b from-emerald-500 to-teal-400" />
      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#0B211B]/45">{children}</span>
      <span className="h-px flex-1 bg-gradient-to-r from-[#0B211B]/[0.09] to-transparent" />
      {trailing}
    </div>
  )
}

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/25 bg-emerald-500/10 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.16em] text-emerald-700">
      <PingDot className="text-emerald-500" />
      Live
    </span>
  )
}

export function S03() {
  const { notify } = useDemo()
  const sent = autoNotifications.length

  return (
    <Screen>
      <AppBar
        title="Automated notifications"
        subtitle="Sent today · nobody pressed send"
        trailing={
          <div className="flex items-center gap-2">
            <AgentAvatar seed="ayvaa-alerts" size={42} />
            <LiveBadge />
          </div>
        }
      />
      <BodyArea>
        <div className="relative">
          <div className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={container} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={item}>
              <DarkCard className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-emerald-200/50">Notification feed</div>
                    <div className="mt-2 text-[19px] font-extrabold leading-snug tracking-tight text-white">
                      {sent} pushes,{' '}
                      <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">zero taps</span>
                    </div>
                    <div className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                      Every update landed on time — the system sent them itself.
                    </div>
                  </div>
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                    <span className="absolute inset-0 rounded-full bg-emerald-400/10 blur-lg" />
                    <BellRing className="relative h-6 w-6 text-emerald-200" strokeWidth={2} />
                    <span className="absolute right-2 top-2">
                      <PingDot className="text-emerald-300" />
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  <Chip tone="light">{sent} delivered</Chip>
                  <Chip tone="light">0 failed</Chip>
                  <Chip tone="light">94% opened</Chip>
                </div>
              </DarkCard>
            </motion.div>

            <motion.div variants={item}>
              <SectionLabel trailing={<Chip tone="ghost">Auto</Chip>}>Live feed · today</SectionLabel>
            </motion.div>

            <motion.div variants={item}>
              <Card>
                {autoNotifications.map((n, i) => {
                  const Icon = icons[n.title] ?? AlarmClock
                  return (
                    <div key={n.id}>
                      {i > 0 && <div className="mx-3.5 h-px bg-[#0B211B]/[0.05]" />}
                      <motion.button
                        whileTap={{ scale: 0.985 }}
                        onClick={() => notify({ title: n.title, body: `${n.time} · ${n.body}`, kind: 'ok' })}
                        className="group flex w-full items-start gap-3 px-3.5 py-3 text-left"
                      >
                        <Tile icon={Icon} tone={tileTones[n.title] ?? 'mint'} />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <TimeChip>{n.time}</TimeChip>
                            <span className="truncate text-[13px] font-bold tracking-tight text-[#0B211B]">{n.title}</span>
                          </div>
                          <div className="mt-1 line-clamp-2 text-xs font-medium leading-relaxed text-[#0B211B]/55">{n.body}</div>
                        </div>
                        <Chip tone="mint" className="mt-0.5">
                          <Check className="h-2.5 w-2.5" strokeWidth={3} />
                          Sent
                        </Chip>
                      </motion.button>
                    </div>
                  )
                })}
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <SectionLabel trailing={<Chip tone="rose">This week</Chip>}>Incident auto-linking</SectionLabel>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-rose-500/15 bg-gradient-to-br from-rose-50 via-white to-white">
                <div className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Tile icon={Link2} tone="rose" />
                      <div className="min-w-0">
                        <div className="text-sm font-bold tracking-tight text-[#0B211B]">Auto-linked to care plans</div>
                        <div className="text-[11px] font-semibold text-rose-500/80">Supervisors notified in seconds</div>
                      </div>
                    </div>
                    <Chip tone="rose">{incidentLinking.count}</Chip>
                  </div>
                  <div className="mt-3 text-[13px] font-medium leading-relaxed text-[#0B211B]/65">{incidentLinking.body}</div>
                  <div className="mt-3 rounded-2xl border border-rose-500/10 border-l-2 border-l-rose-400 bg-white/80 p-3 text-[12px] font-medium leading-relaxed text-[#0B211B]/75">
                    {incidentLinking.paged}
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-[12px] font-semibold text-rose-600/85">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500/15">
                      <Ban className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    {incidentLinking.paused}
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <DarkCard className="p-5">
                <div className="flex items-center gap-3">
                  <Tile icon={Route} tone="white" />
                  <div className="min-w-0">
                    <div className="text-sm font-bold tracking-tight text-white">One event, everywhere</div>
                    <div className="mt-0.5 text-[11px] font-medium text-emerald-100/55">Single source of truth · zero drift</div>
                  </div>
                </div>
                <div className="mt-4 flex flex-col items-center">
                  <Chip tone="light" className="border-emerald-300/25 bg-emerald-400/15 text-emerald-200">
                    <PingDot className="text-emerald-300" />
                    1 event emitted
                  </Chip>
                  <span className="my-1 h-4 w-px bg-gradient-to-b from-emerald-300/60 to-transparent" />
                  <div className="grid w-full grid-cols-2 gap-2">
                    {destinations.map((d, i) => (
                      <div
                        key={d.label}
                        className={cn(
                          'rounded-2xl border border-white/[0.08] bg-white/[0.05] p-3',
                          i === destinations.length - 1 && 'col-span-2',
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] bg-emerald-400/15 text-emerald-200">
                            <d.icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                          </span>
                          <div className="min-w-0">
                            <div className="truncate text-[11px] font-bold text-white">{d.label}</div>
                            <div className="truncate text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">{d.sub}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </DarkCard>
            </motion.div>

            <motion.div variants={item}>
              <EndOfScroll label="End of notification feed" />
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
          onClick={() => notify({ title: 'Notification rules', body: 'Quiet hours 21:00–07:00 · escalations always break through', kind: 'info' })}
        >
          <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
          Tune notification rules
        </SmoothButton>
      </FootBar>
    </Screen>
  )
}
