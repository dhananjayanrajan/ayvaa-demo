import { cn } from '@/lib/utils'
import { wizardSteps } from '@/data/patientBooking'

export function WizardStepper({ activeIndex }: { activeIndex: number }) {
  return (
    <div>
      <div className="relative h-4">
        <span
          aria-hidden
          className="absolute top-1/2 h-px bg-white/15"
          style={{ left: '16.67%', right: '16.67%' }}
        />
        <span
          aria-hidden
          className="absolute top-1/2 h-px bg-emerald-300/60 transition-all duration-500"
          style={{ left: '16.67%', width: `${(activeIndex / (wizardSteps.length - 1)) * 66.66}%` }}
        />
        <div className="absolute inset-0 grid grid-cols-3">
          {wizardSteps.map((step, i) => (
            <span key={step} className="flex items-center justify-center">
              {i === activeIndex ? (
                <span className="relative grid h-4 w-4 place-items-center">
                  <span aria-hidden className="absolute h-4 w-4 animate-ping rounded-full bg-emerald-300/50" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_0_3px_rgba(52,211,153,0.2)]" />
                </span>
              ) : i < activeIndex ? (
                <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-400 text-[#0B231C] shadow-[0_0_0_3px_rgba(52,211,153,0.15)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0B231C]" />
                </span>
              ) : (
                <span className="h-2.5 w-2.5 rounded-full bg-white/20 shadow-[0_0_0_3px_rgba(255,255,255,0.04)]" />
              )}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-1.5 grid grid-cols-3">
        {wizardSteps.map((step, i) => (
          <span
            key={step}
            className={cn(
              'text-center text-[8px] font-extrabold uppercase tracking-[0.12em]',
              i === activeIndex ? 'text-emerald-100/80' : i < activeIndex ? 'text-emerald-100/60' : 'text-emerald-100/30',
            )}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  )
}
