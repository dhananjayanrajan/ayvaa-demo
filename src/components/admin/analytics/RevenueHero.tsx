import { useState } from 'react'
import { motion } from 'motion/react'
import { Star, TrendingUp, UserCheck } from 'lucide-react'
import PriceFlow from '@/components/smoothui/price-flow'
import { Chip, Hero, Kicker, StatStrip, rise } from '@/components/phone/kit'
import { Sparkline } from '@/components/admin/analytics/Sparkline'
import { analytics } from '@/data/seed'
import { cn } from '@/lib/utils'

type Range = 'week' | 'month'

export function RevenueHero() {
  const [range, setRange] = useState<Range>('month')
  const monthRevenue = 48.6
  const weekRevenue = 12.15

  const activeRevenue = range === 'month' ? monthRevenue : weekRevenue
  const rangeLabel = range === 'month' ? 'Revenue · March' : 'Revenue · This week'
  const rangeSessions = range === 'month' ? analytics.sessions : 'Last 7 days · 253 sessions'
  const sparkData = range === 'month' ? analytics.weekly : analytics.weekly.slice(-4)
  const totalSessions = range === 'month' ? analytics.weekly.reduce((a, b) => a + b, 0) : sparkData.reduce((a, b) => a + b, 0)

  return (
    <motion.div variants={rise}>
      <Hero>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Kicker>{rangeLabel}</Kicker>
            <div className="mt-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
              <span className="text-[17px] font-extrabold text-emerald-200/80">₹</span>
              <PriceFlow value={activeRevenue} className="text-[32px] font-extrabold leading-none tracking-tight text-white" />
              <span className="text-[13px] font-bold text-emerald-100/55">lakh</span>
            </div>
          </div>
          <Chip intent="success" light icon={TrendingUp}>
            {analytics.delta}
          </Chip>
        </div>
        <p className="mt-1.5 text-[12px] font-medium leading-relaxed text-emerald-100/55">{rangeSessions}</p>

        <div className="mt-3 flex w-fit gap-1 rounded-full bg-white/[0.07] p-1">
          {(['week', 'month'] as Range[]).map((r) => {
            const active = range === r
            return (
              <motion.button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                className="relative rounded-full px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.1em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
              >
                {active && (
                  <motion.span
                    layoutId="a09-revenue-range"
                    transition={{ type: 'spring', stiffness: 480, damping: 38 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                  />
                )}
                <span className={cn('relative block', active ? 'text-white' : 'text-emerald-100/60')}>
                  {r === 'week' ? 'Week' : 'Month'}
                </span>
              </motion.button>
            )
          })}
        </div>

        <Sparkline data={sparkData} />

        <StatStrip
          className="mt-5"
          cells={[
            { key: 'utilisation', value: analytics.utilisation, label: 'Utilisation', dot: 'bg-emerald-300' },
            { key: 'quality', value: analytics.quality, label: 'Avg rating', dot: 'bg-teal-300' },
            { key: 'miss', value: analytics.missRate, label: 'Miss rate', dot: 'bg-rose-300/80' },
          ]}
        />

        <div className="mt-4 flex flex-wrap gap-1.5">
          <Chip intent="neutral" light icon={UserCheck}>{totalSessions} sessions</Chip>
          <Chip intent="success" light icon={Star}>4.8 quality</Chip>
        </div>
      </Hero>
    </motion.div>
  )
}
