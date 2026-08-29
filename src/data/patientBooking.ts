import type { LucideIcon } from 'lucide-react'
import {
  Accessibility,
  Baby,
  Clock,
  HeartHandshake,
  HeartPulse,
  MoonStar,
  Sun,
  Sunrise,
  Users,
} from 'lucide-react'
import { lovedOnes } from '@/data/seed'

export type BookingCategory = { label: string; icon: LucideIcon; hint: string }

export const bookingCategories: BookingCategory[] = [
  { label: 'Elderly care', icon: Users, hint: 'Daily living, mobility and company' },
  { label: 'Post-operative', icon: HeartPulse, hint: 'Recovery support after surgery' },
  { label: 'Pediatric', icon: Baby, hint: 'Child care trained' },
  { label: 'Chronic care', icon: Clock, hint: 'Diabetes, BP and long-term' },
  { label: 'Palliative', icon: HeartHandshake, hint: 'Comfort-focused care' },
  { label: 'Disability', icon: Accessibility, hint: 'Mobility and independence' },
]

export type ScheduleType = { id: string; label: string; sub: string }

export const scheduleTypes: ScheduleType[] = [
  { id: 'one', label: 'One time', sub: 'Single visit, no series' },
  { id: 'recurring', label: 'Recurring', sub: 'Weekly series, auto-scheduled' },
  { id: 'ongoing', label: 'Ongoing', sub: 'Open-ended, billed monthly' },
]

export const dayOptions = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export type TimeWindow = { id: string; label: string; time: string; icon: LucideIcon }

export const timeWindows: TimeWindow[] = [
  { id: 'morning', label: 'Morning', time: '8 AM – 11 AM', icon: Sunrise },
  { id: 'afternoon', label: 'Afternoon', time: '2 PM – 5 PM', icon: Sun },
  { id: 'evening', label: 'Evening', time: '5 PM – 8 PM', icon: MoonStar },
]

export type DurationOption = { id: string; label: string; price: number }

export const durations: DurationOption[] = [
  { id: '60', label: '1 hour', price: 700 },
  { id: '120', label: '2 hours', price: 1240 },
  { id: '180', label: '3 hours', price: 1740 },
]

export const wizardSteps = ['Details', 'Matching', 'Confirm']

export function fmtINR(n: number): string {
  return `₹${n.toLocaleString('en-IN')}`
}

export type Estimate = {
  visitCount: number
  weekly: number
  hours: number
  perVisit: number
}

export function buildEstimate(
  schedule: string,
  days: string[],
  durationId: string,
): Estimate {
  const dur = durations.find((d) => d.id === durationId) ?? durations[0]
  const visitCount = schedule === 'one' ? 1 : Math.max(days.length, 1)
  return {
    visitCount,
    weekly: dur.price * visitCount,
    hours: visitCount * (Number(durationId) / 60),
    perVisit: dur.price,
  }
}

export function daysSummary(days: string[]): string {
  return days.length > 0 ? days.join(', ') : 'No days picked yet'
}

export function bookingSummaryLine(
  lovedName: string,
  category: string,
  estimate: Estimate,
  durationLabel: string,
  schedule: string,
): string {
  const visits = `${estimate.visitCount} ${estimate.visitCount === 1 ? 'visit' : 'visits'} of ${durationLabel}`
  const cadence = schedule === 'one' ? '' : ' each week'
  return `${visits}${cadence} for ${lovedName}, ${category}`
}

export function lovedOnesList() {
  return lovedOnes
}
