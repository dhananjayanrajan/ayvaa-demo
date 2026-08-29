import { motion } from 'motion/react'
import { Check, Loader2, MailCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SendState } from '@/data/patientRecovery'

export function SendLinkButton({
  state,
  expired,
  onPress,
}: {
  state: SendState
  expired: boolean
  onPress: () => void
}) {
  const working = state === 'working'
  const done = state === 'done'
  return (
    <motion.button
      type="button"
      whileTap={state === 'idle' ? { scale: 0.97 } : undefined}
      onClick={state === 'idle' ? onPress : undefined}
      disabled={state !== 'idle'}
      aria-disabled={state !== 'idle'}
      className={cn(
        'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-extrabold tracking-tight text-white transition-colors duration-300',
        done
          ? 'bg-emerald-500 shadow-[0_18px_36px_-18px_rgba(16,185,129,0.8)]'
          : working
            ? 'cursor-wait bg-emerald-600/60 text-white/80'
            : 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
      )}
    >
      {working && <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />}
      {done ? (
        <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
      ) : (
        !working && <MailCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      )}
      {state === 'idle'
        ? expired
          ? 'Send a new link'
          : 'Send reset link'
        : working
          ? 'Generating your link'
          : 'Link sent'}
    </motion.button>
  )
}
