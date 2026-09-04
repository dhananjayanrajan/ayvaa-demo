import { motion } from 'motion/react'
import { Camera, Check, ScanLine } from 'lucide-react'
import type { CapturePhase } from '@/data/patientIdentity'

export function CaptureTile({ phase, onPress }: { phase: CapturePhase; onPress: () => void }) {
  return (
    <motion.button
      type="button"
      whileTap={phase === 'idle' ? { scale: 0.94 } : undefined}
      onClick={phase === 'idle' ? onPress : undefined}
      disabled={phase !== 'idle'}
      aria-disabled={phase !== 'idle'}
      aria-label="Take a live selfie"
      className="relative grid place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 p-1 shadow-[0_20px_40px_-18px_rgba(16,185,129,0.8)] disabled:cursor-default"
    >
      <span className="relative grid h-24 w-24 place-items-center rounded-full bg-white">
        {phase === 'idle' && (
          <>
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full bg-emerald-400/20"
              animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            />
            <Camera className="h-9 w-9 text-emerald-600" strokeWidth={2} aria-hidden />
          </>
        )}
        {phase === 'scanning' && (
          <>
            <span aria-hidden className="absolute inset-0 rounded-full bg-emerald-500/[0.12]" />
            <ScanLine className="h-9 w-9 animate-pulse text-emerald-600" aria-hidden />
          </>
        )}
        {phase === 'done' && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 340, damping: 16 }}
            className="grid h-full w-full place-items-center rounded-full bg-emerald-500 text-white"
          >
            <Check className="h-10 w-10" strokeWidth={3} aria-hidden />
          </motion.span>
        )}
      </span>
    </motion.button>
  )
}
