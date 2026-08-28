import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TonalButtonProps {
  tone: 'primary' | 'neutral'
  icon: LucideIcon
  onClick?: () => void
  children: React.ReactNode
}

export function TonalButton({ tone, icon: Icon, onClick, children }: TonalButtonProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        'flex flex-1 items-center justify-center gap-2 rounded-2xl px-3 py-3.5 text-[13px] font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50',
        tone === 'primary'
          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_14px_28px_-14px_rgba(16,185,129,0.75)] hover:shadow-[0_18px_32px_-14px_rgba(16,185,129,0.9)] hover:brightness-105'
          : 'bg-[#0B211B]/[0.06] text-[#0B211B]/75 hover:bg-[#0B211B]/[0.1]',
      )}
    >
      <Icon className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      <span className="truncate">{children}</span>
    </motion.button>
  )
}
