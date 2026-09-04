import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Check, Loader2, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useFramework } from '@/components/base/phone/framework-runtime'

export type ConnectPhase = 'idle' | 'connecting' | 'connected'

export function ConnectButton({
  name,
  light = false,
  label = 'Call',
}: {
  name: string
  light?: boolean
  label?: string
}) {
  const { notify, emit } = useFramework()
  const [phase, setPhase] = useState<ConnectPhase>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const hasMountedRef = useRef(false)
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      emit('connectButton.mounted', { name, light, label })
    }
  }, [emit, label, light, name])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  function call() {
    if (phase !== 'idle') return
    emit('connect.requested', { name })
    setPhase('connecting')
    timers.current.push(
      setTimeout(() => {
        setPhase('connected')
        emit('connect.connected', { name })
        notify({
          title: `Calling ${name}`,
          description: 'Connected over the secure Ayvaa line, number never shared',
          tone: 'info',
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
      aria-live="polite"
      className={cn(
        'flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3 text-[12.5px] font-bold transition-colors duration-300',
        light && phase === 'idle' && 'bg-[#0B211B]/[0.05] text-[#0B211B]/75 hover:bg-[#0B211B]/[0.08]',
        !light && phase === 'idle' && 'bg-white/[0.1] text-white hover:bg-white/[0.16]',
        !light && phase === 'connecting' && 'cursor-wait bg-white/[0.16] text-white/80',
        !light && phase === 'connected' && 'bg-emerald-500/[0.2] text-emerald-100',
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
