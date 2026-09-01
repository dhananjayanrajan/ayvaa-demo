import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, ChevronDown, Loader2 } from 'lucide-react'
import { Tile, Chip, TimeChip } from '@/components/phone/kit'
import type { TileTone, Intent } from '@/components/phone/kit'
import { useFramework } from '@/components/phone/FrameworkRuntime'
import { cn } from '@/lib/utils'

export type StepState = 'done' | 'active' | 'pending'
export type StepNodeStyle = 'tile' | 'circle' | 'dot'
export type StepTheme = 'light' | 'dark'
export type StepActiveStyle = 'spinner' | 'ping'

export interface StepChip {
  label: string
  intent?: Intent
  dot?: boolean
  icon?: LucideIcon
  className?: string
}

export interface StepItem {
  key: string
  title: string
  body?: string
  time?: string
  timeTrailing?: boolean
  timeTrailingClassName?: string
  titleWrap?: boolean
  trailingTitle?: ReactNode
  itemClassName?: string
  chip?: StepChip
  trailing?: ReactNode
  icon?: LucideIcon
  tone?: TileTone
  state?: StepState
  node?: ReactNode
  nodeClassName?: string
  railClassName?: string
  onClick?: () => void
  expandable?: boolean
  open?: boolean
  onToggle?: () => void
  expansion?: ReactNode
  titleMeta?: ReactNode
  titleClassName?: string
  bodyClassName?: string
  contentClassName?: string
  className?: string
}

export interface StepListProps {
  steps: StepItem[]
  nodeStyle?: StepNodeStyle
  nodeSize?: 'sm' | 'md' | 'lg'
  theme?: StepTheme
  activeStyle?: StepActiveStyle
  railClassName?: string
  className?: string
}

