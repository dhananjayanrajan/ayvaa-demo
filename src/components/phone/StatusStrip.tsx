import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type StatusStripProps = {
  icon?: LucideIcon
  title?: string
  children: ReactNode
  align?: 'center' | 'start'
  className?: string
}

export function StatusStrip({
  icon: Icon = Check,
  title,
  children,
  align = 'center',
  className,
}: StatusStripProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={cn(
        'flex gap-3 rounded-xl bg-emerald-500/[0.08] px-3 py-2.5',
        align === 'center' ? 'items-center' : 'items-start',
        className,
      )}
    >
      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
        <Icon className="h-3 w-3" strokeWidth={3} aria-hidden />
      </span>
      {title ? (
        <div className="min-w-0 flex-1">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-emerald-700/60">
            {title}
          </div>
          <div className="mt-0.5 text-[12px] font-bold tracking-tight text-emerald-700">{children}</div>
        </div>
      ) : (
        <p className="min-w-0 flex-1 text-[11px] font-bold leading-snug text-emerald-900/80">{children}</p>
      )}
    </motion.div>
  )
}
