import type { LucideIcon } from 'lucide-react'
import { Camera, Smartphone, Smile } from 'lucide-react'

export const CODE_LENGTH = 6

export const RESEND_SECONDS = 42

export type JourneyStep = { icon: LucideIcon; title: string }

export const journeySteps: JourneyStep[] = [
  { icon: Smartphone, title: 'Phone code' },
  { icon: Camera, title: 'ID photo' },
  { icon: Smile, title: 'Live selfie' },
]

export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  return `${digits.slice(0, 5)} ••••• ${digits.slice(-4)}`
}

export function formatCountdown(seconds: number): string {
  return `00:${String(Math.max(0, seconds)).padStart(2, '0')}`
}

export type NextStep = {
  key: string
  title: string
  detail: string
  chip: string
  chipIntent: 'success' | 'neutral'
}

export const nextSteps: NextStep[] = [
  {
    key: 'id',
    title: 'A photo of your ID card',
    detail: 'Front and back, takes under a minute',
    chip: 'Up next',
    chipIntent: 'success',
  },
  {
    key: 'selfie',
    title: 'A short selfie to match it',
    detail: 'Deleted after matching, never stored',
    chip: 'After',
    chipIntent: 'neutral',
  },
]

export const emailFallbackSubtitle = 'Same six digits, arrives instantly'
