import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  Bell,
  Check,
  ChevronRight,
  Clock3,
  Eye,
  History,
  Lock,
  MapPin,
  Pill as PillIcon,
  ReceiptText,
  ScrollText,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Card, Chip, Hero, Kicker, Meter, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

type SettingKey = 'reminders' | 'doses' | 'receipts' | 'marketing' | 'location' | 'relatives'

const notifRows: { key: SettingKey; icon: LucideIcon; title: string; subtitle: string; critical?: boolean }[] = [
  { key: 'reminders', icon: Bell, title: 'Visit reminders', subtitle: 'Thirty minutes before each visit', critical: true },
  { key: 'doses', icon: PillIcon, title: 'Dose updates', subtitle: 'When the nurse records a dose', critical: true },
  { key: 'receipts', icon: ReceiptText, title: 'Payment receipts', subtitle: 'After every completed visit' },
  { key: 'marketing', icon: Clock3, title: 'Ayvaa news and offers', subtitle: 'At most one message per month' },
]

const privacyRows: { key: SettingKey; icon: LucideIcon; title: string; subtitle: string }[] = [
  { key: 'location', icon: MapPin, title: 'Live location sharing', subtitle: 'Show arrivals during home visits' },
  { key: 'relatives', icon: Users, title: 'Relative view access', subtitle: 'Chitra (sister) can see visit summaries' },
]

const quietHours = [
  { id: 'off', label: 'Always notify', sub: 'Nothing is muted' },
  { id: 'night', label: 'Quiet after 9 PM', sub: 'Except emergencies' },
  { id: 'deep', label: 'Quiet after 9 PM + naps', sub: '2 – 4 PM muted too' },
]

const accessLog = [
  { who: 'You', what: 'Viewed care plan', when: 'Today · 10:02 AM' },
  { who: 'Lakshmi Reddy', what: 'Viewed medication list', when: 'Today · 8:05 AM' },
  { who: 'Sunrise Hospital', what: 'Viewed visit summary', when: 'Yesterday · 6:40 PM' },
  { who: 'Chitra (sister)', what: 'Viewed visit summary', when: 'Mon · 7:15 PM' },
]

function DarkRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-100/45">{k}</span>
      <span className="truncate font-mono text-[12px] font-bold text-emerald-50/90">{v}</span>
    </div>
  )
}

