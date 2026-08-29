import type { payouts } from '@/data/seed'

export type Payout = (typeof payouts)[number]

export type PayoutAccount = {
  id: string
  bankName: string
  last4: string
  holder: string
  verified: string | null
  primary: boolean
}

export const parseBank = (raw: string): { name: string; last4: string } => {
  const [name, tail] = raw.split(' · ')
  const digits = tail?.match(/\d+/)?.[0] ?? raw.match(/(\d+)\s*$/)?.[1] ?? '••••'
  return { name: name ?? raw, last4: digits.slice(-4) }
}

export const formatINR = (n: number) => `₹${n.toLocaleString('en-IN')}`

export type WithdrawalStep = {
  title: string
  when: string
  detail: string
  done: boolean
  active: boolean
}

export const WITHDRAWAL_STEPS: WithdrawalStep[] = [
  {
    title: 'Withdrawal requested',
    when: 'Just now',
    detail: 'Created from your verified balance. Nothing is held back.',
    done: true,
    active: false,
  },
  {
    title: 'Ayvaa verification',
    when: 'Instant',
    detail: 'Licence, session confirmations and fraud checks pass automatically.',
    done: true,
    active: false,
  },
  {
    title: 'Bank credit',
    when: 'By 6:00 PM',
    detail: 'Money lands in your account. A push notification confirms the moment it arrives.',
    done: false,
    active: true,
  },
]
