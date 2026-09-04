import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Activity } from 'lucide-react'
import { AppBar } from '@/components/base/phone/app-bar'
import { BodyArea, EndOfScroll, Screen } from '@/components/base/phone/screen'
import { Chip, Panel, Section, Tile, rise, stagger } from '@/components/base/phone/kit'
import { PlanHero } from '@/components/patterns/heroes/plan-hero'
import { WeekVisitsCard } from '@/components/patterns/cards/week-visits-card'
import { DayDetailCard } from '@/components/patterns/cards/day-detail-card'
import { GoalsCard } from '@/components/patterns/cards/goals-card'
import { ConsentCycleCard } from '@/components/patterns/cards/consent-cycle-card'
import { TrendsCard } from '@/components/patterns/cards/trends-card'
import { PlanLinksCard } from '@/components/patterns/cards/plan-links-card'
import { VisitSheet } from '@/components/patterns/sheets/visit-sheet'
import { ConsentSheet } from '@/components/patterns/sheets/consent-sheet'
import { CaregiverSheet } from '@/components/patterns/sheets/caregiver-sheet'
import { CAREGIVER, PLAN, WEEK, goalSummary } from '@/data/patientCarePlan'
import { useRouter } from '@/lib/router'

type SheetId = 'none' | 'visit' | 'consent' | 'caregiver'

export function P13() {
  const { navigate } = useRouter()
  const [day, setDay] = useState(0)
  const [sheet, setSheet] = useState<SheetId>('none')
  const close = () => setSheet('none')

  const goals = goalSummary()

  return (
    <Screen>
      <AppBar
        title="Care plan"
        subtitle={`${PLAN.patientFirstName}'s ${PLAN.weeks}-week recovery plan`}
        onBack={() => navigate('/patient/p06')}
        trailing={
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => setSheet('caregiver')}
            aria-label={`Caregiver ${CAREGIVER.name}`}
            className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-[13px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(5,150,105,0.8)]"
          >
            {CAREGIVER.firstName[0]}
          </motion.button>
        }
      />
      <BodyArea>
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-4 pt-1">
          <motion.div variants={rise}>
            <PlanHero />
          </motion.div>

          <motion.div variants={rise}>
            <WeekVisitsCard selected={day} onSelect={setDay} />
          </motion.div>

          <motion.div variants={rise}>
            <DayDetailCard
              day={WEEK[day]}
              onOpenVisit={() => setSheet('visit')}
              onOpenSummary={() => navigate('/patient/p17')}
            />
          </motion.div>

          <motion.div variants={rise}>
            <Section
              label="This week's goals"
              trailing={
                <Chip intent={goals.open > 0 ? 'warning' : 'success'} dot={goals.open > 0}>
                  {goals.open > 0 ? `${goals.open} open` : 'All met'}
                </Chip>
              }
            />
          </motion.div>

          <motion.div variants={rise}>
            <GoalsCard onOpenSession={() => setSheet('visit')} />
          </motion.div>

          <motion.div variants={rise}>
            <Section label="Consent lifecycle" />
          </motion.div>

          <motion.div variants={rise}>
            <ConsentCycleCard />
          </motion.div>

          <motion.div variants={rise}>
            <Section label="Health trends" />
          </motion.div>

          <motion.div variants={rise}>
            <TrendsCard />
          </motion.div>

          <motion.div variants={rise}>
            <Section label="Plan history" />
          </motion.div>

          <motion.div variants={rise}>
            <PlanLinksCard />
          </motion.div>

          <motion.div variants={rise}>
            <Panel intent="info" className="flex items-start gap-3 p-4">
              <Tile icon={Activity} tone="info" />
              <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                This plan guides every visit. {CAREGIVER.firstName} sees these goals at each session and logs evidence
                against them — the notes above are hers, verbatim and verified.
              </p>
            </Panel>
          </motion.div>

          <motion.div variants={rise}>
            <EndOfScroll label="End of care plan" />
          </motion.div>
        </motion.div>
      </BodyArea>

      <AnimatePresence>
        {sheet !== 'none' && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.45)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheet === 'visit' && (
          <VisitSheet
            key="visit-sheet"
            day={WEEK[day]}
            onOpenCaregiver={() => setSheet('caregiver')}
            onClose={close}
          />
        )}
        {sheet === 'consent' && <ConsentSheet key="consent-sheet" onClose={close} />}
        {sheet === 'caregiver' && <CaregiverSheet key="caregiver-sheet" onClose={close} />}
      </AnimatePresence>
    </Screen>
  )
}
