import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { AccentHero } from '@/components/phone/AccentHero'
import { Tile } from '@/components/phone/kit'
import { cn } from '@/lib/utils'

interface InfoListItem {
  icon: LucideIcon
  text: string
}

interface InfoListCardProps {
  accent?: 'emerald' | 'amber'
  icon: LucideIcon
  title: string
  subtitle: string
  items: InfoListItem[]
  footer?: ReactNode
}

export function InfoListCard({ accent = 'emerald', icon, title, subtitle, items, footer }: InfoListCardProps) {
  const tone = accent === 'emerald'
    ? { iconWrap: 'bg-emerald-400/15 text-emerald-200', text: 'text-emerald-50/80' }
    : { iconWrap: 'bg-amber-400/15 text-amber-200', text: 'text-amber-50/80' }

  return (
    <AccentHero tone={accent}>
      <div className="flex items-start gap-3">
        <Tile icon={icon} tone="white" size="lg" />
        <div className="min-w-0 flex-1 pt-0.5">
          <div className="text-sm font-extrabold leading-snug tracking-tight text-white">{title}</div>
          <p className={cn('mt-1 text-pretty text-xs font-medium leading-relaxed', accent === 'emerald' ? 'text-emerald-100/55' : 'text-amber-100/55')}>
            {subtitle}
          </p>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl bg-white/[0.06]">
        {items.map((item, index) => (
          <div key={item.text}>
            {index > 0 && <div aria-hidden className="mx-3.5 h-px bg-white/[0.07]" />}
            <div className="flex items-center gap-3 px-3.5 py-3">
              <span className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px]', tone.iconWrap)}>
                <item.icon className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
              </span>
              <span className={cn('min-w-0 flex-1 text-[12.5px] font-semibold leading-snug', tone.text)}>{item.text}</span>
            </div>
          </div>
        ))}
      </div>

      {footer && <div className="mt-4 flex flex-wrap gap-1.5">{footer}</div>}
    </AccentHero>
  )
}
