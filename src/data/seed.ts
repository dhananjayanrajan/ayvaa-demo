import type {
  Approval,
  AuditEntry,
  AutoNotification,
  AvailabilityDay,
  Caregiver,
  Certification,
  ChatMessage,
  Consent,
  DispatchOffer,
  EscalatedTicket,
  Incident,
  Invoice,
  LovedOne,
  Medication,
  Offer,
  Payout,
  Referral,
  Report,
  RetentionPolicy,
  Session,
  StaffMember,
  SupportTicket,
  TrailEvent,
  Visit,
} from './types'

export const guardian = {
  name: 'Priya Sharma',
  email: 'priya.sharma@gmail.com',
  phone: '+91 98480 44710',
  address: 'Flat 402, Sunrise Residency, Road No. 12, Banjara Hills, Hyderabad 500034',
  joined: 'Jan 2024',
  verified: true,
}

export const lovedOnes: LovedOne[] = [
  { id: 'l1', name: 'Ramesh Sharma', age: 78, category: 'Elderly care', status: 'active' },
  { id: 'l2', name: 'Ananya Sharma', age: 6, category: 'Pediatric care', status: 'pending' },
]

export const caregivers: Caregiver[] = [
  {
    id: 'c1',
    name: 'Lakshmi Reddy',
    role: 'RN · Geriatric specialist',
    rating: 4.9,
    visits: 214,
    years: 12,
    licence: 'Licence renews Mar 2025',
    backgroundCleared: true,
    firstAid: true,
  },
  {
    id: 'c2',
    name: 'Suresh Kumar',
    role: 'Recovery assistant · Mobility',
    rating: 4.8,
    visits: 96,
    years: 7,
  },
  {
    id: 'c3',
    name: 'Meera Nair',
    role: 'Palliative specialist',
    rating: 4.7,
    visits: 158,
    years: 15,
  },
]

export const prescribers = ['Dr. Venkatesh · Physiotherapist', 'Dr. Rao · Diabetologist']

export const carePlan = {
  category: 'Elderly care',
  weeks: 9,
  week: 6,
  visitsDone: 38,
  status: 'On track',
  caregiver: 'Lakshmi Reddy · RN',
  schedule: 'Mon, Wed, Fri · 2:00 PM · two hours',
  remaining: '17 visits remain until April 26 · ₹14,400 weekly',
  progress: 67,
}

export const visits: Visit[] = [
  { id: 'v1', date: 'Mar 11', day: 'Monday', time: '2:00 PM', status: 'confirmed', caregiver: 'Lakshmi Reddy' },
  {
    id: 'v2',
    date: 'Mar 13',
    day: 'Wednesday',
    time: '2:02 PM',
    status: 'live',
    caregiver: 'Lakshmi Reddy',
    note: 'Vitals 128/76 · pulse 72 · O₂ 97% · Amlodipine given 2:12 PM · guided walk step 3 of 5 · lunch prep',
  },
  { id: 'v3', date: 'Mar 15', day: 'Friday', time: '2:00 PM', status: 'pending' },
  { id: 'v4', date: 'Mar 4', day: 'Monday', time: '2:00 PM', status: 'missed', note: 'No nurse accepted · fully refunded ₹4,800', refunded: true },
]

export const medications: Medication[] = [
  { id: 'm1', name: 'Amlodipine', dose: '5 mg', purpose: 'Blood pressure', schedule: 'Morning', prescriber: 'Dr. Venkatesh', stock: '60 tabs', takenToday: true },
  { id: 'm2', name: 'Metformin', dose: '500 mg', purpose: 'Diabetes', schedule: 'Twice daily', prescriber: 'Dr. Rao', stock: '24 tabs', takenToday: true },
  { id: 'm3', name: 'Atorvastatin', dose: '10 mg', purpose: 'Cholesterol', schedule: 'Nightly', prescriber: 'Dr. Rao', stock: '38 tabs', takenToday: true },
  { id: 'm4', name: 'Vitamin D drops', dose: '0.5 ml', purpose: 'Bone health', schedule: 'Due lunch', prescriber: 'Dr. Venkatesh', stock: '1 bottle' },
  { id: 'm5', name: 'Insulin pen', dose: 'Per chart', purpose: 'Diabetes', schedule: '8:30 PM · nurse', prescriber: 'Dr. Rao', stock: '4 days left', low: true, refill: true },
]

