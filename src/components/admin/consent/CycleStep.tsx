import { Check } from 'lucide-react'

interface CycleStepProps {
  label: string
  sub: string
  done: boolean
}

export function CycleStep({ label, sub, done }: CycleStepProps) {
  return (
    <div className="flex min-w-[84px] flex-col items-center">
      {done ? (
        <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-white">
          <Check className="h-2.5 w-2.5" strokeWidth={4} aria-hidden />
        </span>
      ) : (
        <span className="relative grid h-4 w-4 place-items-center">
          <span aria-hidden className="absolute h-4 w-4 animate-ping rounded-full bg-amber-400/50" />
          <span className="relative h-2.5 w-2.5 rounded-full bg-amber-500 ring-4 ring-amber-500/20" />
        </span>
      )}
      <span className="mt-1.5 text-center text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#0B211B]/60">{label}</span>
      <span className="text-center text-[9px] font-bold text-[#0B211B]/35">{sub}</span>
    </div>
  )
}
