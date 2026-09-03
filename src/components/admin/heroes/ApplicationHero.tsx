import { AccentHero } from '@/components/phone/AccentHero'
import { StatusPill } from '@/components/phone/StatusPill'
import { Meter } from '@/components/phone/kit'

type Props = {
  id: string
  name: string
  initials: string
  role: string
  experience: string
  licence: string
  applied: string
  verifiedCount: number
  total: number
  progress: number
  tone: { hero: 'amber' | 'emerald' | 'rose'; pill: 'amber' | 'emerald' | 'rose'; meterIntent: 'warning' | 'success' | 'danger' }
  label: string
  live: boolean
}

export function ApplicationHero({ id, name, initials, role, experience, licence, applied, verifiedCount, total, progress, tone, label, live }: Props) {
  return (
    <AccentHero tone={tone.hero}>
      <div className="flex items-start justify-between gap-3">
        <span className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-amber-200/60">Application #{id}</span>
        <StatusPill tone={tone.pill} label={label} live={live} />
      </div>
      <div className="mt-4 flex items-start gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/[0.08] text-[16px] font-black text-white">{initials}</span>
        <div className="min-w-0 flex-1">
          <h2 className="break-words text-[19px] font-extrabold leading-snug tracking-tight text-white">{name}</h2>
          <p className="mt-0.5 text-[12px] font-medium leading-relaxed text-amber-100/55">{role}</p>
          <p className="text-[12px] font-medium leading-relaxed text-amber-100/55">{experience}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-amber-100/50">
          <span>Verification progress</span>
          <span className="tabular-nums text-amber-200">{verifiedCount}/{total}</span>
        </div>
        <Meter value={progress} intent={tone.meterIntent} delay={0.2} className="mt-2" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-baseline justify-between gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-2.5"><span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-amber-200/50">Licence</span><span className="min-w-0 break-words text-right font-mono text-[12px] font-bold text-white">{licence}</span></div>
        <div className="flex items-baseline justify-between gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-2.5"><span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-amber-200/50">Applied</span><span className="min-w-0 break-words text-right font-mono text-[12px] font-bold text-white">{applied}</span></div>
      </div>
    </AccentHero>
  )
}
