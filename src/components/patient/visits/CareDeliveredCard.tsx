import { useState } from 'react'
import { Check } from 'lucide-react'
import { Card, Chip, TimeChip } from '@/components/phone/kit'
import { ExpandRow } from '@/components/phone/ExpandRow'
import { CARE_STEPS } from '@/data/patientVisitSummary'

export function CareDeliveredCard() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <Card>
      <div className="flex flex-col gap-2 p-3">
        {CARE_STEPS.map((step) => {
          const open = openId === step.id
          const Icon = step.icon
          return (
            <ExpandRow
              key={step.id}
              icon={Icon}
              tone="success"
              dense={false}
              open={open}
              onToggle={() => setOpenId((cur) => (cur === step.id ? null : step.id))}
              title={step.title}
              sub={step.summary}
              trailing={
                <span className="flex shrink-0 flex-col items-end gap-1.5">
                  <Chip intent="success" icon={Check}>
                    Done
                  </Chip>
                  <TimeChip>{step.time}</TimeChip>
                </span>
              }
            >
              <div className="rounded-2xl bg-white/[0.6] px-4 py-3.5">
                <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">
                  What was done
                </div>
                <div className="mt-1 text-[12px] font-semibold leading-snug text-[#0B211B]/70">
                  {step.detail}
                </div>
              </div>
              <div className="mt-2.5 flex items-center gap-2 rounded-xl bg-emerald-500/[0.1] px-3 py-2.5">
                <Check className="h-3.5 w-3.5 shrink-0 text-emerald-700" strokeWidth={2.4} aria-hidden />
                <span className="min-w-0 text-[10.5px] font-bold text-emerald-800">
                  Sealed {step.time}, written to the immutable visit record
                </span>
              </div>
            </ExpandRow>
          )
        })}
      </div>
    </Card>
  )
}
