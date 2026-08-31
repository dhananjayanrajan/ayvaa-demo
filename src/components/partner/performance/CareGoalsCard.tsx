import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, Star } from 'lucide-react'
import { Card, Chip, Ring } from '@/components/phone/kit'
import { cn } from '@/lib/utils'
import type { PerformanceData } from '@/data/partnerPerformanceTypes'

interface CareGoalsCardProps {
  data: PerformanceData
}

export function CareGoalsCard({ data }: CareGoalsCardProps) {
  const [expandedGoal, setExpandedGoal] = useState<string | null>(null)
  const { goalsMet, goalsTotal } = data
  const progress = goalsMet / goalsTotal

  return (
    <Card>
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-baseline justify-between">
              <span className="text-[13px] font-extrabold tracking-tight text-[#0B211B]">Recovery plan</span>
              <span className="text-[13px] font-extrabold tabular-nums text-[#0B211B]/60">
                {goalsMet}
                <span className="text-[#0B211B]/35">/{goalsTotal} met</span>
              </span>
            </div>
            <div className="mt-3 flex gap-1">
              {Array.from({ length: goalsTotal }, (_, i) => (
                <motion.span
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.2 + i * 0.04, duration: 0.25 }}
                  className={cn(
                    'h-2.5 min-w-0 flex-1 rounded-full',
                    i < goalsMet ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-amber-400/80',
                  )}
                />
              ))}
            </div>
          </div>
          <Ring value={progress} size={56} stroke={5} id="care-goals-ring">
            <span className="text-[12px] font-extrabold tabular-nums leading-none text-[#0B211B]">{Math.round(progress * 100)}%</span>
          </Ring>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {data.goals.map((g) => {
            const isExpanded = expandedGoal === g.label
            return (
              <div key={g.label}>
                <motion.button
                  type="button"
                  onClick={() => setExpandedGoal(isExpanded ? null : g.label)}
                  className="flex w-full items-center gap-2.5 rounded-xl px-1 py-1 text-left outline-none transition-colors hover:bg-[#0B211B]/[0.03] focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                  whileTap={{ scale: 0.99 }}
                >
                  <span
                    className={cn(
                      'grid h-4 w-4 shrink-0 place-items-center rounded-full',
                      g.done ? 'bg-emerald-500 text-white' : 'bg-amber-400/25',
                    )}
                  >
                    {g.done ? (
                      <Star className="h-2.5 w-2.5 fill-white" aria-hidden />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    )}
                  </span>
                  <span
                    className={cn(
                      'min-w-0 flex-1 truncate text-[12px] font-bold',
                      g.done ? 'text-[#0B211B]/70' : 'text-[#0B211B]/45',
                    )}
                  >
                    {g.label}
                  </span>
                  <Chip intent={g.done ? 'success' : 'warning'}>{g.done ? 'Met' : 'Open'}</Chip>
                  <ChevronDown
                    className={cn(
                      'h-3 w-3 shrink-0 text-[#0B211B]/30 transition-transform',
                      isExpanded && 'rotate-180',
                    )}
                    aria-hidden
                  />
                </motion.button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      className="overflow-hidden"
                    >
                      <p className="ml-6 mt-1 text-[11px] font-medium leading-relaxed text-[#0B211B]/55">
                        {g.note}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
