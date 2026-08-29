import { motion } from 'motion/react'
import { Pencil } from 'lucide-react'

type Props = {
  onPress: () => void
}

export function EditProfileButton({ onPress }: Props) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onPress}
      className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/70 transition-colors hover:bg-[#0B211B]/[0.09]"
    >
      <Pencil className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      Edit profile details
    </motion.button>
  )
}
