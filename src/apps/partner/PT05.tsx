import { useState } from 'react'
import { motion } from 'motion/react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Chip, Section, rise, stagger } from '@/components/phone/kit'
import { StaffHero } from '@/components/partner/staff/StaffHero'
import { StaffApprovalCard } from '@/components/partner/staff/StaffApprovalCard'
import { StaffList } from '@/components/partner/staff/StaffList'
import { StaffVerificationNote } from '@/components/partner/staff/StaffVerificationNote'
import { staff } from '@/data/seed'
import type { StaffMember } from '@/data/types'
import { useDemo } from '@/lib/store'

export function PT05() {
  const { notify } = useDemo()
  const [list, setList] = useState<StaffMember[]>(staff)
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

  const handleStaffClick = (s: StaffMember) => {
    if (s.status === 'active') {
      notify({ title: 'Staff opened', body: `${s.name} · profile and sessions attached`, kind: 'info' })
    } else if (s.status === 'paused') {
      notify({ title: 'Staff opened', body: `${s.name} · paused by your admin`, kind: 'info' })
    }
  }

  return (
    <Screen>
      <AppBar title="Staff on Ayvaa" subtitle="Sunrise Multispeciality Hospital" />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <StaffHero
                activeMembers={active}
                pendingCount={pending ? 1 : 0}
                pausedCount={paused.length}
              />
            </motion.div>

            {pending && (
              <>
                <motion.div variants={rise}>
                  <Section label="Approval queue" trailing={<Chip intent="warning" dot>1 waiting</Chip>} />
                </motion.div>
                <motion.div variants={rise}>
                  <StaffApprovalCard member={pending} onApprove={(id) => decide(id, true)} onDecline={(id) => decide(id, false)} />
                </motion.div>
              </>
            )}

            <motion.div variants={rise}>
              <Section label="Active staff" trailing={<Chip intent="success">{active.length} verified</Chip>} />
            </motion.div>
            <motion.div variants={rise}>
              <StaffList members={active} variant="active" onStaffClick={handleStaffClick} />
            </motion.div>

            {paused.length > 0 && (
              <>
                <motion.div variants={rise}>
                  <Section label="Paused" trailing={<Chip intent="neutral">{paused.length}</Chip>} />
                </motion.div>
                <motion.div variants={rise}>
                  <StaffList members={paused} variant="paused" onStaffClick={handleStaffClick} />
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
    </Screen>
  )
}
