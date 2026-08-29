import { useState } from 'react'
import { motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { Card, Expand } from '@/components/phone/kit'
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
            <div key={fact.key} className="rounded-2xl bg-sky-500/[0.06]">
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenKey(open ? null : fact.key)}
                className="flex w-full items-center gap-3 px-3 py-2.5 text-left"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-sky-500/[0.12] text-sky-600">
                  <Icon className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
                </span>
                <span className="min-w-0 flex-1 text-[12.5px] font-bold tracking-tight text-[#0B211B]">
                  {fact.title}
                </span>
                <motion.span
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0"
                >
                  <ChevronDown className="h-3.5 w-3.5 text-[#0B211B]/25" aria-hidden />
                </motion.span>
              </button>
              <Expand open={open}>
                <p className="px-3 pb-3 text-pretty text-[11px] font-medium leading-relaxed text-[#0B211B]/55">
                  {fact.body}
                </p>
              </Expand>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
