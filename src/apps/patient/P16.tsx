import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  Check,
  ChevronRight,
  Clock,
  Footprints,
  HeartPulse,
  Lock,
  MapPin,
  MessageSquare,
  Phone,
  Pill,
  Siren,
  Utensils,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Hero, Kicker, Meter, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { caregivers, lovedOnes } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

type Step = { icon: LucideIcon; title: string; body: string; time: string; state: 'done' | 'active' | 'todo' }

const steps: Step[] = [
  { icon: MapPin, title: 'Arrival verified', body: 'GPS matched at the care address', time: '2:02 PM', state: 'done' },
  { icon: HeartPulse, title: 'Blood pressure recorded', body: '128 over 76 · pulse 72', time: '2:10 PM', state: 'done' },
  { icon: Pill, title: 'Morning medication given', body: 'Amlodipine 5 mg · Rx-verified', time: '2:12 PM', state: 'done' },
  { icon: Footprints, title: 'Guided walk', body: 'Fifteen minutes · step 4 of 5', time: 'now', state: 'active' },
  { icon: Utensils, title: 'Prepare lunch', body: 'Low salt meal from the plan', time: 'next', state: 'todo' },
]

export function P16() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const father = lovedOnes[0]
  const first = father.name.split(' ')[0]
  const nurse = caregivers[0]
  const nurseFirst = nurse.name.split(' ')[0]
  const [sheet, setSheet] = useState(false)
  const doneCount = steps.filter((s) => s.state === 'done').length

  return (
    <Screen>
      <AppBar
        title="Visit in progress"
        subtitle={`${father.name} · started 2:02 PM`}
        onBack={() => navigate('/patient/p15')}
        trailing={
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setSheet(true)}
            aria-label="Visit detail"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.09]"
          >
            <Clock className="size-[18px]" strokeWidth={2.2} aria-hidden />
          </motion.button>
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
                      Live with {first}
                    </Kicker>
                    <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                      {nurseFirst} is on the{' '}
                      <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">guided walk</span>
                    </h2>
                    <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                      Everything logs itself as it happens · sign-off ~4:30 PM
                    </p>
                  </div>
                  <Chip intent="live" light dot className="mt-1 shrink-0 border-transparent">
                    Live
                  </Chip>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  {[
                    { icon: MapPin, l: 'Arrived', v: '2:02 PM' },
                    { icon: Clock, l: 'Elapsed', v: '58 min' },
                    { icon: Check, l: 'Steps done', v: `${doneCount} of 5` },
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
                    <span className="tabular-nums text-emerald-200">{Math.round((doneCount / 5) * 100)}%</span>
                  </div>
                  <Meter value={doneCount / 5} intent="success" delay={0.2} className="mt-2" />
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Care steps · live" trailing={<Chip intent="success" dot>Streaming</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
                <div className="relative p-5">
                  <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
                    <MapPin className="h-3 w-3" aria-hidden />
                    Visit log · updates as they happen
                  </div>
                  <div className="mt-3 flex flex-col">
                    {steps.map((s, i) => {
                      const last = i === steps.length - 1
                      return (
                        <div key={s.title} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            {s.state === 'done' ? (
                              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/90 text-white">
                                <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
                              </span>
                            ) : s.state === 'active' ? (
                              <span className="relative grid h-5 w-5 shrink-0 place-items-center">
                                <span aria-hidden className="absolute h-5 w-5 animate-ping rounded-full bg-emerald-400/40" />
                                <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-300" />
                              </span>
                            ) : (
                              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-white/15" />
                            )}
                            {!last && (
                              <span aria-hidden className={cn('my-1 w-px flex-1', s.state === 'done' ? 'bg-emerald-300/30' : 'bg-white/10')} />
                            )}
                          </div>
                          <motion.button
                            type="button"
                            whileTap={{ scale: 0.99 }}
                            onClick={() =>
                              notify({
                                title: s.title,
                                body:
                                  s.state === 'done'
                                    ? `${s.body} · logged ${s.time} · sealed`
                                    : s.state === 'active'
                                      ? `${s.body} · happening now with ${nurseFirst}`
                                      : `${s.body} · coming up next`,
                                kind: s.state === 'todo' ? 'info' : 'ok',
                              })
                            }
                            className={cn('flex min-w-0 flex-1 gap-3 pb-4 text-left', last && 'pb-0.5')}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="truncate text-[13px] font-bold leading-snug tracking-tight text-white">{s.title}</span>
                                <span className="ml-auto shrink-0 font-mono text-[9.5px] font-bold uppercase tracking-wide text-emerald-100/40">
                                  {s.time}
                                </span>
                              </div>
                              <div className="mt-0.5 flex items-center gap-1.5">
                                <s.icon className="h-3 w-3 shrink-0 text-emerald-300/60" strokeWidth={2.4} aria-hidden />
                                <span className="truncate text-[10.5px] font-semibold text-emerald-100/50">{s.body}</span>
                                {s.state === 'done' && <Lock className="h-3 w-3 shrink-0 text-emerald-100/30" aria-hidden />}
                              </div>
                            </div>
                          </motion.button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                <div className="p-5">
                  <div className="flex items-center gap-3.5">
                    <span className="relative shrink-0">
                      <span className="grid h-12 w-12 place-items-center rounded-[18px] bg-gradient-to-br from-emerald-500 to-teal-500 text-[13px] font-black tracking-tight text-white shadow-[0_10px_22px_-10px_rgba(16,185,129,0.8)]">
                        {nurseFirst[0]}
                      </span>
                      <span className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-emerald-400 text-white ring-2 ring-white">
                        <Check className="h-2 w-2" strokeWidth={4} aria-hidden />
                      </span>
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[15px] font-extrabold tracking-tight text-[#0B211B]">{nurse.name}</div>
                      <div className="mt-0.5 truncate text-[11.5px] font-semibold text-[#0B211B]/55">{nurse.role} · still on site</div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2.5">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => notify({ title: 'Chat opened', body: `Message ${nurseFirst} securely over Ayvaa`, kind: 'info' })}
                      className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
                    >
                      <MessageSquare className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                      <span className="truncate">Message</span>
                    </motion.button>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => notify({ title: `Calling ${nurseFirst}`, body: 'Secure Ayvaa line · number never shared', kind: 'info' })}
                      className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
                    >
                      <Phone className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                      <span className="truncate">Call</span>
                    </motion.button>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.99 }}
                onClick={() => navigate('/patient/p17')}
                className="block w-full text-left"
              >
                <Card>
                  <div className="flex items-center gap-3.5 p-4">
                    <Tile icon={Utensils} tone="neutral" size="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[14px] font-extrabold tracking-tight text-[#0B211B]">Today's plan</div>
                      <div className="mt-0.5 truncate text-[11px] font-medium text-[#0B211B]/55">
                        Five steps · from the elderly care plan
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />
                  </div>
                </Card>
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="warning" className="flex items-start gap-3 p-4">
                <Tile icon={Pill} tone="warning" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Amlodipine 5 mg was verified against the prescription at 2:12 PM and sealed in the visit log.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="Live updates stream automatically" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <div className="flex gap-2.5">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              notify({ title: 'Report incident', body: 'Severity, photos and description · supervisors notified', kind: 'warn' })
              navigate('/patient/p31')
            }}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-rose-500/[0.08] py-3.5 text-[13px] font-bold text-rose-600 transition-colors hover:bg-rose-500/[0.12]"
          >
            <Siren className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Incident</span>
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              notify({ title: 'Opening visit log', body: 'Full history for this visit', kind: 'info' })
              navigate('/patient/p17')
            }}
            className="flex flex-[1.4] items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
          >
            <span className="truncate">Visit log</span>
          </motion.button>
        </div>
      </FootBar>

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
                  <Clock className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Visit so far</div>
                  <div className="mt-0.5 truncate text-xs font-medium text-[#0B211B]/55">Started 2:02 PM · sign-off ~4:30 PM</div>
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
                  <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Session ledger</div>
                  <div className="mt-3 flex flex-col gap-2.5">
                    {[
                      ['Arrived', '2:02 PM', true],
                      ['Vitals logged', '2:10 PM', true],
                      ['Meds given', '2:12 PM', true],
                      ['Walk + lunch', 'In progress', false],
                      ['Sign-off', '~4:30 PM', false],
                    ].map(([k, v, ok]) => (
                      <div key={k as string} className="flex items-baseline justify-between gap-3">
                        <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-100/45">{k}</span>
                        <span className={cn('truncate font-mono text-[12px] font-bold', ok ? 'text-emerald-50/90' : 'text-emerald-300')}>
                          {v}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/patient/p17')}
                  className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
                >
                  <span className="truncate">Visit log</span>
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => notify({ title: `Calling ${nurseFirst}`, body: 'Secure Ayvaa line · number never shared', kind: 'info' })}
                  className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
                >
                  <Phone className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                  <span className="truncate">Call</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
