import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Check, Loader2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

interface ConnectButtonProps {
  icon: LucideIcon
  label: string
  workingLabel: string
  doneLabel: string
  variant?: 'soft' | 'solid'
  notifyTitle: string
  notifyBody: string
}

type Phase = 'idle' | 'working' | 'done'

export function ConnectButton({
  icon: Icon,
  label,
  workingLabel,
  doneLabel,
  variant = 'soft',
  notifyTitle,
  notifyBody,
}: ConnectButtonProps) {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<Phase>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const run = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(setTimeout(() => setPhase('done'), 900))
    timers.current.push(setTimeout(() => notify({ title: notifyTitle, body: notifyBody, kind: 'ok' }), 1000))
  }

  return (
    <motion.button
      type="button"
      whileTap={phase === 'idle' ? { scale: 0.985 } : undefined}
      onClick={run}
      disabled={phase !== 'idle'}
      aria-disabled={phase !== 'idle'}
      className={cn(
        'flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-[13px] font-bold transition-colors',
        variant === 'solid'
          ? phase === 'done'
            ? 'bg-emerald-600 text-white'
            : phase === 'working'
              ? 'cursor-wait bg-emerald-600/60 text-white'
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
          : phase === 'done'
            ? 'bg-emerald-500/[0.16] text-emerald-800'
            : phase === 'working'
              ? 'cursor-wait bg-emerald-500/[0.06] text-emerald-700/50'
              : 'bg-emerald-500/[0.12] text-emerald-700',
      )}
    >
      {phase === 'idle' && (
        <>
          <Icon className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          <span className="truncate">{label}</span>
        </>
      )}
      {phase === 'working' && (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          <span className="truncate">{workingLabel}</span>
        </>
      )}
      {phase === 'done' && (
        <>
          <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
          <span className="truncate">{doneLabel}</span>
        </>
      )}
    </motion.button>
  )
}
