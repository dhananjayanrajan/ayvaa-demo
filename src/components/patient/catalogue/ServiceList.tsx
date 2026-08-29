import { motion } from 'motion/react'
import { Search, SlidersHorizontal } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { TileTone } from '@/components/phone/kit'
import type { Service } from '@/data/services'
import { ServiceRow } from './ServiceRow'

export type ListedService = {
  service: Service
  icon: LucideIcon
  tone: TileTone
}

export function ServiceList({
  items,
  note,
  query,
  filterCount,
  onPress,
  onReset,
  onClearFilters,
}: {
  items: ListedService[]
  note?: string
  query: string
  filterCount: number
  onPress: (item: ListedService) => void
  onReset: () => void
  onClearFilters: () => void
}) {
  const filteredOut = filterCount > 0
  return (
    <div className="rounded-3xl border border-[#0B211B]/[0.06] bg-white p-4 shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)]">
      {note && (
        <div className="mb-3 rounded-xl bg-blue-500/[0.08] px-3.5 py-2.5">
          <p className="text-pretty text-[10px] font-bold leading-snug text-blue-700">{note}</p>
        </div>
      )}
      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-5 py-8 text-center">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#0B211B]/[0.05] text-[#0B211B]/35">
            {filteredOut ? (
              <SlidersHorizontal className="h-5 w-5" strokeWidth={2.2} aria-hidden />
            ) : (
              <Search className="h-5 w-5" strokeWidth={2.2} aria-hidden />
            )}
          </span>
          {filteredOut ? (
            <>
              <span className="text-[13px] font-bold tracking-tight text-[#0B211B]/70">
                Your filters hide every service
              </span>
              <span className="text-pretty text-[11px] font-medium leading-snug text-[#0B211B]/45">
                The budget cap or another preference excludes this category. Loosen a filter to see
                more care.
              </span>
              <motion.button
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={onClearFilters}
                className="mt-1 rounded-full bg-emerald-500/10 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.1em] text-emerald-700"
              >
                Clear all filters
              </motion.button>
            </>
          ) : (
            <>
              <span className="text-[13px] font-bold tracking-tight text-[#0B211B]/70">
                Nothing matches "{query}"
              </span>
              <span className="text-pretty text-[11px] font-medium text-[#0B211B]/45">
                Try a different word or clear the category
              </span>
              <motion.button
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={onReset}
                className="mt-1 rounded-full bg-emerald-500/10 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.1em] text-emerald-700"
              >
                Reset search
              </motion.button>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <ServiceRow
              key={item.service.id}
              service={item.service}
              icon={item.icon}
              tone={item.tone}
              onPress={() => onPress(item)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
