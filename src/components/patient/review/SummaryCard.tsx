import { Card } from '@/components/phone/kit'
import { FactRows } from '@/components/patient/plan/FactRows'
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
