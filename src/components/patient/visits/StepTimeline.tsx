import { useState } from 'react'
import { ListChecks } from 'lucide-react'
import { Card, Chip, Tile } from '@/components/phone/kit'
import { VISIT_STEPS, sealedStepsOf, todoStepsOf, type VisitStep } from '@/data/patientLiveVisit'
import { StepRow } from './StepRow'

interface StepTimelineProps {
  steps: VisitStep[]
}

export function StepTimeline({ steps }: StepTimelineProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const done = sealedStepsOf(steps)
  const upcoming = todoStepsOf(steps)

  return (
    <Card intent="success">
      <div aria-hidden className="h-1 w-full bg-gradient-to-r from-emerald-400 to-teal-400" />
      <div className="p-5">
        <div className="flex items-start gap-3.5">
          <Tile icon={ListChecks} tone="success" size="lg" />
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Visit log</span>
              <Chip intent="success">
                {done.length} of {VISIT_STEPS.length} sealed
              </Chip>
            </div>
            <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              Sealed steps open their readings and audit detail on tap.
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-700">Sealed and verified</span>
          <span className="text-[10px] font-extrabold tabular-nums text-emerald-700">{done.length}</span>
        </div>

        <div className="mt-2 flex flex-col gap-2">
          {done.map((step) => (
            <StepRow
              key={step.id}
              step={step}
              open={openId === step.id}
              onToggle={() => setOpenId((cur) => (cur === step.id ? null : step.id))}
            />
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#0B211B]/45">Coming up</span>
          <span className="text-[10px] font-extrabold tabular-nums text-[#0B211B]/45">{upcoming.length}</span>
        </div>

        <div className="mt-2 flex flex-col gap-2">
          {upcoming.map((step) => (
            <StepRow key={step.id} step={step} />
          ))}
        </div>
      </div>
    </Card>
  )
}
