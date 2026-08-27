import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { BadgeCheck, Camera, Mail, ShieldCheck, Smile } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { guardian } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

const code = ['4', '7', '2', '9', '', '']
const maskedPhone = guardian.phone.slice(0, 9) + ' ••• ' + guardian.phone.slice(-4)

export function P03() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [seconds, setSeconds] = useState(42)

  useEffect(() => {
    if (seconds <= 0) return
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [seconds])

  const resend = () => {
    setSeconds(42)
    notify({ title: 'Code re-sent', body: `New six-digit code sent to ${maskedPhone}`, kind: 'info' })
  }

  return (
    <Screen>
      <AppBar title="Verify it is you" subtitle="Step 1 of 2" onBack={() => navigate('/patient/p02')} trailing={<Pill tone="grey">Step 1 of 2</Pill>} />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <InfoCard icon={ShieldCheck} tone="mint" body="Guardians verify once. This protects every medical record and consent in your family plan." />
          </motion.div>
          <motion.div variants={item} className="flex flex-col items-center gap-1 pt-1">
            <span className="text-xl font-bold text-foreground">Enter your code</span>
            <span className="text-[13px] font-medium text-muted-foreground">Six digits sent to {maskedPhone}</span>
          </motion.div>
          <motion.div variants={item} className="flex justify-center gap-2.5 py-1">
            {code.map((d, i) => (
              <span
                key={i}
                className={cn(
                  'grid size-12 place-items-center rounded-[14px] border bg-card text-2xl font-black text-foreground',
                  d ? 'border-2 border-primary' : 'border-border',
                )}
              >
                {d || <span className="text-lg text-muted-foreground/50">·</span>}
              </span>
            ))}
          </motion.div>
          <motion.div variants={item}>
            {seconds > 0 ? (
              <div className="text-center text-xs font-medium text-muted-foreground">
                Resend code in 00:{String(seconds).padStart(2, '0')}
              </div>
            ) : (
              <button onClick={resend} className="mx-auto block text-xs font-bold text-primary">
                Resend code now
              </button>
            )}
          </motion.div>
          <motion.div variants={item}>
            <SmoothButton
              variant="default"
              shape="pill"
              size="lg"
              className="w-full"
              onClick={() => {
                notify({ title: 'Phone verified', body: 'Code matched · continue to ID check', kind: 'ok' })
                navigate('/patient/p04')
              }}
            >
              <BadgeCheck className="size-4" /> Verify and continue
            </SmoothButton>
          </motion.div>
          <motion.div variants={item}>
            <SectionHeader label="What comes next" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              <div className="flex items-center gap-3 px-2 py-1.5">
                <IconTile icon={Camera} tone="mint" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-foreground">A photo of your ID card</div>
                  <div className="text-xs font-medium text-muted-foreground">Takes under a minute</div>
                </div>
                <Pill tone="grey">Up next</Pill>
              </div>
              <div className="mt-1 flex items-center gap-3 px-2 py-1.5">
                <IconTile icon={Smile} tone="mint" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-foreground">A short selfie to match it</div>
                  <div className="text-xs font-medium text-muted-foreground">Deleted after matching, never stored</div>
                </div>
                <Pill tone="grey">After</Pill>
              </div>
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <button
              onClick={() => notify({ title: 'Code sent by email', body: `Six-digit code sent to ${guardian.email}`, kind: 'info' })}
              className="mx-auto flex items-center gap-1.5 text-xs font-bold text-primary"
            >
              <Mail className="size-3.5" /> Did not get a code? Use email instead
            </button>
          </motion.div>
          <motion.div variants={item}>
            <EndOfScroll label="Ayvaa identity check" />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}
