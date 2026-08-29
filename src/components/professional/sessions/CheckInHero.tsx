import { motion } from 'motion/react'
import { Lock } from 'lucide-react'
import { Chip, Hero, Kicker, LiveDot } from '@/components/phone/kit'
import type { SessionStep } from './sessionExecution'
import { cn } from '@/lib/utils'

type Props = {
  checkInTime: string
  doneCount: number
  total: number
  runningLabel: string
  steps: SessionStep[]
}

export function CheckInHero({ checkInTime, doneCount, total, runningLabel, steps }: Props) {
  const allDone = doneCount === total
  return (
    <Hero>
      <Kicker>Live visit · GPS verified</Kicker>

      <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Checked in at{' '}
        <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">{checkInTime}</span>
      </h2>

      <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
        GPS matched the care address · this check-in is written permanently to the visit record.
      </p>

      <div className="mt-5 rounded-2xl bg-white/[0.06] p-3.5">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-emerald-100/50">Checklist progress</span>
          <span className="text-[10px] font-extrabold tabular-nums text-emerald-200">
            {doneCount}/{total}
          </span>
        </div>

        <div className="mt-2.5 flex gap-1">
          {steps.map((s) => (
            <span
              key={s.id}
              className={cn(
                'h-1.5 flex-1 overflow-hidden rounded-full',
                s.state === 'done' && 'bg-gradient-to-r from-emerald-400 to-teal-300',
                s.state === 'active' && 'bg-blue-300/30',
                s.state === 'todo' && 'bg-white/[0.18]',
                s.state === 'locked' && 'bg-white/10',
              )}
            >
              {s.state === 'active' && (
                <motion.span
                  className="h-full w-full rounded-full bg-blue-300"
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2.5">
          <LiveDot className={allDone ? 'text-emerald-300' : 'text-blue-300'} />
          <span
            className={cn(
              'min-w-0 flex-1 truncate text-[11px] font-bold uppercase tracking-[0.1em]',
              allDone ? 'text-emerald-100/80' : 'text-blue-100/80',
            )}
          >
            {runningLabel}
          </span>
          <Chip
            intent={allDone ? 'success' : 'live'}
            light
            icon={allDone ? undefined : Lock}
            dot={!allDone}
            className="shrink-0 border-transparent"
          >
            {allDone ? 'Complete' : 'Logged'}
          </Chip>
        </div>
      </div>
    </Hero>
  )
}
