import { motion } from 'motion/react'
import { Eye, EyeOff } from 'lucide-react'

export function EyeToggle({
  shown,
  onToggle,
}: {
  shown: boolean
  onToggle: () => void
}) {
  const Icon = shown ? EyeOff : Eye
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      aria-label={shown ? 'Hide password' : 'Show password'}
      className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-xl bg-[#0B211B]/[0.05] text-[#0B211B]/50 transition-colors duration-300 hover:bg-[#0B211B]/[0.08]"
    >
      <Icon className="h-4.5 w-4.5" strokeWidth={2.2} aria-hidden />
    </motion.button>
  )
}
