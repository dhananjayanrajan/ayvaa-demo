import { AnimatePresence, motion } from 'motion/react'
import { Check, CalendarDays, Clock, Trash2, X } from 'lucide-react'
import { Tile } from '@/components/base/phone/kit'
import { cn } from '@/lib/utils'
import { timeRanges, frequencies, metricLabel, timeRangeLabel, frequencyLabel, deliveryLabel, type TimeRange, type Frequency, type ScheduledReport } from '@/data/admin/a18Data'

export function ReportSheets({ sheetOpen, setSheetOpen, timeRange, setTimeRange, frequency, setFrequency, deleteTargetReport, deleteReport, setDeleteTargetId }: {
  sheetOpen: 'timeRange' | 'frequency' | 'delete' | null; setSheetOpen: (v: 'timeRange' | 'frequency' | 'delete' | null) => void
  timeRange: TimeRange; setTimeRange: (v: TimeRange) => void; frequency: Frequency; setFrequency: (v: Frequency) => void
  deleteTargetReport: ScheduledReport | null; deleteReport: () => void; setDeleteTargetId: (v: string | null) => void
}) {
  return (
    <>
      <AnimatePresence>{sheetOpen === 'timeRange' && (<motion.div key="time-dim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSheetOpen(null)} className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]" />)}</AnimatePresence>
      <AnimatePresence>{sheetOpen === 'timeRange' && (
        <motion.div key="time-sheet" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 380, damping: 40 }} className="absolute inset-x-0 bottom-0 z-50 flex h-[86%] flex-col overflow-hidden rounded-t-[28px] bg-white">
          <div className="shrink-0 px-5 pt-4"><div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" /></div>
          <div className="flex min-h-0 flex-1 flex-col gap-4 px-5 pb-7 pt-3">
            <div className="flex items-start gap-3"><Tile icon={CalendarDays} tone="info" size="lg" /><div className="min-w-0 flex-1"><div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Select time range</div></div><button type="button" onClick={() => setSheetOpen(null)} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50" aria-label="Close"><X className="h-4 w-4" /></button></div>
            <div className="flex flex-col gap-2">{timeRanges.map((range) => (<button key={range.id} type="button" onClick={() => { setTimeRange(range.id); setSheetOpen(null) }} className={cn('flex items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors', timeRange === range.id ? 'bg-emerald-500/[0.06] ring-2 ring-emerald-500/40' : 'bg-[#0B211B]/[0.035] hover:bg-[#0B211B]/[0.06]')}><span className={cn('grid h-5 w-5 shrink-0 place-items-center rounded-full', timeRange === range.id ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.08] text-transparent')}>{timeRange === range.id && <Check className="h-3 w-3" strokeWidth={3} />}</span><div className="min-w-0 flex-1"><div className="break-words text-[13px] font-bold text-[#0B211B]">{range.label}</div><div className="mt-0.5 break-words text-[11px] font-medium text-[#0B211B]/55">{range.detail}</div></div></button>))}</div>
          </div>
        </motion.div>
      )}</AnimatePresence>
      <AnimatePresence>{sheetOpen === 'frequency' && (<motion.div key="freq-dim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSheetOpen(null)} className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]" />)}</AnimatePresence>
      <AnimatePresence>{sheetOpen === 'frequency' && (
        <motion.div key="freq-sheet" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 380, damping: 40 }} className="absolute inset-x-0 bottom-0 z-50 flex h-[86%] flex-col overflow-hidden rounded-t-[28px] bg-white">
          <div className="shrink-0 px-5 pt-4"><div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" /></div>
          <div className="flex min-h-0 flex-1 flex-col gap-4 px-5 pb-7 pt-3">
            <div className="flex items-start gap-3"><Tile icon={Clock} tone="info" size="lg" /><div className="min-w-0 flex-1"><div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Select frequency</div></div><button type="button" onClick={() => setSheetOpen(null)} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50" aria-label="Close"><X className="h-4 w-4" /></button></div>
            <div className="flex flex-col gap-2">{frequencies.map((freq) => (<button key={freq.id} type="button" onClick={() => { setFrequency(freq.id); setSheetOpen(null) }} className={cn('flex items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors', frequency === freq.id ? 'bg-emerald-500/[0.06] ring-2 ring-emerald-500/40' : 'bg-[#0B211B]/[0.035] hover:bg-[#0B211B]/[0.06]')}><span className={cn('grid h-5 w-5 shrink-0 place-items-center rounded-full', frequency === freq.id ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.08] text-transparent')}>{frequency === freq.id && <Check className="h-3 w-3" strokeWidth={3} />}</span><div className="min-w-0 flex-1"><div className="break-words text-[13px] font-bold text-[#0B211B]">{freq.label}</div><div className="mt-0.5 break-words text-[11px] font-medium text-[#0B211B]/55">{freq.detail}</div></div></button>))}</div>
          </div>
        </motion.div>
      )}</AnimatePresence>
      <AnimatePresence>{sheetOpen === 'delete' && (<motion.div key="delete-dim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setSheetOpen(null); setDeleteTargetId(null) }} className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]" />)}</AnimatePresence>
      <AnimatePresence>{sheetOpen === 'delete' && deleteTargetReport && (
        <motion.div key="delete-sheet" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 380, damping: 40 }} className="absolute inset-x-0 bottom-0 z-50 flex h-[86%] flex-col overflow-hidden rounded-t-[28px] bg-white">
          <div className="shrink-0 px-5 pt-4"><div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" /></div>
          <div className="flex min-h-0 flex-1 flex-col gap-4 px-5 pb-7 pt-3">
            <div className="flex items-start gap-3"><Tile icon={Trash2} tone="danger" size="lg" /><div className="min-w-0 flex-1"><div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Delete report?</div><div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">This will permanently remove the scheduled report.</div></div><button type="button" onClick={() => { setSheetOpen(null); setDeleteTargetId(null) }} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50" aria-label="Close"><X className="h-4 w-4" /></button></div>
            <div className="rounded-2xl bg-[#0B211B]/[0.04] p-4">
              <div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">Report details</div>
              <div className="mt-2 break-words text-[14px] font-extrabold text-[#0B211B]">{deleteTargetReport.name}</div>
              <div className="mt-1 flex flex-wrap gap-1.5">{deleteTargetReport.metrics.map((m) => (<span key={m} className="rounded-full bg-[#0B211B]/[0.05] px-2.5 py-1 text-[10px] font-bold text-[#0B211B]/70">{metricLabel(m)}</span>))}</div>
              <div className="mt-3 flex flex-col gap-1.5 text-[11px] font-semibold text-[#0B211B]/55"><span>{frequencyLabel(deleteTargetReport.frequency)}</span><span>{timeRangeLabel(deleteTargetReport.timeRange)}</span><span>{deliveryLabel(deleteTargetReport.delivery)}</span>{deleteTargetReport.delivery === 'email' && deleteTargetReport.recipients.length > 0 && (<span>Recipients: {deleteTargetReport.recipients.join(', ')}</span>)}</div>
              <div className="mt-3 flex items-baseline justify-between gap-3"><span className="shrink-0 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">Last run</span><span className="min-w-0 break-words text-right font-mono text-[11px] font-bold text-[#0B211B]/70">{deleteTargetReport.lastRun}</span></div>
              <div className="mt-1 flex items-baseline justify-between gap-3"><span className="shrink-0 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">Next run</span><span className="min-w-0 break-words text-right font-mono text-[11px] font-bold text-[#0B211B]/70">{deleteTargetReport.nextRun}</span></div>
            </div>
            <div className="mt-auto flex gap-2"><button type="button" onClick={() => { setSheetOpen(null); setDeleteTargetId(null) }} className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/75">Cancel</button><button type="button" onClick={deleteReport} className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-600 to-red-500 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(225,29,72,0.6)]"><Trash2 className="h-4 w-4" strokeWidth={2.4} />Delete</button></div>
          </div>
        </motion.div>
      )}</AnimatePresence>
    </>
  )
}
