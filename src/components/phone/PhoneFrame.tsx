import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react'
import { BatteryFull, Signal, Wifi } from 'lucide-react'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

const kindIcons = {
  ok: { icon: CheckCircle2, cls: 'bg-mint text-brand-ink' },
  warn: { icon: AlertTriangle, cls: 'bg-warn-bg text-warn-ink' },
  error: { icon: XCircle, cls: 'bg-error-bg text-destructive' },
  info: { icon: Info, cls: 'bg-tonal text-primary' },
}

function PhoneNotifications() {
  const { notifications, dismiss } = useDemo()
  return (
    <div className="pointer-events-none absolute inset-x-0 top-3 z-50 flex flex-col items-center gap-2 px-4">
      <AnimatePresence>
        {notifications.slice(0, 3).map((n) => {
          const k = kindIcons[n.kind]
          const Icon = k.icon
          return (
            <motion.button
              key={n.id}
              onClick={() => dismiss(n.id)}
              initial={{ opacity: 0, y: -24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.95 }}
              transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
              className="pointer-events-auto flex w-full items-start gap-2.5 rounded-2xl border border-border bg-card/95 p-3.5 text-left shadow-lg backdrop-blur"
            >
              <span className={cn('grid size-8 shrink-0 place-items-center rounded-full', k.cls)}>
                <Icon className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-bold text-foreground">{n.title}</span>
                {n.body && <span className="mt-0.5 block text-xs font-medium text-muted-foreground">{n.body}</span>}
              </span>
              <span className="shrink-0 text-[10px] font-bold text-muted-foreground">{n.time}</span>
            </motion.button>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'relative flex h-[810px] w-[372px] shrink-0 flex-col overflow-hidden rounded-[44px] bg-background shadow-[0_32px_70px_-22px_rgba(8,46,38,.35),0_0_0_11px_#10161a,0_0_0_13px_#2b353b]',
        className,
      )}
    >
      {children}
      <PhoneNotifications />
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