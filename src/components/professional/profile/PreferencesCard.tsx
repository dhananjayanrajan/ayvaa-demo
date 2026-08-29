import { CalendarDays, Landmark } from 'lucide-react'
import { Card } from '@/components/phone/kit'
import { PreferenceRow } from './PreferenceRow'

type Props = {
  openDays: number
  firstOpenDay: string | null
  firstOpenHours: string | null
  bankName: string
  bankLast4: string
  onPressAvailability: () => void
  onPressPayout: () => void
}

export function PreferencesCard({
  openDays,
  firstOpenDay,
  firstOpenHours,
  bankName,
  bankLast4,
  onPressAvailability,
  onPressPayout,
}: Props) {
  return (
    <Card>
      <div className="flex flex-col gap-1 p-3">
        <PreferenceRow
          icon={CalendarDays}
          tone="info"
          title="Availability"
          metaLabel={`${openDays} days open`}
          metaValue={firstOpenDay ? `${firstOpenDay}, ${firstOpenHours}` : 'No days open'}
          onPress={onPressAvailability}
        />
        <PreferenceRow
          icon={Landmark}
          tone="neutral"
          title="Payout account"
          metaLabel="Default"
          metaValue={`${bankName}, ${bankLast4}`}
          onPress={onPressPayout}
        />
      </div>
    </Card>
  )
}
