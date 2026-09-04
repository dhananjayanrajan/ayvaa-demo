import { useState } from 'react'
import { Lock } from 'lucide-react'
import { Card } from '@/components/base/phone/kit'
import { Row } from '@/components/base/phone/row'
import { safetyRules } from '@/data/patientRecovery'

export function SafetyCard() {
  const [openKey, setOpenKey] = useState<string | null>(null)
  return (
    <Card intent="info">
      <div className="flex flex-col gap-2 p-4">
        {safetyRules.map((rule) => {
          const open = openKey === rule.key
          return (
            <Row
              key={rule.key}
              leading={
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-sky-500/[0.12] text-sky-600">
                  <Lock className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                </span>
              }
              title={rule.title}
              titleClassName="text-[12.5px] font-bold tracking-tight"
              expandable
              open={open}
              onToggle={() => setOpenKey(open ? null : rule.key)}
              chevronInTrailing
              surface="none"
              className="rounded-2xl bg-sky-500/[0.06] px-3 py-2.5"
              hoverClassName=""
              expansion={<p className="text-pretty text-[11px] font-medium leading-relaxed text-[#0B211B]/55">{rule.body}</p>}
              expansionClassName="px-3 pb-3"
            />
          )
        })}
      </div>
    </Card>
  )
}
