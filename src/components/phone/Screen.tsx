import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Screen({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex min-h-0 flex-1 flex-col', className)}>{children}</div>
}

export function BodyArea({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'scrollbar-none flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3 pt-1 pb-8',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function FootBar({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex shrink-0 flex-col gap-2.5 px-5 pb-7 pt-3', className)}>{children}</div>
}

export function EndOfScroll({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-2 pb-1 pt-2">
      <div className="flex items-center gap-1">
        <span className="size-1 rounded-full bg-muted-foreground/40" />
        <span className="size-1 rounded-full bg-muted-foreground/40" />
        <span className="size-1 rounded-full bg-muted-foreground/40" />
      </div>
      {label && (
        <span className="text-[10px] font-bold uppercase tracking-[0.9px] text-muted-foreground/60">{label}</span>
      )}
    </div>
  )
}
