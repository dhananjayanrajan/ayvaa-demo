import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type OptionTone = 'emerald' | 'sky' | 'neutral' | 'dark'

const ACTIVE_BG: Record<OptionTone, string> = {
  emerald: 'bg-emerald-500/[0.08]',
  sky: 'bg-sky-500/[0.1]',
  neutral: 'bg-[#0B211B]/[0.07]',
  dark: 'bg-white/[0.06]',
}

const ACTIVE_TITLE: Record<OptionTone, string> = {
  emerald: 'text-emerald-800',
  sky: 'text-[#0B211B]',
  neutral: 'text-[#0B211B]',
  dark: 'text-white',
}

const UNACTIVE_BG: Record<OptionTone, string> = {
  emerald: 'bg-[#0B211B]/[0.03] hover:bg-[#0B211B]/[0.055]',
  sky: 'bg-[#0B211B]/[0.03] hover:bg-[#0B211B]/[0.055]',
  neutral: 'bg-white hover:bg-white/80',
  dark: 'bg-transparent',
}

export function OptionCheck({ on, accent = 'emerald' }: { on: boolean; accent?: OptionTone }) {
  return (
    <span
      className={cn(
        'grid h-5 w-5 shrink-0 place-items-center rounded-full transition-colors',
        on ? (accent === 'sky' ? 'bg-sky-600 text-white' : 'bg-emerald-500 text-white') : 'bg-[#0B211B]/[0.08]',
      )}
    >
      {on && <Check className="h-3 w-3" strokeWidth={3} aria-hidden />}
    </span>
  )
}

export function OptionCheckBox({ on }: { on: boolean }) {
  return (
    <span
      className={cn(
        'grid h-7 w-7 shrink-0 place-items-center rounded-xl transition-colors duration-300',
        on
          ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_6px_14px_-6px_rgba(16,185,129,0.8)]'
          : 'bg-[#0B211B]/[0.08] text-transparent',
      )}
    >
      <Check className="h-4 w-4" strokeWidth={3.2} aria-hidden />
    </span>
  )
}

export function OptionRow({
  selected,
  onSelect,
  icon: Icon,
  initial,
  leading,
  title,
  sub,
  tone = 'emerald',
  trailing,
  disabled = false,
  role,
  align = 'center',
  fullWidth = true,
  tapScale = 0.985,
  className,
  titleClassName,
  subClassName,
  selectedClassName,
  unselectedClassName,
  selectedTitleClassName,
  unselectedTitleClassName,
}: {
  selected: boolean
  onSelect: () => void
  icon?: LucideIcon
  initial?: string
  leading?: ReactNode
  title: string
  sub?: ReactNode
  tone?: OptionTone
  trailing?: ReactNode
  disabled?: boolean
  role?: string
  align?: 'center' | 'start'
  fullWidth?: boolean
  tapScale?: number
  className?: string
  titleClassName?: string
  subClassName?: string
  selectedClassName?: string
  unselectedClassName?: string
  selectedTitleClassName?: string
  unselectedTitleClassName?: string
}) {
  return (
    <motion.button
      type="button"
      role={role}
      aria-checked={role === 'radio' ? selected : undefined}
      aria-pressed={role === 'radio' ? undefined : selected}
      whileTap={disabled ? undefined : { scale: tapScale }}
      onClick={disabled ? undefined : onSelect}
      disabled={disabled}
      className={cn(
        'flex gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors',
        fullWidth && 'w-full',
        align === 'start' ? 'items-start' : 'items-center',
        selected ? selectedClassName ?? ACTIVE_BG[tone] : unselectedClassName ?? UNACTIVE_BG[tone],
        className,
      )}
    >
      {leading}
      {initial && (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-[14px] font-extrabold text-white">
          {initial}
        </span>
      )}
      {Icon && (
        <span
          className={cn(
            'grid h-9 w-9 shrink-0 place-items-center rounded-xl',
            selected
              ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_6px_14px_-6px_rgba(16,185,129,0.8)]'
              : 'bg-[#0B211B]/[0.05] text-[#0B211B]/55',
          )}
        >
          <Icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            titleClassName ?? 'block truncate text-[13px] font-bold leading-snug tracking-tight',
            selected
              ? selectedTitleClassName ?? ACTIVE_TITLE[tone]
              : unselectedTitleClassName ?? 'text-[#0B211B]/70',
          )}
        >
          {title}
        </span>
        {sub && (
          <span
            className={cn(
              subClassName ?? 'mt-0.5 block text-pretty text-[11px] font-bold tabular-nums leading-snug text-[#0B211B]/45',
            )}
          >
            {sub}
          </span>
        )}
      </span>
      {trailing}
    </motion.button>
  )
}
