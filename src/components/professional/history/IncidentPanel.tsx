import { BellRing, Check, Siren } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  incident: string
  resolved: boolean
}

export function IncidentPanel({ incident, resolved }: Props) {
  const shell = resolved
    ? { bg: 'bg-[#241A0B]', glow: 'bg-amber-400/15', overline: 'text-amber-200/60', icon: 'text-amber-200/60', text: 'text-amber-50/90', stripBg: 'bg-white/[0.06]', stripText: 'text-amber-50/80' }
    : { bg: 'bg-[#230D14]', glow: 'bg-rose-400/15', overline: 'text-rose-200/60', icon: 'text-rose-200/60', text: 'text-rose-50/90', stripBg: 'bg-rose-400/[0.12]', stripText: 'text-rose-50/85' }
  const OverlineIcon = resolved ? Siren : BellRing

  return (
    <div className={cn('relative overflow-hidden rounded-2xl p-4', shell.bg)}>
      <div aria-hidden className={cn('pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full blur-3xl', shell.glow)} />
      <div className="relative">
        <div className={cn('flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em]', shell.overline)}>
          <OverlineIcon className="h-3 w-3" strokeWidth={2.5} aria-hidden />
          {resolved ? 'Incident, resolved' : 'Incident, open'}
        </div>
        <p className={cn('mt-2 text-pretty text-[12.5px] font-semibold leading-relaxed', shell.text)}>{incident}</p>

        {resolved ? (
          <div className={cn('mt-3 flex items-center gap-2.5 rounded-xl px-3 py-2.5', shell.stripBg)}>
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400">
              <Check className="h-3 w-3 text-[#062419]" strokeWidth={3.5} aria-hidden />
            </span>
            <span className={cn('min-w-0 flex-1 text-[10.5px] font-bold leading-snug', shell.stripText)}>
              Closed after review. Care resumed the same visit.
            </span>
          </div>
        ) : (
          <div className={cn('mt-3 flex items-center gap-2.5 rounded-xl px-3 py-2.5', shell.stripBg)}>
            <span className="relative grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-400">
              <span aria-hidden className="absolute h-5 w-5 animate-ping rounded-full bg-rose-400/50" />
              <Siren className="relative h-3 w-3 text-[#230D14]" strokeWidth={3} aria-hidden />
            </span>
            <span className={cn('min-w-0 flex-1 text-[10.5px] font-bold leading-snug', shell.stripText)}>
              Supervisor and senior ops paged. Care paused until review.
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
