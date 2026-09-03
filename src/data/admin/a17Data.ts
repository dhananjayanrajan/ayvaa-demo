export type Escalation = {
  id: string
  title: string
  raisedBy: string
  role: string
  time: string
  priority: 'P1' | 'P2' | 'P3'
  status: 'open' | 'assigned' | 'resolved'
  description: string
  assignee?: string
}

export const ESCALATIONS: Escalation[] = [
  { id: 'esc-041', title: 'Medication delay — insulin not administered', raisedBy: 'Lakshmi Reddy', role: 'RN', time: '2 hours ago', priority: 'P1', status: 'open', description: 'Insulin dose scheduled 08:00 not recorded. Patient glucose 210 mg/dL.' },
  { id: 'esc-039', title: 'Family consent unclear for wound care', raisedBy: 'Priya Sharma', role: 'Guardian', time: 'Yesterday', priority: 'P2', status: 'assigned', assignee: 'Dr. Ananya Rao', description: 'Guardian questions scope of wound care provision.' },
  { id: 'esc-036', title: 'Equipment malfunction — BP monitor', raisedBy: 'System', role: 'Automated', time: '3 days ago', priority: 'P3', status: 'resolved', description: 'Device calibration drift reported.' },
]

export const CONTACTS = [
  { name: 'Dr. Ananya Rao', role: 'Supervisor', phone: '+91 98765 43210' },
  { name: 'Ravi Shankar', role: 'Ops Lead', phone: '+91 98450 12345' },
]
