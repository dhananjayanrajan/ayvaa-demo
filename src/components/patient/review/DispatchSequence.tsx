import { Check, Send } from 'lucide-react'
import { AccentHero } from '@/components/phone/AccentHero'
import { StatusPill } from '@/components/phone/StatusPill'
import { dispatchSteps } from '@/data/patientReview'

export function DispatchSequence() {
  return (
    <AccentHero tone="emerald">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
          <Send className="h-3 w-3" aria-hidden />
          Automatic sequence
        </span>
        <StatusPill tone="emerald" label="Live" />
      </div>

      <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        The system{' '}
        <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">takes it from here</span>
      </h3>
      <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-emerald-100/60">
        Every step below fires on its own, and you get a push for each.
      </p>

      <div className="mt-4 rounded-2xl bg-white/[0.06] p-4">
        <div className="flex flex-col">
          {dispatchSteps.map((step, i) => {
            const last = i === dispatchSteps.length - 1
            return (
              <div key={step.title} className="flex gap-3">
                <div className="flex flex-col items-center">
                  {step.done ? (
                    <span className="relative mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/90 text-white">
                      {step.live && (
                        <span aria-hidden className="absolute h-5 w-5 animate-ping rounded-full bg-emerald-400/40" />
                      )}
                      <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
                    </span>
                  ) : (
                    <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-white/15" />
                  )}
                  {!last && <span aria-hidden className="my-1 w-px flex-1 bg-white/15" />}
                </div>
                <div className={last ? 'min-w-0 flex-1 pb-0.5' : 'min-w-0 flex-1 pb-4'}>
                  <div className="text-[13px] font-bold leading-snug tracking-tight text-white">{step.title}</div>
                  <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-100/45">{step.note}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <p className="mt-3 text-center text-[10.5px] font-semibold leading-relaxed text-emerald-100/40">
        Family and partner were notified the moment you confirmed.
      </p>
    </AccentHero>
  )
}
