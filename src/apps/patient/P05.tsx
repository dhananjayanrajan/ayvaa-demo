import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowLeft, Lock, MailCheck, RotateCcw, ShieldCheck, Clock } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Field, Pill } from '@/components/phone/Controls'
import { guardian } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function P05() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [sent, setSent] = useState(false)

  const send = () => {
    setSent(true)
    notify({ title: 'Reset link sent', body: `Check ${guardian.email} · valid for 30 minutes`, kind: 'ok' })
  }

  return (
    <Screen>
      <AppBar title="Reset password" onBack={() => navigate('/patient/p02')} />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item} className="px-1 pt-1">
            <div className="text-xl font-bold text-foreground">Let's get you back in</div>
            <div className="mt-1 text-[13px] font-medium text-muted-foreground">
              We will send a secure reset link to your email.
            </div>
          </motion.div>
          <motion.div variants={item}>
            <Field icon={MailCheck} value={guardian.email} hint="Email address" onClick={() => notify({ title: 'Email', body: guardian.email, kind: 'info' })} />
          </motion.div>
          <motion.div variants={item}>
            <SmoothButton variant="default" shape="pill" size="lg" className="w-full" onClick={send}>
              Send reset link
            </SmoothButton>
          </motion.div>
          {sent && (
            <motion.div variants={item} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <ScreenCard className="flex items-center gap-3">
                <IconTile icon={MailCheck} tone="mint" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-foreground">Reset link sent</div>
                  <div className="text-xs font-medium text-muted-foreground">
                    Check your inbox · sent just now · valid for 30 minutes
                  </div>
                </div>
                <Pill tone="ok">Sent</Pill>
              </ScreenCard>
            </motion.div>
          )}
          <motion.div variants={item}>
            <SectionHeader label="While you wait" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              <div className="flex items-center gap-3 px-2 py-1.5">
                <IconTile icon={Clock} tone="tonal" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-foreground">Today's visits are unaffected</div>
                  <div className="text-xs font-medium text-muted-foreground">Lakshmi's 2:00 PM visit proceeds as planned</div>
                </div>
              </div>
              <div className="mt-1 flex items-center gap-3 px-2 py-1.5">
                <IconTile icon={ShieldCheck} tone="tonal" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-foreground">Your records stay sealed</div>
                  <div className="text-xs font-medium text-muted-foreground">Nobody can access them during a reset</div>
                </div>
              </div>
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <button
              onClick={() => notify({ title: 'Opening mail app', body: `Handing off to your mail for ${guardian.email}`, kind: 'info' })}
              className="mx-auto flex items-center gap-1.5 text-xs font-bold text-primary"
            >
              <RotateCcw className="size-3.5" /> Open my mail app
            </button>
          </motion.div>
          <motion.div variants={item}>
            <button
              onClick={() => notify({ title: 'Care team verifying', body: 'A coordinator will call you within 10 minutes', kind: 'info' })}
              className="mx-auto block text-center text-xs font-medium text-muted-foreground"
            >
              Still stuck? The care team can verify you by phone.
            </button>
          </motion.div>
          <motion.div variants={item}>
            <InfoCard icon={Lock} body="Reset links are single-use and expire in 30 minutes. Password changes are logged in the audit record." />
          </motion.div>
          <motion.div variants={item}>
            <EndOfScroll label="Ayvaa account recovery" />
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <SmoothButton variant="outline" shape="pill" size="lg" className="w-full" onClick={() => navigate('/patient/p02')}>
          <ArrowLeft className="size-4" /> Back to sign in
        </SmoothButton>
      </FootBar>
    </Screen>
  )
}
