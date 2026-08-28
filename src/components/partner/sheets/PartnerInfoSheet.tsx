import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface PartnerInfoSheetData {
  type: 'step' | 'category' | 'rx' | 'file' | 'patient'
  title: string
  body: string
  icon: LucideIcon
  actionLabel?: string
  onAction?: () => void
}

interface PartnerInfoSheetProps {
  data: PartnerInfoSheetData | null
  onClose: () => void
}

export function PartnerInfoSheet({ data, onClose }: PartnerInfoSheetProps) {
  return (
    <>
      <AnimatePresence>
        {data && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {data && (
          <motion.div
            key="info-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex flex-col gap-3.5 rounded-t-[28px] bg-white p-5 pb-7 shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div aria-hidden className="mx-auto h-1.5 w-10 shrink-0 rounded-full bg-[#0B211B]/15" />
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <data.icon className="h-5 w-5" strokeWidth={2.2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">{data.title}</div>
                <p className="mt-1 text-xs font-medium leading-relaxed text-[#0B211B]/60">{data.body}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                aria-label="Close information"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
            {data.actionLabel && data.onAction && (
              <button
                type="button"
                onClick={data.onAction}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3 text-sm font-bold text-white"
              >
                {data.actionLabel}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
