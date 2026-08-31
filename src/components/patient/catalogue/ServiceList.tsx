import { Search, SlidersHorizontal } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { TileTone } from '@/components/phone/kit'
import { EmptyState } from '@/components/phone/EmptyState'
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
        <EmptyState
          container="bare"
          spacing="gap"
          gap="sm"
          padding="sm"
          icon={filteredOut ? SlidersHorizontal : Search}
          tone="emerald"
          badge="soft"
          size="sm"
          title={filteredOut ? 'Your filters hide every service' : `Nothing matches "${query}"`}
          titleClassName="text-[13px] tracking-tight text-[#0B211B]/70"
          body={
            filteredOut
              ? 'The budget cap or another preference excludes this category. Loosen a filter to see more care.'
              : 'Try a different word or clear the category'
          }
          bodyClassName="text-[11px] leading-snug text-[#0B211B]/45"
          action={
            filteredOut
              ? { label: 'Clear all filters', onClick: onClearFilters }
              : { label: 'Reset search', onClick: onReset }
          }
          actionStyle="pill"
        />
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
