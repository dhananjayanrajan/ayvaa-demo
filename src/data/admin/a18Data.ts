import { DollarSign, Gauge, ShieldAlert, BarChart3 } from 'lucide-react'

export type MetricId = 'revenue' | 'utilization' | 'quality' | 'sessions' | 'incidents'
export type TimeRange = 'last7' | 'last30' | 'thisMonth' | 'custom'
export type Frequency = 'daily' | 'weekly' | 'monthly'
export type Delivery = 'email' | 'dashboard'

export type Metric = { id: MetricId; label: string; icon: typeof DollarSign }
export type ScheduledReport = {
  id: string
  name: string
  metrics: MetricId[]
  timeRange: TimeRange
  frequency: Frequency
  delivery: Delivery
  status: 'active' | 'paused'
  nextRun: string
  lastRun: string
  recipients: string[]
}

export const metricOptions: Metric[] = [
  { id: 'revenue', label: 'Revenue', icon: DollarSign },
  { id: 'utilization', label: 'Utilization', icon: Gauge },
  { id: 'quality', label: 'Quality', icon: ShieldAlert },
  { id: 'sessions', label: 'Sessions', icon: BarChart3 },
  { id: 'incidents', label: 'Incidents', icon: ShieldAlert },
]

export const timeRanges: { id: TimeRange; label: string; detail: string }[] = [
  { id: 'last7', label: 'Last 7 days', detail: 'Mar 10 – Mar 16' },
  { id: 'last30', label: 'Last 30 days', detail: 'Feb 15 – Mar 16' },
  { id: 'thisMonth', label: 'This month', detail: 'Mar 1 – Mar 31' },
  { id: 'custom', label: 'Custom range', detail: 'Choose dates' },
]

export const frequencies: { id: Frequency; label: string; detail: string }[] = [
  { id: 'daily', label: 'Daily', detail: 'Every day at 9 AM' },
  { id: 'weekly', label: 'Weekly', detail: 'Every Monday at 9 AM' },
  { id: 'monthly', label: 'Monthly', detail: 'First of every month at 9 AM' },
]

export const initialReports: ScheduledReport[] = [
  {
    id: 'rep1',
    name: 'Weekly operations summary',
    metrics: ['revenue', 'utilization', 'quality'],
    timeRange: 'last7',
    frequency: 'weekly',
    delivery: 'email',
    status: 'active',
    nextRun: 'Mon, Mar 24',
    lastRun: 'Mon, Mar 17',
    recipients: ['ops@ayvaa.in', 'admin@ayvaa.in'],
  },
  {
    id: 'rep2',
    name: 'Daily incident digest',
    metrics: ['incidents', 'quality'],
    timeRange: 'last30',
    frequency: 'daily',
    delivery: 'dashboard',
    status: 'paused',
    nextRun: 'Paused',
    lastRun: 'Fri, Mar 14',
    recipients: [],
  },
]

export function metricLabel(id: MetricId) { return metricOptions.find((m) => m.id === id)?.label ?? id }
export function timeRangeLabel(id: TimeRange) { return timeRanges.find((r) => r.id === id)?.label ?? id }
export function frequencyLabel(id: Frequency) { return frequencies.find((f) => f.id === id)?.label ?? id }
export function deliveryLabel(d: Delivery) { return d === 'email' ? 'Email' : 'Dashboard only' }
