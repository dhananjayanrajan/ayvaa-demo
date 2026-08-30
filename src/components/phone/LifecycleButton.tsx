import { motion } from 'motion/react'
import { Check, Loader2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type LifecyclePhase = 'idle' | 'working' | 'done'

const IDLE_TONE = {
  success: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
  warning: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-[0_18px_36px_-18px_rgba(245,158,11,0.75)]',
  danger: 'bg-gradient-to-r from-rose-600 to-red-500 text-white shadow-[0_18px_36px_-18px_rgba(225,29,72,0.6)]',
  info: 'bg-sky-600 text-white',
  accent: 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-[0_18px_36px_-18px_rgba(37,99,235,0.6)]',
}

const WORKING_TONE = {
  success: 'cursor-wait bg-emerald-600/60 text-white/80',
  warning: 'cursor-wait bg-amber-500/60 text-white/80',
  danger: 'cursor-wait bg-rose-500/60 text-white/80',
  info: 'cursor-wait bg-sky-600/60 text-white/80',
  accent: 'cursor-wait bg-[#0B211B]/[0.25] text-white/80',
}

export function LifecycleButton({
  phase,
  tone = 'success',
  idleLabel,
  workingLabel,
  doneLabel,
  idleIcon: IdleIcon,
  gated = false,
  onPress,
  className,
}: {
  phase: LifecyclePhase
  tone?: 'success' | 'warning' | 'danger' | 'info' | 'accent'
  idleLabel: string
  workingLabel: string
  doneLabel: string
  idleIcon?: LucideIcon
  gated?: boolean
  onPress?: () => void
  className?: string
}) {
  const idle = phase === 'idle'
  const working = phase === 'working'
  const done = phase === 'done'
  const actionable = idle && !gated
  return (
    <motion.button
      type="button"
      whileTap={actionable ? { scale: 0.97 } : undefined}
      onClick={actionable ? onPress : undefined}
      disabled={!actionable}
      aria-disabled={!actionable}
      className={cn(
        'flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold transition-colors duration-300',
        done
          ? 'bg-emerald-600 text-white'
          : working
            ? WORKING_TONE[tone]
            : gated
              ? 'cursor-not-allowed bg-[#0B211B]/[0.08] text-[#0B211B]/40'
              : IDLE_TONE[tone],
        className,
      )}
    >
      {working && <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />}
      {done && <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />}
      {idle && IdleIcon && <IdleIcon className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />}
      <span className="truncate">{working ? workingLabel : done ? doneLabel : idleLabel}</span>
    </motion.button>
  )
}

export function IconLifecycleButton({
  phase,
  icon: IdleIcon,
  doneIcon: DoneIcon,
  size = 40,
  rounded = 'full',
  revert = false,
  ariaLabel,
  onPress,
  className,
}: {
  phase: LifecyclePhase
  icon: LucideIcon
  doneIcon?: LucideIcon
  size?: number
  rounded?: 'full' | 'xl'
  revert?: boolean
  ariaLabel: string
  onPress?: () => void
  className?: string
}) {
  const idle = phase === 'idle'
  const working = phase === 'working'
  const done = phase === 'done'
  const actionable = idle
  const px = `${size}px`
  return (
    <motion.button
      type="button"
      whileTap={actionable ? { scale: 0.9 } : undefined}
      onClick={actionable ? onPress : undefined}
      disabled={!actionable}
      aria-disabled={!actionable}
      aria-label={done ? `${ariaLabel} (done)` : ariaLabel}
      style={{ width: px, height: px }}
      className={cn(
        'grid shrink-0 place-items-center transition-colors',
        rounded === 'full' ? 'rounded-full' : 'rounded-xl',
        revert
          ? done
            ? 'bg-emerald-500/[0.14] text-emerald-700'
            : 'bg-[#0B211B]/[0.05] text-[#0B211B]/60 hover:bg-[#0B211B]/[0.09]'
          : done
            ? 'cursor-not-allowed bg-emerald-500/[0.12] text-emerald-600'
            : 'bg-[#0B211B]/[0.05] text-[#0B211B]/60 hover:bg-[#0B211B]/[0.09]',
        working && 'cursor-wait bg-[#0B211B]/[0.03] text-[#0B211B]/40',
        className,
      )}
    >
      {working && <Loader2 className="animate-spin" style={{ width: size * 0.45, height: size * 0.45 }} aria-hidden />}
      {done && (DoneIcon ? <DoneIcon className="animate-none" style={{ width: size * 0.45, height: size * 0.45 }} strokeWidth={2.6} aria-hidden /> : <Check style={{ width: size * 0.45, height: size * 0.45 }} strokeWidth={2.6} aria-hidden />)}
      {idle && <IdleIcon style={{ width: size * 0.45, height: size * 0.45 }} strokeWidth={2.2} aria-hidden />}
    </motion.button>
  )
}

export function QuietLifecycleButton({
  phase,
  idleLabel,
  workingLabel,
  doneLabel,
  idleIcon: IdleIcon,
  doneTone = 'tint',
  onPress,
  className,
}: {
  phase: LifecyclePhase
  idleLabel: string
  workingLabel: string
  doneLabel: string
  idleIcon?: LucideIcon
  doneTone?: 'tint' | 'muted'
  onPress?: () => void
  className?: string
}) {
  const idle = phase === 'idle'
  const working = phase === 'working'
  const done = phase === 'done'
  const actionable = idle
  return (
    <motion.button
      type="button"
      whileTap={actionable ? { scale: 0.97 } : undefined}
      onClick={actionable ? onPress : undefined}
      disabled={!actionable}
      aria-disabled={!actionable}
      className={cn(
        'flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3 text-[12.5px] font-bold transition-colors duration-300',
        done
          ? doneTone === 'tint'
            ? 'bg-emerald-500/[0.12] text-emerald-700'
            : 'bg-[#0B211B]/[0.04] text-[#0B211B]/40'
          : working
            ? 'cursor-wait bg-[#0B211B]/[0.04] text-[#0B211B]/40'
            : 'bg-[#0B211B]/[0.05] text-[#0B211B]/75 hover:bg-[#0B211B]/[0.09]',
        className,
      )}
    >
      {working && <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" aria-hidden />}
      {done && <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={2.8} aria-hidden />}
      {idle && IdleIcon && <IdleIcon className="h-3.5 w-3.5 shrink-0" strokeWidth={2.4} aria-hidden />}
      <span className="truncate">{working ? workingLabel : done ? doneLabel : idleLabel}</span>
    </motion.button>
  )
}

export function StaticButton({
  tone = 'success',
  icon: Icon,
  onClick,
  full = true,
  children,
  className,
}: {
  tone?: 'success' | 'neutral' | 'amber' | 'danger'
  icon?: LucideIcon
  onClick?: () => void
  full?: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        'flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-colors',
        full && 'w-full',
        tone === 'success' &&
          'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
        tone === 'neutral' && 'bg-[#0B211B]/[0.05] text-[#0B211B]/75 transition-colors hover:bg-[#0B211B]/[0.09]',
        tone === 'amber' && 'bg-amber-500/[0.14] text-amber-800 transition-colors hover:bg-amber-500/[0.2]',
        tone === 'danger' && 'bg-rose-500/[0.08] text-rose-600 hover:bg-rose-500/[0.14]',
        className,
      )}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />}
      <span className="truncate">{children}</span>
    </motion.button>
  )
}

export function CtaNote({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('text-center text-[10px] font-bold text-[#0B211B]/45', className)}>{children}</p>
}
