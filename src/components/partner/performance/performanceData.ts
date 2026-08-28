import type { PerformanceData } from './types'

export const performanceMonths: PerformanceData[] = [
  {
    month: 'March',
    week: 'Week 3 · 18 Mar 2026',
    rating: 4.9,
    ratingChange: '+0.2 MoM',
    sessions: 27,
    onTime: '100%',
    goalsMet: 9,
    goalsTotal: 11,
    incidentsResolved: '2/2 incidents resolved',
    goalsInProgress: '2 goals in progress',
    quote: 'Dr. Venkatesh made our father feel safe and heard. The daily updates kept us calm through recovery.',
    family: 'Ramesh Family',
    feedbacks: [
      {
        family: 'Ramesh Family',
        quote: 'Dr. Venkatesh made our father feel safe and heard. The daily updates kept us calm through recovery.',
        date: '12 Mar 2026',
        rating: 5.0,
      },
      {
        family: 'Mehta Family',
        quote: 'Very professional and caring. The exercises were explained clearly and we always knew what to expect.',
        date: '05 Mar 2026',
        rating: 4.8,
      },
      {
        family: 'Khan Family',
        quote: 'The doctor patiently answered all our questions and adjusted the plan when needed.',
        date: '28 Feb 2026',
        rating: 4.9,
      },
    ],
    goals: [
      { label: 'Mobility restored', done: true, note: 'Patient walks 400m without support.' },
      { label: 'Post-op pain down', done: true, note: 'Pain score reduced from 7 to 2.' },
      { label: 'Endurance milestone', done: false, note: 'Target: 10-minute continuous walk.' },
      { label: 'Home exercise adherence', done: false, note: '3/7 days completed this week.' },
    ],
  },
  {
    month: 'February',
    week: 'Week 4 · 24 Feb 2026',
    rating: 4.7,
    ratingChange: '+0.1 MoM',
    sessions: 22,
    onTime: '96%',
    goalsMet: 8,
    goalsTotal: 11,
    incidentsResolved: '1/1 incident resolved',
    goalsInProgress: '3 goals in progress',
    quote: 'The team was incredibly responsive and explained every step of the recovery plan.',
    family: 'Iyer Family',
    feedbacks: [
      {
        family: 'Iyer Family',
        quote: 'The team was incredibly responsive and explained every step of the recovery plan.',
        date: '20 Feb 2026',
        rating: 4.7,
      },
      {
        family: 'Reddy Family',
        quote: 'We felt supported throughout the process. The doctor was always available for questions.',
        date: '14 Feb 2026',
        rating: 4.6,
      },
    ],
    goals: [
      { label: 'Mobility restored', done: true, note: 'Patient walks 300m with walker.' },
      { label: 'Post-op pain down', done: true, note: 'Pain score reduced from 8 to 3.' },
      { label: 'Endurance milestone', done: false, note: 'Target: 8-minute continuous walk.' },
      { label: 'Home exercise adherence', done: false, note: '2/7 days completed this week.' },
    ],
  },
]
