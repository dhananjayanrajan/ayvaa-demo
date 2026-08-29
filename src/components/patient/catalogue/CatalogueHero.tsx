import { motion } from 'motion/react'
import { Search, X } from 'lucide-react'
import { Hero } from '@/components/phone/kit'

export function CatalogueHero({
  query,
  matchCount,
  onQuery,
}: {
  query: string
  matchCount: number
  onQuery: (q: string) => void
}) {
  return (
    <Hero>
      <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/60">
        <Search className="h-3 w-3 text-emerald-300/80" aria-hidden />
        Service catalogue
      </div>
      <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        {matchCount} services match,{' '}
        <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
          all caregiver-verified
        </span>
      </h2>
      <p className="mt-1 text-pretty text-[12px] font-medium leading-relaxed text-emerald-100/70">
        Every category is delivered by licence-checked professionals near you.
      </p>

      <div className="mt-4 flex h-11 items-center gap-2.5 rounded-2xl bg-white/[0.08] px-3.5 transition-colors focus-within:bg-white/[0.12]">
        <Search className="h-4 w-4 shrink-0 text-emerald-100/50" strokeWidth={2.4} aria-hidden />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search care, nurses, medicine"
          aria-label="Search services"
          className="min-w-0 flex-1 bg-transparent text-[13px] font-bold tracking-tight text-white outline-none placeholder:text-emerald-100/35"
        />
        {query && (
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => onQuery('')}
            aria-label="Clear search"
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/[0.1] text-emerald-100/60"
          >
            <X className="h-3.5 w-3.5" aria-hidden />
          </motion.button>
        )}
      </div>
    </Hero>
  )
}
