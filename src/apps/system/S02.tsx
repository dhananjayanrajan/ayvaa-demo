import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import {
  AlertTriangle,
  Ban,
  BellRing,
  CheckCircle2,
  ChevronRight,
  Hourglass,
  RefreshCw,
  ScrollText,
  Siren,
  Zap,
} from 'lucide-react'
import type { ComponentType, ReactNode } from 'react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { dispatchOffers } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>

const states: Record<string, { icon: IconType; tile: 'mint' | 'warn' | 'tonal'; chip: 'mint' | 'warn' | 'ghost'; chipLabel: string }> = {
  waiting: { icon: Hourglass, tile: 'warn', chip: 'ghost', chipLabel: 'Deciding' },
  declined: { icon: Ban, tile: 'tonal', chip: 'ghost', chipLabel: 'Re-offered' },
  recheck: { icon: CheckCircle2, tile: 'mint', chip: 'warn', chipLabel: 'Checking' },
}

const rules: { icon: IconType; tone: 'mint' | 'warn'; title: string; body: string; notifyBody: string; kind: 'ok' | 'warn' }[] = [
  {
    icon: Zap,
    tone: 'mint',
    title: 'Instant acceptance',
    body: 'Free in the window · confirmed on the spot',
    notifyBody: 'Free in the window · acceptance confirmed instantly',
    kind: 'ok',
  },
  {
    icon: AlertTriangle,
    tone: 'warn',
    title: 'Conflict reversal',
    body: 'New conflict · offer reversed, re-dispatched',
    notifyBody: 'New conflict found · offer reversed, session re-dispatched',
    kind: 'warn',
  },
  {
    icon: ScrollText,
    tone: 'mint',
    title: 'Transparent logging',
    body: 'Every outcome logged, visible to the family',
    notifyBody: 'Every outcome is logged and shown to the family transparently',
    kind: 'ok',
  },
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

function Ring({ value, size = 84, stroke = 7, id, children }: { value: number; size?: number; stroke?: number; id: string; children?: ReactNode }) {
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
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  )
}

