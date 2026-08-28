import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface BottomSheetProps {
  open: boolean
  onClose: () => void
  icon?: LucideIcon
  title?: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
}

export function BottomSheet({ open, onClose, icon: Icon, title, subtitle, children, footer }: BottomSheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex max-h-[92%] flex-col rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div className="shrink-0 px-5 pt-4">
              <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
            </div>

            {(title || Icon) && (
              <div className="shrink-0 px-5 pb-3 pt-3">
                <div className="flex items-start gap-3">
                  {Icon && (
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-700">
                      <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    {title && <div className="break-words text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">{title}</div>}
                    {subtitle && <div className="mt-0.5 break-words text-xs font-medium text-[#0B211B]/55">{subtitle}</div>}
                  </div>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.92 }}
                    onClick={onClose}
                    aria-label="Close sheet"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50 transition-colors hover:bg-[#0B211B]/[0.08]"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </motion.button>
                </div>
              </div>
            )}

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">{children}</div>

            {footer && <div className="shrink-0 border-t border-[#0B211B]/[0.05] px-5 pb-7 pt-3">{footer}</div>}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
