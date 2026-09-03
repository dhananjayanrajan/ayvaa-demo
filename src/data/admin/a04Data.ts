import { flaggedAccount as seedFlagged, recentActivity as seedActivity } from '@/data/seed'

export const accountFilters = [
  { id: 'all', label: 'All' },
  { id: 'patients', label: 'Patients' },
  { id: 'pros', label: 'Pros' },
  { id: 'partners', label: 'Partners' },
]

export const filterRoleMap: Record<string, string[]> = {
  all: ['Partner', 'Guardian', 'RN'],
  patients: ['Guardian'],
  pros: ['RN'],
  partners: ['Partner'],
}

export const flaggedAccount = seedFlagged
export const recentActivity = seedActivity
