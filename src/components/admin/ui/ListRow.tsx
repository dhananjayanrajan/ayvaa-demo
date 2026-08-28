import { motion } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Tile } from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'
import { cn } from '@/lib/utils'

interface ListRowProps {
  icon: LucideIcon
  tone?: TileTone
  title: string
  subtitle?: string
  onClick?: () => void
  trailing?: ReactNode
  showChevron?: boolean
  tileSize?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ListRow({
  icon,
  tone = 'neutral',
  title,
  subtitle,
  onClick,
  trailing,
  showChevron = true,
  tileSize = 'md',
  className,
}: ListRowProps) {
  const inner = (
    <>
      <Tile icon={icon} tone={tone} size={tileSize} className="transition-transform duration-200 group-hover:scale-105" />
      <span className="min-w-0 flex-1">
        <span className="block text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">{title}</span>
        {subtitle && (
          <span className="mt-0.5 block line-clamp-2 text-xs font-medium leading-relaxed text-[#0B211B]/55">{subtitle}</span>
        )}
      </span>
      {trailing}
      {showChevron && (
        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/20 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-emerald-600" aria-hidden />
      )}
    </>
  )

  const classes = cn(
    'group flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors duration-200 hover:bg-[#0B211B]/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40',
    className,
  )

  if (onClick) {
    return (
      <motion.button type="button" whileTap={{ scale: 0.985 }} onClick={onClick} className={classes}>
        {inner}
      </motion.button>
    )
  }

  return <div className={classes}>{inner}</div>
}
