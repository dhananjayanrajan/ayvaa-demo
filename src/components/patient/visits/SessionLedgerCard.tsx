import { motion } from 'motion/react'
import { Footprints, MapPin } from 'lucide-react'
import { AccentHero } from '@/components/admin/ui/AccentHero'
import { StatusPill } from '@/components/phone/StatusPill'
import { SESSION_LEDGER } from '@/data/patientVisitSummary'

function TimeCell({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.06] px-3.5 py-3">
      <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">{label}</div>
      <div className="mt-1 text-[15px] font-extrabold leading-none tabular-nums text-white">{value}</div>
      <div className="mt-1.5 text-[9.5px] font-semibold leading-snug text-emerald-100/50">{sub}</div>
    </div>
  )
}

export function SessionLedgerCard() {
  const [checkIn, checkOut, onSite] = SESSION_LEDGER
  const [hours, minutes] = onSite.value.replace('h ', ':').replace('m', '').trim().split(':')

  return (
    <AccentHero tone="emerald">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
          <MapPin className="h-3 w-3" aria-hidden />
          Session record
        </span>
        <StatusPill tone="emerald" label="GPS sealed" />
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="relative grid h-[76px] w-[76px] shrink-0 place-items-center rounded-full bg-emerald-400/[0.12]">
          <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-emerald-400/15" />
          <div className="relative text-center">
            <div className="text-[20px] font-extrabold leading-none tabular-nums tracking-tight text-white">{hours}</div>
            <div className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.18em] text-emerald-100/45">hrs</div>
          </div>
          <span aria-hidden className="absolute -right-1 top-1/2 -translate-y-1/2 text-[11px] font-extrabold text-emerald-200/70">
            :
          </span>
          <span aria-hidden className="absolute -left-1 top-1/2 -translate-y-1/2 text-[11px] font-extrabold text-emerald-200/70">
            :
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">Minutes on site</div>
            <div className="mt-0.5 text-[15px] font-extrabold leading-none tabular-nums text-white">{minutes}</div>
          </div>
          <div className="mt-3">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">Alert-free stretch</div>
            <div className="mt-0.5 text-[15px] font-extrabold leading-none tabular-nums text-white">Entire visit</div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <TimeCell label={checkIn.label} value={checkIn.value} sub={checkIn.sub} />
        <TimeCell label={checkOut.label} value={checkOut.value} sub={checkOut.sub} />
      </div>

      <div className="mt-2 flex items-center gap-2.5 rounded-2xl bg-white/[0.06] px-3.5 py-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-400/[0.16]">
          <Footprints className="h-4 w-4 text-emerald-200" strokeWidth={2.4} aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[12px] font-bold tracking-tight text-white">One continuous presence</span>
          <span className="block text-[10.5px] font-semibold text-emerald-100/55">
            No checkout in between, no gap to explain
          </span>
        </span>
      </div>
    </AccentHero>
  )
}
