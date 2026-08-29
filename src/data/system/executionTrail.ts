import type { TrailEvent } from '@/data/types'

export const systemTrail: TrailEvent[] = [
  { id: 'st1', time: '9:38 AM', title: 'Booking created', body: 'Booking and recurring series made in one safe step · record sealed', state: 'done' },
  { id: 'st2', time: '9:38 AM', title: 'Offers dispatched', body: 'Sent to five licensed nurses near the care address', state: 'done' },
  { id: 'st3', time: '9:41 AM', title: 'Offer accepted', body: 'Lakshmi accepted · availability re-checked before confirming', state: 'done' },
  { id: 'st4', time: '9:41 AM', title: 'Sessions generated', body: 'Visit tasks loaded from the active care plan', state: 'done' },
  { id: 'st5', time: '2:02 PM', title: 'Arrival verified', body: 'GPS matched · state change logged permanently', state: 'now' },
  { id: 'st6', time: '2:02 PM', title: 'Family notified', body: 'Realtime updates pushed to Priya\u2019s phone', state: 'done' },
  { id: 'st7', time: 'After sign off', title: 'Payment captured', body: 'Charge linked to exactly one session record', state: 'pending' },
]
