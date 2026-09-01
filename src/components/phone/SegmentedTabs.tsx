import { motion } from 'motion/react'
import { Check, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type SegTone = 'emerald' | 'emeraldSolid' | 'dark' | 'white'
export type SegLabel = 'micro' | 'normal'
export type SegCount = 'inline' | 'badge' | 'baseline' | 'none'
export type SegLabelSize = '8px' | '9px' | '10px'
export type SegTracking = '0.08em' | '0.1em' | '0.12em' | '0.16em'
export type SegBadgeSize = '8.5px' | '9px'

export interface SegTab {
  id: string
  label: string
  count?: number
  icon?: LucideIcon
  sub?: string
  done?: boolean
}

interface SegmentedTabsProps {
  tabs: SegTab[]
  value: string
  onChange: (id: string) => void
  layoutId: string
  tone?: SegTone
  label?: SegLabel
  count?: SegCount
  labelSize?: SegLabelSize
  tracking?: SegTracking
  badgeSize?: SegBadgeSize
  twoLine?: boolean
  whileTap?: boolean
  role?: boolean
  className?: string
  labelClassName?: string
  badgeClassName?: string
  iconClassName?: string
  subClassName?: string
}

const SHELL: Record<SegTone, string> = {
  emerald: 'bg-[#0B211B]/[0.06]',
  emeraldSolid: 'bg-[#0B211B]/[0.06]',
  dark: 'bg-[#0B211B]/[0.05]',
  white: 'bg-[#0B211B]/[0.05]',
}

// dark/white originals used `flex gap-1` (no items-center); emerald/emeraldSolid used `flex items-center gap-1`
const SHELL_ALIGN: Record<SegTone, string> = {
  emerald: 'items-center',
  emeraldSolid: 'items-center',
  dark: '',
  white: '',
}

const SPRING: Record<SegTone, { stiffness: number; damping: number }> = {
  emerald: { stiffness: 480, damping: 38 },
  emeraldSolid: { stiffness: 480, damping: 38 },
  dark: { stiffness: 420, damping: 34 },
  white: { stiffness: 500, damping: 40 },
}

const BUTTON: Record<SegTone, string> = {
  emerald: 'flex items-center justify-center gap-1.5 py-2.5',
  emeraldSolid: 'flex items-center justify-center gap-1.5 py-2.5',
  dark: 'min-w-0 px-1 py-2 transition-colors',
  white: 'px-2 py-2',
}

const PILL: Record<SegTone, string> = {
  emerald: 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_8px_18px_-8px_rgba(16,185,129,0.7)]',
  emeraldSolid: 'bg-emerald-600 shadow-[0_8px_18px_-8px_rgba(5,120,85,0.8)]',
  dark: 'bg-[#0B211B]',
  white: 'bg-white shadow-[0_6px_16px_-8px_rgba(11,33,27,0.4)]',
}

const LABEL_SIZE: Record<SegLabelSize, string> = {
  '8px': 'text-[8px]',
  '9px': 'text-[9px]',
  '10px': 'text-[10px]',
}

const TRACKING: Record<SegTracking, string> = {
  '0.08em': 'tracking-[0.08em]',
  '0.1em': 'tracking-[0.1em]',
  '0.12em': 'tracking-[0.12em]',
  '0.16em': 'tracking-[0.16em]',
}

const BADGE_SIZE: Record<SegBadgeSize, string> = {
  '8.5px': 'text-[8.5px]',
  '9px': 'text-[9px]',
}

function labelColor(tone: SegTone, active: boolean): string {
  if (tone === 'white') return active ? 'text-emerald-700' : 'text-[#0B211B]/40'
  if (tone === 'dark') return active ? 'text-white' : 'text-[#0B211B]/50 hover:text-[#0B211B]/75'
  return active ? 'text-white' : 'text-[#0B211B]/45'
}

function badgeColor(tone: SegTone, active: boolean): string {
  if (active) return 'bg-white/20 text-white'
  if (tone === 'emeraldSolid') return 'bg-[#0B211B]/[0.06] text-[#0B211B]/45'
  return 'bg-[#0B211B]/[0.06] text-[#0B211B]/40'
}

