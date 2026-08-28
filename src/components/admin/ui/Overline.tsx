import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

interface OverlineProps {
  icon?: LucideIcon
  children: ReactNode
}

export function Overline({ icon: Icon, children }: OverlineProps) {
  return (
    <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">
      {Icon && <Icon className="h-3 w-3" strokeWidth={2.5} aria-hidden />}
      <span>{children}</span>
    </div>
  )
}
