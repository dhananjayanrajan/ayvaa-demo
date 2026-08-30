import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function FactTile({
  icon: Icon,
  label,
  value,
  className,
}: {
  icon: LucideIcon
  label: string
  value: ReactNode
  className?: string
}) {
  return (
    <div className={cn('rounded-xl bg-white p-3', className)}>
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">
        <Icon className="h-3 w-3 shrink-0" aria-hidden />
        {label}
      </div>
      <div className="mt-1 break-words text-[14px] font-extrabold leading-tight text-[#0B211B]">{value}</div>
    </div>
  )
}

export function FactTileGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('grid grid-cols-2 gap-3', className)}>{children}</div>
}
