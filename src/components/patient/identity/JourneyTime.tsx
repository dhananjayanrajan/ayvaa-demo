import { cn } from '@/lib/utils'

export type JourneyTone = 'emerald' | 'amber'

const tones: Record<JourneyTone, string> = {
  emerald: 'bg-white/[0.08] text-emerald-100/80',
  amber: 'bg-white/[0.08] text-amber-200/80',
}

export function JourneyTime({
  value,
  tone = 'emerald',
}: {
  value: string
  tone?: JourneyTone
}) {
  return (
    <span
      className={cn(
        'shrink-0 rounded-full px-2.5 py-1 text-[9px] font-extrabold tabular-nums',
        tones[tone],
      )}
    >
      {value}
    </span>
  )
}
