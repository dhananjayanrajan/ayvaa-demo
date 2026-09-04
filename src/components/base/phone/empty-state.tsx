import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { Card, Chip, type Intent } from '@/components/base/phone/kit'
import { cn } from '@/lib/utils'

type EmptyTone = 'emerald' | 'amber' | 'neutral'
type BadgeShape = 'round' | 'square' | 'soft'
type BadgeSize = 'sm' | 'md' | 'lg'
type EmptyContainer = 'card' | 'plain' | 'dashed' | 'soft' | 'bare'
type EmptySpacing = 'gap' | 'margin'
type EmptyGap = 'sm' | 'md'
type EmptyPadding = 'sm' | 'md' | 'lg' | 'dashed' | 'none'

const BADGE_SHAPE: Record<BadgeShape, Record<BadgeSize, string>> = {
  round: {
    sm: 'h-11 w-11 rounded-full',
    md: 'h-12 w-12 rounded-full',
    lg: 'h-14 w-14 rounded-full',
  },
  square: {
    sm: 'h-11 w-11 rounded-2xl',
    md: 'h-12 w-12 rounded-2xl',
    lg: 'h-14 w-14 rounded-2xl',
  },
  soft: {
    sm: 'h-11 w-11 rounded-xl',
    md: 'h-12 w-12 rounded-xl',
    lg: 'h-14 w-14 rounded-xl',
  },
}

const BADGE_TONE: Record<BadgeShape, Record<BadgeSize, Record<EmptyTone, string>>> = {
  round: {
    sm: {
      emerald: 'bg-emerald-500/[0.1] text-emerald-600',
      amber: 'bg-amber-500/[0.12] text-amber-600',
      neutral: 'bg-[#0B211B]/[0.05] text-[#0B211B]/35',
    },
    md: {
      emerald: 'bg-gradient-to-br from-emerald-500/15 to-teal-500/15 text-emerald-600',
      amber: 'bg-amber-500/[0.12] text-amber-600',
      neutral: 'bg-[#0B211B]/[0.05] text-[#0B211B]/35',
    },
    lg: {
      emerald: 'bg-emerald-500/[0.1] text-emerald-600',
      amber: 'bg-amber-500/[0.12] text-amber-600',
      neutral: 'bg-[#0B211B]/[0.05] text-[#0B211B]/35',
    },
  },
  square: {
    sm: {
      emerald: 'bg-emerald-500/[0.12] text-emerald-600',
      amber: 'bg-amber-500/[0.12] text-amber-600',
      neutral: 'bg-[#0B211B]/[0.05] text-[#0B211B]/40',
    },
    md: {
      emerald: 'bg-emerald-500/[0.12] text-emerald-600',
      amber: 'bg-amber-500/[0.12] text-amber-600',
      neutral: 'bg-[#0B211B]/[0.05] text-[#0B211B]/40',
    },
    lg: {
      emerald: 'bg-emerald-500/[0.12] text-emerald-600',
      amber: 'bg-amber-500/[0.12] text-amber-600',
      neutral: 'bg-[#0B211B]/[0.05] text-[#0B211B]/40',
    },
  },
  soft: {
    sm: {
      emerald: 'bg-emerald-500/[0.12] text-emerald-600',
      amber: 'bg-amber-500/[0.12] text-amber-600',
      neutral: 'bg-[#0B211B]/[0.05] text-[#0B211B]/35',
    },
    md: {
      emerald: 'bg-emerald-500/[0.12] text-emerald-600',
      amber: 'bg-amber-500/[0.12] text-amber-600',
      neutral: 'bg-[#0B211B]/[0.05] text-[#0B211B]/35',
    },
    lg: {
      emerald: 'bg-emerald-500/[0.12] text-emerald-600',
      amber: 'bg-amber-500/[0.12] text-amber-600',
      neutral: 'bg-[#0B211B]/[0.05] text-[#0B211B]/35',
    },
  },
}

const ICON_SIZE: Record<BadgeSize, string> = {
  sm: 'h-5 w-5',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
}

const CONTAINER_CHROME: Record<EmptyContainer, string> = {
  card: '',
  plain:
    'rounded-2xl bg-white shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)]',
  dashed: 'rounded-2xl border border-dashed border-emerald-600/20 bg-emerald-500/[0.04]',
  soft: 'rounded-2xl bg-[#0B211B]/[0.03]',
  bare: '',
}

const PADDING: Record<EmptyPadding, string> = {
  sm: 'px-5 py-8',
  md: 'p-5',
  lg: 'px-6 py-10',
  dashed: 'px-6 py-8',
  none: '',
}

const ACTION_TONE: Record<EmptyTone, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-700',
  amber: 'bg-amber-500/[0.12] text-amber-700',
  neutral: 'bg-[#0B211B]/[0.05] text-[#0B211B]/75',
}

export interface EmptyStateAction {
  label: string
  onClick: () => void
}

interface EmptyStateProps {
  icon?: LucideIcon
  tone?: EmptyTone
  badge?: BadgeShape
  size?: BadgeSize
  title: string
  body?: string
  action?: EmptyStateAction
  actionStyle?: 'pill' | 'full'
  chip?: string
  chipIntent?: Intent
  container?: EmptyContainer
  spacing?: EmptySpacing
  gap?: EmptyGap
  padding?: EmptyPadding
  className?: string
  titleClassName?: string
  bodyClassName?: string
}

export function EmptyState({
  icon: Icon,
  tone = 'neutral',
  badge = 'round',
  size = 'md',
  title,
  body,
  action,
  actionStyle = 'full',
  chip,
  chipIntent = 'success',
  container = 'bare',
  spacing = 'gap',
  gap = 'md',
  padding = 'sm',
  className,
  titleClassName,
  bodyClassName,
}: EmptyStateProps) {
  const content = (
    <div
      className={cn(
        CONTAINER_CHROME[container],
        spacing === 'gap'
          ? cn('flex flex-col items-center text-center', gap === 'sm' ? 'gap-2' : 'gap-3')
          : 'text-center',
        PADDING[padding],
        className,
      )}
    >
      {Icon && (
        <span
          className={cn(
            'grid place-items-center',
            BADGE_SHAPE[badge][size],
            BADGE_TONE[badge][size][tone],
            spacing === 'margin' && 'mx-auto',
          )}
        >
          <Icon className={ICON_SIZE[size]} strokeWidth={2.2} aria-hidden />
        </span>
      )}
      <div
        className={cn(
          'font-bold',
          spacing === 'margin' && 'mt-3',
          titleClassName,
        )}
      >
        {title}
      </div>
      {body && (
        <div
          className={cn(
            'font-medium',
            spacing === 'margin' && 'mt-1.5',
            bodyClassName,
          )}
        >
          {body}
        </div>
      )}
      {action && (
        <motion.button
          type="button"
          whileTap={{ scale: actionStyle === 'pill' ? 0.96 : 0.985 }}
          onClick={action.onClick}
          className={cn(
            ACTION_TONE[tone],
            actionStyle === 'pill'
              ? 'mt-1 rounded-full px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.1em]'
              : 'mt-4 w-full rounded-2xl py-3 text-[12.5px] font-extrabold',
          )}
        >
          {action.label}
        </motion.button>
      )}
      {chip && (
        <Chip intent={chipIntent} className={cn(spacing === 'margin' && 'mt-3')}>
          {chip}
        </Chip>
      )}
    </div>
  )

  if (container === 'card') {
    return <Card>{content}</Card>
  }
  return content
}
