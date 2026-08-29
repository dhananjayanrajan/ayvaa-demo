import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Chip, Panel, Tile, rise, stagger } from '@/components/phone/kit'
import { JourneyRail } from '@/components/patient/verification/JourneyRail'
import { OtpInput } from '@/components/patient/verification/OtpInput'
import { ResendRow } from '@/components/patient/verification/ResendRow'
import { DeliveryStrip } from '@/components/patient/verification/DeliveryStrip'
import { VerifyButton } from '@/components/patient/verification/VerifyButton'
import type { VerifyState } from '@/components/patient/verification/VerifyButton'
import { NextStepsCard } from '@/components/patient/verification/NextStepsCard'
import { EmailFallbackSheet } from '@/components/patient/verification/EmailFallbackSheet'
import type { EmailSendState } from '@/components/patient/verification/EmailCodeButton'
import { CODE_LENGTH, RESEND_SECONDS, journeySteps, maskPhone } from '@/data/patientVerification'
import { guardian } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

export function P03() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [digits, setDigits] = useState<string[]>(() => Array<string>(CODE_LENGTH).fill(''))
  const [seconds, setSeconds] = useState(RESEND_SECONDS)
  const [resending, setResending] = useState(false)
  const [verifyState, setVerifyState] = useState<VerifyState>('idle')
  const [emailOpen, setEmailOpen] = useState(false)
  const [emailSendState, setEmailSendState] = useState<EmailSendState>('idle')
  const [emailDelivered, setEmailDelivered] = useState(false)

  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  function stage(delay: number, run: () => void) {
    timers.current.push(setTimeout(run, delay))
  }

  function cancelTimers() {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  useEffect(() => {
    if (seconds <= 0) return
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [seconds])

  const complete = digits.every((d) => d !== '')

  function verify() {
    if (!complete || verifyState !== 'idle') return
    setVerifyState('working')
    stage(900, () => {
      setVerifyState('done')
      notify({ title: 'Phone verified', body: 'Code matched, continue to the ID check', kind: 'ok' })
    })
    stage(1550, () => navigate('/patient/p04'))
  }

  function resend() {
    if (resending) return
    setResending(true)
    stage(800, () => {
      setResending(false)
      setSeconds(RESEND_SECONDS)
      notify({
        title: 'Code re-sent',
        body: `New six-digit code sent to ${maskPhone(guardian.phone)}`,
        kind: 'info',
      })
    })
  }

  function closeEmail() {
    if (emailSendState === 'working') {
      cancelTimers()
      setEmailSendState('idle')
    }
    setEmailOpen(false)
  }

  function sendEmail() {
    if (emailSendState !== 'idle') return
    setEmailSendState('working')
    stage(950, () => setEmailSendState('done'))
    stage(1500, () => {
      setEmailDelivered(true)
      setEmailOpen(false)
      notify({ title: 'Code sent by email', body: `Six-digit code sent to ${guardian.email}`, kind: 'info' })
    })
  }

  return (
    <Screen>
      <AppBar
        title="Verify it is you"
        subtitle="Guardian identity · protects every record"
        onBack={() => navigate('/patient/p02')}
        trailing={<Chip intent="neutral">Identity check</Chip>}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] bg-[#0B231C] p-5 text-center shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                <div className="relative">
                  <div className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/60">
                    Verification journey
                  </div>
                  <div className="mt-4 font-mono text-[20px] font-black tracking-[0.14em] text-white">
                    {maskPhone(guardian.phone)}
                  </div>
                  <p className="mt-1 text-[11px] font-semibold text-emerald-100/70">
                    We sent a six-digit code there just now
                  </p>
                  <div className="mt-5">
                    <JourneyRail activeIndex={0} />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <OtpInput value={digits} onChange={setDigits} />
            </motion.div>

            <motion.div variants={rise}>
              <ResendRow seconds={seconds} sending={resending} onResend={resend} />
            </motion.div>

            <AnimatePresence>
              {emailDelivered && <DeliveryStrip email={guardian.email} />}
            </AnimatePresence>

            <motion.div variants={rise}>
              <VerifyButton ready={complete} state={verifyState} onPress={verify} />
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={journeySteps[0].icon} tone="info" />
                <button
                  type="button"
                  onClick={() => setEmailOpen(true)}
                  className="min-w-0 flex-1 pt-0.5 text-left text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65"
                >
                  Did not get a code? <span className="font-bold text-emerald-700">Send it by email instead</span> — it arrives instantly.
                </button>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <div className="flex items-center gap-2.5 px-1">
                <span aria-hidden className="h-4 w-1 shrink-0 rounded-full bg-blue-500" />
                <span className="shrink-0 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/45">
                  What comes next
                </span>
                <span aria-hidden className="h-px min-w-0 flex-1 bg-[#0B211B]/[0.07]" />
                <span className="shrink-0 rounded-full bg-[#0B211B]/[0.05] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#0B211B]/45">
                  2 min total
                </span>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <NextStepsCard doneSteps={1} totalSteps={3} />
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="Ayvaa identity check" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        {emailOpen && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeEmail}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {emailOpen && (
          <EmailFallbackSheet
            key="sheet"
            email={guardian.email}
            sendState={emailSendState}
            onSend={sendEmail}
            onClose={closeEmail}
          />
        )}
      </AnimatePresence>
    </Screen>
  )
}
