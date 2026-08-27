import { useState } from 'react'
import { motion } from 'motion/react'
import { BadgeCheck, UserCheck, X } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { ActionRow, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { staff } from '@/data/seed'
import { useDemo } from '@/lib/store'
import type { StaffMember } from '@/data/types'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

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

  return (
    <Screen>
      <AppBar title="Staff on Ayvaa" subtitle="Sunrise Multispeciality Hospital" />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          {pending && (
            <motion.div variants={item}>
              <ScreenCard className="border-l-4 border-l-primary">
                <div className="flex items-center gap-3">
                  <AgentAvatar seed={pending.name} size={46} />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-foreground">{pending.name}</div>
                    <div className="text-xs font-medium text-muted-foreground">{pending.role} · wants to join Ayvaa</div>
                  </div>
                  <Pill tone="warn">Needs approval</Pill>
                </div>
                <div className="mt-3 rounded-[14px] bg-tonal p-3 text-[13px] font-medium text-foreground/80">{pending.note}</div>
                <div className="mt-3 flex gap-2.5">
                  <SmoothButton variant="outline" shape="pill" className="flex-1" onClick={() => decide(pending.id, false)}>
                    <X className="size-4" /> Decline
                  </SmoothButton>
                  <SmoothButton variant="default" shape="pill" className="flex-1" onClick={() => decide(pending.id, true)}>
                    <UserCheck className="size-4" /> Approve
                  </SmoothButton>
                </div>
              </ScreenCard>
            </motion.div>
          )}
          <motion.div variants={item}>
            <SectionHeader label="Active staff" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {active.map((s) => (
                <div key={s.id} className="px-2 py-1.5">
                  <ActionRow
                    icon={BadgeCheck}
                    title={s.name}
                    subtitle={s.week ?? s.stats}
                    onClick={() => notify({ title: 'Staff opened', body: `${s.name} · profile and sessions attached`, kind: 'info' })}
                  />
                </div>
              ))}
            </ScreenCard>
          </motion.div>
          {paused.length > 0 && (
            <>
              <motion.div variants={item}>
                <SectionHeader label="Paused" />
              </motion.div>
              <motion.div variants={item}>
                <ScreenCard className="p-2 opacity-70">
                  {paused.map((s) => (
                    <div key={s.id} className="px-2 py-1.5">
                      <ActionRow
                        icon={BadgeCheck}
                        title={s.name}
                        subtitle={s.note}
                        onClick={() => notify({ title: 'Staff opened', body: `${s.name} · paused by your admin`, kind: 'info' })}
                      />
                    </div>
                  ))}
                </ScreenCard>
              </motion.div>
            </>
          )}
          <motion.div variants={item}>
            <InfoCard icon={BadgeCheck} body="Every staff member is verified by Ayvaa before their first session. You approve who joins under Sunrise." />
          </motion.div>
          <EndOfScroll label="End of staff" />
        </motion.div>
      </BodyArea>
    </Screen>
  )
}