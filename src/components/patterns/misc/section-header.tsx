import { cn } from '@/lib/utils'

export function SectionHeader({
  label,
  done,
  trailing,
}: {
  label: string
  done: boolean
  trailing: string
}) {
  return (
    <div className="flex items-center gap-2.5 px-1">
      <span
        aria-hidden
        className={cn(
          'h-4 w-1 shrink-0 rounded-full transition-colors duration-300',
          done ? 'bg-emerald-500' : 'bg-amber-500',
        )}
      />
      <span className="shrink-0 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/45">
        {label}
      </span>
      <span aria-hidden className="h-px min-w-0 flex-1 bg-[#0B211B]/[0.07]" />
      <span className="shrink-0 rounded-full bg-[#0B211B]/[0.05] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#0B211B]/45">
        {trailing}
      </span>
    </div>
  )
}
