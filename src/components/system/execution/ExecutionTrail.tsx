import { motion } from 'motion/react'
import {
  Activity,
  ArrowUpRight,
  Bell,
  CalendarCheck,
  CalendarPlus,
  CheckCircle2,
  CreditCard,
  MapPin,
  Send,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  Card,
  Chip,
  Tile,
  TimeChip,
  rise,
} from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'

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
  const total = trail.length
  return (
    <motion.div variants={rise}>
      <Card>
        {trail.map((e, i) => {
          const Icon = icons[e.title] ?? Activity
          const now = e.state === 'now'
          const last = i === total - 1
          return (
            <div key={e.id} className="flex items-stretch gap-3 px-3.5">
              <div className="flex flex-col items-center py-3">
                <Tile icon={Icon} tone={now ? 'live' : (toneByTitle[e.title] ?? 'neutral')} />
                {!last && (
                  <span aria-hidden className="mt-1 w-px flex-1 bg-gradient-to-b from-[#0B211B]/15 via-[#0B211B]/[0.07] to-transparent" />
                )}
              </div>
              <motion.button
                whileTap={{ scale: 0.985 }}
                onClick={() => notify({ title: e.title, body: `${e.time} · ${e.body}`, kind: now ? 'ok' : 'info' })}
                className="group flex min-w-0 flex-1 gap-3 py-3 pr-0.5 text-left"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">{e.title}</div>
                  <div className="mt-0.5 line-clamp-2 text-xs font-medium leading-relaxed text-[#0B211B]/55">{e.body}</div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <TimeChip>{e.time}</TimeChip>
                  {now ? (
                    <Chip intent="live" dot>Now</Chip>
                  ) : (
                    <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 text-emerald-500/60 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                  )}
                </div>
              </motion.button>
            </div>
          )
        })}
      </Card>
    </motion.div>
  )
}
