import type { LucideIcon } from 'lucide-react'
import { CalendarX2, Check, Clock, CreditCard, FileQuestion, MapPin, ShieldCheck, Undo2, UserRound } from 'lucide-react'

export const MARCH = {
  label: 'March',
  budget: 16000,
  perVisit: 1600,
}

export const fmtINR = (n: number): string => `₹${n.toLocaleString('en-IN')}`

export type ReceiptState = 'sealed' | 'live' | 'planned' | 'refund'

export interface Receipt {
  id: string
  number: string
  state: ReceiptState
  day: string
  date: string
  icon: LucideIcon
  amount: number
  title: string
  note: string
  chip: string
  ticket: {
    badgeLabel: string
    badgeTone: 'emerald' | 'amber' | 'sky'
    rows: { label: string; value: string }[]
    finalLabel: string
    finalValue: string
    finalEmphasis: boolean
  }
}

export const RECEIPTS: Receipt[] = [
  {
    id: 'r1',
    number: 'AY-2306',
    state: 'sealed',
    day: 'Thu',
    date: 'Mar 6',
    icon: Check,
    amount: 1600,
    title: 'Visit sealed',
    note: 'Charged after sign-off, GPS verified',
    chip: 'Paid',
    ticket: {
      badgeLabel: 'Receipt',
      badgeTone: 'emerald',
      rows: [
        { label: 'Caregiver', value: 'Nurse Lakshmi' },
        { label: 'Signed off', value: '4:32 PM' },
        { label: 'Verification', value: 'GPS plus nurse sign-off' },
        { label: 'Method', value: 'HDFC, ending 8842' },
      ],
      finalLabel: 'Settled',
      finalValue: 'In full, Mar 6',
      finalEmphasis: false,
    },
  },
  {
    id: 'r2',
    number: 'AY-2308',
    state: 'sealed',
    day: 'Sat',
    date: 'Mar 8',
    icon: Check,
    amount: 1600,
    title: 'Visit sealed',
    note: 'Charged after sign-off, GPS verified',
    chip: 'Paid',
    ticket: {
      badgeLabel: 'Receipt',
      badgeTone: 'emerald',
      rows: [
        { label: 'Caregiver', value: 'Nurse Lakshmi' },
        { label: 'Signed off', value: '4:28 PM' },
        { label: 'Verification', value: 'GPS plus nurse sign-off' },
        { label: 'Method', value: 'HDFC, ending 8842' },
      ],
      finalLabel: 'Settled',
      finalValue: 'In full, Mar 8',
      finalEmphasis: false,
    },
  },
  {
    id: 'r3',
    number: 'RT-114',
    state: 'refund',
    day: 'Sat',
    date: 'Mar 8',
    icon: Undo2,
    amount: 1600,
    title: 'Missed visit refunded',
    note: 'Caregiver unable to attend, returned automatically',
    chip: 'In transit',
    ticket: {
      badgeLabel: 'Refund',
      badgeTone: 'amber',
      rows: [
        { label: 'Original charge', value: 'Mar 8, ₹1,600' },
        { label: 'Reason', value: 'Missed visit, caregiver fault' },
        { label: 'Destination', value: 'HDFC, ending 8842' },
        { label: 'Expected', value: 'Within 3 days' },
      ],
      finalLabel: 'Returning to your card',
      finalValue: '₹1,600',
      finalEmphasis: true,
    },
  },
  {
    id: 'r4',
    number: 'AY-2320',
    state: 'live',
    day: 'Thu',
    date: 'Mar 20',
    icon: Clock,
    amount: 1600,
    title: 'Visit in progress',
    note: 'Charges only when the visit is signed off',
    chip: 'On sign-off',
    ticket: {
      badgeLabel: 'Provisional',
      badgeTone: 'sky',
      rows: [
        { label: 'Caregiver', value: 'Nurse Lakshmi' },
        { label: 'Charge moment', value: 'Nurse sign-off' },
        { label: 'If unfinished', value: 'No charge is made' },
        { label: 'Method', value: 'HDFC, ending 8842' },
      ],
      finalLabel: 'Billed so far',
      finalValue: '₹0',
      finalEmphasis: false,
    },
  },
  {
    id: 'r5',
    number: '',
    state: 'planned',
    day: 'Sat',
    date: 'Mar 22',
    icon: Clock,
    amount: 1600,
    title: 'Visit planned',
    note: 'Charged only after the visit is done',
    chip: 'Planned',
    ticket: {
      badgeLabel: '',
      badgeTone: 'emerald',
      rows: [],
      finalLabel: '',
      finalValue: '',
      finalEmphasis: false,
    },
  },
]

