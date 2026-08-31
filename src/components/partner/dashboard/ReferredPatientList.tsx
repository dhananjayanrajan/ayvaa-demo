import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { Card, Chip, Meter, TimeChip } from '@/components/phone/kit'
import { Row } from '@/components/phone/Row'
import { cn } from '@/lib/utils'

interface Referral {
  id: string
  name: string
  age: number
  condition: string
  caregiver?: string
  status: 'active' | 'matching'
  progress: string
  visits: string
}

interface ReferredPatientListProps {
  referrals: Referral[]
  onSelectReferral: (id: string) => void
}

export function ReferredPatientList({ referrals, onSelectReferral }: ReferredPatientListProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'matching'>('all')

  const filtered = referrals.filter((r) => {
    if (filter === 'all') return true
    return r.status === filter
  })

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'matching', label: 'Matching' },
  ] as const

  return (
    <div>
      <div className="mb-3 flex rounded-xl bg-[#0B211B]/[0.05] p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key)}
            className={cn(
              'relative flex-1 rounded-lg py-1.5 text-[11px] font-extrabold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40',
              filter === tab.key ? 'text-white' : 'text-[#0B211B]/50 hover:text-[#0B211B]',
            )}
          >
            {filter === tab.key && (
              <motion.span
                layoutId="referralFilter"
                className="absolute inset-0 rounded-lg bg-emerald-500 shadow-sm"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      <Card>
        <AnimatePresence mode="popLayout">
          {filtered.map((r) => {
            const active = r.status === 'active'
            return (
              <motion.div
                key={r.id}
                layout
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
              >
                <Row
                  leading={<AgentAvatar seed={r.name} size={44} />}
                  title={`${r.name} · ${r.age}`}
                  titleClassName="leading-snug"
                  subtitle={`${r.condition} · ${r.caregiver ?? 'Awaiting match'}`}
                  subtitleClassName="text-[11px] font-semibold"
                  body={
                    <div className="mt-2 flex items-center gap-2">
                      <Meter
                        value={active ? 0.33 : 0.12}
                        intent={active ? 'success' : 'warning'}
                        delay={0.1}
                        className="w-20"
                      />
                      <span className="text-[9px] font-extrabold uppercase tracking-wide text-[#0B211B]/40">{r.progress}</span>
                    </div>
                  }
                  trailing={
                    <span className="flex shrink-0 flex-col items-end gap-1.5">
                      <Chip intent={active ? 'success' : 'warning'} dot={!active} className="border-transparent">
                        {active ? 'Active' : 'Matching'}
                      </Chip>
                      <TimeChip>{r.visits}</TimeChip>
                    </span>
                  }
                  onClick={() => onSelectReferral(r.id)}
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </Card>
    </div>
  )
}
