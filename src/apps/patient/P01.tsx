import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { KeyRound, Mail, Phone, Route, ShieldCheck, User, Fingerprint } from 'lucide-react'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { rise, stagger } from '@/components/phone/kit'
import { StaticButton, LifecycleButton, type LifecyclePhase } from '@/components/phone/LifecycleButton'
import { NoteStrip } from '@/components/phone/NoteStrip'
import { InfoListCard } from '@/components/admin/ui/InfoListCard'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'
import { Hero } from '@/components/patient/onboarding/Hero'
import { SectionHeader } from '@/components/patient/onboarding/SectionHeader'
import { CredentialCard } from '@/components/patient/onboarding/CredentialCard'
import { CredentialRow } from '@/components/patient/onboarding/CredentialRow'
import { EyeToggle } from '@/components/patient/onboarding/EyeToggle'
import { PasswordMeter } from '@/components/patient/onboarding/PasswordMeter'
import { ConsentBlock } from '@/components/patient/onboarding/ConsentBlock'
import { PrimaryAction } from '@/components/patient/onboarding/PrimaryAction'
import { SheetShell } from '@/components/phone/SheetShell'
import { ReviewSummary } from '@/components/patient/onboarding/ReviewSummary'
import {
  draftIssues,
  emptyDraft,
  fieldState,
  isValidEmail,
  isValidPhone,
  passwordStrength,
  pathItems,
  stepUnlocks,
} from '@/data/patientOnboarding'
import type { Draft } from '@/data/patientOnboarding'

const TOTAL_STEPS = 5

