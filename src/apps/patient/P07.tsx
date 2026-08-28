import { useState } from 'react'
import { motion } from 'motion/react'
import {
  BellRing,
  CalendarCheck,
  Check,
  CheckCheck,
  ClipboardCheck,
  Clock,
  Pill as PillIcon,
  ReceiptText,
  Settings2,
  ShieldCheck,
  Star,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Card, Chip, Hero, Kicker, Section, Tile, rise, stagger } from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'
import { consent, lovedOnes, medications, payouts, visits } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

type Entry = {
  icon: LucideIcon
  tone: TileTone
  title: string
  body: string
  time: string
  to: string
  fresh?: boolean
}

function EntryRow({ e }: { e: Entry }) {
  const { navigate } = useRouter()
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.99 }}
      onClick={() => navigate(e.to)}
      className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
    >
      <span className="relative shrink-0">
        <Tile icon={e.icon} tone={e.tone} />
        {e.fresh && <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" aria-hidden />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="min-w-0 truncate text-[13px] font-bold tracking-tight text-[#0B211B]">{e.title}</span>
          <span className="ml-auto shrink-0 font-mono text-[9.5px] font-bold uppercase tracking-wide text-[#0B211B]/35">{e.time}</span>
        </span>
        <span className="mt-0.5 block truncate text-[11px] font-medium text-[#0B211B]/50">{e.body}</span>
      </span>
    </motion.button>
  )
}

