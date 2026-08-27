import { motion } from 'motion/react'
import { Eye, FileText, MessageSquare } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import AnimatedProgressBar from '@/components/smoothui/animated-progress-bar'
import AnimatedStepper from '@/components/smoothui/animated-stepper'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, FootBar, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { latestVisit, referralJourney, referrals } from '@/data/seed'
import { useDemo } from '@/lib/store'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function PT04() {
  const { notify } = useDemo()
  const r = referrals[0]
  return (
    <Screen>
      <AppBar title={r.name} subtitle={`${r.condition} · referred by ${r.by}`} />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard tone="mint">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-bold uppercase tracking-wide text-brand-ink/70">Recovery progress</div>
                <Pill tone="ok" className="bg-white/70">On track</Pill>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <AnimatedProgressBar value={33} className="flex-1" barClassName="bg-brand-ink" />
                <span className="text-sm font-bold text-brand-ink">33%</span>
              </div>
              <div className="mt-2 text-[13px] font-medium text-brand-ink/80">
                {r.progress} · {r.visits} · {r.caregiver}
              </div>
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <SectionHeader label="Journey so far" />
          </motion.div>
          <motion.div variants={item}>
            <AnimatedStepper
              variant="vertical"
              currentStep={3}
              steps={referralJourney.map((s) => ({ label: s.title, description: s.body }))}
            />
          </motion.div>
          <motion.div variants={item}>
            <SectionHeader label="Latest visit" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard>
              <div className="flex items-start gap-3">
                <IconTile icon={FileText} tone="mint" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-foreground">{latestVisit.date}</div>
                  <div className="mt-1 text-[13px] font-medium leading-snug text-foreground/80">{latestVisit.quote}</div>
                  <div className="mt-1.5 text-xs font-bold text-muted-foreground">{latestVisit.by}</div>
                </div>
              </div>
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <InfoCard icon={Eye} body="Visit summaries are shared with Sunrise only after the guardian consents. Nothing is visible before that." />
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <SmoothButton variant="outline" shape="pill" size="lg" className="flex-1" onClick={() => notify({ title: 'Discharge file', body: 'Latest summary PDF opened', kind: 'info' })}>
          <FileText className="size-4" /> Discharge file
        </SmoothButton>
        <SmoothButton variant="soft" shape="pill" size="lg" className="flex-1" onClick={() => notify({ title: 'Care team messaged', body: 'Ayvaa care team will reply within the hour', kind: 'ok' })}>
          <MessageSquare className="size-4" /> Message care team
        </SmoothButton>
      </FootBar>
    </Screen>
  )
}