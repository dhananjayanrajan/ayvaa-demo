import { motion } from 'motion/react'
import { ArrowRight, Eye, EyeOff, KeyRound, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { InfoCard } from '@/components/phone/ScreenBlocks'
import { Field, Pill } from '@/components/phone/Controls'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function PT01() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [showPass, setShowPass] = useState(false)

  return (
    <Screen>
      <AppBar
        title="ayvaa+"
        subtitle="Partner access"
        trailing={<Pill tone="ok">Secure</Pill>}
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <div className="px-1 pt-2">
              <div className="text-xl font-bold text-foreground">Sign in as your organisation</div>
              <div className="mt-1 text-[13px] font-medium text-muted-foreground">
                Sunrise Multispeciality Hospital · Jubilee Hills
              </div>
            </div>
          </motion.div>
          <motion.div variants={item}>
            <Field label="Organisation" value="Sunrise Multispeciality Hospital" icon={KeyRound} onClick={() => notify({ title: 'Organisation', body: 'Sunrise Multispeciality Hospital · provisioned by admin', kind: 'info' })} />
          </motion.div>
          <motion.div variants={item}>
            <Field label="Work email" value="care.ops@sunrisehospitals.in" icon={KeyRound} onClick={() => notify({ title: 'Work email', body: 'care.ops@sunrisehospitals.in · access last used today', kind: 'info' })} />
          </motion.div>
          <motion.div variants={item}>
            <Field
              value={showPass ? 'sunrise-care-2026' : '••••••••'}
              hint="Password"
              icon={showPass ? EyeOff : Eye}
              onClick={() => setShowPass((v) => !v)}
            />
          </motion.div>
          <motion.div variants={item}>
            <SmoothButton
              variant="default"
              shape="pill"
              size="lg"
              className="w-full"
              onClick={() => {
                notify({ title: 'Signed in', body: 'Welcome back, Sunrise care team', kind: 'ok' })
                navigate('/partner/pt02')
              }}
            >
              Sign in securely <ArrowRight className="size-4" />
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
              onClick={() => notify({ title: 'SSO started', body: 'Redirecting to your identity provider…', kind: 'info' })}
            >
              <KeyRound className="size-4" /> Continue with SSO
            </SmoothButton>
          </motion.div>
          <motion.div variants={item}>
            <InfoCard icon={ShieldCheck} body="Provisioned by your hospital admin. Every sign-in is logged and tied to your organisation." />
          </motion.div>
          <motion.div variants={item}>
            <EndOfScroll label="End of sign in" />
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <button className="w-full text-center text-[13px] font-bold text-primary" onClick={() => notify({ title: 'Access request sent', body: 'Your hospital admin will approve provisioning', kind: 'info' })}>
          New here? Request partner access
        </button>
      </FootBar>
    </Screen>
  )
}