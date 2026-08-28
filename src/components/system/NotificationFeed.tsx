import { useState } from 'react'
import { motion } from 'motion/react'
import {
  AlarmClock,
  CalendarCheck,
  Check,
  ChevronDown,
  CreditCard,
  ShieldCheck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  Card,
  Chip,
  Expand,
  Tile,
  TimeChip,
  rise,
} from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'
import { autoNotifications } from '@/data/seed'
import { PushPreview } from '@/components/phone/PushPreview'

type NotifyFn = (payload: {
  title: string
  body: string
  kind: 'ok' | 'warn' | 'info'
}) => void

const icons: Record<string, LucideIcon> = {
  'Visit reminders': AlarmClock,
  'Arrival alerts': CalendarCheck,
  'Consent reminders': ShieldCheck,
  'Receipt pushes': CreditCard,
}

const toneByTitle: Record<string, TileTone> = {
  'Visit reminders': 'success',
  'Arrival alerts': 'info',
  'Consent reminders': 'warning',
  'Receipt pushes': 'ink',
}

interface NotificationFeedProps {
  notify: NotifyFn
}

export function NotificationFeed({ notify }: NotificationFeedProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <motion.div variants={rise}>
      <Card>
        {autoNotifications.map((n, i) => {
          const Icon = icons[n.title] ?? AlarmClock
          const open = expandedId === n.id
          return (
            <div key={n.id}>
              {i > 0 && <div aria-hidden className="mx-3.5 h-px bg-[#0B211B]/[0.05]" />}
              <motion.button
                whileTap={{ scale: 0.985 }}
                onClick={() => {
                  setExpandedId(open ? null : n.id)
                  if (!open) notify({ title: n.title, body: `${n.time} · ${n.body}`, kind: 'ok' })
                }}
                className="group flex w-full items-start gap-3 px-3.5 py-3 text-left"
              >
                <Tile icon={Icon} tone={toneByTitle[n.title] ?? 'success'} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <TimeChip>{n.time}</TimeChip>
                    <span className="truncate text-[13px] font-bold tracking-tight text-[#0B211B]">{n.title}</span>
                  </div>
                  <div className="mt-1 line-clamp-2 text-xs font-medium leading-relaxed text-[#0B211B]/55">{n.body}</div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <Chip intent="success" icon={Check}>Sent</Chip>
                  <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown className="h-3.5 w-3.5 text-[#0B211B]/25" aria-hidden />
                  </motion.span>
                </div>
              </motion.button>
              <Expand open={open}>
                <div className="px-3.5 pb-3.5">
                  <PushPreview title={n.title} body={n.body} time={n.time} onDark={false} />
                  <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-emerald-600/70">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                    Automatic push · delivered to family + caregiver
                  </div>
                </div>
              </Expand>
            </div>
          )
        })}
      </Card>
    </motion.div>
  )
}
