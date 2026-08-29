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
import { Card, Chip, Tile, TimeChip } from '@/components/phone/kit'
import { ladderSteps } from '@/data/systemRecheck'
import type { LadderPhase } from '@/data/systemRecheck'
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

        <div className="mt-3.5 flex flex-col">
          {ladderSteps.map((step, i) => {
            const state = stateFor(i)
            const Icon = STEP_ICONS[i]
            const last = i === ladderSteps.length - 1
            return (
              <motion.button
                key={step.title}
                type="button"
                whileTap={{ scale: 0.985 }}
                onClick={() => onStepTap(step.title, `${step.time} · ${step.body}`)}
                className="flex gap-3 text-left outline-none focus-visible:outline-none"
              >
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      'relative grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-300',
                      state === 'done' && 'bg-emerald-500 text-white',
                      state === 'now' && 'bg-amber-400 text-white',
                      state === 'pending' && 'bg-[#0B211B]/[0.06] text-[#0B211B]/30',
                    )}
                  >
                    {state === 'done' && <Check className="h-4 w-4" strokeWidth={3} aria-hidden />}
                    {state === 'now' && <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.6} aria-hidden />}
                    {state === 'pending' && <Icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />}
                  </span>
                  {!last && (
                    <span
                      aria-hidden
                      className={cn(
                        'my-1 w-px flex-1 transition-colors duration-500',
                        state === 'done' ? 'bg-emerald-500/30' : 'bg-[#0B211B]/[0.08]',
                      )}
                    />
                  )}
                </div>
                <div className={cn('min-w-0 flex-1', last ? 'pb-0.5' : 'pb-3.5')}>
                  <div className="flex items-center gap-2">
                    <TimeChip>{step.time}</TimeChip>
                    <span
                      className={cn(
                        'truncate text-[13px] font-bold tracking-tight transition-colors duration-300',
                        state === 'pending' ? 'text-[#0B211B]/35' : 'text-[#0B211B]',
                      )}
                    >
                      {step.title}
                    </span>
                  </div>
                  <div
                    className={cn(
                      'mt-0.5 text-[11px] font-medium leading-snug transition-colors duration-300',
                      state === 'pending' ? 'text-[#0B211B]/30' : 'text-[#0B211B]/55',
                    )}
                  >
                    {step.body}
                  </div>
                </div>
              </motion.button>
            )
          })}
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
