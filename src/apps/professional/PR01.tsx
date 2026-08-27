import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Eye, EyeOff, Fingerprint, Lock, Mail, ShieldCheck, Stethoscope } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { InfoCard } from '@/components/phone/ScreenBlocks'
import { Field, Pill } from '@/components/phone/Controls'
import { professional } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function PR01() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [showPass, setShowPass] = useState(false)

  return (
    <Screen>
      <AppBar title="ayvaa+" subtitle="Professional access" trailing={<Pill tone="ok">Secure</Pill>} />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item} className="flex flex-col items-center gap-1.5 px-1 pt-2">
            <span className="grid size-12 place-items-center rounded-full bg-mint">
              <Stethoscope className="size-6 text-brand-ink" />
            </span>
            <span className="mt-1 text-xl font-bold text-foreground">Sign in to care</span>
            <span className="text-[13px] font-medium text-muted-foreground">
              Your offers, sessions and earnings in one place
            </span>
          </motion.div>

          <motion.div variants={item}>
            <Field
              icon={Mail}
              value={professional.email}
              hint="Work email"
              onClick={() => notify({ title: 'Work email', body: `${professional.email} · last used today`, kind: 'info' })}
            />
          </motion.div>
          <motion.div variants={item}>
            <Field
              value={showPass ? 'ayvaa-care-2026' : '••••••••••'}
              hint="Password"
              icon={showPass ? EyeOff : Eye}
              onClick={() => setShowPass((v) => !v)}
            />
          </motion.div>
          <motion.div variants={item}>
            <button
              onClick={() => notify({ title: 'Reset link sent', body: `Check ${professional.email} · valid 30 minutes`, kind: 'info' })}
              className="w-full px-1 text-right text-xs font-bold text-primary"
            >
              Forgot your password?
            </button>
          </motion.div>

          <motion.div variants={item}>
            <SmoothButton
              variant="default"
              shape="pill"
              size="lg"
              className="w-full"
              onClick={() => {
                notify({ title: 'Welcome back', body: `Signed in as ${professional.name}`, kind: 'ok' })
                navigate('/professional/pr02')
              }}
            >
              Sign in <ArrowRight className="size-4" />
            </SmoothButton>
          </motion.div>

          <motion.div variants={item}>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">or</span>
              <div className="h-px flex-1 bg-border" />
            </div>
          </motion.div>

          <motion.div variants={item}>
            <SmoothButton
              variant="secondary"
              shape="pill"
              size="lg"
              className="w-full"
              onClick={() => {
                notify({ title: 'Unlocked', body: 'Fingerprint matched · signed in', kind: 'ok' })
                navigate('/professional/pr02')
              }}
            >
              <Fingerprint className="size-4 fill-current" /> Unlock with your fingerprint
            </SmoothButton>
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={ShieldCheck}
              body="Your licence and screening status stay visible to families only as verified facts, never as documents."
            />
          </motion.div>

          <motion.div variants={item}>
            <button
              onClick={() => notify({ title: 'Application started', body: 'Licence, background check and ID are the first steps', kind: 'info' })}
              className="flex w-full items-center justify-center gap-1.5 text-[13px] font-bold text-primary"
            >
              <Lock className="size-3.5" /> Not yet a caregiver on Ayvaa? Apply to join
            </button>
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="Ayvaa · Hyderabad" />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}
