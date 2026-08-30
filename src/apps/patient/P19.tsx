import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus, ShieldCheck } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Chip, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { useRouter } from '@/lib/router'
import { useDemo } from '@/lib/store'
import {
  MED_DAY,
  MED_DOSES,
  SEAL_TIME,
  buildPartCells,
  dueMedOf,
  scheduledMedsOf,
  sealedMedsOf,
  type MedDose,
} from '@/data/patientMeds'
import { MedsHero } from '@/components/patient/meds/MedsHero'
import { DueDoseCard } from '@/components/patient/meds/DueDoseCard'
import { MedLogCard } from '@/components/patient/meds/MedLogCard'
import { RefillCard } from '@/components/patient/meds/RefillCard'
import { DoseDetailSheet } from '@/components/patient/meds/DoseDetailSheet'

export function P19() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [meds, setMeds] = useState<MedDose[]>(MED_DOSES)
  const [nudgePhase, setNudgePhase] = useState<'idle' | 'working' | 'done'>('idle')
  const [sheetOpen, setSheetOpen] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const due = dueMedOf(meds)
  const sealed = sealedMedsOf(meds)
  const scheduled = scheduledMedsOf(meds)
  const total = meds.length
  const complete = sealed.length === total
  const lowMed = scheduled.find((m) => m.dosesLeft !== undefined)

  const nudge = () => {
    if (nudgePhase !== 'idle' || !due) return
    const target = due
    setNudgePhase('working')
    timers.current.push(
      setTimeout(() => {
        setNudgePhase('done')
        notify({
          title: `${MED_DAY.nurse.first} notified`,
          body: `${target.name} moved up in the live medication round`,
          kind: 'ok',
        })
      }, 900),
    )
    timers.current.push(
      setTimeout(() => {
        setMeds((prev) =>
          prev.map((m) =>
            m.id === target.id
              ? { ...m, state: 'sealed', takenAt: SEAL_TIME, givenBy: `Nurse ${MED_DAY.nurse.first}`, fresh: true }
              : m,
          ),
        )
        setSheetOpen(false)
        setNudgePhase('idle')
        notify({
          title: `${target.name} ${target.dose} given`,
          body: 'Verified against the prescription and sealed to the visit record',
          kind: 'ok',
        })
      }, 3200),
    )
  }

  return (
    <Screen>
      <AppBar
        title="Medicine schedule"
        subtitle={`${MED_DAY.patientFirst}, ${MED_DAY.dateLabel}`}
        onBack={() => navigate('/patient/p06')}
        trailing={
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/patient/p20')}
            aria-label="Prescriptions"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.09]"
          >
            <Plus className="size-[18px]" strokeWidth={2.2} aria-hidden />
          </motion.button>
        }
      />
      <BodyArea>
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-amber-400/[0.16] blur-3xl"
          />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <MedsHero
                patientFirst={MED_DAY.patientFirst}
                sealedCount={sealed.length}
                total={total}
                complete={complete}
                partCells={buildPartCells(meds)}
              />
            </motion.div>

            {due && (
              <>
                <motion.div variants={rise}>
                  <Section label="Afternoon round" trailing={<Chip intent="warning" dot>Due now</Chip>} />
                </motion.div>
                <motion.div variants={rise}>
                  <DueDoseCard
                    med={due}
                    stepIndex={meds.indexOf(due) + 1}
                    stepsTotal={total}
                    nurseFirst={MED_DAY.nurse.first}
                    nudgePhase={nudgePhase}
                    onNudge={nudge}
                    onDetail={() => setSheetOpen(true)}
                  />
                </motion.div>
              </>
            )}

            <motion.div variants={rise}>
              <Section
                label="Medication log"
                trailing={
                  <span className="text-[10px] font-extrabold tabular-nums text-[#0B211B]/40">
                    {sealed.length} of {total} sealed
                  </span>
                }
              />
            </motion.div>

            <motion.div variants={rise}>
              <MedLogCard sealed={sealed} upcoming={scheduled} nurseFirst={MED_DAY.nurse.first} />
            </motion.div>

            {lowMed && (
              <>
                <motion.div variants={rise}>
                  <Section label="Supplies" />
                </motion.div>
                <motion.div variants={rise}>
                  <RefillCard
                    medName={lowMed.name}
                    dose={lowMed.dose}
                    dosesLeft={lowMed.dosesLeft ?? 0}
                    eveningWindow={lowMed.window}
                  />
                </motion.div>
              </>
            )}

            <motion.div variants={rise}>
              <Panel intent="success" className="flex items-start gap-3 p-4">
                <Tile icon={ShieldCheck} tone="success" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Every nurse-given dose is checked against the prescription and logged permanently. Missed or refused
                  doses raise an incident automatically.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of medicine schedule" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        {sheetOpen && due && (
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
        {sheetOpen && due && (
          <DoseDetailSheet
            key="dose-sheet"
            med={due}
            nurseFirst={MED_DAY.nurse.first}
            nudgePhase={nudgePhase}
            onNudge={nudge}
            onClose={() => setSheetOpen(false)}
          />
        )}
      </AnimatePresence>
    </Screen>
  )
}
