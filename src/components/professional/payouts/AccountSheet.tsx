import { Landmark, Plus } from 'lucide-react'
import { Chip } from '@/components/phone/kit'
import { SheetShell } from './SheetShell'
import type { PayoutAccount } from './payoutData'
import { cn } from '@/lib/utils'

type Props = {
  accounts: PayoutAccount[]
  adding: boolean
  onClose: () => void
  onAdd: () => void
}

export function AccountSheet({ accounts, adding, onClose, onAdd }: Props) {
  return (
    <SheetShell
      icon={Landmark}
      tone="ink"
      title="Payout accounts"
      subtitle="Where your earnings land every Friday"
      onClose={onClose}
      footer={
        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            onClick={onAdd}
            disabled={adding}
            aria-disabled={adding}
            className={cn(
              'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-colors',
              adding
                ? 'cursor-not-allowed bg-[#0B211B]/[0.08] text-[#0B211B]/40'
                : 'bg-[#0B211B]/[0.05] text-[#0B211B]/70 hover:bg-[#0B211B]/[0.09]',
            )}
          >
            <Plus className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            {adding ? 'Verifying account…' : 'Add another account'}
          </button>
          <p className="text-center text-[10.5px] font-semibold text-[#0B211B]/45">
            Account changes never delay an in-flight payout.
          </p>
        </div>
      }
    >
      <div className="flex flex-col gap-2.5">
        {accounts.map((a) => (
          <div key={a.id} className="relative overflow-hidden rounded-2xl bg-[#0B231C] p-4">
            <div aria-hidden className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-emerald-400/15 blur-3xl" />
            <div className="relative">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.12] text-emerald-100">
                  <Landmark className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="truncate text-[13.5px] font-extrabold text-white">{a.bankName}</div>
                  <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Savings account</div>
                </div>
                <Chip
                  intent={a.primary ? 'success' : 'info'}
                  light
                  dot={!a.primary}
                  className="shrink-0 border-transparent whitespace-nowrap"
                >
                  {a.primary ? 'Default' : a.verified ? 'Backup' : 'Verifying'}
                </Chip>
              </div>

              <div className="mt-3.5 flex flex-col gap-2.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Account</span>
                  <span className="min-w-0 font-mono text-[12px] font-bold tabular-nums text-emerald-50/90">{`••${a.last4}`}</span>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Holder</span>
                  <span className="min-w-0 truncate text-right font-mono text-[12px] font-bold uppercase text-emerald-50/90">{a.holder}</span>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Verified</span>
                  <span className="min-w-0 text-right text-[12px] font-bold text-emerald-50/90">{a.verified ?? 'Within one business day'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SheetShell>
  )
}
