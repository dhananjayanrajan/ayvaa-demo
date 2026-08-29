import { motion } from 'motion/react'
import { CheckCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MarkAllReadButton({
  unreadCount,
  onPress,
}: {
  unreadCount: number
  onPress: () => void
}) {
  const done = unreadCount === 0
  return (
    <motion.button
      type="button"
      whileTap={done ? undefined : { scale: 0.9 }}
      onClick={done ? undefined : onPress}
      disabled={done}
      aria-disabled={done}
      aria-label={done ? 'All caught up' : 'Mark all read'}
      className={cn(
        'grid size-10 shrink-0 place-items-center rounded-xl transition-colors',
        done
          ? 'cursor-not-allowed bg-emerald-500/[0.12] text-emerald-600'
          : 'bg-[#0B211B]/[0.05] text-[#0B211B]/60 hover:bg-[#0B211B]/[0.09]',
      )}
    >
      <CheckCheck className="size-[18px]" strokeWidth={2.2} aria-hidden />
    </motion.button>
  )
}
