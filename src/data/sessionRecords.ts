import { pastSessions } from '@/data/professionalHistory'

const parseAmount = (raw: string) => Number(raw.replace(/[^\d]/g, '')) || 0

export type SessionRecord = {
  id: string
  patient: string
  amount: string
  parsed: number
  day: string
  time: string
}

export const paidSessions: SessionRecord[] = pastSessions
  .filter((s) => !s.incident)
  .map((s) => {
    const [day, time] = s.date.split(' · ')
    return {
      id: s.id,
      patient: s.patient,
      amount: s.amount,
      parsed: parseAmount(s.amount),
      day: day ?? s.date,
      time: time ?? '',
    }
  })

export const paidTotal = paidSessions.reduce((sum, s) => sum + s.parsed, 0)
export const paidAverage = Math.round(paidTotal / Math.max(1, paidSessions.length))
