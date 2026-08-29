import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Check, Download, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ExportStatus = 'idle' | 'preparing' | 'saved'

type Props = {
  status: ExportStatus
  onPress: () => void
}

export function ExportHistoryButton({ status, onPress }: Props) {
  return (
    <motion.button
      type="button"
      whileTap={status === 'idle' ? { scale: 0.97 } : undefined}
      onClick={onPress}
      disabled={status !== 'idle'}
      aria-disabled={status !== 'idle'}
      className={cn(
        'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-colors duration-300',
        status === 'saved'
          ? 'bg-emerald-500 shadow-[0_18px_36px_-18px_rgba(16,185,129,0.85)]'
          : status === 'preparing'
            ? 'cursor-wait bg-[#0B211B]/[0.25]'
            : 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
      )}
    >
      {status === 'preparing' ? (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin text-white/70" strokeWidth={2.4} aria-hidden />
      ) : status === 'saved' ? (
        <Check className="h-4 w-4 shrink-0" strokeWidth={2.8} aria-hidden />
      ) : (
        <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      )}
      {status === 'preparing' ? 'Preparing export…' : status === 'saved' ? 'Export saved to downloads' : 'Export session records'}
    </motion.button>
  )
}
