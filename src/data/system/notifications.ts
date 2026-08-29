import type { AutoNotification } from '@/data/types'

export const autoNotifications: AutoNotification[] = [
  { id: 'an1', time: '7:30 AM', title: 'Visit reminders', body: 'Sent to 186 families · 30 minutes before each visit', state: 'sent' },
  { id: 'an2', time: '2:02 PM', title: 'Arrival alerts', body: 'Pushed the moment each GPS check-in matched', state: 'sent' },
  { id: 'an3', time: '9:00 AM', title: 'Consent reminders', body: '18 guardians · care pauses if reviews are missed', state: 'sent' },
  { id: 'an4', time: '4:30 PM', title: 'Receipt pushes', body: 'One per signed off visit · linked to the session record', state: 'sent' },
]
