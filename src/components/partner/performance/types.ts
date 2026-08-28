export type PerformanceMonth = 'March' | 'February'

export interface FeedbackEntry {
  family: string
  quote: string
  date: string
  rating: number
}

export interface PerformanceData {
  month: PerformanceMonth
  week: string
  rating: number
  ratingChange: string
  sessions: number
  onTime: string
  goalsMet: number
  goalsTotal: number
  incidentsResolved: string
  goalsInProgress: string
  quote: string
  family: string
  feedbacks: FeedbackEntry[]
  goals: {
    label: string
    done: boolean
    note: string
  }[]
}
