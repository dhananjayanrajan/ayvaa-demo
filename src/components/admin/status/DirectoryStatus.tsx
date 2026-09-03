import { Chip } from '@/components/phone/kit'

export function DirectoryStatus() {
  return (
    <div className="mt-4 flex flex-wrap gap-1.5">
      <Chip intent="danger" light dot>1 flagged</Chip>
      <Chip intent="warning" light>3 reviews pending</Chip>
    </div>
  )
}
