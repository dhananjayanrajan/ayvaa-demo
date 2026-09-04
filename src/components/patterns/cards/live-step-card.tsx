import { motion } from 'motion/react'
import { Card, Chip } from '@/components/base/phone/kit'
import { ACTIVE_STEP_META, WALK_LAPS_TOTAL, type VisitStep } from '@/data/patientLiveVisit'
import { cn } from '@/lib/utils'

interface LiveStepCardProps {
  step: VisitStep
  stepIndex: number
  stepsTotal: number
  lapsDone: number
}

export function LiveStepCard({ step, stepIndex, stepsTotal, lapsDone }: LiveStepCardProps) {
  const Icon = step.icon
  const isWalk = step.id === 'walk'
  const lapsVisible = isWalk && step.state === 'active'
  const startPct = 100 / WALK_LAPS_TOTAL / 2
  const endPct = (100 / WALK_LAPS_TOTAL) * (Math.min(lapsDone, WALK_LAPS_TOTAL - 1) + 0.5)

  return (
    <Card>
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Happening now</span>
          <Chip intent="live" dot>
            Step {stepIndex} of {stepsTotal}
          </Chip>
        </div>
        <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
          No action needed. The log updates itself.
        </p>

        <div className="mt-4 rounded-2xl bg-[#0B231C] p-4">
          <div className="flex items-center gap-3">
            <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-400/[0.2] text-emerald-100">
              <span aria-hidden className="absolute inset-0 animate-ping rounded-xl bg-emerald-400/20" />
              <Icon className="relative h-4 w-4" strokeWidth={2.4} aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[14px] font-extrabold tracking-tight text-white">{step.title}</div>
              <div className="mt-0.5 text-[11px] font-medium leading-snug text-emerald-100/60">{step.summary}</div>
            </div>
          </div>

          {lapsVisible && (
            <div className="mt-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-100/40">Lap progress</span>
                <span className="text-[10px] font-extrabold tabular-nums text-emerald-200">
                  Lap {Math.min(lapsDone + 1, WALK_LAPS_TOTAL)} of {WALK_LAPS_TOTAL}
                </span>
              </div>
              <div className="relative mt-2">
                <div
                  aria-hidden
                  className="absolute top-[7px] h-0.5 rounded-full bg-white/[0.12]"
                  style={{ left: `${startPct}%`, right: `${startPct}%` }}
                />
                <div
                  aria-hidden
                  className="absolute top-[7px] h-0.5 rounded-full bg-emerald-300"
                  style={{ left: `${startPct}%`, width: `${endPct - startPct}%` }}
                />
                <div className="relative grid" style={{ gridTemplateColumns: `repeat(${WALK_LAPS_TOTAL}, 1fr)` }}>
                  {Array.from({ length: WALK_LAPS_TOTAL }, (_, i) => {
                    const done = i < lapsDone
                    const current = i === lapsDone
                    return (
                      <div key={i} className="flex flex-col items-center">
                        {done ? (
                          <span className="mt-[3px] h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        ) : current ? (
                          <span className="relative grid h-4 w-4 place-items-center">
                            <span aria-hidden className="absolute h-4 w-4 animate-ping rounded-full bg-emerald-300/50" />
                            <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-300" />
                          </span>
                        ) : (
                          <span className="mt-[3px] h-2.5 w-2.5 rounded-full bg-white/25" />
                        )}
                        <span
                          className={cn(
                            'mt-1.5 text-[9px] font-extrabold tabular-nums',
                            current ? 'text-white' : done ? 'text-emerald-100/75' : 'text-emerald-100/40',
                          )}
                        >
                          {i + 1}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          <div className="mt-3 flex flex-col gap-2 border-t border-white/[0.08] pt-3">
            <div className="flex items-baseline justify-between gap-3">
              <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Started at</span>
              <span className="text-right text-[12px] font-bold tabular-nums text-emerald-50/90">{ACTIVE_STEP_META.startedAt}</span>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Care goal</span>
              <span className="text-right text-[12px] font-bold text-emerald-50/90">{ACTIVE_STEP_META.goalLabel}</span>
            </div>
          </div>
        </div>

        <motion.div
          key={step.id}
          aria-hidden
          className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-500/[0.1] px-3.5 py-2.5"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="min-w-0 text-[10px] font-bold text-emerald-800">
            Updating live as the caregiver logs each step
          </span>
        </motion.div>
      </div>
    </Card>
  )
}