export const pricing = {
  elderly: '₹4,800',
  postOp: '₹5,200',
  range: '₹4,000 – ₹6,000',
  weekly: '₹14,400',
  marchSpent: '₹57,600',
  marchVisits: 12,
}

export const consent: Consent = {
  signed: 'Jan 12',
  sealed: true,
  reviewDue: 'Mar 20',
  cycleDays: 90,
  covers: ['Personal care', 'Medication management', 'Health readings'],
  locationTracking: true,
}

export const reports: Report[] = [
  {
    month: 'Mar 2024',
    label: 'Month 3 · improving',
    visits: '12/12 visits',
    trend: 'improving',
    highlights: ['BP steadily lower', 'No missed doses', '1 minor incident resolved'],
  },
  { month: 'Feb 2024', label: 'Month 2', visits: '12/12 visits', trend: 'steady', highlights: ['All visits completed', 'Consent renewed on time'] },
  { month: 'Jan 2024', label: 'Month 1', visits: '11/12 visits', trend: 'steady', highlights: ['1 visit missed by family choice'] },
]

export const supportTickets: SupportTicket[] = [
  { id: 't1', title: 'Change Friday start time', status: 'Resolving', updated: '12:20 PM' },
]

export const supportChat: ChatMessage[] = [
  { from: 'Priya', text: 'Could Friday visits start at 10:00 AM instead of 2:00 PM?', time: '11:40 AM' },
  { from: 'Kavya · Care team', text: 'Of course. Let me check with Lakshmi and confirm the new slot.', time: '11:52 AM' },
  { from: 'Kavya · Care team', text: 'Done — Friday visits now start at 10:00 AM permanently.', time: '12:20 PM' },
]

export const emergency = {
  ambulance: '108',
  caregiverOnSite: 'Lakshmi Reddy',
  hospital: 'Sunrise Multispeciality Hospital · 2.1 km',
  blood: 'O+',
  allergy: 'Penicillin',
  contacts: ['Chitra · sister', 'Dr. Venkatesh'],
  autoNotified: true,
}

export const redispatch = {
  firstOfferExpired: '8:15 AM',
  redispatched: '8 nurses · 8:16 AM',
  widened: '10 km · 9:00 AM',
  careTeamJoined: '9:00 AM',
  refundGuaranteed: true,
}

export const professional = {
  name: 'Arjun Deshmukh',
  role: 'RN · Geriatric & post-op specialist',
  email: 'arjun.deshmukh@ayvaa.health',
  licence: '88214',
  rating: 4.9,
  visits: 214,
  years: 12,
  bank: 'HDFC Bank · ending 8842',
}

export const offers: Offer[] = [
  { id: 'o1', title: 'Nursing care · recurring', type: 'recurring', expiresIn: '17 min left', rate: '₹4,800 / visit', consentSigned: true, distance: '4.2 km', status: 'active' },
  { id: 'o2', title: 'Post-op care · Mrs. Iyer', type: 'one-time', expiresIn: '1 hr 12 min', rate: '₹5,200', distance: '2.8 km', status: 'active' },
  { id: 'o3', title: 'Palliative care · ongoing', type: 'ongoing', expiresIn: '—', rate: '₹5,000 / visit', distance: '6.1 km', status: 'declined' },
]

