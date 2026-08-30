import { Landmark, Plus } from 'lucide-react'
import { Chip } from '@/components/phone/kit'
import { SheetShell } from '@/components/phone/SheetShell'
import { LifecycleButton, CtaNote } from '@/components/phone/LifecycleButton'
import { DarkPanel } from '@/components/phone/DarkPanel'
import { FactRows } from '@/components/patient/plan/FactRows'
import type { PayoutAccount } from './payoutData'

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
          <LifecycleButton
            phase="idle"
            gated={adding}
            idleIcon={Plus}
            idleLabel={adding ? 'Verifying account…' : 'Add another account'}
            workingLabel="Verifying account…"
            doneLabel="Added"
            onPress={onAdd}
          />
          <CtaNote className="font-semibold">Account changes never delay an in-flight payout.</CtaNote>
        </div>
      }
    >
      <div className="flex flex-col gap-2.5">
        {accounts.map((a) => (
          <DarkPanel key={a.id}>
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.12] text-emerald-100">
                <Landmark className="h-5 w-5" strokeWidth={2.2} aria-hidden />
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="truncate text-[13.5px] font-extrabold text-white">{a.bankName}</div>
                <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">
                  Savings account
                </div>
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

            <div className="mt-3.5">
              <FactRows
                rows={[
                  { label: 'Account', value: `••${a.last4}` },
                  { label: 'Holder', value: a.holder },
                  { label: 'Verified', value: a.verified ?? 'Within one business day' },
                ]}
              />
            </div>
          </DarkPanel>
        ))}
      </div>
    </SheetShell>
  )
}