export function S02() {
  const { dispatch, setDispatch, notify } = useDemo()
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setTick((v) => v + 1), 1000)
    return () => clearInterval(t)
  }, [])

  const total = Math.max(1, dispatch.minutesLeft * 60)
  const totalLeft = Math.max(0, dispatch.minutesLeft * 60 - tick)
  const left = Math.floor(totalLeft / 60)
  const sec = totalLeft % 60

  useEffect(() => {
    if (totalLeft === 0) {
      setDispatch({ minutesLeft: 0 })
      notify({ title: 'Offers expired', body: 'No acceptance yet · care team paged personally', kind: 'warn' })
    }
  }, [totalLeft, setDispatch, notify])

  const tracked = dispatch.waiting + dispatch.declined + dispatch.recheck

  return (
    <Screen>
      <AppBar
        title="Dispatch engine"
        subtitle="Friday visits · matching round two · live"
        trailing={
          <div className="flex items-center gap-2">
            <AgentAvatar seed="ayvaa-dispatch" size={42} />
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
                <div className="flex items-center gap-4">
                  <Ring value={totalLeft / total} size={84} stroke={7} id="drainRing">
                    <span className="text-[15px] font-extrabold tabular-nums text-white">
                      {left}:{String(sec).padStart(2, '0')}
                    </span>
                    <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-emerald-200/50">to expiry</span>
                  </Ring>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.22em] text-emerald-200/50">
                      Round one expired
                      <RefreshCw className="h-3 w-3 animate-spin text-emerald-300/70 [animation-duration:3s]" />
                    </div>
                    <div className="mt-1.5 text-[17px] font-extrabold leading-snug tracking-tight text-white">
                      Matching continues{' '}
                      <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">automatically</span>
                    </div>
                    <div className="mt-1 text-[11.5px] font-medium leading-relaxed text-emerald-100/55">
                      8 nurses re-offered at 8:16 AM · radius widened to 10 km at 9:00 AM
                    </div>
                  </div>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 transition-[width] duration-1000 ease-linear"
                    style={{ width: `${(sec / 60) * 100}%` }}
                  />
                </div>
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                  <Chip tone="light">Round 1 · expired 8:16 AM</Chip>
                  <Chip tone="light" className="border-emerald-300/25 bg-emerald-400/15 text-emerald-200">
                    <PingDot className="text-emerald-300" />
                    Round 2 · live
                  </Chip>
                  <span className="ml-auto text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-100/40">Expires {dispatch.expiresAt}</span>
                </div>
              </DarkCard>
            </motion.div>

            <motion.div variants={item}>
              <SectionLabel trailing={<Chip tone="ghost">{tracked} offers</Chip>}>Offer status</SectionLabel>
            </motion.div>

            <motion.div variants={item}>
              <Card>
                {dispatchOffers.map((o, i) => {
                  const s = states[o.state] ?? states.waiting
                  const Icon = s.icon
                  const count = o.state === 'waiting' ? dispatch.waiting : o.state === 'declined' ? dispatch.declined : dispatch.recheck
                  return (
                    <div key={o.id}>
                      {i > 0 && <div className="mx-3.5 h-px bg-[#0B211B]/[0.05]" />}
                      <motion.button
                        whileTap={{ scale: 0.985 }}
                        onClick={() =>
                          notify(
                            o.state === 'waiting'
                              ? { title: 'Offer still open', body: `${count} nurses deciding · expires ${dispatch.expiresAt}`, kind: 'info' }
                              : o.state === 'declined'
                                ? { title: 'Offer declined', body: 'Nurse declined · slot re-offered in round two', kind: 'warn' }
                                : { title: 'Re-checking availability', body: 'Conflict found · availability re-verified now', kind: 'info' },
                          )
                        }
                        className="group flex w-full items-center gap-3 px-3.5 py-3 text-left"
                      >
                        <Tile icon={Icon} tone={s.tile} />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-bold tracking-tight text-[#0B211B]">
                            {count} {o.label.replace(/^\d+ /, '')}
                          </div>
                          <div className="mt-0.5 truncate text-xs font-medium leading-snug text-[#0B211B]/55">
                            {o.state === 'waiting'
                              ? `Expires ${dispatch.expiresAt} · ${left}m ${String(sec).padStart(2, '0')}s left`
                              : o.detail}
                          </div>
                        </div>
                        {s.chip === 'warn' ? (
                          <Chip tone="warn">
                            <PingDot className="text-amber-500" />
                            {s.chipLabel}
                          </Chip>
                        ) : (
                          <Chip tone={s.chip}>{s.chipLabel}</Chip>
                        )}
                      </motion.button>
                    </div>
                  )
                })}
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <SectionLabel trailing={<Chip tone="ghost">Auto</Chip>}>Re-check rules</SectionLabel>
            </motion.div>

            <motion.div variants={item}>
              <Card>
                {rules.map((r, i) => (
                  <motion.button
                    key={r.title}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => notify({ title: `Rule: ${r.title.toLowerCase()}`, body: r.notifyBody, kind: r.kind })}
                    className={cn('group flex w-full items-center gap-3 px-4 py-3 text-left', i > 0 && 'border-t border-[#0B211B]/[0.05]')}
                  >
                    <span className="w-5 shrink-0 text-[10px] font-extrabold tabular-nums text-emerald-600/60">{String(i + 1).padStart(2, '0')}</span>
                    <Tile icon={r.icon} tone={r.tone} className="h-8 w-8 rounded-xl" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-bold tracking-tight text-[#0B211B]">{r.title}</span>
                      <span className="mt-0.5 block text-xs font-medium leading-snug text-[#0B211B]/55">{r.body}</span>
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/20 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600" />
                  </motion.button>
                ))}
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-amber-500/15 bg-gradient-to-br from-amber-50 via-white to-white">
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <Tile icon={BellRing} tone="warn" />
                    <div className="min-w-0">
                      <div className="text-sm font-bold tracking-tight text-[#0B211B]">The 9:45 failsafe</div>
                      <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                        With no acceptance by 9:45 AM, the care team is paged personally — and the family watches each step on their re-dispatch screen.
                      </div>
                    </div>
                  </div>
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    <span className="rounded-full border border-amber-500/20 bg-white/80 px-2.5 py-1 text-[10px] font-bold text-amber-700">9:45 AM · personal page</span>
                    <span className="rounded-full border border-amber-500/20 bg-white/80 px-2.5 py-1 text-[10px] font-bold text-amber-700">Family sees every step</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <EndOfScroll label="End of dispatch view" />
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
          onClick={() => notify({ title: 'Escalation policy', body: 'No acceptance by 9:45 AM · care team paged personally', kind: 'warn' })}
        >
          <Siren className="h-4 w-4 text-amber-500" />
          Open escalation policy
        </SmoothButton>
      </FootBar>
    </Screen>
  )
}
