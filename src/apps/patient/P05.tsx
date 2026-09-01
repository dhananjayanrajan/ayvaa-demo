import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Chip, Section, rise, stagger } from '@/components/phone/kit'
import { RecoveryHero } from '@/components/recovery/RecoverySet'
import { SendLinkButton } from '@/components/recovery/RecoverySet'
import { SentCard } from '@/components/recovery/RecoverySet'
import { GuaranteesCard } from '@/components/recovery/RecoverySet'
import { SafetyCard } from '@/components/recovery/RecoverySet'
import { RecoveryFoot } from '@/components/recovery/RecoverySet'
import type { CallState } from '@/components/recovery/RecoverySet'
import { VALIDITY_SECONDS } from '@/data/patientRecovery'
import type { SendState } from '@/data/patientRecovery'
import { guardian } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

export function P05() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [sent, setSent] = useState(false)
  const [remaining, setRemaining] = useState(0)
  const [sendState, setSendState] = useState<SendState>('idle')
  const [callState, setCallState] = useState<CallState>('idle')

  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  function stage(delay: number, run: () => void) {
    timers.current.push(setTimeout(run, delay))
  }

  useEffect(() => {
    if (!sent || remaining <= 0) return
    const t = setTimeout(() => setRemaining((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [sent, remaining])

  const expired = sent && remaining <= 0
  const showSend = !sent || expired

  function send() {
    if (sendState !== 'idle') return
    setSendState('working')
    stage(900, () => {
      setSendState('done')
      setRemaining(VALIDITY_SECONDS)
      setSent(true)
      notify({
        title: 'Reset link sent',
        body: `Check ${guardian.email}, valid for 30 minutes`,
        kind: 'ok',
      })
    })
    stage(1500, () => setSendState('idle'))
  }

  function call() {
    if (callState !== 'idle') return
    setCallState('working')
    stage(900, () => {
      setCallState('done')
      notify({
        title: 'Care team verifying',
        body: 'A coordinator will call you within 10 minutes',
        kind: 'info',
      })
    })
  }

  return (
    <Screen>
      <AppBar
        title="Reset password"
        subtitle="Account recovery · secure"
        onBack={() => navigate('/patient/p02')}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <RecoveryHero />
            </motion.div>

            <AnimatePresence>
              {showSend && (
                <motion.div key="send" variants={rise} exit={{ opacity: 0, y: -8 }}>
                  <SendLinkButton state={sendState} expired={expired} onPress={send} />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {sent && (
                <SentCard key="sent" remaining={remaining} callState={callState} onCall={call} />
              )}
            </AnimatePresence>

            <motion.div variants={rise}>
              <Section label="While you wait" trailing={<Chip intent="neutral">Good to know</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <GuaranteesCard />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Reset safety rules" trailing={<Chip intent="info">Sealed</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <SafetyCard />
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="Ayvaa account recovery" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <RecoveryFoot onBack={() => navigate('/patient/p02')} />
      </FootBar>
    </Screen>
  )
}