function StepNode({
  item,
  nodeStyle,
  nodeSize,
  theme,
  activeStyle,
}: {
  item: StepItem
  nodeStyle: StepNodeStyle
  nodeSize: 'sm' | 'md' | 'lg'
  theme: StepTheme
  activeStyle: StepActiveStyle
}) {
  if (item.node) return <span className={cn('shrink-0', item.nodeClassName)}>{item.node}</span>

  if (nodeStyle === 'tile') {
    return (
      <span className={cn('shrink-0', item.nodeClassName)}>
        {item.icon && (
          <Tile icon={item.icon} tone={item.tone ?? 'neutral'} size={nodeSize === 'lg' ? 'lg' : nodeSize === 'md' ? 'md' : 'sm'} />
        )}
      </span>
    )
  }

  if (nodeStyle === 'dot') {
    return (
      <span
        className={cn(
          'mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full',
          theme === 'dark' ? 'bg-white/25' : 'bg-[#0B211B]/[0.2]',
          item.state === 'done' && (theme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-500'),
          item.state === 'active' && (theme === 'dark' ? 'bg-amber-400' : 'bg-amber-500'),
          item.nodeClassName
        )}
      />
    )
  }

  // circle
  const sizeClass = nodeSize === 'lg' ? 'h-8 w-8' : nodeSize === 'md' ? 'h-5 w-5' : 'h-3.5 w-3.5'
  const iconSize = nodeSize === 'lg' ? 'h-4 w-4' : nodeSize === 'md' ? 'h-3 w-3' : 'h-2.5 w-2.5'

  if (item.state === 'done') {
    return (
      <span
        className={cn(
          'grid shrink-0 place-items-center rounded-full',
          sizeClass,
          theme === 'dark' ? 'bg-emerald-400 text-[#04241A]' : 'bg-emerald-500 text-white',
          item.nodeClassName
        )}
      >
        <Check className={iconSize} strokeWidth={3} aria-hidden />
      </span>
    )
  }

  if (item.state === 'active') {
    if (activeStyle === 'spinner') {
      return (
        <span
          className={cn(
            'grid shrink-0 place-items-center rounded-full',
            sizeClass,
            'bg-amber-400 text-white',
            item.nodeClassName
          )}
        >
          <Loader2 className={cn(iconSize, 'animate-spin')} aria-hidden />
        </span>
      )
    }
    return (
      <span className={cn('relative grid shrink-0 place-items-center', sizeClass, item.nodeClassName)}>
        <span
          className={cn(
            'absolute inset-0 animate-ping rounded-full',
            theme === 'dark' ? 'bg-emerald-400/50' : 'bg-amber-400/50'
          )}
          aria-hidden
        />
        <span
          className={cn(
            'relative rounded-full',
            theme === 'dark' ? 'bg-emerald-400' : 'bg-amber-400',
            nodeSize === 'lg' ? 'h-3 w-3' : nodeSize === 'md' ? 'h-2 w-2' : 'h-1.5 w-1.5'
          )}
        />
      </span>
    )
  }

  if (item.icon) {
    const Icon = item.icon
    return (
      <span
        className={cn(
          'grid shrink-0 place-items-center rounded-full',
          sizeClass,
          theme === 'dark' ? 'bg-white/15 text-white/40' : 'bg-[#0B211B]/[0.06] text-[#0B211B]/30',
          item.nodeClassName
        )}
      >
        <Icon className={iconSize} aria-hidden />
      </span>
    )
  }

  return (
    <span
      className={cn(
        'shrink-0 rounded-full',
        sizeClass,
        theme === 'dark' ? 'bg-white/15' : 'bg-[#0B211B]/[0.08]',
        item.nodeClassName
      )}
    />
  )
}

export function StepList({
  steps,
  nodeStyle = 'circle',
  nodeSize = 'md',
  theme = 'light',
  activeStyle = 'spinner',
  railClassName,
  className,
}: StepListProps) {
  const { emit } = useFramework()
  return (
    <div className={cn('flex flex-col', className)}>
      {steps.map((item, i) => {
        const isLast = i === steps.length - 1
        const interactive = (item.onClick) || (item.expandable && item.onToggle)
        const done = item.state === 'done'
        const handlePress = () => {
          emit(item.expandable ? 'step.toggled' : 'step.pressed', { key: item.key, title: item.title, open: !item.open })
          if (item.onClick) item.onClick()
          else if (item.onToggle) item.onToggle()
        }

        const rail =
          isLast ? null : (
            <span
              aria-hidden
              className={cn(
                'my-1 w-px flex-1',
                (item.railClassName ?? railClassName) ??
                  (theme === 'dark'
                    ? 'bg-white/15'
                    : done
                      ? 'bg-emerald-500/30'
                      : 'bg-[#0B211B]/[0.08]')
              )}
            />
          )

        const content = (
          <span className={cn('min-w-0 flex-1', item.contentClassName ?? 'pb-4')}>
            <span className={cn('flex items-center gap-1.5', item.timeTrailing && 'justify-between')}>
              {item.time && !item.timeTrailing && <TimeChip>{item.time}</TimeChip>}
              <span
                className={cn(
                  'block text-[13.5px] font-bold tracking-tight',
                  item.titleWrap ? 'break-words' : 'truncate',
                  theme === 'dark' ? 'text-white' : 'text-[#0B211B]',
                  item.state === 'pending' && theme === 'light' && 'text-[#0B211B]/35',
                  item.titleClassName
                )}
              >
                {item.title}
              </span>
              {item.titleMeta}
              {item.chip && (
                <Chip
                  intent={item.chip.intent ?? 'neutral'}
                  dot={item.chip.dot}
                  icon={item.chip.icon}
                  className={cn('shrink-0 whitespace-nowrap', item.chip.className)}
                >
                  {item.chip.label}
                </Chip>
              )}
              {item.expandable && !item.trailing && !item.trailingTitle && (
                <motion.span animate={{ rotate: item.open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
                  <ChevronDown className="h-3.5 w-3.5 text-[#0B211B]/35" aria-hidden />
                </motion.span>
              )}
              {item.time && item.timeTrailing && (
                <span
                  className={cn(
                    'shrink-0 font-mono text-[10px] font-bold uppercase tracking-wide',
                    theme === 'dark' ? 'text-white/40' : 'text-[#0B211B]/40',
                    item.timeTrailingClassName
                  )}
                >
                  {item.time}
                </span>
              )}
              {item.trailingTitle && <span className="ml-auto shrink-0">{item.trailingTitle}</span>}
            </span>
            {item.body && (
              <span
                className={cn(
                  'mt-0.5 block break-words text-[11.5px] font-medium leading-snug',
                  theme === 'dark' ? 'text-white/60' : 'text-[#0B211B]/55',
                  item.state === 'pending' && theme === 'light' && 'text-[#0B211B]/30',
                  item.bodyClassName
                )}
              >
                {item.body}
              </span>
            )}
            {item.trailing}
          </span>
        )

        const row = interactive ? (
          <motion.button
            type="button"
            whileTap={{ scale: 0.985 }}
            onClick={handlePress}
            aria-expanded={item.expandable ? item.open : undefined}
            className={cn('flex w-full items-start gap-3 text-left', item.className)}
          >
            {content}
          </motion.button>
        ) : (
          <div className={cn('flex w-full items-start gap-3 text-left', item.className)}>{content}</div>
        )

        return (
          <div key={item.key} className={cn('flex gap-3', item.itemClassName, isLast ? '' : 'flex-1')}>
            <span className="flex shrink-0 flex-col items-center">
              <StepNode item={item} nodeStyle={nodeStyle} nodeSize={nodeSize} theme={theme} activeStyle={activeStyle} />
              {rail}
            </span>
            <span className="min-w-0 flex-1">
              {row}
              {item.expandable && item.expansion && (
                <AnimatePresence initial={false}>
                  {item.open && (
                    <motion.div
                      key="detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pb-4">{item.expansion}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </span>
          </div>
        )
      })}
    </div>
  )
}
