import { AnimatePresence, motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type Intent = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'live'
export type TileTone = Intent | 'ink' | 'white'

export const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1]

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

export const rise: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 28 } },
}

export const CARD_SHADOW =
  'shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)]'

export const INTENT: Record<
  Intent,
  { border: string; wash: string; text: string; meter: string; dot: string }
> = {
  success: {
    border: 'border-emerald-600/[0.14]',
    wash: 'from-emerald-50 via-white to-white',
    text: 'text-emerald-700',
    meter: 'from-emerald-500 to-teal-400',
    dot: 'text-emerald-500',
  },
  warning: {
    border: 'border-amber-500/[0.22]',
    wash: 'from-amber-50 via-white to-white',
    text: 'text-amber-700',
    meter: 'from-amber-400 to-orange-400',
    dot: 'text-amber-500',
  },
  danger: {
    border: 'border-rose-500/[0.2]',
    wash: 'from-rose-50 via-white to-white',
    text: 'text-rose-600',
    meter: 'from-rose-500 to-red-400',
    dot: 'text-rose-500',
  },
  info: {
    border: 'border-sky-500/[0.2]',
    wash: 'from-sky-50 via-white to-white',
    text: 'text-sky-700',
    meter: 'from-sky-500 to-blue-400',
    dot: 'text-sky-500',
  },
  neutral: {
    border: 'border-[#0B211B]/[0.07]',
    wash: 'from-white via-white to-white',
    text: 'text-[#0B211B]',
    meter: 'from-[#0B211B]/45 to-[#0B211B]/25',
    dot: 'text-[#0B211B]/35',
  },
  live: {
    border: 'border-emerald-600/[0.14]',
    wash: 'from-emerald-50 via-white to-white',
    text: 'text-emerald-700',
    meter: 'from-emerald-500 to-teal-400',
    dot: 'text-emerald-500',
  },
}

const CHIP_TINT: Record<Intent, string> = {
  success: 'border border-emerald-600/20 bg-emerald-500/[0.12] text-emerald-700',
  warning: 'border border-amber-500/25 bg-amber-400/[0.16] text-amber-700',
  danger: 'border border-rose-500/25 bg-rose-500/[0.12] text-rose-600',
  info: 'border border-sky-500/25 bg-sky-500/[0.12] text-sky-700',
  neutral: 'border border-[#0B211B]/10 bg-[#0B211B]/[0.045] text-[#0B211B]/55',
  live: 'border border-emerald-500/30 bg-emerald-500/[0.14] text-emerald-700',
}

const CHIP_LIGHT: Record<Intent, string> = {
  success: 'bg-emerald-400/15 text-emerald-100',
  warning: 'bg-amber-400/15 text-amber-100',
  danger: 'bg-rose-400/15 text-rose-100',
  info: 'bg-sky-400/15 text-sky-100',
  neutral: 'bg-white/[0.07] text-emerald-50/70',
  live: 'bg-emerald-400/20 text-emerald-100',
}

const TILE_TONE: Record<Exclude<TileTone, 'live'>, string> = {
  success: 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_10px_20px_-10px_rgba(16,185,129,0.55)]',
  warning: 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-[0_10px_20px_-10px_rgba(245,158,11,0.55)]',
  danger: 'bg-gradient-to-br from-rose-500 to-red-500 text-white shadow-[0_10px_20px_-10px_rgba(244,63,94,0.55)]',
  info: 'bg-gradient-to-br from-sky-500 to-blue-500 text-white shadow-[0_10px_20px_-10px_rgba(14,165,233,0.55)]',
  neutral: 'border border-[#0B211B]/[0.06] bg-[#0B211B]/[0.045] text-[#0B211B]/70',
  ink: 'bg-[#0B231C] text-emerald-300',
  white: 'bg-white text-emerald-600 shadow-[0_10px_20px_-12px_rgba(11,33,27,0.45)]',
}

const TILE_SIZE: Record<'sm' | 'md' | 'lg', { box: string; icon: string }> = {
  sm: { box: 'h-9 w-9 rounded-xl', icon: 'h-4 w-4' },
  md: { box: 'h-10 w-10 rounded-[14px]', icon: 'h-[18px] w-[18px]' },
  lg: { box: 'h-12 w-12 rounded-2xl', icon: 'h-5 w-5' },
}

const PANEL_TINT: Record<Intent, string> = {
  success: 'bg-emerald-500/[0.07]',
  warning: 'bg-amber-500/[0.07]',
  danger: 'bg-rose-500/[0.07]',
  info: 'bg-sky-500/[0.07]',
  neutral: 'bg-[#0B211B]/[0.035]',
  live: 'bg-emerald-500/[0.07]',
}

const CTA_TONE: Record<'success' | 'warning' | 'danger', string> = {
  success: 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
  warning: 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-[0_18px_36px_-18px_rgba(234,88,12,0.6)]',
  danger: 'bg-gradient-to-r from-rose-600 to-red-500 shadow-[0_18px_36px_-18px_rgba(225,29,72,0.6)]',
}

