import { SegmentedTabs } from '@/components/base/phone/segmented-tabs'
import type { ComponentProps } from 'react'
import { a03FilterTabs } from '@/data/admin/a03Data'
import { ranges } from '@/data/admin/a05Data'

type SegmentedFilterProps = {
  tabs: ComponentProps<typeof SegmentedTabs>['tabs']
  value: string
  onChange: (value: string) => void
  layoutId: string
}

function SegmentedFilter({ tabs, value, onChange, layoutId }: SegmentedFilterProps) {
  return <SegmentedTabs tabs={tabs} value={value} onChange={onChange} layoutId={layoutId} />
}

export function ApprovalsFilter({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <SegmentedFilter tabs={a03FilterTabs} value={value} onChange={onChange} layoutId="filter-bar" />
}

export function LedgerRangeFilter({ value, onChange, onResetPage }: {
  value: string
  onChange: (v: string) => void
  onResetPage: () => void
}) {
  return (
    <SegmentedFilter
      tabs={ranges}
      value={value}
      onChange={(next) => {
        onChange(next)
        onResetPage()
      }}
      layoutId="a05-range"
    />
  )
}
