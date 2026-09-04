import { motion } from 'motion/react'
import { Download } from 'lucide-react'

type Props = {
  onClick: () => void
}

export function LedgerExportAction({ onClick }: Props) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 text-[13px] font-bold text-white shadow-[0_14px_28px_-14px_rgba(16,185,129,0.75)]"
    >
      <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      Export today's log
    </motion.button>
  )
}
