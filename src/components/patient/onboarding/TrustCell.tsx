import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function TrustCell({
  icon: Icon,
  label,
  wide = false,
}: {
  icon: LucideIcon
  label: string
  wide?: boolean
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-2.5 rounded-2xl bg-white/[0.06] px-3 py-2.5',
        wide && 'bg-white/[0.04]',
      )}
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-400/15">
        <Icon className="h-3.5 w-3.5 text-emerald-300" strokeWidth={2.2} aria-hidden />
      </span>
      <span className="min-w-0 flex-1 text-[10px] font-bold leading-tight text-emerald-100/75">
        {label}
      </span>
    </div>
  )
}
