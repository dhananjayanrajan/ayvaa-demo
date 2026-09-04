import type { LucideIcon } from 'lucide-react'
import {
  Accessibility,
  Activity,
  Baby,
  Brain,
  Flower2,
  HeartHandshake,
  Sparkles,
  Stethoscope,
} from 'lucide-react'
import type { TileTone } from '@/components/base/phone/kit'
import { services, type Service } from '@/data/services'

export function iconFor(s: Service): LucideIcon {
  if (s.name.startsWith('Certified')) return Stethoscope
  if (s.name.startsWith('Post-operative')) return HeartHandshake
  if (s.name.startsWith('Physio')) return Activity
  if (s.name.startsWith('Pediatric')) return Baby
  if (s.name.startsWith('Chronic')) return Brain
  if (s.name.startsWith('Palliative')) return Flower2
  if (s.name.startsWith('Disability')) return Accessibility
  if (s.name.startsWith('Special')) return Sparkles
  return HeartHandshake
}

export function toneFor(s: Service): TileTone {
  if (s.name.startsWith('Chronic')) return 'warning'
  if (s.name.startsWith('Palliative')) return 'warning'
  if (s.name.startsWith('Physio')) return 'info'
  if (s.name.startsWith('Pediatric')) return 'info'
  return 'success'
}

export function parseFromPrice(from: string): number {
  return Number(from.replace(/[^\d]/g, ''))
}

export const BUDGET_LIMIT = 1000

export type CategoryChip = { label: string; count: number }

export function buildCategoryChips(): CategoryChip[] {
  const chips: CategoryChip[] = [{ label: 'All services', count: services.length }]
  const seen = new Set<string>()
  for (const s of services) {
    if (seen.has(s.category)) continue
    seen.add(s.category)
    chips.push({ label: s.category, count: services.filter((x) => x.category === s.category).length })
  }
  return chips
}

export type FilterKey = 'nearFirst' | 'budget' | 'femalePref'

export type FilterDef = {
  key: FilterKey
  label: string
  sub: string
}

export const filterDefs: FilterDef[] = [
  {
    key: 'nearFirst',
    label: 'Nearest caregivers first',
    sub: 'Sorted by distance from the care address',
  },
  {
    key: 'budget',
    label: 'Budget under ₹1,000 per visit',
    sub: 'Only services starting below this',
  },
  {
    key: 'femalePref',
    label: 'Prefer female caregivers',
    sub: 'Applied when offers go out, never guaranteed',
  },
]

export const nearbyByService = 14

export const sheetFacts = [
  { label: 'First visit', value: 'Includes assessment' },
  { label: 'Cancellation', value: 'Free till 24 h' },
]

export function factNearby(count: number): { label: string; value: string } {
  return { label: 'Caregivers nearby', value: `${count} available` }
}
