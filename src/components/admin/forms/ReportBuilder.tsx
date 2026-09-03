import { FileText, CalendarDays, Clock, Mail, BarChart3, Check } from 'lucide-react'
import { Card, Tile } from '@/components/phone/kit'
import { cn } from '@/lib/utils'
import { metricOptions, deliveryLabel, timeRangeLabel, frequencyLabel, type MetricId, type TimeRange, type Frequency, type Delivery } from '@/data/admin/a18Data'

export function ReportBuilder({ draftName, setDraftName, selectedMetrics, toggleMetric, timeRange, frequency, delivery, setDelivery, setSheetOpen }: {
  draftName: string; setDraftName: (v: string) => void; selectedMetrics: MetricId[]; toggleMetric: (id: MetricId) => void
  timeRange: TimeRange; frequency: Frequency; delivery: Delivery; setDelivery: (d: Delivery) => void; setSheetOpen: (s: 'timeRange' | 'frequency' | 'delete' | null) => void
}) {
  return (
    <Card>
      <div className="p-5">
        <div className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#0B211B]/[0.05] text-[#0B211B]/60"><FileText className="h-5 w-5" strokeWidth={2.2} /></span>
          <div className="min-w-0 flex-1">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40">Report name</div>
            <input value={draftName} onChange={(e) => setDraftName(e.target.value)} placeholder="Enter report name" className="mt-0.5 w-full bg-transparent text-[14px] font-bold tracking-tight text-[#0B211B] outline-none placeholder:font-semibold placeholder:tracking-tight placeholder:text-[#0B211B]/25" />
          </div>
        </div>
        <div className="mt-4">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40">Select metrics</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {metricOptions.map((m) => {
              const selected = selectedMetrics.includes(m.id)
              return (
                <button key={m.id} type="button" onClick={() => toggleMetric(m.id)} className={cn('flex items-center gap-1.5 rounded-full px-3 py-2 text-[11px] font-bold transition-colors', selected ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.05] text-[#0B211B]/70 hover:bg-[#0B211B]/[0.08]')}>
                  <m.icon className="h-3.5 w-3.5" strokeWidth={2.4} />{m.label}
                </button>
              )
            })}
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <button type="button" onClick={() => setSheetOpen('timeRange')} className="flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.035] px-3 py-3 text-left transition-colors hover:bg-[#0B211B]/[0.06]">
            <Tile icon={CalendarDays} tone="neutral" className="size-9 shrink-0" />
            <div className="min-w-0 flex-1"><div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">Time range</div><div className="mt-0.5 break-words text-[13px] font-bold text-[#0B211B]">{timeRangeLabel(timeRange)}</div></div>
          </button>
          <button type="button" onClick={() => setSheetOpen('frequency')} className="flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.035] px-3 py-3 text-left transition-colors hover:bg-[#0B211B]/[0.06]">
            <Tile icon={Clock} tone="neutral" className="size-9 shrink-0" />
            <div className="min-w-0 flex-1"><div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">Frequency</div><div className="mt-0.5 break-words text-[13px] font-bold text-[#0B211B]">{frequencyLabel(frequency)}</div></div>
          </button>
        </div>
        <div className="mt-4">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40">Delivery method</div>
          <div className="mt-2 flex flex-col gap-1.5">
            <button type="button" onClick={() => setDelivery('email')} className={cn('flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors', delivery === 'email' ? 'bg-emerald-500/[0.06] ring-2 ring-emerald-500/40' : 'bg-[#0B211B]/[0.035] hover:bg-[#0B211B]/[0.06]')}>
              <span className={cn('grid h-5 w-5 shrink-0 place-items-center rounded-full', delivery === 'email' ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.08] text-transparent')}>{delivery === 'email' && <Check className="h-3 w-3" strokeWidth={3} />}</span><Mail className="h-4 w-4 shrink-0 text-[#0B211B]/50" /><span className="min-w-0 flex-1 text-[13px] font-bold text-[#0B211B]">Email</span>
            </button>
            <button type="button" onClick={() => setDelivery('dashboard')} className={cn('flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors', delivery === 'dashboard' ? 'bg-emerald-500/[0.06] ring-2 ring-emerald-500/40' : 'bg-[#0B211B]/[0.035] hover:bg-[#0B211B]/[0.06]')}>
              <span className={cn('grid h-5 w-5 shrink-0 place-items-center rounded-full', delivery === 'dashboard' ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.08] text-transparent')}>{delivery === 'dashboard' && <Check className="h-3 w-3" strokeWidth={3} />}</span><BarChart3 className="h-4 w-4 shrink-0 text-[#0B211B]/50" /><span className="min-w-0 flex-1 text-[13px] font-bold text-[#0B211B]">Dashboard only</span>
            </button>
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-[#0B211B]/[0.04] px-3 py-2.5">
          <p className="text-[11px] font-bold text-[#0B211B]/70">{selectedMetrics.length > 0 ? `${selectedMetrics.length} metric${selectedMetrics.length > 1 ? 's' : ''} · ${timeRangeLabel(timeRange)} · ${frequencyLabel(frequency)} · ${deliveryLabel(delivery)}` : 'Select at least one metric to build a report'}</p>
        </div>
      </div>
    </Card>
  )
}
