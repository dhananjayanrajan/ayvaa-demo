import { motion } from 'motion/react'
import {
  AlarmClock,
  BellRing,
  CalendarCheck,
  CreditCard,
  Link2,
  Route,
  ShieldCheck,
} from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, Screen } from '@/components/phone/Screen'
import { Pill, SectionLabel } from '@/components/phone/Controls'
import { autoNotifications, incidentLinking } from '@/data/seed'
import { cn } from '@/lib/utils'

const icons: Record<string, typeof AlarmClock> = {
  'Visit reminders': AlarmClock,
  'Arrival alerts': CalendarCheck,
  'Consent reminders': ShieldCheck,
  'Receipt pushes': CreditCard,
}

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export function S03() {
  return (
    <Screen>
      <AppBar
        title="Automated notifications"
        subtitle="Sent without anyone pressing send · today"
        trailing={
          <span className="grid size-10.5 place-items-center rounded-full bg-brand-ink text-white">
            <BellRing className="size-5" />
          </span>
        }
      />
      <BodyArea>
        <motion.div variants={list} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <SectionLabel>Reminders and updates · sent automatically</SectionLabel>
          </motion.div>
          <motion.div variants={item} className="overflow-hidden rounded-[20px] border border-border bg-card">
            {autoNotifications.map((n, i) => {
              const Icon = icons[n.title] ?? AlarmClock
              return (
                <div key={n.id} className={cn('flex gap-3 p-4', i > 0 && 'border-t border-border')}>
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
              )
            })}
          </motion.div>
          <motion.div variants={item}>
            <SectionLabel>Incident auto-linking · this week</SectionLabel>
          </motion.div>
          <motion.div variants={item} className="rounded-[20px] bg-error-bg p-4">
            <div className="flex items-center gap-2">
              <Link2 className="size-5 text-destructive" />
              <span className="text-sm font-bold text-destructive">{incidentLinking.count}</span>
            </div>
            <p className="mt-1.5 text-xs font-medium text-foreground/80">{incidentLinking.body}</p>
            <p className="mt-1.5 text-xs font-medium text-foreground/80">{incidentLinking.paged}</p>
            <p className="mt-1.5 text-xs font-bold text-destructive">{incidentLinking.paused}</p>
          </motion.div>
          <motion.div variants={item} className="flex gap-3 rounded-[20px] bg-tonal p-4">
            <Route className="size-5 shrink-0 text-brand-ink" />
            <p className="text-xs font-medium text-foreground/80">
              One event travels everywhere at once: the family&apos;s phone, the caregiver&apos;s app, the
              partner&apos;s metrics, the admin console and the audit log — all from a single source of truth.
            </p>
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}