import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type ButtonTone = 'primary' | 'neutral' | 'danger' | 'success'

interface TonalButtonProps {
  tone?: ButtonTone
  icon: LucideIcon
  onClick?: () => void
  children: React.ReactNode
}

export function TonalButton({ tone = 'primary', icon: Icon, onClick, children }: TonalButtonProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        'flex flex-1 items-center justify-center gap-2 rounded-2xl px-3 py-3.5 text-[13px] font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50',
        tone === 'primary' && 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_14px_28px_-14px_rgba(16,185,129,0.75)] hover:shadow-[0_18px_32px_-14px_rgba(16,185,129,0.9)] hover:brightness-105',
        tone === 'neutral' && 'bg-[#0B211B]/[0.06] text-[#0B211B]/75 hover:bg-[#0B211B]/[0.1]',
        tone === 'danger' && 'bg-gradient-to-r from-rose-600 to-red-500 text-white shadow-[0_18px_36px_-18px_rgba(225,29,72,0.6)] hover:brightness-105',
        tone === 'success' && 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] hover:brightness-105',
      )}
    >
      <Icon className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      <span className="truncate">{children}</span>
    </motion.button>
  )
}