export const sessions: Session[] = [
  { id: 's1', title: 'Ramesh Sharma · elderly care', time: '2:02 PM · checked in', status: 'live', detail: '5-step plan · step 3 of 5' },
  { id: 's2', title: 'Mrs. Iyer · physio assist', time: '5:30 PM', distance: '3.1 km', status: 'upcoming', detail: 'Dr. Venkatesh referral' },
  { id: 's3', title: 'Ramesh Sharma · insulin', time: '8:30 PM', status: 'upcoming', detail: 'Nurse only' },
  { id: 's4', title: 'Mr. Rao · wellness check', time: 'Tomorrow 10:00 AM', status: 'upcoming', detail: 'Field task' },
]

export const availability: AvailabilityDay[] = [
  { day: 'Mon', hours: '8 AM – 6 PM' },
  { day: 'Tue', hours: 'Off', off: true },
  { day: 'Wed', hours: '8 AM – 6 PM' },
  { day: 'Thu', hours: 'Off', off: true },
  { day: 'Fri', hours: '8 AM – 2 PM' },
  { day: 'Sat', hours: '8 AM – 6 PM' },
  { day: 'Sun', hours: '8 AM – 6 PM' },
]

export const earnings = {
  available: '₹41,200',
  nextPayout: 'Friday',
  thisWeek: '₹13,800',
  sessions: 21,
  rating: 4.9,
}

export const payouts: Payout[] = [
  { date: 'Mar 8', amount: '₹52,800', sessions: 11, status: 'in-transit' },
  { date: 'Mar 1', amount: '₹52,800', sessions: 11, status: 'paid' },
  { date: 'Feb 23', amount: '₹48,000', sessions: 10, status: 'paid' },
]

export const certifications: Certification[] = [
  { name: 'RN licence', status: 'valid' },
  { name: 'Advanced first aid', status: 'valid' },
  { name: 'Palliative training', status: 'in-review' },
]

export const professionalSkills = ['Elderly care', 'Post-operative', 'Chronic care']

export const partner = {
  name: 'Sunrise Multispeciality Hospital',
  location: 'Jubilee Hills, Hyderabad',
  email: 'care.ops@sunrisehospitals.in',
  sso: true,
  referred: 14,
  activeCare: 9,
  staffOnAyvaa: 6,
  sessionsThisMonth: 42,
}

export const referrals: Referral[] = [
  {
    id: 'r1',
    name: 'Mrs. Shanta Iyer',
    age: 71,
    condition: 'Hip recovery',
    referred: 'Mar 2',
    by: 'Dr. Venkatesh',
    progress: 'Week 2 of 6',
    visits: '8 of 18 visits',
    caregiver: 'Suresh Kumar',
    latest: 'Mar 12 · visit 8 · all steps done · pain 3/10, down from 5',
    status: 'active',
  },
  {
    id: 'r2',
    name: 'Mr. Farooq',
    age: 64,
    condition: 'Stroke rehab',
    referred: 'Feb 20',
    by: 'Dr. Rao',
    progress: 'Matching',
    visits: '—',
    caregiver: '—',
    latest: 'Caregiver matching in progress',
    status: 'matching',
  },
]

export const staff: StaffMember[] = [
  { id: 'st1', name: 'Kavitha Nair', role: 'Nurse', status: 'pending', note: 'Licence verified · awaiting approval' },
  { id: 'st2', name: 'Dr. Venkatesh', role: 'Physiotherapist', status: 'active', stats: '27 sessions · 4.9 · 100% on time · 9/11 goals · 2 incidents resolved · 96% notes helpful' },
  { id: 'st3', name: 'Ravi Kumar', role: 'Nurse', status: 'active' },
  { id: 'st4', name: 'Suresh Kumar', role: 'Recovery assistant', status: 'active' },
  { id: 'st5', name: 'Divya Reddy', role: 'Nurse', status: 'paused', note: 'On leave until Mar 25' },
]

export const invoices: Invoice[] = [
  { month: 'Feb', amount: '₹2,18,400', sessions: 42, status: 'paid', paidOn: 'Mar 5' },
  { month: 'Jan', amount: '₹1,92,400', sessions: 37, status: 'paid' },
  { month: 'Mar', amount: '₹2,39,200', sessions: 46, status: 'projected' },
]

