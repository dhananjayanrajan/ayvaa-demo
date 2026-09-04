import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PagerProps {
  page: number
  totalPages: number
  onPageChange: (p: number) => void
  layoutId?: string
}

export function Pager({ page, totalPages, onPageChange, layoutId = 'pager' }: PagerProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const btn =
    'grid h-10 w-10 place-items-center rounded-2xl transition-all duration-200 aria-disabled:opacity-40 aria-disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40'

  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3.5">
      <span className="min-w-0 truncate text-[13.5px] font-extrabold tracking-tight text-[#0B211B]">
        Page <span className="tabular-nums text-emerald-700">{page}</span>
        <span className="font-bold text-[#0B211B]/35"> of </span>
        <span className="tabular-nums">{totalPages}</span>
      </span>
      <div className="flex shrink-0 items-center gap-1.5">
        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={() => onPageChange(Math.max(1, page - 1))}
          aria-disabled={page === 1}
          className={cn(
            btn,
            page === 1
              ? 'bg-[#0B211B]/[0.04] text-[#0B211B]/25'
              : 'bg-[#0B211B]/[0.06] text-[#0B211B]/70 hover:bg-[#0B211B]/[0.1] hover:text-[#0B211B]',
          )}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2.4} aria-hidden />
        </motion.button>

        {pages.map((p) => (
          <motion.button
            key={p}
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => onPageChange(p)}
            className={cn(
              'relative grid h-10 w-10 place-items-center rounded-2xl transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40',
              p !== page && 'hover:bg-[#0B211B]/[0.06]',
            )}
            aria-label={`Page ${p}`}
            aria-current={p === page ? 'page' : undefined}
          >
            {p === page && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_10px_20px_-10px_rgba(16,185,129,0.7)]"
              />
            )}
            <span
              className={cn(
                'relative text-[13px] font-extrabold tabular-nums',
                p === page ? 'text-white' : 'text-[#0B211B]/55',
              )}
            >
              {p}
            </span>
          </motion.button>
        ))}

        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          aria-disabled={page === totalPages}
          className={cn(
            btn,
            page === totalPages
              ? 'bg-[#0B211B]/[0.04] text-[#0B211B]/25'
              : 'bg-[#0B211B]/[0.06] text-[#0B211B]/70 hover:bg-[#0B211B]/[0.1] hover:text-[#0B211B]',
          )}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={2.4} aria-hidden />
        </motion.button>
      </div>
    </div>
  )
}
