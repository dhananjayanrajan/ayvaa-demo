import { useState } from 'react'
import { motion } from 'motion/react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import {
  Chip,
  Hero,
  Kicker,
  rise,
  stagger,
} from '@/components/phone/kit'
import { approvals } from '@/data/seed'
import type { Approval } from '@/data/types'
import { useDemo } from '@/lib/store'
import { SegmentedTabs } from '@/components/phone/SegmentedTabs'
import { ApprovalCard } from '@/components/admin/approvals/ApprovalCard'
import { GovernanceCard } from '@/components/admin/approvals/GovernanceCard'
import { EmptyFilterState } from '@/components/admin/approvals/EmptyFilterState'

export function A03() {
  const { notify } = useDemo()
  const [filter, setFilter] = useState('awaiting')
  const [list] = useState<Approval[]>(approvals)
  const [decisions, setDecisions] = useState<Record<string, 'approved' | 'rejected'>>({})

  const decide = (id: string, approve: boolean) => {
    setDecisions((prev) => ({ ...prev, [id]: approve ? 'approved' : 'rejected' }))
    notify(
      approve
        ? { title: 'Professional approved', body: 'Decision recorded with your name and evidence', kind: 'ok' }
        : { title: 'Professional rejected', body: 'Written reason required · decision recorded', kind: 'warn' },
    )
  }

  const pendingCount = list.filter((a) => !decisions[a.id]).length

  const visible = list.filter((a) => {
    if (filter === 'awaiting') return !decisions[a.id]
    if (filter === 'approved') return decisions[a.id] === 'approved'
    if (filter === 'rejected') return decisions[a.id] === 'rejected'
    return false
  })

  return (
    <Screen>
      <AppBar
        title="Approve professionals"
        subtitle={`Awaiting decisions · ${pendingCount}`}
        trailing={<AgentAvatar seed="ayvaa-approvals" size={42} />}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <Kicker>Approvals · evidence-backed</Kicker>
                <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  Humans decide,{' '}
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">evidence backs it</span>
                </h2>
                <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                  Licence, identity and history are verified before you ever see the file.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  <Chip intent="neutral" light>{pendingCount} awaiting</Chip>
                  <Chip intent="success" light>Auto checks live</Chip>
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <SegmentedTabs
                tabs={[
                  { id: 'awaiting', label: 'Awaiting' },
                  { id: 'approved', label: 'Approved' },
                  { id: 'rejected', label: 'Rejected' },
                ]}
                value={filter}
                onChange={setFilter}
                layoutId="filter-bar"
              />
            </motion.div>

            {visible.map((a) => (
              <ApprovalCard
                key={a.id}
                a={a}
                onDecide={decide}
                decision={decisions[a.id]}
              />
            ))}

            {visible.length === 0 && <EmptyFilterState filter={filter} />}

            <GovernanceCard />

            <motion.div variants={rise}>
              <EndOfScroll label="End of approvals" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
    </Screen>
  )
}
