import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useFramework } from '@/components/phone/FrameworkRuntime'

type StatusStripProps = {
  icon?: LucideIcon
  title?: string
  children: ReactNode
  align?: 'center' | 'start'
  tone?: 'emerald' | 'amber' | 'neutral'
  className?: string
}

export function StatusStrip({
  icon: Icon = Check,
  title,
  children,
  align = 'center',
  tone = 'emerald',
  className,
}: StatusStripProps) {
  const { emit } = useFramework()
  useEffect(() => { emit('statusStrip.mounted', { title }) }, [emit, title])
  const toneMap = tone === 'amber' ? 'bg-amber-500/[0.08]' : tone === 'neutral' ? 'bg-[#0B211B]/[0.06]' : 'bg-emerald-500/[0.08]'
  const iconTone = tone === 'amber' ? 'bg-amber-500' : tone === 'neutral' ? 'bg-[#0B211B]/70' : 'bg-emerald-500'
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={cn(
        'flex gap-3 rounded-xl px-3 py-2.5',
        toneMap,
        align === 'center' ? 'items-center' : 'items-start',
        className,
      )}
    >
      <span className={cn('grid h-5 w-5 shrink-0 place-items-center rounded-full text-white', iconTone)}>
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
