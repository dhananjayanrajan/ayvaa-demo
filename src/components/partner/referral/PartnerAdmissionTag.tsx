interface PartnerAdmissionTagProps {
  patient: {
    name: string
    age: number
    condition: string
    referredBy: string
    careArea: string
    guardian: string
    refCode: string
  }
}

const barcode = [3, 1, 2, 1, 1, 3, 2, 1, 3, 1, 2, 2, 1, 1, 3, 1, 2, 1, 3, 2, 1, 1]

export function PartnerAdmissionTag({ patient }: PartnerAdmissionTagProps) {
  return (
    <div className="relative overflow-hidden rounded-[24px] bg-[#0B231C] shadow-[0_24px_56px_-26px_rgba(6,40,30,0.75)]">
      <div aria-hidden className="pointer-events-none absolute -left-10 -top-12 h-36 w-36 rounded-full bg-teal-400/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-10 -bottom-12 h-36 w-36 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="relative p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Admission tag · draft</div>
            <div className="mt-1.5 truncate text-[18px] font-extrabold tracking-tight text-white">{patient.name}</div>
          </div>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/[0.08] text-[16px] font-extrabold text-emerald-200 ring-1 ring-inset ring-white/10">
            {patient.age}
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
          <div className="min-w-0">
            <div className="text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/35">Condition</div>
            <div className="truncate text-[12px] font-bold text-emerald-50/85">{patient.condition}</div>
          </div>
          <div className="min-w-0">
            <div className="text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/35">Referred by</div>
            <div className="truncate text-[12px] font-bold text-emerald-50/85">{patient.referredBy}</div>
          </div>
          <div className="min-w-0">
            <div className="text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/35">Care area</div>
            <div className="truncate text-[12px] font-bold text-emerald-50/85">{patient.careArea}</div>
          </div>
          <div className="min-w-0">
            <div className="text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/35">Guardian</div>
            <div className="truncate text-[12px] font-bold text-emerald-50/85">{patient.guardian}</div>
          </div>
        </div>
        <div aria-hidden className="my-4 border-t border-dashed border-white/15" />
        <div className="flex items-end justify-between gap-3">
          <div className="flex h-6 items-end gap-[2.5px]" aria-hidden>
            {barcode.map((w, i) => (
              <span key={i} className="h-6 bg-emerald-200/50" style={{ width: w }} />
            ))}
          </div>
          <span className="shrink-0 font-mono text-[10px] font-bold tracking-[0.14em] text-emerald-100/40">
            {patient.refCode}
          </span>
        </div>
      </div>
    </div>
  )
}
