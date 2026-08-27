import { motion } from 'motion/react'
import { AlarmClock, CalendarCheck, CreditCard, Link2, Route, ShieldCheck } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { autoNotifications, incidentLinking } from '@/data/seed'
import { useDemo } from '@/lib/store'

const icons: Record<string, typeof AlarmClock> = {
  'Visit reminders': AlarmClock,
  'Arrival alerts': CalendarCheck,
  'Consent reminders': ShieldCheck,
  'Receipt pushes': CreditCard,
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function S03() {
  const { notify } = useDemo()
  return (
    <Screen>
      <AppBar
        title="Automated notifications"
        subtitle="Sent without anyone pressing send · today"
        trailing={
          <div className="flex items-center gap-2">
            <AgentAvatar seed="ayvaa-alerts" size={42} />
            <Pill tone="ok">Live</Pill>
          </div>
        }
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <SectionHeader label="Reminders and updates · sent automatically" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {autoNotifications.map((n, i) => {
                const Icon = icons[n.title] ?? AlarmClock
                return (
                  <div key={n.id}>
                    {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
                    <button
                      onClick={() => notify({ title: n.title, body: `${n.time} · ${n.body}`, kind: 'ok' })}
                      className="flex w-full items-center gap-3 px-2 py-1.5 text-left"
                    >
                      <IconTile icon={Icon} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-muted-foreground">{n.time}</span>
                          <span className="truncate text-sm font-bold text-foreground">{n.title}</span>
                        </div>
                        <div className="mt-0.5 line-clamp-2 text-xs font-medium leading-snug text-muted-foreground">{n.body}</div>
                      </div>
                      <Pill tone="ok">Sent</Pill>
                    </button>
                  </div>
                )
              })}
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <SectionHeader label="Incident auto-linking · this week" />
          </motion.div>
          <motion.div variants={item}>
            <button
              onClick={() => notify({ title: 'Incident linked', body: `${incidentLinking.count} · ${incidentLinking.body}`, kind: 'warn' })}
              className="w-full text-left"
            >
              <ScreenCard tone="error" className="flex items-start gap-3">
                <IconTile icon={Link2} tone="destructive" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-destructive">{incidentLinking.count}</div>
                  <div className="mt-0.5 text-[13px] font-medium leading-snug text-destructive/80">{incidentLinking.body}</div>
                  <div className="mt-2.5 rounded-[14px] bg-white/60 p-3 text-[13px] font-medium leading-snug text-foreground/80">
                    {incidentLinking.paged}
                  </div>
                  <div className="mt-2.5 text-[13px] font-medium leading-snug text-destructive/80">{incidentLinking.paused}</div>
                </div>
              </ScreenCard>
            </button>
          </motion.div>
          <motion.div variants={item}>
            <InfoCard
              icon={Route}
              body="One event travels everywhere at once: the family's phone, the caregiver's app, the partner's metrics, the admin console and the audit log — all from a single source of truth."
            />
          </motion.div>
          <motion.div variants={item}>
            <EndOfScroll label="End of notification feed" />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}