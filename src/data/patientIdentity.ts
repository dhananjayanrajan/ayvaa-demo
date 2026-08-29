import type { LucideIcon } from 'lucide-react'
import { Lock, ScrollText, Smile } from 'lucide-react'

export type ClearedStep = { key: string; title: string; detail: string; time: string }

export const clearedSteps: ClearedStep[] = [
  { key: 'phone', title: 'Phone code verified', detail: 'Matched on first attempt', time: '2:11 PM' },
  { key: 'id', title: 'Aadhaar card captured', detail: 'Front and back, sharp and readable', time: '2:12 PM' },
]

export const faceMatchConfidence = 0.992

export const faceMatchLabel = '99.2%'

export type PrivacyFact = { key: string; icon: LucideIcon; title: string; body: string }

export const privacyFacts: PrivacyFact[] = [
  {
    key: 'encrypted',
    icon: Lock,
    title: 'Encrypted on capture',
    body: 'Your ID is encrypted the moment it is taken — before it ever leaves the device. Even Ayvaa staff see only sealed metadata.',
  },
  {
    key: 'logged',
    icon: ScrollText,
    title: 'Every view is logged',
    body: 'Anyone who opens your ID, for any reason, is recorded in the audit trail. You can read that log any time in Records.',
  },
  {
    key: 'disposable',
    icon: Smile,
    title: 'Selfie is disposable',
    body: 'The selfie is compared and deleted immediately. It is never stored, shared or used for anything beyond this match.',
  },
]

export function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export type CapturePhase = 'idle' | 'scanning' | 'done'
