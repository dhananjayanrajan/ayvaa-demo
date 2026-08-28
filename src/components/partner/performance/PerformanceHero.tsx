import { motion } from 'motion/react'
import { BadgeCheck, TrendingUp } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { Chip, Hero, Ring } from '@/components/phone/kit'
import { Stars } from './Stars'
import { cn } from '@/lib/utils'
import type { PerformanceData, PerformanceMonth } from './types'

interface PerformanceHeroProps {
  data: PerformanceData
  activeMonth: PerformanceMonth
  onMonthChange: (month: PerformanceMonth) => void
  onOpenFeedback: () => void
}

export function PerformanceHero({ data, activeMonth, onMonthChange, onOpenFeedback }: PerformanceHeroProps) {
  const months: PerformanceMonth[] = ['March', 'February']
  return (
    <Hero>
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <AgentAvatar seed="Dr. Venkatesh" size={56} />
          <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-emerald-400 text-[#0B231C] shadow-md">
            <BadgeCheck className="h-3 w-3" strokeWidth={3} aria-hidden />
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">Performance · {data.month}</div>
          <h2 className="mt-1.5 text-[18px] font-extrabold leading-tight tracking-tight text-white">Dr. Venkatesh</h2>
          <p className="mt-0.5 text-[11.5px] font-semibold text-emerald-100/55">Physiotherapist · Sunrise panel</p>
          <p className="text-[10.5px] font-medium text-emerald-100/40">{data.week}</p>
        </div>
        <Ring value={data.rating / 5} size={72} stroke={6} id="pt06-ring">
          <span className="text-[15px] font-extrabold tabular-nums leading-none text-white">{data.rating}</span>
          <span className="mt-0.5 text-[7px] font-bold uppercase tracking-[0.16em] text-emerald-200/50">rating</span>
        </Ring>
      </div>

      <div className="mt-4 flex gap-1 rounded-2xl bg-white/[0.06] p-1">
        {months.map((month) => {
          const isActive = activeMonth === month
          return (
            <motion.button
              key={month}
              type="button"
              onClick={() => onMonthChange(month)}
              whileTap={{ scale: 0.97 }}
              aria-pressed={isActive}
              className={cn(
                'relative flex-1 rounded-xl px-2 py-2 text-center text-[10px] font-extrabold uppercase tracking-[0.12em] outline-none transition-colors',
                isActive ? 'text-white' : 'text-emerald-100/60 hover:text-emerald-100',
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="performance-month-bg"
                  className="absolute inset-0 rounded-xl bg-white/[0.12]"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{month}</span>
            </motion.button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={onOpenFeedback}
        className="mt-4 flex w-full items-center justify-between rounded-2xl bg-white/[0.06] px-3.5 py-3 text-left outline-none transition-colors hover:bg-white/[0.09] focus-visible:ring-2 focus-visible:ring-emerald-300/50"
      >
        <div className="min-w-0">
          <Stars />
          <div className="mt-1 truncate text-[10.5px] font-bold text-emerald-100/60">
            Family-rated across every completed visit
          </div>
        </div>
        <Chip intent="success" light icon={TrendingUp} className="shrink-0 border-transparent">
          {data.ratingChange}
        </Chip>
      </button>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Chip intent="success" light className="border-transparent">{data.incidentsResolved}</Chip>
        <Chip intent="warning" light className="border-transparent">{data.goalsInProgress}</Chip>
      </div>
    </Hero>
  )
}
