import { StatementButton } from '../actions/statement-button'
import { buildLedgerRows, type Receipt } from '@/data/patientBilling'

interface LedgerCardProps {
  receipts: Receipt[]
}

export function LedgerCard({ receipts }: LedgerCardProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-2xl bg-[#0B211B]/[0.03] px-4 py-4">
        <div className="flex flex-col gap-3">
          {buildLedgerRows(receipts).map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-3">
              <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/45">
                {row.label}
              </span>
              <span className="min-w-0 text-right text-[12.5px] font-bold tabular-nums text-[#0B211B]/80">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <StatementButton receipts={receipts} />
    </div>
  )
}
