import { useState } from 'react'
import { motion } from 'motion/react'
import { Clock, Save, ShieldCheck, Umbrella } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Kicker, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { availability } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const windows: { label: string; time: string }[] = [
  { label: 'Morning', time: '8 AM – 2 PM' },
  { label: 'Day shift', time: '8 AM – 6 PM' },
  { label: 'Full day', time: '8 AM – 8 PM' },
]

const HOURS: Record<string, number> = {
  '8 AM – 2 PM': 6,
  '2 PM – 8 PM': 6,
  '8 AM – 6 PM': 10,
  '8 AM – 8 PM': 12,
  Off: 0,
}

export function PR05() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [days, setDays] = useState(availability.map((d) => ({ ...d })))
  const firstOpen = Math.max(0, days.findIndex((d) => !d.off))
  const [selected, setSelected] = useState(firstOpen)
  const openCount = days.filter((d) => !d.off).length
  const day = days[selected]

  const toggleDay = () => {
    setDays((prev) => prev.map((d, i) => (i === selected ? { ...d, off: !d.off, hours: d.off ? '8 AM – 6 PM' : 'Off' } : d)))
    notify({
      title: `${day.day} ${day.off ? 'opened' : 'closed'}`,
      body: day.off ? 'Offers can now match this day' : 'No offers will be sent for this day',
      kind: 'info',
    })
  }

  const setWindow = (w: { label: string; time: string }) => {
    setDays((prev) => prev.map((d, i) => (i === selected ? { ...d, hours: w.time, off: false } : d)))
    notify({ title: `${day.day} set to ${w.label}`, body: `${w.time} · offers will match this window`, kind: 'info' })
  }

  return (
    <Screen>
      <AppBar
        title="My availability"
        subtitle="Offers are matched to these windows only"
        onBack={() => navigate('/professional/pr11')}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Kicker>
                        <Clock className="h-3 w-3 text-emerald-300/80" aria-hidden />
                        Matching window · this week
                      </Kicker>
                      <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                        {openCount} of 7 days{' '}
                        <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">open</span>
                      </h2>
                      <p className="mt-0.5 text-[11px] font-semibold text-emerald-100/50">
                        Tap a day below to edit its window
                      </p>
                    </div>
                    <Chip intent="live" light dot className="shrink-0">
                      Matching
                    </Chip>
                  </div>

                  <div className="mt-5 flex h-28 items-end gap-2">
                    {days.map((d, i) => {
                      const hrs = HOURS[d.hours] ?? 0
                      const isActive = i === selected
                      const pct = Math.max(6, (hrs / 12) * 100)
                      return (
                        <motion.button
                          key={d.day}
                          type="button"
                          whileTap={{ scale: 0.93 }}
                          onClick={() => setSelected(i)}
                          aria-label={`${d.day}, ${d.off ? 'off' : d.hours}`}
                          className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5"
                        >
                          <span
                            className={cn(
                              'text-[9px] font-extrabold tabular-nums',
                              isActive ? 'text-white' : d.off ? 'text-emerald-100/25' : 'text-emerald-100/55',
                            )}
                          >
                            {d.off ? '—' : `${hrs}h`}
                          </span>
                          <span className="flex h-full w-full items-end overflow-hidden rounded-t-xl bg-white/[0.06]">
                            <motion.span
                              initial={{ height: 0 }}
                              animate={{ height: d.off ? '6%' : `${pct}%` }}
                              transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: 'easeOut' }}
                              className={cn(
                                'w-full rounded-t-xl',
                                d.off
                                  ? 'bg-white/[0.1]'
                                  : isActive
                                    ? 'bg-gradient-to-t from-emerald-400 to-teal-300 shadow-[0_-8px_20px_-8px_rgba(52,211,153,0.7)]'
                                    : 'bg-gradient-to-t from-emerald-500/60 to-teal-400/50',
                              )}
                            />
                          </span>
                          <span
                            className={cn(
                              'text-[9px] font-extrabold uppercase tracking-wide',
                              isActive ? 'text-white' : 'text-emerald-100/40',
                            )}
                          >
                            {d.day.slice(0, 3)}
                          </span>
                        </motion.button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">{day.day}</div>
                      <div className="mt-0.5 text-xs font-semibold text-[#0B211B]/50">
                        {day.off ? 'No offers will be sent' : `Offers matched · ${day.hours}`}
                      </div>
                    </div>
                    <Chip intent={day.off ? 'neutral' : 'success'} dot={!day.off}>
                      {day.off ? 'Off' : 'Open'}
                    </Chip>
                  </div>

                  <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.04] px-4 py-3.5">
                    <span className={cn('h-2.5 w-2.5 shrink-0 rounded-full', day.off ? 'bg-[#0B211B]/20' : 'bg-emerald-500')} />
                    <span className="min-w-0 flex-1 text-[13px] font-bold text-[#0B211B]/75">Available for offers</span>
                    <button
                      type="button"
                      onClick={toggleDay}
                      aria-label={`Toggle ${day.day}`}
                      className={cn(
                        'relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200',
                        day.off ? 'bg-[#0B211B]/[0.15]' : 'bg-emerald-500',
                      )}
                    >
                      <span
                        className={cn(
                          'absolute top-1 h-5 w-5 rounded-full bg-white shadow-[0_2px_6px_rgba(11,33,27,0.3)] transition-all duration-200',
                          day.off ? 'left-1' : 'left-6',
                        )}
                      />
                    </button>
                  </div>

                  {!day.off && (
                    <div className="mt-3 flex flex-col gap-2">
                      {windows.map((w) => {
                        const active = day.hours === w.time
                        return (
                          <motion.button
                            key={w.label}
                            type="button"
                            whileTap={{ scale: 0.985 }}
                            onClick={() => setWindow(w)}
                            className={cn(
                              'flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors',
                              active ? 'bg-emerald-500/[0.08]' : 'bg-[#0B211B]/[0.03] hover:bg-[#0B211B]/[0.055]',
                            )}
                          >
                            <span
                              className={cn(
                                'grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full',
                                active ? 'bg-emerald-500' : 'bg-[#0B211B]/[0.12]',
                              )}
                            >
                              {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                            </span>
                            <span
                              className={cn(
                                'min-w-0 flex-1 text-[13px] font-bold tracking-tight',
                                active ? 'text-emerald-800' : 'text-[#0B211B]/70',
                              )}
                            >
                              {w.label}
                            </span>
                            <span
                              className={cn(
                                'shrink-0 font-mono text-[11px] font-bold tabular-nums',
                                active ? 'text-emerald-700' : 'text-[#0B211B]/45',
                              )}
                            >
                              {w.time}
                            </span>
                          </motion.button>
                        )
                      })}
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Time off" trailing={<Chip intent="info">Approved</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.985 }}
                onClick={() => notify({ title: 'Time off', body: 'March 25 – 29 · approved · patients already covered', kind: 'info' })}
                className="block w-full text-left"
              >
                <Card>
                  <div className="flex items-center gap-3.5 p-4">
                    <Tile icon={Umbrella} tone="info" size="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">March 25 – 29</div>
                      <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">Approved leave · patients already covered</div>
                    </div>
                    <Chip intent="success">Set</Chip>
                  </div>
                </Card>
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="warning" className="flex items-start gap-3 p-4">
                <Tile icon={ShieldCheck} tone="warning" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Priority stays high when windows are honest. Declining after accepting, or missing sessions, lowers your match rank.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of availability" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            notify({ title: 'Availability saved', body: `${openCount} days open · live for matching now`, kind: 'ok' })
            navigate('/professional/pr11')
          }}
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
        >
          <Save className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          Save availability
        </motion.button>
      </FootBar>
    </Screen>
  )
}
