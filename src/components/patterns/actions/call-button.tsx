import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Check, Loader2, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDemo } from '@/lib/store'

export type CallPhase = 'idle' | 'connecting' | 'connected'

const styles: Record<CallPhase, { dark?: boolean; className: string }> = {
  idle: {
    className:
      'bg-white/[0.1] text-white hover:bg-white/[0.16]',
  },
  connecting: {
    className: 'cursor-wait bg-white/[0.16] text-white/80',
  },
  connected: {
    className: 'bg-emerald-500/[0.2] text-emerald-100',
  },
}

export function CallButton({
  name,
  light = false,
  label = 'Call',
}: {
  name: string
  light?: boolean
  label?: string
}) {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<CallPhase>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  function call() {
    if (phase !== 'idle') return
    setPhase('connecting')
    timers.current.push(
      setTimeout(() => {
        setPhase('connected')
        notify({
          title: `Calling ${name}`,
          body: 'Connected over the secure Ayvaa line, number never shared',
          kind: 'info',
        })
      }, 900),
    )
  }

  return (
    <motion.button
      type="button"
      whileTap={phase === 'idle' ? { scale: 0.97 } : undefined}
      onClick={phase === 'idle' ? call : undefined}
      disabled={phase !== 'idle'}
      aria-disabled={phase !== 'idle'}
      className={cn(
        'flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3 text-[12.5px] font-bold transition-colors duration-300',
        light && phase === 'idle' && 'bg-[#0B211B]/[0.05] text-[#0B211B]/75 hover:bg-[#0B211B]/[0.08]',
        !light && styles[phase].className,
      )}
    >
      {phase === 'connecting' ? (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
      ) : phase === 'connected' ? (
        <Check className="h-4 w-4 shrink-0" strokeWidth={2.8} aria-hidden />
      ) : (
        <Phone className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      )}
      <span className="truncate">
        {phase === 'idle' ? label : phase === 'connecting' ? 'Connecting' : 'On the call'}
      </span>
    </motion.button>
  )
}