export const sealedOf = (receipts: Receipt[]): Receipt[] => receipts.filter((r) => r.state === 'sealed')

export const chargedOf = (receipts: Receipt[]): number =>
  sealedOf(receipts).reduce((sum, r) => sum + r.amount, 0)

export const refundedOf = (receipts: Receipt[]): number =>
  receipts.filter((r) => r.state === 'refund').reduce((sum, r) => sum + r.amount, 0)

export const netOf = (receipts: Receipt[]): number => chargedOf(receipts) - refundedOf(receipts)

export const budgetPct = (receipts: Receipt[]): number => chargedOf(receipts) / MARCH.budget

export interface PaymentCard {
  id: string
  brand: string
  scheme: 'visa' | 'mastercard' | 'rupay'
  ending: string
  holder: string
  expiry: string
  isDefault: boolean
}

export const paymentCards: PaymentCard[] = [
  {
    id: 'hdfc-8842',
    brand: 'HDFC Bank',
    scheme: 'visa',
    ending: '8842',
    holder: 'Priya Sharma',
    expiry: '09/28',
    isDefault: true,
  },
  {
    id: 'icici-2210',
    brand: 'ICICI Bank',
    scheme: 'mastercard',
    ending: '2210',
    holder: 'Priya Sharma',
    expiry: '04/27',
    isDefault: false,
  },
  {
    id: 'amex-5531',
    brand: 'Axis Bank',
    scheme: 'rupay',
    ending: '5531',
    holder: 'Rahul Sharma',
    expiry: '11/26',
    isDefault: false,
  },
]

export const defaultCardOf = (cards: PaymentCard[]): PaymentCard =>
  cards.find((c) => c.isDefault) ?? cards[0]

export interface QuickRequest {
  id: string
  label: string
  detail: string
  icon: LucideIcon
}

export const supportQuickRequests: QuickRequest[] = [
  {
    id: 'reschedule',
    label: 'Reschedule a visit',
    detail: 'Move an upcoming visit to another slot',
    icon: CalendarX2,
  },
  {
    id: 'billing',
    label: 'Question about a charge',
    detail: 'Receipts, refunds and payment methods',
    icon: CreditCard,
  },
  {
    id: 'caregiver',
    label: 'Caregiver concern',
    detail: 'Raise anything about the professional on duty',
    icon: UserRound,
  },
  {
    id: 'records',
    label: 'Records or consent',
    detail: 'Access, consent scope and sealed documents',
    icon: ShieldCheck,
  },
  {
    id: 'location',
    label: 'Visit address problem',
    detail: 'Wrong address or access instructions',
    icon: MapPin,
  },
  {
    id: 'other',
    label: 'Something else',
    detail: 'Anything the care team should know about',
    icon: FileQuestion,
  },
]

export interface LedgerRow {
  label: string
  value: string
}

export const buildLedgerRows = (receipts: Receipt[]): LedgerRow[] => [
  { label: 'Visits sealed and charged', value: String(sealedOf(receipts).length) },
  { label: 'Charged', value: fmtINR(chargedOf(receipts)) },
  { label: 'Returned', value: fmtINR(refundedOf(receipts)) },
  { label: 'Net to card', value: fmtINR(netOf(receipts)) },
  { label: 'Pending charges', value: '₹0' },
]

export function buildStatementLines(receipts: Receipt[]): string {
  const lines: string[] = []
  lines.push('AYVAA CARE - BILLING STATEMENT, MARCH 2026')
  lines.push(`Visits sealed and charged: ${sealedOf(receipts).length}`)
  lines.push(`Charged: ${fmtINR(chargedOf(receipts))}`)
  lines.push(`Returned: ${fmtINR(refundedOf(receipts))}`)
  lines.push(`Net to card: ${fmtINR(netOf(receipts))}`)
  lines.push('')
  lines.push('RECEIPTS')
  receipts.forEach((r) => {
    const sign = r.state === 'refund' ? '+' : ''
    lines.push(`- ${r.day} ${r.date} | ${r.title} | ${sign}${fmtINR(r.amount)}`)
  })
  lines.push('')
  lines.push('Every charge links to exactly one signed-off visit.')
  return lines.join('\n')
}

export function downloadStatement(lines: string[]): void {
  const blob = new Blob([lines], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'ayvaa-march-statement.txt'
  anchor.click()
  setTimeout(() => URL.revokeObjectURL(url), 4000)
}
