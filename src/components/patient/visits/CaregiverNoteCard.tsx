import { Quote } from 'lucide-react'
import { Card } from '@/components/phone/kit'
import { QuotePanel } from '@/components/phone/QuotePanel'
import { initialsOf } from '@/data/patientMatching'
import { VISIT_SUMMARY } from '@/data/patientVisitSummary'

export function CaregiverNoteCard() {
  return (
    <Card>
      <div className="p-5">
        <QuotePanel
          kicker="Verbatim"
          kickerIcon={Quote}
          quote={VISIT_SUMMARY.note}
          author={`${VISIT_SUMMARY.caregiver}, caregiver`}
          authorInitial={initialsOf(VISIT_SUMMARY.caregiver)}
        />
      </div>
    </Card>
  )
}
