import { motion } from 'motion/react'
import { Link2, MessageSquare, UserCheck } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, Screen } from '@/components/phone/Screen'
import { ActionRow, IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { Textarea } from '@/components/ui/textarea'
import { escalatedTickets } from '@/data/seed'
import { useDemo } from '@/lib/store'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function A08() {
  const { notify } = useDemo()
  const [e1, e2, e3] = escalatedTickets
  return (
    <Screen>
      <AppBar
        title="Escalated tickets"
        subtitle="Needs a human decision"
        trailing={<AgentAvatar seed="ayvaa-tickets" size={42} />}
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard className="border-l-4 border-l-primary">
              <div className="flex items-start gap-3">
                <IconTile icon={MessageSquare} tone="brand" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">{e1.title}</span>
                    <Pill tone="warn">{e1.waiting}</Pill>
                  </div>
                  <div className="mt-0.5 text-[13px] font-medium leading-snug text-muted-foreground">{e1.meta}</div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {e1.chips.map((c) => (
                  <Pill key={c} tone="grey">{c}</Pill>
                ))}
              </div>
              <div className="mt-3 rounded-[14px] bg-tonal p-3">
                <div className="text-[13px] font-medium leading-snug text-foreground/80">{e1.quote}</div>
                <div className="mt-1.5 text-xs font-bold text-muted-foreground">{e1.quoteBy}</div>
              </div>
              <div className="mt-3">
                <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Your decision</div>
                <Textarea className="min-h-20 rounded-[14px] border-border bg-background text-[13px]" placeholder="Write a note for the care team…" />
              </div>
              <div className="mt-3 flex gap-2.5">
                <SmoothButton variant="secondary" shape="pill" className="flex-1" onClick={() => notify({ title: 'Re-match queued', body: 'A calmer nurse will be offered Friday slot · family not told yet', kind: 'ok' })}>
                  <UserCheck className="size-4" /> Re-match quietly
                </SmoothButton>
                <SmoothButton variant="default" shape="pill" className="flex-1" onClick={() => notify({ title: 'Reply sent', body: 'Priya Sharma notified · decision shared', kind: 'ok' })}>
                  <MessageSquare className="size-4" /> Reply to family
                </SmoothButton>
              </div>
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <SectionHeader label="Also escalated" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              <div className="px-2 py-1.5">
                <ActionRow
                  icon={Link2}
                  title={e2.title}
                  subtitle={e2.meta}
                  onClick={() => notify({ title: 'Ticket opened', body: `${e2.title} · linked receipts attached`, kind: 'info' })}
                />
              </div>
              <div className="px-2 py-1.5">
                <ActionRow
                  icon={Link2}
                  title={e3.title}
                  subtitle={e3.meta}
                  onClick={() => notify({ title: 'Ticket opened', body: `${e3.title} · usage report attached`, kind: 'info' })}
                />
              </div>
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <InfoCard icon={Link2} body="Every escalation links to its records — sessions, receipts, messages. Decisions are logged with your name." />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}