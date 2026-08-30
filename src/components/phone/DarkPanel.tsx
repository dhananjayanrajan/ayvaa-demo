import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const TONES = {
  emerald: { shell: 'bg-[#0B231C]', kicker: 'text-emerald-200/50' },
  amber: { shell: 'bg-[#241A0B]', kicker: 'text-amber-200/50' },
  rose: { shell: 'bg-[#230D14]', kicker: 'text-rose-200/60' },
}

export function DarkPanel({
  tone = 'emerald',
  kicker,
  kickerIcon: KickerIcon,
  kickerTrailing,
  glow = true,
  className,
  children,
}: {
  tone?: 'emerald' | 'amber' | 'rose'
  kicker?: string
  kickerIcon?: LucideIcon
  kickerTrailing?: ReactNode
  glow?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('relative overflow-hidden rounded-2xl p-4', TONES[tone].shell, className)}>
      {glow && tone === 'emerald' && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl"
        />
      )}
      <div className="relative">
        {kicker &&
          (kickerTrailing ? (
            <div className="flex items-center justify-between gap-2">
              <span
                className={cn(
                  'flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em]',
                  TONES[tone].kicker,
                )}
              >
                {KickerIcon && <KickerIcon className="h-3 w-3" aria-hidden />}
                {kicker}
              </span>
              {kickerTrailing}
            </div>
          ) : (
            <div
              className={cn(
                'flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em]',
                TONES[tone].kicker,
              )}
            >
              {KickerIcon && <KickerIcon className="h-3 w-3" aria-hidden />}
              {kicker}
            </div>
          ))}
        {kicker ? <div className="mt-3">{children}</div> : children}
      </div>
    </div>
  )
}
