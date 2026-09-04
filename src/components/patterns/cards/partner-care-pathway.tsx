import { useState } from 'react'
import { motion } from 'motion/react'
import {
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Lock,
  Milestone,
  ShieldCheck,
  UserCheck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  Card,
  Chip,
  Expand,
  Panel,
  Tile,
  TimeChip,
  rise,
} from '@/components/base/phone/kit'
import type { TileTone } from '@/components/base/phone/kit'
import { cn } from '@/lib/utils'

interface JourneyStep {
  title: string
  body: string
  state: 'done' | 'now' | 'next'
}

interface PartnerCarePathwayProps {
  journey: JourneyStep[]
  latestVisit: {
    date: string
    quote: string
    by: string
  }
}

interface StateConfig {
  tone: TileTone
  icon: LucideIcon
  chipIntent: 'success' | 'warning' | 'neutral'
  chipLabel: string
  panelIntent: 'warning' | 'neutral'
}

const stateConfigs: Record<JourneyStep['state'], StateConfig> = {
  now: {
    tone: 'warning',
    icon: Clock,
    chipIntent: 'warning',
    chipLabel: 'In Progress',
    panelIntent: 'warning',
  },
  done: {
    tone: 'success',
    icon: CheckCircle2,
    chipIntent: 'success',
    chipLabel: 'Completed',
    panelIntent: 'neutral',
  },
  next: {
    tone: 'ink',
    icon: Milestone,
    chipIntent: 'neutral',
    chipLabel: 'Upcoming',
    panelIntent: 'neutral',
  },
}

export function PartnerCarePathway({ journey, latestVisit }: PartnerCarePathwayProps) {
  const activeIndex = journey.findIndex((s) => s.state === 'now')
  const [expandedId, setExpandedId] = useState<string | null>(
    activeIndex >= 0 ? `step-${activeIndex}` : 'step-0'
  )

  return (
    <motion.div variants={rise}>
      <Card>
        <div className="relative p-2">
          {journey.map((s, i) => {
            const stepId = `step-${i}`
            const open = expandedId === stepId
            const config = stateConfigs[s.state]
            const Icon = config.icon

            const isNow = s.state === 'now'
            const isDone = s.state === 'done'
            const isNext = s.state === 'next'
            const isLast = i === journey.length - 1

            return (
              <div key={s.title} className="relative">
                {!isLast && (
                  <span
                    aria-hidden
                    className={cn(
                      'absolute left-[27px] top-[48px] bottom-0 w-0.5 z-0 transition-colors duration-200',
                      isDone ? 'bg-emerald-500/25' : 'bg-[#0B211B]/[0.08]'
                    )}
                  />
                )}

                <button
                  type="button"
                  onClick={() => setExpandedId(open ? null : stepId)}
                  className={cn(
                    'relative z-10 flex w-full items-start gap-3 p-3 text-left transition-colors rounded-xl',
                    isNow && 'bg-amber-500/[0.04]'
                  )}
                >
                  <Tile
                    icon={Icon}
                    tone={config.tone}
                    className={cn('shrink-0 mt-0.5', isNext && 'opacity-40')}
                  />

                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <TimeChip className={cn('shrink-0', isNext && 'opacity-50')}>
                        Step 0{i + 1}
                      </TimeChip>
                      <Chip
                        intent={config.chipIntent}
                        icon={isDone ? Check : undefined}
                        dot={isNow}
                        className={cn('shrink-0 max-w-[140px] truncate', isNext && 'opacity-50')}
                      >
                        {config.chipLabel}
                      </Chip>
                    </span>

                    <span
                      className={cn(
                        'mt-1.5 block text-sm font-bold tracking-tight text-[#0B211B] truncate',
                        isNext && 'text-[#0B211B]/40'
                      )}
                      title={s.title}
                    >
                      {s.title}
                    </span>

                    {!open && (
                      <span
                        className={cn(
                          'mt-0.5 block text-xs font-medium leading-relaxed text-[#0B211B]/55 truncate',
                          isNext && 'text-[#0B211B]/35'
                        )}
                        title={s.body}
                      >
                        {s.body}
                      </span>
                    )}
                  </span>

                  <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 pt-1"
                  >
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-colors',
                        isNow ? 'text-amber-600/70' : 'text-[#0B211B]/30'
                      )}
                      aria-hidden
                    />
                  </motion.span>
                </button>

                <Expand open={open}>
                  <div className="pt-1 pb-3 pl-[52px] pr-3">
                    <Panel intent={config.panelIntent} className="p-3.5 sm:p-4 space-y-3.5">
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-[#0B211B]/40 mb-1">
                          Overview
                        </span>
                        <p className="text-xs font-medium leading-relaxed text-[#0B211B]/80 break-words">
                          {s.body}
                        </p>
                      </div>

                      {isNow && (
                        <div className="pt-3 border-t border-amber-900/10 space-y-2.5">
                          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-950 shrink-0">
                              Clinical Update
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#0B211B]/40 shrink-0">
                              <Lock className="h-3 w-3" aria-hidden />
                              {latestVisit.date}
                            </span>
                          </div>

                          <p className="text-xs font-medium leading-relaxed text-[#0B211B]/85 bg-amber-500/10 rounded-lg p-2.5 break-words">
                            &ldquo;{latestVisit.quote}&rdquo;
                          </p>

                          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5 pt-0.5 text-[11px]">
                            <span
                              className="inline-flex items-center gap-1.5 font-semibold text-[#0B211B]/70 min-w-0 max-w-[60%] truncate"
                              title={latestVisit.by}
                            >
                              <UserCheck className="h-3.5 w-3.5 text-amber-700 shrink-0" aria-hidden />
                              <span className="truncate">{latestVisit.by}</span>
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 shrink-0">
                              <ShieldCheck className="h-3.5 w-3.5 stroke-[2] shrink-0" aria-hidden />
                              Verified
                            </span>
                          </div>
                        </div>
                      )}
                    </Panel>
                  </div>
                </Expand>
              </div>
            )
          })}
        </div>
      </Card>
    </motion.div>
  )
}
