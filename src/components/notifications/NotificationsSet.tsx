import type { LucideIcon } from 'lucide-react'
import { AlarmClock, BellRing, CalendarCheck, Check, CheckCheck, ChevronDown, ChevronRight, Clock, CreditCard, Send, Settings2, ShieldCheck, Siren, TimerReset } from 'lucide-react'
import { PHASE_THEME, PhaseHero } from '@/components/phone/PhaseHero'
import { Row } from '@/components/phone/Row'
import { JourneyTime } from '@/components/patient/identity/JourneyTime'
import type { CaughtUpStats, NotificationEntry } from '@/data/patientNotifications'
import type { TileTone } from '@/components/phone/kit'
import { Card, Chip, Expand, Hero, rise } from '@/components/phone/kit'
import { IconLifecycleButton } from '@/components/phone/LifecycleButton'
import { useState } from 'react'
import { motion } from 'motion/react'
import { autoNotifications } from '@/data/system/notifications'
import { PushPreview } from '@/components/phone/PushPreview'

export function ActionCard({
  entries,
  oldestLabel,
  onPress,
}: {
  entries: NotificationEntry[]
  oldestLabel: string
  onPress: (entry: NotificationEntry) => void
}) {
  return (
    <PhaseHero
      theme={{
        ...PHASE_THEME.amber,
        border: 'border-amber-200/10',
        shell: 'bg-[#241A0B]',
        hairline: 'via-amber-300/40',
        shadow: 'shadow-[0_28px_64px_-30px_rgba(60,40,10,0.7)]',
      }}
    >
      <div className="relative">
        <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-amber-200/50">
          <Clock className="h-3 w-3" aria-hidden />
          Needs your action
        </div>
        <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
          {entries.length} things{' '}
          <span className="bg-gradient-to-r from-amber-300 to-orange-200 bg-clip-text text-transparent">
            wait on you
          </span>
        </h3>
        <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-amber-100/70">
          Care continues as scheduled either way. These need your decision.
        </p>

        <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-amber-400/[0.12] px-3.5 py-3">
          <span aria-hidden className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-300" />
          </span>
          <span className="min-w-0 flex-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-amber-100">
            Oldest waits since {oldestLabel}
          </span>
          <span className="shrink-0 text-[10px] font-extrabold tabular-nums text-amber-200/80">
            {entries.length} open
          </span>
        </div>

        <div className="mt-3 rounded-2xl bg-white/[0.06] p-3">
          <div className="flex flex-col gap-1">
            {entries.map((entry) => {
              const Icon: LucideIcon = entry.icon
              return (
                <Row
                  key={entry.key}
                  dark="white"
                  padding="px-2 py-2.5"
                  align="start"
                  leading={
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-amber-400/15 text-amber-300">
                      <Icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                    </span>
                  }
                  title={entry.title}
                  titleClassName="text-[13px]"
                  subtitle={entry.body}
                  subtitleClassName="mt-0.5 text-pretty text-[11px] font-medium leading-snug text-amber-100/60"
                  onClick={() => onPress(entry)}
                  whileTapDisabled={false}
                  showChevron={false}
                  trailing={
                    <>
                      <JourneyTime value={entry.time} tone="amber" />
                      <ChevronRight className="h-4 w-4 shrink-0 text-amber-200/40" aria-hidden />
                    </>
                  }
                />
              )
            })}
          </div>
        </div>
      </div>
    </PhaseHero>
  )
}

export function CaughtUpCard({ stats }: { stats: CaughtUpStats }) {
  const read = stats.total - stats.unreadCount - stats.actionCount
  return (
    <PhaseHero theme={PHASE_THEME.emerald}>
      <div className="relative">
        <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
          <Check className="h-3 w-3" aria-hidden />
          All caught up
        </div>
        <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
          Everything else is{' '}
          <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
            read
          </span>
        </h3>
        <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-emerald-100/70">
          Only the items waiting on you are shown. Switch back for the full feed.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
            <div className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-emerald-100/50">
              In the feed
            </div>
            <div className="mt-1 text-[15px] font-extrabold tabular-nums leading-none text-white">
              {stats.feedCount}
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
            <div className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-emerald-100/50">
              Read
            </div>
            <div className="mt-1 text-[15px] font-extrabold tabular-nums leading-none text-white">
              {read}
            </div>
          </div>
        </div>
        <div className="mt-2 rounded-2xl bg-white/[0.04] px-4 py-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/50">
              Missed notifications
            </span>
            <span className="text-[11px] font-extrabold tabular-nums text-emerald-300">0</span>
          </div>
        </div>
      </div>
    </PhaseHero>
  )
}