export function P01() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [draft, setDraft] = useState<Draft>(emptyDraft)
  const [showPass, setShowPass] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [openDocId, setOpenDocId] = useState<string | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [createState, setCreateState] = useState<LifecyclePhase>('idle')

  const issues = draftIssues(draft, agreed)
  const ready = issues.length === 0
  const strength = passwordStrength(draft.password)
  const stepsDone = TOTAL_STEPS - issues.length
  const unlocks = stepUnlocks(draft, agreed)

  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  function setField<K extends keyof Draft>(key: K, value: string) {
    setDraft((d): Draft => ({ ...d, [key]: value }))
  }

  function cancelPending() {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setCreateState('idle')
  }

  function closeSheet() {
    if (createState === 'working') cancelPending()
    setSheetOpen(false)
  }

  function confirmCreate() {
    if (createState !== 'idle') return
    setCreateState('working')
    timers.current.push(setTimeout(() => setCreateState('done'), 950))
    timers.current.push(
      setTimeout(() => {
        notify({ title: 'Account created', body: 'Verify your phone to continue', kind: 'ok' })
        navigate('/patient/p03')
      }, 1650),
    )
  }

  const nameState = fieldState(draft.name, draft.name.trim().length >= 2)
  const emailState = fieldState(draft.email, isValidEmail(draft.email))
  const phoneState = fieldState(draft.phone, isValidPhone(draft.phone))
  const passState = fieldState(draft.password, strength.score >= 2)

  const reviewEntries = [
    { label: 'Guardian', value: draft.name.trim() },
    { label: 'Email', value: draft.email.trim() },
    { label: 'Phone', value: draft.phone.trim() },
    { label: 'Password', value: 'Hidden until you sign in' },
    { label: 'Terms', value: 'Both documents accepted' },
  ]

  const sheetHeader =
    createState === 'done'
      ? { icon: ShieldCheck, tileTone: 'success' as const, title: 'Account created', subtitle: 'Next: verify your phone with an OTP' }
      : createState === 'working'
        ? { icon: User, tileTone: 'info' as const, title: 'Creating your account', subtitle: 'Sealing your guardian credentials' }
        : { icon: User, tileTone: 'success' as const, title: 'Review your account', subtitle: 'One last look before we verify your phone' }

  return (
    <Screen>
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-2">
            <motion.div variants={rise}>
              <Hero />
            </motion.div>

            <motion.div variants={rise}>
              <SectionHeader label="Create your account" done={ready} trailing="Under a minute" />
            </motion.div>

            <motion.div variants={rise}>
              <CredentialCard
                stepsDone={stepsDone}
                stepsTotal={TOTAL_STEPS}
                footerNote="Phone verification with an OTP follows account creation."
              >
                <CredentialRow
                  icon={User}
                  label="Your full name"
                  htmlFor="p01-name"
                  value={draft.name}
                  placeholder="Enter your name"
                  state={nameState}
                  invalidHint="Enter the name on your ID"
                  onChange={(v) => setField('name', v)}
                />
                <CredentialRow
                  icon={Mail}
                  label="Email address"
                  htmlFor="p01-email"
                  type="email"
                  value={draft.email}
                  placeholder="you@example.com"
                  state={emailState}
                  invalidHint="Enter a valid email address"
                  onChange={(v) => setField('email', v)}
                />
                <CredentialRow
                  icon={Phone}
                  label="Phone number"
                  htmlFor="p01-phone"
                  type="tel"
                  value={draft.phone}
                  placeholder="98765 43210"
                  state={phoneState}
                  invalidHint="Enter at least 10 digits"
                  onChange={(v) => setField('phone', v)}
                />
                <CredentialRow
                  icon={KeyRound}
                  label="Create a password"
                  htmlFor="p01-password"
                  type={showPass ? 'text' : 'password'}
                  mono
                  value={draft.password}
                  placeholder="••••••••"
                  state={passState}
                  invalidHint="Too short — use at least 8 characters"
                  onChange={(v) => setField('password', v)}
                  trailing={<EyeToggle shown={showPass} onToggle={() => setShowPass((v) => !v)} />}
                  below={
                    draft.password ? (
                      <PasswordMeter score={strength.score} label={strength.label} />
                    ) : undefined
                  }
                />
              </CredentialCard>
            </motion.div>

            <motion.div variants={rise}>
              <ConsentBlock
                accepted={agreed}
                onToggle={() => setAgreed((v) => !v)}
                openDocId={openDocId}
                onSelectDoc={setOpenDocId}
              />
            </motion.div>

            <motion.div variants={rise}>
              <PrimaryAction ready={ready} onPress={() => setSheetOpen(true)} />
            </motion.div>

            <motion.div variants={rise}>
              <StaticButton tone="neutral" icon={Fingerprint} onClick={() => navigate('/patient/p02')}>
                Already have an account? Sign in
              </StaticButton>
            </motion.div>

            <motion.div variants={rise}>
              <InfoListCard
                accent={ready ? 'emerald' : 'amber'}
                icon={Route}
                title="The path after creation"
                subtitle="Each step unlocks as your details become valid. Verification continues right after your account is created."
                items={pathItems(unlocks)}
              />
            </motion.div>

            <motion.div variants={rise}>
              <NoteStrip intent="success" icon={ShieldCheck}>
                Guardians verify once. This protects every medical record and consent in your family plan.
              </NoteStrip>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="Ayvaa · Hyderabad" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        {sheetOpen && (
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
        {sheetOpen && (
          <SheetShell
            key="sheet"
            icon={sheetHeader.icon}
            tone={sheetHeader.tileTone}
            title={sheetHeader.title}
            subtitle={sheetHeader.subtitle}
            onClose={closeSheet}
            footer={
              <div className="flex flex-col gap-2.5">
                <LifecycleButton
                  phase={createState}
                  idleLabel="Create my account"
                  workingLabel="Creating your account"
                  doneLabel="Account created"
                  onPress={confirmCreate}
                />
                <motion.button
                  type="button"
                  whileTap={createState === 'idle' ? { scale: 0.97 } : undefined}
                  onClick={closeSheet}
                  disabled={createState !== 'idle'}
                  aria-disabled={createState !== 'idle'}
                  className={cn(
                    'w-full rounded-2xl py-3 text-sm font-bold transition-colors',
                    createState === 'idle'
                      ? 'bg-[#0B211B]/[0.05] text-[#0B211B]/70'
                      : 'cursor-not-allowed bg-[#0B211B]/[0.03] text-[#0B211B]/30',
                  )}
                >
                  Go back and edit
                </motion.button>
              </div>
            }
          >
            <ReviewSummary
              entries={reviewEntries}
              note="Verification continues with an OTP to your phone"
            />
          </SheetShell>
        )}
      </AnimatePresence>
    </Screen>
  )
}
