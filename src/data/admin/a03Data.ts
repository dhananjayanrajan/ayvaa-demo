import { approvals as seedApprovals } from '@/data/seed'
import type { Approval } from '@/data/types'

export const approvals: Approval[] = seedApprovals
export const a03FilterTabs = [
  { id: 'awaiting', label: 'Awaiting' },
  { id: 'approved', label: 'Approved' },
  { id: 'rejected', label: 'Rejected' },
]
