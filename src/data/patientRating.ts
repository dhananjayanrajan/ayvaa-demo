export const RATED_VISIT = {
  patientFirst: 'Raghav',
  dateLabel: 'Wednesday, March 13',
  caregiver: { name: 'Lakshmi Reddy', first: 'Lakshmi', initial: 'L', role: 'Certified elderly-care nurse' },
  checkInAt: '2:02 PM',
  signOffAt: '4:30 PM',
  stepsSealed: 5,
  goalsMet: 3,
}

export const RATING_LABELS = ['Poor', 'Fair', 'Good', 'Great', 'Excellent']

export const ratingLabel = (stars: number): string => RATING_LABELS[stars - 1]

export const HIGHLIGHT_TAGS = [
  'Punctual',
  'Kind manner',
  'Clear notes',
  'Careful with dad',
  'Explained everything',
]

export interface FeedbackRow {
  label: string
  value: string
}

export const buildFeedbackRows = (stars: number, highlightCount: number, note: string): FeedbackRow[] => [
  { label: 'Rating', value: `${stars} of 5` },
  { label: 'Highlights', value: `${highlightCount}` },
  { label: 'Note', value: note.trim().length > 0 ? 'Added' : 'Not added' },
  { label: 'Visible to', value: 'Quality team' },
]
