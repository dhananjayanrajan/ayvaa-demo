import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ShieldCheck } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Chip, Section, rise, stagger } from '@/components/phone/kit'
import { NoteStrip } from '@/components/phone/NoteStrip'
import { availability } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { AvailabilityHero } from '@/components/availability/AvailabilitySet'
import { WeekBars } from '@/components/availability/AvailabilitySet'
import { DayEditorCard } from '@/components/availability/AvailabilitySet'
import { TimeOffCard } from '@/components/availability/AvailabilitySet'
import { SaveAvailabilityButton, type SaveStatus } from '@/components/availability/AvailabilitySet'
import { StatusStrip } from '@/components/phone/StatusStrip'
import { WINDOWS, hoursFor, type DayAvailability } from '@/data/availabilityData'

type Days = DayAvailability[]

const normalize = (rows: typeof availability): Days => rows.map((d) => ({ day: d.day, hours: d.hours, off: d.off ?? false }))

export function PR05() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [days, setDays] = useState<Days>(normalize(availability))
  const [dirty, setDirty] = useState(false)
  const [status, setStatus] = useState<SaveStatus>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const firstOpen = Math.max(0, days.findIndex((d) => !d.off))
  const [selected, setSelected] = useState(firstOpen)
  const day = days[selected]
  const openCount = days.filter((d) => !d.off).length
  const weeklyHours = days.reduce((sum, d) => sum + hoursFor(d.hours), 0)
  const longest = days.reduce((best, d) => (hoursFor(d.hours) > hoursFor(best.hours) ? d : best), days[0])
  const peakDay = weeklyHours > 0 ? longest.day.slice(0, 3) : '—'

  const toggleDay = () => {
    setDays((prev) => prev.map((d, i) => (i === selected ? { ...d, off: !d.off, hours: d.off ? '8 AM – 6 PM' : 'Off' } : d)))
    setDirty(true)
    setStatus('idle')
    notify({
      title: `${day.day} ${day.off ? 'opened' : 'closed'}`,
      body: day.off ? 'Offers can now match this day' : 'No offers will be sent for this day',
      kind: 'info',
    })
  }

  const selectWindow = (time: string) => {
    const w = WINDOWS.find((x) => x.time === time)
    if (!w) return
    setDays((prev) => prev.map((d, i) => (i === selected ? { ...d, hours: w.time, off: false } : d)))
    setDirty(true)
    setStatus('idle')
    notify({ title: `${day.day} set to ${w.label}`, body: `${w.time} · offers will match this window`, kind: 'info' })
  }

  const save = () => {
    if (!dirty || status !== 'idle') return
    setStatus('saving')
    timers.current.push(
      setTimeout(() => {
        setStatus('saved')
        setDirty(false)
        notify({ title: 'Availability saved', body: `${openCount} days open · live for matching now`, kind: 'ok' })
        timers.current.push(setTimeout(() => navigate('/professional/pr11'), 1600))
      }, 1100),
    )
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
              <AvailabilityHero
                openCount={openCount}
                weeklyHours={weeklyHours}
                peakDay={peakDay}
                dirty={dirty}
              >
                <WeekBars days={days} selected={selected} onSelect={setSelected} />
              </AvailabilityHero>
            </motion.div>

            <motion.div variants={rise}>
              <DayEditorCard day={day} onToggle={toggleDay} onSelectWindow={selectWindow} />
            </motion.div>

            <AnimatePresence>
              {status === 'saved' && (
                <motion.div variants={rise} key="confirmation">
                  <StatusStrip>Availability saved · {openCount} days open · visible to matching now</StatusStrip>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={rise}>
              <Section label="Time off" trailing={<Chip intent="info">Approved</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <TimeOffCard
                range="March 25 – 29"
                note="Approved leave · patients already covered"
                onPress={() => notify({ title: 'Time off', body: 'March 25 – 29 · approved · patients already covered', kind: 'info' })}
              />
            </motion.div>

            <motion.div variants={rise}>
              <NoteStrip intent="warning" icon={ShieldCheck}>
                Priority stays high when windows are honest. Declining after accepting, or missing sessions, lowers your match rank.
              </NoteStrip>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of availability" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <SaveAvailabilityButton label="Save availability" status={status} disabled={!dirty} onPress={save} />
      </FootBar>
    </Screen>
  )
}
