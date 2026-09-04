import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Stars({ className, size = 'h-3.5 w-3.5' }: { className?: string; size?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-0.5', className)} aria-label="5 star rating">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className={cn(size, 'fill-amber-300 text-amber-300')} aria-hidden />
      ))}
    </span>
  )
}
