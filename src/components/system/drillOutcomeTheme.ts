import type { Intent, TileTone } from '@/components/phone/kit'
import type { DrillOutcome } from '@/data/systemTransactions'

export type OutcomeTheme = {
  intent: Intent
  tile: TileTone
  chipLabel: string
  title: string
  body: string
  detail: string
}

export const OUTCOME_THEMES: Record<DrillOutcome, OutcomeTheme> = {
  committed: {
    intent: 'success',
    tile: 'success',
    chipLabel: 'Committed',
    title: 'Transaction committed',
    body: 'All four writes sealed in 94 ms. Dispatch offers went out to five licensed nurses.',
    detail: 'Booking, series, sessions and audit sealed as one record.',
  },
  'rolled-back': {
    intent: 'danger',
    tile: 'danger',
    chipLabel: 'Rolled back',
    title: 'Transaction rolled back',
    body: 'The armed write failed and every completed write unwound in reverse. Nothing was written.',
    detail: 'The attempt itself is sealed in the audit log forever.',
  },
  'dispatch-failed': {
    intent: 'warning',
    tile: 'warning',
    chipLabel: 'Dispatch failed',
    title: 'Committed · dispatch failed',
    body: 'The transaction sealed, but offer delivery failed and is climbing its retry ladder.',
    detail: 'The booking was never at risk. Only delivery retries.',
  },
}
