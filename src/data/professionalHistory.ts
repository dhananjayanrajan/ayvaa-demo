export type PastSession = {
  id: string
  date: string
  patient: string
  detail: string
  amount: string
  note?: string
  incident?: string
}

export const pastSessions: PastSession[] = [
  {
    id: 'ps1',
    date: 'Wednesday, March 13 · 2:00 PM',
    patient: 'Ramesh Sharma',
    detail: 'All 5 steps · vitals 128/76 · Amlodipine verified',
    amount: '₹4,800',
    note: 'Walked the full fifteen minutes without the rail. Appetite good. Slight stiffness in the left knee, worth watching Friday.',
  },
  {
    id: 'ps2',
    date: 'Monday, March 11 · 2:00 PM',
    patient: 'Ramesh Sharma',
    detail: 'All 5 steps · vitals logged · note written',
    amount: '₹4,800',
  },
  {
    id: 'ps3',
    date: 'Friday, March 8 · 2:00 PM',
    patient: 'Ramesh Sharma',
    detail: 'All 5 steps · rug trip hazard removed',
    amount: '₹4,800',
    incident: '1 minor incident · resolved same visit',
  },
]
