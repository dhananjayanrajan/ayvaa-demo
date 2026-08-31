import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import {
  Check,
  Loader2,
  Route,
  ScrollText,
  Siren,
  Smartphone,
  Stethoscope,
  TrendingUp,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Chip, Hero, Tile, rise } from '@/components/phone/kit'
import { cn } from '@/lib/utils'

type DestState = 'idle' | 'delivering' | 'done'

const destinations: { icon: LucideIcon; label: string; sub: string }[] = [
  { icon: Smartphone, label: "Family's phone", sub: 'Instant push' },
  { icon: Stethoscope, label: "Caregiver's app", sub: 'Live shift' },
  { icon: TrendingUp, label: "Partner's metrics", sub: 'Realtime' },
  { icon: ScrollText, label: 'Audit log', sub: 'Immutable record' },
  { icon: Siren, label: 'Escalation pager', sub: 'Supervisors, in seconds' },
]

const STEP_MS = 420

interface LiveFanOutCardProps {
  run: number
}

export function LiveFanOutCard({ run }: LiveFanOutCardProps) {
  const [states, setStates] = useState<DestState[]>(() => destinations.map(() => 'idle'))

  useEffect(() => {
    if (run === 0) {
      setStates(destinations.map(() => 'idle'))
      return
    }
    setStates(destinations.map(() => 'idle'))
    const timers: number[] = []
    destinations.forEach((_, i) => {
      timers.push(
        window.setTimeout(() => {
          setStates((prev) => prev.map((s, j) => (j === i ? 'delivering' : s)))
        }, i * STEP_MS),
      )
      timers.push(
        window.setTimeout(() => {
          setStates((prev) => prev.map((s, j) => (j === i ? 'done' : s)))
        }, i * STEP_MS + 260),
      )
    })
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [run])

  const allDone = states.every((s) => s === 'done')
  const anyActive = states.some((s) => s === 'delivering')

  return (
    <motion.div variants={rise}>
      <Hero>
        <div className="flex items-center gap-3">
          <Tile icon={Route} tone="white" />
          <div className="min-w-0">
            <div className="text-sm font-bold tracking-tight text-white">Single source of truth</div>
            <div className="mt-0.5 text-[11px] font-medium text-emerald-100/55">
              One event fans out · zero drift
            </div>
          </div>
          <div className="ml-auto shrink-0">
            {allDone ? (
              <Chip intent="success" light icon={Check}>Delivered</Chip>
            ) : anyActive ? (
              <Chip intent="live" light dot>Fanning out</Chip>
            ) : (
              <Chip intent="neutral" light>Idle</Chip>
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center">
          <span aria-hidden className="my-1 h-4 w-px bg-gradient-to-b from-emerald-300/60 to-transparent" />
          <div className="grid w-full grid-cols-2 gap-2">
            {destinations.map((d, i) => {
              const s = states[i]
              return (
                <motion.div
                  key={d.label}
                  className={cn(
                    'rounded-2xl p-3 transition-colors duration-300',
                    s === 'done'
                      ? 'bg-emerald-400/[0.16]'
                      : s === 'delivering'
                        ? 'bg-white/[0.1]'
                        : 'bg-white/[0.06]',
                    i === destinations.length - 1 && 'col-span-2',
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] transition-colors duration-300',
                        s === 'done'
                          ? 'bg-emerald-400/25 text-emerald-100'
                          : 'bg-emerald-400/15 text-emerald-200',
                      )}
                    >
                      {s === 'done' ? (
                        <Check className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden />
                      ) : s === 'delivering' ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2.4} aria-hidden />
                      ) : (
                        <d.icon className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                      )}
                    </span>
                    <div className="min-w-0">
                      <div className="break-words text-[11px] font-bold leading-snug text-white">{d.label}</div>
                      <div className="break-words text-[9px] font-bold uppercase leading-snug tracking-[0.14em] text-emerald-100/40">
                        {s === 'done' ? 'Delivered' : s === 'delivering' ? 'Sending…' : d.sub}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Hero>
    </motion.div>
  )
}
