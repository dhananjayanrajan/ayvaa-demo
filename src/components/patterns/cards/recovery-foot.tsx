import { motion } from 'motion/react'
import { ArrowLeft } from 'lucide-react'

export function RecoveryFoot({ onBack }: { onBack: () => void }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onBack}
      className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
    >
      <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      Back to sign in
    </motion.button>
  )
}
