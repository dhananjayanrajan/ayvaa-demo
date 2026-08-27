import { useState } from 'react'
import { motion } from 'motion/react'
import { Clock, Lock, Save, Umbrella } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Field, Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { availability } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function PR05() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [days, setDays] = useState(availability)
  const openCount = days.filter((d) => !d.off).length

  const toggleDay = (day: string) => {
    setDays((prev) =>
      prev.map((d) => (d.day === day ? { ...d, off: !d.off, hours: d.off ? '8 AM – 6 PM' : 'Off' } : d)),
    )
    const nowOpen = days.filter((d) => d.day !== day && !d.off).length + 1
    notify({ title: `${day} updated`, body: `${nowOpen} days open · offers matched to these windows`, kind: 'info' })
  }

  return (
    <Screen>
      <AppBar title="My availability" subtitle="Offers are matched to these windows only" onBack={() => navigate('/professional/pr11')} />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <InfoCard
              icon={Lock}
              body="When you accept an offer, we check these windows live. Keep them honest so you never receive an offer you cannot take."
            />
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Weekly windows" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {days.map((d, i) => (
                <div key={d.day}>
                  {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
                  <div className="flex items-center gap-2.5 px-2 py-1.5">
                    <span className="w-[52px] shrink-0 text-sm font-bold text-foreground">{d.day}</span>
                    {d.off ? (
                      <span className="min-w-0 flex-1 text-xs font-medium text-muted-foreground">Not available</span>
                    ) : (
                      <>
                        <div className="min-w-0 flex-1">
                          <Field value={d.hours} hint="From · to" />
                        </div>
                      </>
                    )}
                    <button
                      onClick={() => toggleDay(d.day)}
                      className={cn('relative h-7 w-12 shrink-0 rounded-full transition-colors', !d.off ? 'bg-primary' : 'bg-[#CBD9D3]')}
                      aria-label={`Toggle ${d.day}`}
                    >
                      <span className={cn('absolute top-1 size-5 rounded-full bg-white transition-all', !d.off ? 'left-6' : 'left-1')} />
                    </button>
                  </div>
                </div>
              ))}
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Time off" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="flex items-center gap-3">
              <IconTile icon={Umbrella} tone="mint" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-foreground">March 25 to March 29</div>
                <div className="text-xs font-medium text-muted-foreground">Approved · no offers will be sent this week</div>
              </div>
              <Pill tone="grey">Set</Pill>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <ScreenCard tone="tonal" className="flex items-center gap-3">
              <IconTile icon={Clock} tone="mint" />
              <div className="min-w-0 flex-1 text-[13px] font-medium text-foreground/85">
                {openCount} days open · matching priority stays high when your windows are accurate
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={Lock}
              body="Availability changes are logged. Declining offers you accepted, or missing sessions, affects your matching priority."
            />
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of availability" />
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
            notify({ title: 'Availability saved', body: `${openCount} days open · logged and live for matching`, kind: 'ok' })
            navigate('/professional/pr11')
          }}
        >
          <Save className="size-4" /> Save availability
        </SmoothButton>
      </FootBar>
    </Screen>
  )
}
