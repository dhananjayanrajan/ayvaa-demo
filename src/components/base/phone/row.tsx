import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Tile, Chip, TimeChip } from '@/components/base/phone/kit'
import type { TileTone, Intent } from '@/components/base/phone/kit'
import { useFramework } from '@/components/base/phone/framework-runtime'
import { cn } from '@/lib/utils'

export type RowSurface = 'none' | 'inset' | 'live' | 'tint'

export interface RowChip {
  label: string
  intent?: Intent
  dot?: boolean
  icon?: LucideIcon
  className?: string
}

export interface RowProps {
  icon?: LucideIcon
  tone?: TileTone
  leading?: ReactNode
  tileClassName?: string
  label?: string
  labelClassName?: string
  title: string
  titleClassName?: string
  titleMeta?: ReactNode
  subtitle?: string
  subtitleClassName?: string
  metaLabel?: string
  metaValue?: string
  metaNote?: string
  metaInline?: boolean
  body?: ReactNode
  trailing?: ReactNode
  trailingClassName?: string
  chip?: RowChip
  amount?: string
  amountNote?: string
  time?: string
  onClick?: () => void
  disabled?: boolean
  expandable?: boolean
  open?: boolean
  onToggle?: () => void
  expansion?: ReactNode
  expansionClassName?: string
  expansionPadded?: boolean
  showChevron?: boolean
  chevronVisible?: boolean
  chevronInTrailing?: boolean
  tileSize?: 'sm' | 'md' | 'lg'
  align?: 'center' | 'start'
  padding?: 'none' | 'inset' | 'comfortable' | 'roomy' | 'even' | (string & {})
  surface?: RowSurface
  surfaceTone?: string
  wrapSurface?: boolean
  dark?: boolean | 'white'
  liveDot?: boolean
  fresh?: boolean
  whileTapDisabled?: boolean
  ariaExpanded?: boolean
  hoverClassName?: string
  className?: string
  bodyClassName?: string
}

function RowTrailing({
  chip,
  amount,
  amountNote,
  time,
  trailing,
  trailingClassName,
}: Pick<RowProps, 'chip' | 'amount' | 'amountNote' | 'time' | 'trailing' | 'trailingClassName'>) {
  if (amount && (chip || amountNote)) {
    return (
      <span className={cn('flex w-[92px] shrink-0 flex-col items-end gap-1.5', trailingClassName)}>
        <span className="font-mono text-[13px] font-black tabular-nums tracking-tight text-[#0B211B]">{amount}</span>
        {chip && <ChipRow chip={chip} />}
      </span>
    )
  }
  return (
    <>
      {amount && (
        <span className={cn('flex w-[74px] shrink-0 flex-col items-end pt-0.5', trailingClassName)}>
          <span className="font-mono text-[13px] font-black tabular-nums tracking-tight text-[#0B211B]">{amount}</span>
          {amountNote && (
            <span className="mt-1 font-mono text-[10px] font-bold tabular-nums text-[#0B211B]/45">{amountNote}</span>
          )}
        </span>
      )}
      {chip && !amount && <ChipRow chip={chip} />}
      {time && <TimeChip>{time}</TimeChip>}
      {trailing}
    </>
  )
}

function ChipRow({ chip }: { chip: RowChip }) {
  return (
    <Chip
      intent={chip.intent ?? 'neutral'}
      dot={chip.dot}
      icon={chip.icon}
      className={cn('shrink-0 whitespace-nowrap', chip.className)}
    >
      {chip.label}
    </Chip>
  )
}

