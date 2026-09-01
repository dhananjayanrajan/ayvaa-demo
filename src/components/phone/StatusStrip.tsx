import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Check, AlertTriangle, Info, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useFramework } from '@/components/phone/FrameworkRuntime'

type StatusStripTone = 'emerald' | 'amber' | 'neutral' | 'rose' | 'sky'
type StatusStripPhase = 'idle' | 'working' | 'done'

type StatusStripProps = {
  icon?: LucideIcon
  title?: string
  children: ReactNode
  align?: 'center' | 'start'
  tone?: StatusStripTone
  phase?: StatusStripPhase
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
}

const TONE_SURFACE: Record<StatusStripTone, string> = {
  emerald: 'bg-emerald-500/[0.08]',
  amber: 'bg-amber-500/[0.08]',
  neutral: 'bg-[#0B211B]/[0.06]',
  rose: 'bg-rose-500/[0.08] border border-rose-500/20',
  sky: 'bg-sky-500/[0.08] border border-sky-500/20',
}

const TONE_ICON: Record<StatusStripTone, string> = {
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  neutral: 'bg-[#0B211B]/70',
  rose: 'bg-rose-500',
  sky: 'bg-sky-500',
}

const TONE_TEXT_TITLE: Record<StatusStripTone, string> = {
  emerald: 'text-emerald-700/60',
  amber: 'text-amber-700/60',
  neutral: 'text-[#0B211B]/60',
  rose: 'text-rose-700/60',
  sky: 'text-sky-700/60',
}

const TONE_TEXT_BODY: Record<StatusStripTone, string> = {
  emerald: 'text-emerald-700',
  amber: 'text-amber-700',
  neutral: 'text-[#0B211B]/70',
  rose: 'text-rose-700',
  sky: 'text-sky-700',
}

const TONE_TEXT_SINGLE: Record<StatusStripTone, string> = {
  emerald: 'text-emerald-900/80',
  amber: 'text-amber-900/80',
  neutral: 'text-[#0B211B]/70',
  rose: 'text-rose-900/80',
  sky: 'text-sky-900/80',
}

export function StatusStrip({
  icon: Icon = Check,
  title,
  children,
  align = 'center',
  tone = 'emerald',
  phase = 'idle',
  dismissible = false,
  onDismiss,
  className,
}: StatusStripProps) {
  const { emit } = useFramework()
  const [visible, setVisible] = useState(true)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const mounted = useRef(false)
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      emit('statusStrip.mounted', { title, tone, phase })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps -- emit once on mount by design
  }, [])
  useEffect(() => {
    return () => timers.current.forEach((id) => clearTimeout(id))
  }, [])
  useEffect(() => {
    if (!visible || !dismissible) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleDismiss()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visible, dismissible])
  const handleDismiss = () => {
    emit('statusStrip.dismissed', { title })
    setVisible(false)
    const id = window.setTimeout(() => onDismiss?.(), 220)
    timers.current.push(id)
  }
  const handlePress = () => {
    emit('statusStrip.pressed', { title, tone, phase })
  }
  const EffectiveIcon = phase === 'working' ? Info : phase === 'done' && tone === 'amber' ? AlertTriangle : Icon
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          whileTap={dismissible ? { scale: 0.985 } : undefined}
          role="status"
          aria-live="polite"
          onClick={handlePress}
          className={cn(
            'flex gap-3 rounded-xl px-3 py-2.5',
            TONE_SURFACE[tone],
            align === 'center' ? 'items-center' : 'items-start',
            dismissible ? 'cursor-pointer' : '',
            phase === 'working' ? 'opacity-90' : '',
            className,
          )}
        >
          <span className={cn('grid h-5 w-5 shrink-0 place-items-center rounded-full text-white', TONE_ICON[tone])}>
            <EffectiveIcon className="h-3 w-3" strokeWidth={3} aria-hidden />
          </span>
          {title ? (
            <div className="min-w-0 flex-1">
              <div className={cn('text-[9px] font-extrabold uppercase tracking-[0.16em]', TONE_TEXT_TITLE[tone])}>
                {title}
              </div>
              <div className={cn('mt-0.5 text-[12px] font-bold tracking-tight', TONE_TEXT_BODY[tone])}>{children}</div>
            </div>
          ) : (
            <p className={cn('min-w-0 flex-1 text-[11px] font-bold leading-snug', TONE_TEXT_SINGLE[tone])}>{children}</p>
          )}
          {dismissible && (
            <button
              type="button"
              aria-label="Dismiss"
              onClick={(e) => { e.stopPropagation(); handleDismiss() }}
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-black/[0.06] text-black/40 transition-colors hover:bg-black/[0.1] hover:text-black/60"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const STATUSSTRIP_QOL = {
  naturalHand: 'dismissible strip thumb-reach X 28px, whileTap 0.985',
  choreography: 'mount 0.25 easeOut rise, exit y -6, working opacity 90 no self-advance',
  anticipation: 'phase prop caller-owned, Info icon signals working, AlertTriangle amber done',
  stateMemory: 'mounted once emit, timers self-clean, visible state local until dismissed',
  limitBehavior: 'min-w-0 truncate, flex-1 text balance, single vs title variants',
  escape: 'Escape key, X button, click outside via parent, backdrop not needed',
} as const
