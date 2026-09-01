import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ShieldAlert } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Chip, Section, rise, stagger } from '@/components/phone/kit'
import { NoteStrip } from '@/components/phone/NoteStrip'
import { StaticButton } from '@/components/phone/LifecycleButton'
import { lovedOnes, sessions } from '@/data/seed'
import { sessionChecklist } from '@/data/professionalCare'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { CheckInHero } from '@/components/sessions/SessionsSet'
import { ChecklistCard } from '@/components/sessions/SessionsSet'
import { QuickActionsGrid } from '@/components/sessions/SessionsSet'
import { SignOffButton, type SignOffStatus } from '@/components/sessions/SessionsSet'
import { StatusStrip } from '@/components/phone/StatusStrip'
import type { SessionStep, StepState } from '@/data/sessionExecution'

const toState = (s: (typeof sessionChecklist)[number]): StepState => {
  if (s.done) return 'done'
  if (s.active) return 'active'
  if (s.locked) return 'locked'
  return 'todo'
}

export function PR06() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const live = sessions.find((s) => s.status === 'live')
  const father = lovedOnes[0]
  const [steps, setSteps] = useState<SessionStep[]>(
    sessionChecklist.map((s) => ({ id: s.id, title: s.title, body: s.body, icon: s.icon, state: toState(s) })),
  )
  const [status, setStatus] = useState<SignOffStatus>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const doneCount = steps.filter((s) => s.state === 'done').length
  const activeStep = steps.find((s) => s.state === 'active')
  const remaining = steps.length - doneCount
  const runningLabel = activeStep ? `Running · ${activeStep.title}` : 'All steps complete'

  const pressStep = (step: SessionStep) => {
    if (step.state === 'done') {
      notify({ title: `${step.title} already recorded`, body: 'Sealed to the visit record · visible in history', kind: 'info' })
      return
    }
    if (step.state === 'locked') {
      notify({ title: `${step.title} is locked`, body: 'Complete the earlier steps first to unlock this one', kind: 'info' })
      return
    }
    setSteps((prev) => {
      const completed = prev.map((s) => (s.id === step.id ? { ...s, state: 'done' as StepState } : s))
      const nextIdx = completed.findIndex((s) => s.state === 'todo' || s.state === 'locked')
      return completed.map((s, i) => (i === nextIdx ? { ...s, state: 'active' as StepState } : s))
    })
    notify({
      title: `${step.title} recorded`,
      body: remaining - 1 > 0 ? `${remaining - 1} steps remaining · family notified` : 'Final step done · ready to sign off',
      kind: 'ok',
    })
  }

  const signOff = () => {
    if (remaining > 0 || status !== 'idle') return
    setStatus('signing')
    timers.current.push(
      setTimeout(() => {
        setStatus('signed')
        notify({ title: 'Visit signed off', body: 'All steps sealed · payment released · family notified', kind: 'ok' })
        timers.current.push(setTimeout(() => navigate('/professional/pr09'), 1600))
      }, 1100),
    )
  }

  return (
    <Screen>
      <AppBar
        title={`Visit with ${father.name.split(' ')[0]}`}
        subtitle={`${live?.title ?? 'Elderly care'} · step ${Math.min(doneCount + 1, steps.length)} of ${steps.length}`}
        onBack={() => navigate('/professional/pr04')}
        trailing={
          <Chip intent="live" dot>
            Live
          </Chip>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <CheckInHero
                checkInTime="2:02 PM"
                doneCount={doneCount}
                total={steps.length}
                runningLabel={runningLabel}
                steps={steps}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Section
                label="Care plan checklist"
                trailing={
                  <Chip intent={remaining === 0 ? 'success' : 'info'} dot={remaining > 0}>
                    {Math.round((doneCount / steps.length) * 100)}%
                  </Chip>
                }
              />
            </motion.div>

            <motion.div variants={rise}>
              <ChecklistCard steps={steps} onPressStep={pressStep} />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Quick actions" trailing={<Chip intent="neutral">During visit</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <QuickActionsGrid
                onPressAction={(label, body) => notify({ title: `${label} entry`, body, kind: 'info' })}
              />
            </motion.div>

            <AnimatePresence>
              {status === 'signed' && (
                <motion.div variants={rise} key="confirmation">
                  <StatusStrip>Visit signed off · all steps sealed · payment released · family notified</StatusStrip>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={rise}>
              <NoteStrip intent="warning" icon={ShieldAlert}>
                Patient safety first. If anything looks wrong with {father.name.split(' ')[0]}, use Report incident — care stops until it is handled.
              </NoteStrip>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label={activeStep ? `Running: ${activeStep.title}` : 'All steps done'} />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <div className="flex gap-2.5">
          <StaticButton
            tone="neutral"
            icon={ShieldAlert}
            full={false}
            className="flex-1"
            onClick={() => {
              notify({
                title: 'Incident report opened',
                body: 'Severity, description and photo · supervisors paged for moderate or worse',
                kind: 'warn',
              })
              navigate('/professional/pr08')
            }}
          >
            Incident
          </StaticButton>
          <SignOffButton remaining={remaining} status={status} onPress={signOff} />
        </div>
      </FootBar>
    </Screen>
  )
}
