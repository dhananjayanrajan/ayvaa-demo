import { ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type HeroAccent = 'emerald' | 'amber' | 'sky' | 'rose' | 'gold'

const GRADIENT: Record<HeroAccent, string> = {
  emerald: 'from-emerald-300 to-teal-200',
  amber: 'from-amber-300 to-orange-200',
  sky: 'from-sky-300 to-cyan-200',
  rose: 'from-rose-300 to-red-200',
  gold: 'from-amber-300 to-yellow-200',
}

export function HeroTopRow({
  icon: Icon,
  label,
  labelClass = 'text-emerald-200/50',
  trailing,
  className,
}: {
  icon?: LucideIcon
  label: string
  labelClass?: string
  trailing?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-center justify-between gap-3', className)}>
      <span className={cn('flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em]', labelClass)}>
        {Icon && <Icon className="h-3 w-3" aria-hidden />}
        {label}
      </span>
      {trailing}
    </div>
  )
}

export function HeroHighlight({ tone = 'emerald', children }: { tone?: HeroAccent; children: ReactNode }) {
  return <span className={cn('bg-gradient-to-r bg-clip-text text-transparent', GRADIENT[tone])}>{children}</span>
}

export function StatCell({
  label,
  value,
  labelClass = 'text-emerald-100/40',
  className,
}: {
  label: string
  value: string
  labelClass?: string
  className?: string
}) {
  return (
    <div className={cn('rounded-2xl bg-white/[0.06] px-3.5 py-2.5', className)}>
      <div className={cn('text-[9px] font-bold uppercase tracking-[0.14em]', labelClass)}>{label}</div>
      <div className="mt-1 truncate text-[12.5px] font-extrabold leading-none tabular-nums text-white">{value}</div>
    </div>
  )
}

const TAP_TONE = {
  emerald: {
    bg: 'bg-emerald-400/[0.14] hover:bg-emerald-400/[0.2]',
    label: 'text-emerald-100/40',
    chevron: 'text-emerald-200/70',
  },
  sky: {
    bg: 'bg-sky-400/[0.14] hover:bg-sky-400/[0.2]',
    label: 'text-sky-100/40',
    chevron: 'text-sky-200/70',
  },
}

export function TapCell({
  label,
  value,
  onClick,
  tone = 'emerald',
  className,
}: {
  label: string
  value: string
  onClick: () => void
  tone?: 'emerald' | 'sky'
  className?: string
}) {
  const t = TAP_TONE[tone]
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${label}: ${value}`}
      className={cn(
        'flex w-full items-center justify-between gap-3 rounded-2xl px-3.5 py-2.5 text-left transition-colors duration-300',
        t.bg,
        className,
      )}
    >
      <span className="min-w-0">
        <span className={cn('block text-[9px] font-bold uppercase tracking-[0.14em]', t.label)}>{label}</span>
        <span className="mt-1 block truncate text-[12.5px] font-extrabold leading-none text-white">{value}</span>
      </span>
      <ChevronRight className={cn('h-4 w-4 shrink-0', t.chevron)} aria-hidden />
    </button>
  )
}
