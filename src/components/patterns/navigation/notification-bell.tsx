import { motion } from 'motion/react'

export function NotificationBell({ onPress }: { onPress: () => void }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.9 }}
      onClick={onPress}
      aria-label="Notifications"
      className="relative grid size-10 shrink-0 place-items-center rounded-xl bg-[#0B211B]/[0.05] text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.09]"
    >
      <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" strokeLinecap="round" />
      </svg>
      <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-rose-500" aria-hidden />
    </motion.button>
  )
}
