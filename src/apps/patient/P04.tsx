import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Lock } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Chip, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { IdentityHero } from '@/components/identity/IdentitySet'
import { SelfieCaptureCard } from '@/components/identity/IdentitySet'
import { PrivacyFactsCard } from '@/components/identity/IdentitySet'
import { FinishBar } from '@/components/identity/IdentitySet'
import type { FinishState } from '@/components/identity/IdentitySet'
import type { CapturePhase } from '@/data/patientIdentity'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

export function P04() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [phase, setPhase] = useState<CapturePhase>('idle')
  const [finishState, setFinishState] = useState<FinishState>('idle')

  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  function stage(delay: number, run: () => void) {
    timers.current.push(setTimeout(run, delay))
  }

  function captured() {
    if (phase !== 'idle') return
    setPhase('scanning')
    stage(1400, () => {
      setPhase('done')
      notify({
        title: 'Selfie captured',
        body: 'Face matched with your ID at 99.2%, selfie deleted',
        kind: 'ok',
      })
    })
  }

  function finish() {
    if (phase !== 'done' || finishState !== 'idle') return
    setFinishState('working')
    stage(950, () => setFinishState('done'))
    stage(1600, () => {
      notify({
        title: 'Identity verified',
        body: 'Welcome to Ayvaa, your family plan is ready',
        kind: 'ok',
      })
      navigate('/patient/p06')
    })
  }

  return (
    <Screen>
      <AppBar
        title="Confirm your identity"
        subtitle="Final step · then your family plan is ready"
        onBack={() => navigate('/patient/p03')}
        trailing={<Chip intent="neutral">Final check</Chip>}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <IdentityHero phase={phase} />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Match it with a selfie" trailing={<Chip intent="info">Live camera</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <SelfieCaptureCard phase={phase} onCaptured={captured} />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="How your data is protected" trailing={<Chip intent="success">Guaranteed</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <PrivacyFactsCard />
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={Lock} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Verification usually takes under two minutes. You can also finish later from your profile.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="Ayvaa identity check" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <FinishBar
          verified={phase === 'done'}
          state={finishState}
          onFinish={finish}
          onSkip={() => navigate('/patient/p06')}
        />
      </FootBar>
    </Screen>
  )
}
