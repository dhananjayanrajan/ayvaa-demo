import { AnimatePresence, motion } from 'motion/react'
import {
  Check,
  HeartHandshake,
  Hourglass,
  Loader2,
  Play,
  RotateCcw,
  Route,
  Send,
  ShieldCheck,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card, Chip, Tile } from '@/components/base/phone/kit'
import { StepList } from '@/components/base/phone/step-list'
import { ladderSteps } from '@/data/system/recheck'
import type { LadderPhase } from '@/data/system/recheck'
import { cn } from '@/lib/utils'

const STEP_ICONS: LucideIcon[] = [Hourglass, Send, Route, Users]

type StepVisual = 'pending' | 'now' | 'done'

interface NoAvailabilityLadderProps {
  phase: LadderPhase
  completed: number
  onPlay: () => void
  onStepTap: (title: string, body: string) => void
}

export function NoAvailabilityLadder({ phase, completed, onPlay, onStepTap }: NoAvailabilityLadderProps) {
  const stateFor = (i: number): StepVisual => {
    if (phase === 'secured') return 'done'
    if (phase === 'playing') {
      if (i < completed) return 'done'
      if (i === completed) return 'now'
      return 'pending'
    }
    return 'pending'
  }

  return (
    <Card>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <Tile icon={HeartHandshake} tone={phase === 'secured' ? 'success' : 'warning'} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-bold tracking-tight text-[#0B211B]">When nobody accepts</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={phase}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="shrink-0"
                >
                  {phase === 'idle' && (
                    <Chip intent="info" className="border-transparent">
                      Replay ready
                    </Chip>
                  )}
                  {phase === 'playing' && (
                    <Chip intent="warning" dot className="border-transparent">
                      Replaying
                    </Chip>
                  )}
                  {phase === 'secured' && (
                    <Chip intent="success" icon={Check} className="border-transparent">
                      Family kept whole
                    </Chip>
                  )}
                </motion.span>
              </AnimatePresence>
            </div>
            <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              This morning's widening ladder · replayed step by step
            </p>
          </div>
        </div>

        <div className="mt-3.5">
          <StepList
            nodeStyle="circle"
            nodeSize="lg"
            theme="light"
            activeStyle="spinner"
            steps={ladderSteps.map((step, i) => {
              const state = stateFor(i)
              return {
                key: step.title,
                icon: STEP_ICONS[i],
                state: state === 'now' ? 'active' : state,
                title: step.title,
                titleClassName: 'text-[13px]',
                body: step.body,
                bodyClassName: 'text-[11px]',
                time: step.time,
                contentClassName: i === ladderSteps.length - 1 ? 'pb-0.5' : 'pb-3.5',
                onClick: () => onStepTap(step.title, `${step.time} · ${step.body}`),
              }
            })}
          />
        </div>

        <AnimatePresence>
          {phase === 'secured' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mt-3 flex items-start gap-2.5 rounded-2xl bg-emerald-500/[0.08] px-3.5 py-3"
            >
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.4} aria-hidden />
              <p className="min-w-0 flex-1 text-[11.5px] font-semibold leading-relaxed text-emerald-700">
                Visit rebooked by 9:02 AM · refund guarantee intact · the family watched every step live.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          whileTap={phase === 'playing' ? undefined : { scale: 0.97 }}
          onClick={onPlay}
          disabled={phase === 'playing'}
          className={cn(
            'mt-3.5 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50',
            phase === 'playing'
              ? 'cursor-wait bg-[#0B211B]/[0.35]'
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
          )}
        >
          {phase === 'playing' ? (
            <>
              <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
              Replaying ladder
            </>
          ) : phase === 'secured' ? (
            <>
              <RotateCcw className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              Replay the ladder
            </>
          ) : (
            <>
              <Play className="h-4 w-4 shrink-0 fill-current" aria-hidden />
              Replay this morning's ladder
            </>
          )}
        </motion.button>
      </div>
    </Card>
  )
}
