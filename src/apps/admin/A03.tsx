import { useState } from 'react'
import { motion } from 'motion/react'
import { Check, Gavel, UserCheck, X } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import SmoothButton from '@/components/smoothui/smooth-button'
import AnimatedTabs from '@/components/smoothui/animated-tabs'
import AILoader from '@/components/smoothui/ai-loader'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { approvals } from '@/data/seed'
import { useDemo } from '@/lib/store'
import type { Approval } from '@/data/types'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function A03() {
  const { notify } = useDemo()
  const [filter, setFilter] = useState('awaiting')
  const [list, setList] = useState<Approval[]>(approvals)

  const decide = (id: string, approve: boolean) => {
    setList((prev) => prev.filter((a) => a.id !== id))
    notify(
      approve
        ? { title: 'Professional approved', body: 'Decision recorded with your name and evidence', kind: 'ok' }
        : { title: 'Professional rejected', body: 'Written reason required · decision recorded', kind: 'warn' },
    )
  }

  return (
    <Screen>
      <AppBar
        title="Approve professionals"
        subtitle={`Awaiting decisions · ${list.length}`}
        trailing={<AgentAvatar seed="ayvaa-approvals" size={42} />}
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <AnimatedTabs
              tabs={[
                { id: 'awaiting', label: 'Awaiting' },
                { id: 'approved', label: 'Approved' },
                { id: 'rejected', label: 'Rejected' },
              ]}
              variant="pill"
              defaultTab="awaiting"
              onChange={setFilter}
            />
          </motion.div>
          {filter === 'awaiting' &&
            list.map((a) => (
              <motion.div key={a.id} variants={item}>
                <ScreenCard className={a.urgent ? 'border-l-4 border-l-primary' : undefined}>
                  <div className="flex items-center gap-3">
                    <AgentAvatar seed={a.name} size={46} />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-foreground">{a.name}</div>
                      <div className="text-xs font-medium text-muted-foreground">
                        {a.role} · licence {a.licence} · applied {a.applied}
                      </div>
                    </div>
                    {a.urgent && <Pill tone="warn">{a.waiting}</Pill>}
                  </div>
                  <div className="mt-3 flex flex-col gap-2">
                    {a.checks.map((c) => (
                      <div key={c.label} className="flex items-center gap-3">
                        <IconTile
                          icon={c.state === 'ok' ? Check : c.state === 'running' ? Check : X}
                          tone={c.state === 'ok' ? 'mint' : c.state === 'running' ? 'warn' : 'tonal'}
                        >
                          {c.state === 'running' && <AILoader variant="dots" className="size-3.5" />}
                        </IconTile>
                        <span className="flex-1 text-[13px] font-medium text-foreground/80">{c.label}</span>
                        <span className="text-xs font-bold text-muted-foreground">
                          {c.state === 'ok' ? 'Verified' : c.state === 'running' ? 'Running' : 'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>
                  {a.history && (
                    <div className="mt-3 rounded-[14px] bg-warn-bg p-3 text-[13px] font-medium text-warn-ink">{a.history}</div>
                  )}
                  {a.note && <div className="mt-3 rounded-[14px] bg-tonal p-3 text-[13px] font-medium text-foreground/80">{a.note}</div>}
                  <div className="mt-3 flex gap-2.5">
                    <SmoothButton variant="outline" shape="pill" className="flex-1" onClick={() => decide(a.id, false)}>
                      <X className="size-4" /> Reject
                    </SmoothButton>
                    <SmoothButton variant="default" shape="pill" className="flex-1" onClick={() => decide(a.id, true)}>
                      <UserCheck className="size-4" /> Approve
                    </SmoothButton>
                  </div>
                </ScreenCard>
              </motion.div>
            ))}
          {filter !== 'awaiting' && (
            <motion.div variants={item}>
              <InfoCard
                icon={Gavel}
                body={`No ${filter} professionals in this view. Every decision stays in the audit log.`}
              />
            </motion.div>
          )}
          <motion.div variants={item}>
            <InfoCard
              icon={Gavel}
              body="Every approval or rejection records who decided, when, and on what evidence. Rejections require a written reason."
            />
          </motion.div>
          <motion.div variants={item}>
            <EndOfScroll label="End of approvals" />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}