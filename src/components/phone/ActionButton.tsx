import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

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
  const busy = status !== 'idle'
  const done = status === 'done'
  const Icon = busy ? (LoadingIcon ?? IdleIcon) : done ? (DoneIcon ?? IdleIcon) : IdleIcon
  const label = busy ? (loadingLabel ?? idleLabel) : done ? (doneLabel ?? idleLabel) : idleLabel
  return (
    <motion.button
      type="button"
      whileTap={disabled || busy ? undefined : { scale: tapScale }}
      onClick={onPress}
      disabled={disabled || busy}
      aria-disabled={disabled || busy}
      className={cn(className)}
    >
      {Icon && <Icon className={cn('h-4 w-4 shrink-0', busy && 'animate-spin')} strokeWidth={2.4} aria-hidden />}
      {label}
    </motion.button>
  )
}
