import { useState } from 'react'
import { motion } from 'motion/react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Section, rise, stagger } from '@/components/phone/kit'
import { PerformanceHero } from '@/components/partner/performance/PerformanceHero'
import { PerformanceKpis } from '@/components/partner/performance/PerformanceKpis'
import { CareGoalsCard } from '@/components/partner/performance/CareGoalsCard'
import { FamilyFeedbackCard } from '@/components/partner/performance/FamilyFeedbackCard'
import { PerformancePrivacyNote } from '@/components/partner/performance/PerformancePrivacyNote'
import { PerformanceFeedbackSheet } from '@/components/partner/performance/PerformanceFeedbackSheet'
import { PerformanceKpiSheet } from '@/components/partner/performance/PerformanceKpiSheet'
import { PerformanceFooter } from '@/components/partner/performance/PerformanceFooter'
import { performanceMonths } from '@/components/partner/performance/performanceData'
import type { PerformanceData, PerformanceMonth, FeedbackEntry } from '@/components/partner/performance/types'
import { useDemo } from '@/lib/store'
import { Target, TrendingUp, UserCheck, Star } from 'lucide-react'

export function PT06() {
  const { notify } = useDemo()
  const [activeMonth, setActiveMonth] = useState<PerformanceMonth>('March')
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackEntry | null>(null)
  const [selectedKpi, setSelectedKpi] = useState<any>(null)

  const current = performanceMonths.find((m) => m.month === activeMonth) ?? performanceMonths[0]

  const kpis = [
    {
      icon: UserCheck,
      value: `${current.sessions}`,
      label: 'Sessions',
      tint: 'bg-emerald-500/[0.09]',
      iconBg: 'bg-emerald-500/15 text-emerald-600',
      detail: `${current.sessions} sessions completed in ${current.month}. This includes all home visits and clinic sessions. Average duration 45 minutes.`,
    },
    {
      icon: TrendingUp,
      value: current.onTime,
      label: 'On time',
      tint: 'bg-sky-500/[0.08]',
      iconBg: 'bg-sky-500/15 text-sky-600',
      detail: `${current.onTime} of sessions started within 5 minutes of scheduled time. No missed appointments this month.`,
    },
    {
      icon: Target,
      value: `${current.goalsMet}/${current.goalsTotal}`,
      label: 'Goals met',
      tint: 'bg-amber-500/[0.09]',
      iconBg: 'bg-amber-500/15 text-amber-600',
      detail: `${current.goalsMet} out of ${current.goalsTotal} care goals achieved. ${current.goalsInProgress}.`,
    },
    {
      icon: Star,
      value: `${current.rating}`,
      label: 'Rating',
      tint: 'bg-teal-500/[0.09]',
      iconBg: 'bg-teal-500/15 text-teal-600',
      detail: `${current.rating} average family rating across ${current.sessions} sessions. Change from last month: ${current.ratingChange}.`,
    },
  ]

  const openFeedback = (index: number) => {
    setSelectedFeedback(current.feedbacks[index])
  }

  return (
    <Screen>
      <AppBar title="Performance" subtitle="Dr. Venkatesh · Physiotherapist" />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-5 pt-1">
            <motion.div variants={rise}>
              <PerformanceHero
                data={current}
                activeMonth={activeMonth}
                onMonthChange={setActiveMonth}
                onOpenFeedback={() => openFeedback(0)}
              />
            </motion.div>

            <motion.div variants={rise}>
              <PerformanceKpis kpis={kpis} onSelect={setSelectedKpi} />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Care goals" trailing={<span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/45">{current.goalsTotal - current.goalsMet} open</span>} />
            </motion.div>

            <motion.div variants={rise}>
              <CareGoalsCard data={current} />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Family feedback" />
            </motion.div>

            <motion.div variants={rise}>
              <FamilyFeedbackCard data={current} onOpen={openFeedback} />
            </motion.div>

            <motion.div variants={rise}>
              <PerformancePrivacyNote />
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of performance" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <PerformanceFooter onExport={() => notify({ title: 'Report queued', body: `Performance report for ${current.month} will be emailed to Sunrise`, kind: 'info' })} />
      </FootBar>
      <PerformanceFeedbackSheet feedback={selectedFeedback} onClose={() => setSelectedFeedback(null)} />
      <PerformanceKpiSheet kpi={selectedKpi} onClose={() => setSelectedKpi(null)} />
    </Screen>
  )
}
