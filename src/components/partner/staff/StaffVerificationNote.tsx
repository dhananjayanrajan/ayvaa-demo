import { ShieldCheck } from 'lucide-react'

export function StaffVerificationNote() {
  return (
    <div className="flex items-start gap-2.5 rounded-2xl bg-[#0B211B]/[0.035] px-4 py-3">
      <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600/70" strokeWidth={2.4} aria-hidden />
      <p className="min-w-0 flex-1 text-pretty text-[11px] font-medium leading-relaxed text-[#0B211B]/55">
        Every staff member is verified by Ayvaa before their first session. You approve who joins under Sunrise — approvals and
        declines are both logged.
      </p>
    </div>
  )
}
