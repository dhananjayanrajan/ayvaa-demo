import { CheckCircle2, SlidersHorizontal } from 'lucide-react'
import { EmptyState } from '@/components/base/phone/empty-state'

interface EmptyTabStateProps {
  cause: 'filters' | 'all-good'
  label: string
  onClearFilters: () => void
}

export function EmptyTabState({ cause, label, onClearFilters }: EmptyTabStateProps) {
  if (cause === 'all-good') {
    return (
      <EmptyState
        container="card"
        spacing="margin"
        padding="md"
        icon={CheckCircle2}
        tone="emerald"
        badge="square"
        size="sm"
        title="Nothing here, and that is good"
        titleClassName="text-[14px] font-extrabold tracking-tight text-[#0B211B]"
        body="No visits were ever missed on this plan. Every scheduled session has been delivered."
        bodyClassName="text-[12px] leading-snug text-[#0B211B]/55 mx-auto max-w-[28ch] text-pretty"
      />
    )
  }

  return (
    <EmptyState
      container="card"
      spacing="margin"
      padding="md"
      icon={SlidersHorizontal}
      tone="neutral"
      badge="square"
      size="sm"
      title={`Your filters hide every ${label}`}
      titleClassName="text-[14px] font-extrabold tracking-tight text-[#0B211B]"
      body="Visits are excluded by the active filters. Clear them to see the full ledger."
      bodyClassName="text-[12px] leading-snug text-[#0B211B]/55 mx-auto max-w-[28ch] text-pretty"
      action={{ label: 'Clear filters', onClick: onClearFilters }}
      actionStyle="full"
    />
  )
}
