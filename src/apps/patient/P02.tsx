import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CalendarDays, CheckCircle2, MailCheck, ReceiptText, ShieldCheck } from 'lucide-react'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Section, rise, stagger } from '@/components/phone/kit'
import { SheetShell } from '@/components/phone/SheetShell'
import { NoteStrip } from '@/components/phone/NoteStrip'
import { DigestHero } from '@/components/patient/auth/DigestHero'
import { BiometricUnlock } from '@/components/patient/auth/BiometricUnlock'
import type { ScanState } from '@/components/patient/auth/BiometricUnlock'
import { PasswordCard } from '@/components/patient/auth/PasswordCard'
import type { SignInState } from '@/components/patient/auth/SignInButton'
import { CreateAccountCard } from '@/components/patient/auth/CreateAccountCard'
import { DigestDetail } from '@/components/patient/auth/DigestDetail'
import { MarkSeenButton } from '@/components/patient/auth/MarkSeenButton'
import type { SeenState } from '@/components/patient/auth/MarkSeenButton'
import { ResetInfo } from '@/components/patient/auth/ResetInfo'
import { SendResetButton } from '@/components/patient/auth/SendResetButton'
import type { SendState } from '@/components/patient/auth/SendResetButton'
import { isSignInReady, resetLinkValidity } from '@/data/patientAuth'
import type { DigestEntry } from '@/data/patientAuth'
import { fieldState, isValidEmail } from '@/data/patientOnboarding'
import { guardian } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const sheetIcons = {
  'visit-done': CalendarDays,
  'statement-paid': ReceiptText,
  'next-visit': CheckCircle2,
} as const