export const adminMetrics = {
  activeBookings: '1,248',
  sessionsToday: '214',
  verified: '98.4%',
  openIncidents: 3,
  liveSessions: '186',
}

export const adminAttention = [
  { title: '7 unfilled offers', body: 'Friday visits · re-dispatch widening in progress' },
  { title: '6 professionals awaiting approval', body: 'All checks complete · decisions owed today' },
  { title: '18 consents due for review', body: 'Care pauses automatically if not renewed' },
]

export const incidents: Incident[] = [
  {
    id: 'i1',
    patient: 'Mrs. Iyer',
    severity: 'critical',
    raised: '9:40 AM',
    by: 'Lakshmi Reddy',
    summary:
      '"Stumbled on the rug edge during lap four of the guided walk. Caught her before any contact with the floor. No pain reported. Rug moved away immediately. Vitals rechecked and normal."',
    tags: ['Near fall', 'Photo attached', 'Vitals attached'],
    photo: 'hallway-rug.jpg',
    linkedVisit: 'Visit of March 13 · 10:00 AM · task 4 of 6',
    linkedPlan: 'Post-operative care plan · week 4 of 6 · paused by this incident',
    planPaused: true,
    decision: 'Reviewed the photo and vitals. Family informed at 10:05 AM. Recommend removing the rug and adding a balance exercise to the plan before resuming.',
  },
]

export const approvals: Approval[] = [
  {
    id: 'a1',
    name: 'Meera Nair',
    role: 'RN',
    licence: '91003',
    applied: 'March 10',
    waiting: '3 days',
    urgent: true,
    checks: [
      { label: 'Licence', state: 'ok' },
      { label: 'Screening', state: 'ok' },
      { label: 'Identity', state: 'ok' },
    ],
    history: 'Rejected once in 2022 · appeal upheld',
  },
  {
    id: 'a2',
    name: 'Imran Khan',
    role: 'Recovery assistant',
    applied: 'March 12',
    waiting: '1 day',
    checks: [
      { label: 'Identity', state: 'ok' },
      { label: 'Screening', state: 'running' },
      { label: 'Certificate', state: 'none' },
    ],
  },
]

export const auditEntries: AuditEntry[] = [
  { id: 'au1', icon: 'ok', title: 'Session signed off · Mrs. Iyer', body: 'Lakshmi R. · 10:02 AM · device and location logged' },
  { id: 'au2', icon: 'view', title: 'Sensitive document accessed', body: 'Dr. Venkatesh · discharge summary · reason recorded' },
  { id: 'au3', icon: 'approve', title: 'Consent granted · guardian of Ananya S.', body: 'Pediatric care · signed electronically · 9:15 AM' },
  { id: 'au4', icon: 'error', title: 'Incident escalated to supervisor', body: 'Near fall · Mrs. Iyer · auto notified 9:40 AM' },
  { id: 'au5', icon: 'gavel', title: 'Consent withdrawn · Mr. Krishnamurthy', body: 'All visits stopped · sealed record kept · 8:52 AM' },
]

export const consentTracking = {
  active: '1,102',
  due: '18',
  withdrawn: '2',
}

export const retentionPolicies: RetentionPolicy[] = [
  { type: 'Medical records', period: '10 years' },
  { type: 'Consent records', period: '10 years after withdrawal' },
  { type: 'Incident reports', period: '7 years' },
  { type: 'Visit summaries and vitals', period: '10 years' },
  { type: 'Payment records', period: '6 years · tax law' },
  { type: 'Support tickets', period: '3 years after closure' },
  { type: 'Identity selfies', period: 'Deleted after matching' },
]

