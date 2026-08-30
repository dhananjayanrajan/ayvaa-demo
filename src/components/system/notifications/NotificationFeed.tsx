import { useState } from 'react'
import { motion } from 'motion/react'
import {
  AlarmClock,
  CalendarCheck,
  Check,
  ChevronDown,
  CreditCard,
  Send,
  ShieldCheck,
  Siren,
  TimerReset,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card, Chip, Expand, Tile, rise } from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'
import { autoNotifications } from '@/data/system/notifications'
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

const feedMeta: Record<string, { destinations: string[]; cadence: string }> = {
  'Visit reminders': {
    destinations: ['Family', 'Caregiver', 'Audit'],
    cadence: '30 min before each visit · retries twice',
  },
  'Arrival alerts': {
    destinations: ['Family', 'Caregiver'],
    cadence: 'Fires the moment a GPS check-in matches',
  },
  'Consent reminders': {
    destinations: ['Guardians'],
    cadence: '18 guardians · care pauses if missed',
  },
  'Receipt pushes': {
    destinations: ['Audit', 'Session record'],
    cadence: 'One per signed-off visit',
  },
}

const incidentMeta = {
  destinations: ['Family', 'Caregiver', 'Partner', 'Audit', 'Pager'],
  cadence: 'Escalates to supervisors in 60 seconds',
}

const liveAlert = {
  id: 'live-alert',
  time: '9:41 AM',
  title: 'Incident alert',
  body: 'Near fall · Mrs. Iyer · pushed to family, caregiver, partner, audit and pager',
  state: 'sent',
}

function MetaRow({ Icon, label, children }: { Icon: LucideIcon; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0B211B]/[0.05]">
        <Icon className="h-3.5 w-3.5 text-[#0B211B]/45" strokeWidth={2.2} aria-hidden />
      </span>
      <div className="min-w-0 flex-1 pt-0.5">
        <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#0B211B]/40">
          {label}
        </div>
        <div className="mt-1.5">{children}</div>
      </div>
    </div>
  )
}

function DestinationPill({ label }: { label: string }) {
  return (
    <motion.span
      variants={{ closed: { opacity: 0, y: 4 }, open: { opacity: 1, y: 0 } }}
      className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/[0.08] py-1 pl-1.5 pr-2.5"
    >
      <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500/20">
        <Check className="h-2 w-2 text-emerald-600" strokeWidth={4} aria-hidden />
      </span>
      <span className="text-[10px] font-bold text-[#0B211B]/70">{label}</span>
    </motion.span>
  )
}

interface NotificationFeedProps {
  notify: NotifyFn
  delivered?: boolean
}

export function NotificationFeed({ notify, delivered = false }: NotificationFeedProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const rows = delivered ? [liveAlert, ...autoNotifications] : autoNotifications
  const totalDestinations = rows.reduce(
    (acc, n) =>
      acc +
      (n.title === 'Incident alert' ? incidentMeta : feedMeta[n.title] ?? { destinations: [] })
        .destinations.length,
    0,
  )

  return (
    <motion.div variants={rise}>
      <Card>
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between rounded-2xl bg-[#0B231C] px-4 py-3">
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-100/40">
                Feeds active
              </div>
              <div className="mt-1 text-sm font-extrabold leading-none text-white">
                {rows.length} automations
              </div>
            </div>
            <div className="text-right">
              <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-100/40">
                Destinations
              </div>
              <div className="mt-1 flex items-center justify-end gap-1.5">
                {delivered ? (
                  <motion.span
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                  />
                ) : null}
                <span className="text-sm font-extrabold tabular-nums leading-none text-emerald-300">
                  {totalDestinations}
                </span>
                <span className="text-[11px] font-bold text-emerald-100/50">reached</span>
              </div>
            </div>
          </div>

          {rows.map((n) => {
            const incident = n.title === 'Incident alert'
            const Icon = incident ? Siren : (icons[n.title] ?? AlarmClock)
            const tone = incident ? 'danger' : (toneByTitle[n.title] ?? 'success')
            const meta = incident
              ? incidentMeta
              : (feedMeta[n.title] ?? { destinations: [], cadence: '' })
            const open = expandedId === n.id
            return (
              <div key={n.id}>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.985 }}
                  onClick={() => {
                    setExpandedId(open ? null : n.id)
                    if (!open) notify({ title: n.title, body: `${n.time} · ${n.body}`, kind: 'ok' })
                  }}
                  aria-expanded={open}
                  className="flex w-full items-start gap-3 rounded-2xl p-3 text-left transition-colors hover:bg-[#0B211B]/[0.02]"
                >
                  <Tile icon={Icon} tone={tone} />
                  <div className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-extrabold leading-tight tracking-tight text-[#0B211B]">
                      {n.title}
                    </span>
                    <p className="mt-1 break-words text-[12px] font-medium leading-snug text-[#0B211B]/55">
                      {n.body}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end">
                    <div className="flex items-center gap-1">
                      <Chip intent={incident ? 'danger' : 'success'} icon={Check}>
                        {incident ? 'Delivered' : 'Sent'}
                      </Chip>
                      <motion.span
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex"
                      >
                        <ChevronDown className="h-3.5 w-3.5 text-[#0B211B]/25" aria-hidden />
                      </motion.span>
                    </div>
                    <span className="mt-1.5 text-[10px] font-bold tabular-nums text-[#0B211B]/35">
                      {n.time}
                    </span>
                  </div>
                </motion.button>
                <Expand open={open}>
                  <motion.div
                    initial={false}
                    animate={{ opacity: open ? 1 : 0 }}
                    className="px-3 pb-3 pt-1"
                  >
                    <div className="rounded-2xl bg-[#0B211B]/[0.03] p-3">
                      <PushPreview title={n.title} body={n.body} time={n.time} onDark={false} />
                      <div className="mt-4 space-y-4 border-t border-[#0B211B]/[0.05] pt-4">
                        <MetaRow Icon={Send} label="Delivered to">
                          <motion.div
                            initial="closed"
                            animate={open ? 'open' : 'closed'}
                            variants={{ open: { transition: { staggerChildren: 0.05 } } }}
                            className="flex flex-wrap gap-1.5"
                          >
                            {meta.destinations.map((d) => (
                              <DestinationPill key={d} label={d} />
                            ))}
                          </motion.div>
                        </MetaRow>
                        <MetaRow Icon={TimerReset} label="Cadence">
                          <span className="block text-[11px] font-bold leading-snug text-[#0B211B]/70">
                            {meta.cadence}
                          </span>
                        </MetaRow>
                      </div>
                    </div>
                  </motion.div>
                </Expand>
              </div>
            )
          })}
        </div>
      </Card>
    </motion.div>
  )
}
