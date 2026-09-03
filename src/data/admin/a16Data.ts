import type { LucideIcon } from 'lucide-react'
import { FileText, Scale, ShieldCheck, ShieldAlert, Unlock } from 'lucide-react'

export type RecordType = {
  id: string
  label: string
  icon: LucideIcon
  years: number
  records: number
  lastEdited: string
  nextPurge: string
  purgeCount: number
}

export type LegalHold = {
  id: string
  patient: string
  initials: string
  caseRef: string
  reason: string
  placedOn: string
  status: 'active' | 'lifted'
}

export type AuditEvent = {
  id: string
  action: string
  actor: string
  when: string
  icon: LucideIcon
}

export const INITIAL_POLICY: RecordType = {
  id: 'session-notes',
  label: 'Clinical session notes',
  icon: FileText,
  years: 7,
  records: 14208,
  lastEdited: '12 days ago',
  nextPurge: '23 days',
  purgeCount: 842,
}

export const INITIAL_HOLDS: LegalHold[] = [
  { id: 'h1', patient: 'Ramesh Rao', initials: 'RR', caseRef: 'LGL-2026-041', reason: 'Pending litigation review with external counsel regarding treatment protocol dispute.', placedOn: 'Mar 02, 2026', status: 'active' },
  { id: 'h2', patient: 'Shanta Iyer', initials: 'SI', caseRef: 'LGL-2026-038', reason: 'Insurance claim dispute awaiting adjudication from Star Health.', placedOn: 'Feb 18, 2026', status: 'active' },
  { id: 'h3', patient: 'Arjun Deshmukh', initials: 'AD', caseRef: 'LGL-2026-022', reason: 'Regulatory audit request from state medical board.', placedOn: 'Jan 10, 2026', status: 'lifted' },
]

export const AUDIT_EVENTS: AuditEvent[] = [
  { id: 'e1', action: 'Policy sealed after edit', actor: 'Priya Menon', when: '2 hours ago', icon: ShieldCheck },
  { id: 'e2', action: 'Legal hold lifted', actor: 'Ravi Shankar', when: 'Yesterday', icon: Unlock },
  { id: 'e3', action: 'Retention updated to 7 yrs', actor: 'Priya Menon', when: '3 days ago', icon: Scale },
  { id: 'e4', action: 'Legal hold placed', actor: 'Admin System', when: '5 days ago', icon: ShieldAlert },
]

export const PATIENTS = [
  { name: 'Mr. Ramesh Rao', initials: 'RR', age: 68, ward: 'Cardiology' },
  { name: 'Mrs. Shanta Iyer', initials: 'SI', age: 74, ward: 'Geriatrics' },
  { name: 'Lakshmi Narayan', initials: 'LN', age: 82, ward: 'Neurology' },
  { name: 'Kavya Reddy', initials: 'KR', age: 59, ward: 'Oncology' },
]

export const PRESETS = [1, 3, 5, 7, 10, 15] as const
