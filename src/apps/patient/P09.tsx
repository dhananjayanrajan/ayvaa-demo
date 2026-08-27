import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, CalendarDays, Check, CheckCircle2, Clock, ShieldCheck } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Chip, Field, Pill } from '@/components/phone/Controls'
import { carePlan, lovedOnes } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

const categories = ['Elderly care', 'Pediatric', 'Post-operative', 'Chronic', 'Disability', 'Palliative', 'Special needs']
const scheduleTypes = ['One time', 'Recurring', 'Ongoing'] as const

export function P09() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const father = lovedOnes[0]
  const [category, setCategory] = useState<string>(carePlan.category)
  const [schedule, setSchedule] = useState<string>('Recurring')

  return (
    <Screen>
      <AppBar title="Book care" onBack={() => navigate('/patient/p06')} />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item} className="flex items-center justify-between px-1">
            <SectionHeader label="Step 1 of 3 · Care details" />
            <span className="text-xs font-bold text-primary">33 percent</span>
          </motion.div>
          <motion.div variants={item}>
            <div className="h-2 rounded-full bg-tonal">
              <div className="h-2 w-1/3 rounded-full bg-primary" />
            </div>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Who receives the care" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="flex items-center gap-3">
              <span className="grid size-[46px] shrink-0 place-items-center rounded-full bg-mint">
                <CheckCircle2 className="size-5 text-primary" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-foreground">{father.name}</div>
                <div className="text-xs font-medium text-muted-foreground">
                  Father · age {father.age} · {father.category}
                </div>
              </div>
              <CheckCircle2 className="size-5 shrink-0 fill-current text-primary" />
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Type of support needed" />
          </motion.div>
          <motion.div variants={item} className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Chip
                key={c}
                on={category === c}
                onClick={() => {
                  setCategory(c)
                  notify({ title: c, body: 'Matching will filter caregivers for this category', kind: 'info' })
                }}
              >
                {category === c && <Check className="size-3.5" />}
                {c}
              </Chip>
            ))}
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Schedule type" />
          </motion.div>
          <motion.div variants={item} className="flex gap-2">
            {scheduleTypes.map((t) => (
              <SmoothButton
                key={t}
                variant={schedule === t ? 'default' : 'secondary'}
                shape="pill"
                className={cn('flex-1', schedule === t && 'bg-primary')}
                onClick={() => setSchedule(t)}
              >
                {t}
              </SmoothButton>
            ))}
          </motion.div>

          <motion.div variants={item}>
            <Field icon={CalendarDays} value="Monday, Wednesday and Friday" hint="Pick the days" />
          </motion.div>
          <motion.div variants={item}>
            <Field icon={Clock} value="2:00 PM · two hours per visit" hint="Pick the time" />
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={ShieldCheck}
              body="Your approval becomes a signed consent record before any caregiver is dispatched."
            />
          </motion.div>

          <motion.div variants={item}>
            <ScreenCard tone="tonal" className="flex items-center justify-between">
              <span className="text-[13px] font-medium text-foreground/80">Weekly estimate</span>
              <div className="flex items-center gap-2">
                <Pill tone="grey">{schedule === 'One time' ? 'Single visit' : schedule}</Pill>
                <span className="text-sm font-bold text-foreground">{carePlan.remaining.split('· ')[1] ?? '₹14,400'}</span>
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of care details" />
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
            notify({ title: 'Care details saved', body: `${category} · ${schedule.toLowerCase()} · matching nearby caregivers`, kind: 'ok' })
            navigate('/patient/p10')
          }}
        >
          Continue to matching <ArrowRight className="size-4" />
        </SmoothButton>
      </FootBar>
    </Screen>
  )
}
