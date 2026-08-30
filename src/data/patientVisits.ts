export const USUAL_CAREGIVER = 'Lakshmi Reddy'

export type VisitStatus = 'live' | 'confirmed' | 'pending' | 'completed' | 'missed'

export interface Visit {
  id: string
  day: string
  date: string
  start: string
  end?: string
  caregiver?: string
  status: VisitStatus
  gpsVerified: boolean
  note?: boolean
  vitals?: boolean
  minutes?: number
  arrivedAt?: string
  locationNote?: string
  reason?: string
  refund?: string
}

export const VISITS: Visit[] = [
  {
    id: 'v-live',
    day: 'Thursday',
    date: 'Mar 14',
    start: '2:00 PM',
    end: '4:30 PM',
    caregiver: USUAL_CAREGIVER,
    status: 'live',
    gpsVerified: true,
    minutes: 28,
    arrivedAt: '2:02 PM',
    locationNote: 'Location matched your home address',
  },
  {
    id: 'v-mon',
    day: 'Monday',
    date: 'Mar 18',
    start: '2:00 PM',
    end: '4:30 PM',
    caregiver: USUAL_CAREGIVER,
    status: 'confirmed',
    gpsVerified: false,
  },
  {
    id: 'v-wed',
    day: 'Wednesday',
    date: 'Mar 20',
    start: '2:00 PM',
    end: '4:30 PM',
    status: 'pending',
    gpsVerified: false,
  },
  {
    id: 'v-fri',
    day: 'Friday',
    date: 'Mar 22',
    start: '2:00 PM',
    end: '4:30 PM',
    caregiver: USUAL_CAREGIVER,
    status: 'confirmed',
    gpsVerified: false,
  },
  {
    id: 'v-done-1',
    day: 'Tuesday',
    date: 'Mar 12',
    start: '2:00 PM',
    end: '4:30 PM',
    caregiver: USUAL_CAREGIVER,
    status: 'completed',
    gpsVerified: true,
    minutes: 150,
    note: true,
    vitals: true,
  },
  {
    id: 'v-missed-1',
    day: 'Friday',
    date: 'Mar 8',
    start: '2:00 PM',
    caregiver: undefined,
    status: 'missed',
    gpsVerified: false,
    reason: 'No nurse accepted in time — dispatch re-offered automatically',
    refund: '₹1,400',
  },
]

export const LIVE_VISIT: Visit | undefined = VISITS.find((v) => v.status === 'live')

export interface VisitFilters {
  caregiverOnly: boolean
  confirmedOnly: boolean
}

export const emptyVisitFilters: VisitFilters = { caregiverOnly: false, confirmedOnly: false }

export const activeFilterCount = (f: VisitFilters): number =>
  (f.caregiverOnly ? 1 : 0) + (f.confirmedOnly ? 1 : 0)

export const applyVisitFilters = (list: Visit[], f: VisitFilters): Visit[] =>
  list.filter(
    (v) =>
      (!f.caregiverOnly || v.caregiver === USUAL_CAREGIVER) &&
      (!f.confirmedOnly || v.status === 'confirmed' || v.status === 'live'),
  )

export const upcomingVisits = (): Visit[] =>
  VISITS.filter((v) => v.status === 'confirmed' || v.status === 'pending' || v.status === 'live')

export const completedVisits = (): Visit[] => VISITS.filter((v) => v.status === 'completed')

export const missedVisits = (): Visit[] => VISITS.filter((v) => v.status === 'missed')

export const confirmedCount = (list: Visit[]): number => list.filter((v) => v.status === 'confirmed' || v.status === 'live').length

export const timeRange = (v: Visit): string => (v.end ? `${v.start} to ${v.end}` : v.start)

export const upcomingSubtitle = (v: Visit): string =>
  v.caregiver ? `${v.caregiver}, ${timeRange(v)}` : 'Offer out to nearby nurses'

export const filterOptions = [
  {
    id: 'caregiverOnly' as const,
    label: `Only ${USUAL_CAREGIVER}`,
    sub: 'Hide visits with any other caregiver',
  },
  {
    id: 'confirmedOnly' as const,
    label: 'Confirmed visits only',
    sub: 'Hide offers still waiting for a nurse',
  },
]
