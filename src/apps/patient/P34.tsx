import { useState } from 'react'
import { motion } from 'motion/react'
import {
  CalendarDays,
  Check,
  ChevronRight,
  CircleX,
  Clock,
  History,
  Hourglass,
  Repeat,
  Save,
} from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Chip, Pill } from '@/components/phone/Controls'
import { carePlan, lovedOnes } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const pauseOptions = ['2 weeks', '4 weeks', 'Custom date']

export function P34() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const father = lovedOnes[0]
  const [days, setDays] = useState<string[]>(['Mon', 'Wed', 'Fri'])
  const [pauseFor, setPauseFor] = useState('2 weeks')

  const toggleDay = (d: string) =>
    setDays((prev) => {
      const next = prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d].sort()
      notify({
        title: next.includes(d) ? `${d} added` : `${d} removed`,
        body: next.length === 0 ? 'Keep at least one visit day' : `${next.length} visits weekly`,
        kind: 'info',
      })
      return next
    })

  return (
    <Screen>
      <AppBar
        title="Manage care plan"
        subtitle={`${father.name} · ${carePlan.category.toLowerCase()} · week ${carePlan.week} of ${carePlan.weeks}`}
        onBack={() => navigate('/patient/p13')}
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard tone="mint" className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-[0.9px] text-brand-ink/70">Current series</span>
                <Pill tone="ok" className="bg-white/80">
                  <Repeat className="size-3.5" /> Active
                </Pill>
              </div>
              <div className="flex items-center gap-3">
                <span className="grid size-[46px] shrink-0 place-items-center rounded-full bg-white text-brand-ink">
                  <CalendarDays className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-brand-ink">{carePlan.caregiver}</div>
                  <div className="text-xs font-medium text-brand-ink/80">{carePlan.schedule}</div>
                </div>
              </div>
              <div className="h-2 rounded-full bg-white/65">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${carePlan.progress}%` }} />
              </div>
              <div className="text-xs font-medium text-brand-ink/90">{carePlan.remaining}</div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={History}
              body="Every change here is applied to the whole series, logged permanently, and your nurse is notified before the next visit."
            />
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Change visit days" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                {allDays.map((d) => (
                  <Chip key={d} on={days.includes(d)} onClick={() => toggleDay(d)}>
                    {days.includes(d) && <Check className="size-3.5" />}
                    {d}
                  </Chip>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="text-xs font-medium text-muted-foreground">
                  New total · {days.length} visits weekly
                </span>
                <button
                  onClick={() => notify({ title: 'Days applied', body: 'Nurse notified · availability re-checked', kind: 'ok' })}
                  className="text-xs font-bold text-primary"
                >
                  Apply days
                </button>
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Change visit time" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              <button
                onClick={() => notify({ title: 'Time change', body: 'Lakshmi is also free at 10:00 AM and 4:00 PM', kind: 'info' })}
                className="flex w-full items-center gap-3 px-2 py-1.5 text-left"
              >
                <IconTile icon={Clock} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-foreground">2:00 PM</div>
                  <div className="text-xs font-medium text-muted-foreground">
                    Lakshmi is also free at 10:00 AM and 4:00 PM
                  </div>
                </div>
                <ChevronRight className="size-4.5 shrink-0 text-muted-foreground" />
              </button>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Hourglass the series" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <IconTile icon={Hourglass} tone="mint" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-foreground">Hourglass for a while</div>
                  <div className="text-xs font-medium text-muted-foreground">
                    For hospital stays, travel or family reasons
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {pauseOptions.map((p) => (
                  <Chip key={p} on={pauseFor === p} onClick={() => setPauseFor(p)}>
                    {pauseFor === p && <Check className="size-3.5" />}
                    {p}
                  </Chip>
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Repeat className="size-3.5 shrink-0 text-primary" />
                Visits resume automatically. You are never charged for paused weeks.
              </div>
              <SmoothButton
                variant="soft"
                shape="pill"
                className="w-full"
                onClick={() => notify({ title: `Paused for ${pauseFor.toLowerCase()}`, body: 'Visits resume automatically · nothing charged meanwhile', kind: 'ok' })}
              >
                <Hourglass className="size-4" /> Hourglass from March 15
              </SmoothButton>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="End the series" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard tone="error" className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <IconTile icon={CircleX} tone="destructive" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-destructive">End care completely</div>
                  <div className="mt-0.5 text-[13px] font-medium leading-snug text-destructive/80">
                    Cancels all 17 remaining visits permanently
                  </div>
                </div>
              </div>
              <div className="text-xs font-medium leading-snug text-destructive/80">
                The final visit is Friday, March 15. Your care consent stays active until you withdraw it separately. A
                care team member will call to confirm before anything is cancelled.
              </div>
              <SmoothButton
                variant="outline"
                shape="pill"
                className="w-full border-destructive text-destructive"
                onClick={() => notify({ title: 'End request logged', body: 'A coordinator will call within the hour to confirm', kind: 'warn' })}
              >
                <CircleX className="size-4" /> Request to end care
              </SmoothButton>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of plan management" />
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <SmoothButton
          variant="default"
          shape="pill"
          size="lg"
          className="w-full"
          onClick={() => notify({ title: 'Plan changes saved', body: 'Sealed in your plan record · consent stays valid', kind: 'ok' })}
        >
          <Save className="size-4" /> Save plan changes
        </SmoothButton>
        <div className="text-center text-xs font-medium text-muted-foreground">
          Changes are sealed in your plan record · signed consent stays valid.
        </div>
      </FootBar>
    </Screen>
  )
}
