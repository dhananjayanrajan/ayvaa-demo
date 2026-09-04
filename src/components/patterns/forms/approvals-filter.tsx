import { SegmentedTabs } from '@/components/base/phone/segmented-tabs'
import { a03FilterTabs } from '@/data/admin/a03Data'

type Props = {
  value: string
  onChange: (v: string) => void
}

export function ApprovalsFilter({ value, onChange }: Props) {
  return <SegmentedTabs tabs={a03FilterTabs} value={value} onChange={onChange} layoutId="filter-bar" />
}