export function P07() {
  const { notify, markAllRead } = useDemo()
  const { navigate } = useRouter()
  const [filter, setFilter] = useState<'all' | 'action'>('all')

  const father = lovedOnes[0]
  const confirmed = visits.find((v) => v.status === 'confirmed')
  const receipt = payouts.find((p) => p.status === 'paid') ?? payouts[0]

  const today: Entry[] = [
    {
      icon: CalendarCheck,
      tone: 'success',
      title: `${confirmed?.caregiver?.split(' ')[0] ?? 'Your nurse'} confirmed today's visit`,
      body: 'Accepted at 7:44 AM · arrives 2:00 PM',
      time: '7:44 AM',
      to: '/patient/p15',
      fresh: true,
    },
    {
      icon: PillIcon,
      tone: 'info',
      title: 'Morning doses logged',
      body: `${medications[0].name} and ${medications[1].name} · given 8:10 AM`,
      time: '8:10 AM',
      to: '/patient/p19',
    },
    {
      icon: ReceiptText,
      tone: 'neutral',
      title: `Receipt for ${receipt.date}`,
      body: `${receipt.amount} · saved to your records`,
      time: '9:02 AM',
      to: '/patient/p23',
    },
  ]

  const yesterday: Entry[] = [
    {
      icon: ClipboardCheck,
      tone: 'success',
      title: 'Visit summary ready',
      body: 'All five care steps completed and signed',
      time: '6:12 PM',
      to: '/patient/p17',
    },
  ]

  const actionItems: Entry[] = [
    {
      icon: ShieldCheck,
      tone: 'warning',
      title: 'Consent review coming up',
      body: `Re-confirm ${father.name.split(' ')[0]}'s care consent by ${consent.reviewDue}`,
      time: '4:30 PM',
      to: '/patient/p22',
    },
    {
      icon: Star,
      tone: 'warning',
      title: 'How was Monday\u2019s visit?',
      body: 'Your rating helps match the right caregivers',
      time: 'Mon',
      to: '/patient/p18',
    },
  ]

  const all = [...today, ...yesterday, ...actionItems]
  const freshCount = all.filter((e) => e.fresh).length

  return (
    <Screen>
      <AppBar
        title="Notifications"
        subtitle="Sent by the system · nobody pressed send"
        onBack={() => navigate('/patient/p06')}
        trailing={
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              markAllRead()
              notify({ title: 'All caught up', body: 'Every notification marked as read', kind: 'ok' })
            }}
            aria-label="Mark all read"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.09]"
          >
            <CheckCheck className="size-[18px]" strokeWidth={2.2} aria-hidden />
          </motion.button>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <Kicker>
                  <BellRing className="h-3 w-3 text-emerald-300/80" aria-hidden />
                  Notification feed · today
                </Kicker>
                <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  {all.length} updates,{' '}
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
                    {actionItems.length} need you
                  </span>
                </h2>
                <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                  Confirmations, doses and receipts land here the moment they happen.
                </p>

                <div className="mt-5 rounded-2xl bg-white/[0.06] p-3.5">
                  <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/40">
                    <span>Today's rhythm</span>
                    <span className="tabular-nums">{freshCount} unread · 0 missed</span>
                  </div>
                  <div className="mt-2.5 flex items-center gap-1">
                    {['7:44', '8:10', '9:02'].map((t, i) => (
                      <span key={t} className="flex min-w-0 flex-1 items-center">
                        <span className="flex min-w-0 flex-col items-center gap-1">
                          <span className={cn('h-2 w-2 rounded-full', i === 0 ? 'bg-emerald-300' : 'bg-emerald-300/50')} aria-hidden />
                          <span className="font-mono text-[9px] font-bold tabular-nums text-emerald-100/60">{t}</span>
                        </span>
                        {i < 2 && <span aria-hidden className="mb-4 h-px flex-1 bg-emerald-300/25" />}
                      </span>
                    ))}
                    <span className="flex min-w-0 flex-1 items-center">
                      <span className="flex min-w-0 flex-col items-center gap-1">
                        <span className="relative grid h-2 w-2 place-items-center">
                          <span aria-hidden className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-amber-300/60" />
                          <span className="relative h-2 w-2 rounded-full bg-amber-300" />
                        </span>
                        <span className="font-mono text-[9px] font-bold tabular-nums text-amber-200/80">next</span>
                      </span>
                    </span>
                  </div>
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <div className="flex gap-1 rounded-full bg-[#0B211B]/[0.05] p-1">
                {(['all', 'action'] as const).map((f) => {
                  const active = filter === f
                  return (
                    <button key={f} type="button" onClick={() => setFilter(f)} className="relative flex-1 rounded-full px-2 py-2">
                      {active && (
                        <motion.span
                          layoutId="p07-filter-pill"
                          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                          className="absolute inset-0 rounded-full bg-white shadow-[0_6px_16px_-8px_rgba(11,33,27,0.4)]"
                        />
                      )}
                      <span
                        className={cn(
                          'relative block truncate text-[10px] font-extrabold uppercase tracking-[0.1em] transition-colors duration-200',
                          active ? 'text-emerald-700' : 'text-[#0B211B]/40',
                        )}
                      >
                        {f === 'all' ? 'Everything' : `Needs action · ${actionItems.length}`}
                      </span>
                    </button>
                  )
                })}
              </div>
            </motion.div>

            {filter === 'all' && (
              <>
                <motion.div variants={rise} className="flex flex-col gap-3">
                  <Section label="Today" trailing={<Chip intent="success">{today.length}</Chip>} />
                  <Card>
                    {today.map((e, i) => (
                      <div key={e.title}>
                        {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                        <EntryRow e={e} />
                      </div>
                    ))}
                  </Card>
                </motion.div>

                <motion.div variants={rise} className="flex flex-col gap-3">
                  <Section label="Yesterday" trailing={<Chip intent="neutral">{yesterday.length}</Chip>} />
                  <Card>
                    {yesterday.map((e, i) => (
                      <div key={e.title}>
                        {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                        <EntryRow e={e} />
                      </div>
                    ))}
                  </Card>
                </motion.div>
              </>
            )}

            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-amber-200/10 bg-[#241A0B] shadow-[0_28px_64px_-30px_rgba(60,40,10,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-amber-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
                <div className="relative p-5">
                  <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-amber-200/50">
                    <Clock className="h-3 w-3" aria-hidden />
                    Needs your action · {actionItems.length} items
                  </div>
                  <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                    Two things{' '}
                    <span className="bg-gradient-to-r from-amber-300 to-orange-200 bg-clip-text text-transparent">wait on you</span>
                  </h3>
                  <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-amber-100/60">
                    Care continues as scheduled either way — these just need your decision.
                  </p>

                  <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-amber-400/[0.12] px-3.5 py-3">
                    <span aria-hidden className="relative flex h-2 w-2 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-300" />
                    </span>
                    <span className="min-w-0 flex-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-amber-100">
                      Oldest waits since Monday
                    </span>
                    <span className="shrink-0 text-[10px] font-extrabold tabular-nums text-amber-200/70">2 open</span>
                  </div>

                  <div className="mt-3 rounded-2xl bg-white/[0.06] p-4">
                    <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-amber-200/60">Action items</div>
                    <div className="mt-1 flex flex-col">
                      {actionItems.map((e, i) => (
                        <div key={e.title}>
                          {i > 0 && <div aria-hidden className="my-1 h-px bg-white/[0.08]" />}
                          <motion.button
                            type="button"
                            whileTap={{ scale: 0.99 }}
                            onClick={() => navigate(e.to)}
                            className="flex w-full items-center gap-3 py-2.5 text-left"
                          >
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-amber-400/15 text-amber-300">
                              <e.icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[13px] font-bold tracking-tight text-white">{e.title}</span>
                              <span className="mt-0.5 block truncate text-[11px] font-medium text-amber-100/50">{e.body}</span>
                            </span>
                            <span className="shrink-0 font-mono text-[9.5px] font-bold uppercase tracking-wide text-amber-200/50">
                              {e.time}
                            </span>
                          </motion.button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {filter === 'action' && (
              <motion.div variants={rise}>
                <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                  <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                  <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                  <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
                  <div className="relative p-5">
                    <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
                      <Check className="h-3 w-3" aria-hidden />
                      All caught up
                    </div>
                    <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                      Everything else is{' '}
                      <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">read</span>
                    </h3>
                    <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-emerald-100/60">
                      Only the items waiting on you are shown — switch back to see the full feed.
                    </p>
                    <div className="mt-4 grid grid-cols-3 divide-x divide-white/[0.08] rounded-2xl bg-white/[0.06] py-3">
                      {[
                        ['3', 'today'],
                        ['4', 'read'],
                        ['0', 'missed'],
                      ].map(([v, k]) => (
                        <div key={k} className="flex min-w-0 flex-col items-center gap-1 px-2">
                          <span className="text-[14px] font-extrabold tabular-nums leading-none text-white">{v}</span>
                          <span className="text-[8.5px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">{k}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div variants={rise}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.99 }}
                onClick={() => navigate('/patient/p29')}
                className="block w-full text-left"
              >
                <Card>
                  <div className="flex items-center gap-3.5 p-4">
                    <Tile icon={Settings2} tone="info" size="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[14px] font-extrabold tracking-tight text-[#0B211B]">Notification settings</div>
                      <div className="mt-0.5 truncate text-[11px] font-medium text-[#0B211B]/55">
                        Choose what pings you and what stays quiet
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of notifications" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
    </Screen>
  )
}
