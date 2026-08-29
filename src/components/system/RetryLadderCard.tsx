import { motion } from 'motion/react'
import { Check, Loader2 } from 'lucide-react'
import { Card, Chip } from '@/components/phone/kit'
import { retryLadder } from '@/data/systemPayments'
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
            <div className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
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
          {retryLadder.map((step, i) => {
            const done = i < current
            const active = i === current
            const last = i === retryLadder.length - 1
            return (
              <motion.button
                key={step.time}
                type="button"
                whileTap={{ scale: 0.985 }}
                onClick={() => onTap(step.time, step.head, step.detail)}
                className="flex w-full gap-3.5 text-left outline-none focus-visible:outline-none"
              >
                <div className="flex flex-col items-center">
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
                  {!last && (
                    <span
                      aria-hidden
                      className={cn(
                        'my-1 w-px flex-1',
                        done
                          ? 'bg-gradient-to-b from-emerald-500/50 via-emerald-400/25 to-emerald-300/15'
                          : 'bg-[#0B211B]/[0.1]',
                      )}
                    />
                  )}
                </div>
                <div className={cn('min-w-0 flex-1', !last && 'pb-5')}>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        'text-[13.5px] font-bold tracking-tight transition-colors duration-300',
                        done || active ? 'text-[#0B211B]' : 'text-[#0B211B]/35',
                      )}
                    >
                      {step.head}
                    </span>
                    <span
                      className={cn(
                        'shrink-0 font-mono text-[10px] font-bold uppercase tracking-wide transition-colors duration-300',
                        done || active ? 'text-[#0B211B]/40' : 'text-[#0B211B]/25',
                      )}
                    >
                      {step.time}
                    </span>
                  </div>
                  <p
                    className={cn(
                      'mt-1 text-pretty text-[11px] font-medium leading-relaxed transition-colors duration-300',
                      done || active ? 'text-[#0B211B]/55' : 'text-[#0B211B]/30',
                    )}
                  >
                    {step.detail}
                  </p>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
