import type { LucideIcon } from 'lucide-react'
import { Activity, BarChart3, DollarSign, Gauge, ShieldAlert, Users } from 'lucide-react'
import { carePlan, escalatedTickets, flaggedAccount, professional, retentionPolicies, supportTickets } from '@/data/seed'

export type MetricId = 'escalated' | 'flagged' | 'retention' | 'quality' | 'support' | 'careplan'
export type Metric = {
  id: MetricId
  label: string
  value: string
  change: string
  intent: 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  icon: LucideIcon
  details: { k: string; v: string }[]
}

export const metrics: Metric[] = [
  { id: 'escalated', label: 'Escalated tickets', value: String(escalatedTickets.length), change: 'judgment', intent: 'warning', icon: ShieldAlert, details: escalatedTickets.map((t) => ({ k: t.title, v: t.waiting ?? '—' })) },
  { id: 'flagged', label: 'Flagged accounts', value: String(flaggedAccount.flags.length), change: 'review', intent: 'danger', icon: Users, details: flaggedAccount.flags.map((f) => ({ k: f, v: flaggedAccount.name })) },
  { id: 'retention', label: 'Retention policies', value: String(retentionPolicies.length), change: 'enforced', intent: 'info', icon: BarChart3, details: retentionPolicies.map((p) => ({ k: p.type, v: p.period })) },
  { id: 'quality', label: 'Professional quality', value: String(professional.rating), change: `${professional.visits} visits`, intent: 'success', icon: Activity, details: [{ k: 'Rating', v: String(professional.rating) }, { k: 'Visits completed', v: String(professional.visits) }, { k: 'Years experience', v: String(professional.years) }] },
  { id: 'support', label: 'Open support tickets', value: String(supportTickets.length), change: 'active', intent: 'neutral', icon: Gauge, details: supportTickets.map((t) => ({ k: t.title, v: t.status })) },
  { id: 'careplan', label: 'Care plan progress', value: `${carePlan.progress}%`, change: `${carePlan.week}/${carePlan.weeks} weeks`, intent: 'success', icon: DollarSign, details: [{ k: 'Visits done', v: String(carePlan.visitsDone) }, { k: 'Remaining', v: carePlan.remaining }, { k: 'Caregiver', v: carePlan.caregiver }, { k: 'Schedule', v: carePlan.schedule }] },
]
export const defaultVisible: MetricId[] = ['escalated', 'flagged', 'retention', 'quality']
export const heroStats = [
  { label: 'Escalated', value: escalatedTickets.length, dot: 'bg-amber-300' },
  { label: 'Flagged', value: flaggedAccount.flags.length, dot: 'bg-rose-300' },
  { label: 'Rating', value: professional.rating, dot: 'bg-emerald-300' },
]
export function changeChipIntent(change: string) {
  if (change === 'active' || change === `${professional.visits} visits` || change === `${carePlan.week}/${carePlan.weeks} weeks`) return 'info' as const
  if (change === 'review' || change === 'judgment') return 'warning' as const
  if (change === 'enforced') return 'info' as const
  return 'neutral' as const
}
