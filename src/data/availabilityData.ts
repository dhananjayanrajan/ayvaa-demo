export type DayAvailability = {
  day: string
  hours: string
  off: boolean
}

export const WINDOWS: { label: string; time: string }[] = [
  { label: 'Morning', time: '8 AM – 2 PM' },
  { label: 'Day shift', time: '8 AM – 6 PM' },
  { label: 'Full day', time: '8 AM – 8 PM' },
]

const WINDOW_HOURS: Record<string, number> = {
  '8 AM – 2 PM': 6,
  '2 PM – 8 PM': 6,
  '8 AM – 6 PM': 10,
  '8 AM – 8 PM': 12,
  Off: 0,
}

export const hoursFor = (hours: string) => WINDOW_HOURS[hours] ?? 0
