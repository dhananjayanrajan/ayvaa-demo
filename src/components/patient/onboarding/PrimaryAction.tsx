import { motion } from 'motion/react'
import { ArrowRight, ListChecks } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PrimaryAction({
  ready,
  onPress,
}: {
  ready: boolean
  onPress: () => void
}) {
  return (
    <motion.button
      type="button"
      whileTap={ready ? { scale: 0.97 } : undefined}
      onClick={ready ? onPress : undefined}
      disabled={!ready}
      aria-disabled={!ready}
      className={cn(
        'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-4 text-[15px] font-extrabold tracking-tight transition-colors duration-300',
        ready
          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_20px_40px_-18px_rgba(5,150,105,0.8)]'
          : 'cursor-not-allowed bg-[#0B211B]/[0.06] text-[#0B211B]/40',
      )}
    >
      {ready ? (
        <>
          Review &amp; create
          <ArrowRight className="h-4.5 w-4.5 shrink-0" strokeWidth={2.4} aria-hidden />
        </>
      ) : (
        <>
          <ListChecks className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          Complete your details to continue
        </>
      )}
    </motion.button>
  )
}
