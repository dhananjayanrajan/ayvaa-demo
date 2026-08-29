import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Eye } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Chip, Section, rise, stagger } from '@/components/phone/kit'
import { availability, certifications, professional, professionalSkills } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { ProfileHero } from '@/components/professional/profile/ProfileHero'
import { CertificationsCard, type CertRecord } from '@/components/professional/profile/CertificationsCard'
import { SkillsCloud, type Skill } from '@/components/professional/profile/SkillsCloud'
import { PreferencesCard } from '@/components/professional/profile/PreferencesCard'
import { EditProfileButton } from '@/components/professional/profile/EditProfileButton'
import { PrivacyNotice } from '@/components/professional/profile/PrivacyNotice'
import { ProfilePreviewSheet } from '@/components/professional/profile/ProfilePreviewSheet'
import { CertificationUploadSheet } from '@/components/professional/profile/CertificationUploadSheet'
import { EditProfileSheet } from '@/components/professional/profile/EditProfileSheet'
import { UploadConfirmation } from '@/components/professional/profile/UploadConfirmation'
import { initialsOf } from '@/components/professional/profile/profileData'
import { parseBank } from '@/components/professional/payouts/payoutData'

export function PR11() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const bank = parseBank(professional.bank)
  const openDays = availability.filter((d) => !d.off)
  const firstOpen = openDays[0] ?? null

  const [profile, setProfile] = useState({ name: professional.name, role: professional.role })
  const [certs, setCerts] = useState<CertRecord[]>(
    certifications.map((c) => ({ name: c.name, valid: c.status === 'valid' })),
  )
  const [skills, setSkills] = useState<Skill[]>(professionalSkills.map((s) => ({ label: s, matched: true })))
  const [confirmation, setConfirmation] = useState<{ certName: string; matchedCategory: string | null } | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [uploadCategory, setUploadCategory] = useState<string | null>(null)

  const validCount = certs.filter((c) => c.valid).length
  const reviewCount = certs.filter((c) => !c.valid).length
  const matchedCount = skills.filter((s) => s.matched).length

  const toggleSkill = (skill: Skill) => {
    if (!skill.matched) {
      setUploadCategory(skill.label)
      setUploadOpen(true)
      return
    }
    setSkills((prev) => prev.map((s) => (s.label === skill.label ? { ...s, matched: !s.matched } : s)))
    notify({
      title: `${skill.label} removed`,
      body: 'Offers stop keying off this category. Tap again to re-enable.',
      kind: 'info',
    })
  }

  const addCategory = () => {
    const label = 'Disability care'
    if (skills.some((s) => s.label === label)) {
      notify({
        title: 'Category already listed',
        body: 'It needs a matching certification to match offers.',
        kind: 'info',
      })
      return
    }
    setSkills((prev) => [...prev, { label, matched: false }])
    notify({
      title: `${label} added`,
      body: 'Upload a matching certification to activate offers for it.',
      kind: 'info',
    })
  }

  const certificationAdded = (category: string | null, certName: string) => {
    setUploadOpen(false)
    setCerts((prev) => [
      ...prev.map((c) => ({ ...c, isNew: false })),
      { name: certName, valid: false, isNew: true },
    ])
    if (category) {
      setSkills((prev) => prev.map((s) => (s.label === category ? { ...s, matched: true } : s)))
    }
    setConfirmation({ certName, matchedCategory: category })
    notify({
      title: 'Certification submitted',
      body: 'In review now. Matching activates once Ayvaa verifies it.',
      kind: 'ok',
    })
  }

  const profileSaved = (name: string, role: string) => {
    setProfile({ name, role })
    notify({
      title: 'Profile updated',
      body: 'Your public card now shows the new details.',
      kind: 'ok',
    })
  }

  return (
    <Screen>
      <AppBar
        title="Professional profile"
        onBack={() => navigate('/professional/pr01')}
        trailing={
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => setPreviewOpen(true)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.09]"
            aria-label="Preview what families see"
          >
            <Eye className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
          </motion.button>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <ProfileHero
                name={profile.name}
                role={profile.role}
                initials={initialsOf(profile.name)}
                rating={professional.rating}
                visits={professional.visits}
                years={professional.years}
                openDays={openDays.length}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Section
                label="Certifications"
                trailing={
                  reviewCount > 0 ? (
                    <Chip intent="warning" dot>
                      {validCount} valid, {reviewCount} in review
                    </Chip>
                  ) : (
                    <Chip intent="success">{validCount} valid</Chip>
                  )
                }
              />
            </motion.div>

            <AnimatePresence>
              {confirmation && (
                <motion.div variants={rise} key="confirmation">
                  <UploadConfirmation certName={confirmation.certName} matchedCategory={confirmation.matchedCategory} />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={rise}>
              <CertificationsCard items={certs} onAdd={() => { setUploadCategory(null); setUploadOpen(true) }} />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Skills & care categories" trailing={<Chip intent="neutral">{matchedCount} matched</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <SkillsCloud skills={skills} addLabel="Add disability care" onPressSkill={toggleSkill} onPressAdd={addCategory} />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Preferences" trailing={<Chip intent="neutral">Yours to control</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <PreferencesCard
                openDays={openDays.length}
                firstOpenDay={firstOpen?.day ?? null}
                firstOpenHours={firstOpen?.hours ?? null}
                bankName={bank.name}
                bankLast4={`••${bank.last4}`}
                onPressAvailability={() => navigate('/professional/pr05')}
                onPressPayout={() => navigate('/professional/pr10')}
              />
            </motion.div>

            <motion.div variants={rise}>
              <EditProfileButton onPress={() => setEditOpen(true)} />
            </motion.div>

            <motion.div variants={rise}>
              <PrivacyNotice />
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of profile" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      {previewOpen && (
        <ProfilePreviewSheet
          name={profile.name}
          role={profile.role}
          initials={initialsOf(profile.name)}
          onClose={() => setPreviewOpen(false)}
          onConfirm={() => {
            setPreviewOpen(false)
            notify({
              title: 'Profile shared',
              body: 'Your verified card is attached to every offer automatically.',
              kind: 'ok',
            })
          }}
        />
      )}

      <AnimatePresence>
        {uploadOpen && (
          <CertificationUploadSheet
            key="upload"
            category={uploadCategory}
            onClose={() => setUploadOpen(false)}
            onAdded={certificationAdded}
          />
        )}
        {editOpen && (
          <EditProfileSheet
            key="edit"
            name={profile.name}
            role={profile.role}
            onClose={() => setEditOpen(false)}
            onSave={profileSaved}
          />
        )}
      </AnimatePresence>
    </Screen>
  )
}
