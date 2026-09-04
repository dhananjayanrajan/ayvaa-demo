import { SegmentedTabs } from '@/components/base/phone/segmented-tabs'
import { ranges } from '@/data/admin/a05Data'

type Props = {
  value: string
  onChange: (v: string) => void
  onResetPage: () => void
}

export function LedgerRangeFilter({ value, onChange, onResetPage }: Props) {
  return (
    <SegmentedTabs
      tabs={ranges}
      value={value}
      onChange={(r) => {
        onChange(r)
        onResetPage()
      }}
      layoutId="a05-range"
    />
  )
}
