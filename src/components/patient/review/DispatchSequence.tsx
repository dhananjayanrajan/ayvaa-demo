import { Check, Send } from 'lucide-react'
import { AccentHero } from '@/components/phone/AccentHero'
import { StatusPill } from '@/components/phone/StatusPill'
import { StepList } from '@/components/phone/StepList'
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
        <StepList
          nodeStyle="circle"
          nodeSize="md"
          theme="dark"
          steps={dispatchSteps.map((step, i) => {
            const last = i === dispatchSteps.length - 1
            return {
              key: step.title,
              state: step.done ? 'done' : 'pending',
              node: step.done ? (
                <span className="relative mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/90 text-white">
                  {step.live && (
                    <span aria-hidden className="absolute h-5 w-5 animate-ping rounded-full bg-emerald-400/40" />
                  )}
                  <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
                </span>
              ) : (
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-white/15" />
              ),
              title: step.title,
              titleClassName: 'text-[13px] leading-snug tracking-tight',
              body: step.note,
              bodyClassName: 'text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-100/45',
              contentClassName: last ? 'pb-0.5' : undefined,
            }
          })}
        />
      </div>
      <p className="mt-3 text-center text-[10.5px] font-semibold leading-relaxed text-emerald-100/40">
        Family and partner were notified the moment you confirmed.
      </p>
    </AccentHero>
  )
}
