import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ShieldCheck, Star } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Chip, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { StaticButton } from '@/components/phone/LifecycleButton'
import { useRouter } from '@/lib/router'
import { SummaryHero } from '@/components/visits/VisitsSet'
import { VitalsCard } from '@/components/visits/VisitsSet'
import { VitalsSheet } from '@/components/visits/VisitsSet'
import { SessionLedgerCard } from '@/components/visits/VisitsSet'
import { CareDeliveredCard } from '@/components/visits/VisitsSet'
import { CaregiverNoteCard } from '@/components/visits/VisitsSet'
import { PaymentCard } from '@/components/visits/VisitsSet'
import { PaymentSheet } from '@/components/visits/VisitsSet'
import { ShareSummaryButton } from '@/components/visits/VisitsSet'
import {
  CARE_STEPS,
  SESSION_LEDGER,
  VITAL_READINGS,
  VISIT_SUMMARY,
  type VitalReading,
} from '@/data/patientVisitSummary'

export function P17() {
  const { navigate } = useRouter()
  const [vitalsReading, setVitalsReading] = useState<VitalReading | null>(null)
  const [paymentOpen, setPaymentOpen] = useState(false)

  const improving = VITAL_READINGS.some((r) => r.trend === 'better')

  return (
    <Screen>
      <AppBar
        title="Visit summary"
        subtitle={`${VISIT_SUMMARY.date}, ${VISIT_SUMMARY.timeRange}`}
        onBack={() => navigate('/patient/p15')}
        trailing={<ShareSummaryButton />}
      />

      <BodyArea>
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-4 pt-1">
          <motion.div variants={rise}>
            <SummaryHero />
          </motion.div>

          <motion.div variants={rise}>
            <Section
              label="Vitals"
              trailing={
                improving ? (
                  <Chip intent="success">Improving</Chip>
                ) : (
                  <Chip intent="neutral">Steady</Chip>
                )
              }
            />
          </motion.div>

          <motion.div variants={rise}>
            <VitalsCard onSelect={setVitalsReading} />
          </motion.div>

          <motion.div variants={rise}>
            <Section label="Session record" trailing={<Chip intent="neutral">{SESSION_LEDGER.length} entries</Chip>} />
          </motion.div>

          <motion.div variants={rise}>
            <SessionLedgerCard />
          </motion.div>

          <motion.div variants={rise}>
            <Section label="Care delivered" trailing={<Chip intent="neutral">{CARE_STEPS.length} steps</Chip>} />
          </motion.div>

          <motion.div variants={rise}>
            <CareDeliveredCard />
          </motion.div>

          <motion.div variants={rise}>
            <Section label="Caregiver note" />
          </motion.div>

          <motion.div variants={rise}>
            <CaregiverNoteCard />
          </motion.div>

          <motion.div variants={rise}>
            <Section label="Payment" trailing={<Chip intent="success">Captured</Chip>} />
          </motion.div>

          <motion.div variants={rise}>
            <PaymentCard onPress={() => setPaymentOpen(true)} />
          </motion.div>

          <motion.div variants={rise}>
            <Panel intent="info" className="flex items-start gap-3 px-4 py-3.5">
              <Tile icon={ShieldCheck} tone="info" size="sm" />
              <p className="text-[11.5px] font-semibold leading-snug text-[#0B211B]/60">
                This record is sealed and cannot be edited. Any correction request goes through the audit trail.
              </p>
            </Panel>
          </motion.div>

          <motion.div variants={rise}>
            <EndOfScroll label="End of summary" />
          </motion.div>
        </motion.div>
      </BodyArea>

      <FootBar>
        <StaticButton tone="amber" icon={Star} onClick={() => navigate('/patient/p18')}>
          Rate this visit
        </StaticButton>
      </FootBar>

      <AnimatePresence>
        {(vitalsReading || paymentOpen) && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              setVitalsReading(null)
              setPaymentOpen(false)
            }}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.45)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {vitalsReading && (
          <VitalsSheet key="vitals-sheet" reading={vitalsReading} onClose={() => setVitalsReading(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {paymentOpen && <PaymentSheet key="payment-sheet" onClose={() => setPaymentOpen(false)} />}
      </AnimatePresence>
    </Screen>
  )
}
