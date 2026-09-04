import { Check, Loader2 } from 'lucide-react'
import { Card, Chip } from '@/components/base/phone/kit'
import { StepList } from '@/components/base/phone/step-list'
import { retryLadder } from '@/data/system/payments'
import { cn } from '@/lib/utils'

interface RetryLadderCardProps {
  current: number
  onTap: (time: string, head: string, detail: string) => void
}

export function RetryLadderCard({ current, onTap }: RetryLadderCardProps) {
  return (
    <Card intent="warning">
      <div aria-hidden className="h-1 w-full bg-gradient-to-r from-amber-400 to-orange-400" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-sm font-extrabold leading-snug tracking-tight text-[#0B211B]">
              The bank did not answer
            </div>
            <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              Nothing was charged. The ladder runs on its own.
            </div>
          </div>
          <Chip intent="warning" dot className="shrink-0 border-transparent">
            Climbing
          </Chip>
        </div>

        <div className="mt-4">
          <StepList
            nodeStyle="circle"
            nodeSize="sm"
            theme="light"
            activeStyle="ping"
            steps={retryLadder.map((step, i) => {
              const done = i < current
              const active = i === current
              const last = i === retryLadder.length - 1
              return {
                key: step.time,
                state: done ? 'done' : active ? 'active' : 'pending',
                node: (
                  <span
                    className={cn(
                      'relative mt-1 grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full',
                      done && 'bg-emerald-500',
                      active && 'bg-white',
                      !done && !active && 'bg-white ring-1 ring-[#0B211B]/15',
                    )}
                  >
                    {done && <Check className="h-2.5 w-2.5 text-white" strokeWidth={4} aria-hidden />}
                    {active && (
                      <>
                        <span aria-hidden className="absolute h-4 w-4 animate-ping rounded-full bg-amber-400/50" />
                        <Loader2 className="relative h-2.5 w-2.5 animate-spin text-amber-500" strokeWidth={3} aria-hidden />
                      </>
                    )}
                  </span>
                ),
                railClassName: done
                  ? 'bg-gradient-to-b from-emerald-500/50 via-emerald-400/25 to-emerald-300/15'
                  : 'bg-[#0B211B]/[0.1]',
                title: step.head,
                time: step.time,
                timeTrailing: true,
                body: step.detail,
                contentClassName: last ? '' : 'pb-5',
                onClick: () => onTap(step.time, step.head, step.detail),
              }
            })}
          />
        </div>
      </div>
    </Card>
  )
}