export function EntryRow({
  entry,
  unread,
  onPress,
}: {
  entry: NotificationEntry
  unread: boolean
  onPress: (entry: NotificationEntry) => void
}) {
  return (
    <Row
      icon={entry.icon}
      tone={entry.tone}
      liveDot={unread}
      title={entry.title}
      titleClassName="text-[13px]"
      subtitle={entry.body}
      subtitleClassName="text-[11px] text-[#0B211B]/50"
      time={entry.time}
      surface="inset"
      padding="comfortable"
      hoverClassName="hover:bg-[#0B211B]/[0.05]"
      showChevron={false}
      trailing={<ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />}
      onClick={() => onPress(entry)}
    />
  )
}

export function FeedHero({
  total,
  actionCount,
  unreadCount,
}: {
  total: number
  actionCount: number
  unreadCount: number
}) {
  return (
    <Hero>
      <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
        <BellRing className="h-3 w-3" aria-hidden />
        Notification feed, today
      </div>
      <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        {total} updates,{' '}
        <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
          {actionCount} need you
        </span>
      </h2>
      <p className="mt-1 text-pretty text-[12px] font-medium leading-relaxed text-emerald-100/70">
        Confirmations, doses and receipts land here the moment they happen.
      </p>

      <div className="mt-5 rounded-2xl bg-white/[0.06] px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/50">
            Inbox state
          </span>
          <span className="text-[10px] font-extrabold tabular-nums text-emerald-200">
            {unreadCount} unread, 0 missed
          </span>
        </div>
      </div>
    </Hero>
  )
}

export function MarkAllReadButton({
  unreadCount,
  onPress,
}: {
  unreadCount: number
  onPress: () => void
}) {
  const done = unreadCount === 0
  return (
    <IconLifecycleButton
      phase={done ? 'done' : 'idle'}
      icon={CheckCheck}
      rounded="xl"
      revert={false}
      ariaLabel={done ? 'All caught up' : 'Mark all read'}
      onPress={done ? undefined : onPress}
    />
  )
}

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
                <Row
                  align="start"
                  padding="p-3"
                  icon={Icon}
                  tone={tone}
                  title={n.title}
                  titleClassName="text-[13px] font-extrabold leading-tight"
                  subtitle={n.body}
                  subtitleClassName="mt-1 text-[12px] font-medium leading-snug text-[#0B211B]/55"
                  onClick={() => {
                    setExpandedId(open ? null : n.id)
                    if (!open) notify({ title: n.title, body: `${n.time} · ${n.body}`, kind: 'ok' })
                  }}
                  aria-expanded={open}
                  showChevron={false}
                  hoverClassName="hover:bg-[#0B211B]/[0.02]"
                  trailing={
                    <span className="flex shrink-0 flex-col items-end">
                      <span className="flex items-center gap-1">
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
                      </span>
                      <span className="mt-1.5 text-[10px] font-bold tabular-nums text-[#0B211B]/35">
                        {n.time}
                      </span>
                    </span>
                  }
                />
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

export function SettingsCard({ onPress }: { onPress: () => void }) {
  return (
    <motion.button type="button" whileTap={{ scale: 0.99 }} onClick={onPress} className="block w-full text-left">
      <Card>
        <Row
          icon={Settings2}
          tone="info"
          tileSize="lg"
          title="Notification settings"
          titleClassName="truncate text-[14px] font-extrabold"
          subtitle="Choose what pings you and what stays quiet"
          subtitleClassName="truncate text-[11px]"
          className="gap-3.5 p-4"
          hoverClassName="hover:bg-transparent"
          whileTapDisabled
        />
      </Card>
    </motion.button>
  )
}
