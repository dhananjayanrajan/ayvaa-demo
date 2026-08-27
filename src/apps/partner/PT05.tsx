import { useState } from 'react'
import { BadgeCheck, Check, UserCheck, UserPlus, Users } from 'lucide-react'
import { motion } from 'motion/react'
import { useDemo } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, Fade, Screen } from '@/components/phone/Screen'
import { Avatar, Pill, SectionLabel } from '@/components/phone/Controls'
import { partner, staff } from '@/data/seed'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export function PT05() {
  const { notify } = useDemo()
  const [approved, setApproved] = useState(false)
  const pending = staff.find((s) => s.status === 'pending')
  const active = staff.filter((s) => s.status === 'active')
  const paused = staff.filter((s) => s.status === 'paused')

  return (
    <Screen>
      <AppBar
        title="Your staff on Ayvaa"
        subtitle={`${partner.name} · six professionals`}
        trailing={
          <button
            onClick={() => notify({ title: 'Invite staff', body: 'Invitation link ready to share with a professional', kind: 'info' })}
            className="grid size-10.5 place-items-center rounded-full bg-tonal text-foreground/70"
            aria-label="Add staff"
          >
            <UserPlus className="size-5" />
          </button>
        }
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          {pending && !approved && (
            <>
              <motion.div variants={item}>
                <SectionLabel>Needs your approval · one</SectionLabel>
              </motion.div>
              <motion.div variants={item}>
                <Card className="flex flex-col gap-3 rounded-[20px] border-l-4 border-l-primary p-4">
                  <div className="flex items-center gap-3">
                    <Avatar tone="brand">
                      <Users className="size-5" />
                    </Avatar>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-foreground">{pending.name}</span>
                      <span className="block truncate text-xs font-medium text-muted-foreground">{pending.note}</span>
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Pill tone="ok">
                      <Check className="size-3.5" />
                      Ayvaa checks done
                    </Pill>
                    <Pill tone="warn">Your approval</Pill>
                  </div>
                  <div className="flex gap-2.5">
                    <Button
                      variant="secondary"
                      onClick={() => notify({ title: 'Declined', body: `${pending.name} · reason required before the record is sealed`, kind: 'warn' })}
                      className="h-13 flex-1 rounded-full text-[15px] font-bold"
                    >
                      Decline
                    </Button>
                    <Button
                      onClick={() => {
                        setApproved(true)
                        notify({ title: 'Approved', body: `${pending.name} · now linked to ${partner.name} for referrals and billing`, kind: 'ok' })
                      }}
                      className="h-13 flex-[1.3] rounded-full text-[15px] font-bold"
                    >
                      <UserCheck className="size-5" />
                      Approve
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </>
          )}
          <motion.div variants={item}>
            <SectionLabel>Active staff</SectionLabel>
          </motion.div>
          <motion.div variants={item}>
            <Card className="rounded-[20px] p-2">
              {active.map((s, i) => (
                <div key={s.id}>
                  {i > 0 && <div className="mx-3 h-px bg-border" />}
                  <div className="flex items-center gap-3 rounded-[14px] p-2">
                    <Avatar tone="alt">
                      <Users className="size-5" />
                    </Avatar>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-foreground">
                        {s.name} · {s.role.toLowerCase()}
                      </span>
                      <span className="block truncate text-xs font-medium text-muted-foreground">{s.week}</span>
                    </span>
                    <Pill tone="ok">Active</Pill>
                  </div>
                </div>
              ))}
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <SectionLabel>Paused</SectionLabel>
          </motion.div>
          <motion.div variants={item}>
            <Card className="flex items-center gap-3 rounded-[20px] p-3 opacity-70">
              <Avatar tone="alt">
                <Users className="size-5" />
              </Avatar>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-foreground">{paused[0].name}</span>
                <span className="block truncate text-xs font-medium text-muted-foreground">{paused[0].note}</span>
              </span>
              <Pill tone="grey">Paused</Pill>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <Card className="flex items-start gap-3 rounded-[20px] border-0 bg-tonal p-4">
              <BadgeCheck className="mt-0.5 size-5.5 shrink-0 text-primary" />
              <p className="text-[13px] font-medium leading-[19px] text-muted-foreground">
                Staff keep their own Ayvaa credentials. Your approval links them to {partner.name} for referrals and
                corporate billing. Every change is logged.
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </BodyArea>
      <Fade />
    </Screen>
  )
}