export function SegmentedTabs({
  tabs,
  value,
  onChange,
  layoutId,
  tone = 'emerald',
  label = 'micro',
  count = 'none',
  labelSize = '9px',
  tracking = '0.16em',
  badgeSize = '9px',
  twoLine = false,
  whileTap = true,
  role = true,
  className,
  labelClassName,
  badgeClassName,
  iconClassName,
  subClassName,
}: SegmentedTabsProps) {
  const labelCls =
    label === 'micro'
      ? cn('font-extrabold uppercase', LABEL_SIZE[labelSize], TRACKING[tracking])
      : 'text-[12px] font-bold'

  const labelTransition = tone === 'white' ? 'transition-colors duration-200' : ''

  const idx = Math.max(0, tabs.findIndex((t) => t.id === value))
  const onSwipe = (dir: 1 | -1) => {
    const next = idx + dir
    if (next >= 0 && next < tabs.length) onChange(tabs[next].id)
  }
  return (
    <motion.div
      role={role ? 'tablist' : undefined}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.18}
      dragMomentum={false}
      onDragEnd={(_, info) => {
        if (info.offset.x < -44 || info.velocity.x < -600) onSwipe(1)
        else if (info.offset.x > 44 || info.velocity.x > 600) onSwipe(-1)
      }}
      className={cn('flex gap-1 rounded-full p-1 touch-pan-y', SHELL_ALIGN[tone], SHELL[tone], className)}
    >
      {tabs.map((tab) => {
        const active = value === tab.id
        const Icon = tab.icon
        // dark tone colors the button (so the baseline count span inherits it), matching the original
        const labelSpanColor = tone === 'dark' ? '' : labelColor(tone, active)
        return (
          <motion.button
            key={tab.id}
            type="button"
            role={role ? 'tab' : undefined}
            aria-selected={role ? active : undefined}
            whileTap={whileTap ? { scale: 0.95 } : undefined}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative flex-1 rounded-full',
              BUTTON[tone],
              twoLine && 'transition-colors',
              tone === 'dark' && labelColor(tone, active),
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: 'spring', stiffness: SPRING[tone].stiffness, damping: SPRING[tone].damping }}
                className={cn('absolute inset-0 rounded-full', PILL[tone])}
              />
            )}
            {twoLine ? (
              <span className="relative flex flex-col items-center gap-0.5">
                <span
                  className={cn(
                    'text-[8px] font-extrabold uppercase tracking-[0.12em]',
                    active ? 'text-white/80' : 'text-[#0B211B]/40',
                    subClassName,
                  )}
                >
                  {tab.label}
                </span>
                <span
                  className={cn(
                    'text-[13px] font-extrabold leading-none',
                    active ? 'text-white' : 'text-[#0B211B]',
                  )}
                >
                  {tab.sub}
                </span>
              </span>
            ) : count === 'inline' ? (
              <span className={cn('relative block truncate', labelCls, labelTransition, labelSpanColor, labelClassName)}>
                {tab.label} · {tab.count}
              </span>
            ) : count === 'baseline' ? (
              <span className="relative flex items-baseline justify-center gap-1">
                <span className={cn('relative', labelCls, labelTransition, labelSpanColor, labelClassName)}>{tab.label}</span>
                <span className="relative text-[10px] font-extrabold tabular-nums opacity-60">{tab.count}</span>
              </span>
            ) : (
              <>
                {Icon && (
                  <Icon
                    className={cn('relative h-3.5 w-3.5', active ? 'text-white' : 'text-[#0B211B]/45', iconClassName)}
                    strokeWidth={2.4}
                    aria-hidden
                  />
                )}
                <span className={cn('relative', labelCls, labelTransition, labelSpanColor, labelClassName)}>{tab.label}</span>
                {count === 'badge' && tab.count !== undefined && (
                  <span
                    className={cn(
                      'relative rounded-full px-1.5 py-0.5 font-extrabold tabular-nums',
                      BADGE_SIZE[badgeSize],
                      badgeColor(tone, active),
                      badgeClassName,
                    )}
                  >
                    {tab.count}
                  </span>
                )}
                {tab.done && !active && (
                  <Check className="relative h-3 w-3 text-emerald-600" strokeWidth={3.5} aria-hidden />
                )}
              </>
            )}
          </motion.button>
        )
      })}
    </motion.div>
  )
}
