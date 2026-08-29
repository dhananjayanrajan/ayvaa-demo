import { Check, Camera, Smile } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card, Chip, Meter, Tile } from '@/components/phone/kit'
import { nextSteps } from '@/data/patientVerification'

const stepIcons: Record<string, LucideIcon> = {
  id: Camera,
  selfie: Smile,
}

export function NextStepsCard({ doneSteps, totalSteps }: { doneSteps: number; totalSteps: number }) {
  return (
    <Card>
      <div className="flex flex-col gap-2 p-4">
        {nextSteps.map((step) => {
          const Icon = stepIcons[step.key]
          return (
            <div key={step.key} className="flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.03] px-3.5 py-3">
              <Tile icon={Icon} tone={step.chipIntent === 'success' ? 'success' : 'neutral'} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">
                  {step.title}
                </div>
                <div className="mt-0.5 truncate text-[11px] font-semibold text-[#0B211B]/45">
                  {step.detail}
                </div>
              </div>
              <Chip intent={step.chipIntent}>{step.chip}</Chip>
            </div>
          )
        })}
      </div>
      <div className="mx-4 mb-4">
        <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">
          <span>Verification progress</span>
          <span className="tabular-nums text-emerald-700">
            {doneSteps} of {totalSteps}
          </span>
        </div>
        <Meter value={doneSteps / totalSteps} intent="warning" delay={0.3} className="mt-2" />
      </div>
    </Card>
  )
}
