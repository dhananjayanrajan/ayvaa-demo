import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type OptionAccent = 'emerald' | 'sky'

const ACTIVE_BG: Record<OptionAccent, string> = {
  emerald: 'bg-emerald-500/[0.08]',
  sky: 'bg-sky-500/[0.1]',
}

const ACTIVE_TITLE: Record<OptionAccent, string> = {
  emerald: 'text-emerald-800',
  sky: 'text-[#0B211B]',
}

export function OptionCheck({ on, accent = 'emerald' }: { on: boolean; accent?: OptionAccent }) {
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

export function OptionRow({
  selected,
  onSelect,
  icon: Icon,
  initial,
  title,
  sub,
  accent = 'emerald',
  trailing,
  disabled = false,
  role,
  className,
}: {
  selected: boolean
  onSelect: () => void
  icon?: LucideIcon
  initial?: string
  title: string
  sub?: ReactNode
  accent?: OptionAccent
  trailing?: ReactNode
  disabled?: boolean
  role?: string
  className?: string
}) {
  return (
    <motion.button
      type="button"
      role={role}
      aria-checked={role === 'radio' ? selected : undefined}
      aria-pressed={role === 'radio' ? undefined : selected}
      whileTap={disabled ? undefined : { scale: 0.985 }}
      onClick={disabled ? undefined : onSelect}
      disabled={disabled}
      className={cn(
        'flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors',
        selected ? ACTIVE_BG[accent] : 'bg-[#0B211B]/[0.03] hover:bg-[#0B211B]/[0.055]',
        className,
      )}
    >
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
            'block truncate text-[13px] font-bold leading-snug tracking-tight',
            selected ? ACTIVE_TITLE[accent] : 'text-[#0B211B]/70',
          )}
        >
          {title}
        </span>
        {sub && (
          <span className="mt-0.5 block text-pretty text-[11px] font-bold tabular-nums leading-snug text-[#0B211B]/45">
            {sub}
          </span>
        )}
      </span>
      {trailing}
    </motion.button>
  )
}
