import { motion } from 'motion/react'
import { ShieldAlert } from 'lucide-react'

export function IncidentButton({ onPress }: { onPress: () => void }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onPress}
      className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
    >
      <ShieldAlert className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      <span className="truncate">Incident</span>
    </motion.button>
  )
}
