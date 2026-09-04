import { Check, Clock } from 'lucide-react'
import AILoader from '@/components/base/smoothui/ai-loader'
import { Tile } from '@/components/base/phone/kit'
import { cn } from '@/lib/utils'

interface CheckTileProps {
  state: string
  className?: string
}

export function CheckTile({ state, className }: CheckTileProps) {
  if (state === 'running') {
    return (
      <span className={cn(
        'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/[0.14] text-amber-600 ring-4 ring-amber-500/10',
        className,
      )}>
        <AILoader variant="dots" className="h-4 w-4" />
      </span>
    )
  }
  if (state === 'ok') {
    return <Tile icon={Check} tone="success" size="sm" className={cn('h-9 w-9 rounded-xl', className)} />
  }
  return <Tile icon={Clock} tone="neutral" size="sm" className={cn('h-9 w-9 rounded-xl', className)} />
}
