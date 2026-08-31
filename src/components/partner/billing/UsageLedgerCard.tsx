import { ClipboardCheck } from 'lucide-react'
import { Card } from '@/components/phone/kit'
import type { UsageItem } from '@/data/partnerBillingTypes'

interface UsageLedgerCardProps {
  usage: UsageItem[]
  total: string
}

export function UsageLedgerCard({ usage, total }: UsageLedgerCardProps) {
  return (
    <Card>
      <div className="p-5">
        <div className="flex flex-col gap-4">
          {usage.map((u) => (
            <div key={u.label} className="flex items-center justify-between gap-4">
              <span className="text-[12.5px] font-semibold leading-snug text-[#0B211B]/60">{u.label}</span>
              <span className="shrink-0 font-mono text-[13px] font-bold tabular-nums tracking-tight text-[#0B211B]">{u.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl bg-[#0B211B]/[0.04] px-3.5 py-3">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[12px] font-extrabold uppercase tracking-[0.1em] text-[#0B211B]/70">Amount billed</span>
            <span className="font-mono text-[16px] font-black tabular-nums tracking-tight text-emerald-700">{total}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2.5 rounded-xl bg-emerald-500/[0.07] px-3 py-2.5">
          <ClipboardCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600" strokeWidth={2.4} aria-hidden />
          <span className="min-w-0 flex-1 text-[10.5px] font-bold leading-snug text-[#0B211B]/60">
            Every line traces to a signed visit record. Unverified sessions never appear here.
          </span>
        </div>
      </div>
    </Card>
  )
}
