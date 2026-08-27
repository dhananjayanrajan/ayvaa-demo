import type { ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from '@/lib/router'

export function Board({
  caption,
  prev,
  next,
  children,
}: {
  caption: string
  prev?: string
  next?: string
  children: ReactNode
}) {
  const { navigate } = useRouter()
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-xs font-bold uppercase tracking-[2.4px] text-muted-foreground">{caption}</span>
      {children}
      <div className="flex items-center gap-2">
        {prev && (
          <button
            onClick={() => navigate(prev)}
            className="flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-4 text-xs font-bold text-foreground/70 transition-colors hover:bg-mint"
          >
            <ChevronLeft className="size-4" />
            Prev
          </button>
        )}
        {next && (
          <button
            onClick={() => navigate(next)}
            className="flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-4 text-xs font-bold text-foreground/70 transition-colors hover:bg-mint"
          >
            Next
            <ChevronRight className="size-4" />
          </button>
        )}
      </div>
    </div>
  )
}