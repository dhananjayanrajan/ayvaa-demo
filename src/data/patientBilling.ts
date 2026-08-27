export type PaymentCard = {
  id: string
  brand: string
  last4: string
  expires: string
  holder: string
  default?: boolean
}

export const paymentCards: PaymentCard[] = [
  { id: 'pc1', brand: 'HDFC Visa', last4: '8842', expires: 'Aug 2026', holder: 'Priya Sharma', default: true },
  { id: 'pc2', brand: 'ICICI Mastercard', last4: '7703', expires: 'Feb 2027', holder: 'Priya Sharma' },
]

export const supportQuickRequests = [
  { id: 'qr1', title: 'Reschedule a visit', subtitle: 'Move one date or the whole series', to: '/patient/p33' },
  { id: 'qr2', title: 'Request a different caregiver', subtitle: 'We match quietly and never disrupt care', to: '/patient/p25' },
  { id: 'qr3', title: 'Billing question', subtitle: 'Receipts, charges and plan pricing', to: '/patient/p23' },
]
