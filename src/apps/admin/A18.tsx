import { useEffect, useRef, useState } from 'react'
import { BarChart3 } from 'lucide-react'
import { AppBar } from '@/components/base/phone/app-bar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/base/phone/screen'
import { Chip, Section, Panel, Tile } from '@/components/base/phone/kit'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { initialReports, frequencyLabel, type MetricId, type TimeRange, type Frequency, type Delivery, type ScheduledReport } from '@/data/admin/a18Data'
import { ReportBuilder } from '@/components/patterns/forms/report-builder'
import { ScheduledReports } from '@/components/patterns/lists/scheduled-reports'
import { ReportSheets } from '@/components/patterns/sheets/report-sheets'
import { ReportSaveAction } from '@/components/patterns/actions/report-save-action'

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
  useEffect(() => { const t = timersRef.current; return () => t.forEach(clearTimeout) }, [])
  const toggleMetric = (id: MetricId) => { setSelectedMetrics((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]); setSaveState('idle') }
  const saveReport = () => {
    if (!isValid || saveState !== 'idle') return
    setSaveState('working')
    timersRef.current.push(setTimeout(() => {
      setSaveState('done')
      const newReport: ScheduledReport = { id: `rep-${Date.now()}`, name: draftName.trim(), metrics: selectedMetrics, timeRange, frequency, delivery, status: 'active', nextRun: 'Pending schedule', lastRun: 'Not run yet', recipients: delivery === 'email' ? ['admin@ayvaa.in'] : [] }
      setReports((prev) => [newReport, ...prev])
      notify({ title: 'Report scheduled', body: `${newReport.name} · ${frequencyLabel(newReport.frequency)} · saved`, kind: 'ok' })
      setDraftName(''); setSelectedMetrics([])
    }, 1400))
  }
  const toggleReportStatus = (id: string) => {
    setReports((prev) => prev.map((r) => r.id === id ? { ...r, status: r.status === 'active' ? 'paused' : 'active', nextRun: r.status === 'active' ? 'Paused' : 'Pending schedule' } : r))
    notify({ title: 'Report status changed', body: `Report ${reports.find((r) => r.id === id)?.name} updated`, kind: 'ok' })
  }
  const confirmDelete = (id: string) => { setDeleteTargetId(id); setSheetOpen('delete') }
  const deleteReport = () => { if (!deleteTargetId) return; setReports((prev) => prev.filter((r) => r.id !== deleteTargetId)); setSheetOpen(null); setDeleteTargetId(null); notify({ title: 'Report deleted', body: 'Scheduled report removed', kind: 'warn' }) }
  const deleteTargetReport = deleteTargetId ? reports.find((r) => r.id === deleteTargetId) ?? null : null
  return (
    <Screen>
      <AppBar title="Report builder" subtitle="Analytics & scheduled reports" onBack={() => navigate('/admin/a09')} />
      <BodyArea>
        <div className="relative flex flex-col gap-4 pt-1">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <ReportBuilder draftName={draftName} setDraftName={setDraftName} selectedMetrics={selectedMetrics} toggleMetric={toggleMetric} timeRange={timeRange} frequency={frequency} delivery={delivery} setDelivery={setDelivery} setSheetOpen={setSheetOpen} />
          <Section label="Scheduled reports" trailing={<Chip intent="info">{reports.length}</Chip>} />
          <ScheduledReports reports={reports} expandedReportId={expandedReportId} setExpandedReportId={setExpandedReportId} toggleReportStatus={toggleReportStatus} confirmDelete={confirmDelete} />
          <Panel intent="info" className="flex items-start gap-3 p-4"><Tile icon={BarChart3} tone="info" /><p className="min-w-0 flex-1 pt-0.5 text-pretty break-words text-xs font-medium leading-relaxed text-[#0B211B]/65">Reports run automatically and are delivered to the selected method. Every schedule change is logged.</p></Panel>
          <EndOfScroll label="End of report builder" />
        </div>
      </BodyArea>
      <FootBar><ReportSaveAction isValid={isValid} saveState={saveState} onSave={saveReport} /></FootBar>
      <ReportSheets sheetOpen={sheetOpen} setSheetOpen={setSheetOpen} timeRange={timeRange} setTimeRange={setTimeRange} frequency={frequency} setFrequency={setFrequency} deleteTargetReport={deleteTargetReport} deleteReport={deleteReport} setDeleteTargetId={setDeleteTargetId} />
    </Screen>
  )
}
