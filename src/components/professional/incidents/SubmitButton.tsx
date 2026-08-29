import { motion } from 'motion/react'
import { Loader2, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

export type SubmitStatus = 'idle' | 'sealing' | 'sealed'

type Props = {
  severityLabel: string
  ctaClass: string
  disabled: boolean
  status: SubmitStatus
  onPress: () => void
}

export function SubmitButton({ severityLabel, ctaClass, disabled, status, onPress }: Props) {
  return (
    <motion.button
      type="button"
      whileTap={disabled || status !== 'idle' ? undefined : { scale: 0.97 }}
      onClick={onPress}
      disabled={disabled || status !== 'idle'}
      aria-disabled={disabled || status !== 'idle'}
      className={cn(
        'mt-1 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-all',
        ctaClass,
        disabled && status === 'idle' && 'opacity-45',
      )}
    >
      {status === 'sealing' ? (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin" strokeWidth={2.4} aria-hidden />
      ) : (
        <Send className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      )}
      {status === 'sealing' ? 'Sealing report…' : `Submit ${severityLabel} report`}
    </motion.button>
  )
}
