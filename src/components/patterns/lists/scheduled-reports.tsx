import { AccentHero } from '@/components/base/phone/accent-hero'
import { Chip, Expand } from '@/components/base/phone/kit'
import { BarChart3, ChevronDown, Clock, CalendarDays, Mail, Users, Pause, Play, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { metricLabel, timeRangeLabel, frequencyLabel, deliveryLabel, type ScheduledReport } from '@/data/admin/a18Data'

export function ScheduledReports({ reports, expandedReportId, setExpandedReportId, toggleReportStatus, confirmDelete }: {
  reports: ScheduledReport[]; expandedReportId: string | null; setExpandedReportId: (v: string | null) => void; toggleReportStatus: (id: string) => void; confirmDelete: (id: string) => void
}) {
  if (reports.length === 0) return <div className="rounded-3xl border border-[#0B211B]/[0.06] bg-white p-5 text-center shadow-[0_1px_2px_rgba(11,33,27,0.06)]"><p className="text-[12px] font-bold text-[#0B211B]/50">No scheduled reports yet</p></div>
  return (
    <div className="flex flex-col gap-3">
      {reports.map((report) => {
        const isOpen = expandedReportId === report.id
        const isActive = report.status === 'active'
        return (
          <AccentHero key={report.id} tone={isActive ? 'emerald' : 'sky'}>
            <button type="button" onClick={() => setExpandedReportId(isOpen ? null : report.id)} aria-expanded={isOpen} className="flex w-full items-start gap-3 text-left">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.08] text-white"><BarChart3 className="h-5 w-5" strokeWidth={2.2} /></span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2"><span className="break-words text-[15px] font-extrabold tracking-tight text-white">{report.name}</span><Chip intent={isActive ? 'success' : 'neutral'} light dot={!isActive} className="border-transparent">{isActive ? 'Active' : 'Paused'}</Chip></div>
                <div className="mt-2 flex items-baseline justify-between gap-3"><span className="shrink-0 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/40">Next run</span><span className="min-w-0 break-words text-right font-mono text-[11px] font-bold text-white/80">{report.nextRun}</span></div>
                <div className="mt-1 flex items-baseline justify-between gap-3"><span className="shrink-0 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/40">Last run</span><span className="min-w-0 break-words text-right font-mono text-[11px] font-bold text-white/60">{report.lastRun}</span></div>
              </div>
              <ChevronDown className={cn('h-4 w-4 shrink-0 text-white/40 transition-transform duration-200', isOpen && 'rotate-180')} />
            </button>
            <Expand open={isOpen}>
              <div className="pt-4">
                <div className="rounded-2xl bg-white/[0.04] p-4">
                  <div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/40">Metrics included</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">{report.metrics.map((m) => (<span key={m} className="rounded-full bg-white/[0.08] px-2.5 py-1 text-[10px] font-bold text-white/80">{metricLabel(m)}</span>))}</div>
                  <div className="mt-4 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/40">Schedule</div>
                  <div className="mt-2 flex flex-col gap-1.5">
                    <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 shrink-0 text-white/40" /><span className="break-words text-[11px] font-semibold text-white/70">{frequencyLabel(report.frequency)}</span></div>
                    <div className="flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5 shrink-0 text-white/40" /><span className="break-words text-[11px] font-semibold text-white/70">{timeRangeLabel(report.timeRange)}</span></div>
                    <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 shrink-0 text-white/40" /><span className="break-words text-[11px] font-semibold text-white/70">{deliveryLabel(report.delivery)}</span></div>
                  </div>
                  {report.delivery === 'email' && report.recipients.length > 0 && (<><div className="mt-4 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/40">Recipients</div><div className="mt-2 flex flex-col gap-1.5">{report.recipients.map((r) => (<div key={r} className="flex items-center gap-2"><Users className="h-3.5 w-3.5 shrink-0 text-white/40" /><span className="break-all text-[11px] font-semibold text-white/70">{r}</span></div>))}</div></>)}
                  <div className="mt-5 flex flex-col gap-2">
                    <button type="button" onClick={() => toggleReportStatus(report.id)} className={cn('flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[11px] font-bold transition-colors', isActive ? 'bg-amber-300 text-amber-950 hover:bg-amber-200' : 'bg-emerald-400 text-emerald-950 hover:bg-emerald-300')}>{isActive ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}{isActive ? 'Pause report' : 'Resume report'}</button>
                    <button type="button" onClick={() => confirmDelete(report.id)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-500/20 py-2.5 text-[11px] font-bold text-rose-200 transition-colors hover:bg-rose-500/30"><Trash2 className="h-3.5 w-3.5" />Delete report</button>
                  </div>
                </div>
              </div>
            </Expand>
          </AccentHero>
        )
      })}
    </div>
  )
}
