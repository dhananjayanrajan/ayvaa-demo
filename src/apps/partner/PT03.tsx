import { useState } from 'react'
import { motion } from 'motion/react'
import {
  Activity,
  Baby,
  CalendarCheck,
  HeartPulse,
  HeartHandshake,
  Send,
  User,
  Users,
  FileText,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Chip, Section, rise, stagger } from '@/components/phone/kit'
import { PartnerReferralWizardHero, type WizardStep } from '@/components/referral/ReferralSet'
import { PartnerAdmissionTag } from '@/components/referral/ReferralSet'
import { PartnerCareCategoryGrid } from '@/components/referral/ReferralSet'
import { PartnerDischargeRecords } from '@/components/referral/ReferralSet'
import { PartnerClinicalRecommendation } from '@/components/referral/ReferralSet'
import { PartnerConsentNote } from '@/components/referral/ReferralSet'
import { PartnerInfoSheet, type PartnerInfoSheetData } from '@/components/sheets/SheetsSet'
import { partner, referrals } from '@/data/seed'
import { useDemo } from '@/lib/store'

interface CategoryInfo {
  label: string
  icon: LucideIcon
  description: string
}

const categories: CategoryInfo[] = [
  { label: 'Elderly care', icon: Users, description: 'Support for daily living and companionship for seniors.' },
  { label: 'Post-operative', icon: HeartPulse, description: 'Recovery assistance after surgery or hospitalisation.' },
  { label: 'Chronic care', icon: CalendarCheck, description: 'Ongoing management for long-term health conditions.' },
  { label: 'Pediatric', icon: Baby, description: 'Specialised care for children and adolescents.' },
  { label: 'Palliative', icon: HeartHandshake, description: 'Comfort and quality of life for serious illnesses.' },
  { label: 'Disability', icon: Activity, description: 'Personalised support for physical or intellectual disabilities.' },
]

export function PT03() {
  const { notify } = useDemo()
  const r = referrals[0]
  const [category, setCategory] = useState(r.condition === 'Hip recovery' ? 'Post-operative' : 'Elderly care')
  const [attachedFiles, setAttachedFiles] = useState<{ name: string; size: string }[]>([])
  const [infoSheet, setInfoSheet] = useState<PartnerInfoSheetData | null>(null)

  const steps: WizardStep[] = [
    { label: 'Patient', state: 'done', description: 'Patient details are pre-filled from the selected referral.' },
    { label: 'Category', state: 'done', description: 'Choose the care category that best matches the patient’s condition.' },
    { label: 'Records', state: attachedFiles.length > 0 ? 'done' : 'current', description: 'Attach discharge summary and relevant medical records.' },
    { label: 'Send', state: attachedFiles.length > 0 ? 'current' : 'todo', description: 'Submit the referral to Ayvaa care team.' },
  ]
  const ready = steps.filter((s) => s.state === 'done').length

  const handleStepClick = (step: WizardStep) => {
    setInfoSheet({
      type: 'step',
      title: step.label,
      body: step.description,
      icon: Send,
    })
  }

  const handleCategoryInfo = (cat: CategoryInfo) => {
    setInfoSheet({
      type: 'category',
      title: cat.label,
      body: cat.description,
      icon: cat.icon,
      actionLabel: 'Select this category',
      onAction: () => {
        setCategory(cat.label)
        notify({ title: 'Category set', body: `${cat.label} · matching will key off this`, kind: 'info' })
        setInfoSheet(null)
      },
    })
  }

  const handleRxInfo = (row: { label: string; value: string; detail: string }) => {
    setInfoSheet({
      type: 'rx',
      title: row.label,
      body: row.detail,
      icon: FileText,
    })
  }

  const handlePatientDetails = () => {
    setInfoSheet({
      type: 'patient',
      title: 'Patient details',
      body: `Name: ${r.name}\nAge: ${r.age}\nCondition: ${r.condition}\nReferred by: ${r.by}\nGuardian: Priya Sharma`,
      icon: User,
      actionLabel: 'Call guardian',
      onAction: () => notify({ title: 'Calling', body: 'Dialing Priya Sharma…', kind: 'info' }),
    })
  }

  const handleCopyRef = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      notify({ title: 'Copied', body: `Referral code ${code} copied to clipboard`, kind: 'ok' })
    } catch {
      notify({ title: 'Copy failed', body: 'Unable to copy referral code', kind: 'info' })
    }
  }

  const handleCallDoctor = () => {
    notify({ title: 'Calling', body: `Dialing ${r.by}…`, kind: 'info' })
  }

  const admissionPatient = {
    name: r.name,
    age: r.age,
    condition: r.condition,
    referredBy: r.by,
    careArea: partner.location,
    guardian: 'Priya Sharma',
    guardianPhone: '+91 98765 43210',
    refCode: 'REF-2026-0417',
  }

  const rxRows = [
    { label: 'Plan', value: 'Post-operative care', detail: 'Clinical plan: Post-operative care for hip recovery. Includes wound monitoring and mobility support.' },
    { label: 'Duration', value: '6 wks · 3 visits/wk', detail: 'Expected duration: 6 weeks, 3 visits per week. Can be adjusted after physician review.' },
    { label: 'Caregiver', value: 'Recovery assistant', detail: 'Preferred caregiver: Recovery assistant with orthopaedic experience. Family may choose alternative during consent.' },
  ]

  return (
    <Screen>
      <AppBar title="Refer a patient" subtitle={partner.name} />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <PartnerReferralWizardHero
                steps={steps}
                ready={ready}
                total={4}
                onStepClick={handleStepClick}
              />
            </motion.div>

            <motion.div variants={rise}>
              <PartnerAdmissionTag
                patient={admissionPatient}
                onCopyRef={handleCopyRef}
                onViewDetails={handlePatientDetails}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Care category" trailing={<Chip intent="success" className="border-transparent">{category}</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <PartnerCareCategoryGrid
                categories={categories}
                selected={category}
                onSelect={(label) => {
                  setCategory(label)
                  notify({ title: 'Category set', body: `${label} · matching will key off this`, kind: 'info' })
                }}
                onInfo={handleCategoryInfo}
              />
            </motion.div>

            <motion.div variants={rise}>
              <PartnerDischargeRecords
                files={attachedFiles}
                onFilesSelected={(files) => {
                  const newFiles = files.map((f) => ({ name: f.name, size: `${Math.round(f.size / 1024)} KB` }))
                  setAttachedFiles(newFiles)
                  notify({ title: 'File attached', body: `${newFiles.length} file(s) ready to send`, kind: 'ok' })
                }}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Clinical recommendation" trailing={<Chip intent="info" className="border-transparent">Rx</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <PartnerClinicalRecommendation
                referredBy={r.by}
                referredPhone="+91 98200 12345"
                rxRows={rxRows}
                onRxInfo={handleRxInfo}
                onCallDoctor={handleCallDoctor}
              />
            </motion.div>

            <motion.div variants={rise}>
              <PartnerConsentNote />
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of referral" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => notify({ title: 'Referral sent', body: 'Ayvaa care team will reach the guardian within 2 hours', kind: 'ok' })}
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
        >
          <Send className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          Send referral to Ayvaa
        </motion.button>
      </FootBar>

      <PartnerInfoSheet data={infoSheet} onClose={() => setInfoSheet(null)} />
    </Screen>
  )
}
