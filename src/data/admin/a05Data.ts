import { auditEntries as seedEntries } from '@/data/seed'

export const ranges = [
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This week' },
  { id: 'custom', label: 'Custom' },
]

export const PAGE_SIZE = 4
export const auditEntries = seedEntries
