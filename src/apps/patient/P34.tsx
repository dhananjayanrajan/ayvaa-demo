import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CalendarDays, Check, ChevronRight, CircleX, Clock, History, Hourglass, Repeat, Save, ShieldCheck, X } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Hero, Kicker, Meter, Panel, Section, Stat, Tile, rise, stagger } from '@/components/phone/kit'
import { carePlan, lovedOnes } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const pauseOptions = ['2 weeks', '4 weeks', 'Custom']

function RoseRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.1em] text-rose-100/45">{k}</span>
      <span className="truncate font-mono text-[12px] font-bold text-rose-50/90">{v}</span>
    </div>
  )
}

function AmberRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.1em] text-amber-100/45">{k}</span>
      <span className="truncate font-mono text-[12px] font-bold text-amber-50/90">{v}</span>
    </div>
  )
}

export function P34() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const father = lovedOnes[0]
  const [days, setDays] = useState<string[]>(['Mon', 'Wed', 'Fri'])
  const [pauseFor, setPauseFor] = useState('2 weeks')
  const [pauseOpen, setPauseOpen] = useState(false)
  const [endOpen, setEndOpen] = useState(false)

  const daysChanged = days.join() !== 'Mon,Wed,Fri'
  const weeklyTotal = days.length * 1600

  const toggleDay = (d: string) =>
    setDays((prev) => {
      if (prev.includes(d) && prev.length === 1) {
        notify({ title: 'At least one day', body: 'A series needs a weekly visit day · add before removing', kind: 'warn' })
        return prev
      }
      const next = prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d].sort()
      notify({
        title: next.includes(d) ? `${d} added` : `${d} removed`,
        body: `${next.length} visits weekly · nurse notified on save`,
        kind: 'info',
      })
      return next
    })

  return (
    <Screen>
      <AppBar
        title="Manage plan"
        subtitle={`${father.name} · ${carePlan.category.toLowerCase()} · week ${carePlan.week} of ${carePlan.weeks}`}
        onBack={() => navigate('/patient/p13')}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <Kicker>
                  <Repeat className="h-3 w-3 text-emerald-300/80" aria-hidden />
                  Current series · active
                </Kicker>
                <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  {carePlan.caregiver.split(' · ')[0]},{' '}
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">{carePlan.schedule}</span>
                </h2>
                <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                  {carePlan.remaining} · changes apply to the whole series and are logged.
                </p>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/40">
                    <span>Plan progress</span>
                    <span className="tabular-nums text-emerald-200">{carePlan.progress}%</span>
                  </div>
                  <div className="mt-2">
                    <Meter value={carePlan.progress / 100} intent="success" delay={0.2} />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.08]">
                  <Stat label="Visits done" value={carePlan.visitsDone} dot="bg-emerald-300" />
                  <Stat label="Week" value={`${carePlan.week}/${carePlan.weeks}`} dot="bg-teal-300" />
                  <Stat label="Incidents" value={0} dot="bg-rose-300/70" />
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <Section
                label="Change visit days"
                trailing={
                  <Chip intent={daysChanged ? 'warning' : 'neutral'} dot={daysChanged}>
                    {daysChanged ? 'Unsaved' : 'Mon · Wed · Fri'}
                  </Chip>
                }
              />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {allDays.map((d) => {
                      const on = days.includes(d)
                      return (
                        <motion.button
                          key={d}
                          type="button"
                          whileTap={{ scale: 0.93 }}
                          onClick={() => toggleDay(d)}
                          className={cn(
                            'flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[12px] font-bold transition-colors',
                            on ? 'bg-emerald-500/[0.14] text-emerald-700' : 'bg-[#0B211B]/[0.045] text-[#0B211B]/55',
                          )}
                        >
                          {on && <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />}
                          {d}
                        </motion.button>
                      )
                    })}
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#0B211B]/[0.03] px-4 py-3.5">
                    <span className="min-w-0 text-[12.5px] font-semibold text-[#0B211B]/65">
                      New total · {days.length} visit{days.length > 1 ? 's' : ''} weekly
                    </span>
                    <span className="shrink-0 font-mono text-[12px] font-bold text-emerald-700">
                      ₹{weeklyTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Change visit time" />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.99 }}
                  onClick={() => notify({ title: 'Time change', body: 'Lakshmi is also free at 10:00 AM and 4:00 PM', kind: 'info' })}
                  className="flex w-full items-center gap-3.5 p-4 text-left"
                >
                  <Tile icon={Clock} tone="info" size="lg" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[14px] font-extrabold tracking-tight text-[#0B211B]">2:00 PM</div>
                    <div className="mt-0.5 truncate text-[11px] font-medium text-[#0B211B]/55">
                      Lakshmi also free at 10:00 AM and 4:00 PM
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />
                </motion.button>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Pause the series" trailing={<Chip intent="warning">Auto-resume</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-amber-200/10 bg-[#241A0B] shadow-[0_28px_64px_-30px_rgba(60,40,10,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-amber-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
                <div className="relative p-5">
                  <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-amber-200/50">
                    <Hourglass className="h-3 w-3" aria-hidden />
                    Hospital stays · travel · family time
                  </div>
                  <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                    Pause for {pauseFor.toLowerCase()},{' '}
                    <span className="bg-gradient-to-r from-amber-300 to-orange-200 bg-clip-text text-transparent">resume automatic</span>
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {pauseOptions.map((p) => {
                      const on = pauseFor === p
                      return (
                        <motion.button
                          key={p}
                          type="button"
                          whileTap={{ scale: 0.93 }}
                          onClick={() => setPauseFor(p)}
                          className={cn(
                            'flex items-center gap-1.5 rounded-full px-3.5 py-2.5 text-[11px] font-bold transition-colors',
                            on ? 'bg-amber-400 text-[#241A0B]' : 'bg-white/[0.08] text-amber-50/60 hover:bg-white/[0.14]',
                          )}
                        >
                          {on && <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />}
                          {p}
                        </motion.button>
                      )
                    })}
                  </div>

                  <div className="mt-4 rounded-2xl bg-white/[0.06] p-4">
                    <div className="flex flex-col gap-2.5">
                      <AmberRow k="Paused weeks" v={pauseFor === 'Custom' ? 'Your dates' : pauseFor} />
                      <AmberRow k="Charged while paused" v="₹0" />
                      <AmberRow
                        k="Resumes"
                        v={pauseFor === '2 weeks' ? 'Mar 29' : pauseFor === '4 weeks' ? 'Apr 12' : 'Your date'}
                      />
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setPauseOpen(true)}
                    className="mt-4 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(245,158,11,0.75)]"
                  >
                    <Hourglass className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                    <span className="truncate">Pause from Mar 15</span>
                  </motion.button>
                  <p className="mt-2.5 text-center text-[10.5px] font-semibold leading-relaxed text-amber-100/40">
                    Visits resume automatically · you are never charged for paused weeks.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="End the series" trailing={<Chip intent="danger">Permanent</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-rose-200/10 bg-[#230D14] shadow-[0_28px_64px_-30px_rgba(60,10,25,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-rose-500/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />
                <div className="relative p-5">
                  <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-rose-200/50">
                    <CircleX className="h-3 w-3" aria-hidden />
                    Ends all remaining visits · permanent
                  </div>
                  <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                    End care completely,{' '}
                    <span className="bg-gradient-to-r from-rose-300 to-orange-200 bg-clip-text text-transparent">after Mar 15</span>
                  </h3>
                  <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-rose-100/60">
                    Cancels all 17 remaining visits. Your consent stays active until withdrawn separately. A coordinator
                    calls to confirm before anything ends.
                  </p>

                  <div className="mt-4 rounded-2xl bg-white/[0.06] p-4">
                    <div className="flex flex-col gap-2.5">
                      <RoseRow k="Final visit" v="Friday, March 15" />
                      <RoseRow k="Visits cancelled" v="17 remaining" />
                      <RoseRow k="Consent record" v="Stays until withdrawn" />
                      <RoseRow k="Confirmation" v="Coordinator call" />
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setEndOpen(true)}
                    className="mt-4 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-rose-500 to-red-500 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(244,63,94,0.75)]"
                  >
                    <CircleX className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                    <span className="truncate">Request to end care</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={History} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Every change here is applied to the whole series, logged permanently, and your nurse is notified before
                  the next visit.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of plan management" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <div className="flex flex-col gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              notify({
                title: 'Plan changes saved',
                body: daysChanged
                  ? `${days.join(', ')} · ${days.length} visits weekly · nurse notified`
                  : 'No pending changes · series continues as is',
                kind: 'ok',
              })
            }
            className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
          >
            <Save className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">{daysChanged ? 'Save day changes' : 'Save'}</span>
          </motion.button>
          <div className="flex items-center justify-center gap-1.5 text-[10.5px] font-semibold text-[#0B211B]/45">
            <ShieldCheck className="h-3 w-3" aria-hidden />
            Changes are sealed in your plan record · signed consent stays valid.
          </div>
        </div>
      </FootBar>

      <AnimatePresence>
        {(pauseOpen || endOpen) && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setPauseOpen(false)
              setEndOpen(false)
            }}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {pauseOpen && (
          <motion.div
            key="pause"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex flex-col gap-3.5 rounded-t-[28px] bg-white p-5 pb-7 shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div aria-hidden className="mx-auto h-1.5 w-10 shrink-0 rounded-full bg-[#0B211B]/15" />

            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-amber-400/15 text-amber-600">
                <Hourglass className="h-5 w-5" strokeWidth={2.2} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
                  Pause for {pauseFor.toLowerCase()}?
                </div>
                <div className="mt-0.5 truncate text-xs font-medium text-[#0B211B]/55">From March 15 · resumes automatically</div>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => setPauseOpen(false)}
                aria-label="Close sheet"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
              >
                <X className="h-4 w-4" aria-hidden />
              </motion.button>
            </div>

            <div className="rounded-2xl bg-[#0B211B]/[0.03] p-4">
              <div className="flex flex-col gap-2.5">
                {[
                  ['Visits paused', pauseFor === '2 weeks' ? '3 visits' : pauseFor === '4 weeks' ? '6 visits' : 'Your dates'],
                  ['Charged', '₹0 for paused weeks'],
                  ['Resumes', pauseFor === '2 weeks' ? 'Mon, Mar 29' : pauseFor === '4 weeks' ? 'Mon, Apr 12' : 'Automatically'],
                  ['Nurse', 'Notified before next visit'],
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
                onClick={() => setPauseOpen(false)}
                className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
              >
                <span className="truncate">Keep going</span>
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setPauseOpen(false)
                  notify({
                    title: `Paused for ${pauseFor.toLowerCase()}`,
                    body: 'Visits resume automatically · nothing charged meanwhile',
                    kind: 'ok',
                  })
                }}
                className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(245,158,11,0.75)]"
              >
                <Hourglass className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                <span className="truncate">Pause now</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {endOpen && (
          <motion.div
            key="end"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex flex-col gap-3.5 rounded-t-[28px] bg-white p-5 pb-7 shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div aria-hidden className="mx-auto h-1.5 w-10 shrink-0 rounded-full bg-[#0B211B]/15" />

            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-rose-500/10 text-rose-600">
                <CircleX className="h-5 w-5" strokeWidth={2.2} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">End all care?</div>
                <div className="mt-0.5 truncate text-xs font-medium text-[#0B211B]/55">A coordinator calls to confirm first</div>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => setEndOpen(false)}
                aria-label="Close sheet"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
              >
                <X className="h-4 w-4" aria-hidden />
              </motion.button>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-[#230D14] p-4">
              <div aria-hidden className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-rose-400/20 blur-3xl" />
              <div className="relative">
                <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-rose-200/50">Before it ends</div>
                <div className="mt-3 flex flex-col gap-2.5">
                  <RoseRow k="Coordinator call" v="Within the hour" />
                  <RoseRow k="Final visit" v="Fri, Mar 15 · kept" />
                  <RoseRow k="Refund" v="None owed · current" />
                  <RoseRow k="Records" v="Sealed for 10 years" />
                </div>
              </div>
            </div>

            <div className="flex gap-2.5">
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => setEndOpen(false)}
                className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
              >
                <span className="truncate">Keep care</span>
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setEndOpen(false)
                  notify({
                    title: 'End request logged',
                    body: 'A coordinator will call within the hour to confirm',
                    kind: 'warn',
                  })
                }}
                className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-rose-500 to-red-500 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(244,63,94,0.75)]"
              >
                <CircleX className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                <span className="truncate">Request call</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
