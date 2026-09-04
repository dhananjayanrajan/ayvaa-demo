import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BellRing } from 'lucide-react'
import AgentAvatar from '@/components/base/smoothui/agent-avatar'
import { AppBar } from '@/components/base/phone/app-bar'
import { BodyArea, EndOfScroll, Screen } from '@/components/base/phone/screen'
import { Chip, Panel, Section, Tile, rise, stagger } from '@/components/base/phone/kit'
import { LiveHero } from '@/components/patterns/heroes/live-hero'
import { QuickActions } from '@/components/patterns/actions/quick-actions'
import { UpcomingVisitsCard } from '@/components/patterns/cards/upcoming-visits-card'
import { MedicationCard } from '@/components/patterns/cards/medication-card'
import { RecoveryCard } from '@/components/patterns/cards/recovery-card'
import { LiveVisitSheet } from '@/components/patterns/sheets/live-visit-sheet'
import { NotificationBell } from '@/components/patterns/navigation/notification-bell'
import { buildDashboardFacts } from '@/data/patientDashboard'
import { guardian } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

export function P06() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [sheet, setSheet] = useState(false)

  const facts = useMemo(() => buildDashboardFacts(), [])

  return (
    <Screen>
      <AppBar
        title={guardian.name}
        subtitle="Good morning · Friday"
        trailing={
          <div className="flex items-center gap-2">
            <AgentAvatar seed={guardian.name} size={42} />
            <NotificationBell
              onPress={() => {
                notify({ title: '2 new notifications', body: 'Visit confirmed and receipt ready', kind: 'info' })
                navigate('/patient/p07')
              }}
            />
          </div>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <LiveHero
                facts={facts}
                onOpenSheet={() => setSheet(true)}
                onTrack={() => navigate('/patient/p16')}
              />
            </motion.div>

            <motion.div variants={rise}>
              <QuickActions onPress={(to) => navigate(to)} />
            </motion.div>

            <motion.div variants={rise}>
              <Section
                label="Upcoming visits"
                trailing={<Chip intent="neutral">{facts.upcoming.length} scheduled</Chip>}
              />
            </motion.div>

            <motion.div variants={rise}>
              <UpcomingVisitsCard rows={facts.upcoming} onOpen={() => navigate('/patient/p15')} />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Today at a glance" />
            </motion.div>

            <motion.div variants={rise}>
              <MedicationCard
                caregiverFirstName={facts.caregiverFirstName}
                onSchedule={() => navigate('/patient/p19')}
                onPrescriptions={() => navigate('/patient/p20')}
              />
            </motion.div>

            <motion.div variants={rise}>
              <RecoveryCard
                onPlan={() => navigate('/patient/p13')}
                onReports={() => navigate('/patient/p14')}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={BellRing} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Everything updates itself — confirmations, doses and receipts land as notifications
                  the moment they happen, nobody presses send.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of today" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        {sheet && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSheet(false)}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheet && (
          <LiveVisitSheet
            key="sheet"
            lovedFirstName={facts.lovedFirstName}
            caregiverFullName={facts.caregiverFullName}
            onClose={() => setSheet(false)}
          />
        )}
      </AnimatePresence>
    </Screen>
  )
}
