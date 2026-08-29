import { Fragment } from 'react'
import { cn } from '@/lib/utils'
import { journeySteps } from '@/data/patientVerification'

export function JourneyRail({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="flex items-start">
      {journeySteps.map((step, i) => {
        const state = i < activeIndex ? 'done' : i === activeIndex ? 'now' : 'next'
        const Icon = step.icon
        return (
          <Fragment key={step.title}>
            {i > 0 && (
              <span
                aria-hidden
                className={cn(
                  'mt-[17px] h-px w-6 shrink-0 transition-colors duration-300',
                  state === 'done' ? 'bg-emerald-300/60' : 'bg-white/15',
                )}
              />
            )}
            <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
              {state === 'done' ? (
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-400/25 text-emerald-100">
                  <Icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                </span>
              ) : state === 'now' ? (
                <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-emerald-400/20 text-emerald-100">
                  <span aria-hidden className="absolute inset-0 animate-ping rounded-xl bg-emerald-400/20" />
                  <Icon className="relative h-4 w-4" strokeWidth={2.2} aria-hidden />
                </span>
              ) : (
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.07] text-emerald-100/40">
                  <Icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                </span>
              )}
              <span
                className={cn(
                  'text-[8.5px] font-extrabold uppercase tracking-[0.1em]',
                  state === 'next' ? 'text-emerald-100/40' : 'text-emerald-200',
                )}
              >
                {step.title}
              </span>
            </div>
          </Fragment>
        )
      })}
    </div>
  )
}
