export type UserStatus = 'active' | 'suspended'
export type MergeTarget = { id: string; name: string; email: string }

export const user = {
  id: 'USR-20240312-018',
  name: 'Priya Sharma',
  email: 'priya.sharma@example.com',
  phone: '+91 98450 12345',
  address: '42, Palm Grove Road, Indiranagar, Bengaluru',
  role: 'Guardian',
  joined: 'Mar 12, 2024',
  initials: 'PS',
  status: 'active' as UserStatus,
}

export const mergeTargets: MergeTarget[] = [
  { id: 'USR-20240108-003', name: 'Rahul Sharma', email: 'rahul.sharma@example.com' },
  { id: 'USR-20240219-011', name: 'Anita Sharma', email: 'anita.sharma@example.com' },
]

export const TONE = {
  active: { hero: 'emerald' as const, pill: 'emerald' as const, overline: 'text-emerald-200/60', subText: 'text-emerald-100/55', label: 'text-emerald-200/50', statusLabel: 'Active' },
  suspended: { hero: 'rose' as const, pill: 'rose' as const, overline: 'text-rose-200/60', subText: 'text-rose-100/55', label: 'text-rose-200/50', statusLabel: 'Suspended' },
}