export function P29() {
  const { notify } = useDemo()
  const { navigate } = useRouter()

  const [settings, setSettings] = useState<Record<SettingKey, boolean>>({
    reminders: true,
    doses: true,
    receipts: true,
    marketing: false,
    location: true,
    relatives: true,
  })
  const [quiet, setQuiet] = useState('night')
  const [log, setLog] = useState(false)
  const [confirmCritical, setConfirmCritical] = useState<SettingKey | null>(null)

  const notifOn = notifRows.filter((r) => settings[r.key]).length
  const quietLabel = quietHours.find((q) => q.id === quiet)!.label

  const flip = (key: SettingKey) => {
    const row = [...notifRows, ...privacyRows].find((r) => r.key === key)!
    const isCritical = 'critical' in row && row.critical && settings[key]

    if (isCritical) {
      setConfirmCritical(key)
      return
    }
    apply(key)
  }

  const apply = (key: SettingKey) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: !prev[key] }
      notify({
        title: next[key] ? 'Setting on' : 'Setting off',
        body:
          key === 'location'
            ? 'Visit verification continues either way · your address is never shared'
            : key === 'relatives'
              ? 'Family view access updated instantly'
              : 'Notification preference saved',
        kind: 'info',
      })
      return next
    })
    setConfirmCritical(null)
  }

  return (
    <Screen>
      <AppBar title="Notifications and privacy" subtitle="You control every alert" onBack={() => navigate('/patient/p28')} />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <Kicker>
                  <Bell className="h-3 w-3 text-emerald-300/80" aria-hidden />
                  Alert controls · live
                </Kicker>
                <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  {notifOn} of {notifRows.length} alerts on,{' '}
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">quiet after 9</span>
                </h2>
                <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                  Emergency alerts always break through — nothing mutes those.
                </p>

                <div className="mt-4 rounded-2xl bg-emerald-400/[0.1] p-3.5">
                  <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em]">
                    <span className="text-emerald-100/50">Alert coverage</span>
                    <span className="tabular-nums text-emerald-200">
                      {Math.round((notifOn / notifRows.length) * 100)}%
                    </span>
                  </div>
                  <Meter value={notifOn / notifRows.length} intent="success" delay={0.2} className="mt-2" />
                  <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-200/70">
                    <ShieldCheck className="h-3 w-3" strokeWidth={2.6} aria-hidden />
                    {quietLabel} · emergencies always ring
                  </div>
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Notifications" trailing={<Chip intent="neutral">{notifOn} of {notifRows.length} on</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {notifRows.map((r, i) => {
                  const on = settings[r.key]
                  return (
                    <div key={r.key}>
                      {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                      <div className="flex items-center gap-3 px-4 py-3.5">
                        <Tile icon={r.icon} tone={on ? 'success' : 'neutral'} />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span className="truncate text-[13px] font-bold tracking-tight text-[#0B211B]">{r.title}</span>
                            {'critical' in r && r.critical && on && <Chip intent="success">Always on</Chip>}
                          </div>
                          <div className="mt-0.5 truncate text-[11px] font-medium text-[#0B211B]/50">{r.subtitle}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => flip(r.key)}
                          aria-label={r.title}
                          className={cn(
                            'relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200',
                            on ? 'bg-emerald-500' : 'bg-[#0B211B]/[0.15]',
                          )}
                        >
                          <span
                            className={cn(
                              'absolute top-1 h-5 w-5 rounded-full bg-white shadow-[0_2px_6px_rgba(11,33,27,0.3)] transition-all duration-200',
                              on ? 'left-6' : 'left-1',
                            )}
                          />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Quiet hours" trailing={<Chip intent="info">{quietHours.find((q) => q.id === quiet)!.sub}</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card intent="info">
                <div className="p-4 pb-3">
                  <div className="flex gap-1 rounded-full bg-[#0B211B]/[0.05] p-1">
                    {quietHours.map((q) => {
                      const active = quiet === q.id
                      return (
                        <button key={q.id} type="button" onClick={() => setQuiet(q.id)} className="relative flex-1 rounded-full px-1.5 py-2">
                          {active && (
                            <motion.span
                              layoutId="p29-quiet-pill"
                              transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                              className="absolute inset-0 rounded-full bg-white shadow-[0_6px_16px_-8px_rgba(11,33,27,0.4)]"
                            />
                          )}
                          <span
                            className={cn(
                              'relative block truncate text-[9.5px] font-extrabold uppercase tracking-[0.08em] transition-colors duration-200',
                              active ? 'text-emerald-700' : 'text-[#0B211B]/40',
                            )}
                          >
                            {q.label.replace('Always ', '').replace('Quiet ', '')}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <p className="text-pretty text-[11px] font-medium leading-relaxed text-[#0B211B]/55">
                    {quiet === 'off'
                      ? 'Every alert reaches you immediately, day or night.'
                      : quiet === 'night'
                        ? 'Routine alerts are held after 9 PM and delivered at 8 AM. Emergencies ring through instantly.'
                        : 'Alerts muted after 9 PM and during 2 – 4 PM naps. Emergencies always ring through.'}
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Privacy" />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {privacyRows.map((r, i) => {
                  const on = settings[r.key]
                  return (
                    <div key={r.key}>
                      {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                      <div className="flex items-center gap-3 px-4 py-3.5">
                        <Tile icon={r.icon} tone={on ? 'info' : 'neutral'} />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[13px] font-bold tracking-tight text-[#0B211B]">{r.title}</div>
                          <div className="mt-0.5 truncate text-[11px] font-medium text-[#0B211B]/50">{r.subtitle}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => flip(r.key)}
                          aria-label={r.title}
                          className={cn(
                            'relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200',
                            on ? 'bg-emerald-500' : 'bg-[#0B211B]/[0.15]',
                          )}
                        >
                          <span
                            className={cn(
                              'absolute top-1 h-5 w-5 rounded-full bg-white shadow-[0_2px_6px_rgba(11,33,27,0.3)] transition-all duration-200',
                              on ? 'left-6' : 'left-1',
                            )}
                          />
                        </button>
                      </div>
                    </div>
                  )
                })}
                <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.99 }}
                  onClick={() => navigate('/patient/p22')}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                >
                  <Tile icon={Lock} tone="neutral" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">Consent controls</span>
                    <span className="mt-0.5 block truncate text-[11px] font-medium text-[#0B211B]/50">
                      Review what caregivers may do
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/20" aria-hidden />
                </motion.button>
                <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setLog(true)}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                >
                  <Tile icon={History} tone="neutral" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">Who viewed my records</span>
                    <span className="mt-0.5 block truncate text-[11px] font-medium text-[#0B211B]/50">
                      Last view today 10:02 AM · by you
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/20" aria-hidden />
                </motion.button>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={MapPin} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Turning location sharing off does not stop visit verification. Arrivals are still checked without showing
                  your address to anyone new.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of settings" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        {(log || confirmCritical) && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setLog(false)
              setConfirmCritical(null)
            }}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmCritical && (
          <motion.div
            key="confirm"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex flex-col gap-3.5 rounded-t-[28px] bg-white p-5 pb-7 shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div aria-hidden className="mx-auto h-1.5 w-10 shrink-0 rounded-full bg-[#0B211B]/15" />

            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-amber-400/15 text-amber-600">
                <Bell className="h-5 w-5" strokeWidth={2.2} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
                  Turn off {[...notifRows, ...privacyRows].find((r) => r.key === confirmCritical)?.title}?
                </div>
                <div className="mt-0.5 truncate text-xs font-medium text-[#0B211B]/55">This is a critical safety alert</div>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => setConfirmCritical(null)}
                aria-label="Close sheet"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
              >
                <X className="h-4 w-4" aria-hidden />
              </motion.button>
            </div>

            <div className="rounded-2xl bg-[#0B211B]/[0.03] p-4">
              <div className="flex flex-col gap-2.5">
                {[
                  ['Reminds you', '30 min before each visit'],
                  ['Missed if off', 'Arrivals, changes, incidents'],
                  ['Re-enable', 'Anytime · one tap'],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline">
                    <span className="shrink-0 text-[11.5px] font-semibold text-[#0B211B]/55">{k}</span>
                    <span aria-hidden className="mx-2.5 min-w-0 flex-1 -translate-y-1 border-b border-dotted border-[#0B211B]/20" />
                    <span className="shrink-0 font-mono text-[12px] font-bold text-[#0B211B]">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2.5">
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => setConfirmCritical(null)}
                className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
              >
                <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
                <span className="truncate">Keep on</span>
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => apply(confirmCritical)}
                className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
              >
                <span className="truncate">Turn off anyway</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {log && (
          <motion.div
            key="log"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex max-h-[88%] flex-col rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div className="shrink-0 px-5 pt-4">
              <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-5 pb-7 pt-3">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-700">
                  <Eye className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Access log</div>
                  <div className="mt-0.5 truncate text-xs font-medium text-[#0B211B]/55">Every view · this week</div>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setLog(false)}
                  aria-label="Close sheet"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                >
                  <X className="h-4 w-4" aria-hidden />
                </motion.button>
              </div>

              <div className="relative overflow-hidden rounded-3xl bg-[#0B231C] p-4">
                <div aria-hidden className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
                <div className="relative">
                  <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Access summary</div>
                  <div className="mt-3 flex flex-col gap-2.5">
                    <DarkRow k="Views this week" v="23" />
                    <DarkRow k="Unique viewers" v="4 people" />
                    <DarkRow k="Denied" v="1 · consent change" />
                    <DarkRow k="Ledger" v="Immutable" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#0B211B]/[0.03] p-4">
                <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">Recent views</div>
                <div className="mt-2.5 flex flex-col gap-3">
                  {accessLog.map((a, i) => (
                    <div key={i}>
                      {i > 0 && <div aria-hidden className="mb-3 h-px bg-[#0B211B]/[0.05]" />}
                      <div className="flex items-center gap-2.5">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-500/10 text-[10px] font-extrabold text-emerald-700">
                          {a.who.charAt(0)}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[12px] font-bold tracking-tight text-[#0B211B]">
                            {a.who} · {a.what}
                          </div>
                          <div className="mt-0.5 truncate font-mono text-[10px] font-bold uppercase tracking-wide text-[#0B211B]/40">
                            {a.when}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/patient/p21')}
                className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
              >
                <ScrollText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                <span className="truncate">Full audit log</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
