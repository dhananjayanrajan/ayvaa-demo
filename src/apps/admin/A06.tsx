import { motion } from 'motion/react'
import { Ban, CalendarClock, FileCheck, Phone, ShieldCheck } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill, StatCard } from '@/components/phone/Controls'
import { consentReview, consentTracking, consentWithdrawal } from '@/data/seed'
import { useDemo } from '@/lib/store'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function A06() {
  const { notify } = useDemo()
  return (
    <Screen>
      <AppBar
        title="Consent tracking"
        subtitle="Signed · due · withdrawn"
        trailing={<AgentAvatar seed="ayvaa-consent" size={42} />}
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item} className="flex gap-3">
            <StatCard icon={FileCheck} value={consentTracking.active} label="Active consents" tone="mint" />
            <StatCard icon={CalendarClock} value={consentTracking.due} label="Due for review" tone="warn" />
          </motion.div>
          <motion.div variants={item} className="flex gap-3">
            <StatCard icon={Ban} value={consentTracking.withdrawn} label="Withdrawn" tone="error" />
            <StatCard icon={ShieldCheck} value="90" label="Day cycle" />
          </motion.div>
          <motion.div variants={item}>
            <SectionHeader label="Due for review" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard>
              <div className="flex items-start gap-3">
                <IconTile icon={CalendarClock} tone="warn" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">{consentReview.name}</span>
                    <Pill tone="warn">{consentReview.due}</Pill>
                  </div>
                  <div className="mt-0.5 text-[13px] font-medium text-muted-foreground">{consentReview.category}</div>
                </div>
              </div>
              <div className="mt-3 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-medium text-muted-foreground">Signed</span>
                  <span className="font-bold text-foreground">{consentReview.signed}</span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-medium text-muted-foreground">Pauses</span>
                  <span className="font-bold text-foreground">{consentReview.pauses}</span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-medium text-muted-foreground">Reminded</span>
                  <span className="font-bold text-foreground">{consentReview.reminded}</span>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {consentReview.pills.map((p) => (
                  <Pill key={p} tone="grey">{p}</Pill>
                ))}
              </div>
              <div className="mt-3 flex gap-2.5">
                <SmoothButton variant="secondary" shape="pill" className="flex-1" onClick={() => notify({ title: 'Record opened', body: `${consentReview.name} · consent history attached`, kind: 'info' })}>
                  View record
                </SmoothButton>
                <SmoothButton variant="default" shape="pill" className="flex-1" onClick={() => notify({ title: 'Guardian called', body: 'Priya Sharma reached · review scheduled', kind: 'ok' })}>
                  <Phone className="size-4" /> Call guardian
                </SmoothButton>
              </div>
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <SectionHeader label="Withdrawn" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard tone="error">
              <div className="flex items-start gap-3">
                <IconTile icon={Ban} tone="destructive" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-destructive">{consentWithdrawal.name} · withdrawn {consentWithdrawal.time}</div>
                  <div className="mt-0.5 text-[13px] font-medium leading-snug text-destructive/80">
                    {consentWithdrawal.body}
                  </div>
                </div>
              </div>
              <div className="mt-3 rounded-[14px] bg-white/60 p-3 text-[13px] font-medium text-foreground/80">
                {consentWithdrawal.option}
              </div>
              <div className="mt-3">
                <SmoothButton variant="outline" shape="pill" className="w-full" onClick={() => notify({ title: 'Checklist confirmed', body: 'Closure checklist completed · record sealed', kind: 'ok' })}>
                  {consentWithdrawal.action}
                </SmoothButton>
              </div>
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <InfoCard icon={ShieldCheck} body="Consents are re-confirmed every 90 days. Withdrawals stop care immediately and keep a sealed record." />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}