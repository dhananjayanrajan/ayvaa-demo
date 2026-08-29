export type TransactionPhase =
  | 'idle'
  | 'running'
  | 'committed'
  | 'failing'
  | 'rolling-back'
  | 'rolled-back'

export type PostCommitState = 'pending' | 'emitting' | 'done' | 'failed'

export type StepVisual = 'pending' | 'writing' | 'done' | 'failed' | 'undone'

export type TransactionStep = {
  id: number
  title: string
  body: string
  table: string
  icon: 'booking' | 'series' | 'sessions' | 'audit'
  undoTitle: string
  undoBody: string
}

export const transactionMeta = {
  id: 'TXN-9F38',
  startedAt: '9:38 AM',
  patient: 'Priya Sharma',
  careType: 'Recurring elderly care',
  visitCount: '13 visits',
  amount: '₹14,400 weekly',
  commitMs: '94 ms',
  rollbackMs: '240 ms',
}

export const transactionSteps: TransactionStep[] = [
  {
    id: 1,
    title: 'Booking record',
    body: 'Priya Sharma · elderly care · Banjara Hills address verified',
    table: 'bookings',
    icon: 'booking',
    undoTitle: 'Booking record reversed',
    undoBody: 'The booking row was removed before anyone could see it',
  },
  {
    id: 2,
    title: 'Recurring series',
    body: 'Mon, Wed and Fri at 2:00 PM · thirteen planned visits',
    table: 'care_series',
    icon: 'series',
    undoTitle: 'Recurring series reversed',
    undoBody: 'The weekly pattern was discarded together with its booking',
  },
  {
    id: 3,
    title: 'Session stubs',
    body: 'Thirteen sessions generated from the series in one write',
    table: 'sessions',
    icon: 'sessions',
    undoTitle: 'Session stubs discarded',
    undoBody: 'All thirteen stubs were removed alongside the series',
  },
  {
    id: 4,
    title: 'Audit event',
    body: 'Booking created · record sealed with device and time',
    table: 'audit_log',
    icon: 'audit',
    undoTitle: 'Audit entry re-written',
    undoBody: 'The commit marker was replaced with the rollback record',
  },
]

export const postCommitStep = {
  title: 'Dispatch offers emitted',
  body: 'Offers sent to five licensed nurses near the care address',
  table: 'dispatch',
}

export type DrillOutcome = 'committed' | 'rolled-back' | 'dispatch-failed'

export type DrillRun = {
  failureAt: number
  outcome: DrillOutcome
}
