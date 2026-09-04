import { motion } from 'motion/react'
import { CheckCircle2, Lock, X } from 'lucide-react'

interface PhotoViewSheetProps {
  onClose: () => void
  notify: (payload: { title: string; body: string; kind: 'info' }) => void
}

export function PhotoViewSheet({ onClose, notify }: PhotoViewSheetProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-rose-200/60">
          <Lock className="h-3 w-3" aria-hidden />
          Incident photo · restricted
        </span>
        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={onClose}
          className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white"
          aria-label="Close photo"
        >
          <X className="h-5 w-5" aria-hidden />
        </motion.button>
      </div>

      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.08, duration: 0.25 }}
        className="mt-4 grid flex-1 place-items-center rounded-[26px] border border-white/10 bg-white/[0.04]"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-white/[0.06]">
            <Lock className="h-7 w-7 text-white/30" aria-hidden />
          </span>
          <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/30">Encrypted preview</span>
        </div>
      </motion.div>

      <div className="mt-4 flex flex-col gap-2.5 rounded-[20px] bg-white/[0.05] p-4">
        <div className="flex items-baseline justify-between gap-3">
          <span className="shrink-0 text-[11.5px] font-medium text-white/50">Captured</span>
          <span className="text-right text-[12.5px] font-bold leading-snug text-white">9:38 AM · hallway camera</span>
        </div>
        <div aria-hidden className="h-px bg-white/[0.07]" />
        <div className="flex items-baseline justify-between gap-3">
          <span className="shrink-0 text-[11.5px] font-medium text-white/50">Viewed by</span>
          <span className="text-right text-[12.5px] font-bold leading-snug text-white">You · logged in audit</span>
        </div>
      </div>

      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          onClose()
          notify({ title: 'Access logged', body: 'Your view of this photo is written to the audit record', kind: 'info' })
        }}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
      >
        <CheckCircle2 className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        Close and log my access
      </motion.button>
    </>
  )
}
