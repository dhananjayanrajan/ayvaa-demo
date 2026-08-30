import { Clock } from 'lucide-react'
import { SheetShell } from '@/components/phone/SheetShell'
import { LIVE_VISIT, formatElapsed, type LedgerRow } from '@/data/patientLiveVisit'
import { cn } from '@/lib/utils'

interface VisitSoFarSheetProps {
  elapsedSeconds: number
  ledger: LedgerRow[]
  onClose: () => void
  onOpenLog: () => void
}

export function VisitSoFarSheet({ elapsedSeconds, ledger, onClose, onOpenLog }: VisitSoFarSheetProps) {
  return (
    <SheetShell
      icon={Clock}
      tone="success"
      title="Visit so far"
      subtitle={`Started ${LIVE_VISIT.startedAt} with ${LIVE_VISIT.caregiver.first}`}
      onClose={onClose}
      footer={
        <div>
          <button
            type="button"
            onClick={onOpenLog}
            className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
          >
            Open full visit log
          </button>
          <p className="mt-2 text-center text-[10px] font-bold text-[#0B211B]/45">
            Rows seal themselves the moment each step completes
          </p>
        </div>
      }
    >
      <div className="rounded-2xl bg-[#0B231C] p-4">
        <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Session ledger</div>
        <div className="mt-3 flex flex-col gap-2.5">
          {ledger.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-3">
              <span className="flex shrink-0 items-center gap-2">
                <span
                  aria-hidden
                  className={cn(
                    'h-1.5 w-1.5 shrink-0 rounded-full',
                    row.state === 'done'
                      ? 'bg-emerald-300'
                      : row.state === 'active'
                        ? 'animate-pulse bg-emerald-300'
                        : 'bg-white/25',
                  )}
                />
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/50">{row.label}</span>
              </span>
              <span
                className={cn(
                  'text-right text-[12px] font-bold tabular-nums',
                  row.state === 'done'
                    ? 'text-emerald-50/90'
                    : row.state === 'active'
                      ? 'text-emerald-300'
                      : 'text-emerald-100/45',
                )}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-[#0B211B]/[0.03] px-4 py-3.5">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-baseline justify-between gap-3">
            <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">On site for</span>
            <span className="text-right text-[12px] font-bold tabular-nums text-[#0B211B]/80">
              {formatElapsed(elapsedSeconds)}
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Caregiver</span>
            <span className="text-right text-[12px] font-bold text-[#0B211B]/80">{LIVE_VISIT.caregiver.name}</span>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Care category</span>
            <span className="text-right text-[12px] font-bold text-[#0B211B]/80">{LIVE_VISIT.category}</span>
          </div>
        </div>
      </div>
    </SheetShell>
  )
}
