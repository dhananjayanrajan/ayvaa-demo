import { motion } from 'motion/react'
import { Check, ClipboardList, HeartPulse, Lock, Pill as PillIcon, ShieldAlert, ShieldCheck, Utensils } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { lovedOnes, sessions } from '@/data/seed'
import { sessionChecklist, type ChecklistStep } from '@/data/professionalCare'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

const stepIcons = {
  arrived: Check,
  vitals: HeartPulse,
  meds: PillIcon,
  walk: ClipboardList,
  meal: Utensils,
} as const

export function PR06() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const live = sessions.find((s) => s.status === 'live')
  const father = lovedOnes[0]
  const doneCount = sessionChecklist.filter((s) => s.done).length
  const activeStep = sessionChecklist.find((s) => s.active)

  const stepRow = (s: ChecklistStep, i: number) => {
    const Icon = stepIcons[s.icon] ?? Check
    return (
      <div key={s.id}>
        {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
        <div className="flex items-center gap-3 px-2 py-1.5">
          <span
            className={
              s.done
                ? 'grid size-11 shrink-0 place-items-center rounded-full bg-mint text-brand-ink'
                : s.active
                  ? 'grid size-11 shrink-0 place-items-center rounded-full bg-primary text-white'
                  : 'grid size-11 shrink-0 place-items-center rounded-[14px] bg-tonal text-foreground/70'
            }
          >
            <Icon className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold text-foreground">{s.title}</div>
            <div className="text-xs font-medium text-muted-foreground">{s.body}</div>
          </div>
          {s.locked && <Lock className="size-4 shrink-0 text-muted-foreground" />}
          {s.active && <Pill tone="ok">Active</Pill>}
        </div>
      </div>
    )
  }

  return (
    <Screen>
      <AppBar
        title={`Visit with ${father.name.split(' ')[0]}`}
        subtitle={`${live?.title ?? 'Elderly care'} · step ${doneCount + 1} of ${sessionChecklist.length}`}
        onBack={() => navigate('/professional/pr04')}
        trailing={<Pill tone="ok">Live</Pill>}
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard tone="mint" className="flex items-start gap-3">
              <IconTile icon={ShieldCheck} tone="white" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-brand-ink">Checked in at 2:02 PM</div>
                <div className="mt-0.5 text-[13px] font-medium leading-snug text-brand-ink/80">
                  GPS matched the care address · logged permanently
                </div>
              </div>
              <Lock className="size-4 shrink-0 text-brand-ink" />
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Care plan checklist" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">{sessionChecklist.map(stepRow)}</ScreenCard>
          </motion.div>

          <motion.div variants={item} className="flex gap-2">
            <SmoothButton
              variant="soft"
              shape="pill"
              className="flex-1"
              onClick={() => notify({ title: 'Vitals entry', body: 'Pressure, pulse, oxygen and temperature · compared with last visit', kind: 'info' })}
            >
              <HeartPulse className="size-4" /> Vitals
            </SmoothButton>
            <SmoothButton
              variant="soft"
              shape="pill"
              className="flex-1"
              onClick={() => notify({ title: 'Medication', body: 'Three-point verification before any dose is given', kind: 'info' })}
            >
              <PillIcon className="size-4" /> Meds
            </SmoothButton>
            <SmoothButton
              variant="soft"
              shape="pill"
              className="flex-1"
              onClick={() => notify({ title: 'Session notes', body: 'The family sees your notes in the visit summary', kind: 'info' })}
            >
              <ClipboardList className="size-4" /> Notes
            </SmoothButton>
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={ShieldAlert}
              body={`Patient safety first. If anything looks wrong with ${father.name.split(' ')[0]}, use Report incident — care stops until it is handled.`}
            />
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label={activeStep ? `Running: ${activeStep.title}` : 'All steps done'} />
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <div className="flex gap-2.5">
          <SmoothButton
            variant="outline"
            shape="pill"
            size="lg"
            className="flex-1"
            onClick={() => {
              notify({ title: 'Incident report opened', body: 'Severity, description and photo · supervisors paged for moderate or worse', kind: 'warn' })
              navigate('/professional/pr08')
            }}
          >
            Incident
          </SmoothButton>
          <SmoothButton
            variant="default"
            shape="pill"
            size="lg"
            className="flex-[1.4]"
            onClick={() => {
              notify({ title: 'Visit signed off', body: 'All steps sealed · payment released · family notified', kind: 'ok' })
              navigate('/professional/pr09')
            }}
          >
            Complete and sign off
          </SmoothButton>
        </div>
      </FootBar>
    </Screen>
  )
}
