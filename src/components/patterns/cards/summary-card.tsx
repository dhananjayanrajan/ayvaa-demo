import { Card } from '@/components/base/phone/kit'
import { FactRows } from '@/components/base/phone/fact-rows'
import { bookingRows } from '@/data/patientReview'

export function SummaryCard() {
  return (
    <Card>
      <div className="p-5">
        <FactRows rows={bookingRows()} tone="light" />
      </div>
    </Card>
  )
}
