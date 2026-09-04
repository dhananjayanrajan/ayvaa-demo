import { BadgeCheck } from 'lucide-react'
import { Chip, TimeChip } from '@/components/base/phone/kit'
import { ExpandRow } from '@/components/base/phone/expand-row'
import { FactRows } from '@/components/base/phone/fact-rows'
import { Row } from '@/components/base/phone/row'
import type { VisitStep } from '@/data/patientLiveVisit'

interface StepRowProps {
  step: VisitStep
  open?: boolean
  onToggle?: () => void
}

export function StepRow({ step, open = false, onToggle }: StepRowProps) {
  const Icon = step.icon

  if (step.state === 'todo') {
    return (
      <Row
        leading={
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#0B211B]/[0.07] text-[#0B211B]/50">
            <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
          </span>
        }
        title={step.title}
        titleClassName="text-[13px] text-[#0B211B]/70"
        subtitle={step.summary}
        subtitleClassName="text-[11px] text-[#0B211B]/45"
        chip={{ label: 'Upcoming', intent: 'neutral' }}
        surface="inset"
        padding="even"
      />
    )
  }

  return (
    <ExpandRow
      icon={Icon}
      tone="success"
      open={open}
      onToggle={onToggle}
      title={step.title}
      sub={step.summary}
      trailing={
        <span className="flex shrink-0 flex-col items-end gap-1.5">
          <Chip intent="success" icon={BadgeCheck}>
            Sealed
          </Chip>
          <TimeChip>{step.time}</TimeChip>
        </span>
      }
    >
      <div className="rounded-2xl bg-white/[0.6] px-4 py-3.5">
        <FactRows rows={step.readings ?? []} tone="light" />
      </div>

      <div className="mt-2.5 flex items-center gap-2 rounded-xl bg-emerald-500/[0.1] px-3 py-2.5">
        <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-emerald-700" strokeWidth={2.4} aria-hidden />
        <span className="min-w-0 text-[10.5px] font-bold text-emerald-800">
          Sealed {step.time}, written to the immutable visit record
        </span>
      </div>
    </ExpandRow>
  )
}
