import { motion } from 'motion/react'
import { Loader2, ScanLine } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useFramework } from '@/components/base/phone/framework-runtime'
import { cn } from '@/lib/utils'
import { formatCountdown } from '@/data/patientVerification'

export type ActionStatus = 'idle' | 'loading' | 'done'

export function ActionButton({
  status,
  onPress,
  disabled = false,
  idleIcon: IdleIcon,
  loadingIcon: LoadingIcon,
  doneIcon: DoneIcon,
  idleLabel,
  loadingLabel,
  doneLabel,
  className,
  tapScale = 0.97,
}: {
  status: ActionStatus
  onPress: () => void
  disabled?: boolean
  idleIcon?: LucideIcon
  loadingIcon?: LucideIcon
  doneIcon?: LucideIcon
  idleLabel: string
  loadingLabel?: string
  doneLabel?: string
  className?: string
  tapScale?: number
}) {
  const { emit } = useFramework()
  const busy = status !== 'idle'
  const done = status === 'done'
  const Icon = busy ? (LoadingIcon ?? IdleIcon) : done ? (DoneIcon ?? IdleIcon) : IdleIcon
  const label = busy ? (loadingLabel ?? idleLabel) : done ? (doneLabel ?? idleLabel) : idleLabel
  const handlePress = () => {
    emit('action.pressed', { idleLabel, status })
    onPress()
  }
  return (
    <motion.button
      type="button"
      whileTap={disabled || busy ? undefined : { scale: tapScale }}
      onClick={handlePress}
      disabled={disabled || busy}
      aria-disabled={disabled || busy}
      className={cn(className)}
    >
      {Icon && <Icon className={cn('h-4 w-4 shrink-0', busy && 'animate-spin')} strokeWidth={2.4} aria-hidden />}
      {label}
    </motion.button>
  )
}

export function ResendRow({
  seconds,
  sending,
  onResend,
}: {
  seconds: number
  sending: boolean
  onResend: () => void
}) {
  const { emit } = useFramework()
  const handleResend = () => {
    emit('action.resend', { seconds })
    onResend()
  }
  if (sending) {
    return (
      <div className="flex items-center justify-center gap-2 text-[11.5px] font-semibold text-[#0B211B]/45">
        <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" aria-hidden />
        Sending a fresh code
      </div>
    )
  }
  if (seconds > 0) {
    return (
      <div className="flex items-center justify-center gap-1.5 text-[11.5px] font-semibold text-[#0B211B]/45">
        <ScanLine className="h-3.5 w-3.5 shrink-0" aria-hidden />
        Resend code in <span className="tabular-nums">{formatCountdown(seconds)}</span>
      </div>
    )
  }
  return (
    <ActionButton
      status="idle"
      onPress={handleResend}
      idleLabel="Resend code now"
      tapScale={0.95}
      className="mx-auto block rounded-full bg-emerald-500/[0.12] px-4 py-2 text-[12px] font-extrabold text-emerald-700"
    />
  )
}
