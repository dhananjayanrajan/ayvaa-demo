import { motion } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { Card, Chip, Meter, TimeChip } from '@/components/phone/kit'

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
  return (
    <Card>
      {referrals.map((r, i) => {
        const active = r.status === 'active'
        return (
          <div key={r.id}>
            {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
            <motion.button
              type="button"
              whileTap={{ scale: 0.985 }}
              onClick={() => onSelectReferral(r.id)}
              className="group flex w-full items-center gap-3 px-4 py-3.5 text-left"
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
                    delay={0.2 + i * 0.1}
                    className="w-20"
                  />
                  <span className="text-[9px] font-extrabold uppercase tracking-wide text-[#0B211B]/40">{r.progress}</span>
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1.5">
                <Chip intent={active ? 'success' : 'warning'} dot={!active}>
                  {active ? 'Active' : 'Matching'}
                </Chip>
                <TimeChip>{r.visits}</TimeChip>
              </div>
              <ChevronRight
                className="h-3.5 w-3.5 shrink-0 self-center text-[#0B211B]/20 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600"
                aria-hidden
              />
            </motion.button>
          </div>
        )
      })}
    </Card>
  )
}
