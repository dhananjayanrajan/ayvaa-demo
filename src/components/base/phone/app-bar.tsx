import type { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

export function AppBar({
  title,
  subtitle,
  onBack,
  trailing,
  className,
}: {
  title: string
  subtitle?: string
  onBack?: () => void
  trailing?: ReactNode
  className?: string
}) {
  const { back } = useRouter()
  return (
    <div className={cn('flex h-17 shrink-0 items-center gap-3 px-5', className)}>
      <button
        onClick={onBack ?? back}
        className="grid size-10.5 shrink-0 place-items-center rounded-full bg-tonal text-foreground/70 transition-colors hover:bg-mint"
        aria-label="Back"
      >
        <ArrowLeft className="size-5" />
      </button>
      <div className="min-w-0 flex-1">
        <div className="truncate text-base font-bold text-foreground">{title}</div>
        {subtitle && <div className="truncate text-xs font-medium text-muted-foreground">{subtitle}</div>}
      </div>
      {trailing}
    </div>
  )
}