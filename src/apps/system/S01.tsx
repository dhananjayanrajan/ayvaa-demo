import { motion } from 'motion/react'
import {
  Activity,
  Bell,
  CalendarCheck,
  CalendarPlus,
  CheckCircle2,
  CreditCard,
  MapPin,
  Send,
  ShieldCheck,
} from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { Pill } from '@/components/phone/Controls'
import { BodyArea, Screen } from '@/components/phone/Screen'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { systemTrail } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

const icons: Record<string, typeof Activity> = {
  'Booking created': CalendarPlus,
  'Offers dispatched': Send,
  'Offer accepted': CheckCircle2,
  'Sessions generated': CalendarCheck,
  'Arrival verified': MapPin,
  'Family notified': Bell,
  'Payment captured': CreditCard,
}

const row = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export function S01() {
  const { notify } = useDemo()
  return (
    <Screen>
      <AppBar
        title="What the system did today"
        subtitle="Behind the scenes of one recurring plan · live view"
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
            <Card className="rounded-[20px] border-border p-2 shadow-none">
              <motion.div
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
              >
                {systemTrail.map((e, i) => {
                  const Icon = icons[e.title] ?? Activity
                  const now = e.state === 'now'
                  return (
                    <motion.div key={e.id} variants={row}>
                      <div className="flex items-start gap-3 p-3">
                        <span
                          className={cn(
                            'grid size-11 shrink-0 place-items-center rounded-[14px]',
                            now ? 'bg-mint text-brand-ink' : 'bg-tonal text-foreground/70',
                          )}
                        >
                          <Icon className="size-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-muted-foreground">{e.time}</span>
                            {now && <Pill tone="ok">Now</Pill>}
                          </div>
                          <div className="mt-0.5 text-sm font-bold text-foreground">{e.title}</div>
                          <div className="mt-0.5 text-xs font-medium text-muted-foreground">{e.body}</div>
                        </div>
                      </div>
                      {i < systemTrail.length - 1 && <Separator className="mx-3" />}
                    </motion.div>
                  )
                })}
              </motion.div>
            </Card>
          </motion.div>
          <motion.div variants={row}>
            <Card className="rounded-[20px] border-0 bg-tonal p-4 shadow-none">
              <div className="flex items-start gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mint text-brand-ink">
                  <ShieldCheck className="size-5" />
                </span>
                <p className="text-xs font-medium text-foreground/80">
                  If anything goes wrong, an incident is raised, linked to the care plan, and supervisors are notified
                  within seconds.
                </p>
              </div>
            </Card>
          </motion.div>
          <motion.div variants={row}>
            <Button
              variant="outline"
              className="h-13 w-full rounded-full"
              onClick={() =>
                notify({ title: 'System history', body: 'Full event log opened · 1,204 events this month', kind: 'info' })
              }
            >
              View full system history
            </Button>
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}