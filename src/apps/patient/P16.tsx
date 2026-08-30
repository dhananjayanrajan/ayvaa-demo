import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Clock, ScrollText, Siren } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { useRouter } from '@/lib/router'
import {
  ACTIVE_STEP_META,
  LIVE_VISIT,
  SEAL_TIME,
  VISIT_STEPS,
  WALK_LAPS_START,
  WALK_LAPS_TOTAL,
  activeStepIndexOf,
  activeStepOf,
  buildLedger,
  formatElapsed,
  type VisitStep,
} from '@/data/patientLiveVisit'
import { LiveVisitHero } from '@/components/patient/visits/LiveVisitHero'
import { LiveStepCard } from '@/components/patient/visits/LiveStepCard'
import { StepTimeline } from '@/components/patient/visits/StepTimeline'
import { CaregiverCard } from '@/components/patient/visits/CaregiverCard'
import { PlanCard } from '@/components/patient/visits/PlanCard'
import { VisitSoFarSheet } from '@/components/patient/visits/VisitSoFarSheet'
import { useDemo } from '@/lib/store'

const LAP_INTERVAL_MS = 9000

export function P16() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [sheetOpen, setSheetOpen] = useState(false)
  const [elapsed, setElapsed] = useState(LIVE_VISIT.elapsedBaseSeconds)
  const [steps, setSteps] = useState<VisitStep[]>(VISIT_STEPS)
  const [lapsDone, setLapsDone] = useState(WALK_LAPS_START)
  const [notifyAtSignOff, setNotifyAtSignOff] = useState(false)

  const notifiedLap = useRef(WALK_LAPS_START)
  const walkSealed = useRef(false)

  useEffect(() => {
    const id = setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (lapsDone >= WALK_LAPS_TOTAL) return
    const id = setInterval(() => setLapsDone((l) => Math.min(l + 1, WALK_LAPS_TOTAL)), LAP_INTERVAL_MS)
    return () => clearInterval(id)
  }, [lapsDone])

  useEffect(() => {
    if (lapsDone > notifiedLap.current) {
      notifiedLap.current = lapsDone
      if (lapsDone < WALK_LAPS_TOTAL) {
        notify({
          title: `Lap ${lapsDone} of ${WALK_LAPS_TOTAL} logged`,
          body: 'Recorded live to the visit log with a GPS stamp',
          kind: 'info',
        })
      }
    }
  }, [lapsDone, notify])

  useEffect(() => {
    if (lapsDone < WALK_LAPS_TOTAL || walkSealed.current) return
    walkSealed.current = true
    setSteps((prev) =>
      prev.map((s) =>
        s.id === 'walk'
          ? { ...s, state: 'done', time: SEAL_TIME }
          : s.id === 'meds'
            ? { ...s, state: 'active' }
            : s,
      ),
    )
    notify({
      title: 'Guided walk sealed',
      body: 'All laps verified. The medication round is now underway',
      kind: 'ok',
    })
  }, [lapsDone, notify])

  const step = activeStepOf(steps)

  const toggleNotify = () => {
    const next = !notifyAtSignOff
    setNotifyAtSignOff(next)
    notify({
      title: next ? 'Sign-off ping on' : 'Sign-off ping off',
      body: next ? 'One push arrives when the visit closes at 4:30 PM' : 'You will not be pinged at sign-off',
      kind: next ? 'ok' : 'info',
    })
  }

  return (
    <Screen>
      <AppBar
        title="Visit in progress"
        subtitle={`${LIVE_VISIT.caregiver.name} on site now`}
        onBack={() => navigate('/patient/p15')}
        trailing={
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setSheetOpen(true)}
            aria-label="Visit so far"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.09]"
          >
            <Clock className="size-[18px]" strokeWidth={2.2} aria-hidden />
          </motion.button>
        }
      />
      <BodyArea>
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-4 pt-1">
          <motion.div variants={rise}>
            <LiveVisitHero
              patientFirst={LIVE_VISIT.patientFirst}
              startedAt={LIVE_VISIT.startedAt}
              signOffEta={LIVE_VISIT.signOffEta}
              elapsedSeconds={elapsed}
              windowMinutes={LIVE_VISIT.windowMinutes}
              notifyAtSignOff={notifyAtSignOff}
              onToggleNotify={toggleNotify}
            />
          </motion.div>

          <motion.div variants={rise}>
            <Section label="Happening right now" trailing={<span className="text-[10px] font-extrabold tabular-nums text-[#0B211B]/40">{formatElapsed(elapsed)}</span>} />
          </motion.div>

          <motion.div variants={rise}>
            <LiveStepCard
              step={step}
              stepIndex={activeStepIndexOf(steps)}
              stepsTotal={VISIT_STEPS.length}
              lapsDone={lapsDone}
            />
          </motion.div>

          <motion.div variants={rise}>
            <Section label="Visit log" trailing={<span className="text-[10px] font-extrabold tabular-nums text-[#0B211B]/40">{steps.filter((s) => s.state === 'done').length} of {VISIT_STEPS.length} sealed</span>} />
          </motion.div>

          <motion.div variants={rise}>
            <StepTimeline steps={steps} />
          </motion.div>

          <motion.div variants={rise}>
            <Section label="Your caregiver" />
          </motion.div>

          <motion.div variants={rise}>
            <CaregiverCard elapsedSeconds={elapsed} />
          </motion.div>

          <motion.div variants={rise}>
            <PlanCard />
          </motion.div>

          <motion.div variants={rise}>
            <Panel intent="success" className="flex items-start gap-3 p-4">
              <Tile icon={ScrollText} tone="success" />
              <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                Each completed step is written to the immutable visit record the moment it happens. Open Records to
                review the trail.
              </p>
            </Panel>
          </motion.div>

          <motion.div variants={rise}>
            <EndOfScroll label="New steps stream in as they are logged" />
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <div className="flex gap-2.5">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/patient/p31')}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-rose-500/[0.08] py-3.5 text-[13px] font-bold text-rose-600 transition-colors hover:bg-rose-500/[0.12]"
          >
            <Siren className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Incident</span>
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/patient/p17')}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
          >
            <ScrollText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Visit log</span>
          </motion.button>
        </div>
      </FootBar>

      <AnimatePresence>
        {sheetOpen && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSheetOpen(false)}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.45)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheetOpen && (
          <VisitSoFarSheet
            key="visit-sheet"
            elapsedSeconds={elapsed}
            ledger={buildLedger(steps, lapsDone)}
            onClose={() => setSheetOpen(false)}
            onOpenLog={() => {
              setSheetOpen(false)
              navigate('/patient/p17')
            }}
          />
        )}
      </AnimatePresence>
    </Screen>
  )
}
