import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Avatar as UIAvatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
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
    ok: 'border-transparent bg-mint text-brand-ink',
    warn: 'border-transparent bg-warn-bg text-warn-ink',
    grey: 'border-transparent bg-tonal text-foreground/70',
    error: 'border-transparent bg-destructive text-white',
  }
  return (
    <Badge variant="outline" className={cn('h-[26px] rounded-full px-2.5 text-[11px] font-bold tracking-wide', tones[tone], className)}>
      {children}
    </Badge>
  )
}

export function Chip({
  on = false,
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { on?: boolean }) {
  return (
    <Button
      variant={on ? 'default' : 'outline'}
      className={cn(
        'h-[34px] rounded-full px-3.5 text-[13px] font-medium',
        on && 'border-transparent bg-mint font-bold text-brand-ink hover:bg-mint',
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

export function Field({
  icon: Icon,
  value,
  hint,
  className,
  onClick,
}: {
  icon?: LucideIcon
  value?: string
  hint?: string
  className?: string
  onClick?: () => void
}) {
  const inner = (
    <>
      {Icon && <Icon className="absolute left-4 z-1 size-5 text-muted-foreground" />}
      <Input
        readOnly
        value={value ?? ''}
        placeholder={hint}
        className={cn(
          'h-full rounded-full border-border bg-card pl-11 text-sm font-medium text-foreground placeholder:text-muted-foreground',
          !value && 'font-normal',
        )}
      />
    </>
  )
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cn('relative flex h-[54px] w-full items-center', className)}>
        {inner}
      </button>
    )
  }
  return <div className={cn('relative flex h-[54px] w-full items-center', className)}>{inner}</div>
}

export function Tile({
  icon: Icon,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { icon: LucideIcon }) {
  return (
    <Button
      variant="ghost"
      className={cn('size-15 shrink-0 rounded-[14px] bg-tonal text-foreground/70 hover:bg-tonal', className)}
      {...props}
    >
      <Icon className="size-6" />
    </Button>
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
  tone?: 'default' | 'mint' | 'warn' | 'error'
  className?: string
}) {
  const tones = { default: 'bg-card', mint: 'bg-mint', warn: 'bg-warn-bg', error: 'bg-error-bg' }
  const iconTones = { default: 'text-primary', mint: 'text-brand-ink', warn: 'text-warn-ink', error: 'text-destructive' }
  const valueTones = { default: 'text-foreground', mint: 'text-brand-ink', warn: 'text-warn-ink', error: 'text-destructive' }
  const labelTones = {
    default: 'text-muted-foreground',
    mint: 'text-brand-ink/70',
    warn: 'text-warn-ink/80',
    error: 'text-destructive/80',
  }
  return (
    <Card className={cn('flex-1 rounded-[20px] border-0 p-3.5 shadow-none', tones[tone], className)}>
      {Icon && <Icon className={cn('size-5.5', iconTones[tone])} />}
      <div className={cn('mt-1.5 text-xl font-bold', valueTones[tone])}>{value}</div>
      <div className={cn('mt-0.5 text-[11px] font-bold uppercase tracking-wide', labelTones[tone])}>{label}</div>
    </Card>
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
    <UIAvatar className={cn('size-[46px]', className)}>
      <AvatarFallback className={cn('text-sm font-bold', tones[tone])}>{children ?? initials}</AvatarFallback>
    </UIAvatar>
  )
}