import { motion } from 'motion/react'
import { AlarmClock, BellRing, CalendarCheck, CreditCard, Link2, Route, ShieldCheck } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { Pill, SectionLabel } from '@/components/phone/Controls'
import { BodyArea, Screen } from '@/components/phone/Screen'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { autoNotifications, incidentLinking } from '@/data/seed'

const row = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

const icons: Record<string, typeof BellRing> = {
  'Visit reminders': AlarmClock,
  'Arrival alerts': CalendarCheck,
  'Consent reminders': ShieldCheck,
  'Receipt pushes': CreditCard,
}

export function S03() {
  return (
    <Screen>
      <AppBar
        title="Automated notifications"
        subtitle="Sent without anyone pressing send · today"
        trailing={<Pill tone="ok">Live</Pill>}
      />
      <BodyArea>
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="flex flex-col gap-3"
        >
          <motion.div variants={row}>
            <SectionLabel>Reminders and updates · sent automatically</SectionLabel>
          </motion.div>
          <motion.div variants={row}>
            <Card className="rounded-[20px] border-border p-2 shadow-none">
              {autoNotifications.map((n, i) => {
                const Icon = icons[n.title] ?? BellRing
                return (
                  <div key={n.id}>
                    <div className="flex items-start gap-3 p-3">
                      <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-tonal text-foreground/70">
                        <Icon className="size-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-muted-foreground">{n.time}</span>
                          <span className="text-sm font-bold text-foreground">{n.title}</span>
                        </div>
                        <div className="mt-0.5 text-xs font-medium text-muted-foreground">{n.body}</div>
                      </div>
                      <Pill tone="ok">Sent</Pill>
                    </div>
                    {i < autoNotifications.length - 1 && <Separator className="mx-3" />}
                  </div>
                )
              })}
            </Card>
          </motion.div>
          <motion.div variants={row}>
            <SectionLabel>Incident auto-linking · this week</SectionLabel>
          </motion.div>
          <motion.div variants={row}>
            <Card className="rounded-[20px] border-0 bg-error-bg p-4 shadow-none">
              <div className="flex items-start gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-destructive text-white">
                  <Link2 className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-destructive">{incidentLinking.count}</div>
                  <div className="mt-0.5 text-xs font-medium text-destructive/80">{incidentLinking.body}</div>
                  <div className="mt-2.5 rounded-[14px] bg-white/60 p-3 text-xs font-medium text-destructive/80">
                    {incidentLinking.paged}
                  </div>
                  <div className="mt-2 text-xs font-medium text-destructive/80">{incidentLinking.paused}</div>
                </div>
              </div>
            </Card>
          </motion.div>
          <motion.div variants={row}>
            <Card className="rounded-[20px] border-0 bg-tonal p-4 shadow-none">
              <div className="flex items-start gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mint text-brand-ink">
                  <Route className="size-5" />
                </span>
                <p className="text-xs font-medium text-foreground/80">
                  One event travels everywhere at once: the family&apos;s phone, the caregiver&apos;s app, the
                  partner&apos;s metrics, the admin console and the audit log — all from a single source of truth.
                </p>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}