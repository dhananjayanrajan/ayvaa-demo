import { motion } from 'motion/react'
import { Check, CheckCircle2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export type SaveStatus = 'idle' | 'saving' | 'saved'

type Props = {
  label: string
  disabled: boolean
  status: SaveStatus
  onPress: () => void
}

export function SaveSheetButton({ label, disabled, status, onPress }: Props) {
  const saved = status === 'saved'
  return (
    <motion.button
      type="button"
      whileTap={disabled || status === 'saving' ? undefined : { scale: 0.97 }}
      onClick={onPress}
      disabled={disabled || status === 'saving'}
      aria-disabled={disabled || status === 'saving'}
      className={cn(
        'mt-auto flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-all',
        saved
          ? 'bg-emerald-500 shadow-[0_18px_36px_-18px_rgba(16,185,129,0.85)]'
          : disabled
            ? 'cursor-not-allowed bg-[#0B211B]/[0.15]'
            : 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
      )}
    >
      {status === 'saving' ? (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin" strokeWidth={2.4} aria-hidden />
      ) : saved ? (
        <Check className="h-4 w-4 shrink-0" strokeWidth={2.8} aria-hidden />
      ) : (
        <CheckCircle2 className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      )}
      {status === 'saving' ? 'Saving…' : saved ? 'Saved · sealed at sign off' : label}
    </motion.button>
  )
}
