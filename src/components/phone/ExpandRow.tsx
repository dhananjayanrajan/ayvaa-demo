import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Tile } from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'
import { cn } from '@/lib/utils'

export function ExpandRow({
  icon,
  tone = 'neutral',
  title,
  sub,
  trailing,
  open,
  onToggle,
  dense = true,
  fresh = false,
  className,
  children,
}: {
  icon: LucideIcon
  tone?: TileTone
  title: ReactNode
  sub?: ReactNode
  trailing?: ReactNode
  open: boolean
  onToggle?: () => void
  dense?: boolean
  fresh?: boolean
  className?: string
  children?: ReactNode
}) {
  return (
    <motion.div
      initial={fresh ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      className={cn('rounded-2xl bg-[#0B211B]/[0.03]', className)}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={cn(
          'flex w-full text-left transition-colors',
          dense ? 'items-center gap-3 p-3.5 hover:bg-[#0B211B]/[0.02]' : 'items-start gap-3.5 rounded-2xl p-4 hover:bg-[#0B211B]/[0.06]',
        )}
      >
        <Tile icon={icon} tone={tone} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">{title}</span>
          {sub && (
            <span
              className={cn(
                'mt-0.5 block text-[11px] font-medium leading-snug text-[#0B211B]/50',
                dense && 'truncate',
              )}
            >
              {sub}
            </span>
          )}
        </span>
        {trailing}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
          <ChevronDown className={cn(dense ? 'h-3.5 w-3.5 text-[#0B211B]/30' : 'h-4 w-4 text-[#0B211B]/40')} aria-hidden />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className={dense ? 'px-3.5 pb-3.5' : 'px-4 pb-4'}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
