export type Service = {
  id: string
  name: string
  detail: string
  from: string
  category: 'Elderly' | 'Pediatric' | 'Post-operative' | 'Chronic' | 'Disability' | 'Palliative' | 'Special needs'
}

export const serviceCategories = [
  'All services',
  'Elderly',
  'Pediatric',
  'Post-operative',
  'Chronic',
  'Disability',
  'Palliative',
  'Special needs',
] as const

export const services: Service[] = [
  { id: 'sv1', name: 'Elderly home care', detail: 'Daily living, mobility and companionship', from: '₹4,000', category: 'Elderly' },
  { id: 'sv2', name: 'Certified nursing care', detail: 'Vitals, medication and wound management', from: '₹4,800', category: 'Elderly' },
  { id: 'sv3', name: 'Post-operative recovery', detail: 'Dressing changes and recovery assistance', from: '₹4,500', category: 'Post-operative' },
  { id: 'sv4', name: 'Physiotherapy at home', detail: 'Hospital-affiliated therapists', from: '₹5,500', category: 'Post-operative' },
  { id: 'sv5', name: 'Pediatric care', detail: 'Guardian-consented care for children', from: '₹4,200', category: 'Pediatric' },
  { id: 'sv6', name: 'Chronic care support', detail: 'Diabetes, cardiac and long-term conditions', from: '₹4,600', category: 'Chronic' },
  { id: 'sv7', name: 'Palliative support', detail: 'Comfort-focused specialist care', from: '₹6,000', category: 'Palliative' },
  { id: 'sv8', name: 'Disability and special needs care', detail: 'Trained support for daily independence', from: '₹5,000', category: 'Disability' },
  { id: 'sv9', name: 'Special needs care', detail: 'Patient, routine-centred specialist care', from: '₹5,200', category: 'Special needs' },
]

export const serviceIcons: Record<string, 'elderly' | 'nurse' | 'recovery' | 'physio' | 'child' | 'chronic' | 'palliative' | 'disability' | 'special'> = {
  sv1: 'elderly',
  sv2: 'nurse',
  sv3: 'recovery',
  sv4: 'physio',
  sv5: 'child',
  sv6: 'chronic',
  sv7: 'palliative',
  sv8: 'disability',
  sv9: 'special',
}
