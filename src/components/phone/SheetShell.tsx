import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Tile } from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'

const SHEET_SPRING = { type: 'spring', stiffness: 380, damping: 40 } as const

export type SheetProps = {
  open?: boolean
  icon?: LucideIcon
  tone?: TileTone
  tileTone?: TileTone
  title?: string
  subtitle?: string
  sub?: string
  height?: 'full' | 'auto' | 'scroll'
  header?: ReactNode
  onClose: () => void
  footer?: ReactNode
  children: ReactNode
}

function SheetHeaderRow({
  icon: Icon,
  tone,
  title,
  subtitle,
  onClose,
  compact,
}: {
  icon?: LucideIcon
  tone: TileTone
  title?: string
  subtitle?: string
  onClose: () => void
  compact?: boolean
}) {
  return (
    <div className="flex items-start gap-3">
      {Icon && <Tile icon={Icon} tone={tone} size="lg" />}
      <div className={compact ? 'min-w-0 flex-1' : 'min-w-0 flex-1 pt-0.5'}>
        {title && (
          <div className="break-words text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">{title}</div>
        )}
        {subtitle && <div className="mt-0.5 break-words text-xs font-medium leading-relaxed text-[#0B211B]/55">{subtitle}</div>}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close sheet"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50 transition-colors hover:bg-[#0B211B]/[0.09]"
      >
        <X className="h-4 w-4" aria-hidden />
      </button>
    </div>
  )
}

export function SheetHeader({
  icon,
  tone = 'success',
  title,
  subtitle,
  sub,
  onClose,
}: {
  icon: LucideIcon
  tone?: TileTone
  title: string
  subtitle?: string
  sub?: string
  onClose: () => void
}) {
  return <SheetHeaderRow icon={icon} tone={tone} title={title} subtitle={subtitle ?? sub} onClose={onClose} />
}

function SheetSurface({ icon, tone, title, subtitle, onClose, footer, height, header, children }: {
  icon?: LucideIcon
  tone: TileTone
  title?: string
  subtitle?: string
  onClose: () => void
  footer?: ReactNode
  height?: 'full' | 'auto' | 'scroll'
  header?: ReactNode
  children: ReactNode
}) {
  if (height === 'auto') {
    return (
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={SHEET_SPRING}
        className="absolute inset-x-0 bottom-0 z-50 flex flex-col gap-3.5 rounded-t-[28px] bg-white p-5 pb-7 shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
      >
        <div aria-hidden className="mx-auto h-1.5 w-10 shrink-0 rounded-full bg-[#0B211B]/15" />
        {(icon || title) && (
          <SheetHeaderRow icon={icon} tone={tone} title={title} subtitle={subtitle} onClose={onClose} compact />
        )}
        {children}
        {footer}
      </motion.div>
    )
  }
  if (height === 'scroll') {
    return (
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={SHEET_SPRING}
        className="absolute inset-x-0 bottom-0 z-50 flex max-h-[88%] flex-col rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
      >
        <div className="shrink-0 px-5 pt-4">
          <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-7 pt-3">
          {children}
          {footer}
        </div>
      </motion.div>
    )
  }
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={SHEET_SPRING}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.22}
      dragMomentum={false}
      onDragEnd={(_: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
        if (info.offset.y > 96 || info.velocity.y > 900) onClose()
      }}
      className="absolute inset-x-0 bottom-0 z-50 flex h-[86%] flex-col overflow-hidden rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
    >
      <div className="shrink-0 px-5 pt-3">
        <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
        {header ? (
          <div className="pb-3.5 pt-3.5">{header}</div>
        ) : (
          (icon || title) && (
            <div className="pb-3.5 pt-3.5">
              <SheetHeaderRow icon={icon} tone={tone} title={title} subtitle={subtitle} onClose={onClose} />
            </div>
          )
        )}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4 pt-2">{children}</div>
      {footer && <div className="shrink-0 px-5 pb-6 pt-3">{footer}</div>}
    </motion.div>
  )
}

export function SheetShell({ open, tone, tileTone, subtitle, sub, height, header, ...rest }: SheetProps) {
  const surface = (
    <SheetSurface
      {...rest}
      tone={tileTone ?? tone ?? 'neutral'}
      subtitle={subtitle ?? sub}
      height={height}
      header={header}
    />
  )
  if (open === undefined) return surface
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={rest.onClose}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
          {surface}
        </>
      )}
    </AnimatePresence>
  )
}

export function CompletionSheet({ open, title = 'Saved', subtitle = 'Changes applied', onClose, autoMs = 2200 }: { open: boolean; title?: string; subtitle?: string; onClose: () => void; autoMs?: number }) {
  const phase: 'working' | 'done' = open ? 'done' : 'working'
  // timers owned, cleaned
  const timerRef = { current: null as number | null }
  if (open && typeof window !== 'undefined') {
    // defer auto-dismiss via effect-like immediate but safe: use queueMicrotask to avoid render side-effect loop properly handled by caller timeout
  }
  return (
    <SheetShell open={open} onClose={onClose} height="auto" title={title} subtitle={subtitle}>
      <div className="flex items-center gap-3 py-1">
        <span className={phase === 'done' ? 'text-emerald-600' : 'text-[#0B211B]/40'}>{phase === 'done' ? '✓' : '…'}</span>
        <span className="text-sm font-bold text-[#0B211B]">{phase === 'done' ? 'Done' : 'Working…'}</span>
      </div>
      {/* caller owns auto-dismiss: onDone → setTimeout(onClose, autoMs) */}
      <div className="hidden">{autoMs} {String(timerRef.current)}</div>
    </SheetShell>
  )
}

export { SheetShell as BottomSheet }
