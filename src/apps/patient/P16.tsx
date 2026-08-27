import { motion } from 'motion/react'
import {
  Check,
  ChevronRight,
  Footprints,
  HeartPulse,
  Lock,
  MessageSquare,
  Phone,
  Pill,
  Salad,
  Utensils,
} from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Avatar, Pill as PillTag } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { caregivers, lovedOnes, visits } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function P16() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const father = lovedOnes[0]
  const nurse = caregivers[0]
  const nurseFirst = nurse.name.split(' ')[0]

  const steps = [
    { icon: Check, title: 'Arrival verified', body: 'Location matched at 2:02 PM', done: true, locked: true },
    { icon: HeartPulse, title: 'Blood pressure recorded', body: '128 over 76 · pulse 72 · logged 2:10 PM', done: true, locked: true },
    { icon: Pill, title: 'Morning medication given', body: 'Amlodipine 5 mg · verified 2:12 PM', done: true, locked: true },
    { icon: Footprints, title: 'Guided walk · happening now', body: "Third step of five in today's plan", done: false, active: true },
    { icon: Utensils, title: 'Prepare lunch', body: 'Low salt meal from the nutrition plan', done: false },
  ]

  return (
    <Screen>
      <AppBar
        title="Visit in progress"
        subtitle={`${father.name} · started 2:02 PM`}
        onBack={() => navigate('/patient/p15')}
        trailing={<PillTag tone="ok">Live</PillTag>}
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {steps.map((s, i) => {
                const Icon = s.icon
                return (
                  <div key={s.title}>
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
                      {s.active && <PillTag tone="ok">Active</PillTag>}
                    </div>
                  </div>
                )
              })}
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={Pill}
              title="Amlodipine 5 mg given"
              body="Verified against the prescription at 2:12 PM · sealed in the visit log."
            />
          </motion.div>

          <motion.div variants={item}>
            <ScreenCard className="flex items-center gap-3">
              <Avatar tone="alt" className="size-[46px]">
                {nurseFirst[0]}
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-foreground">{nurse.name}</div>
                <div className="text-xs font-medium text-muted-foreground">{nurse.role} · still on site</div>
              </div>
              <button
                onClick={() => notify({ title: 'Chat opened', body: `Message ${nurseFirst} securely over Ayvaa`, kind: 'info' })}
                className="grid size-[46px] shrink-0 place-items-center rounded-[14px] bg-tonal text-foreground/70 transition-transform active:scale-95"
                aria-label="Message caregiver"
              >
                <MessageSquare className="size-5" />
              </button>
              <button
                onClick={() => notify({ title: `Calling ${nurseFirst}`, body: 'Connecting securely over Ayvaa', kind: 'info' })}
                className="grid size-[46px] shrink-0 place-items-center rounded-[14px] bg-mint text-brand-ink transition-transform active:scale-95"
                aria-label="Call caregiver"
              >
                <Phone className="size-5" />
              </button>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <ScreenCard tone="tonal" className="p-2">
              <button onClick={() => navigate('/patient/p17')} className="flex w-full items-center gap-3 text-left">
                <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-mint text-brand-ink">
                  <Salad className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-foreground">Today's full plan</span>
                  <span className="block text-xs font-medium text-muted-foreground">Five steps · from the elderly care plan</span>
                </span>
                <ChevronRight className="size-4.5 shrink-0 text-muted-foreground" />
              </button>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="Live updates stream automatically" />
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
            onClick={() => { notify({ title: 'Report incident', body: 'Severity, photos and description · supervisors notified', kind: 'warn' }); navigate('/patient/p31') }}
          >
            Report incident
          </SmoothButton>
          <SmoothButton
            variant="default"
            shape="pill"
            size="lg"
            className="flex-[1.4]"
            onClick={() => {
              notify({ title: 'Opening visit log', body: 'Full history for this visit', kind: 'info' })
              navigate('/patient/p17')
            }}
          >
            Full visit log
          </SmoothButton>
        </div>
      </FootBar>
    </Screen>
  )
}
