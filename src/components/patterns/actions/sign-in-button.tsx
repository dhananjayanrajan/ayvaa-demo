import { motion } from 'motion/react'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export type SignInState = 'idle' | 'working' | 'done'

export function SignInButton({
  ready,
  state,
  onPress,
}: {
  ready: boolean
  state: SignInState
  onPress: () => void
}) {
  const working = state === 'working'
  const done = state === 'done'
  return (
    <motion.button
      type="button"
      whileTap={ready && state === 'idle' ? { scale: 0.97 } : undefined}
      onClick={ready && state === 'idle' ? onPress : undefined}
      disabled={!ready || state !== 'idle'}
      aria-disabled={!ready || state !== 'idle'}
      className={cn(
        'flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-extrabold tracking-tight transition-colors duration-300',
        done
          ? 'bg-emerald-500 text-white shadow-[0_18px_36px_-18px_rgba(16,185,129,0.8)]'
          : working
            ? 'cursor-wait bg-emerald-600/60 text-white/80'
            : ready
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
              : 'cursor-not-allowed bg-[#0B211B]/[0.06] text-[#0B211B]/40',
      )}
    >
      {working && <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />}
      {done && <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />}
      {!working && !done && <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />}
      {state === 'idle'
        ? ready
          ? 'Sign in'
          : 'Enter your password to continue'
        : working
          ? 'Signing you in'
          : 'Signed in'}
    </motion.button>
  )
}
