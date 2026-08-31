import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  BarChart3,
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  DollarSign,
  FileText,
  Gauge,
  Loader2,
  Mail,
  Pause,
  Play,
  Plus,
  ShieldAlert,
  Trash2,
  Users,
  X,
} from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Expand, Panel, Section, Tile } from '@/components/phone/kit'
import { AccentHero } from '@/components/phone/AccentHero'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

type MetricId = 'revenue' | 'utilization' | 'quality' | 'sessions' | 'incidents'
type TimeRange = 'last7' | 'last30' | 'thisMonth' | 'custom'
type Frequency = 'daily' | 'weekly' | 'monthly'
type Delivery = 'email' | 'dashboard'

type Metric = { id: MetricId; label: string; icon: typeof DollarSign }
type ScheduledReport = {
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

const metricOptions: Metric[] = [
  { id: 'revenue', label: 'Revenue', icon: DollarSign },
  { id: 'utilization', label: 'Utilization', icon: Gauge },
  { id: 'quality', label: 'Quality', icon: ShieldAlert },
  { id: 'sessions', label: 'Sessions', icon: BarChart3 },
  { id: 'incidents', label: 'Incidents', icon: ShieldAlert },
]

const timeRanges: { id: TimeRange; label: string; detail: string }[] = [
  { id: 'last7', label: 'Last 7 days', detail: 'Mar 10 – Mar 16' },
  { id: 'last30', label: 'Last 30 days', detail: 'Feb 15 – Mar 16' },
  { id: 'thisMonth', label: 'This month', detail: 'Mar 1 – Mar 31' },
  { id: 'custom', label: 'Custom range', detail: 'Choose dates' },
]

const frequencies: { id: Frequency; label: string; detail: string }[] = [
  { id: 'daily', label: 'Daily', detail: 'Every day at 9 AM' },
  { id: 'weekly', label: 'Weekly', detail: 'Every Monday at 9 AM' },
  { id: 'monthly', label: 'Monthly', detail: 'First of every month at 9 AM' },
]

const initialReports: ScheduledReport[] = [
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

function metricLabel(id: MetricId) {
  return metricOptions.find((m) => m.id === id)?.label ?? id
}

function timeRangeLabel(id: TimeRange) {
  return timeRanges.find((r) => r.id === id)?.label ?? id
}

function frequencyLabel(id: Frequency) {
  return frequencies.find((f) => f.id === id)?.label ?? id
}

function deliveryLabel(d: Delivery) {
  return d === 'email' ? 'Email' : 'Dashboard only'
}

export function A18() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [draftName, setDraftName] = useState('')
  const [selectedMetrics, setSelectedMetrics] = useState<MetricId[]>([])
  const [timeRange, setTimeRange] = useState<TimeRange>('last7')
  const [frequency, setFrequency] = useState<Frequency>('weekly')
  const [delivery, setDelivery] = useState<Delivery>('email')
  const [saveState, setSaveState] = useState<'idle' | 'working' | 'done'>('idle')
  const [reports, setReports] = useState<ScheduledReport[]>(initialReports)
  const [expandedReportId, setExpandedReportId] = useState<string | null>(null)
  const [sheetOpen, setSheetOpen] = useState<'timeRange' | 'frequency' | 'delete' | null>(null)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const isValid = draftName.trim().length > 0 && selectedMetrics.length > 0

  useEffect(() => {
    const timers = timersRef.current
    return () => timers.forEach(clearTimeout)
  }, [])

  const toggleMetric = (id: MetricId) => {
    setSelectedMetrics((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
    setSaveState('idle')
  }

  const saveReport = () => {
    if (!isValid || saveState !== 'idle') return
    setSaveState('working')
    timersRef.current.push(
      setTimeout(() => {
        setSaveState('done')
        const newReport: ScheduledReport = {
          id: `rep-${Date.now()}`,
          name: draftName.trim(),
          metrics: selectedMetrics,
          timeRange,
          frequency,
          delivery,
          status: 'active',
          nextRun: 'Pending schedule',
          lastRun: 'Not run yet',
          recipients: delivery === 'email' ? ['admin@ayvaa.in'] : [],
        }
        setReports((prev) => [newReport, ...prev])
        notify({
          title: 'Report scheduled',
          body: `${newReport.name} · ${frequencyLabel(frequency)} · saved`,
          kind: 'ok',
        })
        setDraftName('')
        setSelectedMetrics([])
      }, 1400),
    )
  }

  const toggleReportStatus = (id: string) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: r.status === 'active' ? 'paused' : 'active',
              nextRun: r.status === 'active' ? 'Paused' : 'Pending schedule',
            }
          : r,
      ),
    )
    notify({
      title: 'Report status changed',
      body: `Report ${reports.find((r) => r.id === id)?.name} updated`,
      kind: 'ok',
    })
  }

  const confirmDelete = (id: string) => {
    setDeleteTargetId(id)
    setSheetOpen('delete')
  }

  const deleteReport = () => {
    if (!deleteTargetId) return
    setReports((prev) => prev.filter((r) => r.id !== deleteTargetId))
    setSheetOpen(null)
    setDeleteTargetId(null)
    notify({
      title: 'Report deleted',
      body: 'Scheduled report removed',
      kind: 'warn',
    })
  }

  const deleteTargetReport = deleteTargetId ? reports.find((r) => r.id === deleteTargetId) : null

  return (
    <Screen>
      <AppBar
        title="Report builder"
        subtitle="Analytics & scheduled reports"
        onBack={() => navigate('/admin/a09')}
      />
      <BodyArea>
        <div className="relative flex flex-col gap-4 pt-1">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />

          <Card>
            <div className="p-5">
              <div className="flex items-center gap-2.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#0B211B]/[0.05] text-[#0B211B]/60">
                  <FileText className="h-5 w-5" strokeWidth={2.2} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40">
                    Report name
                  </div>
                  <input
                    value={draftName}
                    onChange={(e) => setDraftName(e.target.value)}
                    placeholder="Enter report name"
                    className="mt-0.5 w-full bg-transparent text-[14px] font-bold tracking-tight text-[#0B211B] outline-none placeholder:font-semibold placeholder:tracking-tight placeholder:text-[#0B211B]/25"
                  />
                </div>
              </div>

              <div className="mt-4">
                <div className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40">
                  Select metrics
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {metricOptions.map((m) => {
                    const selected = selectedMetrics.includes(m.id)
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => toggleMetric(m.id)}
                        className={cn(
                          'flex items-center gap-1.5 rounded-full px-3 py-2 text-[11px] font-bold transition-colors',
                          selected ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.05] text-[#0B211B]/70 hover:bg-[#0B211B]/[0.08]',
                        )}
                      >
                        <m.icon className="h-3.5 w-3.5" strokeWidth={2.4} />
                        {m.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setSheetOpen('timeRange')}
                  className="flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.035] px-3 py-3 text-left transition-colors hover:bg-[#0B211B]/[0.06]"
                >
                  <Tile icon={CalendarDays} tone="neutral" className="size-9 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">
                      Time range
                    </div>
                    <div className="mt-0.5 break-words text-[13px] font-bold text-[#0B211B]">
                      {timeRangeLabel(timeRange)}
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 shrink-0 text-[#0B211B]/30" />
                </button>

                <button
                  type="button"
                  onClick={() => setSheetOpen('frequency')}
                  className="flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.035] px-3 py-3 text-left transition-colors hover:bg-[#0B211B]/[0.06]"
                >
                  <Tile icon={Clock} tone="neutral" className="size-9 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">
                      Frequency
                    </div>
                    <div className="mt-0.5 break-words text-[13px] font-bold text-[#0B211B]">
                      {frequencyLabel(frequency)}
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 shrink-0 text-[#0B211B]/30" />
                </button>
              </div>

              <div className="mt-4">
                <div className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40">
                  Delivery method
                </div>
                <div className="mt-2 flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() => setDelivery('email')}
                    className={cn(
                      'flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors',
                      delivery === 'email' ? 'bg-emerald-500/[0.06] ring-2 ring-emerald-500/40' : 'bg-[#0B211B]/[0.035] hover:bg-[#0B211B]/[0.06]',
                    )}
                  >
                    <span
                      className={cn(
                        'grid h-5 w-5 shrink-0 place-items-center rounded-full',
                        delivery === 'email' ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.08] text-transparent',
                      )}
                    >
                      {delivery === 'email' && <Check className="h-3 w-3" strokeWidth={3} />}
                    </span>
                    <Mail className="h-4 w-4 shrink-0 text-[#0B211B]/50" />
                    <span className="min-w-0 flex-1 text-[13px] font-bold text-[#0B211B]">Email</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDelivery('dashboard')}
                    className={cn(
                      'flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors',
                      delivery === 'dashboard' ? 'bg-emerald-500/[0.06] ring-2 ring-emerald-500/40' : 'bg-[#0B211B]/[0.035] hover:bg-[#0B211B]/[0.06]',
                    )}
                  >
                    <span
                      className={cn(
                        'grid h-5 w-5 shrink-0 place-items-center rounded-full',
                        delivery === 'dashboard' ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.08] text-transparent',
                      )}
                    >
                      {delivery === 'dashboard' && <Check className="h-3 w-3" strokeWidth={3} />}
                    </span>
                    <BarChart3 className="h-4 w-4 shrink-0 text-[#0B211B]/50" />
                    <span className="min-w-0 flex-1 text-[13px] font-bold text-[#0B211B]">Dashboard only</span>
                  </button>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-[#0B211B]/[0.04] px-3 py-2.5">
                <p className="text-[11px] font-bold text-[#0B211B]/70">
                  {selectedMetrics.length > 0
                    ? `${selectedMetrics.length} metric${selectedMetrics.length > 1 ? 's' : ''} · ${timeRangeLabel(timeRange)} · ${frequencyLabel(frequency)} · ${deliveryLabel(delivery)}`
                    : 'Select at least one metric to build a report'}
                </p>
              </div>
            </div>
          </Card>

          <Section
            label="Scheduled reports"
            trailing={<Chip intent="info">{reports.length}</Chip>}
          />

          <div className="flex flex-col gap-3">
            {reports.length === 0 ? (
              <div className="rounded-3xl border border-[#0B211B]/[0.06] bg-white p-5 text-center shadow-[0_1px_2px_rgba(11,33,27,0.06)]">
                <p className="text-[12px] font-bold text-[#0B211B]/50">No scheduled reports yet</p>
              </div>
            ) : (
              reports.map((report) => {
                const isOpen = expandedReportId === report.id
                const isActive = report.status === 'active'
                return (
                  <AccentHero key={report.id} tone={isActive ? 'emerald' : 'sky'}>
                    <button
                      type="button"
                      onClick={() => setExpandedReportId(isOpen ? null : report.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start gap-3 text-left"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.08] text-white">
                        <BarChart3 className="h-5 w-5" strokeWidth={2.2} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="break-words text-[15px] font-extrabold tracking-tight text-white">
                            {report.name}
                          </span>
                          <Chip
                            intent={isActive ? 'success' : 'neutral'}
                            light
                            dot={!isActive}
                            className="border-transparent"
                          >
                            {isActive ? 'Active' : 'Paused'}
                          </Chip>
                        </div>
                        <div className="mt-2 flex items-baseline justify-between gap-3">
                          <span className="shrink-0 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/40">
                            Next run
                          </span>
                          <span className="min-w-0 break-words text-right font-mono text-[11px] font-bold text-white/80">
                            {report.nextRun}
                          </span>
                        </div>
                        <div className="mt-1 flex items-baseline justify-between gap-3">
                          <span className="shrink-0 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/40">
                            Last run
                          </span>
                          <span className="min-w-0 break-words text-right font-mono text-[11px] font-bold text-white/60">
                            {report.lastRun}
                          </span>
                        </div>
                      </div>
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 shrink-0 text-white/40 transition-transform duration-200',
                          isOpen && 'rotate-180',
                        )}
                      />
                    </button>

                    <Expand open={isOpen}>
                      <div className="pt-4">
                        <div className="rounded-2xl bg-white/[0.04] p-4">
                          <div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/40">
                            Metrics included
                          </div>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {report.metrics.map((m) => (
                              <span
                                key={m}
                                className="rounded-full bg-white/[0.08] px-2.5 py-1 text-[10px] font-bold text-white/80"
                              >
                                {metricLabel(m)}
                              </span>
                            ))}
                          </div>

                          <div className="mt-4 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/40">
                            Schedule
                          </div>
                          <div className="mt-2 flex flex-col gap-1.5">
                            <div className="flex items-center gap-2">
                              <Clock className="h-3.5 w-3.5 shrink-0 text-white/40" />
                              <span className="break-words text-[11px] font-semibold text-white/70">
                                {frequencyLabel(report.frequency)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CalendarDays className="h-3.5 w-3.5 shrink-0 text-white/40" />
                              <span className="break-words text-[11px] font-semibold text-white/70">
                                {timeRangeLabel(report.timeRange)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-3.5 w-3.5 shrink-0 text-white/40" />
                              <span className="break-words text-[11px] font-semibold text-white/70">
                                {deliveryLabel(report.delivery)}
                              </span>
                            </div>
                          </div>

                          {report.delivery === 'email' && report.recipients.length > 0 && (
                            <>
                              <div className="mt-4 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/40">
                                Recipients
                              </div>
                              <div className="mt-2 flex flex-col gap-1.5">
                                {report.recipients.map((r) => (
                                  <div key={r} className="flex items-center gap-2">
                                    <Users className="h-3.5 w-3.5 shrink-0 text-white/40" />
                                    <span className="break-all text-[11px] font-semibold text-white/70">{r}</span>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}

                          <div className="mt-5 flex flex-col gap-2">
                            <button
                              type="button"
                              onClick={() => toggleReportStatus(report.id)}
                              className={cn(
                                'flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[11px] font-bold transition-colors',
                                isActive
                                  ? 'bg-amber-300 text-amber-950 hover:bg-amber-200'
                                  : 'bg-emerald-400 text-emerald-950 hover:bg-emerald-300',
                              )}
                            >
                              {isActive ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                              {isActive ? 'Pause report' : 'Resume report'}
                            </button>
                            <button
                              type="button"
                              onClick={() => confirmDelete(report.id)}
                              className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-500/20 py-2.5 text-[11px] font-bold text-rose-200 transition-colors hover:bg-rose-500/30"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete report
                            </button>
                          </div>
                        </div>
                      </div>
                    </Expand>
                  </AccentHero>
                )
              })
            )}
          </div>

          <Panel intent="info" className="flex items-start gap-3 p-4">
            <Tile icon={BarChart3} tone="info" />
            <p className="min-w-0 flex-1 pt-0.5 text-pretty break-words text-xs font-medium leading-relaxed text-[#0B211B]/65">
              Reports run automatically and are delivered to the selected method. Every schedule change is logged.
            </p>
          </Panel>

          <EndOfScroll label="End of report builder" />
        </div>
      </BodyArea>
      <FootBar>
        <button
          type="button"
          onClick={saveReport}
          disabled={!isValid || saveState !== 'idle'}
          className={cn(
            'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-all',
            saveState === 'done'
              ? 'bg-emerald-500/[0.1] text-emerald-700'
              : saveState === 'working'
                ? 'cursor-wait bg-emerald-500/10 text-emerald-600/70'
                : isValid
                  ? 'bg-emerald-500 text-white shadow-[0_18px_36px_-18px_rgba(16,185,129,0.6)]'
                  : 'bg-[#0B211B]/[0.06] text-[#0B211B]/30',
          )}
        >
          {saveState === 'working' ? (
            <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
          ) : saveState === 'done' ? (
            <Check className="h-4 w-4 shrink-0" strokeWidth={2.4} />
          ) : (
            <Plus className="h-4 w-4 shrink-0" strokeWidth={2.4} />
          )}
          {saveState === 'idle' ? (isValid ? 'Save report' : 'Select metrics to save') : saveState === 'working' ? 'Saving…' : 'Report saved'}
        </button>
      </FootBar>

      <AnimatePresence>
        {sheetOpen === 'timeRange' && (
          <motion.div
            key="time-dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSheetOpen(null)}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {sheetOpen === 'timeRange' && (
          <motion.div
            key="time-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 40 }}
            className="absolute inset-x-0 bottom-0 z-50 flex h-[86%] flex-col overflow-hidden rounded-t-[28px] bg-white"
          >
            <div className="shrink-0 px-5 pt-4">
              <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-4 px-5 pb-7 pt-3">
              <div className="flex items-start gap-3">
                <Tile icon={CalendarDays} tone="info" size="lg" />
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Select time range</div>
                </div>
                <button
                  type="button"
                  onClick={() => setSheetOpen(null)}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {timeRanges.map((range) => (
                  <button
                    key={range.id}
                    type="button"
                    onClick={() => {
                      setTimeRange(range.id)
                      setSheetOpen(null)
                    }}
                    className={cn(
                      'flex items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors',
                      timeRange === range.id ? 'bg-emerald-500/[0.06] ring-2 ring-emerald-500/40' : 'bg-[#0B211B]/[0.035] hover:bg-[#0B211B]/[0.06]',
                    )}
                  >
                    <span
                      className={cn(
                        'grid h-5 w-5 shrink-0 place-items-center rounded-full',
                        timeRange === range.id ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.08] text-transparent',
                      )}
                    >
                      {timeRange === range.id && <Check className="h-3 w-3" strokeWidth={3} />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="break-words text-[13px] font-bold text-[#0B211B]">{range.label}</div>
                      <div className="mt-0.5 break-words text-[11px] font-medium text-[#0B211B]/55">{range.detail}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheetOpen === 'frequency' && (
          <motion.div
            key="freq-dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSheetOpen(null)}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {sheetOpen === 'frequency' && (
          <motion.div
            key="freq-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 40 }}
            className="absolute inset-x-0 bottom-0 z-50 flex h-[86%] flex-col overflow-hidden rounded-t-[28px] bg-white"
          >
            <div className="shrink-0 px-5 pt-4">
              <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-4 px-5 pb-7 pt-3">
              <div className="flex items-start gap-3">
                <Tile icon={Clock} tone="info" size="lg" />
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Select frequency</div>
                </div>
                <button
                  type="button"
                  onClick={() => setSheetOpen(null)}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {frequencies.map((freq) => (
                  <button
                    key={freq.id}
                    type="button"
                    onClick={() => {
                      setFrequency(freq.id)
                      setSheetOpen(null)
                    }}
                    className={cn(
                      'flex items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors',
                      frequency === freq.id ? 'bg-emerald-500/[0.06] ring-2 ring-emerald-500/40' : 'bg-[#0B211B]/[0.035] hover:bg-[#0B211B]/[0.06]',
                    )}
                  >
                    <span
                      className={cn(
                        'grid h-5 w-5 shrink-0 place-items-center rounded-full',
                        frequency === freq.id ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.08] text-transparent',
                      )}
                    >
                      {frequency === freq.id && <Check className="h-3 w-3" strokeWidth={3} />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="break-words text-[13px] font-bold text-[#0B211B]">{freq.label}</div>
                      <div className="mt-0.5 break-words text-[11px] font-medium text-[#0B211B]/55">{freq.detail}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheetOpen === 'delete' && (
          <motion.div
            key="delete-dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSheetOpen(null)
              setDeleteTargetId(null)
            }}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {sheetOpen === 'delete' && deleteTargetReport && (
          <motion.div
            key="delete-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 40 }}
            className="absolute inset-x-0 bottom-0 z-50 flex h-[86%] flex-col overflow-hidden rounded-t-[28px] bg-white"
          >
            <div className="shrink-0 px-5 pt-4">
              <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-4 px-5 pb-7 pt-3">
              <div className="flex items-start gap-3">
                <Tile icon={Trash2} tone="danger" size="lg" />
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Delete report?</div>
                  <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">
                    This will permanently remove the scheduled report.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSheetOpen(null)
                    setDeleteTargetId(null)
                  }}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="rounded-2xl bg-[#0B211B]/[0.04] p-4">
                <div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">
                  Report details
                </div>
                <div className="mt-2 break-words text-[14px] font-extrabold text-[#0B211B]">
                  {deleteTargetReport.name}
                </div>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {deleteTargetReport.metrics.map((m) => (
                    <span
                      key={m}
                      className="rounded-full bg-[#0B211B]/[0.05] px-2.5 py-1 text-[10px] font-bold text-[#0B211B]/70"
                    >
                      {metricLabel(m)}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex flex-col gap-1.5 text-[11px] font-semibold text-[#0B211B]/55">
                  <span>{frequencyLabel(deleteTargetReport.frequency)}</span>
                  <span>{timeRangeLabel(deleteTargetReport.timeRange)}</span>
                  <span>{deliveryLabel(deleteTargetReport.delivery)}</span>
                  {deleteTargetReport.delivery === 'email' && deleteTargetReport.recipients.length > 0 && (
                    <span>Recipients: {deleteTargetReport.recipients.join(', ')}</span>
                  )}
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <span className="shrink-0 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">
                    Last run
                  </span>
                  <span className="min-w-0 break-words text-right font-mono text-[11px] font-bold text-[#0B211B]/70">
                    {deleteTargetReport.lastRun}
                  </span>
                </div>
                <div className="mt-1 flex items-baseline justify-between gap-3">
                  <span className="shrink-0 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">
                    Next run
                  </span>
                  <span className="min-w-0 break-words text-right font-mono text-[11px] font-bold text-[#0B211B]/70">
                    {deleteTargetReport.nextRun}
                  </span>
                </div>
              </div>

              <div className="mt-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSheetOpen(null)
                    setDeleteTargetId(null)
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/75"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={deleteReport}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-600 to-red-500 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(225,29,72,0.6)]"
                >
                  <Trash2 className="h-4 w-4" strokeWidth={2.4} />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
