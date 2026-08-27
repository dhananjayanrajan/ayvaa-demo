import { useState } from 'react'
import { motion } from 'motion/react'
import { BadgeCheck, Camera, Check, Lock, ScanFace } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

const steps = [
  { title: 'Phone code verified', subtitle: 'Completed just now', icon: BadgeCheck },
  { title: 'Aadhaar card captured', subtitle: 'Front and back · sharp and readable', icon: Camera },
]

export function P04() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [selfieDone, setSelfieDone] = useState(false)

  return (
    <Screen>
      <AppBar
        title="Confirm your identity"
        subtitle="Final step"
        onBack={() => navigate('/patient/p03')}
        trailing={<Pill tone="grey">Step 2 of 2</Pill>}
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {steps.map((s, i) => (
                <div key={s.title} className={cn('flex items-center gap-3 px-2 py-1.5', i > 0 && 'mt-1')}>
                  <IconTile icon={s.icon} tone="mint" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-foreground">{s.title}</div>
                    <div className="text-xs font-medium text-muted-foreground">{s.subtitle}</div>
                  </div>
                  <Pill tone="ok">Done</Pill>
                </div>
              ))}
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <SectionHeader label="Match it with a selfie" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="flex flex-col items-center gap-3 py-6">
              <span
                className={cn(
                  'grid size-[104px] place-items-center rounded-full border-dashed transition-colors',
                  selfieDone ? 'border-primary bg-mint' : 'border-primary bg-tonal',
                )}
                style={{ borderWidth: 3 }}
              >
                {selfieDone ? <Check className="size-11 text-primary" /> : <Camera className="size-11 text-primary" />}
              </span>
              <span className="text-base font-bold text-foreground">{selfieDone ? 'Selfie matched' : 'Take a live selfie'}</span>
              <span className="max-w-[250px] text-center text-[13px] font-medium leading-snug text-muted-foreground">
                {selfieDone
                  ? 'Your ID and selfie match. Verification is complete.'
                  : 'Look straight ahead in good light. We compare it with your ID and delete the selfie right after.'}
              </span>
              {!selfieDone && (
                <SmoothButton
                  variant="default"
                  shape="pill"
                  className="w-full"
                  onClick={() => {
                    setSelfieDone(true)
                    notify({ title: 'Selfie captured', body: 'Matching with your ID · done', kind: 'ok' })
                  }}
                >
                  <ScanFace className="size-4" /> Open camera
                </SmoothButton>
              )}
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <InfoCard icon={Lock} body="Your ID is encrypted the moment it is captured. Every view of it, by anyone, is logged in the audit record." />
          </motion.div>
          <motion.div variants={item}>
            <EndOfScroll label="Ayvaa identity check" />
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <SmoothButton
          variant="default"
          shape="pill"
          size="lg"
          className="w-full"
          onClick={() => {
            notify({ title: 'Identity verified', body: 'Welcome to Ayvaa · your family plan is ready', kind: 'ok' })
            navigate('/patient/p06')
          }}
        >
          Finish verification
        </SmoothButton>
        <div className="text-center text-xs font-medium text-muted-foreground">Verification usually takes under two minutes.</div>
      </FootBar>
    </Screen>
  )
}
