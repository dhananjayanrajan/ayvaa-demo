import type { LucideIcon } from 'lucide-react'
import { Clock, ScrollText, ShieldCheck } from 'lucide-react'

export const VALIDITY_SECONDS = 1800

export type Guarantee = { key: string; icon: LucideIcon; title: string; body: string }

export const guarantees: Guarantee[] = [
  {
    key: 'visits',
    icon: Clock,
    title: "Today's visits are unaffected",
    body: "Lakshmi's 2:00 PM visit proceeds as planned. Caregivers never need your password.",
  },
  {
    key: 'sealed',
    icon: ShieldCheck,
    title: 'Your records stay sealed',
    body: 'Nobody can open any record while a reset is in progress, not even support.',
  },
]

export type SafetyRule = { key: string; title: string; body: string }

export const safetyRules: SafetyRule[] = [
  {
    key: 'single-use',
    title: 'Single-use link',
    body: 'Each link works exactly once, then dies. Forwarded links are useless.',
  },
  {
    key: 'window',
    title: '30-minute window',
    body: 'Unused links expire after 30 minutes and a new one must be requested.',
  },
  {
    key: 'audit',
    title: 'Audit-logged change',
    body: 'The password change itself is written to the audit record with a timestamp.',
  },
]

export function formatValidity(seconds: number): string {
  const m = Math.floor(Math.max(0, seconds) / 60)
  const s = Math.max(0, seconds) % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export type SendState = 'idle' | 'working' | 'done'
