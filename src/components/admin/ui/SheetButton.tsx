import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SheetButtonProps {
  tone: 'danger' | 'success'
  icon: LucideIcon
  onClick: () => void
  children: React.ReactNode
}

export function SheetButton({ tone, icon: Icon, onClick, children }: SheetButtonProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        'flex flex-1 items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white',
        tone === 'danger'
          ? 'bg-gradient-to-r from-rose-600 to-red-500 shadow-[0_18px_36px_-18px_rgba(225,29,72,0.6)]'
          : 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
      )}
    >
      <Icon className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      <span className="whitespace-nowrap">{children}</span>
    </motion.button>
  )
}