export function LiveDot({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn('relative flex h-1.5 w-1.5', className)}>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
    </span>
  )
}

export function Tile({
  icon: Icon,
  tone = 'neutral',
  size = 'md',
  className,
}: {
  icon: LucideIcon
  tone?: TileTone
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const s = TILE_SIZE[size]
  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center',
        s.box,
        TILE_TONE[tone === 'live' ? 'success' : tone],
        tone === 'live' && 'ring-4 ring-emerald-500/15',
        className,
      )}
    >
      <Icon className={s.icon} strokeWidth={2.2} aria-hidden />
    </span>
  )
}

export function Chip({
  intent = 'neutral',
  icon: Icon,
  dot = false,
  light = false,
  className,
  children,
}: {
  intent?: Intent
  icon?: LucideIcon
  dot?: boolean
  light?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-[3px] text-[10px] font-bold tracking-wide',
        light ? CHIP_LIGHT[intent] : CHIP_TINT[intent],
        className,
      )}
    >
      {dot && <LiveDot className={INTENT[intent].dot} />}
      {Icon && <Icon className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />}
      {children}
    </span>
  )
}

export function LiveChip({ className }: { className?: string }) {
  return (
    <Chip intent="live" dot className={cn('text-[9px] uppercase tracking-[0.16em]', className)}>
      Live
    </Chip>
  )
}

export function Card({
  intent = 'neutral',
  className,
  children,
}: {
  intent?: Intent
  className?: string
  children: ReactNode
}) {
  const t = INTENT[intent === 'live' ? 'success' : intent]
  return (
    <div className={cn('relative overflow-hidden rounded-3xl border bg-white', t.border, CARD_SHADOW, className)}>
      {intent !== 'neutral' && intent !== 'live' && (
        <div aria-hidden className={cn('absolute inset-0 bg-gradient-to-br', t.wash)} />
      )}
      <div className="relative">{children}</div>
    </div>
  )
}

export function Panel({
  intent = 'neutral',
  className,
  children,
}: {
  intent?: Intent
  className?: string
  children: ReactNode
}) {
  return <div className={cn('rounded-2xl', PANEL_TINT[intent], className)}>{children}</div>
}

export function Hero({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]',
        className,
      )}
    >
      <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200/40 to-transparent" />
      <div className="relative p-5">{children}</div>
    </div>
  )
}

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
      {children}
    </div>
  )
}

export function Section({ label, trailing }: { label: string; trailing?: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span aria-hidden className="h-3.5 w-1 rounded-full bg-gradient-to-b from-emerald-500 to-teal-400" />
      <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/45">{label}</span>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-[#0B211B]/10 to-transparent" />
      {trailing}
    </div>
  )
}

export function TimeChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-lg bg-[#0B211B]/[0.05] px-1.5 py-0.5 text-[10px] font-bold tabular-nums tracking-tight text-[#0B211B]/45">
      {children}
    </span>
  )
}

export function Meter({
  value,
  intent = 'success',
  delay = 0,
  className,
}: {
  value: number
  intent?: Intent
  delay?: number
  className?: string
}) {
  const pct = Math.min(100, Math.max(0, value * 100))
  return (
    <div aria-hidden className={cn('h-1.5 overflow-hidden rounded-full bg-[#0B211B]/[0.07]', className)}>
      <motion.div
        className={cn('h-full rounded-full bg-gradient-to-r', INTENT[intent].meter)}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, ease: 'easeOut', delay }}
      />
    </div>
  )
}

export function Stat({
  label,
  value,
  dot,
}: {
  label: string
  value: ReactNode
  dot?: string
}) {
  return (
    <div className="flex flex-col gap-1.5 px-3 first:pl-0">
      <div className="flex items-center gap-1.5 text-[15px] font-extrabold tabular-nums leading-none text-white">
        {dot && <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full', dot)} />}
        {value}
      </div>
      <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-100/45">{label}</div>
    </div>
  )
}

export function Expand({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Ring({
  value,
  size = 84,
  stroke = 7,
  id,
  children,
}: {
  value: number
  size?: number
  stroke?: number
  id: string
  children?: ReactNode
}) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const v = Math.min(1, Math.max(0, value))
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
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
          animate={{ strokeDashoffset: c * (1 - v) }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  )
}

export function Cta({
  icon: Icon,
  tone = 'success',
  onClick,
  children,
}: {
  icon?: LucideIcon
  tone?: 'success' | 'warning' | 'danger'
  onClick?: () => void
  children: ReactNode
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        'group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl px-5 py-3.5 text-sm font-bold text-white',
        CTA_TONE[tone],
      )}
    >
      <span aria-hidden className="absolute inset-x-5 top-0 h-px bg-white/30" />
      {Icon && <Icon className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />}
      <span className="truncate">{children}</span>
      <ArrowRight
        className="h-4 w-4 shrink-0 opacity-80 transition-transform duration-200 group-hover:translate-x-0.5"
        aria-hidden
      />
    </motion.button>
  )
}
