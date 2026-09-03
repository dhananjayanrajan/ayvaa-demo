import { useState } from 'react'
import { motion } from 'motion/react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { rise, stagger } from '@/components/phone/kit'
import { approvals } from '@/data/admin/a03Data'
import type { Approval } from '@/data/types'
import { useDemo } from '@/lib/store'
import { ApprovalCard } from '@/components/admin/approvals/ApprovalCard'
import { EmptyFilterState } from '@/components/admin/approvals/EmptyFilterState'
import { ApprovalsHero } from '@/components/admin/heroes/ApprovalsHero'
import { ApprovalsFilter } from '@/components/admin/filters/ApprovalsFilter'
import { AccountabilityCard } from '@/components/admin/assurance/AccountabilityCard'

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
              <ApprovalsHero pendingCount={pendingCount} />
            </motion.div>

            <motion.div variants={rise}>
              <ApprovalsFilter value={filter} onChange={setFilter} />
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

            <motion.div variants={rise}>
              <AccountabilityCard />
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of approvals" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
    </Screen>
  )
}
