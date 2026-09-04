import { AccentHero } from '@/components/base/phone/accent-hero'
import { StatusPill } from '@/components/base/phone/status-pill'

type Props = { id: string; patient: string; guardian: string; activeVersion: number; lastSigned: string; renewalDue: string; tone: 'emerald' | 'amber' | 'rose' | 'sky'; label: string }

export function ConsentRecordHero({ patient, guardian, activeVersion, lastSigned, renewalDue, tone, label }: Props) {
  return (
    <AccentHero tone={tone}>
      <div className="flex items-start justify-between gap-3"><span className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/60">Consent record</span><StatusPill tone={tone} label={label} /></div>
      <div className="mt-3 flex items-start gap-3"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/[0.08] text-[16px] font-black text-white">{patient.charAt(0)}</span><div className="min-w-0 flex-1"><h2 className="break-words text-[19px] font-extrabold leading-snug tracking-tight text-white">{patient}</h2><p className="mt-0.5 text-[12px] font-medium leading-relaxed text-emerald-100/55">Guardian: {guardian}</p></div></div>
      <div className="mt-4 space-y-2">
        <div className="flex items-baseline justify-between gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-2.5"><span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-200/50">Active version</span><span className="min-w-0 break-words text-right font-mono text-[12px] font-bold text-white">v{activeVersion}</span></div>
        <div className="flex items-baseline justify-between gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-2.5"><span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-200/50">Last signed</span><span className="min-w-0 break-words text-right font-mono text-[12px] font-bold text-white">{lastSigned}</span></div>
        <div className="flex items-baseline justify-between gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-2.5"><span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-200/50">Renewal due</span><span className="min-w-0 break-words text-right font-mono text-[12px] font-bold text-white">{renewalDue}</span></div>
      </div>
    </AccentHero>
  )
}
