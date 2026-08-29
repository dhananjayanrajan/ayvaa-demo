import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { X, type LucideIcon } from 'lucide-react'

interface SheetShellProps {
  icon: LucideIcon
  title: string
  subtitle: string
  tone?: 'info' | 'success'
  onClose: () => void
  footer: ReactNode
  children: ReactNode
}

export function SheetShell({ icon: Icon, title, subtitle, tone = 'info', onClose, footer, children }: SheetShellProps) {
  const tint = tone === 'success' ? 'bg-emerald-500/[0.14] text-emerald-700' : 'bg-sky-500/[0.12] text-sky-700'
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
        <div className="flex items-start gap-3 pb-4 pt-3.5">
          <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${tint}`}>
            <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
          </span>
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="truncate text-[15px] font-extrabold tracking-tight text-[#0B211B]">{title}</div>
            <div className="mt-0.5 text-xs font-medium leading-snug text-[#0B211B]/55">{subtitle}</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sheet"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50 transition-colors hover:bg-[#0B211B]/[0.08]"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4">{children}</div>
      <div className="shrink-0 px-5 pb-6 pt-2">{footer}</div>
    </motion.div>
  )
}
