export type RecheckPhase = 'monitoring' | 'probing' | 'reversed'
export type LadderPhase = 'idle' | 'playing' | 'secured'

export const recheckSubject = {
  professional: 'Suresh Kumar',
  role: 'Recovery assistant · Mobility',
  acceptedAt: '9:41 AM',
  offer: 'Post-op care · Mrs. Iyer',
  visitWindow: 'Today · 2:00 PM to 4:00 PM',
  personalWindow: 'Friday · 8:00 AM to 2:00 PM',
  conflict: 'The visit ends after the personal window closes',
}

export const probeSteps = [
  { icon: 'calendar' as const, title: 'Reading live calendar', body: 'Comparing the accepted window against committed sessions' },
  { icon: 'crosscheck' as const, title: 'Cross-checking sessions', body: 'Every session in the next 48 hours, verified twice' },
  { icon: 'travel' as const, title: 'Comparing travel buffers', body: 'Distance and handover time between both care addresses' },
]

export const reversalEvents = [
  { time: '9:42 AM', title: 'Acceptance reversed', body: 'The conflicting acceptance was withdrawn automatically' },
  { time: '9:42 AM', title: 'No penalty applied', body: 'The conflict was a calendar fact, not a choice' },
  { time: '9:42 AM', title: 'Slot re-offered', body: "Mrs. Iyer's visit re-entered dispatch round three" },
  { time: '9:42 AM', title: 'Outcome logged', body: 'Both the acceptance and the reversal are permanent records' },
]

export const ladderSteps = [
  { time: '8:15 AM', title: 'Offers expired', body: 'Five offers timed out with no acceptance' },
  { time: '8:16 AM', title: 'Round two dispatched', body: 'Eight nurses re-offered with a fresh window' },
  { time: '9:00 AM', title: 'Radius widened', body: 'Search widened to 10 km · more nurses eligible' },
  { time: '9:00 AM', title: 'Care team joined', body: "The team joined the family's screen live" },
]
