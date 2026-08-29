import type { LucideIcon } from 'lucide-react'
import { Folder, Pill, Plus, Siren } from 'lucide-react'
import { carePlan, lovedOnes, visits } from '@/data/seed'

export type QuickAction = {
  key: string
  label: string
  sub: string
  icon: LucideIcon
  to: string
  tileClass: string
  glow: string
  tileBg: string
  labelClass: string
  subClass: string
}

export const quickActions: QuickAction[] = [
  {
    key: 'book',
    label: 'Book care',
    sub: 'New request',
    icon: Plus,
    to: '/patient/p09',
    tileClass: 'bg-gradient-to-br from-emerald-500 to-teal-500',
    glow: 'shadow-[0_10px_20px_-10px_rgba(16,185,129,0.8)]',
    tileBg: 'bg-emerald-500/[0.06] hover:bg-emerald-500/[0.1]',
    labelClass: 'text-[#0B211B]',
    subClass: 'text-emerald-700/70',
  },
  {
    key: 'medicine',
    label: 'Medicine',
    sub: 'Doses and refills',
    icon: Pill,
    to: '/patient/p19',
    tileClass: 'bg-gradient-to-br from-amber-400 to-orange-400',
    glow: 'shadow-[0_10px_20px_-10px_rgba(251,191,36,0.8)]',
    tileBg: 'bg-amber-500/[0.07] hover:bg-amber-500/[0.11]',
    labelClass: 'text-[#0B211B]',
    subClass: 'text-amber-700/80',
  },
  {
    key: 'records',
    label: 'Records',
    sub: 'Sealed documents',
    icon: Folder,
    to: '/patient/p21',
    tileClass: 'bg-gradient-to-br from-teal-500 to-emerald-400',
    glow: 'shadow-[0_10px_20px_-10px_rgba(45,212,191,0.7)]',
    tileBg: 'bg-teal-500/[0.07] hover:bg-teal-500/[0.11]',
    labelClass: 'text-[#0B211B]',
    subClass: 'text-teal-700/80',
  },
  {
    key: 'emergency',
    label: 'Emergency',
    sub: 'Immediate help',
    icon: Siren,
    to: '/patient/p32',
    tileClass: 'bg-gradient-to-br from-rose-500 to-red-500',
    glow: 'shadow-[0_10px_20px_-10px_rgba(244,63,94,0.8)]',
    tileBg: 'bg-rose-500/[0.07] hover:bg-rose-500/[0.11]',
    labelClass: 'text-rose-600',
    subClass: 'text-rose-600/70',
  },
]

export type LiveStep = { key: string; label: string; state: 'done' | 'active' | 'todo' }

export const liveSteps: LiveStep[] = [
  { key: 'arrival', label: 'Arrival', state: 'done' },
  { key: 'vitals', label: 'Vitals', state: 'done' },
  { key: 'mobility', label: 'Mobility', state: 'done' },
  { key: 'meds', label: 'Meds', state: 'active' },
  { key: 'signoff', label: 'Sign-off', state: 'todo' },
]

export type DoseRound = { key: string; slot: string; time: string; given: boolean }

export const doseRounds: DoseRound[] = [
  { key: 'morning', slot: 'Morning', time: '8:10 AM', given: true },
  { key: 'afternoon', slot: 'Afternoon', time: '2:15 PM', given: true },
  { key: 'evening', slot: 'Evening', time: '6:00 PM', given: false },
]

export type VisitRow = {
  id: string
  title: string
  detail: string
  waiting: boolean
}

export type DashboardFacts = {
  lovedFirstName: string
  caregiverFirstName: string
  caregiverFullName: string
  planCategory: string
  upcoming: VisitRow[]
}

export function buildDashboardFacts(): DashboardFacts {
  const father = lovedOnes[0]
  const live = visits.find((v) => v.status === 'live') ?? visits[0]
  const caregiverFullName = live.caregiver ?? carePlan.caregiver.split(' · ')[0]
  const upcoming = visits
    .filter((v) => v.status === 'confirmed' || v.status === 'pending')
    .map((v) => ({
      id: v.id,
      title: `${v.day}, ${v.date}`,
      detail: v.caregiver ? `${v.caregiver} at ${v.time}` : 'Awaiting caregiver, offer out',
      waiting: v.status !== 'confirmed',
    }))
  return {
    lovedFirstName: father.name.split(' ')[0],
    caregiverFirstName: caregiverFullName.split(' ')[0],
    caregiverFullName,
    planCategory: carePlan.category.toLowerCase(),
    upcoming,
  }
}
