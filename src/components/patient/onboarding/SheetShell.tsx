import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Tile } from '@/components/phone/kit'

export function SheetShell({
  icon: Icon,
  tileTone,
  title,
  subtitle,
  onClose,
  footer,
  children,
}: {
  icon: LucideIcon
  tileTone: 'neutral' | 'info' | 'success'
  title: string
  subtitle: string
  onClose: () => void
  footer: ReactNode
  children: ReactNode
}) {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', stiffness: 380, damping: 40 }}
      className="absolute inset-x-0 bottom-0 z-50 flex h-[86%] flex-col overflow-hidden rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
    >
      <div className="shrink-0 px-5 pt-3">
        <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
        <div className="mt-3.5 flex items-start gap-3">
          <Tile icon={Icon} tone={tileTone} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">{title}</div>
            <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">{subtitle}</div>
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
          >
            <X className="h-4 w-4" aria-hidden />
          </motion.button>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4">{children}</div>
      <div className="shrink-0 px-5 pb-7 pt-3">{footer}</div>
    </motion.div>
  )
}
