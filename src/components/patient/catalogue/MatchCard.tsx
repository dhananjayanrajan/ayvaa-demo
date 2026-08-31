import { ArrowUpDown, Sparkles } from 'lucide-react'
import { PhaseHero, PHASE_THEME } from '@/components/phone/PhaseHero'
import { LifecycleButton, type LifecyclePhase } from '@/components/phone/LifecycleButton'

export function MatchCard({
  state,
  onPress,
}: {
  state: LifecyclePhase
  onPress: () => void
}) {
  return (
    <PhaseHero theme={PHASE_THEME.emerald}>
      <div className="relative">
        <div className="flex items-start gap-3.5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-[0_10px_22px_-10px_rgba(16,185,129,0.7)]">
            <Sparkles className="h-5 w-5" strokeWidth={2.2} aria-hidden />
          </span>
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="text-[15px] font-extrabold leading-snug tracking-tight text-white">
              Not sure what you need?
            </div>
            <p className="mt-1 text-pretty text-[12px] font-medium leading-relaxed text-emerald-100/70">
              Describe the situation — a few questions and Ayvaa picks the service, schedule and
              caregivers for you.
            </p>
          </div>
        </div>
        <LifecycleButton
          phase={state}
          className="mt-4"
          idleIcon={ArrowUpDown}
          idleLabel="Let Ayvaa match the care for me"
          workingLabel="Preparing your questions"
          doneLabel="Ready in booking"
          onPress={onPress}
        />
      </div>
    </PhaseHero>
  )
}
