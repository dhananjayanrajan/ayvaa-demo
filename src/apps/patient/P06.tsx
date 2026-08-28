import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  Activity,
  CalendarCheck,
  Check,
  Clock,
  Folder,
  MapPin,
  Phone,
  Pill,
  Plus,
  ScrollText,
  Siren,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Card, Chip, Hero, Kicker, Meter, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { carePlan, guardian, lovedOnes, visits } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const actions: { label: string; icon: LucideIcon; to: string; accent: string; glow: string; danger?: boolean }[] = [
  { label: 'Book care', icon: Plus, to: '/patient/p09', accent: 'bg-gradient-to-br from-emerald-500 to-teal-500', glow: 'shadow-[0_8px_18px_-8px_rgba(16,185,129,0.7)]' },
  { label: 'Medicine', icon: Pill, to: '/patient/p19', accent: 'bg-gradient-to-br from-amber-400 to-orange-400', glow: 'shadow-[0_8px_18px_-8px_rgba(251,191,36,0.7)]' },
  { label: 'Records', icon: Folder, to: '/patient/p21', accent: 'bg-gradient-to-br from-teal-500 to-emerald-400', glow: 'shadow-[0_8px_18px_-8px_rgba(45,212,191,0.6)]' },
  { label: 'Emergency', icon: Siren, to: '/patient/p32', accent: 'bg-gradient-to-br from-rose-500 to-red-500', glow: 'shadow-[0_8px_18px_-8px_rgba(244,63,94,0.7)]', danger: true },
]

const liveSteps = [
  { label: 'Arrival', done: true },
  { label: 'Vitals', done: true },
  { label: 'Mobility', done: true },
  { label: 'Meds', done: false },
  { label: 'Sign-off', done: false },
]

const doseRounds: [string, string, boolean][] = [
  ['Morning · 8:10 AM', 'Given', true],
  ['Afternoon · 2:15 PM', 'Given', true],
  ['Evening · 6:00 PM', 'Pending', false],
]

function DarkRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-100/45">{k}</span>
      <span className="truncate font-mono text-[12px] font-bold text-emerald-50/90">{v}</span>
    </div>
  )
}