export const escalatedTickets: EscalatedTicket[] = [
  {
    id: 'e1',
    title: 'Family requests new caregiver',
    meta: 'Priya Sharma · escalated by Kavya (care team) · requests a different nurse for Friday visits · session of March 13 linked, no incidents on it',
    waiting: '4 hrs waiting',
    chips: ['Visit linked', 'No incident', 'Guardian verified'],
    quote: '"We think Lakshmi is wonderful, but dad seems anxious on Fridays. Could someone calmer take that slot?"',
    quoteBy: 'Priya · 12:14 PM',
    actions: ['Re-match quietly', 'Reply to family'],
  },
  {
    id: 'e2',
    title: 'Double charge dispute · Mr. Reddy',
    meta: 'Billing · linked to two receipts · care team checked',
    chips: [],
    actions: [],
  },
  {
    id: 'e3',
    title: 'Partner invoice question · Sunrise',
    meta: 'Linked to February invoice · usage report attached',
    chips: [],
    actions: [],
  },
]

export const analytics = {
  revenue: '₹48.6 lakh',
  delta: '+12%',
  sessions: '1,012 completed sessions · average ₹4,800',
  utilisation: '91%',
  quality: '4.87',
  missRate: '1.8%',
  weekly: [48, 62, 58, 80],
  mix: [
    { label: 'Elderly care', value: '38%' },
    { label: 'Post-operative', value: '22%' },
    { label: 'Chronic care', value: '17%' },
    { label: 'Pediatric and special needs', value: '13%' },
    { label: 'Palliative and disability', value: '10%' },
  ],
  watch: 'Banjara Hills and Gachibowli have the highest unfilled-offer rate. Consider recruiting more nurses in those areas.',
}

export const systemTrail: TrailEvent[] = [
  { id: 'st1', time: '9:38 AM', title: 'Booking created', body: 'Booking and recurring series made in one safe step · record sealed', state: 'done' },
  { id: 'st2', time: '9:38 AM', title: 'Offers dispatched', body: 'Sent to five licensed nurses near the care address', state: 'done' },
  { id: 'st3', time: '9:41 AM', title: 'Offer accepted', body: 'Lakshmi accepted · availability re-checked before confirming', state: 'done' },
  { id: 'st4', time: '9:41 AM', title: 'Sessions generated', body: 'Visit tasks loaded from the active care plan', state: 'done' },
  { id: 'st5', time: '2:02 PM', title: 'Arrival verified', body: 'GPS matched · state change logged permanently', state: 'now' },
  { id: 'st6', time: '2:02 PM', title: 'Family notified', body: 'Realtime updates pushed to Priya\u2019s phone', state: 'done' },
  { id: 'st7', time: 'After sign off', title: 'Payment captured', body: 'Charge linked to exactly one session record', state: 'pending' },
]

export const dispatchOffers: DispatchOffer[] = [
  { id: 'd1', label: '5 offers waiting', count: 5, detail: 'Expire 9:45 AM · 17 minutes remaining', state: 'waiting' },
  { id: 'd2', label: '2 offers declined', count: 2, detail: 'Outside personal windows · no penalty applied', state: 'declined' },
  { id: 'd3', label: '1 acceptance pending re-check', count: 1, detail: 'Suresh K. accepted · verifying live availability now', state: 'recheck' },
]

export const autoNotifications: AutoNotification[] = [
  { id: 'an1', time: '7:30 AM', title: 'Visit reminders', body: 'Sent to 186 families · 30 minutes before each visit', state: 'sent' },
  { id: 'an2', time: '2:02 PM', title: 'Arrival alerts', body: 'Pushed the moment each GPS check-in matched', state: 'sent' },
  { id: 'an3', time: '9:00 AM', title: 'Consent reminders', body: '18 guardians · care pauses if reviews are missed', state: 'sent' },
  { id: 'an4', time: '4:30 PM', title: 'Receipt pushes', body: 'One per signed off visit · linked to the session record', state: 'sent' },
]

export const incidentLinking = {
  count: '3 incidents linked automatically',
  body: 'Each attached to its session, care plan and professional',
  paged: 'Supervisors paged: near fall · Mrs. Iyer (9:40 AM) · late dose · Mr. Rao (8:12 AM) · equipment fault (Monday).',
  paused: 'Care plans paused for the critical case until a supervisor closes it.',
}