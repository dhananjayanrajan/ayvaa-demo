import { useState } from 'react'
import { Building2, Eye, EyeOff, KeyRound, Lock, Mail, ShieldCheck } from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter } from '@/lib/router'
import { useDemo } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { BodyArea, Screen } from '@/components/phone/Screen'
import { Field, Pill } from '@/components/phone/Controls'
import { partner } from '@/data/seed'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export function PT01() {
  const { navigate } = useRouter()
  const { notify } = useDemo()
  const [showPw, setShowPw] = useState(false)

  return (
    <Screen>
      <BodyArea className="justify-center gap-3.5">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3.5">
          <motion.div variants={item} className="flex justify-center">
            <span className="text-[34px] font-black tracking-[-2px] text-foreground">
              ayvaa<span className="text-primary">+</span>
            </span>
          </motion.div>
          <motion.div variants={item} className="flex flex-col items-center gap-1 text-center">
            <Pill tone="grey">
              <Building2 className="size-3.5" />
              Partner access
            </Pill>
            <div className="mt-1 text-xl font-bold text-foreground">Sign in as an organisation</div>
            <div className="text-[13px] font-medium text-muted-foreground">
              Referrals, staff and billing for your institution
            </div>
          </motion.div>
          <motion.div variants={item} className="flex flex-col gap-2">
            <Field icon={Building2} value={partner.name} />
            <Field icon={Mail} value={partner.email} />
            <div className="relative">
              <Input
                readOnly
                type={showPw ? 'text' : 'password'}
                value="sunrise@2024"
                className="h-[54px] rounded-full border-border bg-card pl-11 pr-12 text-sm font-medium text-foreground"
              />
              <Lock className="absolute left-4 top-1/2 z-1 size-5 -translate-y-1/2 text-muted-foreground" />
              <button
                onClick={() => setShowPw(!showPw)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-label="Toggle password"
              >
                {showPw ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
          </motion.div>
          <motion.div variants={item}>
            <Button onClick={() => navigate('/partner/pt02')} className="h-13 w-full rounded-full text-[15px] font-bold">
              Sign in securely
            </Button>
          </motion.div>
          <motion.div variants={item} className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-medium text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-border" />
          </motion.div>
          <motion.div variants={item}>
            <Button
              variant="secondary"
              onClick={() => notify({ title: 'Hospital SSO', body: 'Redirecting to Sunrise identity provider', kind: 'info' })}
              className="h-13 w-full rounded-full text-[15px] font-bold"
            >
              <KeyRound className="size-5" />
              Sign in with hospital SSO
            </Button>
          </motion.div>
          <motion.div variants={item}>
            <Card className="flex items-start gap-3 rounded-[20px] border-0 bg-tonal p-4">
              <ShieldCheck className="mt-0.5 size-5.5 shrink-0 text-primary" />
              <p className="text-[13px] font-medium leading-[19px] text-muted-foreground">
                Partner accounts are provisioned by your organisation&apos;s administrator. Individual staff sign in
                through this same door with their own roles.
              </p>
            </Card>
          </motion.div>
          <motion.div variants={item} className="text-center text-sm font-medium text-muted-foreground">
            Want your hospital on Ayvaa? <b className="text-primary">Apply for partnership</b>
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}