import { cn } from '@/lib/utils'

export function Radio({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full transition-colors duration-200',
        active ? 'bg-emerald-500' : 'bg-[#0B211B]/[0.12]',
      )}
    >
      {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
    </span>
  )
}
