import { motion } from 'motion/react'
import { Activity, Bell, CalendarCheck, CalendarPlus, CheckCircle2, CreditCard, MapPin, Send, ShieldCheck } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
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

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function S01() {
  const { notify } = useDemo()
  return (
    <Screen>
      <AppBar
        title="What the system did today"
        subtitle="Behind the scenes of one recurring plan · live view"
        trailing={
          <div className="flex items-center gap-2">
            <AgentAvatar seed="ayvaa-system" size={42} />
            <Pill tone="ok">Live</Pill>
          </div>
        }
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {systemTrail.map((e, i) => {
                const Icon = icons[e.title] ?? Activity
                const now = e.state === 'now'
                return (
                  <div key={e.id}>
                    {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
                    <button
                      onClick={() =>
                        notify({ title: e.title, body: `${e.time} · ${e.body}`, kind: now ? 'ok' : 'info' })
                      }
                      className="flex w-full items-center gap-3 px-2 py-1.5 text-left"
                    >
                      <IconTile icon={Icon} tone={now ? 'mint' : 'tonal'} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-muted-foreground">{e.time}</span>
                          {now && <Pill tone="ok" className={cn('animate-pulse')}>Now</Pill>}
                        </div>
                        <div className="mt-0.5 truncate text-sm font-bold text-foreground">{e.title}</div>
                        <div className="mt-0.5 line-clamp-2 text-xs font-medium leading-snug text-muted-foreground">{e.body}</div>
                      </div>
                    </button>
                  </div>
                )
              })}
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <InfoCard
              icon={ShieldCheck}
              body="If anything goes wrong, an incident is raised, linked to the care plan, and supervisors are notified within seconds."
            />
          </motion.div>
          <motion.div variants={item}>
            <EndOfScroll label="End of today's trail" />
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <SmoothButton
          variant="outline"
          shape="pill"
          size="lg"
          className="w-full"
          onClick={() => notify({ title: 'System history', body: 'Full event log opened · 1,204 events this month', kind: 'info' })}
        >
          View full system history
        </SmoothButton>
      </FootBar>
    </Screen>
  )
}