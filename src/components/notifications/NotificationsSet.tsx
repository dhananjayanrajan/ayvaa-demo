import type { LucideIcon } from 'lucide-react'
import { BellRing, Check, CheckCheck, ChevronRight, Clock, Settings2 } from 'lucide-react'
import { motion } from 'motion/react'
import { IconLifecycleButton } from '@/components/phone/LifecycleButton'
import { PHASE_THEME, PhaseHero } from '@/components/phone/PhaseHero'
import { Row } from '@/components/phone/Row'
import { Card, Hero } from '@/components/phone/kit'
import type { CaughtUpStats, NotificationEntry } from '@/data/patientNotifications'
import { JourneyTime } from '@/components/patient/identity/JourneyTime'

// ── ActionCard.tsx ──
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

// ── CaughtUpCard.tsx ──
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

// ── EntryRow.tsx ──
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

// ── FeedHero.tsx ──
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

// ── MarkAllReadButton.tsx ──
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

// ── SettingsCard.tsx ──
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
