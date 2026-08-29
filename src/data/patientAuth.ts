import type { LucideIcon } from 'lucide-react'
import { CalendarDays, CheckCircle2, ReceiptText } from 'lucide-react'

export type DigestMarker = { kind: 'time'; value: string } | { kind: 'live' }

export type DigestFact = { label: string; value: string }

export type DigestEntry = {
  key: string
  icon: LucideIcon
  title: string
  detail: string
  summary: string
  tone: 'emerald' | 'teal' | 'inverse'
  marker: DigestMarker
  facts: DigestFact[]
  note: string
}

export const digestEntries: DigestEntry[] = [
  {
    key: 'visit-done',
    icon: CalendarDays,
    title: "Ramesh's visit completed",
    detail: 'Lakshmi sealed the note and vitals',
    summary:
      'The Tuesday 2:00 PM visit ran to plan. The checklist closed clean and both documents are sealed.',
    tone: 'emerald',
    marker: { kind: 'time', value: 'Tue' },
    facts: [
      { label: 'Caregiver', value: 'Lakshmi (HN)' },
      { label: 'Checklist', value: '7 of 7 tasks closed' },
      { label: 'Sealed', value: 'Visit note, vitals' },
    ],
    note: 'Everything recorded here is visible in Records under sealed visit notes',
  },
  {
    key: 'statement-paid',
    icon: ReceiptText,
    title: 'February statement paid',
    detail: '₹96,400, settled in full',
    summary:
      'The February billing cycle closed with no balance outstanding and a receipt filed to your records.',
    tone: 'teal',
    marker: { kind: 'time', value: 'Feb 28' },
    facts: [
      { label: 'Amount', value: '₹96,400' },
      { label: 'Method', value: 'HDFC ending 4821' },
      { label: 'Receipt', value: 'Filed to billing history' },
    ],
    note: 'The itemised receipt is downloadable from your billing history',
  },
  {
    key: 'next-visit',
    icon: CheckCircle2,
    title: 'Next visit Friday 9:00 AM',
    detail: 'Ramesh with Arjun (RN), confirmed by you',
    summary:
      'Arjun accepted the assignment and the availability re-check passed. The visit is locked in.',
    tone: 'inverse',
    marker: { kind: 'live' },
    facts: [
      { label: 'Caregiver', value: 'Arjun (RN)' },
      { label: 'Re-check', value: 'Passed on acceptance' },
      { label: 'Confirmed', value: 'By you, yesterday' },
    ],
    note: 'Live tracking opens on this visit from your dashboard on Friday',
  },
]

export const resetLinkValidity = '30 minutes, single use'

export function isSignInReady(password: string): boolean {
  return password.length >= 8
}
