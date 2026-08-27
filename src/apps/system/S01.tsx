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
} from 'lucide-react'
import type { ComponentType, ReactNode } from 'react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { systemTrail } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>

const icons: Record<string, IconType> = {
  'Booking created': CalendarPlus,
  'Offers dispatched': Send,
  'Offer accepted': CheckCircle2,
  'Sessions generated': CalendarCheck,
  'Arrival verified': MapPin,
  'Family notified': Bell,
  'Payment captured': CreditCard,
}

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

function TimeChip({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-lg px-1.5 py-0.5 text-[10px] font-bold tabular-nums tracking-tight',
        light ? 'bg-white/10 text-emerald-100/70' : 'bg-[#0B211B]/[0.05] text-[#0B211B]/45',
      )}
    >
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

function Ring({ value, size = 72, stroke = 6, id, children }: { value: number; size?: number; stroke?: number; id: string; children?: ReactNode }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="55%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#67e8f9" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - Math.min(1, Math.max(0, value))) }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  )
}

export function S01() {
  const { notify } = useDemo()
  const total = systemTrail.length
  const doneCount = systemTrail.filter((e) => e.state !== 'now').length
  const nowEvent = systemTrail.find((e) => e.state === 'now')
  const progress = total > 0 ? doneCount / total : 0

  return (
    <Screen>
      <AppBar
        title="What the system did today"
        subtitle="One recurring plan · live, end to end"
        trailing={
          <div className="flex items-center gap-2">
            <AgentAvatar seed="ayvaa-system" size={42} />
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
                    <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-emerald-200/50">Today's pulse</div>
                    <div className="mt-2 text-[19px] font-extrabold leading-snug tracking-tight text-white">
                      {total} actions,{' '}
                      <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">zero handoffs</span>
                    </div>
                    <div className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                      One recurring care plan, running end to end.
                    </div>
                  </div>
                  <Ring value={progress} size={72} stroke={6} id="pulseRing">
                    <span className="text-[15px] font-extrabold tabular-nums text-white">{Math.round(progress * 100)}%</span>
                    <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-emerald-200/50">done</span>
                  </Ring>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  <Chip tone="light">{doneCount} completed</Chip>
                  {nowEvent && (
                    <Chip tone="light" className="border-emerald-300/25 bg-emerald-400/15 text-emerald-200">
                      <PingDot className="text-emerald-300" />
                      1 in motion · {nowEvent.time}
                    </Chip>
                  )}
                  <Chip tone="light">0 incidents</Chip>
                </div>
              </DarkCard>
            </motion.div>

            <motion.div variants={item}>
              <SectionLabel trailing={<Chip tone="ghost">Today</Chip>}>Execution trail</SectionLabel>
            </motion.div>

            <motion.div variants={item}>
              <Card>
                {systemTrail.map((e, i) => {
                  const Icon = icons[e.title] ?? Activity
                  const now = e.state === 'now'
                  const last = i === systemTrail.length - 1
                  return (
                    <div key={e.id} className="flex items-stretch gap-3 px-3.5">
                      <div className="flex flex-col items-center py-3.5">
                        <Tile icon={Icon} tone={now ? 'mint' : 'tonal'} className={cn(now && 'ring-4 ring-emerald-500/15')} />
                        {!last && <span className="mt-1 w-px flex-1 bg-gradient-to-b from-[#0B211B]/15 via-[#0B211B]/[0.06] to-transparent" />}
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.985 }}
                        onClick={() => notify({ title: e.title, body: `${e.time} · ${e.body}`, kind: now ? 'ok' : 'info' })}
                        className="group min-w-0 flex-1 py-3.5 pr-1 text-left"
                      >
                        <div className="flex items-center gap-2">
                          <TimeChip>{e.time}</TimeChip>
                          {now && (
                            <Chip tone="mint">
                              <PingDot className="text-emerald-500" />
                              Now
                            </Chip>
                          )}
                          <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-[#0B211B]/20 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600" />
                        </div>
                        <div className="mt-1.5 truncate text-sm font-bold tracking-tight text-[#0B211B]">{e.title}</div>
                        <div className="mt-0.5 line-clamp-2 text-xs font-medium leading-relaxed text-[#0B211B]/55">{e.body}</div>
                      </motion.button>
                    </div>
                  )
                })}
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-amber-500/15 bg-gradient-to-br from-amber-50 via-white to-white">
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <Tile icon={ShieldCheck} tone="warn" />
                    <div className="min-w-0">
                      <div className="text-sm font-bold tracking-tight text-[#0B211B]">Nothing slips through</div>
                      <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">Any failure escalates on its own.</div>
                    </div>
                  </div>
                  <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
                    {['Incident raised', 'Plan linked', 'Supervisors paged'].map((s, idx) => (
                      <span key={s} className="flex items-center gap-1.5">
                        {idx > 0 && <span className="h-px w-2.5 bg-amber-400/60" />}
                        <span className="rounded-full border border-amber-500/20 bg-white/80 px-2.5 py-1 text-[10px] font-bold text-amber-700">{s}</span>
                      </span>
                    ))}
                    <span className="ml-auto rounded-full bg-amber-500/15 px-2 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-amber-700">≤ seconds</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={item}>
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
          <History className="h-4 w-4 text-emerald-600" />
          View full system history
        </SmoothButton>
      </FootBar>
    </Screen>
  )
}
