import { motion } from 'motion/react'
import { Check, Loader2, Phone, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { guardian } from '@/data/seed'

export type CallState = 'idle' | 'working' | 'done'

export function SentActions({
  callState,
  onCall,
}: {
  callState: CallState
  onCall: () => void
}) {
  const working = callState === 'working'
  const done = callState === 'done'
  return (
    <div className="mt-3.5 flex gap-2.5">
      <motion.a
        href={`mailto:${guardian.email}`}
        whileTap={{ scale: 0.97 }}
        className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3 text-[12.5px] font-bold text-[#0B211B]/75"
      >
        <RotateCcw className="h-3.5 w-3.5 shrink-0" strokeWidth={2.4} aria-hidden />
        <span className="truncate">Open mail app</span>
      </motion.a>
      <motion.button
        type="button"
        whileTap={callState === 'idle' ? { scale: 0.97 } : undefined}
        onClick={callState === 'idle' ? onCall : undefined}
        disabled={callState !== 'idle'}
        aria-disabled={callState !== 'idle'}
        className={cn(
          'flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3 text-[12.5px] font-bold transition-colors duration-300',
          done
            ? 'bg-emerald-500/[0.12] text-emerald-700'
            : working
              ? 'cursor-wait bg-[#0B211B]/[0.04] text-[#0B211B]/40'
              : 'bg-[#0B211B]/[0.05] text-[#0B211B]/75',
        )}
      >
        {working && <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" aria-hidden />}
        {done ? (
          <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={2.8} aria-hidden />
        ) : (
          !working && <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={2.4} aria-hidden />
        )}
        <span className="truncate">
          {callState === 'idle' ? 'Call instead' : working ? 'Requesting' : 'Call requested'}
        </span>
      </motion.button>
    </div>
  )
}
