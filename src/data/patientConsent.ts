import type { LucideIcon } from 'lucide-react'
import { HeartHandshake, HeartPulse, Pill } from 'lucide-react'

export const CONSENT = {
  patientFirst: 'Raghav',
  patientName: 'Raghav Sharma',
  signed: '17 Mar 2026',
  reviewDue: '11 Apr 2026',
  cycleDays: 90,
  daysLeft: 23,
  version: 3,
}

export interface ConsentScope {
  id: string
  label: string
  detail: string
  icon: LucideIcon
}

export const SCOPES: ConsentScope[] = [
  {
    id: 'personal',
    label: 'Personal care',
    detail: 'Mobility, meals, hygiene and companionship during every visit',
    icon: HeartHandshake,
  },
  {
    id: 'meds',
    label: 'Medication management',
    detail: 'Nurse gives and records prescribed doses with three-point verification',
    icon: Pill,
  },
  {
    id: 'monitoring',
    label: 'Health monitoring',
    detail: 'Vitals logged each visit and shared with your care team',
    icon: HeartPulse,
  },
]

export const LOCATION_DEFAULT = true

export const WITHDRAW_CONSEQUENCES = [
  "Today's remaining visit is cancelled",
  'Caregivers lose all access within minutes',
  'A sealed withdrawal record enters the audit trail',
  'Records stay yours, nothing is deleted',
]

export const changeCountOf = (grantedIds: string[], location: boolean): number => {
  const revoked = SCOPES.filter((s) => !grantedIds.includes(s.id)).length
  const locationChanged = location !== LOCATION_DEFAULT ? 1 : 0
  return revoked + locationChanged
}
