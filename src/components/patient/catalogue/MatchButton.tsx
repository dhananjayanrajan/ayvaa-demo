import { motion } from 'motion/react'
import { ArrowUpDown, Check, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export type MatchState = 'idle' | 'working' | 'done'

export function MatchButton({
  state,
  onPress,
}: {
  state: MatchState
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
        'mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-extrabold tracking-tight text-white transition-colors duration-300',
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
        !working && <ArrowUpDown className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      )}
      {state === 'idle'
        ? 'Let Ayvaa match the care for me'
        : working
          ? 'Preparing your questions'
          : 'Ready in booking'}
    </motion.button>
  )
}
