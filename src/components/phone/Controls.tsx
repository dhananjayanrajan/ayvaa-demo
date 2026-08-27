import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Pill({
  tone = 'ok',
  children,
  className,
}: {
  tone?: 'ok' | 'warn' | 'grey' | 'error'
  children: ReactNode
  className?: string
}) {
  const tones = {
    ok: 'bg-mint text-brand-ink',
    warn: 'bg-warn-bg text-warn-ink',
    grey: 'bg-tonal text-foreground/70',
    error: 'bg-destructive text-white',
  }
  return (
    <span
      className={cn(
        'inline-flex h-[26px] shrink-0 items-center gap-1 rounded-full px-2.5 text-[11px] font-bold tracking-wide',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Chip({
  on = false,
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { on?: boolean }) {
  return (
    <button
      className={cn(
        'inline-flex h-[34px] shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-medium transition-colors',
        on ? 'border-transparent bg-mint font-bold text-brand-ink' : 'border-border bg-card text-foreground/70',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function Field({
  icon: Icon,
  value,
  hint,
  className,
}: {
  icon?: LucideIcon
  value?: string
  hint?: string
  className?: string
}) {
  return (
    <div className={cn('flex h-[54px] w-full items-center gap-2.5 rounded-full border border-border bg-card px-4', className)}>
      {Icon && <Icon className="size-5 shrink-0 text-muted-foreground" />}
      {value ? (
        <span className="truncate text-sm font-medium text-foreground">{value}</span>
      ) : (
        <span className="truncate text-sm text-muted-foreground">{hint}</span>
      )}
    </div>
  )
}

export function Tile({
  icon: Icon,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { icon: LucideIcon }) {
  return (
    <button
      className={cn('grid size-15 shrink-0 place-items-center rounded-[14px] bg-tonal text-foreground/70', className)}
      {...props}
    >
      <Icon className="size-6" />
    </button>
  )
}

export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('text-[11px] font-bold uppercase tracking-[0.9px] text-muted-foreground', className)}>
      {children}
    </span>
  )
}

export function StatCard({
  icon: Icon,
  value,
  label,
  tone = 'default',
  className,
}: {
  icon?: LucideIcon
  value: string
  label: string
  tone?: 'default' | 'mint' | 'error'
  className?: string
}) {
  const tones = { default: 'bg-card', mint: 'bg-mint', error: 'bg-error-bg' }
  const iconTones = { default: 'text-primary', mint: 'text-brand-ink', error: 'text-destructive' }
  const valueTones = { default: 'text-foreground', mint: 'text-brand-ink', error: 'text-destructive' }
  const labelTones = {
    default: 'text-muted-foreground',
    mint: 'text-brand-ink/70',
    error: 'text-destructive/80',
  }
  return (
    <div className={cn('flex-1 rounded-[20px] p-3.5', tones[tone], className)}>
      {Icon && <Icon className={cn('size-5.5', iconTones[tone])} />}
      <div className={cn('mt-1.5 text-xl font-bold', valueTones[tone])}>{value}</div>
      <div className={cn('mt-0.5 text-[11px] font-bold uppercase tracking-wide', labelTones[tone])}>{label}</div>
    </div>
  )
}

export function ListRow({
  icon: Icon,
  title,
  subtitle,
  trailing,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: LucideIcon
  title: string
  subtitle?: string
  trailing?: ReactNode
}) {
  return (
    <button className={cn('flex w-full items-center gap-3 text-left', className)} {...props}>
      {Icon && (
        <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-tonal text-foreground/70">
          <Icon className="size-5" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-bold text-foreground">{title}</span>
        {subtitle && <span className="block truncate text-xs font-medium text-muted-foreground">{subtitle}</span>}
      </span>
      {trailing}
    </button>
  )
}

export function Avatar({
  initials,
  tone = 'brand',
  className,
  children,
}: {
  initials?: string
  tone?: 'brand' | 'alt' | 'soft' | 'ink' | 'dark'
  className?: string
  children?: ReactNode
}) {
  const tones = {
    brand: 'bg-primary text-white',
    alt: 'bg-[#33739E] text-white',
    soft: 'bg-mint text-brand-ink',
    ink: 'bg-brand-ink text-white',
    dark: 'bg-[#3A3F63] text-white',
  }
  return (
    <span className={cn('grid size-[46px] shrink-0 place-items-center rounded-full text-sm font-bold', tones[tone], className)}>
      {children ?? initials}
    </span>
  )
}