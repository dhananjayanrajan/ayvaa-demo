import { SegmentedTabs } from '@/components/phone/SegmentedTabs'
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
