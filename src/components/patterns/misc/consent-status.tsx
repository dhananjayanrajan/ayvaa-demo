import { Chip } from '@/components/base/phone/kit'

export function ConsentStatus() {
  return (
    <div className="mt-4 flex flex-wrap gap-1.5">
      <Chip intent="neutral" light>Auto reminders on</Chip>
      <Chip intent="success" light>Ledger sealed</Chip>
    </div>
  )
}
