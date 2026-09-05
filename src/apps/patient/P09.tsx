import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Footprints, ShieldCheck } from 'lucide-react'
import { AppBar } from '@/components/base/phone/app-bar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/base/phone/screen'
import { Chip, Panel, Section, Tile, rise, stagger } from '@/components/base/phone/kit'
import { BookingHero } from '@/components/patterns/heroes/booking-hero'
import { WhoCard } from '@/components/patterns/cards/who-card'
import { CategoryGrid } from '@/components/patterns/cards/category-grid'
import { ScheduleCard } from '@/components/patterns/cards/schedule-card'
import { EstimateCard } from '@/components/patterns/cards/estimate-card'
import { WhoSheet } from '@/components/patterns/sheets/who-sheet'
import { TimeSheet } from '@/components/patterns/sheets/time-sheet'
import { ContinueButton } from '@/components/patterns/actions'
import type { ContinueState } from '@/components/patterns/actions'
import {
  bookingCategories,
  bookingSummaryLine,
  buildEstimate,
  durations,
  timeWindows,
} from '@/data/patientBooking'
import { lovedOnes } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

export function P09() {
  const { notify } = useDemo()
  const { navigate } = useRouter()

  const [who, setWho] = useState(0)
  const [category, setCategory] = useState('Elderly care')
  const [schedule, setSchedule] = useState('recurring')
  const [days, setDays] = useState<string[]>(['Mon', 'Wed', 'Fri'])
  const [winId, setWinId] = useState('afternoon')
  const [duration, setDuration] = useState('120')
  const [sheet, setSheet] = useState<'none' | 'who' | 'time'>('none')
  const [continueState, setContinueState] = useState<ContinueState>('idle')

  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  function stage(delay: number, run: () => void) {
    timers.current.push(setTimeout(run, delay))
  }

  const person = lovedOnes[who]
  const dur = durations.find((d) => d.id === duration) ?? durations[0]
  const win = timeWindows.find((w) => w.id === winId) ?? timeWindows[0]

  const estimate = buildEstimate(schedule, days, duration)
  const blocked = schedule !== 'one' && days.length === 0
  const cadence: 'visit' | 'week' = schedule === 'one' ? 'visit' : 'week'

  function pickDay(d: string) {
    if (schedule === 'one') {
      setDays([d])
      return
    }
    setDays((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]))
  }

  function changeSchedule(id: string) {
    setSchedule(id)
    if (id === 'one' && days.length > 1) setDays([days[0]])
  }

  function closeSheet() {
    setSheet('none')
  }

  function pickWho(index: number) {
    const p = lovedOnes[index]
    setWho(index)
    closeSheet()
    notify({
      title: p.name,
      body: `Age ${p.age}, ${p.category}. Booking moved to this profile`,
      kind: 'info',
    })
  }

  function continueToMatching() {
    if (blocked || continueState !== 'idle') return
    setContinueState('working')
    stage(950, () => setContinueState('done'))
    stage(1600, () => {
      notify({
        title: 'Care details saved',
        body: `${category}, ${estimate.visitCount} ${estimate.visitCount > 1 ? 'visits' : 'visit'}, ${win.label.toLowerCase()}. Matching nearby caregivers`,
        kind: 'ok',
      })
      navigate('/patient/p10')
    })
  }

  const durationOptions = durations.map((option) => ({
    option,
    weekly: option.price * estimate.visitCount,
  }))

  return (
    <Screen>
      <AppBar
        title="Book care"
        subtitle="Details flow straight into caregiver matching"
        onBack={() => navigate('/patient/p06')}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <BookingHero
                estimate={estimate}
                summaryLine={bookingSummaryLine(
                  person.name.split(' ')[0],
                  category,
                  estimate,
                  dur.label,
                  schedule,
                )}
                lovedFirstName={person.name.split(' ')[0]}
                category={category}
                days={days}
                windowLabel={win.label}
                durationLabel={dur.label}
                cadence={cadence}
                onOpenWho={() => setSheet('who')}
                onOpenTime={() => setSheet('time')}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Who receives the care" trailing={<Chip intent="neutral">{lovedOnes.length} on plan</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <WhoCard who={who} onOpen={() => setSheet('who')} />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Type of support needed" />
            </motion.div>

            <motion.div variants={rise}>
              <CategoryGrid
                category={category}
                onSelect={(label) => {
                  setCategory(label)
                  const c = bookingCategories.find((x) => x.label === label)
                  if (c) notify({ title: label, body: `${c.hint}. Matching will key off this`, kind: 'info' })
                }}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Section
                label="Schedule"
                trailing={<Chip intent="info">{estimate.visitCount} × {dur.label}</Chip>}
              />
            </motion.div>

            <motion.div variants={rise}>
              <ScheduleCard
                schedule={schedule}
                days={days}
                win={win}
                durationLabel={dur.label}
                durationPrice={dur.price}
                onSchedule={changeSchedule}
                onPickDay={pickDay}
                onOpenTime={() => setSheet('time')}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="How this adds up" trailing={<Chip intent="success">Live</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <EstimateCard
                estimate={estimate}
                cadence={cadence}
                lineLabel={`${estimate.visitCount} × ${dur.label}`}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={Footprints} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Matching starts the moment you continue — nearby, licence-verified caregivers get
                  the offer with these exact details, and you watch every response live.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of care details" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <div className="flex flex-col gap-2">
          <ContinueButton
            blocked={blocked}
            state={continueState}
            onPress={continueToMatching}
          />
          <div className="flex items-center justify-center gap-1.5 text-[10.5px] font-semibold text-[#0B211B]/45">
            <ShieldCheck className="h-3 w-3 shrink-0" aria-hidden />
            Nothing is charged until you confirm a matched caregiver
          </div>
        </div>
      </FootBar>

      <AnimatePresence>
        {sheet !== 'none' && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSheet}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheet === 'who' && (
          <WhoSheet
            key="who-sheet"
            who={who}
            onPick={pickWho}
            onAdd={() =>
              notify({
                title: 'Add loved one',
                body: 'Invite a family member from loved ones management',
                kind: 'info',
              })
            }
            onClose={closeSheet}
          />
        )}
        {sheet === 'time' && (
          <TimeSheet
            key="time-sheet"
            win={win}
            duration={duration}
            durationOptions={durationOptions}
            visitCount={estimate.visitCount}
            onWindow={setWinId}
            onDuration={setDuration}
            onSet={closeSheet}
            onClose={closeSheet}
          />
        )}
      </AnimatePresence>
    </Screen>
  )
}
