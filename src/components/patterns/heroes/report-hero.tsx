import { FileText, Calendar } from 'lucide-react'
import { Chip } from '@/components/base/phone/kit'

export function ReportHero({ scheduledCount }: { scheduledCount: number }) {
  return (
    <div className="shrink-0 relative overflow-hidden rounded-[26px] border border-sky-200/10 bg-[#0B1A24] p-5 shadow-[0_28px_64px_-30px_rgba(12,80,150,0.5)]">
      <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2"><div className="h-3 w-1 rounded-full bg-sky-400" /><span className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-sky-200/60">Reports</span></div>
            <h2 className="mt-1.5 text-[20px] font-extrabold tracking-tight text-white">Build & schedule</h2>
            <p className="mt-1 text-[11px] font-medium text-sky-100/60">Export analytics and automate delivery</p>
          </div>
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-sky-400/10 text-sky-300"><FileText className="h-5 w-5" strokeWidth={2.2} /></span>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-white/[0.04] px-3 py-2.5"><Calendar className="h-3.5 w-3.5 text-sky-300" strokeWidth={2.2} /><span className="text-[11px] font-bold text-sky-100">{scheduledCount} scheduled · next run Mon 08:00</span><Chip intent="info" className="ml-auto border-transparent bg-sky-400/15 text-sky-200">Live</Chip></div>
      </div>
    </div>
  )
}
