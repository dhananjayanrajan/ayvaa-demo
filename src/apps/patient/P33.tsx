import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, CalendarDays, Check, ChevronLeft, ChevronRight, Clock, ShieldCheck } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { caregivers, visits } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

type DayCell = { d: number; state: 'open' | 'nurse' | 'off' }

const marchDays: DayCell[] = [
  ...[11, 12, 13, 14].map((d) => ({ d, state: 'off' as const })),
  { d: 15, state: 'open' },
  ...[16, 17].map((d) => ({ d, state: 'off' as const })),
  ...[18, 19, 20].map((d) => ({ d, state: 'off' as const })),
  { d: 21, state: 'nurse' },
  ...[22, 23, 24].map((d) => ({ d, state: 'off' as const })),
]

const timeSlots = [
  { t: '9:00 AM', state: 'taken' },
  { t: '10:00 AM', state: 'free' },
  { t: '11:30 AM', state: 'taken' },
  { t: '1:00 PM', state: 'free' },
  { t: '2:00 PM', state: 'free' },
  { t: '4:00 PM', state: 'free' },
  { t: '5:30 PM', state: 'taken' },
]

export function P33() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const nurse = caregivers[0]
  const nurseFirst = nurse.name.split(' ')[0]
  const pending = visits.find((v) => v.status === 'pending')

  const [day, setDay] = useState<number | null>(null)
  const [time, setTime] = useState<string | null>(null)

  const ready = day !== null && time !== null
  const dayLabel = day === 15 ? 'Fri, Mar 15' : day === 21 ? 'Thu, Mar 21' : null

  const pickDay = (cell: DayCell) => {
    if (cell.state === 'off') {
      notify({ title: 'Not available', body: `${nurseFirst} is only free on the highlighted days this week`, kind: 'info' })
      return
    }
    setDay(cell.d)
    notify({
      title: cell.state === 'nurse' ? 'Best choice' : 'Open day',
      body:
        cell.state === 'nurse'
          ? `${nurseFirst} is free all day on March ${cell.d}`
          : `March ${cell.d} works · availability re-checked on confirm`,
      kind: 'ok',
    })
  }

  const pickTime = (slot: (typeof timeSlots)[number]) => {
    if (slot.state === 'taken') {
      notify({ title: `${slot.t} taken`, body: 'Another family holds this slot · pick an open time', kind: 'info' })
      return
    }
    setTime(slot.t)
  }

  return (
    <Screen>
      <AppBar
        title="Reschedule visit"
        subtitle={`${pending ? `${pending.day}, ${pending.date}` : 'Friday, March 15'} · 2:00 PM with ${nurseFirst}`}
        onBack={() => navigate('/patient/p15')}
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
                  <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
                    <CalendarDays className="h-3 w-3" aria-hidden />
                    Moving one visit · series untouched
                  </div>

                  <div className="mt-4 flex items-stretch gap-3">
                    <div className="flex min-w-0 flex-1 flex-col gap-1 rounded-2xl bg-white/[0.05] px-3.5 py-3">
                      <span className="text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/35">From</span>
                      <span className="truncate text-[12.5px] font-bold text-emerald-100/50 line-through decoration-emerald-100/30">
                        Fri, Mar 15
                      </span>
                      <span className="truncate font-mono text-[11px] font-bold text-emerald-100/40 line-through decoration-emerald-100/30">
                        2:00 PM
                      </span>
                    </div>

                    <span className="grid shrink-0 place-items-center">
                      <motion.span
                        animate={{ x: ready ? [0, 4, 0] : 0 }}
                        transition={{ duration: 1.2, repeat: ready ? Infinity : 0, ease: 'easeInOut' }}
                      >
                        <ArrowRight className="h-5 w-5 text-emerald-300" strokeWidth={2.6} aria-hidden />
                      </motion.span>
                    </span>

                    <div
                      className={cn(
                        'flex min-w-0 flex-1 flex-col gap-1 rounded-2xl px-3.5 py-3 transition-colors duration-300',
                        ready ? 'bg-emerald-400/[0.14]' : 'bg-white/[0.05]',
                      )}
                    >
                      <span className={cn('text-[8.5px] font-extrabold uppercase tracking-[0.14em]', ready ? 'text-emerald-200' : 'text-emerald-100/35')}>
                        To
                      </span>
                      <span className={cn('truncate text-[12.5px] font-bold', ready ? 'text-white' : 'text-emerald-100/40')}>
                        {dayLabel ?? 'Pick a day'}
                      </span>
                      <span className={cn('truncate font-mono text-[11px] font-bold', ready ? 'text-emerald-200' : 'text-emerald-100/40')}>
                        {time ?? 'Pick a time'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-white/[0.06] px-3.5 py-3">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-300" strokeWidth={2.4} aria-hidden />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[12px] font-bold text-emerald-50/90">
                        {ready ? `${nurseFirst} confirmed free at ${time}` : 'Availability re-checked just now'}
                      </span>
                      <span className="mt-0.5 block truncate text-[10px] font-semibold text-emerald-100/45">
                        {ready ? `${dayLabel} · no new offer needed` : 'No new offer needed · pick a slot below'}
                      </span>
                    </span>
                    {ready && (
                      <span className="shrink-0 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-200">
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Pick a new date" trailing={<Chip intent="info">March</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => notify({ title: 'February', body: 'This visit is in March · nothing earlier to move to', kind: 'info' })}
                      aria-label="Previous month"
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden />
                    </motion.button>
                    <span className="flex items-center gap-1.5 text-[13px] font-extrabold tracking-tight text-[#0B211B]">
                      <CalendarDays className="h-3.5 w-3.5 text-emerald-700" aria-hidden />
                      March 2026
                    </span>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => notify({ title: 'April', body: 'Series ends April 26 · no April moves needed', kind: 'info' })}
                      aria-label="Next month"
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                    >
                      <ChevronRight className="h-4 w-4" aria-hidden />
                    </motion.button>
                  </div>

                  <div className="mt-4 grid grid-cols-7 gap-1.5 text-center">
                    {weekdays.map((w, i) => (
                      <span key={`w${i}`} className="text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#0B211B]/35">
                        {w}
                      </span>
                    ))}
                    {marchDays.map((cell) => {
                      const selected = day === cell.d
                      const selectable = cell.state !== 'off'
                      return (
                        <motion.button
                          key={cell.d}
                          type="button"
                          whileTap={selectable ? { scale: 0.88 } : undefined}
                          onClick={() => pickDay(cell)}
                          aria-label={`March ${cell.d}`}
                          className={cn(
                            'grid h-[38px] place-items-center rounded-xl text-[12px] font-bold transition-colors',
                            selected
                              ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_8px_18px_-8px_rgba(16,185,129,0.8)]'
                              : cell.state === 'nurse'
                                ? 'bg-emerald-500/[0.14] text-emerald-700'
                                : cell.state === 'open'
                                  ? 'bg-emerald-500/[0.08] text-emerald-700'
                                  : 'bg-[#0B211B]/[0.03] text-[#0B211B]/25',
                          )}
                        >
                          {cell.d}
                        </motion.button>
                      )
                    })}
                  </div>

                  <div className="mt-3 flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.1em] text-[#0B211B]/40">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                      Free all day
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500/40" aria-hidden />
                      Open
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#0B211B]/15" aria-hidden />
                      Taken
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section
                label={`Pick a time · ${dayLabel ?? 'choose a day first'}`}
                trailing={<Chip intent={time ? 'success' : 'neutral'}>{time ?? '4 open'}</Chip>}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                <div className="grid grid-cols-3 gap-2 p-4">
                  {timeSlots.map((slot) => {
                    const selected = time === slot.t
                    const taken = slot.state === 'taken'
                    return (
                      <motion.button
                        key={slot.t}
                        type="button"
                        whileTap={taken ? undefined : { scale: 0.93 }}
                        onClick={() => pickTime(slot)}
                        className={cn(
                          'flex items-center justify-center gap-1.5 rounded-2xl py-3 text-[12px] font-bold transition-colors',
                          selected
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_8px_18px_-8px_rgba(16,185,129,0.8)]'
                            : taken
                              ? 'bg-[#0B211B]/[0.03] text-[#0B211B]/25'
                              : 'bg-emerald-500/[0.1] text-emerald-700',
                        )}
                      >
                        {selected && <Check className="h-3 w-3 shrink-0" strokeWidth={3.5} aria-hidden />}
                        {slot.t}
                      </motion.button>
                    )
                  })}
                </div>
              </Card>
            </motion.div>

            {ready && (
              <motion.div variants={rise}>
                <Card intent="success">
                  <div className="p-5">
                    <div className="flex items-center gap-3.5">
                      <Tile icon={Clock} tone="success" size="lg" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[15px] font-extrabold tracking-tight text-[#0B211B]">
                          {nurseFirst} confirmed free
                        </div>
                        <div className="mt-0.5 truncate text-[11.5px] font-semibold text-[#0B211B]/55">
                          {dayLabel} · {time} · re-checked just now
                        </div>
                      </div>
                      <Chip intent="success">Verified</Chip>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={CalendarDays} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  This moves only this one visit. Your regular Monday, Wednesday, Friday series stays unchanged. The change
                  is logged in your visit history.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of reschedule" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <div className="flex gap-2.5">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/patient/p15')}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
          >
            <span className="truncate">Cancel</span>
          </motion.button>
          <motion.button
            type="button"
            whileTap={ready ? { scale: 0.97 } : undefined}
            disabled={!ready}
            onClick={() => {
              notify({
                title: 'Visit rescheduled',
                body: `Moved to March ${day} at ${time} · logged in your history`,
                kind: 'ok',
              })
              navigate('/patient/p15')
            }}
            className={cn(
              'flex flex-[1.4] items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-all duration-300',
              ready
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
                : 'bg-[#0B211B]/[0.06] text-[#0B211B]/30',
            )}
          >
            <span className="truncate">{ready ? 'Confirm new time' : 'Pick day and time'}</span>
          </motion.button>
        </div>
      </FootBar>
    </Screen>
  )
}
