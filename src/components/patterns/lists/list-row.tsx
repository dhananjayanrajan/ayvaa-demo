import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Row } from '@/components/base/phone/row'
import type { TileTone } from '@/components/base/phone/kit'

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
}: {
  icon: LucideIcon
  tone?: TileTone
  title: string
  subtitle?: string
  onClick?: () => void
  trailing?: ReactNode
  showChevron?: boolean
  tileSize?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  return (
    <Row
      icon={icon}
      tone={tone}
      title={title}
      subtitle={subtitle}
      subtitleClassName="text-xs font-medium leading-relaxed line-clamp-2"
      onClick={onClick}
      trailing={trailing}
      showChevron={showChevron}
      tileSize={tileSize}
      className={className ?? 'group transition-colors duration-200 hover:bg-[#0B211B]/[0.02]'}
    />
  )
}
