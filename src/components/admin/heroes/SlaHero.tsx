import { AlertTriangle, Clock } from 'lucide-react'
import { Chip } from '@/components/phone/kit'

export function SlaHero({ openCount, slaBreaches }: { openCount: number; slaBreaches: number }) {
  return (
    <div className="shrink-0 relative overflow-hidden rounded-[26px] border border-amber-200/10 bg-[#1E1A0B] p-5 shadow-[0_28px_64px_-30px_rgba(180,120,0,0.4)]">
      <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-amber-400/20 blur-3xl" />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2"><div className="h-3 w-1 rounded-full bg-amber-400" /><span className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-amber-200/60">Escalation queue</span></div>
            <h2 className="mt-1.5 text-[20px] font-extrabold tracking-tight text-white">{openCount} open tickets</h2>
            <p className="mt-1 text-[11px] font-medium text-amber-100/60">{slaBreaches} breaching SLA · needs attention</p>
          </div>
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-400/10 text-amber-300"><AlertTriangle className="h-5 w-5" strokeWidth={2.2} /></span>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-white/[0.04] px-3 py-2.5"><Clock className="h-3.5 w-3.5 text-amber-300" strokeWidth={2.2} /><span className="text-[11px] font-bold text-amber-100">SLA: 4h response · 24h resolution</span><Chip intent="warning" className="ml-auto border-transparent bg-amber-400/15 text-amber-200">Live</Chip></div>
      </div>
    </div>
  )
}
