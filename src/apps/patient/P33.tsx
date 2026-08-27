import { useState } from 'react'
import { motion } from 'motion/react'
import { CalendarDays, Check, ArrowLeft, ChevronRight, Clock } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Chip } from '@/components/phone/Controls'
import { caregivers, visits } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const times = ['9:00 AM', '10:00 AM', '1:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']

export function P33() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const nurse = caregivers[0]
  const pending = visits.find((v) => v.status === 'pending')
  const [day, setDay] = useState(21)
  const [time, setTime] = useState('10:00 AM')

  const pickDay = (d: number) => {
    if (d !== 15 && d !== 21) {
      notify({ title: 'Not available', body: 'Lakshmi is only free on the highlighted days this week', kind: 'info' })
      return
    }
    setDay(d)
  }

  return (
    <Screen>
      <AppBar
        title="Reschedule visit"
        subtitle={`${pending ? `${pending.day}, ${pending.date}` : 'Friday, March 15'} · 2:00 PM with ${nurse.name.split(' ')[0]}`}
        onBack={() => navigate('/patient/p15')}
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <SectionHeader label="Pick a new date" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard>
              <div className="mb-3 flex items-center justify-between">
                <ArrowLeft
                  className="size-5 text-muted-foreground"
                  onClick={() => notify({ title: 'April', body: 'Series ends April 26 · no April moves needed', kind: 'info' })}
                />
                <span className="flex items-center gap-1.5 text-sm font-bold text-foreground">
                  <CalendarDays className="size-4" /> March 2024
                </span>
                <ChevronRight
                  className="size-5 text-muted-foreground"
                  onClick={() => notify({ title: 'April', body: 'Series ends April 26 · no April moves needed', kind: 'info' })}
                />
              </div>
              <div className="grid grid-cols-7 gap-1.5 text-center">
                {weekdays.map((w, i) => (
                  <span key={`w${i}`} className="text-[11px] font-bold uppercase text-muted-foreground">
                    {w}
                  </span>
                ))}
                {[11, 12, 13, 14].map((d) => (
                  <button
                    key={d}
                    onClick={() => pickDay(d)}
                    className="grid h-[34px] place-items-center rounded-full text-xs font-medium text-muted-foreground"
                  >
                    {d}
                  </button>
                ))}
                <button
                  onClick={() => pickDay(15)}
                  className={cn(
                    'grid h-[34px] place-items-center rounded-full text-xs font-bold',
                    day === 15 ? 'bg-primary text-white' : 'bg-tonal text-foreground/60',
                  )}
                >
                  15
                </button>
                {[16, 17].map((d) => (
                  <button
                    key={d}
                    onClick={() => pickDay(d)}
                    className="grid h-[34px] place-items-center rounded-full text-xs font-medium text-muted-foreground"
                  >
                    {d}
                  </button>
                ))}
                {[18, 19, 20].map((d) => (
                  <button
                    key={d}
                    onClick={() => pickDay(d)}
                    className="grid h-[34px] place-items-center rounded-full text-xs font-medium text-muted-foreground"
                  >
                    {d}
                  </button>
                ))}
                <button
                  onClick={() => pickDay(21)}
                  className={cn(
                    'grid h-[34px] place-items-center rounded-full text-xs font-bold',
                    day === 21 ? 'bg-primary text-white' : 'bg-mint text-brand-ink',
                  )}
                >
                  21
                </button>
                {[22, 23, 24].map((d) => (
                  <button
                    key={d}
                    onClick={() => pickDay(d)}
                    className="grid h-[34px] place-items-center rounded-full text-xs font-medium text-muted-foreground"
                  >
                    {d}
                  </button>
                ))}
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label={`Pick a new time · ${day === 15 ? 'Friday, March 15' : 'Thursday, March 21'}`} />
          </motion.div>
          <motion.div variants={item} className="flex flex-wrap gap-2">
            {times.map((t) => (
              <Chip key={t} on={time === t} onClick={() => setTime(t)}>
                {time === t && <Check className="size-3.5" />}
                {t}
              </Chip>
            ))}
          </motion.div>

          <motion.div variants={item}>
            <ScreenCard tone="mint" className="flex items-center gap-3">
              <IconTile icon={Clock} tone="white" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-brand-ink">
                  {nurse.name.split(' ')[0]} is free at {time}
                </div>
                <div className="text-xs font-medium text-brand-ink/80">
                  Availability re-checked just now · no new offer needed
                </div>
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={CalendarDays}
              body="This moves only this one visit. Your regular Monday, Wednesday, Friday series stays unchanged. The change is logged in your visit history."
            />
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of reschedule" />
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <SmoothButton
          variant="default"
          shape="pill"
          size="lg"
          className="w-full"
          onClick={() => {
            notify({ title: 'Visit rescheduled', body: `Moved to March ${day} at ${time} · logged in your history`, kind: 'ok' })
            navigate('/patient/p15')
          }}
        >
          Confirm new time
        </SmoothButton>
        <SmoothButton variant="outline" shape="pill" size="lg" className="w-full" onClick={() => navigate('/patient/p15')}>
          Cancel reschedule
        </SmoothButton>
      </FootBar>
    </Screen>
  )
}
