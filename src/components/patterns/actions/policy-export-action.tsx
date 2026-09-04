import { motion } from 'motion/react'
import { Download } from 'lucide-react'

type Props = { onExport: () => void }

export function PolicyExportAction({ onExport }: Props) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onExport}
      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.7)]"
    >
      <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      Export policy
    </motion.button>
  )
}
