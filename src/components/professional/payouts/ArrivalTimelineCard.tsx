import { Card } from '@/components/phone/kit'
import { AlertToggleRow } from './AlertToggleRow'
import { WITHDRAWAL_STEPS } from './payoutData'
import { cn } from '@/lib/utils'

export function ArrivalTimelineCard() {
  return (
    <Card>
      <div className="p-5">
        {WITHDRAWAL_STEPS.map((st, i) => {
          const last = i === WITHDRAWAL_STEPS.length - 1
          return (
            <div key={st.title} className="flex gap-3.5">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    'relative mt-1 grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full',
                    st.done ? 'bg-emerald-500' : 'bg-white',
                  )}
                >
                  {st.active && (
                    <>
                      <span aria-hidden className="absolute h-4 w-4 animate-ping rounded-full bg-emerald-400/50" />
                      <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                    </>
                  )}
                </span>
                {!last && (
                  <span aria-hidden className="my-1 w-px flex-1 bg-gradient-to-b from-emerald-500/50 via-emerald-400/25 to-emerald-300/15" />
                )}
              </div>
              <div className={cn('min-w-0 flex-1', !last && 'pb-5')}>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="min-w-0 text-[13.5px] font-extrabold tracking-tight text-[#0B211B]">{st.title}</span>
                  <span className="shrink-0 font-mono text-[10px] font-bold uppercase tabular-nums text-emerald-600">{st.when}</span>
                </div>
                <p className="mt-1 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/55">{st.detail}</p>
              </div>
            </div>
          )
        })}

        <AlertToggleRow />
      </div>
    </Card>
  )
}
