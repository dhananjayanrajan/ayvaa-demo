import type { LucideIcon } from 'lucide-react'
import { Check, Fingerprint, HeartPulse, Lock, Phone, Users } from 'lucide-react'

export type Draft = {
  name: string
  email: string
  phone: string
  password: string
}

export const emptyDraft: Draft = {
  name: '',
  email: '',
  phone: '',
  password: '',
}

export type TrustPoint = { icon: LucideIcon; label: string }

export const trustPoints: TrustPoint[] = [
  { icon: Fingerprint, label: 'Identity-verified caregivers' },
  { icon: HeartPulse, label: 'GPS-checked visits' },
  { icon: Lock, label: 'Sealed medical records' },
]

export type TermsDoc = { id: string; title: string; summary: string }

export const termsDocs: TermsDoc[] = [
  {
    id: 'care-terms',
    title: 'Care terms',
    summary:
      'Sessions are delivered by licence-verified professionals. Care pauses automatically during any incident and resumes only after a supervisor reviews it.',
  },
  {
    id: 'privacy-promise',
    title: 'Family privacy promise',
    summary:
      'Medical records stay sealed. Every view — by caregivers, partners or admins — is logged with their name and visible to you in the access log.',
  },
]

export type StepKey = 'phone' | 'identity' | 'family'

export type StepUnlocks = Record<StepKey, boolean>

export type PathItem = { icon: LucideIcon; text: string }

export function pathItems(unlocks: StepUnlocks): PathItem[] {
  return [
    {
      icon: unlocks.phone ? Check : Phone,
      text: unlocks.phone
        ? 'Phone number is valid and ready for its OTP'
        : 'Phone verification with a 6-digit OTP',
    },
    {
      icon: unlocks.identity ? Check : Fingerprint,
      text: unlocks.identity
        ? 'Credentials are valid and ready for the identity check'
        : 'Identity check with one ID photo and a selfie',
    },
    {
      icon: unlocks.family ? Check : Users,
      text: unlocks.family
        ? 'Consent accepted and your family plan can begin'
        : 'Add your first loved one and their care needs',
    },
  ]
}

export type FieldState = 'empty' | 'invalid' | 'valid'

export function fieldState(value: string, valid: boolean): FieldState {
  if (!value.trim()) return 'empty'
  return valid ? 'valid' : 'invalid'
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
}

export function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, '').length >= 10
}

export type PasswordStrength = { score: number; label: string }

export function passwordStrength(pw: string): PasswordStrength {
  if (!pw) return { score: 0, label: 'Empty' }
  const long = pw.length >= 8
  const mixed = /[a-zA-Z]/.test(pw) && /\d/.test(pw)
  if (long && mixed) return { score: 3, label: 'Strong' }
  if (long) return { score: 2, label: 'Fair' }
  return { score: 1, label: 'Too short' }
}

export type Issue = { id: string; label: string }

export function draftIssues(d: Draft, agreed: boolean): Issue[] {
  const out: Issue[] = []
  if (!d.name.trim()) out.push({ id: 'name', label: 'your name' })
  if (!isValidEmail(d.email)) out.push({ id: 'email', label: 'a valid email' })
  if (!isValidPhone(d.phone)) out.push({ id: 'phone', label: 'a phone number' })
  if (passwordStrength(d.password).score < 2)
    out.push({ id: 'password', label: 'a stronger password' })
  if (!agreed) out.push({ id: 'terms', label: 'your acceptance below' })
  return out
}

export function stepUnlocks(d: Draft, agreed: boolean): StepUnlocks {
  return {
    phone: isValidPhone(d.phone),
    identity:
      d.name.trim().length >= 2 &&
      isValidEmail(d.email) &&
      isValidPhone(d.phone) &&
      passwordStrength(d.password).score >= 2,
    family: agreed,
  }
}
