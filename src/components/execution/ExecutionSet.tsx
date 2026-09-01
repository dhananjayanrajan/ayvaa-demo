import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { Activity, ArrowUpRight, Bell, CalendarCheck, CalendarPlus, CheckCircle2, CreditCard, MapPin, Send } from 'lucide-react'
import type { TileTone } from '@/components/phone/kit'
import { Card, Chip, TimeChip, rise } from '@/components/phone/kit'
import { StepList } from '@/components/phone/StepList'

type TrailEvent = {
  id: string
  title: string
  body: string
  time: string
  state: string
}

type NotifyFn = (payload: {
  title: string
  body: string
  kind: 'ok' | 'info'
}) => void

const icons: Record<string, LucideIcon> = {
  'Booking created': CalendarPlus,
  'Offers dispatched': Send,
  'Offer accepted': CheckCircle2,
  'Sessions generated': CalendarCheck,
  'Arrival verified': MapPin,
  'Family notified': Bell,
  'Payment captured': CreditCard,
}

const toneByTitle: Record<string, TileTone> = {
  'Booking created': 'neutral',
  'Offers dispatched': 'info',
  'Offer accepted': 'success',
  'Sessions generated': 'success',
  'Arrival verified': 'success',
  'Family notified': 'info',
  'Payment captured': 'success',
}

interface ExecutionTrailProps {
  trail: TrailEvent[]
  notify: NotifyFn
}

export function ExecutionTrail({ trail, notify }: ExecutionTrailProps) {
  return (
    <motion.div variants={rise}>
      <Card>
        <StepList
          nodeStyle="tile"
          theme="light"
          railClassName="bg-gradient-to-b from-[#0B211B]/15 via-[#0B211B]/[0.07] to-transparent"
          steps={trail.map((e) => {
            const Icon = icons[e.title] ?? Activity
            const now = e.state === 'now'
            return {
              key: e.id,
              icon: Icon,
              tone: now ? 'live' : (toneByTitle[e.title] ?? 'neutral'),
              title: e.title,
              body: e.body,
              bodyClassName: 'line-clamp-2 text-xs',
              trailing: (
                <span className="flex shrink-0 flex-col items-end gap-1.5">
                  <TimeChip>{e.time}</TimeChip>
                  {now ? (
                    <Chip intent="live" dot>Now</Chip>
                  ) : (
                    <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 text-emerald-500/60 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                  )}
                </span>
              ),
              contentClassName: '',
              itemClassName: 'px-4 py-3',
              className: 'group',
              onClick: () => notify({ title: e.title, body: `${e.time} · ${e.body}`, kind: now ? 'ok' : 'info' }),
            }
          })}
        />
      </Card>
    </motion.div>
  )
}
