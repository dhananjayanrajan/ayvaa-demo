import { BadgeCheck, Clock3, Star, FileCheck2, type LucideIcon } from 'lucide-react'
import { professional } from '@/data/seed'

export const initialsOf = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)

export type PublicFact = {
  key: string
  value: string
  detail: string
  icon: LucideIcon
}

export const PUBLIC_FACTS: PublicFact[] = [
  {
    key: 'Licence',
    value: 'Registered Nurse',
    detail: 'Verified by Ayvaa, valid to March 2027',
    icon: BadgeCheck,
  },
  {
    key: 'Experience',
    value: `${professional.years} years`,
    detail: 'Clinical care across hospital and home settings',
    icon: Clock3,
  },
  {
    key: 'Rating',
    value: String(professional.rating),
    detail: `Across ${professional.visits} completed visits`,
    icon: Star,
  },
  {
    key: 'Background',
    value: 'Cleared',
    detail: 'Re-checked by Ayvaa every year',
    icon: FileCheck2,
  },
]
