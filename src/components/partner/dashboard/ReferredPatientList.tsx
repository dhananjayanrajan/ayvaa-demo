import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { Card, Chip, Meter, TimeChip } from '@/components/phone/kit'
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
          {filtered.map((r, i) => {
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
                {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.985 }}
                  onClick={() => onSelectReferral(r.id)}
                  className="group flex w-full items-center gap-3 px-4 py-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-inset"
                >
                  <AgentAvatar seed={r.name} size={44} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">
                      {r.name} · {r.age}
                    </div>
                    <div className="mt-0.5 truncate text-[11px] font-semibold text-[#0B211B]/45">
                      {r.condition} · {r.caregiver ?? 'Awaiting match'}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Meter
                        value={active ? 0.33 : 0.12}
                        intent={active ? 'success' : 'warning'}
                        delay={0.1}
                        className="w-20"
                      />
                      <span className="text-[9px] font-extrabold uppercase tracking-wide text-[#0B211B]/40">{r.progress}</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <Chip intent={active ? 'success' : 'warning'} dot={!active} className="border-transparent">
                      {active ? 'Active' : 'Matching'}
                    </Chip>
                    <TimeChip>{r.visits}</TimeChip>
                  </div>
                  <ChevronRight
                    className="h-3.5 w-3.5 shrink-0 self-center text-[#0B211B]/20 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600"
                    aria-hidden
                  />
                </motion.button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </Card>
    </div>
  )
}
