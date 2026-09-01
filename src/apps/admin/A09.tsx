import { motion } from 'motion/react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Chip, Panel, Section, rise, stagger } from '@/components/phone/kit'
import { analytics } from '@/data/seed'
import { RevenueHero } from '@/components/analytics/AnalyticsSet'
import { WeeklySessionsCard } from '@/components/analytics/AnalyticsSet'
import { CategoryMixCard } from '@/components/analytics/AnalyticsSet'
import { WatchHero } from '@/components/analytics/AnalyticsSet'

export function A09() {
  const totalWeek = analytics.weekly.reduce((a, b) => a + b, 0)

  return (
    <Screen>
      <AppBar
        title="Analytics"
        subtitle="March · platform wide"
        trailing={<AgentAvatar seed="ayvaa-analytics" size={42} />}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <RevenueHero />

            <motion.div variants={rise}>
              <Section label="Sessions per week" trailing={<Chip intent="neutral">{totalWeek} total</Chip>} />
            </motion.div>

            <WeeklySessionsCard />

            <motion.div variants={rise}>
              <Section label="Care category mix" trailing={<Chip intent="neutral">March</Chip>} />
            </motion.div>

            <CategoryMixCard />

            <WatchHero />

            <motion.div variants={rise}>
              <Panel intent="neutral" className="p-3.5">
                <p className="text-center text-[11px] font-medium leading-relaxed text-[#0B211B]/45">
                  Numbers refresh live from the operations ledger · audit grade
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of analytics" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
    </Screen>
  )
}
