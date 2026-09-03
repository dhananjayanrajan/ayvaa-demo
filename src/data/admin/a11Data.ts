export type Investigator = {
  id: string
  name: string
  role: string
  expertise: string
  activeCases: number
  availability: string
}

export const investigators: Investigator[] = [
  { id: 'inv1', name: 'Dr. Ananya Rao', role: 'Senior supervisor', expertise: 'Medication incidents', activeCases: 2, availability: 'Available now' },
  { id: 'inv2', name: 'Meera Nair', role: 'Clinical lead', expertise: 'Fall risk, mobility', activeCases: 4, availability: 'In 30 mins' },
  { id: 'inv3', name: 'Kavya Menon', role: 'Care team lead', expertise: 'Caregiver conduct', activeCases: 1, availability: 'Available now' },
]

export const a11IncidentFallback = {
  id: 'INC-20250315-01',
  title: 'Near fall during transfer',
  severity: 'Critical',
  patient: 'Mrs. Iyer',
  location: 'Ward B',
  raised: '9:40 AM',
  by: 'Caregiver Lakshmi',
  summary: 'Patient lost balance while moving from bed to chair. Caregiver prevented a fall but patient complained of dizziness.',
  tags: ['Fall risk', 'Dizziness', 'Transfer'],
}