export function Row({
  icon,
  tone = 'neutral',
  leading,
  tileClassName,
  label,
  labelClassName,
  title,
  titleClassName,
  titleMeta,
  subtitle,
  subtitleClassName,
  metaLabel,
  metaValue,
  metaNote,
  metaInline = false,
  body,
  trailing,
  trailingClassName,
  chip,
  amount,
  amountNote,
  time,
  onClick,
  disabled = false,
  expandable,
  open = false,
  onToggle,
  expansion,
  expansionClassName,
  expansionPadded = true,
  showChevron = true,
  chevronVisible = true,
  chevronInTrailing = false,
  tileSize = 'md',
  align = 'center',
  padding,
  surface = 'none',
  surfaceTone,
  wrapSurface = false,
  dark = false,
  liveDot = false,
  fresh = false,
  whileTapDisabled = false,
  ariaExpanded,
  hoverClassName,
  className,
  bodyClassName,
}: RowProps) {
  const { emit } = useFramework()
  const handleClick = () => {
    if (disabled) return
    emit('row.pressed', { title })
    onClick?.()
  }
  const handleToggle = () => {
    emit('row.toggled', { title, open: !open })
    onToggle?.()
  }
  const Icon = icon

  const leadingNode =
    leading ??
    (Icon ? (
      <span className="relative shrink-0">
        <Tile icon={Icon} tone={tone} size={tileSize} className={tileClassName} />
        {liveDot && (
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" aria-hidden />
        )}
      </span>
    ) : null)

  const bodyNode = (
    <span className={cn('min-w-0 flex-1', bodyClassName)}>
      {label && (
        <span className={cn('block text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40', labelClassName)}>
          {label}
        </span>
      )}
      <span className="flex items-center gap-1.5">
        <span
          className={cn(
            'block truncate text-[13.5px] font-bold tracking-tight',
dark ? (dark === 'white' ? 'text-white' : 'text-emerald-50/90') : 'text-[#0B211B]',
            titleClassName
          )}
        >
          {title}
        </span>
        {titleMeta}
        {expandable && !chevronInTrailing && chevronVisible && (
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
            <ChevronDown className="h-3.5 w-3.5 text-[#0B211B]/35" aria-hidden />
          </motion.span>
        )}
      </span>
      {subtitle && (
        <span
          className={cn(
            'mt-0.5 block break-words text-[11.5px] font-medium leading-snug',
dark ? (dark === 'white' ? 'text-white/45' : 'text-emerald-100/70') : 'text-[#0B211B]/55',
            subtitleClassName
          )}
        >
          {subtitle}
        </span>
      )}
      {metaLabel && (
        <span className={cn('block', metaInline && 'flex items-baseline gap-2')}>
          <span className={cn('mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40', metaInline && 'shrink-0')}>
            {metaLabel}
          </span>
          {metaValue && (
            <span
              className={cn(
                'text-[11px] font-semibold',
                metaInline ? 'min-w-0 truncate' : 'mt-1 block truncate',
                dark ? 'text-emerald-100/60' : 'text-[#0B211B]/45'
              )}
            >
              {metaValue}
            </span>
          )}
        </span>
      )}
      {!metaLabel && metaValue && (
        <span className={cn('block truncate text-[11px] font-semibold', dark ? 'text-emerald-100/60' : 'text-[#0B211B]/45')}>
          {metaValue}
        </span>
      )}
      {metaNote && (
        <span className="mt-1 block text-pretty text-[10.5px] font-semibold text-[#0B211B]/45">{metaNote}</span>
      )}
      {body}
    </span>
  )

  const surfaceClass =
    surface === 'inset'
      ? 'rounded-2xl bg-[#0B211B]/[0.03]'
      : surface === 'live'
        ? 'rounded-2xl bg-emerald-400/[0.14]'
        : surface === 'tint'
          ? surfaceTone
          : ''

  const paddingClass =
    padding === 'inset'
      ? 'px-2 py-3'
      : padding === 'comfortable'
        ? 'px-3.5 py-3'
        : padding === 'roomy'
          ? 'px-3 py-3.5'
          : padding === 'even'
            ? 'p-3.5'
            : typeof padding === 'string'
              ? padding
              : surface === 'none' && !wrapSurface
                ? 'px-4 py-3.5'
                : surfaceClass && !wrapSurface
                  ? 'px-2 py-3'
                  : ''

  const shellClass = cn(
    'flex w-full gap-3 text-left',
    align === 'start' ? 'items-start' : 'items-center',
    surface === 'none' && !wrapSurface ? surfaceClass : '',
    paddingClass,
    ((onClick && !disabled) || (expandable && onToggle)) &&
      cn('group transition-colors duration-200', hoverClassName ?? 'hover:bg-[#0B211B]/[0.02]'),
    ((onClick && !disabled) || (expandable && onToggle)) && 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40',
    className
  )

  const chevronNode = expandable && chevronInTrailing && chevronVisible && (
    <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
      <ChevronDown className="h-3.5 w-3.5 text-[#0B211B]/30" aria-hidden />
    </motion.span>
  )

  const inner = (
    <>
      {leadingNode}
      {bodyNode}
      <RowTrailing
        chip={chip}
        amount={amount}
        amountNote={amountNote}
        time={time}
        trailing={
          chevronNode && !trailing ? (
            <span className="flex shrink-0 flex-col items-end gap-1.5 pt-0.5">
              {chip && !amount && <ChipRow chip={chip} />}
              {chevronNode}
            </span>
          ) : chevronNode ? (
            <span className="flex shrink-0 flex-col items-end gap-1.5 pt-0.5">
              {trailing}
              {chevronNode}
            </span>
          ) : (
            trailing
          )
        }
        trailingClassName={trailingClassName}
      />
      {showChevron && !expandable && (
        <ChevronRight
          className={cn(
            'h-3.5 w-3.5 shrink-0 text-[#0B211B]/20',
            onClick && 'transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-emerald-600'
          )}
          aria-hidden
        />
      )}
    </>
  )

  const result = onClick ? (
    disabled ? (
      <div className={cn(shellClass, 'cursor-not-allowed')} aria-disabled="true">{inner}</div>
    ) : (
      <motion.button
        type="button"
        whileTap={whileTapDisabled ? undefined : { scale: 0.985 }}
        onClick={handleClick}
        aria-expanded={ariaExpanded}
        className={shellClass}
      >
        {inner}
      </motion.button>
    )
  ) : expandable && onToggle ? (
    <button type="button" onClick={handleToggle} aria-expanded={open} className={cn(shellClass, 'group')}>
      {inner}
    </button>
  ) : (
    <div className={shellClass}>{inner}</div>
  )

  const wrapped = fresh ? (
    <motion.div initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
      {result}
    </motion.div>
  ) : (
    result
  )

  if (!expansion) return wrapped

  const expansionNode = (
    <AnimatePresence initial={false}>
      {open && expansion && (
        <motion.div
          key="detail"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className={cn(expansionPadded && 'px-4 pb-4', expansionClassName)}>{expansion}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  if (wrapSurface && surfaceClass) {
    return (
      <div className={surfaceClass}>
        {wrapped}
        {expansionNode}
      </div>
    )
  }

  return (
    <div>
      {wrapped}
      {expansionNode}
    </div>
  )
}
