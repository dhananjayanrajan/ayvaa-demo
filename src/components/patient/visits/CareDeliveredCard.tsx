import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, ChevronDown } from 'lucide-react'
import { Card, Chip, Tile, TimeChip } from '@/components/phone/kit'
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
            <div key={step.id} className="rounded-2xl bg-[#0B211B]/[0.03]">
              <button
                type="button"
                onClick={() => setOpenId((cur) => (cur === step.id ? null : step.id))}
                aria-expanded={open}
                className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-[#0B211B]/[0.02]"
              >
                <Tile icon={Icon} tone="success" size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-bold tracking-tight text-[#0B211B]">{step.title}</span>
                  <span className="mt-0.5 block text-[11px] font-medium leading-snug text-[#0B211B]/50">
                    {step.summary}
                  </span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-1.5">
                  <Chip intent="success" icon={Check}>
                    Done
                  </Chip>
                  <TimeChip>{step.time}</TimeChip>
                </span>
                <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
                  <ChevronDown className="h-3.5 w-3.5 text-[#0B211B]/30" aria-hidden />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="detail"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4">
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
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
