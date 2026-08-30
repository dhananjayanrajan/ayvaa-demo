import { Check, Languages } from 'lucide-react'
import { Card } from '@/components/phone/kit'
import { initialsOf } from '@/data/patientMatching'
import { REVIEW_GUARDIAN, REVIEW_PATIENT } from '@/data/patientReview'

export function PatientCard() {
  return (
    <Card>
      <div className="p-5">
        <div className="flex items-center gap-3.5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#0B211B]/[0.06] text-[13px] font-black tracking-tight text-[#0B211B]/60">
            {initialsOf(REVIEW_PATIENT.name)}
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[14px] font-extrabold tracking-tight text-[#0B211B]">{REVIEW_PATIENT.name}</div>
            <div className="mt-0.5 truncate text-[11px] font-semibold text-[#0B211B]/50">
              {REVIEW_PATIENT.relation} on your family plan
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-[#0B211B]/[0.04] px-3.5 py-2.5">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Age</div>
            <div className="mt-1 truncate text-[12.5px] font-extrabold leading-none tabular-nums text-[#0B211B]">
              {REVIEW_PATIENT.age}
            </div>
          </div>
          <div className="rounded-2xl bg-[#0B211B]/[0.04] px-3.5 py-2.5">
            <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">
              <Languages className="h-3 w-3" aria-hidden />
              Speaks
            </div>
            <div className="mt-1 truncate text-[12.5px] font-extrabold leading-none text-[#0B211B]">
              {REVIEW_PATIENT.language}
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2.5 rounded-xl bg-emerald-500/[0.08] px-3 py-2.5">
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
            <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
          </span>
          <span className="min-w-0 text-[10.5px] font-bold text-emerald-800">
            Guardian consent on file, signed by {REVIEW_GUARDIAN.name}
          </span>
        </div>
      </div>
    </Card>
  )
}
