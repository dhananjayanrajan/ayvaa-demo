import type { LucideIcon } from 'lucide-react'
import { ArrowRight, CheckCircle2, Clock, Hourglass, FileCheck2, Lock, RefreshCw, Users } from 'lucide-react'

export const PROFILE = {
  name: 'Rani Deshmukh',
  firstName: 'Rani',
  role: 'Certified elderly-care nurse',
  years: 12,
  rating: 4.9,
  visits: 70,
  onTime: '100%',
  licenceId: 'KNC-RN-4471',
  responseTime: 'Under 10 minutes',
}

export interface Credential {
  id: string
  title: string
  summary: string
  status: string
  details: { label: string; value: string }[]
}

export const CREDENTIALS: Credential[] = [
  {
    id: 'rn-licence',
    title: 'Registered Nurse licence',
    summary: 'Karnataka Nursing Council registration',
    status: 'Valid',
    details: [
      { label: 'Registration no.', value: 'KNC-RN-4471' },
      { label: 'Issued by', value: 'Karnataka Nursing Council' },
      { label: 'Valid through', value: 'March 2026' },
      { label: 'Verified by', value: 'Ayvaa credential desk' },
      { label: 'Verified on', value: '12 Jan 2024' },
    ],
  },
  {
    id: 'background',
    title: 'Background screening',
    summary: 'Police verification and reference checks',
    status: 'Cleared',
    details: [
      { label: 'Police verification', value: 'Cleared' },
      { label: 'Completed on', value: '8 Nov 2023' },
      { label: 'References contacted', value: '2 of 2' },
      { label: 'Verified by', value: 'Ayvaa trust and safety' },
    ],
  },
  {
    id: 'first-aid',
    title: 'Advanced first aid',
    summary: 'Renewed advanced certification',
    status: 'Renewed',
    details: [
      { label: 'Certificate no.', value: 'FA-ADV-90218' },
      { label: 'Provider', value: 'Indian Red Cross Society' },
      { label: 'Renewed on', value: '18 Jan 2024' },
      { label: 'Next renewal', value: 'January 2026' },
    ],
  },
]

export interface Review {
  id: string
  rating: number
  month: string
  year: string
  family: string
  context: string
  quote: string
}

export const REVIEWS: Review[] = [
  {
    id: 'rev-iyer',
    rating: 5.0,
    month: 'Feb',
    year: '2024',
    family: 'Iyer family',
    context: 'Post-operative care',
    quote:
      'Cared for my mother for four months. Punctual every single day, and her daily notes helped her doctors a lot.',
  },
  {
    id: 'rev-rao',
    rating: 4.9,
    month: 'Dec',
    year: '2023',
    family: 'Rao family',
    context: 'Elderly care',
    quote:
      'She noticed the early signs of an infection from small changes in appetite and flagged it before it became serious. We trust her completely.',
  },
]

export interface HistoryEntry {
  id: string
  category: string
  cadence: string
  sessions: number
  icon: LucideIcon
}

export const CARE_HISTORY: HistoryEntry[] = [
  { id: 'hist-elderly', category: 'Elderly care', cadence: 'Recurring weekly visits', sessions: 41, icon: Users },
  { id: 'hist-postop', category: 'Post-operative recovery', cadence: 'Daily visits over 6 weeks', sessions: 29, icon: FileCheck2 },
]

export const totalSessions = (): number => CARE_HISTORY.reduce((sum, entry) => sum + entry.sessions, 0)

export const sessionsShare = (sessions: number, total: number): number => (total > 0 ? sessions / total : 0)

export interface PathItem {
  icon: LucideIcon
  text: string
}

export const offerPathItems = (offer: 'none' | 'pending' | 'accepted'): PathItem[] => {
  const first = PROFILE.firstName
  if (offer === 'accepted') {
    return [
      { icon: CheckCircle2, text: `Offer delivered — ${first} has your booking details` },
      { icon: CheckCircle2, text: `She responded and the offer is accepted` },
      { icon: CheckCircle2, text: 'Availability re-check passed at acceptance' },
      { icon: ArrowRight, text: 'Continue to review to confirm the series' },
    ]
  }
  if (offer === 'pending') {
    return [
      { icon: CheckCircle2, text: `Offer delivered — ${first} has your booking details` },
      { icon: Hourglass, text: 'Waiting for her response, tracked live' },
      { icon: RefreshCw, text: 'Availability is re-checked the moment she accepts' },
      { icon: Lock, text: 'Her acceptance unlocks the review step' },
    ]
  }
  return [
    { icon: Clock, text: `Your offer reaches ${first} with the booking details` },
    { icon: Hourglass, text: `She usually responds within minutes` },
    { icon: RefreshCw, text: 'Availability is re-checked on acceptance' },
    { icon: Lock, text: 'Her acceptance unlocks the review step' },
  ]
}
