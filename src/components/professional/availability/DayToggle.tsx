import { cn } from '@/lib/utils'

type Props = {
  on: boolean
  label: string
  onToggle: () => void
}

export function DayToggle({ on, label, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Toggle ${label}`}
      aria-pressed={on}
      className={cn(
        'relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200',
        on ? 'bg-emerald-500' : 'bg-[#0B211B]/[0.15]',
      )}
    >
      <span
        className={cn(
          'absolute top-1 h-5 w-5 rounded-full bg-white shadow-[0_2px_6px_rgba(11,33,27,0.3)] transition-all duration-200',
          on ? 'left-6' : 'left-1',
        )}
      />
    </button>
  )
}
