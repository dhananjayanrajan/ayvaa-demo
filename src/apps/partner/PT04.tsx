import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Chip, Section, rise, stagger } from '@/components/phone/kit'
import { PartnerPatientHero } from '@/components/partner-patient/PartnerPatientSet'
import { PartnerRecoveryTrajectory } from '@/components/partner-patient/PartnerPatientSet'
import { PartnerCarePathway } from '@/components/partner-patient/PartnerPatientSet'
import { PartnerChartConsentNote } from '@/components/partner-patient/PartnerPatientSet'
import { PartnerPatientFooter } from '@/components/partner-patient/PartnerPatientSet'
import { PartnerMessageSheet } from '@/components/sheets/SheetsSet'
import { PartnerDischargeFileSheet } from '@/components/sheets/SheetsSet'
import { PartnerInfoSheet, type PartnerInfoSheetData } from '@/components/sheets/SheetsSet'
import { latestVisit, referralJourney, referrals } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { Info } from 'lucide-react'

const trajectory = [
  { wk: 0, pct: 0 },
  { wk: 1, pct: 8 },
  { wk: 2, pct: 22 },
  { wk: 3, pct: 33 },
  { wk: 4, pct: 58, proj: true },
  { wk: 5, pct: 82, proj: true },
  { wk: 6, pct: 100, proj: true },
]

type SheetType = 'message' | 'discharge' | 'info'

export function PT04() {
  const { notify } = useDemo()
  const r = referrals[0]
  const [activeSheet, setActiveSheet] = useState<SheetType | null>(null)
  const [infoData, setInfoData] = useState<PartnerInfoSheetData | null>(null)

  const journey = referralJourney.map((s, i) => ({
    ...s,
    state: (i < 3 ? 'done' : i === 3 ? 'now' : 'next') as 'done' | 'now' | 'next',
  }))

  const patient = {
    name: r.name,
    condition: r.condition,
    age: r.age,
    referredBy: r.by,
    caregiver: r.caregiver,
    progress: r.progress,
    refCode: 'REF · AYVAA-2026-0417',
    day: 18,
    totalDays: 42,
    visitsDone: 7,
  }

  const closeSheet = () => setActiveSheet(null)

  const handlePatientInfo = () => {
    setInfoData({
      type: 'patient',
      title: patient.name,
      body: `Condition: ${patient.condition}\nReferred by: ${patient.referredBy}\nCaregiver: ${patient.caregiver}\nProgress: ${patient.progress}`,
      icon: Info,
      actionLabel: 'Message care team',
      onAction: () => {
        setActiveSheet('message')
      },
    })
    setActiveSheet('info')
  }

  return (
    <Screen>
      <AppBar title={r.name} subtitle={`${r.condition} · referred by ${r.by}`} />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <PartnerPatientHero patient={patient} onInfo={handlePatientInfo} />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Recovery trajectory" trailing={<Chip intent="success" className="border-transparent">On plan</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <PartnerRecoveryTrajectory trajectory={trajectory} />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Care pathway" trailing={<Chip intent="neutral" className="border-transparent">Step 4 live</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <PartnerCarePathway journey={journey} latestVisit={latestVisit} />
            </motion.div>

            <motion.div variants={rise}>
              <PartnerChartConsentNote />
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of referral" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <PartnerPatientFooter
          onDischargeFile={() => setActiveSheet('discharge')}
          onMessageCareTeam={() => setActiveSheet('message')}
        />
      </FootBar>

      <AnimatePresence>
        {activeSheet && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSheet}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeSheet === 'message' && (
          <PartnerMessageSheet
            onClose={closeSheet}
            onSend={(msg) => notify({ title: 'Message sent', body: msg, kind: 'ok' })}
          />
        )}
        {activeSheet === 'discharge' && (
          <PartnerDischargeFileSheet
            onClose={closeSheet}
            onView={() => notify({ title: 'Discharge file', body: 'Latest summary PDF opened', kind: 'info' })}
            onDownload={() => notify({ title: 'Download started', body: 'PDF downloading…', kind: 'info' })}
          />
        )}
        {activeSheet === 'info' && infoData && (
          <PartnerInfoSheet data={infoData} onClose={closeSheet} />
        )}
      </AnimatePresence>
    </Screen>
  )
}
