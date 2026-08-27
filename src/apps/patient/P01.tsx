import { useState } from 'react'
import { motion } from 'motion/react'
import { Check, Eye, EyeOff, HeartPulse, Mail, Phone, ShieldCheck, User } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { InfoCard } from '@/components/phone/ScreenBlocks'
import { Field, SectionLabel } from '@/components/phone/Controls'
import { guardian } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function P01() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [showPass, setShowPass] = useState(false)
  const [agreed, setAgreed] = useState(true)

  return (
    <Screen>
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item} className="flex flex-col items-center gap-2 pt-6">
            <span className="text-3xl font-black tracking-tight text-foreground">
              ayvaa<span className="text-primary">+</span>
            </span>
          </motion.div>
          <motion.div variants={item}>
            <ScreenCardTone>
              <div className="flex flex-col items-center gap-2.5 py-4 text-center">
                <span className="grid size-[76px] place-items-center rounded-full bg-white">
                  <HeartPulse className="size-9 fill-current text-primary" />
                </span>
                <span className="text-base font-bold text-brand-ink">Care your family can trust</span>
                <span className="max-w-[260px] text-[13px] font-medium leading-snug text-brand-ink/80">
                  Verified caregivers, checked visits and honest records for the people you love.
                </span>
              </div>
            </ScreenCardTone>
          </motion.div>
          <motion.div variants={item}>
            <SectionLabel>Create your guardian account</SectionLabel>
          </motion.div>
          <motion.div variants={item}>
            <Field icon={User} value={guardian.name} hint="Your full name" onClick={() => notify({ title: 'Your name', body: `${guardian.name} · guardian account`, kind: 'info' })} />
          </motion.div>
          <motion.div variants={item}>
            <Field icon={Mail} value={guardian.email} hint="Email address" onClick={() => notify({ title: 'Email', body: guardian.email, kind: 'info' })} />
          </motion.div>
          <motion.div variants={item}>
            <Field icon={Phone} value={guardian.phone} hint="Phone number" onClick={() => notify({ title: 'Phone', body: `${guardian.phone} · verified by OTP next`, kind: 'info' })} />
          </motion.div>
          <motion.div variants={item}>
            <Field
              value={showPass ? 'ayvaa-family-2026' : '••••••••••'}
              hint="Create a password"
              icon={showPass ? EyeOff : Eye}
              onClick={() => setShowPass((v) => !v)}
            />
          </motion.div>
          <motion.div variants={item}>
            <button onClick={() => setAgreed((v) => !v)} className="flex w-full items-start gap-2.5 px-1 text-left">
              <span
                className={cn(
                  'mt-0.5 grid size-[22px] shrink-0 place-items-center rounded-[7px] border-2 transition-colors',
                  agreed ? 'border-primary bg-primary text-white' : 'border-border bg-card',
                )}
              >
                {agreed && <Check className="size-4" />}
              </span>
              <span className="text-xs font-medium leading-snug text-muted-foreground">
                I agree to the care terms and the family privacy promise.
              </span>
            </button>
          </motion.div>
          <motion.div variants={item}>
            <SmoothButton
              variant="default"
              shape="pill"
              size="lg"
              className="w-full"
              onClick={() => {
                notify({ title: 'Account created', body: 'Verify your phone to continue', kind: 'ok' })
                navigate('/patient/p03')
              }}
            >
              Create account
            </SmoothButton>
          </motion.div>
          <motion.div variants={item}>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">already with us?</span>
              <div className="h-px flex-1 bg-border" />
            </div>
          </motion.div>
          <motion.div variants={item}>
            <SmoothButton
              variant="secondary"
              shape="pill"
              size="lg"
              className="w-full"
              onClick={() => navigate('/patient/p02')}
            >
              Sign in instead
            </SmoothButton>
          </motion.div>
          <motion.div variants={item}>
            <InfoCard icon={ShieldCheck} body="Guardians verify once. This protects every medical record and consent in your family plan." />
          </motion.div>
          <motion.div variants={item}>
            <EndOfScroll label="Ayvaa · Hyderabad" />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}

function ScreenCardTone({ children }: { children: React.ReactNode }) {
  return <div className="rounded-[20px] bg-mint p-4">{children}</div>
}
