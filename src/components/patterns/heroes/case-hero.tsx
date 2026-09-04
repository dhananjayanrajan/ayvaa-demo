import { AccentHero } from '@/components/base/phone/accent-hero'
import { StatusPill } from '@/components/base/phone/status-pill'

type Props = {
  id: string
  title: string
  severity: string
  patient: string
  location: string
  raised: string
  by: string
}

export function CaseHero({ id, title, severity, patient, location, raised, by }: Props) {
  const rows = [
    { label: 'Patient', value: patient },
    { label: 'Location', value: location },
    { label: 'Raised', value: raised },
    { label: 'Reported by', value: by },
  ]
  return (
    <AccentHero tone="rose">
      <div className="flex items-start justify-between gap-3">
        <span className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-rose-200/60">Case #{id}</span>
        <StatusPill tone="rose" label={severity} live />
      </div>
      <h2 className="mt-2 text-balance break-words text-[19px] font-extrabold leading-snug tracking-tight text-white">{title}</h2>
      <div className="mt-4 space-y-2">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
            <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-rose-200/50">{row.label}</span>
            <span className="min-w-0 break-words text-right font-mono text-[12px] font-bold text-white">{row.value}</span>
          </div>
        ))}
      </div>
    </AccentHero>
  )
}
