import type { ReactNode } from 'react'
import { BatteryFull, Signal, Wifi } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'relative flex h-[810px] w-[372px] shrink-0 flex-col overflow-hidden rounded-[44px] bg-background shadow-[0_32px_70px_-22px_rgba(8,46,38,.35),0_0_0_11px_#10161a,0_0_0_13px_#2b353b]',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function StatusBar({ time = '9:02' }: { time?: string }) {
  return (
    <div className="flex h-11 shrink-0 items-center justify-between px-7">
      <span className="text-[13px] font-semibold text-foreground">{time}</span>
      <div className="flex items-center gap-1.5 text-foreground">
        <Signal className="size-3.5" />
        <Wifi className="size-3.5" />
        <BatteryFull className="size-4" />
      </div>
    </div>
  )
}