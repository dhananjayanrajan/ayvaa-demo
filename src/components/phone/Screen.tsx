import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Screen({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex min-h-0 flex-1 flex-col', className)}>{children}</div>
}

export function BodyArea({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'scrollbar-none flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-5',
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

export function Fade() {
  return <div className="pointer-events-none absolute inset-x-0 bottom-26 z-3 h-10 bg-gradient-to-t from-background to-transparent" />
}