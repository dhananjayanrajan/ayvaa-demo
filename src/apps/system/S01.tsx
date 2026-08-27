import { motion } from 'motion/react'
import {
  Bell,
  CalendarCheck,
  CalendarPlus,
  CheckCircle2,
  CreditCard,
  MapPin,
  Send,
  Settings,
  ShieldCheck,
} from 'lucide-react'
import { toast } from 'sonner'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, Screen } from '@/components/phone/Screen'
import { Pill } from '@/components/phone/Controls'
import { Button } from '@/components/ui/button'
import { systemTrail } from '@/data/seed'
import { cn } from '@/lib/utils'

const icons: Record<string, typeof CalendarPlus> = {
  'Booking created': CalendarPlus,
  'Offers dispatched': Send,
  'Offer accepted': CheckCircle2,
  'Sessions generated': CalendarCheck,
  'Arrival verified': MapPin,
  'Family notified': Bell,
  'Payment captured': CreditCard,
}

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export function S01() {
  return (
    <Screen>
      <AppBar
        title="What the system did today"
        subtitle="Behind the scenes of one recurring plan · live view"
        trailing={
          <span className="grid size-10.5 place-items-center rounded-full bg-brand-ink text-white">
            <Settings className="size-5" />
          </span>
        }
      />
      <BodyArea>
        <motion.div variants={list} initial="hidden" animate="show" className="flex flex-col gap-3">
          <div className="overflow-hidden rounded-[20px] border border-border bg-card">
            {systemTrail.map((e, i) => {
              const Icon = icons[e.title] ?? CalendarPlus
              return (
                <motion.div
                  key={e.id}
                  variants={item}
                  className={cn('flex gap-3 p-4', i > 0 && 'border-t border-border')}
                >
                  <span
                    className={cn(
                      'grid size-11 shrink-0 place-items-center rounded-[14px]',
                      e.state === 'now' ? 'bg-mint text-brand-ink' : 'bg-tonal text-foreground/70',
                    )}
                  >
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-muted-foreground">{e.time}</span>
                      {e.state === 'now' && <Pill tone="ok">Now</Pill>}
                    </div>
                    <div className="mt-0.5 text-sm font-bold text-foreground">{e.title}</div>
                    <div className="mt-0.5 text-xs font-medium text-muted-foreground">{e.body}</div>
                  </div>
                </motion.div>
              )
            })}
          </div>
          <motion.div variants={item} className="flex gap-3 rounded-[20px] bg-tonal p-4">
            <ShieldCheck className="size-5 shrink-0 text-brand-ink" />
            <p className="text-xs font-medium text-foreground/80">
              If anything goes wrong, an incident is raised, linked to the care plan, and supervisors are notified
              within seconds.
            </p>
          </motion.div>
        </motion.div>
      </BodyArea>
      <div className="shrink-0 px-5 pb-7 pt-3">
        <Button
          variant="secondary"
          className="h-13 w-full rounded-full text-sm font-bold"
          onClick={() =>
            toast('Full system history', {
              description: 'Every event since the plan started · sealed and immutable',
            })
          }
        >
          View full system history
        </Button>
      </div>
    </Screen>
  )
}