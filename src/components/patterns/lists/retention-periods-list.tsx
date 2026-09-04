import { useState } from 'react'
import { motion } from 'motion/react'
import { ChevronDown, FileText, ShieldCheck } from 'lucide-react'
import { Card, Chip, Panel, TimeChip, rise } from '@/components/base/phone/kit'
import type { TileTone } from '@/components/base/phone/kit'
import { Row } from '@/components/base/phone/row'
import { retentionPolicies } from '@/data/seed'
import { useDemo } from '@/lib/store'

const periodTones: TileTone[] = ['success', 'info', 'warning', 'ink']

export function RetentionPeriodsList() {
  const { notify } = useDemo()
  const [openId, setOpenId] = useState<string | null>(null)
  const [purgedTypes, setPurgedTypes] = useState<string[]>([])

  const handleSimulatePurge = (type: string) => {
    setPurgedTypes((prev) => (prev.includes(type) ? prev : [...prev, type]))
    notify({
      title: 'Purge simulated',
      body: `${type} policy executed · audit log updated`,
      kind: 'ok',
    })
  }

  return (
    <motion.div variants={rise}>
      <Card>
        {retentionPolicies.map((policy, i) => {
          const open = openId === policy.type
          const purged = purgedTypes.includes(policy.type)
          return (
            <div key={policy.type}>
              <Row
                icon={FileText}
                tone={periodTones[i % periodTones.length]}
                tileClassName="transition-transform duration-200 group-hover:scale-105"
                title={policy.type}
                titleClassName="text-[13.5px] leading-snug"
                subtitle="Auto-purge · audit logged"
                subtitleClassName="mt-0.5 text-[11px] font-medium text-[#0B211B]/45"
                expandable
                open={open}
                onToggle={() => setOpenId(open ? null : policy.type)}
                chevronVisible={false}
                expansionPadded={false}
                hoverClassName="hover:bg-[#0B211B]/[0.02]"
                trailing={
                  <span className="flex shrink-0 items-center gap-2">
                    {purged ? (
                      <Chip intent="success" icon={ShieldCheck}>
                        Purged
                      </Chip>
                    ) : (
                      <TimeChip>{policy.period}</TimeChip>
                    )}
                    <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
                      <ChevronDown className="h-4 w-4 text-[#0B211B]/25" aria-hidden />
                    </motion.span>
                  </span>
                }
                expansion={
                  <div className="px-4 pb-4">
                    <Panel intent="neutral" className="p-3.5">
                      <p className="text-pretty text-[12.5px] font-medium leading-relaxed text-[#0B211B]/70">
                        Retained for {policy.period}. Deletion runs automatically and is logged in the audit trail.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <Chip intent="success">Automated</Chip>
                        <Chip intent="neutral">Audit logged</Chip>
                        {purged && <Chip intent="success" icon={ShieldCheck}>Purged</Chip>}
                      </div>
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleSimulatePurge(policy.type)}
                        disabled={purged}
                        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-[12px] font-extrabold uppercase tracking-[0.12em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 ${
                          purged
                            ? 'cursor-not-allowed bg-emerald-50 text-emerald-600/60'
                            : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] hover:shadow-[0_22px_40px_-18px_rgba(5,150,105,0.85)] hover:brightness-105'
                        }`}
                      >
                        <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                        <span>{purged ? 'Purge complete' : 'Simulate purge'}</span>
                      </motion.button>
                    </Panel>
                  </div>
                }
              />
            </div>
          )
        })}
      </Card>
    </motion.div>
  )
}
