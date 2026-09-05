import { motion, AnimatePresence } from 'motion/react'
import { Check, Fingerprint, ScanLine } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ScanState = 'idle' | 'scanning' | 'matched'

export function BiometricUnlock({ state, onPress }: { state: ScanState; onPress: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-[26px] bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
      <div className="relative flex flex-col items-center gap-3">
        <motion.button type="button" whileTap={state === 'idle' ? { scale: 0.94 } : undefined} onClick={state === 'idle' ? onPress : undefined} disabled={state !== 'idle'} aria-disabled={state !== 'idle'} aria-label="Unlock with fingerprint" className={cn('relative grid h-24 w-24 place-items-center rounded-3xl transition-colors duration-300', state === 'matched' ? 'bg-emerald-500 text-white shadow-[0_18px_36px_-16px_rgba(16,185,129,0.9)]' : 'bg-white/[0.08] text-emerald-200')}>
          {state === 'idle' && (
            <>
              <motion.span aria-hidden className="absolute inset-0 rounded-3xl bg-emerald-400/15" animate={{ scale: [1, 1.35], opacity: [0.5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }} />
              <motion.span aria-hidden className="absolute inset-0 rounded-3xl bg-emerald-400/10" animate={{ scale: [1, 1.35], opacity: [0.4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.7 }} />
            </>
          )}
          {state === 'matched' ? <Check className="h-9 w-9" strokeWidth={2.6} aria-hidden /> : state === 'scanning' ? <ScanLine className="h-9 w-9 animate-pulse text-emerald-300" aria-hidden /> : <Fingerprint className="h-9 w-9" strokeWidth={1.8} aria-hidden />}
        </motion.button>
        <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-emerald-100/60">{state === 'matched' ? 'Welcome back' : state === 'scanning' ? 'Matching fingerprint' : 'Tap to unlock instantly'}</span>
        <AnimatePresence>{state === 'scanning' && <motion.span initial={{ width: 0, opacity: 0 }} animate={{ width: '80%', opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: 'easeInOut' }} className="h-1 overflow-hidden rounded-full bg-white/10"><span className="block h-full w-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300" /></motion.span>}</AnimatePresence>
      </div>
    </div>
  )
}
