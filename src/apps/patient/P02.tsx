import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Eye, EyeOff, Fingerprint, Mail, ShieldCheck } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { InfoCard } from '@/components/phone/ScreenBlocks'
import { Field, SectionLabel } from '@/components/phone/Controls'
import { guardian } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function P02() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [showPass, setShowPass] = useState(false)

  return (
    <Screen>
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item} className="flex flex-col items-center gap-1.5 pt-6">
            <span className="text-3xl font-black tracking-tight text-foreground">
              ayvaa<span className="text-primary">+</span>
            </span>
            <span className="mt-2 text-xl font-bold text-foreground">Welcome back</span>
            <span className="text-[13px] font-medium text-muted-foreground">
              Sign in to keep your family's care on track
            </span>
          </motion.div>
          <motion.div variants={item} className="mt-2">
            <Field icon={Mail} value={guardian.email} hint="Email address" onClick={() => notify({ title: 'Email', body: guardian.email, kind: 'info' })} />
          </motion.div>
          <motion.div variants={item}>
            <Field
              value={showPass ? 'ayvaa-family-2026' : '••••••••••'}
              hint="Password"
              icon={showPass ? EyeOff : Eye}
              onClick={() => setShowPass((v) => !v)}
            />
          </motion.div>
          <motion.div variants={item}>
            <button
              onClick={() => navigate('/patient/p05')}
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
                notify({ title: 'Welcome back', body: `Signed in as ${guardian.name}`, kind: 'ok' })
                navigate('/patient/p06')
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
                navigate('/patient/p06')
              }}
            >
              <Fingerprint className="size-4 fill-current" /> Unlock with your fingerprint
            </SmoothButton>
          </motion.div>
          <motion.div variants={item}>
            <InfoCard icon={ShieldCheck} body="Your family's medical records stay sealed until your identity is verified." />
          </motion.div>
          <motion.div variants={item}>
            <SectionLabel>new to ayvaa?</SectionLabel>
          </motion.div>
          <motion.div variants={item}>
            <SmoothButton variant="outline" shape="pill" size="lg" className="w-full" onClick={() => navigate('/patient/p01')}>
              Create an account
            </SmoothButton>
          </motion.div>
          <motion.div variants={item}>
            <EndOfScroll label="Ayvaa · Hyderabad" />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}
