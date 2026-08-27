import { motion } from 'motion/react'
import { Download, Lock, Star, Target, TrendingUp, UserCheck } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import SmoothButton from '@/components/smoothui/smooth-button'
import ReviewsCarousel from '@/components/smoothui/reviews-carousel'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { InfoCard, ScreenCard, SectionHeader, StatRow } from '@/components/phone/ScreenBlocks'
import { StatCard } from '@/components/phone/Controls'
import { staff, staffFeedback } from '@/data/seed'
import { useDemo } from '@/lib/store'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function PT06() {
  const { notify } = useDemo()
  const dr = staff[1]
  return (
    <Screen>
      <AppBar title="Performance" subtitle="Dr. Venkatesh · Physiotherapist" />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard className="flex items-center gap-3">
              <AgentAvatar seed="Dr. Venkatesh" size={52} />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-foreground">Dr. Venkatesh</div>
                <div className="mt-0.5 text-[13px] font-medium text-muted-foreground">{dr.week}</div>
              </div>
            </ScreenCard>
          </motion.div>
          <motion.div variants={item} className="flex gap-3">
            <StatCard icon={UserCheck} value="27" label="Sessions" tone="mint" />
            <StatCard icon={Star} value="4.9" label="Rating" />
          </motion.div>
          <motion.div variants={item} className="flex gap-3">
            <StatCard icon={TrendingUp} value="100%" label="On time" />
            <StatCard icon={Target} value="9/11" label="Goals met" />
          </motion.div>
          <motion.div variants={item}>
            <SectionHeader label="Quality indicators" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              <div className="px-2 py-1.5">
                <StatRow icon={UserCheck} label="Sessions verified" value="27/27" />
              </div>
              <div className="px-2 py-1.5">
                <StatRow icon={Target} label="Care goals met" value="9/11" />
              </div>
              <div className="px-2 py-1.5">
                <StatRow icon={Star} label="Incidents resolved" value="2/2" />
              </div>
              <div className="px-2 py-1.5">
                <StatRow icon={TrendingUp} label="Notes rated helpful" value="96%" />
              </div>
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <SectionHeader label="Family feedback" />
          </motion.div>
          <motion.div variants={item}>
            <ReviewsCarousel
              reviews={[
                {
                  id: 'fb1',
                  author: staffFeedback.family,
                  title: '5 stars',
                  body: staffFeedback.quote,
                },
              ]}
              height="140px"
              showIndicators={false}
              showNavigation={false}
            />
          </motion.div>
          <motion.div variants={item}>
            <InfoCard icon={Lock} body="Feedback is shown to partners only after the family approves sharing. Nothing is ever edited." />
          </motion.div>
          <EndOfScroll label="End of performance" />
        </motion.div>
      </BodyArea>
      <FootBar>
        <SmoothButton variant="soft" shape="pill" size="lg" className="w-full" onClick={() => notify({ title: 'Report queued', body: 'Performance report will be emailed to Sunrise', kind: 'info' })}>
          <Download className="size-4" /> Export performance report
        </SmoothButton>
      </FootBar>
    </Screen>
  )
}