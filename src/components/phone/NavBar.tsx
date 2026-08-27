import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type NavTab = {
  id: string
  label: string
  icon: LucideIcon
  count?: number
}

export function NavBar({
  tabs,
  active,
  onSelect,
}: {
  tabs: NavTab[]
  active: string
  onSelect: (id: string) => void
}) {
  return (
    <nav className="flex h-23 shrink-0 items-start bg-nav px-3 pt-2.5">
      {tabs.map((t) => {
        const on = t.id === active
        const Icon = t.icon
        return (
          <button key={t.id} onClick={() => onSelect(t.id)} className="relative flex flex-1 flex-col items-center gap-1">
            <span
              className={cn(
                'grid h-8 w-[62px] place-items-center rounded-full transition-colors',
                on ? 'bg-mint text-brand-ink' : 'text-foreground/60',
              )}
            >
              <Icon className={cn('size-5', on && 'fill-current')} />
            </span>
            <span className={cn('text-[11px] font-bold tracking-wide', on ? 'text-brand-ink' : 'text-foreground/60')}>
              {t.label}
            </span>
            {t.count ? (
              <span className="absolute -top-0.5 right-[calc(50%-20px)] grid h-[17px] min-w-[17px] place-items-center rounded-full bg-destructive px-1 text-[10px] font-bold text-white">
                {t.count}
              </span>
            ) : null}
          </button>
        )
      })}
    </nav>
  )
}