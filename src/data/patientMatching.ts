export type OfferState = 'none' | 'pending' | 'accepted'

export interface MatchCaregiver {
  id: string
  name: string
  role: string
  rating: number
  years: number
  distanceKm: number
  languages: string[]
  licensed: boolean
}

export const MATCH_CAREGIVERS: MatchCaregiver[] = [
  { id: 'cg-rani', name: 'Rani Deshmukh', role: 'Certified elderly-care nurse', rating: 4.9, years: 12, distanceKm: 1.2, languages: ['Telugu', 'Hindi'], licensed: true },
  { id: 'cg-arif', name: 'Arif Khan', role: 'Post-operative care attendant', rating: 4.7, years: 7, distanceKm: 2.8, languages: ['Hindi', 'English'], licensed: true },
  { id: 'cg-meera', name: 'Meera Iyer', role: 'Physiotherapy assistant', rating: 4.8, years: 9, distanceKm: 3.6, languages: ['English'], licensed: true },
]

export const LANGUAGE_OPTIONS = ['Any language', 'Telugu', 'Hindi', 'English', 'Malayalam']

export const MATCH_REQUEST = {
  cadence: 'Weekly',
  visits: '6 per week',
  price: '₹4,200',
  radius: '5 km',
}

export const initialsOf = (name: string): string =>
  name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

export const filterByLanguage = (list: MatchCaregiver[], language: string): MatchCaregiver[] =>
  language === 'Any language' ? list : list.filter((c) => c.languages.includes(language))

const rankOf = (state: OfferState | undefined): number =>
  state === 'accepted' ? 0 : state === 'pending' ? 1 : 2

export const sortMatches = (list: MatchCaregiver[], offers: Record<string, OfferState>): MatchCaregiver[] =>
  [...list].sort((a, b) => rankOf(offers[a.id]) - rankOf(offers[b.id]) || b.rating - a.rating)

export const offerSummary = (offers: Record<string, OfferState>, total: number) => {
  const values = Object.values(offers)
  const sent = values.filter((s) => s !== 'none').length
  const accepted = values.filter((s) => s === 'accepted').length
  return {
    sent,
    accepted,
    matched: accepted > 0,
    ratio: accepted > 0 ? 1 : total > 0 ? sent / total : 0,
  }
}

export const speakersIn = (list: MatchCaregiver[], language: string): number =>
  language === 'Any language' ? list.length : list.filter((c) => c.languages.includes(language)).length
