import { useState } from 'react'
import { motion } from 'motion/react'
import {
  Activity,
  Baby,
  Cake,
  CalendarCheck,
  HeartPulse,
  HeartHandshake,
  Send,
  User,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Section, rise, stagger } from '@/components/phone/kit'
import { PartnerReferralWizardHero } from '@/components/partner/referral/PartnerReferralWizardHero'
import { PartnerAdmissionTag } from '@/components/partner/referral/PartnerAdmissionTag'
import { PartnerCareCategoryGrid } from '@/components/partner/referral/PartnerCareCategoryGrid'
import { PartnerDischargeRecords } from '@/components/partner/referral/PartnerDischargeRecords'
import { PartnerClinicalRecommendation } from '@/components/partner/referral/PartnerClinicalRecommendation'
import { partner, referrals } from '@/data/seed'
import { useDemo } from '@/lib/store'

const categories: { label: string; icon: LucideIcon }[] = [
  { label: 'Elderly care', icon: Users },
  { label: 'Post-operative', icon: HeartPulse },
  { label: 'Chronic care', icon: CalendarCheck },
  { label: 'Pediatric', icon: Baby },
  { label: 'Palliative', icon: HeartHandshake },
  { label: 'Disability', icon: Activity },
]

export function PT03() {
  const { notify } = useDemo()
  const r = referrals[0]
  const [category, setCategory] = useState(r.condition === 'Hip recovery' ? 'Post-operative' : 'Elderly care')
  const [files, setFiles] = useState(0)

  const steps = [
    { label: 'Patient', state: 'done' as const },
    { label: 'Category', state: 'done' as const },
    { label: 'Records', state: files > 0 ? ('done' as const) : ('current' as const) },
    { label: 'Send', state: files > 0 ? ('current' as const) : ('todo' as const) },
  ]
  const ready = steps.filter((s) => s.state === 'done').length

  const admissionPatient = {
    name: r.name,
    age: r.age,
    condition: r.condition,
    referredBy: r.by,
    careArea: partner.location,
    guardian: 'Priya Sharma',
    refCode: 'REF-2026-0417',
  }

  const rxRows = [
    { label: 'Plan', value: 'Post-operative care' },
    { label: 'Duration', value: '6 wks · 3 visits/wk' },
    { label: 'Caregiver', value: 'Recovery assistant' },
  ]

  return (
    <Screen>
      <AppBar title="Refer a patient" subtitle={partner.name} />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <PartnerReferralWizardHero steps={steps} ready={ready} total={4} />
            </motion.div>

            <motion.div variants={rise}>
              <PartnerAdmissionTag patient={admissionPatient} />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Care category" trailing={<Chip intent="success">{category}</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <PartnerCareCategoryGrid
                categories={categories}
                selected={category}
                onSelect={(label) => {
                  setCategory(label)
                  notify({ title: 'Category set', body: `${label} · matching will key off this`, kind: 'info' })
                }}
              />
            </motion.div>

            <motion.div variants={rise}>
              <PartnerDischargeRecords
                files={files}
                onFilesSelected={(f) => {
                  setFiles(f.length)
                  notify({ title: 'File attached', body: `${f.length} file(s) ready to send`, kind: 'ok' })
                }}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Clinical recommendation" trailing={<Chip intent="info">Rx</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <PartnerClinicalRecommendation
                referredBy={r.by}
                rxRows={rxRows}
                onRxClick={(label, value) => notify({ title: label, body: `${label} · ${value}`, kind: 'info' })}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Card intent="info">
                <div className="flex items-start gap-3 p-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500/15">
                    <User className="h-3.5 w-3.5 text-sky-600" strokeWidth={2.4} aria-hidden />
                  </span>
                  <p className="min-w-0 flex-1 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                    Referrals are shared only with Ayvaa's care team. Nothing reaches caregivers until the guardian consents.
                  </p>
                </div>
              </Card>
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
    </Screen>
  )
}
