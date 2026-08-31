import { useState } from 'react'
import { motion } from 'motion/react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Section, rise, stagger } from '@/components/phone/kit'
import { StaffHero, type StaffFilter } from '@/components/partner/staff/StaffHero'
import { StaffApprovalCard } from '@/components/partner/staff/StaffApprovalCard'
import { StaffList } from '@/components/partner/staff/StaffList'
import { StaffVerificationNote } from '@/components/partner/staff/StaffVerificationNote'
import { StaffDetailSheet } from '@/components/partner/staff/StaffDetailSheet'
import { staff } from '@/data/seed'
import type { StaffMember } from '@/data/types'
import { useDemo } from '@/lib/store'

const tintMap: Record<StaffFilter, string> = {
  all: 'bg-emerald-400/[0.16]',
  active: 'bg-emerald-400/[0.16]',
  pending: 'bg-amber-400/[0.16]',
  paused: 'bg-rose-400/[0.16]',
}

export function PT05() {
  const { notify } = useDemo()
  const [list, setList] = useState<StaffMember[]>(staff)
  const [filter, setFilter] = useState<StaffFilter>('pending')
  const [selectedMember, setSelectedMember] = useState<StaffMember | null>(null)

  const pending = list.find((s) => s.status === 'pending')
  const active = list.filter((s) => s.status === 'active')
  const paused = list.filter((s) => s.status === 'paused')

  const decide = (id: string, approve: boolean) => {
    setList((prev) => prev.map((s) => (s.id === id ? { ...s, status: approve ? 'active' : 'paused' } : s)))
    notify(
      approve
        ? { title: 'Staff approved', body: 'Kavitha Nair can now take Ayvaa sessions', kind: 'ok' }
        : { title: 'Request declined', body: 'Kavitha Nair was notified', kind: 'warn' },
    )
  }

  const handleStatusChange = (id: string, newStatus: 'active' | 'paused') => {
    setList((prev) => prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s)))
    const member = list.find((s) => s.id === id)
    if (member) {
      notify(
        newStatus === 'active'
          ? { title: 'Staff resumed', body: `${member.name} is back on Ayvaa`, kind: 'ok' }
          : { title: 'Staff paused', body: `${member.name} can no longer take sessions`, kind: 'warn' },
      )
    }
    setSelectedMember(null)
  }

  const showSection = (key: StaffFilter) => filter === 'all' || filter === key

  return (
    <Screen>
      <AppBar title="Staff on Ayvaa" subtitle="Sunrise Multispeciality Hospital" />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className={`pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full blur-3xl ${tintMap[filter]}`} />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <StaffHero
                activeMembers={active}
                pendingCount={pending ? 1 : 0}
                pausedCount={paused.length}
                activeFilter={filter}
                onFilterChange={setFilter}
              />
            </motion.div>

            {pending && showSection('pending') && (
              <>
                <motion.div variants={rise}>
                  <Section label="Approval queue" />
                </motion.div>
                <motion.div variants={rise}>
                  <StaffApprovalCard member={pending} onApprove={(id) => decide(id, true)} onDecline={(id) => decide(id, false)} />
                </motion.div>
              </>
            )}

            {showSection('active') && (
              <>
                <motion.div variants={rise}>
                  <Section label="Active staff" />
                </motion.div>
                <motion.div variants={rise}>
                  <StaffList members={active} variant="active" onOpenStaff={setSelectedMember} />
                </motion.div>
              </>
            )}

            {paused.length > 0 && showSection('paused') && (
              <>
                <motion.div variants={rise}>
                  <Section label="Paused" />
                </motion.div>
                <motion.div variants={rise}>
                  <StaffList members={paused} variant="paused" onOpenStaff={setSelectedMember} />
                </motion.div>
              </>
            )}

            <motion.div variants={rise}>
              <StaffVerificationNote />
            </motion.div>
            <motion.div variants={rise}>
              <EndOfScroll label="End of staff" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <StaffDetailSheet member={selectedMember} onClose={() => setSelectedMember(null)} onStatusChange={handleStatusChange} />
    </Screen>
  )
}
