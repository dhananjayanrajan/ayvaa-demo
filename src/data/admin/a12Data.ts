export type DocumentDetail = { label: string; value: string }
export type Document = { id: string; name: string; type: string; size: string; status: 'verified' | 'pending'; details: DocumentDetail[] }
export type CheckItem = { id: string; label: string; status: 'ok' | 'running' | 'pending'; sub: string }

export const application = {
  id: 'APP-20250315-04',
  name: 'Lakshmi Reddy',
  role: 'Registered Nurse',
  licence: 'RN-KA-2241',
  experience: '5 years',
  applied: 'Mar 14, 2025',
  initials: 'LR',
}

export const documents: Document[] = [
  { id: 'doc1', name: 'Nursing degree certificate', type: 'PDF', size: '1.2 MB', status: 'verified', details: [{ label: 'Institution', value: 'Rajiv Gandhi University' }, { label: 'Degree', value: 'Bachelor of Science in Nursing' }, { label: 'Graduated', value: '2019' }] },
  { id: 'doc2', name: 'Karnataka Nursing Council licence', type: 'PDF', size: '0.8 MB', status: 'verified', details: [{ label: 'Licence number', value: 'RN-KA-2241' }, { label: 'Valid until', value: 'March 2027' }] },
  { id: 'doc3', name: 'Background check consent form', type: 'PDF', size: '0.4 MB', status: 'pending', details: [{ label: 'Agency', value: 'Third-party screening' }, { label: 'Expected', value: 'Within 24 hours' }] },
]

export const checks: CheckItem[] = [
  { id: 'chk1', label: 'Identity verification', status: 'ok', sub: 'Aadhaar matched with selfie' },
  { id: 'chk2', label: 'Licence verification', status: 'ok', sub: 'Confirmed with state council' },
  { id: 'chk3', label: 'Background check', status: 'running', sub: 'Third-party screening in progress' },
  { id: 'chk4', label: 'Experience verification', status: 'pending', sub: 'Awaiting employer response' },
]

export const TONE = {
  pending: { hero: 'amber' as const, pill: 'amber' as const, meterIntent: 'warning' as const },
  approved: { hero: 'emerald' as const, pill: 'emerald' as const, meterIntent: 'success' as const },
  rejected: { hero: 'rose' as const, pill: 'rose' as const, meterIntent: 'danger' as const },
}
