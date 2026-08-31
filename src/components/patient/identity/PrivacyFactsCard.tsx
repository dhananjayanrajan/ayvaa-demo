import { useState } from 'react'
import { Card } from '@/components/phone/kit'
import { Row } from '@/components/phone/Row'
import { privacyFacts } from '@/data/patientIdentity'

export function PrivacyFactsCard() {
  const [openKey, setOpenKey] = useState<string | null>(null)
  return (
    <Card intent="info">
      <div className="flex flex-col gap-2 p-4">
        {privacyFacts.map((fact) => {
          const open = openKey === fact.key
          const Icon = fact.icon
          return (
            <Row
              key={fact.key}
              leading={
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-sky-500/[0.12] text-sky-600">
                  <Icon className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
                </span>
              }
              title={fact.title}
              titleClassName="text-[12.5px] font-bold tracking-tight"
              expandable
              open={open}
              onToggle={() => setOpenKey(open ? null : fact.key)}
              chevronInTrailing
              surface="none"
              className="rounded-2xl bg-sky-500/[0.06] px-3 py-2.5"
              hoverClassName=""
              expansion={<p className="text-pretty text-[11px] font-medium leading-relaxed text-[#0B211B]/55">{fact.body}</p>}
              expansionClassName="px-3 pb-3"
            />
          )
        })}
      </div>
    </Card>
  )
}