export function P06() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [sheet, setSheet] = useState(false)

  const father = lovedOnes[0]
  const first = father.name.split(' ')[0]
  const live = visits.find((v) => v.status === 'live') ?? visits[0]
  const caregiver = live.caregiver ?? carePlan.caregiver.split(' · ')[0]
  const upcoming = visits.filter((v) => v.status === 'confirmed' || v.status === 'pending')

  return (
    <Screen>
      <AppBar
        title={guardian.name}
        subtitle="Good morning · Friday"
        trailing={
          <div className="flex items-center gap-2">
            <AgentAvatar seed={guardian.name} size={42} />
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                notify({ title: '2 new notifications', body: 'Visit confirmed · receipt ready', kind: 'info' })
                navigate('/patient/p07')
              }}
              aria-label="Notifications"
              className="relative grid size-10 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.09]"
            >
              <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" strokeLinecap="round" />
              </svg>
              <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-rose-500" aria-hidden />
            </motion.button>
          </div>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Kicker>
                      <span className="relative flex h-2 w-2" aria-hidden>
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
                      </span>
                      Care happening now
                    </Kicker>
                    <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                      {caregiver.split(' ')[0]} is with {first},{' '}
                      <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">live</span>
                    </h2>
                    <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                      RN · {carePlan.category.toLowerCase()} · GPS-checked arrival
                    </p>
                  </div>
                  <Chip intent="live" light dot className="mt-1 shrink-0 border-transparent">
                    Live
                  </Chip>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  {[
                    { icon: MapPin, l: 'Arrived', v: '2:04 PM' },
                    { icon: Clock, l: 'Duration', v: '2 hours' },
                    { icon: Check, l: 'Steps done', v: '3 of 5' },
                  ].map((f) => (
                    <div key={f.l} className="rounded-2xl bg-white/[0.06] px-3 py-2.5">
                      <f.icon className="h-3.5 w-3.5 text-emerald-300" strokeWidth={2.4} aria-hidden />
                      <div className="mt-1.5 truncate text-[12px] font-extrabold leading-none text-white">{f.v}</div>
                      <div className="mt-1 truncate text-[8.5px] font-bold uppercase tracking-[0.12em] text-emerald-100/40">{f.l}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/40">
                    <span>Visit progress</span>
                    <span className="tabular-nums text-emerald-200">60%</span>
                  </div>
                  <Meter value={3 / 5} intent="success" delay={0.2} className="mt-2" />
                </div>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSheet(true)}
                  className="mt-3 flex w-full items-center gap-1.5 rounded-2xl bg-white/[0.06] px-3.5 py-3 text-left transition-colors hover:bg-white/[0.09]"
                  aria-label="Open live visit steps"
                >
                  {liveSteps.map((s, i) => (
                    <span key={s.label} className="flex min-w-0 flex-1 items-center">
                      <span className="flex min-w-0 flex-col items-center gap-1">
                        {s.done ? (
                          <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-400 text-[#0B231C]">
                            <Check className="h-2.5 w-2.5" strokeWidth={4} aria-hidden />
                          </span>
                        ) : i === 3 ? (
                          <span className="relative grid h-4 w-4 shrink-0 place-items-center">
                            <span aria-hidden className="absolute h-4 w-4 animate-ping rounded-full bg-emerald-300/50" />
                            <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-300 ring-4 ring-emerald-300/20" />
                          </span>
                        ) : (
                          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-white/15" />
                        )}
                        <span
                          className={cn(
                            'max-w-full truncate text-[8px] font-extrabold uppercase tracking-[0.1em]',
                            s.done ? 'text-emerald-100/70' : i === 3 ? 'text-emerald-100/80' : 'text-emerald-100/30',
                          )}
                        >
                          {s.label}
                        </span>
                      </span>
                      {i < liveSteps.length - 1 && (
                        <span aria-hidden className={cn('mx-1 mb-4 h-px flex-1', s.done ? 'bg-emerald-300/50' : 'bg-white/15')} />
                      )}
                    </span>
                  ))}
                </motion.button>

                <div className="mt-4 flex gap-2.5">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSheet(true)}
                    className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-[12.5px] font-bold text-white shadow-[0_12px_28px_-12px_rgba(16,185,129,0.8)]"
                  >
                    <MapPin className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                    <span className="truncate">Track visit</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() =>
                      notify({
                        title: `Calling ${caregiver.split(' ')[0]}`,
                        body: 'Connecting securely over Ayvaa · number never shared',
                        kind: 'info',
                      })
                    }
                    className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-white/[0.1] py-3 text-[12.5px] font-bold text-white transition-colors hover:bg-white/[0.16]"
                  >
                    <Phone className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                    <span className="truncate">Call</span>
                  </motion.button>
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <div className="grid grid-cols-4 gap-2.5">
                {actions.map((a) => (
                  <motion.button
                    key={a.label}
                    type="button"
                    whileTap={{ scale: 0.94 }}
                    onClick={() => {
                      if (a.danger) notify({ title: 'Emergency help opened', body: 'Ambulance 108 · your nurse is on site', kind: 'error' })
                      navigate(a.to)
                    }}
                    className="flex flex-col items-center gap-2 rounded-2xl bg-white px-2 py-3.5 shadow-[0_1px_2px_rgba(11,33,27,0.06),0_14px_32px_-22px_rgba(11,33,27,0.25)] transition-colors hover:bg-emerald-500/[0.04]"
                  >
                    <span className={cn('grid h-9 w-9 place-items-center rounded-xl text-white', a.accent, a.glow)}>
                      <a.icon className="h-4 w-4" strokeWidth={2.4} aria-hidden />
                    </span>
                    <span
                      className={cn(
                        'max-w-full truncate text-[9.5px] font-extrabold uppercase tracking-[0.08em]',
                        a.danger ? 'text-rose-600' : 'text-[#0B211B]/55',
                      )}
                    >
                      {a.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Upcoming visits" trailing={<Chip intent="neutral">{upcoming.length} scheduled</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {upcoming.map((v, i) => (
                  <div key={v.id}>
                    {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.99 }}
                      onClick={() => navigate('/patient/p15')}
                      className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                    >
                      <Tile icon={CalendarCheck} tone={v.status === 'confirmed' ? 'success' : 'warning'} />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">
                          {v.day}, {v.date}
                        </span>
                        <span className="mt-0.5 block truncate text-[11px] font-medium text-[#0B211B]/50">
                          {v.caregiver ? `${v.caregiver} · ${v.time}` : 'Awaiting caregiver · offer out'}
                        </span>
                      </span>
                      <span className="shrink-0">
                        <Chip intent={v.status === 'confirmed' ? 'success' : 'warning'} dot={v.status !== 'confirmed'}>
                          {v.status === 'confirmed' ? 'Confirmed' : 'Waiting'}
                        </Chip>
                      </span>
                    </motion.button>
                  </div>
                ))}
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Today at a glance" />
            </motion.div>

            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-amber-200/10 bg-[#241A0B] shadow-[0_28px_64px_-30px_rgba(60,40,10,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-amber-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
                <div className="relative p-5">
                  <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-amber-200/50">
                    <Pill className="h-3 w-3" aria-hidden />
                    Medication · evening round
                  </div>
                  <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                    Next dose 6:00 PM,{' '}
                    <span className="bg-gradient-to-r from-amber-300 to-orange-200 bg-clip-text text-transparent">due in 2 hours</span>
                  </h3>
                  <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-amber-100/60">
                    Two medicines · given by {caregiver.split(' ')[0]} during the live visit
                  </p>

                  <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-amber-400/[0.12] px-3.5 py-3">
                    <span aria-hidden className="relative flex h-2 w-2 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-300" />
                    </span>
                    <span className="min-w-0 flex-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-amber-100">
                      Dose window 6 – 7 PM
                    </span>
                    <span className="shrink-0 text-[10px] font-extrabold tabular-nums text-amber-200/70">2 of 3 given</span>
                  </div>

                  <div className="mt-3 rounded-2xl bg-white/[0.06] p-4">
                    <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-amber-200/60">Today's rounds</div>
                    <div className="mt-2.5 flex flex-col gap-2">
                      {doseRounds.map(([k, v, done]) => (
                        <div key={k} className="flex items-baseline justify-between gap-3">
                          <span className="shrink-0 text-[12px] font-semibold text-amber-50/70">{k}</span>
                          <span className={cn('shrink-0 font-mono text-[11.5px] font-bold', done ? 'text-emerald-300' : 'text-amber-300')}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2.5">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigate('/patient/p19')}
                      className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
                    >
                      <Pill className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                      <span className="truncate">Dose schedule</span>
                    </motion.button>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigate('/patient/p20')}
                      className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-white/[0.1] py-3.5 text-[13px] font-bold text-white transition-colors hover:bg-white/[0.16]"
                    >
                      <ScrollText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                      <span className="truncate">Prescriptions</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
                <div className="relative p-5">
                  <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
                    <Activity className="h-3 w-3" aria-hidden />
                    Recovery plan · elderly care
                  </div>
                  <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                    Week {carePlan.week} of {carePlan.weeks},{' '}
                    <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">on track</span>
                  </h3>
                  <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-emerald-100/60">
                    {carePlan.visitsDone} visits completed · goals logged at each one
                  </p>

                  <div className="mt-4 rounded-2xl bg-white/[0.06] p-4">
                    <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/40">
                      <span>Plan progress</span>
                      <span className="tabular-nums text-emerald-200">{carePlan.progress}%</span>
                    </div>
                    <Meter value={carePlan.progress / 100} intent="success" delay={0.2} className="mt-2" />
                    <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-300/60">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                      On schedule · zero reschedules
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2.5">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigate('/patient/p13')}
                      className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 text-[13px] font-bold text-white shadow-[0_12px_28px_-12px_rgba(16,185,129,0.8)]"
                    >
                      <Activity className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                      <span className="truncate">Open plan</span>
                    </motion.button>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigate('/patient/p14')}
                      className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-white/[0.1] py-3.5 text-[13px] font-bold text-white transition-colors hover:bg-white/[0.16]"
                    >
                      <CalendarCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                      <span className="truncate">Weekly reports</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={MapPin} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Everything updates itself — confirmations, doses and receipts land as notifications the moment they
                  happen, nobody presses send.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of today" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        {sheet && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSheet(false)}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheet && (
          <motion.div
            key="sheet"
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
                  <MapPin className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
                    Live with {first} · {caregiver}
                  </div>
                  <div className="mt-0.5 truncate text-xs font-medium text-[#0B211B]/55">Arrived 2:04 PM · leaves ~4:00 PM</div>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setSheet(false)}
                  aria-label="Close sheet"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                >
                  <X className="h-4 w-4" aria-hidden />
                </motion.button>
              </div>

              <div className="relative overflow-hidden rounded-3xl bg-[#0B231C] p-4">
                <div aria-hidden className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
                <div className="relative">
                  <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Care steps · 3 of 5 done</div>
                  <div className="mt-3 flex flex-col gap-2.5">
                    <DarkRow k="Arrival verified" v="2:04 PM" />
                    <DarkRow k="Vitals recorded" v="126/78 · 72 bpm" />
                    <DarkRow k="Mobility exercise" v="Done" />
                    <DarkRow k="Medication round" v="In progress" />
                    <DarkRow k="Summary + sign-off" v="Pending" />
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/patient/p16')}
                  className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
                >
                  <MapPin className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                  <span className="truncate">Live map</span>
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() =>
                    notify({ title: `Calling ${caregiver.split(' ')[0]}`, body: 'Secure Ayvaa line · number never shared', kind: 'info' })
                  }
                  className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
                >
                  <Phone className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                  <span className="truncate">Call nurse</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
