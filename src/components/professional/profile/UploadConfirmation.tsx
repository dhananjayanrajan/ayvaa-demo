import { motion } from 'motion/react'
import { Check } from 'lucide-react'

type Props = {
  certName: string
  matchedCategory: string | null
}

export function UploadConfirmation({ certName, matchedCategory }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="flex items-center gap-3 rounded-xl bg-emerald-500/[0.08] px-3 py-2.5"
    >
      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500">
        <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />
      </span>
      <p className="min-w-0 flex-1 text-[11px] font-bold leading-snug text-emerald-900/80">
        {certName} submitted for review.
        {matchedCategory ? ` ${matchedCategory} matching activates once verified.` : ' In review with Ayvaa now.'}
      </p>
    </motion.div>
  )
}
