export type PaymentPhase = 'awaiting' | 'capturing' | 'captured' | 'retrying'

export const paymentMeta = {
  id: 'PAY-7C21',
  amount: '₹4,800',
  amountNum: '4,800',
  session: 'Visit of Mar 13',
  visitShort: 'Mar 13 · 2 to 4 PM',
  careName: 'Lakshmi Reddy',
  careShort: 'Lakshmi Reddy · RN',
  family: 'Priya Sharma',
  card: 'Visa',
  cardLast4: '8842',
}

export type CaptureIcon = 'signoff' | 'auth' | 'capture' | 'receipt'

export const captureSteps: { title: string; detail: string; time: string; icon: CaptureIcon }[] = [
  { title: 'Session signed off', detail: 'The family confirmed every care step', time: '4:30 PM', icon: 'signoff' },
  { title: 'Authorization verified', detail: 'Card mandate confirmed with the bank', time: '4:30 PM', icon: 'auth' },
  { title: 'Amount captured', detail: 'One charge, linked to the session', time: '4:31 PM', icon: 'capture' },
  { title: 'Receipt delivered', detail: 'One push to the family, itemised', time: '4:31 PM', icon: 'receipt' },
]

export const retryLadder = [
  { time: '4:31 PM', head: 'Retry one', detail: 'Fresh authorization on the same card' },
  { time: '4:33 PM', head: 'Retry two', detail: 'Mandate re-confirmed with the bank' },
  { time: '4:34 PM', head: 'Captured', detail: '₹4,800 linked to the signed-off session' },
]

export const refund = {
  id: 'REF-3A08',
  amount: '₹4,800',
  amountNum: '4,800',
  card: 'Visa ·· 8842',
  reason: 'No care delivered',
  settled: 'Mar 7',
  visit: 'Visit of Mar 4',
  visitDetail: 'Friday · 2:00 PM',
  visitCause: 'No nurse accepted the offer',
}

export const refundEvents = [
  {
    time: '2:05 PM',
    title: 'Missed visit confirmed',
    detail: 'No professional checked in. Detected by the system.',
  },
  {
    time: '2:05 PM',
    title: 'Refund initiated',
    detail: 'The full amount returned to the source card.',
  },
  {
    time: 'Mar 7 · 11:20 AM',
    title: 'Money back',
    detail: 'The bank confirmed the credit in full.',
  },
]