export function P02() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [email, setEmail] = useState(guardian.email)
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [scan, setScan] = useState<ScanState>('idle')
  const [signInState, setSignInState] = useState<SignInState>('idle')
  const [reviewedKeys, setReviewedKeys] = useState<string[]>([])
  const [openEntry, setOpenEntry] = useState<DigestEntry | null>(null)
  const [seenState, setSeenState] = useState<SeenState>('idle')
  const [forgotOpen, setForgotOpen] = useState(false)
  const [sendState, setSendState] = useState<SendState>('idle')

  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  function stage(delay: number, run: () => void) {
    timers.current.push(setTimeout(run, delay))
  }

  function cancelTimers() {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  function unlock() {
    if (scan !== 'idle') return
    setScan('scanning')
    stage(900, () => {
      setScan('matched')
      notify({ title: 'Unlocked', body: 'Fingerprint matched, welcome back Priya', kind: 'ok' })
    })
    stage(1600, () => navigate('/patient/p06'))
  }

  const emailState = fieldState(email, isValidEmail(email))
  const signInReady = emailState === 'valid' && isSignInReady(password)
  const passwordState = fieldState(password, isSignInReady(password))

  function signIn() {
    if (!signInReady || signInState !== 'idle') return
    setSignInState('working')
    stage(950, () => setSignInState('done'))
    stage(1600, () => {
      notify({ title: 'Welcome back', body: `Signed in as ${guardian.name}`, kind: 'ok' })
      navigate('/patient/p06')
    })
  }

  function openDigest(entry: DigestEntry) {
    cancelTimers()
    setSeenState('idle')
    setOpenEntry(entry)
  }

  function closeDigest() {
    if (seenState === 'working') {
      cancelTimers()
      setSeenState('idle')
    }
    setOpenEntry(null)
  }

  function markSeen() {
    if (!openEntry || seenState !== 'idle') return
    setSeenState('working')
    stage(850, () => setSeenState('done'))
    stage(1450, () => {
      setReviewedKeys((keys) =>
        keys.includes(openEntry.key) ? keys : [...keys, openEntry.key],
      )
      notify({ title: 'Record opened', body: openEntry.title, kind: 'ok' })
      setOpenEntry(null)
    })
  }

  function closeForgot() {
    if (sendState === 'working') {
      cancelTimers()
      setSendState('idle')
    }
    setForgotOpen(false)
  }

  function sendReset() {
    if (sendState !== 'idle') return
    setSendState('working')
    stage(950, () => setSendState('done'))
    stage(1600, () => {
      notify({ title: 'Reset link sent', body: `Check ${email}, the link is valid for 30 minutes`, kind: 'ok' })
      navigate('/patient/p05')
    })
  }

  const digestSheet = openEntry
    ? {
        idle: {
          icon: sheetIcons[openEntry.key as keyof typeof sheetIcons],
          tileTone: 'info' as const,
          title: openEntry.title,
          subtitle: openEntry.detail,
        },
        working: {
          icon: sheetIcons[openEntry.key as keyof typeof sheetIcons],
          tileTone: 'info' as const,
          title: 'Fetching the record',
          subtitle: 'Reading the sealed entry',
        },
        done: {
          icon: sheetIcons[openEntry.key as keyof typeof sheetIcons],
          tileTone: 'success' as const,
          title: 'Reviewed',
          subtitle: 'Marked as seen in your digest',
        },
      }[seenState]
    : null

  return (
    <Screen>
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-2">
            <motion.div variants={rise}>
              <DigestHero reviewedKeys={reviewedKeys} onOpenEntry={openDigest} />
            </motion.div>

            <motion.div variants={rise}>
              <BiometricUnlock state={scan} onPress={unlock} />
            </motion.div>

            <motion.div variants={rise}>
              <PasswordCard
                email={email}
                emailState={emailState}
                onEmailChange={setEmail}
                password={password}
                passwordState={passwordState}
                onPasswordChange={setPassword}
                showPass={showPass}
                onTogglePass={() => setShowPass((v) => !v)}
                signInReady={signInReady}
                signInState={signInState}
                onSignIn={signIn}
                onForgot={() => setForgotOpen(true)}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="New to Ayvaa?" />
            </motion.div>

            <motion.div variants={rise}>
              <CreateAccountCard onPress={() => navigate('/patient/p01')} />
            </motion.div>

            <motion.div variants={rise}>
              <NoteStrip intent="success" icon={ShieldCheck}>
                Your family's medical records stay sealed until your identity is verified.
              </NoteStrip>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="Ayvaa · Hyderabad" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        {digestSheet && (
          <motion.div
            key="digest-dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDigest}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {digestSheet && openEntry && (
          <SheetShell
            key="digest-sheet"
            icon={digestSheet.icon}
            tone={digestSheet.tileTone}
            title={digestSheet.title}
            subtitle={digestSheet.subtitle}
            onClose={closeDigest}
            footer={
              <div className="flex flex-col gap-2.5">
                <MarkSeenButton state={seenState} onPress={markSeen} />
                <motion.button
                  type="button"
                  whileTap={seenState === 'idle' ? { scale: 0.97 } : undefined}
                  onClick={closeDigest}
                  disabled={seenState !== 'idle'}
                  aria-disabled={seenState !== 'idle'}
                  className={cn(
                    'w-full rounded-2xl py-3 text-sm font-bold transition-colors',
                    seenState === 'idle'
                      ? 'bg-[#0B211B]/[0.05] text-[#0B211B]/70'
                      : 'cursor-not-allowed bg-[#0B211B]/[0.03] text-[#0B211B]/30',
                  )}
                >
                  Back to sign in
                </motion.button>
              </div>
            }
          >
            <DigestDetail summary={openEntry.summary} facts={openEntry.facts} note={openEntry.note} />
          </SheetShell>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {forgotOpen && (
          <motion.div
            key="forgot-dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeForgot}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {forgotOpen && (
          <SheetShell
            key="forgot-sheet"
            icon={MailCheck}
            tone={sendState === 'done' ? 'success' : 'info'}
            title={sendState === 'done' ? 'Reset link sent' : 'Reset your password'}
            subtitle={
              sendState === 'done'
                ? 'Follow the link from your inbox to set a new password'
                : 'A single-use link will go to your email address'
            }
            onClose={closeForgot}
            footer={
              <div className="flex flex-col gap-2.5">
                <SendResetButton state={sendState} onPress={sendReset} />
                <motion.button
                  type="button"
                  whileTap={sendState === 'idle' ? { scale: 0.97 } : undefined}
                  onClick={closeForgot}
                  disabled={sendState !== 'idle'}
                  aria-disabled={sendState !== 'idle'}
                  className={cn(
                    'w-full rounded-2xl py-3 text-sm font-bold transition-colors',
                    sendState === 'idle'
                      ? 'bg-[#0B211B]/[0.05] text-[#0B211B]/70'
                      : 'cursor-not-allowed bg-[#0B211B]/[0.03] text-[#0B211B]/30',
                  )}
                >
                  I remembered it
                </motion.button>
              </div>
            }
          >
            <ResetInfo email={email} validity={resetLinkValidity} />
          </SheetShell>
        )}
      </AnimatePresence>
    </Screen>
  )
}
