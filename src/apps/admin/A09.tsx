import { motion } from 'motion/react'
import { Download, Star, TrendingUp, UserCheck, XCircle } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import SmoothButton from '@/components/smoothui/smooth-button'
import PriceFlow from '@/components/smoothui/price-flow'
import AnimatedProgressBar from '@/components/smoothui/animated-progress-bar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill, StatCard } from '@/components/phone/Controls'
import { analytics } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

const weekColors = ['bg-tonal', 'bg-[#BFE5DA]', 'bg-tonal', 'bg-primary']
const mixColors = ['bg-primary', 'bg-[#33739E]', 'bg-[#DBA800]', 'bg-brand-ink', 'bg-[#3A3F63]']

export function A09() {
  const { notify } = useDemo()
  return (
    <Screen>
      <AppBar
        title="Analytics"
        subtitle="March · platform wide"
        trailing={<AgentAvatar seed="ayvaa-analytics" size={42} />}
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard tone="mint">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-bold uppercase tracking-wide text-brand-ink/70">Revenue this month</div>
                <Pill tone="ok" className="bg-white/70">{analytics.delta}</Pill>
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-brand-ink">₹</span>
                <PriceFlow value={48.6} className="text-3xl font-bold text-brand-ink" />
                <span className="text-sm font-bold text-brand-ink/70">lakh</span>
              </div>
              <div className="mt-1 text-[13px] font-medium text-brand-ink/80">{analytics.sessions}</div>
            </ScreenCard>
          </motion.div>
          <motion.div variants={item} className="flex gap-3">
            <StatCard icon={TrendingUp} value={analytics.utilisation} label="Utilisation" tone="mint" />
            <StatCard icon={Star} value={analytics.quality} label="Avg rating" />
          </motion.div>
          <motion.div variants={item} className="flex gap-3">
            <StatCard icon={UserCheck} value="1,012" label="Sessions" />
            <StatCard icon={XCircle} value={analytics.missRate} label="Miss rate" tone="error" />
          </motion.div>
          <motion.div variants={item}>
            <SectionHeader label="Sessions per week" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="flex flex-col gap-3">
              {analytics.weekly.map((v, i) => (
                <button
                  key={i}
                  onClick={() =>
                    notify({ title: `Week ${i + 1}`, body: `${v} sessions · tap peers for a breakdown`, kind: 'info' })
                  }
                  className="flex items-center gap-3 text-left"
                >
                  <span className="w-12 shrink-0 text-xs font-bold text-muted-foreground">Wk {i + 1}</span>
                  <AnimatedProgressBar value={v} className="flex-1" barClassName={weekColors[i]} />
                  <span className="w-8 shrink-0 text-right text-xs font-bold text-foreground">{v}</span>
                </button>
              ))}
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <SectionHeader label="Care category mix" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="flex flex-col gap-3">
              {analytics.mix.map((m, i) => (
                <button
                  key={m.label}
                  onClick={() =>
                    notify({ title: m.label, body: `${m.value} of this month's sessions · ${m.label} care`, kind: 'info' })
                  }
                  className="flex items-center gap-3 text-left"
                >
                  <span className={cn('size-2.5 shrink-0 rounded-full', mixColors[i])} />
                  <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-foreground/80">{m.label}</span>
                  <AnimatedProgressBar value={Number(m.value.replace('%', ''))} className="w-20" barClassName={mixColors[i]} />
                  <span className="w-10 shrink-0 text-right text-xs font-bold text-foreground">{m.value}</span>
                </button>
              ))}
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <InfoCard icon={TrendingUp} body={analytics.watch} />
          </motion.div>
          <motion.div variants={item}>
            <EndOfScroll label="End of analytics" />
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <SmoothButton variant="outline" shape="pill" size="lg" className="w-full" onClick={() => notify({ title: 'Report queued', body: 'March analytics will be emailed to you', kind: 'info' })}>
          <Download className="size-4" /> Export report
        </SmoothButton>
      </FootBar>
    </Screen>
  )
}