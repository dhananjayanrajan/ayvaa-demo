import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function ScreenCard({
  tone = 'default',
  className,
  children,
}: {
  tone?: 'default' | 'tonal' | 'mint' | 'warn' | 'error'
  className?: string
  children: ReactNode
}) {
  const tones = {
    default: 'border-0 bg-card',
    tonal: 'border-0 bg-tonal',
    mint: 'border-0 bg-mint',
    warn: 'border-0 bg-warn-bg',
    error: 'border-0 bg-error-bg',
  }
  return <Card className={cn('rounded-[20px] p-4 shadow-none', tones[tone], className)}>{children}</Card>
}

export function IconTile({
  icon: Icon,
  tone = 'tonal',
  size = 'md',
  className,
  children,
}: {
  icon: LucideIcon
  tone?: 'mint' | 'tonal' | 'warn' | 'error' | 'brand' | 'ink' | 'white' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children?: ReactNode
}) {
  const tones = {
    mint: 'bg-mint text-brand-ink',
    tonal: 'bg-tonal text-foreground/70',
    warn: 'bg-warn-bg text-warn-ink',
    error: 'bg-error-bg text-destructive',
    brand: 'bg-primary text-white',
    ink: 'bg-brand-ink text-white',
    white: 'bg-white/70 text-brand-ink',
    destructive: 'bg-destructive text-white',
  }
  const sizes = {
    sm: 'size-9 rounded-[12px]',
    md: 'size-11 rounded-[14px]',
    lg: 'size-15 rounded-[14px]',
  }
  const icons = { sm: 'size-4.5', md: 'size-5', lg: 'size-6' }
  return (
    <span className={cn('relative grid shrink-0 place-items-center', sizes[size], tones[tone], className)}>
      <Icon className={icons[size]} />
      {children}
    </span>
  )
}

export function InfoCard({
  icon: Icon,
  title,
  body,
  tone = 'tonal',
  className,
}: {
  icon: LucideIcon
  title?: string
  body: string
  tone?: 'tonal' | 'mint' | 'warn' | 'error'
  className?: string
}) {
  return (
    <ScreenCard tone={tone} className={cn('flex items-start gap-3', className)}>
      <IconTile icon={Icon} tone={tone === 'error' ? 'destructive' : tone === 'warn' ? 'warn' : 'mint'} />
      <div className="min-w-0 flex-1">
        {title && <div className="text-sm font-bold text-foreground">{title}</div>}
        <div className={cn('text-[13px] font-medium leading-snug', title ? 'mt-0.5 text-muted-foreground' : 'text-foreground/80')}>
          {body}
        </div>
      </div>
    </ScreenCard>
  )
}

export function StatRow({
  icon: Icon,
  label,
  value,
  trailing,
  className,
}: {
  icon: LucideIcon
  label: string
  value: string
  trailing?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <IconTile icon={Icon} />
      <span className="min-w-0 flex-1 text-sm font-medium text-foreground/80">{label}</span>
      <span className="text-sm font-bold text-foreground">{value}</span>
      {trailing}
    </div>
  )
}

export function ActionRow({
  icon: Icon,
  title,
  subtitle,
  onClick,
  className,
  trailing,
}: {
  icon: LucideIcon
  title: string
  subtitle?: string
  onClick?: () => void
  className?: string
  trailing?: ReactNode
}) {
  return (
    <button onClick={onClick} className={cn('flex w-full items-center gap-3 text-left', className)}>
      <IconTile icon={Icon} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-bold text-foreground">{title}</span>
        {subtitle && <span className="block truncate text-xs font-medium text-muted-foreground">{subtitle}</span>}
      </span>
      {trailing}
      <ChevronRight className="size-4.5 shrink-0 text-muted-foreground" />
    </button>
  )
}

export function SectionHeader({
  label,
  action,
  onAction,
  className,
}: {
  label: string
  action?: string
  onAction?: () => void
  className?: string
}) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <span className="text-[11px] font-bold uppercase tracking-[0.9px] text-muted-foreground">{label}</span>
      {action && (
        <button onClick={onAction} className="text-[12px] font-bold text-primary">
          {action}
        </button>
      )}
    </div>
  )
}